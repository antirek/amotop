import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import * as formurlencoded from 'form-urlencoded';

interface ExchangeAccessTokenOptions {
  client_id: string,
  client_secret: string,
  grant_type: string,
  refresh_token: string,
  redirect_uri: string
}
	
interface Task {
  text: string;
  complete_till: number;
  entity_id?: number;
  entity_type?: string;
  task_type_id?: number;
  created_at?: number;
  created_by?: number;
  responsible_user_id?: number;
  duration?: number;
}

interface MergeContactsParams {
  companyId: number;
  contactIds: number[];
  baseContactId: number;
  baseContactName: string;
  leadIds: number[];
  responsibleUserId: number;
  cfv: {
    position: {id: number, value: string},
    phones: {id: number, values: string[]},
    emails: {id: number, values: string[]},
  };
}

export class AmoService {
  async exchangeAccessToken(domain: string, data: ExchangeAccessTokenOptions) {
    const client = await axios.create({baseURL: `https://${domain}`});
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

  async getUsers() {
    return (await this.axios.get('/api/v4/users')).data;
  }

  async getLeads() {
    return (await this.axios.get('/api/v4/leads')).data;
  }

  async getLeadById(leadId: number) {
    return (await this.axios.get(`/api/v4/leads/${leadId}`)).data;
  }

  async getPipelines() {
    return (await this.axios.get('/api/v4/leads/pipelines')).data;
  }

  async getTasks () {
    return (await this.axios.get(`/api/v4/tasks`)).data;
  }

  async getContacts (params) {
    let page = params?.page ? params?.page : 1;
    let limit = params?.limit ? params?.limit : 50;
    let query = params?.query ? params?.query : null;
    let url = `/api/v4/contacts`;
    url += `?page=${page}&limit=${limit}`;
    if (query) {
      url += `&query=${query}`;
    }
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
    console.log('response', response);
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

  async addTask(task: Task) {
    return await this.axios.post(`/api/v4/tasks`, task);
  }

  async getCompanies (params: any) {
    let page = params?.page ? params?.page : 1;
    let limit = params?.limit ? params?.limit : 50;
    let query = params?.query ? params?.query : null;
    let url = `/api/v4/companies`;
    url += `?page=${page}&limit=${limit}`;
    if (query) {
      url += `&query=${query}`;
    }
    return (await this.axios.get(url)).data;
  }

  async getCompany (id: number, params) {
    if (!id) { throw new Error('no company id'); }
    const paramWith = params?.leads ? 'leads' : null;
    const url = `/api/v4/companies/${id}?with=${paramWith}`;
    return (await this.axios.get(url)).data;
  }
}
