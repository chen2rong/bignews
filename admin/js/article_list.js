$(function () {
    // 1、进入页面先获取所有文章类别
    $.ajax({
        type: 'get',
        url: BigNew.category_list,
        success: function (res) {
            if (res.code == 200) {
                // 将数据绑定在模板上
                var htmlStr = template('sel_Category', res)
                // 将数据渲染到页面上
                $('#selCategory').html(htmlStr)
            }
        }
    })

    // 2、将文章信息列表显示在页面上
    // 调用封装的请求文章列表的函数
    getDataByParams({
        key: $('#key').val(),
        type: $('#selCategory').val(),
        state: $('#selStatus').val(),
        page: 1,
        perpage: 6
    })
    function getDataByParams(obj) {
        $.ajax({
            type: 'get',
            url: BigNew.article_query,
            data: {
                // 搜索关键词，可以为空，为空返回某类型所有文章
                key: obj.key,
                // 文章类型id，可以为空，为空返回所有类型文章
                type: obj.type,
                // 文章状态，草稿 ，已发布,为空返回所有状态文章
                state: obj.state,
                // 当前页，为空返回第1页
                page: obj.page,
                // 每页显示条数，为空默认每页6条
                perpage: obj.perpage
            },
            success: function (res) {
                if (res.code == 200) {
                    // 将数据绑定在模板上
                    var htmlStr = template('listCategory', res.data)
                    // 将数据渲染到页面上
                    $('.table-striped tbody').html(htmlStr)
                }

                // 4.1、在页面数据加载渲染完成后再显示分页
                pagination(res.data.totalPage, 6)
            }  //成功请求的回调函数
        })
    } //封装的getDataByParams函数
    // 同步筛选和点击分页的页码
    window.index = 1
    // 3、根据条件筛选文章
    $('.form-inline').on('submit', function (e) {
        // 3.1、阻止表单默认提交行为
        e.preventDefault()
        // 3.2、获取筛选条件上对应的value值筛选出对应的信息
        getDataByParams({
            key: $('#key').val(),
            type: $('#selCategory').val(),
            state: $('#selStatus').val(),
            page: index,
            perpage: 6
        })
    })



    // 4、封装引入分页插件的js代码
    function pagination(totalPages, visiblePages) {
        $('#pagination-demo').twbsPagination({
            totalPages: totalPages,
            visiblePages: visiblePages || 7,
            initiateStartPageClick: false,
            first: "首页",
            prev: "上一页",
            next: "下一页",
            last: "尾页",
            onPageClick: function (event, page) {
                // console.log(event, page);
                // 同步筛选页码
                index = page
                getDataByParams({
                    key: $('#key').val(),
                    type: $('#selCategory').val(),
                    state: $('#selStatus').val(),
                    page: page,
                    perpage: 6
                })
            }
        });  //分页
    }

})  //入口函数