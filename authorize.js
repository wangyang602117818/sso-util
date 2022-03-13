///////////////验证中心方法 authorize(baseUrl,cookieName)////////////////////////////////////
//验证完成之后 window.token_jwt_data 就是具体的信息
//********************************************************************* */
const tools = require('./tools');
function getTokenByTicket(url, success, error) {
    var xhr = new XMLHttpRequest();
    xhr.onload = function (event) {
        var target = event.target;
        success(JSON.parse(target.responseText));
    };
    if (error) xhr.onerror = error;
    xhr.open('get', url, false);
    xhr.send();
}
function parseTokenSetMessage(token) {
    if (token) {
        var data = token.match(/\.(\w+)\./)[1];
        window.token_jwt_data = JSON.parse(tools.base64DeCode(data));
        //移除浏览器上的ticket
        var newUrl = location.href.replace(/[?&]?ticket=[\w-_]*/, "");
        history.replaceState({}, "", newUrl);
    }
}
//sso验证方法 baseUrl:sso项目地址,cookieName:生成的cookiName
function authorize(baseUrl, cookieName) {
    var getTokenUrl = tools.trimEndChar(baseUrl, '/') + "/sso/gettoken";
    var ssourl = tools.getQueryString("ssourls");
    //sso退出
    if (ssourl) {
        ////////清除本站cookie
        var ssoUrls = JSON.parse(tools.base64DeCode(tools.base64SecureURLDecode(ssourl)));
        var returnUrl = tools.getReturnUrl("returnUrl");
        var cookieValue = tools.getCookie(cookieName);
        if (cookieValue) {
            tools.setCookie(cookieName, cookieValue, -1);
        }
        /////////////////////
        for (var i = 0; i < ssoUrls.length; i++) {
            if (window.location.href.indexOf(ssoUrls[i]) > -1) {
                ssoUrls.splice(i, 1);
                break;
            }
        }
        if (ssoUrls.length > 0) {
            var newSsoUrls = JSON.stringify(ssoUrls);
            window.location.href = ssoUrls[0] + "?ssourls=" + tools.base64SecureURLEncode(tools.base64EnCode(newSsoUrls)) + "&returnUrl=" + returnUrl;
        }
        else //最后一个
        {
            window.location.href = tools.trimEndChar(baseUrl, '/') + "/sso/login?returnUrl=" + returnUrl;
        }
        return;
    }
    var authorization = tools.getCookie(cookieName);
    var ticket = tools.getQueryString("ticket");
    //cookie不可用的时候
    if (!authorization) {
        //cookie和ticket都不可用的时候
        if (!ticket) {
            window.location.href = tools.trimEndChar(baseUrl, '/') + "/sso/login?returnUrl=" + window.location.href;
            return;
        }
        //cookie不可用,但是有ticket
        else {
            var from = tools.trimEndChar(window.location.host, "/").replace(new RegExp("https?://|www."), '');
            getTokenByTicket(getTokenUrl + "?from=" + from + "&ticket=" + ticket + "&audience=" + window.location.hostname, function (result) {
                if (result.code == 0 && result.result) {
                    parseTokenSetMessage(result.result);
                    //通过ticket获取到了token,一般发生在首次登陆
                    tools.setCookie(cookieName, result.result, 'Lax');
                } else {
                    //两者都不可用
                    window.location.href = tools.trimEndChar(baseUrl, '/') + "/sso/login?returnUrl=" + window.location.href;
                }
            });
        }
    } else {
        parseTokenSetMessage(authorization);
    }
}
module.exports = {
    authorize: authorize,
    parseTokenSetMessage: parseTokenSetMessage
}