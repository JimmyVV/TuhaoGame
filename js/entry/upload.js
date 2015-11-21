require.config({　　
    baseUrl: "/js/lib",
    paths: {
        "jquery": "jquery.min",
        'sendAjax': '../entry/modules/sendAjax'
    }
});
require(['jquery'], function($) {
    var img_src;

    function uploadFile() {
        var formData = new FormData($("#frmUploadFile")[0]),
            file = $('.form-control').prop('files');
        console.log(formData);
        if (file.length == 0) {
            alert("请先上传照片!");
            return;
        }
        $.ajax({
            url: '/upload/img',
            type: 'POST',
            data: formData,
            async: false,
            cache: false,
            contentType: false,
            processData: false,
            success: function(data) {
                img_src = data;
                $("#spanMessage").html("上传成功~");
                $('.btn-primary').off();
            },
            error: function() {
                $("#spanMessage").html("与服务器通信发生错误");
            }
        });
    }
    /*
     * 实现数据上传
     */
    $('.btn-primary').on('click', uploadFile);
    $('#save').on('click', function() {
        var obj = {
                name: $(".name").val().trim(),
                title: $('.title').val().trim(),
                scripts: $('.scripts').val().trim(),
                src: img_src
            },
            file = $('.form-control').prop('files');
        if (obj.name == "" || obj.title == '' || obj.scripts == '') {
            alert("请输入数据~");
            return;
        }
        if (file.length == 0) {
            alert("请先上传照片!");
            return;
        }
        $.ajax({
            url: '/upload',
            type: "post",
            dataType: 'json',
            data: obj,
            success: function(data) {
                $('#save').text("上传成功~");
                setTimeout(function() {
                    window.location.href = "./";
                }, 1500)

            }
        })

    })
});
