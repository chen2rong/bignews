$(function () {
    // 1、发送Ajax请求
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
                $('.user_info span').html(`欢迎&nbsp;&nbsp;${obj.data.nickname}`)
                // 显示登录账号的头像
                $('.user_info img').attr('src', obj.data.userPic)
                // 个人中心的头像也需要设置
                $('.header_bar .user_center_link img').attr('src', obj.data.userPic)
            }
        }
    })

    // 退出登录功能
    $('.user_center_link .logout').on('click', function () {
        console.log(123);

        // 1、清除localStorage的数据
        localStorage.removeItem('token')
        // 2、跳回登录页
        location.href = './login.html'
    })
})