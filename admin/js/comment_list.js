$(function () {
    // 1、发送Ajax请求，将数据渲染到列表上
    getDataByParams(1, pagination)

    // 2、封装向评论列表接口发送Ajax请求
    function getDataByParams(page, callback) {
        $.ajax({
            type: 'get',
            url: BigNew.comment_list,
            data: {
                page: page,
                perpage: 7
            },
            success: function (res) {
                if (res.code == 200) {
                    // 2.1将数据绑定在模板上
                    var htmlStr = template('sel_Category', res.data)
                    // 2.2将数据渲染到页面上
                    $('.table-bordered tbody').html(htmlStr)
                    // 2.3、返回一个参数传入的回调函数，用来控制数据渲染后的后续操作
                    // 判断：2.3.1 当请求返回的总条数为0时，隐藏分页控件，提示没有数据
                    if (res.data.totalCount == 0) {
                        $('#pagination-demo').hide().next().show()
                    } else if (res.data.totalCount != 0 && callback != null) {//说明有数据回来
                        $('#pagination-demo').show().next().hide()
                        // 2.3.2显示分页插件
                        callback(res)
                    } else if (res.data.totalCount != 0 && res.data.data.length == 0) {//最后一页删除功能
                        delpage -= 1
                        // 2.3.3重新加载控件
                        $('#pagination-demo').twbsPagination('changeTotalPages', res.data.totalPage, delpage)
                    }
                }

            }
        })
    }

    var delpage = 1
    // 3、封装分页插件
    function pagination(res) {
        $('#pagination-demo').twbsPagination({
            totalPages: res.data.totalPage, //总页数
            visiblePages: 7,  //每页显示数量
            initiateStartPageClick: false,
            first: "首页",
            prev: "上一页",
            next: "下一页",
            last: "尾页",
            onPageClick: function (event, page) {
                delpage = page
                // 点击发送请求换页更新数据
                getDataByParams(page, null)
            }
        });
    }


    // 4.删除功能
    // 4.1给删除按钮注册事件
    // 4.2获取被删除评论的id
    // 4.3向删除评论的接口发送请求
    // 4、4删除成功后重新想评论列表接口发送请求更新数据

    // 4.1给删除按钮注册事件
    $('tbody').on('click', '.btn-danger', function () {
        // 4.3向删除评论的接口发送请求
        $.ajax({
            type: 'post',
            url: BigNew.comment_delete,
            data: {
                id: $(this).data('id')// 4.2获取被删除评论的id
            },
            success: function (res) {
                if (res.code == 200) {
                    // 4、4删除成功后重新想评论列表接口发送请求更新数据
                    getDataByParams(delpage, null)
                }
            }
        })
    })



})