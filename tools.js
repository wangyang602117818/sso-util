//设置cookie cname:键,cvalue:值,exdays=天,samesite=Strict|Lax|None
function setCookie(cname, cvalue, exdays, samesite) {
    var cookies = cname + "=" + cvalue + ";path=/";
    if (exdays) {
        var d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        cookies += ";expires=" + d.toGMTString();
    }
    if (samesite) {
        cookies += ";SameSite=" + samesite;
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
    var urlArr = window.location.href.replace(window.location.hash, "").split("?");
    if (urlArr.length < 2) return null;
    var paras = urlArr[1].split('&');
    for (var i = 0; i < paras.length; i++) {
        var paraArr = paras[i].split('=');
        if (paraArr[0].toLowerCase() == name.toLowerCase()) return paraArr[1];
    }
    return null;
}
//base64编码,支持中文
function base64EnCode(str) {
    return window.btoa(_encode(str));
}
//base64解码,支持中文
function base64DeCode(str) {
    return _decode(window.atob(str));
}
//把base64安全的编码解析成源吗
function base64SecureURLDecode(str) {
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
//把base64字符串转成url安全的编码
function base64SecureURLEncode(str) {
    return str.replace('+', '-').replace('/', '_').replace('=', '');
}
//解析从mongo中传出来的 date.$date
function parseBsonTime(value) {
    var date = new Date(0);
    date.setMilliseconds(value);
    return date.getFullYear() + "-" + formatMonth((date.getMonth() + 1)) + "-" + formatMonth(date.getDate()) + " " + formatMonth(date.getHours()) + ":" + formatMonth(date.getMinutes()) + ":" + formatMonth(date.getSeconds());
}
//解析IsoDateTime(2020-05-24T11:38:02.235519)
function parseIsoDateTime(time) {
    if (!time) return time;
    return time.split('.')[0].replace("T", " ");
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
    var urlArr = window.location.href.replace(window.location.hash, "").split("?");
    if (urlArr.length < 2) return null;
    var search = urlArr[1];
    var index = search.indexOf(name);
    var returnUrl = search.substring(index + name.length + 1);
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
    if (!char) char = " ";
    var chars = [
        "[",
        "]",
        "\\",
        "^",
        "$",
        ".",
        "|",
        "?",
        "*",
        "+",
        "(",
        ")",
        "{",
        "}",
    ];
    var transfer = "";
    if (chars.indexOf(char) > -1) transfer = "\\";
    var reTag = new RegExp("^" + (transfer + char) + "+|" + (transfer + char) + "+$", "gi");
    return str.replace(reTag, "");
}
//去除字符串尾char字符串
function trimEndChar(str, char) {
    if (!char) char = " ";
    var chars = [
        "[",
        "]",
        "\\",
        "^",
        "$",
        ".",
        "|",
        "?",
        "*",
        "+",
        "(",
        ")",
        "{",
        "}",
    ];
    var transfer = "";
    if (chars.indexOf(char) > -1) transfer = "\\";
    var reTag = new RegExp((transfer + char) + "+$", "gi");
    return str.replace(reTag, "");
}
//去除字符串首char字符串
function trimStartChar(str, char) {
    if (!char) char = " ";
    var chars = [
        "[",
        "]",
        "\\",
        "^",
        "$",
        ".",
        "|",
        "?",
        "*",
        "+",
        "(",
        ")",
        "{",
        "}",
    ];
    var transfer = "";
    if (chars.indexOf(char) > -1) transfer = "\\";
    var reTag = new RegExp("^" + (transfer + char) + "+", "gi");
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
//"yyyy-MM-dd"类型或者Date类型的时间添加或者减少days天
function dateAddDays(date, days, format) {
    var val = null;
    if (date instanceof Date) {
        val = date;
    } else {
        var val = new Date(date);
    }
    val.setDate(date.getDate() + days);
    return getDateFormat(val, format);
}
//返回格式化后的时间字符串 date:Date对象,format:"yyyy-MM-dd"|"yyyy/MM/dd"
function getDateFormat(date, format) {
    var time_arr = [date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds()];
    var realMonth = time_arr[1];
    format = format.replace(/([\W]|^)([yY]+)(\W|$)/, function (g1, g2, g3, g4) {
        return g2 + yearFormatInner(time_arr[0], g3.length) + g4;
    });
    format = format.replace(/([\W]|^)(M+)(\W|$)/, function (g1, g2, g3, g4) {
        return g2 + monthFormatInner(realMonth + 1, g3.length) + g4;
    });
    format = format.replace(/([\W]|^)([dD]+)(\W|$)/, function (g1, g2, g3, g4) {
        return g2 + monthFormatInner(time_arr[2], g3.length) + g4;
    });
    format = format.replace(/([\W]|^)(h+)(\W|$)/, function (g1, g2, g3, g4) {
        return g2 + monthFormatInner(time_arr[3], g3.length) + g4;
    });
    format = format.replace(/([\W]|^)(m+)(\W|$)/, function (g1, g2, g3, g4) {
        return g2 + monthFormatInner(time_arr[4], g3.length) + g4;
    });
    format = format.replace(/([\W]|^)(s+)(\W|$)/, function (g1, g2, g3, g4) {
        return g2 + monthFormatInner(time_arr[5], g3.length) + g4;
    });
    return format;
}
//格式化年，len=位数
function yearFormatInner(year, len) {
    if (year.toString().length == len) return year.toString();
    if (year.toString().length == 4 && len == 2) return year.toString().substr(2, 2);
    if (year.toString().length == 2 && len == 4) return new Date().getFullYear().toString().substr(0, 2) + year;
    return year;
}
//格式化月，天，小时，
function monthFormatInner(month, len) {
    if (len == 1) return month;
    if (len == 2) return month.toString().length == 1 ? "0" + month : month;
    if (len == 0) return "";
    return month;
}
//把字节转成用户可识别的文件大小
function convertFileSize(value) {
    var size = parseInt(value) / 1024;
    if (size > 1024) {
        size = size / 1024;
        if (size > 1024) {
            size = size / 1024;
            return size.toFixed(2) + "GB";
        } else {
            return size.toFixed(2) + "MB";
        }
    } else {
        return size.toFixed(2) + "KB";
    }
}
//获取文件名称的后缀(小写)
function getFileExtension(value) {
    var dot = value.lastIndexOf(".");
    if (dot == -1) return ".unknown";
    return value.substring(dot, value.length).toLowerCase();
}
//移除字符串中的html标签
function removeHTML(value) {
    var reTag = /<(?:.|\s)*?>/g;
    return value.replace(reTag, "");
}
//把秒转换成 00:00:00格式
function convertTime(seconds) {
    seconds = parseInt(seconds);
    if (seconds < 60) return "00:" + "00:" + formatMonth(seconds);
    var minuts = parseInt(seconds / 60);
    if (minuts < 60) {
        var seconds = parseInt(seconds % 60);
        return "00:" + formatMonth(minuts) + ":" + formatMonth(seconds);
    } else {
        var h = parseInt(seconds / 3600);
        minuts = parseInt((seconds - (h * 3600)) / 60);
        seconds = parseInt((seconds - (h * 3600)) % 60);
        return formatMonth(h) + ":" + formatMonth(minuts) + ":" + formatMonth(seconds);
    }
}
//获取当前的时间
function getCurrentDateTime() {
    var date = new Date();
    return (
        date.getFullYear() +
        "-" +
        formatMonth(date.getMonth() + 1) +
        "-" +
        formatMonth(date.getDate()) +
        " " +
        formatMonth(date.getHours()) +
        ":" +
        formatMonth(date.getMinutes()) +
        ":" +
        formatMonth(date.getSeconds())
    );
}
function _encode(string) {
    string = string.replace(/\r\n/g, "\n");
    var utftext = "";
    for (var n = 0; n < string.length; n++) {
        var c = string.charCodeAt(n);
        if (c < 128) {
            utftext += String.fromCharCode(c);
        }
        else if ((c > 127) && (c < 2048)) {
            utftext += String.fromCharCode((c >> 6) | 192);
            utftext += String.fromCharCode((c & 63) | 128);
        }
        else {
            utftext += String.fromCharCode((c >> 12) | 224);
            utftext += String.fromCharCode(((c >> 6) & 63) | 128);
            utftext += String.fromCharCode((c & 63) | 128);
        }
    }
    return utftext;
}
function _decode(utftext) {
    var string = "";
    var i = 0;
    var c = c1 = c2 = 0;
    while (i < utftext.length) {
        c = utftext.charCodeAt(i);
        if (c < 128) {
            string += String.fromCharCode(c);
            i++;
        }
        else if ((c > 191) && (c < 224)) {
            c2 = utftext.charCodeAt(i + 1);
            string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
            i += 2;
        }
        else {
            c2 = utftext.charCodeAt(i + 1);
            c3 = utftext.charCodeAt(i + 2);
            string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
            i += 3;
        }
    }
    return string;
}

module.exports = {
    getCookie: getCookie,
    setCookie: setCookie,
    getQueryString: getQueryString,
    base64SecureURLDecode: base64SecureURLDecode,
    base64SecureURLEncode: base64SecureURLEncode,
    parseBsonTime: parseBsonTime,
    parseIsoDateTime: parseIsoDateTime,
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
    getOuterHtml: getOuterHtml,
    dateAddDays: dateAddDays,
    convertFileSize: convertFileSize,
    getFileExtension: getFileExtension,
    removeHTML: removeHTML,
    convertTime: convertTime,
    getCurrentDateTime: getCurrentDateTime,
    base64EnCode: base64EnCode,
    base64DeCode: base64DeCode
}