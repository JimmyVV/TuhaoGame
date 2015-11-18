
    function sendAjax(url, opts) {
        var xhr = new XMLHttpRequest();

        xhr.onreadystatechange = function() {
            var completed = 4;
            if (xhr.readyState === completed) { //这里的xhr可以用this.代替
                if (xhr.status === 200) { //200表示请求成功
                    opts.success(xhr.responseText, xhr);
                } else {
                    opts.error(xhr.responseText, xhr);
                }
            }
        };
        xhr.open(opts.method, url, true);
        xhr.setRequestHeader('Content-Type', opts.contentType);
        xhr.send(JSON.stringify(opts.data));
    }   	

