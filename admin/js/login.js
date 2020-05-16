$(function () {
    ; (function () {
        // 1、给表单注册提交事件
        $('.login_form').on('submit', function (e) {
            // 2、阻止默认提交行为
            e.preventDefault()
            // 发送Ajax请求
            $.ajax({
                type: 'post',
                // url: 'http://localhost:8080/api/v1/admin/user/login',
                url: BigNew.user_login,
                data: $(this).serialize(),
                // 3、发送请求之前先验证用户名或密码是否为空
                beforeSend: function () {
                    var flag = false
                    $('input[name]').each(function (index, item) {
                        if ($.trim($(item).val()) == '') {
                            flag = true
                        }
                    })
                    // 为空时阻止发送请求
                    if (flag) {
                        $('.modal').modal('show')
                        $('.modal-body p').text('用户名和密码不能为空')
                        return false
                    }
                },
                success: function (res) {
                    $('.modal').modal('show')
                    $('.modal-body p').text(res.msg)
                    if (res.code == 200) {
                        $('.modal').on('hidden.bs.modal', function (e) {
                            // 用户名密码正确，将token存入localStorage
                            window.localStorage.setItem('token', res.token)
                            window.location.href = './index.html'
                        })
                    }
                    // else {
                    //     alert(res.msg)
                    // }
                }
            })
        })
    })()
})