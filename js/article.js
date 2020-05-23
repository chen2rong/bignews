$(function () {
    // 1、获取主页传递过来的id或关键字
    var obj = utils.convertToObj(window.location.search.slice(1))

    // 2、向文章详情内容页发送请求
    $.ajax({
        type: 'get',
        url: BigNew.index_article,
        data: { id: obj.id },
        success: function (res) {
            if (res.code == 200) {
                console.log(res);
                // 2.1将数据绑定在模板上并渲染页面
                var htmlStr = template('article', res.data)
                $('.main_body').html(htmlStr)

                // 3、1给隐藏域id添加对应的文章id
                $('.comment_articleId').val(res.data.id)
            }
        }
    })

    // 3、点击 评论按钮向发表评论页发送请求
    $('.comment_form').on('submit', function (e) {
        // 3.2阻止默认提交行为
        e.preventDefault()
        // 3.3发送请求
        $.ajax({
            type: 'post',
            url: BigNew.post_comment,
            data: $(this).serialize(),
            success: function (res) {
                console.log(res);
                if (res.code == 201) {
                    // 3.4发布成功后提示用户评论成功并清空表单
                    alert(res.msg)
                    $('.comment_name').val('')
                    $('.comment_input').val('')
                }
            },
            error: function (res) {
                alert('发表失败，请稍后再试')
            }
        })
    })

    // 4、向评论管理页发送请求
    $.ajax({
        type: 'get',
        url: BigNew.get_comment,
        data: { articleId: obj.id },
        success: function (res) {
            // console.log(res);
            // 4.1更改XX条评论的显示
            $('.comment_count').html(`${res.data.length}条评论`)
            // 4.2将数据绑定在模板上并渲染页面
            var htmlStr = template('commentList', res)
            $('.comment_list_con').html(htmlStr)
        }
    })
})