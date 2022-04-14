const tools = require('./tools');
function SSOClientService(ssoBaseUrl, authorization) {
    this.ssoBaseUrl = tools.trimEndChar(ssoBaseUrl, '/');
    this.authorization = authorization;
    this.getAllCompany = function () {
        var options = { method: 'get' };
        options.headers = new Headers({ Authorization: this.authorization });
        var url = this.ssoBaseUrl + "/company/getall";
        return fetch(url, options).then(res => res.json());
    };
    this.getAllDepartment = function (companyCode) {
        var options = { method: 'get' };
        options.headers = new Headers({ Authorization: this.authorization });
        var url = this.ssoBaseUrl + "/department/getDepartments?companyCode=" + companyCode;
        return fetch(url, options).then(res => res.json());
    };
    this.getUserList = function (companyCode = "", filter = "", pageIndex = 1, pageSize = 10, orderField = "UserName", orderType = "asc") {
        var options = { method: 'get' };
        options.headers = new Headers({ Authorization: this.authorization });
        var url = this.ssoBaseUrl + "/user/getBasic?companyCode=" + companyCode + "&filter=" + filter + "&orderField=" + orderField + "&orderType=" + orderType + "&pageIndex=" + pageIndex + "&pageSize=" + pageSize;
        return fetch(url, options).then(res => res.json());
    };
    this.getRoleList = function (filter = "", pageIndex = 1, pageSize = 10) {
        var options = { method: 'get' };
        options.headers = new Headers({ Authorization: this.authorization });
        var url = this.ssoBaseUrl + "/role/getlist?filter=" + filter + "&pageIndex=" + pageIndex + "&pageSize=" + pageSize;
        return fetch(url, options).then(res => res.json());
    };
    this.getUserDetail = function (userId) {
        var options = { method: 'get' };
        options.headers = new Headers({ Authorization: this.authorization });
        var url = this.ssoBaseUrl + "/user/getByUserId?userId=" + userId;
        return fetch(url, options).then(res => res.json());
    }
}

module.exports = {
    SSOClientService: SSOClientService
}