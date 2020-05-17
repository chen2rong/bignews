$(function () {
    getData()
    function getData() {
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
    }

    // 点击新增分类，弹出模态框
    $('.text-center').on('click', function () {
        $('.modal').modal('show')

    })

    // 添加分类
    // 1、给模态框的新增按钮注册事件
    $('.modal .btn-primary').on('click', function () {
        $.ajax({
            type: 'post',
            url: BigNew.category_add,
            data: $('#category_form').serialize(),
            success: function (res) {
                if (res.code == 201) {
                    $('.modal').modal('hide')
                    getData()
                }
            }
        })
    })

    // 删除分类
    $('.container-fluid tbody').on('click', '.btn-danger', function () {
        var id = $(this).data('id')
        $.ajax({
            type: 'post',
            url: BigNew.category_delete,
            data: { id: id },
            success: function (res) {
                console.log(res);

                // if (res.code == 201) {
                $('.modal').modal('hide')
                getData()
                // }
            }
        })
    })
})