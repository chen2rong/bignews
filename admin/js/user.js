$(function () {
    $.ajax({
        type: 'get',
        url: BigNew.user_detail,
        headers: {
            'Authorization': localStorage.getItem('token')
        },
        success: function (res) {
            // 数据回显
            $('#form .username').val(res.data.username)
            $('#form .nickname').val(res.data.nickname)
            $('#form .email').val(res.data.email)
            $('#form .user_pic').attr('src', res.data.userPic)
            $('#form .password').val(res.data.password)
        }
    })

    // 实现图片预览
    $('#exampleInputFile').on('change', function () {
        // URL.createObjectURL会将上传的文件生成一个可浏览的地址
        var url = URL.createObjectURL(this.files[0])
        // 在图片上渲染出来，预览待上传的图片
        $('#form .user_pic').attr('src', url)
    })
    // 点击修改按钮发送请求
    $('#form').on('submit', function (e) {
        // 阻止默认提交行为
        e.preventDefault()
        // 以二进制方式获取表单数据
        var data = new FormData($(this).get(0))
        $.ajax({
            type: 'post',
            url: BigNew.user_edit,
            headers: {
                'Authorization': localStorage.getItem('token')
            },
            data: data,
            contentType: false,
            processData: false,
            success: function (res) {
                // 请求回来的数据要刷新渲染到个人信息上
                if (res.code == 200) {
                    // 1、更新数据
                    // 方法一：此方法会刷新父级页面
                    // window.parent.location.reload()
                    // 方法二：重新发送请求，只刷数据不刷页面
                    $.ajax({
                        type: 'get',
                        // url: 'http://localhost:8080/api/v1/admin/user/info',
                        url: BigNew.user_info,
                        // 设置请求头，将本地存储的token发送给服务器，用于验证用户是否已经登录
                        headers: {
                            'Authorization': window.localStorage.getItem('token')
                        },
                        success: function (obj) {
                            // 2、请求回来的数据要渲染到页面
                            if (obj.code == 200) {
                                // 显示登录账号的用户名
                                parent.$('.user_info span').html(`欢迎&nbsp;&nbsp;${obj.data.nickname}`)
                                // 显示登录账号的头像
                                parent.$('.user_info img').attr('src', obj.data.userPic)
                                // 个人中心的头像也需要设置
                                parent.$('.header_bar .user_center_link img').attr('src', obj.data.userPic)
                            }
                        }
                    })
                }
            }

        })
    })

})