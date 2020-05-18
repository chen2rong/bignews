$(function () {
    // 进入页面发送请求获取数据渲染到页面上
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

    // 使用模态框show.bs.modal的relatedTarget 属性可获取触发模态框的DOM标签对象
    $('#myModal').on('show.bs.modal', function (e) {
        // console.log(e.relatedTarget);
        // 如果点击的是新增分类按钮，则重置模态框
        if ($(e.relatedTarget).attr('id') == 'xinzengfenlei') {
            // 重置模态框
            $('#category_form').get(0).reset()
            // 设置模态框标题
            $('#myModal #myModalLabel').text('新增分类')
        }
        // 如果点击的是编辑按钮，则数据回显在模态框上
        if ($(e.relatedTarget).hasClass('btn-info') == true) {
            // 设置模态框标题
            $('#myModal #myModalLabel').text('更新分类')
            // 数据回显
            $.ajax({
                type: 'get',
                url: BigNew.category_search,
                data: {
                    id: $(e.relatedTarget).data('id')
                },
                success: function (res) {
                    if (res.code == 200) {
                        $('#category_form input[name="id"]').val(res.data[0].id)
                        $('#category_form input[name="name"]').val(res.data[0].name)
                        $('#category_form input[name="slug"]').val(res.data[0].slug)
                    }
                }
            })
        }
    })

    // 给模态框的确认按钮注册事件
    $('#myModal .btn-primary').on('click', function () {
        var id_val = $('#category_form input[name="id"]').val()
        $.ajax({
            type: 'post',
            url: id_val ? BigNew.category_edit : BigNew.category_add,
            data: $('#category_form').serialize(),
            success: function (res) {
                if (res.code == 201 || res.code == 200) {
                    $('#myModal').modal('hide')
                    getData()
                }
            }
        })
    })


    // 使用模态框show.bs.modal的relatedTarget 属性可获取触发模态框的DOM标签对象
    $('#mode_del').on('show.bs.modal', function (e) {
        window.del_id = $(e.relatedTarget).data('id')
    })
    // 点击模态框确认按钮发送请求删除信息
    $('#mode_del .btn-primary').on('click', function () {
        $.ajax({
            type: 'post',
            url: BigNew.category_delete,
            data: { id: del_id },
            success: function (res) {
                if (res.code == 204) {
                    $('#mode_del').modal('hide')
                    getData()
                }
            }
        })
    })

    /* // 点击新增分类，弹出模态框
    $('.text-center').on('click', function () {
        // 重置模态框
        $('#category_form').get(0).reset()
        // 弹出模态框
        $('.mode_add').modal('show')
        // 设置模态框标题
        $('.mode_add .modal-header h4').text('新增分类')
    })
 
    // 添加/跟新分类
    // 1、给模态框的确认按钮注册事件（按钮有两个功能：新增或更新）
    $('.mode_add .btn-primary').on('click', function () {
        var id_val = $('#category_form input[name="id"]').val()
        $.ajax({
            type: 'post',
            url: id_val ? BigNew.category_edit : BigNew.category_add,
            data: $('#category_form').serialize(),
            success: function (res) {
                if (res.code == 201 || res.code == 200) {
                    $('.mode_add').modal('hide')
                    getData()
                }
            }
        })
    })
 
    // 更新分类信息
    // 给更新按钮添加事件
    $('.container-fluid tbody').on('click', '.btn-info', function () {
        // 显示模态框
        $('.mode_add').modal('show')
        // 设置模态框标题
        $('.mode_add .modal-header h4').text('更新分类')
        // 数据回显
        $.ajax({
            type: 'get',
            url: BigNew.category_search,
            data: {
                id: $(this).data('id')
            },
            success: function (res) {
                if (res.code == 200) {
                    $('#category_form input[name="id"]').val(res.data[0].id)
                    $('#category_form input[name="name"]').val(res.data[0].name)
                    $('#category_form input[name="slug"]').val(res.data[0].slug)
                }
 
            }
        })
 
    })
    // 删除分类
    $('.container-fluid tbody').on('click', '.btn-danger', function () {
        // 显示模态框
        $('.mode_del').modal('show')
        // 获取删除按钮的data-id的值，存到window顶级对象中
        window.id = $(this).data('id')
    })
 
    // 点击模态框确认按钮发送请求删除信息
    $('.mode_del .btn-primary').on('click', function () {
        $.ajax({
            type: 'post',
            url: BigNew.category_delete,
            data: { id: id },
            success: function (res) {
                if (res.code == 204) {
                    $('.mode_del').modal('hide')
                    getData()
                }
            }
        })
    }) */
})