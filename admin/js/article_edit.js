$(function () {
    // 1、根据文章id回显数据
    // var str = window.location.search
    // var count = str.slice(1)
    // var id = location.search.slice(1)
    // 1、1获取点击编辑的文章的id
    // 1、2在列表页将id通过拼接在a标签链接上，在跳转到编辑页之后用location.search获取到
    // 1、3通过封装utils.js文件，将获取到的参数转为对象形式
    var obj = utils.convertToObj(location.search.slice(1))

    // 2、通过id获取文章内容显示在编辑页上
    $.ajax({
        type: 'get',
        url: BigNew.article_search,
        data: { id: obj.id },
        success: function (res) {
            if (res.code == 200) {
                window.categoryId = res.data.categoryId
                $('input[name="title"]').val(res.data.title)
                $('.article_cover').attr('src', res.data.cover)
                // $('input[name="title"]').val(res.data.title)
                $('input[name="date"]').val(res.data.date)
                $('textarea[name="content"]').val(res.data.content)
            }

        }
    })

    // 3、进入页面先获取所有文章分类
    $.ajax({
        type: 'get',
        url: BigNew.category_list,
        success: function (res) {
            if (res.code == 200) {
                // 3.1将数据绑定在模板上
                var htmlStr = template('categoryList', res)
                // 3.2将数据渲染到页面上
                $('.category').html(htmlStr)

                $('.category option').each(function (index, ele) {
                    if ($(ele).val() == categoryId) {
                        $(ele).prop('selected', true).siblings().prop('selected', false)
                    }
                })
            }
        }
    }) //获取文章分类的请求




})