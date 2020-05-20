// 完善封装
$(function () {
    // 1、进入页面先获取所有文章分类
    $.ajax({
        type: 'get',
        url: BigNew.category_list,
        success: function (res) {
            if (res.code == 200) {
                // 1.1将数据绑定在模板上
                var htmlStr = template('sel_Category', res)
                // 1.2将数据渲染到页面上
                $('#selCategory').html(htmlStr)
            }
        }
    }) //获取文章分类的请求

    // 5、封装一个文章列表页发送请求渲染页面的函数
    function getDataByParams(mypage, callback) { //第一个参数：初始页码  第二个参数：回调函数
        $.ajax({
            type: 'get',
            url: BigNew.article_query,
            data: {
                key: $('#key').val(), // 搜索关键词
                type: $('#selCategory').val(), // 文章类型id
                state: $('#selStatus').val(),// 文章状态，草稿/已发布
                page: mypage, // 当前页，由于page是会变化的，所以由参数mypage控制
                perpage: 7// 每页显示条数
            },
            success: function (res) {
                if (res.code == 200) {
                    console.log(res);

                    // 5.2将数据绑定在模板上
                    var htmlStr = template('listCategory', res.data)
                    // 5.3将数据渲染到页面上
                    $('.table-striped tbody').html(htmlStr)

                    // 5.4、返回一个参数传入的回调函数，用来控制数据渲染后的后续操作
                    // 判断：5.4.1 当请求返回的总条数为0时，隐藏分页控件，提示没有数据
                    if (res.data.totalPage == 0) {
                        $('#pagination-demo').hide().next().show()
                    } else if (res.data.totalPage != 0 && callback != null) { //说明有数据回来
                        $('#pagination-demo').show().next().hide()
                        callback(res)  //执行函数，并将res作为实参传入
                    } else if (res.data.totalPage != 0 && res.data.data.length == 0) {
                        //删除的时候如果是将最后一页的数据都删了，则需要将存入的当前页码-1，在重新加载控件
                        delpage -= 1
                        $('#pagination-demo').twbsPagination('changeTotalPages', res.data.totalPage, delpage)
                    }
                }  //if判断
            }  // success函数
        })  //ajax请求
    }

    // 2、当跳转到文章列表页要发送请求渲染页面
    // 2.1发送Ajax请求
    getDataByParams(1, pagination)

    // 3、封装分页功能
    // 设置一个全局变量，用来同步点击的分码
    var delpage = 1
    function pagination(res) {
        $('#pagination-demo').twbsPagination({
            totalPages: res.data.totalPage, //总页数
            visiblePages: 7,  //每页显示数量
            initiateStartPageClick: false,
            first: "首页",
            prev: "上一页",
            next: "下一页",
            last: "尾页",
            onPageClick: function (event, page) {  //页码发生改变时触发
                // 同步点击的页码（删除功能需要）
                delpage = page

                // 发送ajax请求
                getDataByParams(page, null)
            }
        });
    }

    // 4、筛选功能
    // 4.1点击筛选按钮发送请求
    $('.form-inline').on('submit', function (e) {
        // 4.2、阻止表单默认提交行为
        e.preventDefault()
        // 4.3、获取筛选条件上对应的value值筛选出对应的信息
        getDataByParams(1, function (res) {
            /* 服务器端的数据响应回来之后，要更新分页控件，也就是更新总页码
               使用一个事件changeTotalPages，动态的改变总页数  内部底层就会重绘分页控件
               第一个参数：事件名称  第二个参数：是总页码  第三个参数：默认当前页 */
            $('#pagination-demo').twbsPagination('changeTotalPages', res.data.totalPage, 1)
        })
    })


    // 5、删除功能
    // 5、1通过模态框的show.bs.modal事件在点击删除按钮时获取文章id
    // 5、2给删除模态框的确认按钮注册事件
    // 5.3根据文章id删除对象的数据
    // 5.4删除后需要重新发送请求，并且当前页是删除前的页码

    // 5、1通过模态框的show.bs.modal事件在点击删除按钮时获取文章id
    var id;
    $('#delModal').on('show.bs.modal', function (e) {
        id = $(e.relatedTarget).data('id')
    })

    // 5、2给删除模态框的确认按钮注册事件
    $('#delModal .btn-primary').on('click', function () {
        // 5.3根据文章id删除对象的数据
        $.ajax({
            type: 'post',
            url: BigNew.article_delete,
            data: { id: id },
            success: function (res) {
                if (res.code == 204) {
                    // 5.4关闭模态框
                    $('#delModal').modal('hide')
                    // 5.5重新发送请求，并且当前页是删除前的页码
                    getDataByParams(delpage, null)
                }
            }
        })

    })
})  //入口函数




