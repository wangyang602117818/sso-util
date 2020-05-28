///////////////验证中心方法 authorize(baseUrl,cookieName)////////////////////////////////////
//验证完成之后 window.token_jwt_data 就是具体的信息
//********************************************************************* */
const tools = require('./tools')
function getTokenByTicket(url, success, error) {
    var xhr = new XMLHttpRequest();
    xhr.onload = function (event) {
        var target = event.srcElement || event.target;
        success(JSON.parse(target.responseText));
    };
    if (error) xhr.onerror = error;
    xhr.open('get', url, false);
    xhr.send();
}
function parseTokenSetMessage(token) {
    if (token) {
        var data = token.match(/\.(\w+)\./)[1];
        window.token_jwt_data = JSON.parse(window.atob(data));
    }
}
//sso验证方法 baseUrl:sso项目地址,cookieName:生成的cookiName
function authorize(baseUrl, cookieName) {
    var loginUrl = baseUrl + "sso/login";
    var getTokenUrl = baseUrl + "sso/gettoken";
    var ssourl = tools.getQueryString("ssourls");
    //sso退出
    if (ssourl) {
        ////////清除本站cookie
        var ssoUrls = JSON.parse(window.atob(tools.parseBase64String(ssourl)));
        var cookieValue = tools.getCookie(cookieName);
        if (cookieValue) {
            tools.setCookie(cookieName, cookieValue, -1);
        }
        /////////////////////
        var index = 0;
        for (var i = 0; i < ssoUrls.length; i++) if (window.location.href.indexOf(ssoUrls[i]) > -1) index = i;
        if (index < ssoUrls.length - 1) {
            window.location.href = ssoUrls[index + 1] + "?ssourls=" + ssourl;
        }
        else //最后一个
        {
            window.location.href = baseUrl;
        }
        return;
    }
    var authorization = tools.getCookie(cookieName);
    var ticket = tools.getQueryString("ticket");
    //cookie不可用的时候
    if (!authorization) {
        //cookie和ticket都不可用的时候
        if (!ticket) {
            window.location.href = loginUrl + "?returnUrl=" + window.location.href;
            return;
        }
        //cookie不可用,但是有ticket
        else {
            getTokenByTicket(getTokenUrl + "?ticket=" + ticket, function (result) {
                if (result.code == 0 && result.result) {
                    parseTokenSetMessage(result.result);
                    //通过ticket获取到了token,一般发生在首次登陆
                    tools.setCookie(cookieName, result.result);
                } else {
                    //两者都不可用
                    window.location.href = loginUrl + "?returnUrl=" + window.location.href;
                }
            });
        }
    } else {
        parseTokenSetMessage(authorization);
    }
}
module.exports = {
    authorize: authorize
}