$(function () {
    // 1、发送Ajax请求，将数据渲染到列表上
    $.ajax({
        type: 'get',
        url: BigNew.comment_list,
        data: {
            page: 1,
            perpage: 7
        },
        success: function (res) {
            if (res.code == 200) {
                // 1.1将数据绑定在模板上
                var htmlStr = template('sel_Category', res.data)
                // 1.2将数据渲染到页面上
                $('.table-bordered tbody').html(htmlStr)
            }

        }
    })
})