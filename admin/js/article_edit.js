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
                $('input[name="title"]').val(res.data.title)
                $('.article_cover').attr('src', res.data.cover)
                // 时间控件的内容回显
                $('#testico').val(res.data.date)
                // 富文本编辑器的内容回显
                editor2.txt.html(res.data.content)

                var categoryId = res.data.categoryId
                // 文章渲染完毕之后，再来渲染默认的分类
                // 2,1、进入页面，发送Ajax请求获取所有文章分类
                $.ajax({
                    type: 'get',
                    url: BigNew.category_list,
                    success: function (res) {
                        if (res.code == 200) {
                            // 2.2将文章的默认分类存到响应回来的对象中（js是动态弱类型语言，可以随时点出来属性或方法）
                            res.categoryId = categoryId
                            // 2.3将数据绑定在模板上
                            var htmlStr = template('categoryList', res)
                            // 2.4将数据渲染到页面上
                            $('.category').html(htmlStr)
                        }
                    }
                }) //获取文章分类的请求
            }

        }
    })

    // 3、点击input表单显示时间控件
    jeDate("#testico", {
        format: "YYYY-MM-DD",
        zIndex: 20999,
        isTime: false
        // minDate: "2014-09-19 00:00:00"
    })

    // 4、使用wangEditor富文本
    var E = window.wangEditor
    var editor2 = new E('#div1')
    editor2.create()
    //  editor2.txt.html

    // 5、预览图片
    $('#inputCover').on('change', function () {
        var url = URL.createObjectURL(this.files[0])
        $('.article_cover').attr('src', url)
    })

    // 6、点击修改按钮/存为草稿按钮发送Ajax请求更改文章数据
    $('.btn').on('click', function (e) {
        // 6.1阻止默认提交行为
        e.preventDefault()
        // 6.2准备数据
        var data = new FormData($('#form').get(0))
        data.append('id', obj.id)
        data.append('content', editor2.txt.text())
        // 6.2.1通过e.target判断当前点击的按钮是修改还是存为草稿
        if ($(e.target).hasClass('btn-edit')) { //如果当前点击的对象中有btn-edit的类，即为修改按钮
            data.append('state', '已发布')
        } else { //否则为存为草稿
            data.append('state', '草稿')
        }
        // 6.3、发送请求
        $.ajax({
            type: 'post',
            url: BigNew.article_edit,
            data: data,
            contentType: false,
            processData: false,
            success: function (res) {
                if (res.code == 200) {
                    // 6.4、修改成功后，返回上一页
                    window.history.back()
                }
            }
        })
    })

    /*  // 6、点击修改按钮发送Ajax请求更改文章数据
     $('.btn-edit').on('click', function (e) {
         // 6.1阻止默认提交行为
         e.preventDefault()
         // 6.2准备数据
         var data = new FormData($('#form').get(0))
         data.append('id', obj.id)
         data.append('content', editor2.txt.text())
         data.append('state', '已发布')
         // 6.3、发送请求
         $.ajax({
             type: 'post',
             url: BigNew.article_edit,
             data: data,
             contentType: false,
             processData: false,
             success: function (res) {
                 if (res.code == 200) {
                     // 6.4、修改成功后，返回上一页
                     window.history.back()
                 }
             }
         })
     })
 
     // 7、点击存为草稿按钮发送Ajax请求更改文章数据
     $('.btn-draft').on('click', function (e) {
         // 7.1阻止默认提交行为
         e.preventDefault()
         // 7.2准备数据
         var data = new FormData($('#form').get(0))
         data.append('id', obj.id)
         data.append('content', editor2.txt.text())
         data.append('state', '草稿')
         // 7.3、发送请求
         $.ajax({
             type: 'post',
             url: BigNew.article_edit,
             data: data,
             contentType: false,
             processData: false,
             success: function (res) {
                 if (res.code == 200) {
                     // 7.4、修改成功后，返回上一页
                     window.history.back()
                 }
             }
         })
     }) */

})