///////////////////header///////////////////
//    var header = { Authorization: '' };
///////////////////post////////////////////
//    httpRequest.post(url, { }, header).then(res => {
//        window.console.log(res)
//    }).catch(err => {
//        alert(err);
//    }).finally(fin => {
//        window.console.log(fin);
//    });
//////////////////////get////////////////////
//     httpRequest.get(url, header).then(res => {
//         window.console.log(res)
//     }).catch(err => {
//         alert(err);
//     }).finally(com => {
//         window.console.log(com);
//     });
/////////////////postFile有进度//////////////
//     var file = document.getElementById("file").files[0];
//     var formData = new FormData();
//     formData.append("files", file);
//     formData.append("roles", JSON.stringify(["manage"]));
//     httpRequest.postFileProgress(url, formData, header,
//     function (data) {
//           window.console.log(data);
//     },
//     function (percent) { 
//           window.console.log(percent) 
//     });
/////////////////postFile///////////////////
//     var file = document.getElementById("file").files[0];
//     var formData = new FormData();
//     formData.append("files", file);
//     formData.append("roles", JSON.stringify(["manage"]));
//     httpRequest.postFile(url, formData, header).then(res => {
//           window.console.log(res)
//     }).catch(err => {
//           alert(err);
//     }).finally(fin => {
//           window.console.log(fin);
//     })
//////////////////downloadFile///////////////
//    httpRequest.downloadFile(url, null, header,"1.jpg");
/////////////////////////////////////////////
var httpRequest = {
    //fetch不具备查看进度功能
    postFile: function (url, formData, headers) {
        var options = { method: 'post' };
        if (headers == null) headers = {};
        var headers_copy = {};
        Object.assign(headers_copy, headers);
        options.headers = new Headers(headers_copy);
        options.body = formData;
        return fetch(url, options).then(res => res.json());
    },
    //上传文件可以查看进度
    postFileProgress: function (url, formData, headers, success, onprogress, onerror) {
        var xhr = new XMLHttpRequest();
        xhr.upload.onprogress = function (event) {
            var percent = (event.loaded / event.total * 100).toFixed();
            onprogress(percent); //进度
        }
        xhr.onload = function (event) {
            var target = event.srcElement || event.target;
            success(JSON.parse(target.responseText));
        };
        xhr.onerror = onerror;
        xhr.open("post", url);
        if (headers) {
            for (var key in headers) xhr.setRequestHeader(key, headers[key]);
        }
        xhr.send(formData);
    },
    post: function (url, jsonData, headers) {
        var options = { method: 'post' };
        if (headers == null) headers = {};
        var headers_copy = {};
        Object.assign(headers_copy, headers);
        headers_copy["Content-Type"] = "application/json";
        options.headers = new Headers(headers_copy);
        options.credentials = "same-origin";
        if (jsonData != null) options.body = JSON.stringify(jsonData);
        return fetch(url, options).then(res => res.json());
    },
    get: function (url, headers) {
        var options = { method: 'get' };
        var headers_copy = {};
        Object.assign(headers_copy, headers);
        if (headers != null) options.headers = new Headers(headers_copy);
        return fetch(url, options).then(res => res.json());
    },
    getFile: function (url, jsonData, headers) {
        var options = { method: 'post' };
        if (headers == null) headers = {};
        var headers_copy = {};
        Object.assign(headers_copy, headers);
        headers_copy["Content-Type"] = "application/json";
        options.headers = new Headers(headers_copy);
        options.credentials = "same-origin";
        if (jsonData != null) options.body = JSON.stringify(jsonData);
        return fetch(url, options);
    },
    filename: "",
    downloadFile: function (url, jsonData, headers, filename) {
        this.filename = filename;
        this.getFile(url, jsonData, headers).then(res => {
            if (!httpRequest.filename) {
                var contentDisposition = res.headers.get('Content-Disposition');
                if (contentDisposition) httpRequest.filename = contentDisposition.split(';')[1].split('=')[1];
            }
            res.blob().then(blob => {
                var a = document.createElement('a');
                var url = window.URL.createObjectURL(blob);
                a.href = url;
                a.download = httpRequest.filename;
                a.click();
                window.URL.revokeObjectURL(url);
                httpRequest.filename = "";
            });
        })
    }
}
module.exports = {
    httpRequest: httpRequest
}