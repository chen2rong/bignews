$(function () {
    // 1、获取全部文章类别并渲染到页面上
    $.ajax({
        type: 'get',
        url: BigNew.index_categoty,
        success: function (res) {
            // console.log(res);
            if (res.code == 200) {
                // 1.1将数据与模板引擎绑定
                var htmlStr = template('categoryList', res)
                // 1.2将模板渲染到页面上
                $('.level_two').html('<li class="up"></li>' + htmlStr)
                $('.left_menu').html(htmlStr)
            }
        }
    })

    // 2、发送请求获取热点图并渲染到页面上
    $.ajax({
        type: 'get',
        url: BigNew.index_hotpic,
        success: function (res) {
            // console.log(res);
            if (res.code == 200) {
                // 2.1将数据与模板引擎绑定
                var htmlStr = template('hotpic', res)
                // 2.2将模板渲染到页面上
                $('.focus_list').html(htmlStr)
            }
        }
    })

    // 4、发送请求获取最新资讯的内容并渲染到页面上
    $.ajax({
        type: 'get',
        url: BigNew.index_latest,
        success: function (res) {
            // console.log(res);
            if (res.code == 200) {
                // 4.1将数据与模板引擎绑定
                var htmlStr = template('latest', res)
                // 3.2将模板渲染到页面上
                $('.common_news').html(htmlStr)
            }
        }
    })

    // 4、发送请求获取文章热门排行的内容并渲染到页面上
    $.ajax({
        type: 'get',
        url: BigNew.index_rank,
        success: function (res) {
            // console.log(res);
            if (res.code == 200) {
                // 4.1将数据与模板引擎绑定
                var htmlStr = template('rank', res)
                // 4.2将模板渲染到页面上
                $('.hotrank_list').html(htmlStr)
            }
        }
    })

    // 6、发送请求获取最新评论的内容并渲染到页面上
    $.ajax({
        type: 'get',
        url: BigNew.latest_comment,
        success: function (res) {
            // console.log(res);
            if (res.code == 200) {
                // 5.1将数据与模板引擎绑定
                var htmlStr = template('comment', res)
                // 5.2将模板渲染到页面上
                $('.comment_list').html(htmlStr)
            }
        }
    })

    // 6、发送请求获取焦点关注的内容并渲染到页面上
    $.ajax({
        type: 'get',
        url: BigNew.index_attention,
        success: function (res) {
            // console.log(res);
            if (res.code == 200) {
                // 6.1将数据与模板引擎绑定
                var htmlStr = template('attention', res)
                // 6.2将模板渲染到页面上
                $('.guanzhu_list').html(htmlStr)
            }
        }
    })

    // 7、给关键字查询的搜索按钮注册事件
    $('.search_btn').on('click', function () {
        window.location.href = './list.html?search=' + $('.search_txt').val()
    })
})