/* $(function () {
    // 1、进入页面先获取所有文章分类
    $.ajax({
        type: 'get',
        url: BigNew.category_list,
        success: function (res) {
            if (res.code == 200) {
                // 1.1将数据绑定在模板上
                var htmlStr = template('sel_Category', res)
                // 1.2将数据渲染到页面上
                $('#selCategory').html(htmlStr)
            }
        }
    }) //获取文章分类的请求

    // 2、当跳转到文章列表页要发送请求渲染页面
    // 2.1发送Ajax请求
    $.ajax({
        type: 'get',
        url: BigNew.article_query,
        data: {
            key: $('#key').val(), // 搜索关键词
            type: $('#selCategory').val(), // 文章类型id
            state: $('#selStatus').val(),// 文章状态，草稿/已发布
            page: 1, // 当前页
            perpage: 7 // 每页显示条数
        }, //data数据
        success: function (res) {
            if (res.code == 200) {
                // 2.2将数据绑定在模板上
                var htmlStr = template('listCategory', res.data)
                // 2.3将数据渲染到页面上
                $('.table-striped tbody').html(htmlStr)

                // 2.4、显示分页插件 --不同的地方
                pagination(res.data.totalPage, 6)
            }  //if判断
        }  // success函数
    })  //ajax请求

    // 3、封装分页功能
    function pagination(res) {
        $('#pagination-demo').twbsPagination({
            totalPages: res.data.totalPage, //总页数
            visiblePages: 7,  //每页显示数量
            initiateStartPageClick: false,
            first: "首页",
            prev: "上一页",
            next: "下一页",
            last: "尾页",
            onPageClick: function (event, page) {  //页码发生改变时触发
                // 重复的代码
                // 发送ajax请求
                 $.ajax({
                     type: 'get',
                     url: BigNew.article_query,
                     data: {
                         key: $('#key').val(), // 搜索关键词
                         type: $('#selCategory').val(), // 文章类型id
                         state: $('#selStatus').val(),// 文章状态，草稿/已发布
                         page: page, // 当前页
                         perpage: 7 // 每页显示条数
                     }, //data数据
                     success: function (res) {
                         if (res.code == 200) {
                             // 2.2将数据绑定在模板上
                             var htmlStr = template('listCategory', res.data)
                             // 2.3将数据渲染到页面上
                             $('.table-striped tbody').html(htmlStr)
                         }  //if判断
                     }  // success函数
                 })  //ajax请求
            }
        });
    }

    // 4、筛选功能
    // 4.1点击筛选按钮发送请求
    $('.form-inline').on('submit', function (e) {
        // 4.2、阻止表单默认提交行为
        e.preventDefault()
        // 4.3、获取筛选条件上对应的value值筛选出对应的信息
         $.ajax({
             type: 'get',
             url: BigNew.article_query,
             data: {
                 key: $('#key').val(), // 搜索关键词
                 type: $('#selCategory').val(), // 文章类型id
                 state: $('#selStatus').val(),// 文章状态，草稿/已发布
                 page: 1, // 当前页
                 perpage: 7 // 每页显示条数
             }, //data数据
             success: function (res) {
                 if (res.code == 200) {
                     // 4.4将数据绑定在模板上
                     var htmlStr = template('listCategory', res.data)
                     // 4.5将数据渲染到页面上
                     $('.table-striped tbody').html(htmlStr)

                     // 4.6更新控件的总页码
                     //  服务器端的数据响应回来之后，要更新分页控件，也就是更新总页码
                     // 使用一个事件changeTotalPages，动态的改变总页数  内部底层就会重绘分页控件
                     // 第一个参数：事件名称  第二个参数：是总页码  第三个参数：默认当前页
                     $('#pagination-demo').twbsPagination('changeTotalPages', res.data.totalPage, 1)

                 }  //if判断
             }  // success函数
         })  //ajax请求
    })

}) */