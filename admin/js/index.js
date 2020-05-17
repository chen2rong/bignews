$(function () {
    // 1、发送Ajax请求
    $.ajax({
        type: 'get',
        // url: 'http://localhost:8080/api/v1/admin/user/info',
        url: BigNew.user_info,
        // 设置请求头，将本地存储的token发送给服务器，用于验证用户是否已经登录
        /* headers: {
            'Authorization': window.localStorage.getItem('token')
        }, */
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

    // 点击左侧导航栏添加active高亮样式
    $('.menu .level01').on('click', function () {
        // 1、点击给当前div添加active类，其他删除该类
        $(this).addClass('active').siblings().removeClass('active')
        // 2、点击第二个让ul实现显示切换显示和隐藏
        if ($(this).index() == 1) {
            $('.menu .level02').slideToggle()
            // 让>实现旋转效果
            $(this).find('b').toggleClass('rotate0')
            // 使用触发器让level02的li默认第一个高亮显示
            $('.menu .level02 li:eq(0)').trigger('click')
        }

    })

    // 点击level02的ul添加高亮效果
    $('.menu .level02 li').on('click', function () {
        $(this).addClass('active').siblings().removeClass('active')
    })
})