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

    // 2、添加时间控件
    jeDate("#testico", {
        format: "YYYY-MM-DD",
        zIndex: 20999,
        isTime: false
        // minDate: "2014-09-19 00:00:00"
    })

    // 3、使用wangEditor富文本
    var E = window.wangEditor
    var editor2 = new E('#div1')
    editor2.create()

    // 5、预览图片
    $('#inputCover').on('change', function () {
        var url = URL.createObjectURL(this.files[0])
        $('.article_cover').attr('src', url)
    })

    // 6、单击发布/存为草稿按钮发送请求添加文章
    $('.btn').on('click', function (e) {
        // 6.1阻止默认提交行为
        e.preventDefault()
        // 6.2准备数据
        var data = new FormData($('#form').get(0))
        data.append('content', editor2.txt.text())
        // 6.2.1通过e.target判断当前点击的按钮是修改还是存为草稿
        if ($(e.target).hasClass('btn-release')) { //如果当前点击的对象中有btn-edit的类，即为修改按钮
            data.append('state', '已发布')
        } else { //否则为存为草稿
            data.append('state', '草稿')
        }
        // 6.3、发送请求
        $.ajax({
            type: 'post',
            url: BigNew.article_publish,
            data: data,
            contentType: false,
            processData: false,
            success: function (res) {
                if (res.code == 200) {
                    // 6.4、修改成功后，返回上一页
                    window.location.href = './article_list.html'
                    // 6.5、父页面的文章列表高亮显示
                    parent.$('.level02 li:eq(0)').click()
                }
            }
        })
    })

})