import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import * as formurlencoded from 'form-urlencoded';

import {Task, ExchangeAccessTokenOptions, MergeContactsParams} from './interfaces';

export class AmoService {
  async exchangeAccessToken(domain: string, data: ExchangeAccessTokenOptions) {
    const client = axios.create({baseURL: `https://${domain}`});
    const response = await client.post('/oauth2/access_token', data);
    return response.data;
  }
}

export class AmoApiClient {
  domain: string;
  axios: AxiosInstance;

  constructor(domain: string, accessToken: string) {
    this.domain = domain;
    this.axios = axios.create({
      baseURL: `https://${this.domain}`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  };

  //webhooks

  async getWebhooks() {
    return (await this.axios.get('/api/v4/webhooks')).data;
  }

  async setWebhook({destination, settings}) {
    return (await this.axios.post('/api/v4/webhooks', {
      destination,
      settings,
    })).data;
  }

  async deleteWebhook({destination}) {
    return (await this.axios.delete('/api/v4/webhooks', {
      data: {
        destination,
      },
    })).data;
  }

  // account

  async getAccount(paramWith) {
    const params = new Array();
    if (paramWith?.amojo_id) { params.push('amojo_id') };
    if (paramWith?.version) { params.push('version') };
    let url = '/api/v4/account';
    if (params.length > 0) {
      url += '?with='+params.join(',');
    }
    url = encodeURI(url);
    return (await this.axios.get(url)).data;
  }

  // users

  async getUsers() {
    return (await this.axios.get('/api/v4/users')).data;
  }

  async getUserById(userId: number) {
    return (await this.axios.get(`/api/v4/users/${userId}`)).data;
  }

  // leads

  async getLeads(params) {
    let page = params?.page ? params?.page : 1;
    let limit = params?.limit ? params?.limit : 50;
    let query = params?.query ? params?.query : null;
    let filter = params?.filter ? params?.filter : null;
    console.log('filter', filter);
    let url = `/api/v4/leads`;
    url += `?page=${page}&limit=${limit}`;
    if (query) {
      url += `&query=${query}`;
    }
    if (filter) {
      const filterArr = new Array();
      if (filter.id) { filterArr.push(`filter['id']=${filter.id}`); }
      if (filter.name) { filterArr.push(`filter['name']=${filter.name}`); }
      if (filter.price && filter.price.from && filter.price.to) {
        filterArr.push(`filter['price']['from']=${filter.price.from}`);
        filterArr.push(`filter['price']['to']=${filter.price.to}`);
      }
      url += `&` + filterArr.join('&');
    }
    url = encodeURI(url);
    //console.log('url', url);
    return (await this.axios.get(url)).data;
  }

  async getLeadById(leadId: number, params: any) {
    if (!leadId) { throw new Error('no lead id'); }
    const paramWith = params?.contacts ? 'contacts' : null;
    const url = `/api/v4/leads/${leadId}?with=${paramWith}`;
    return (await this.axios.get(url)).data;
  }

  // pipelines

  async getPipelines() {
    return (await this.axios.get('/api/v4/leads/pipelines')).data;
  }

  async getPipelineById(pipelineId: number) {
    return (await this.axios.get(`/api/v4/leads/pipelines/${pipelineId}`)).data;
  }

  async getPipelineStatuses(pipelineId: number) {
    return (await this.axios.get(`/api/v4/leads/pipelines/${pipelineId}/statuses`)).data;
  }

  // tasks

  async getTasks () {
    return (await this.axios.get(`/api/v4/tasks`)).data;
  }

  async addTask(task: Task) {
    return (await this.axios.post(`/api/v4/tasks`, task)).data;
  }

  // contacts

  async getContacts (params) {
    let page = params?.page ? params?.page : 1;
    let limit = params?.limit ? params?.limit : 50;
    let query = params?.query ? params?.query : null;
    let url = `/api/v4/contacts`;
    url += `?page=${page}&limit=${limit}`;
    if (query) {
      url += `&query=${query}`;
    }
    url = encodeURI(url);
    return (await this.axios.get(url)).data;
  }

  async getContact (id: number, params) {
    if (!id) { throw new Error('no contact id'); }
    const paramWith = params?.leads ? 'leads' : null;
    const url = `/api/v4/contacts/${id}?with=${paramWith}`;
    return (await this.axios.get(url)).data;
  }

  async updateContact(id: number, data) {
    const url = `/api/v4/contacts/${id}`;
    const response = await this.axios.patch(url, data);
    // console.log('response', response);
    return response.data;
  }

  async mergeContacts(data: MergeContactsParams) {
    const url = '/ajax/merge/contacts/save';

    const obj = {
      'id': data.contactIds,
      'result_element[ID]': data.baseContactId,
      'result_element[NAME]': data.baseContactName,
    }
    if (data.companyId) {
      obj['double[companies][result_element][COMPANY_UID]'] = data.companyId;
      obj['double[companies][result_element][ID]'] = data.companyId;
    }
    if (data.responsibleUserId) {
      obj['result_element[MAIN_USER_ID]'] = data.responsibleUserId;
    }
    if (data.leadIds && Array.isArray(data.leadIds) && data.leadIds.length > 0) {
      obj['result_element[LEADS]'] = data.leadIds;
    }
    if (data.cfv) {
      if (data.cfv.position && data.cfv.position.id && data.cfv.position.value) {
        obj[`result_element[cfv][${data.cfv.position.id}]`] = data.cfv.position.value;
      }
      if (data.cfv.phones && data.cfv.phones.id && data.cfv.phones.values) {
        obj[`result_element[cfv][${data.cfv.phones.id}]`] = data.cfv.phones.values;
      }
      if (data.cfv.emails && data.cfv.emails.id && data.cfv.emails.values) {
        obj[`result_element[cfv][${data.cfv.emails.id}]`] = data.cfv.emails.values;
      }
    }
    const form = formurlencoded(obj);
    const options = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'X-Requested-With': 'XMLHttpRequest',
      },
    };
    const response = await this.axios.post(url, form, options);
    return response.data;
  }

  // companies

  async getCompanies (params: any) {
    let page = params?.page ? params?.page : 1;
    let limit = params?.limit ? params?.limit : 50;
    let query = params?.query ? params?.query : null;
    let url = `/api/v4/companies`;
    url += `?page=${page}&limit=${limit}`;
    if (query) {
      url += `&query=${query}`;
    }
    url = encodeURI(url);
    return (await this.axios.get(url)).data;
  }

  async getCompany (id: number, params) {
    if (!id) { throw new Error('no company id'); }
    const paramWith = params?.leads ? 'leads' : null;
    const url = `/api/v4/companies/${id}?with=${paramWith}`;
    return (await this.axios.get(url)).data;
  }
}
