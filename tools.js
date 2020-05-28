//设置cookie cname:键,cvalue:值,exdays=天
function setCookie(cname, cvalue, exdays) {
    var cookies = cname + "=" + cvalue + ";path=/";
    if (exdays) {
        var d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        cookies += ";expires=" + d.toGMTString();
    }
    document.cookie = cookies;
}
//获取cookie,不存在返回""
function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i].trim();
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}
//获取url上面的参数
function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return null;
}
//还原从url上面传过来的base64字符串
function parseBase64String(str) {
    var result = str.replace('-', '+').replace('_', '/');
    switch (result.length % 4) {
        case 2:
            result += "==";
            break;
        case 3:
            result += "=";
            break;
    }
    return result;
}
//解析从mongo中传出来的 date.$date
function parseBsonTime(value) {
    var date = new Date(0);
    date.setMilliseconds(value);
    return date.getFullYear() + "-" + formatMonth((date.getMonth() + 1)) + "-" + formatMonth(date.getDate()) + " " + formatMonth(date.getHours()) + ":" + formatMonth(date.getMinutes()) + ":" + formatMonth(date.getSeconds());
}
//格式化成2位的时间格式
function formatMonth(month) {
    return month.toString().length == 1 ? "0" + month : month;
}
//取随机字符串 min:最小位数,max:最大位数
function randomWord(min, max) {
    var str = "",
        range = min,
        arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    // 随机产生
    range = Math.round(Math.random() * (max - min)) + min;
    for (var i = 0; i < range; i++) {
        var pos = Math.round(Math.random() * (arr.length - 1));
        str += arr[pos];
    }
    return str;
}
//随机数字 lowerValue:最小值,upperValue:最大值
function randomNumber(lowerValue, upperValue) {
    var choices = upperValue - lowerValue + 1;
    return Math.floor(Math.random() * choices + lowerValue);
}
//移除数组[a,b,c,d]中某一项c,不包含数组对象
function removeArrayItem(array, val) {
    var index = array.indexOf(val);
    if (index > -1) {
        array.splice(index, 1);
    }
}
//获取url上面name参数之后所有部分,这和getQueryString有所不同,因为returnUrl后面可能还有参数
function getReturnUrl(name) {
    var index = window.location.search.indexOf(name);
    var returnUrl = window.location.search.substring(index + name.length + 1);
    return returnUrl;
}
//根据userAgent获取设备类型 mobile|pc
function getDeviceType(userAgent) {
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent)) {
        return "mobile";
    } else {
        return "pc";
    }
}
//获取长文件名的前几个字符串
function getFileName(fileName, length) {
    if (fileName.indexOf("<span class=\"search_word\">") > -1) {
        var startIndex = fileName.indexOf("<span class=\"search_word\">"),
            endIndex = tfileNameis.indexOf("</span>"),
            startPos = startIndex - length / 2,
            endPos = endIndex + 7 + length / 2;
        if (startPos < 0) endPos = endPos + Math.abs(startPos);
        var newfilename = fileName.substring(startPos, endPos);
        if (fileName.length > newfilename.length) return newfilename + "...";
        return newfilename;
    } else {
        var len = 0;
        for (var i = 0; i < fileName.length; i++) {
            if (i == length) break;
            /^[\u4E00-\u9FA5]+$/.test(fileName[i]) ? len += 1 : len += 2;
        }
        if (fileName.length > len) return fileName.substring(0, len) + "...";
        return fileName.substring(0, len);
    }
}
//去除字符串首尾char字符串
function trimChar(str, char) {
    var reTag = new RegExp("^" + ("\\" + char || ' ') + "+|" + ("\\" + char || ' ') + "+$", "gi");
    return str.replace(reTag, "");
}
//去除字符串尾char字符串
function trimEndChar(str, char) {
    var reTag = new RegExp(('\\' + char || ' ') + "+$", "gi");
    return str.replace(reTag, "");
}
//去除字符串首char字符串
function trimStartChar(str, char) {
    var reTag = new RegExp("^" + ("\\" + char || ' ') + "+", "gi");
    return str.replace(reTag, "");
}
//把html字符串转换成dom对象
function htmlToDom(html) {
    var obj = document.createElement("div");
    obj.innerHTML = html.trim();
    return obj.firstChild;
}
//将一个一维数组转换成二维数组每一项有len个元素,不足填充null
function reMapArray(array, len) {
    var new_array = [];
    for (var i = 0; i < array.length; i += len) {
        if (i % len == 0) {
            new_array.push(array.slice(i, i + len));
        }
    }
    while (new_array[new_array.length - 1].length < len) {
        new_array[new_array.length - 1].push(null);
    }
    return new_array;
}
//获取一段html中指定的某个tag的内部html(包括他本身)
function getOuterHtml(html, tag) {
    var regex = new RegExp("<" + tag + "[\\s\\S\\r\\n]*<\\/" + tag + ">", "ig");
    return html.match(regex)[0];
}
module.exports = {
    getCookie: getCookie,
    setCookie: setCookie,
    getQueryString: getQueryString,
    parseBase64String: parseBase64String,
    parseBsonTime: parseBsonTime,
    formatMonth: formatMonth,
    randomWord: randomWord,
    randomNumber: randomNumber,
    removeArrayItem: removeArrayItem,
    getReturnUrl: getReturnUrl,
    getDeviceType: getDeviceType,
    getFileName: getFileName,
    trimChar: trimChar,
    trimEndChar: trimEndChar,
    trimStartChar: trimStartChar,
    htmlToDom: htmlToDom,
    reMapArray: reMapArray,
    getOuterHtml: getOuterHtml
}