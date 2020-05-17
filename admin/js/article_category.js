$(function () {
    $.ajax({
        type: 'get',
        url: BigNew.category_list,
        success: function (res) {
            if (res.code == 200) {
                // 将数据绑定在模板上
                var htmlStr = template('category', res)
                // 将数据渲染到页面上
                $('.table-striped tbody').html(htmlStr)
            }
        }
    })

    // 点击新增分类，弹出模态框
    $('.text-center').on('click', function () {
        $('.modal').modal('show')

    })
})