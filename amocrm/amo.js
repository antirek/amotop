"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.AmoApiClient = exports.AmoService = void 0;
var axios_1 = require("axios");
var formurlencoded = require("form-urlencoded");
var AmoService = /** @class */ (function () {
    function AmoService() {
    }
    AmoService.prototype.exchangeAccessToken = function (domain, data) {
        return __awaiter(this, void 0, void 0, function () {
            var client, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        client = axios_1["default"].create({ baseURL: "https://".concat(domain) });
                        return [4 /*yield*/, client.post('/oauth2/access_token', data)];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response.data];
                }
            });
        });
    };
    return AmoService;
}());
exports.AmoService = AmoService;
var AmoApiClient = /** @class */ (function () {
    function AmoApiClient(domain, accessToken) {
        this.domain = domain;
        this.axios = axios_1["default"].create({
            baseURL: "https://".concat(this.domain),
            headers: {
                Authorization: "Bearer ".concat(accessToken)
            }
        });
    }
    ;
    //webhooks
    AmoApiClient.prototype.getWebhooks = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.axios.get('/api/v4/webhooks')];
                    case 1: return [2 /*return*/, (_a.sent()).data];
                }
            });
        });
    };
    AmoApiClient.prototype.setWebhook = function (_a) {
        var destination = _a.destination, settings = _a.settings;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.axios.post('/api/v4/webhooks', {
                            destination: destination,
                            settings: settings
                        })];
                    case 1: return [2 /*return*/, (_b.sent()).data];
                }
            });
        });
    };
    AmoApiClient.prototype.deleteWebhook = function (_a) {
        var destination = _a.destination;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.axios["delete"]('/api/v4/webhooks', {
                            data: {
                                destination: destination
                            }
                        })];
                    case 1: return [2 /*return*/, (_b.sent()).data];
                }
            });
        });
    };
    // account
    AmoApiClient.prototype.getAccount = function (paramWith) {
        return __awaiter(this, void 0, void 0, function () {
            var params, url;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        params = new Array();
                        if (paramWith === null || paramWith === void 0 ? void 0 : paramWith.amojo_id) {
                            params.push('amojo_id');
                        }
                        ;
                        if (paramWith === null || paramWith === void 0 ? void 0 : paramWith.version) {
                            params.push('version');
                        }
                        ;
                        url = '/api/v4/account';
                        if (params.length > 0) {
                            url += '?with=' + params.join(',');
                        }
                        url = encodeURI(url);
                        return [4 /*yield*/, this.axios.get(url)];
                    case 1: return [2 /*return*/, (_a.sent()).data];
                }
            });
        });
    };
    // users
    AmoApiClient.prototype.getUsers = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.axios.get('/api/v4/users')];
                    case 1: return [2 /*return*/, (_a.sent()).data];
                }
            });
        });
    };
    AmoApiClient.prototype.getUserById = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.axios.get("/api/v4/users/".concat(userId))];
                    case 1: return [2 /*return*/, (_a.sent()).data];
                }
            });
        });
    };
    // leads
    AmoApiClient.prototype.getLeads = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            var page, limit, query, filter, url, filterArr;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        page = (params === null || params === void 0 ? void 0 : params.page) ? params === null || params === void 0 ? void 0 : params.page : 1;
                        limit = (params === null || params === void 0 ? void 0 : params.limit) ? params === null || params === void 0 ? void 0 : params.limit : 50;
                        query = (params === null || params === void 0 ? void 0 : params.query) ? params === null || params === void 0 ? void 0 : params.query : null;
                        filter = (params === null || params === void 0 ? void 0 : params.filter) ? params === null || params === void 0 ? void 0 : params.filter : null;
                        console.log('filter', filter);
                        url = "/api/v4/leads";
                        url += "?page=".concat(page, "&limit=").concat(limit);
                        if (query) {
                            url += "&query=".concat(query);
                        }
                        if (filter) {
                            filterArr = new Array();
                            if (filter.id) {
                                filterArr.push("filter['id']=".concat(filter.id));
                            }
                            if (filter.name) {
                                filterArr.push("filter['name']=".concat(filter.name));
                            }
                            if (filter.price && filter.price.from && filter.price.to) {
                                filterArr.push("filter['price']['from']=".concat(filter.price.from));
                                filterArr.push("filter['price']['to']=".concat(filter.price.to));
                            }
                            url += "&" + filterArr.join('&');
                        }
                        url = encodeURI(url);
                        return [4 /*yield*/, this.axios.get(url)];
                    case 1: 
                    //console.log('url', url);
                    return [2 /*return*/, (_a.sent()).data];
                }
            });
        });
    };
    AmoApiClient.prototype.getLeadById = function (leadId, params) {
        return __awaiter(this, void 0, void 0, function () {
            var paramWith, url;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!leadId) {
                            throw new Error('no lead id');
                        }
                        paramWith = (params === null || params === void 0 ? void 0 : params.contacts) ? 'contacts' : null;
                        url = "/api/v4/leads/".concat(leadId, "?with=").concat(paramWith);
                        return [4 /*yield*/, this.axios.get(url)];
                    case 1: return [2 /*return*/, (_a.sent()).data];
                }
            });
        });
    };
    // pipelines
    AmoApiClient.prototype.getPipelines = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.axios.get('/api/v4/leads/pipelines')];
                    case 1: return [2 /*return*/, (_a.sent()).data];
                }
            });
        });
    };
    AmoApiClient.prototype.getPipelineById = function (pipelineId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.axios.get("/api/v4/leads/pipelines/".concat(pipelineId))];
                    case 1: return [2 /*return*/, (_a.sent()).data];
                }
            });
        });
    };
    AmoApiClient.prototype.getPipelineStatuses = function (pipelineId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.axios.get("/api/v4/leads/pipelines/".concat(pipelineId, "/statuses"))];
                    case 1: return [2 /*return*/, (_a.sent()).data];
                }
            });
        });
    };
    // tasks
    AmoApiClient.prototype.getTasks = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.axios.get("/api/v4/tasks")];
                    case 1: return [2 /*return*/, (_a.sent()).data];
                }
            });
        });
    };
    AmoApiClient.prototype.getTaskById = function (taskId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.axios.get("/api/v4/tasks/".concat(taskId))];
                    case 1: return [2 /*return*/, (_a.sent()).data];
                }
            });
        });
    };
    AmoApiClient.prototype.editTask = function (taskId, data) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.axios.patch("/api/v4/tasks/".concat(taskId), { data: data })];
                    case 1: return [2 /*return*/, (_a.sent()).data];
                }
            });
        });
    };
    AmoApiClient.prototype.addTask = function (task) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.axios.post("/api/v4/tasks", task)];
                    case 1: return [2 /*return*/, (_a.sent()).data];
                }
            });
        });
    };
    AmoApiClient.prototype.getAdditionalTaskTypes = function () {
        return __awaiter(this, void 0, void 0, function () {
            var url, options;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = '/ajax/tasks/types';
                        options = {
                            headers: {
                                // 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                                'X-Requested-With': 'XMLHttpRequest'
                            }
                        };
                        return [4 /*yield*/, this.axios.get(url, options)];
                    case 1: return [2 /*return*/, (_a.sent()).data];
                }
            });
        });
    };
    AmoApiClient.prototype.deleteTask = function (taskId, leadId) {
        return __awaiter(this, void 0, void 0, function () {
            var url, options, obj, form;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = "/private/notes/edit2.php?parent_element_id=".concat(leadId, "&parent_element_type=2");
                        options = {
                            headers: {
                                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                                'X-Requested-With': 'XMLHttpRequest'
                            }
                        };
                        obj = {
                            ID: taskId,
                            ACTION: 'TASK_DELETE',
                            ELEMENT_ID: leadId,
                            ELEMENT_TYPE: 2
                        };
                        form = formurlencoded(obj);
                        return [4 /*yield*/, this.axios.post(url, form, options)];
                    case 1: return [2 /*return*/, (_a.sent()).data];
                }
            });
        });
    };
    // contacts
    AmoApiClient.prototype.getContacts = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            var page, limit, query, url;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        page = (params === null || params === void 0 ? void 0 : params.page) ? params === null || params === void 0 ? void 0 : params.page : 1;
                        limit = (params === null || params === void 0 ? void 0 : params.limit) ? params === null || params === void 0 ? void 0 : params.limit : 50;
                        query = (params === null || params === void 0 ? void 0 : params.query) ? params === null || params === void 0 ? void 0 : params.query : null;
                        url = "/api/v4/contacts";
                        url += "?page=".concat(page, "&limit=").concat(limit);
                        if (query) {
                            url += "&query=".concat(query);
                        }
                        url = encodeURI(url);
                        return [4 /*yield*/, this.axios.get(url)];
                    case 1: return [2 /*return*/, (_a.sent()).data];
                }
            });
        });
    };
    AmoApiClient.prototype.getContact = function (id, params) {
        return __awaiter(this, void 0, void 0, function () {
            var paramWith, url;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!id) {
                            throw new Error('no contact id');
                        }
                        paramWith = (params === null || params === void 0 ? void 0 : params.leads) ? 'leads' : null;
                        url = "/api/v4/contacts/".concat(id, "?with=").concat(paramWith);
                        return [4 /*yield*/, this.axios.get(url)];
                    case 1: return [2 /*return*/, (_a.sent()).data];
                }
            });
        });
    };
    AmoApiClient.prototype.updateContact = function (id, data) {
        return __awaiter(this, void 0, void 0, function () {
            var url, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = "/api/v4/contacts/".concat(id);
                        return [4 /*yield*/, this.axios.patch(url, data)];
                    case 1:
                        response = _a.sent();
                        // console.log('response', response);
                        return [2 /*return*/, response.data];
                }
            });
        });
    };
    AmoApiClient.prototype.mergeContacts = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var url, obj, form, options, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = '/ajax/merge/contacts/save';
                        obj = {
                            'id': data.contactIds,
                            'result_element[ID]': data.baseContactId,
                            'result_element[NAME]': data.baseContactName
                        };
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
                                obj["result_element[cfv][".concat(data.cfv.position.id, "]")] = data.cfv.position.value;
                            }
                            if (data.cfv.phones && data.cfv.phones.id && data.cfv.phones.values) {
                                obj["result_element[cfv][".concat(data.cfv.phones.id, "]")] = data.cfv.phones.values;
                            }
                            if (data.cfv.emails && data.cfv.emails.id && data.cfv.emails.values) {
                                obj["result_element[cfv][".concat(data.cfv.emails.id, "]")] = data.cfv.emails.values;
                            }
                        }
                        form = formurlencoded(obj);
                        options = {
                            headers: {
                                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                                'X-Requested-With': 'XMLHttpRequest'
                            }
                        };
                        return [4 /*yield*/, this.axios.post(url, form, options)];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response.data];
                }
            });
        });
    };
    // companies
    AmoApiClient.prototype.getCompanies = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            var page, limit, query, url;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        page = (params === null || params === void 0 ? void 0 : params.page) ? params === null || params === void 0 ? void 0 : params.page : 1;
                        limit = (params === null || params === void 0 ? void 0 : params.limit) ? params === null || params === void 0 ? void 0 : params.limit : 50;
                        query = (params === null || params === void 0 ? void 0 : params.query) ? params === null || params === void 0 ? void 0 : params.query : null;
                        url = "/api/v4/companies";
                        url += "?page=".concat(page, "&limit=").concat(limit);
                        if (query) {
                            url += "&query=".concat(query);
                        }
                        url = encodeURI(url);
                        return [4 /*yield*/, this.axios.get(url)];
                    case 1: return [2 /*return*/, (_a.sent()).data];
                }
            });
        });
    };
    AmoApiClient.prototype.getCompany = function (id, params) {
        return __awaiter(this, void 0, void 0, function () {
            var paramWith, url;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!id) {
                            throw new Error('no company id');
                        }
                        paramWith = (params === null || params === void 0 ? void 0 : params.leads) ? 'leads' : null;
                        url = "/api/v4/companies/".concat(id, "?with=").concat(paramWith);
                        return [4 /*yield*/, this.axios.get(url)];
                    case 1: return [2 /*return*/, (_a.sent()).data];
                }
            });
        });
    };
    return AmoApiClient;
}());
exports.AmoApiClient = AmoApiClient;
