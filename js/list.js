$(function () {
    // 1、获取主页传递过来的id或关键字
    var obj = utils.convertToObj(window.location.search.slice(1))
    // console.log(obj);
    // 2、判断用户是不是从主页面跳转过来的，如果是，根据条件发送Ajax请求，否则跳转到主页
    if (!window.location.search) {
        // 2.1为空跳转到主页，阻止代码向下执行
        window.location.href = './index.html'
        return
    }

    // 3、判断从主页拼接的参数是id还是关键字 
    if (obj.id) { // 说明是通过id发送的请求
        var data = { type: obj.id }
    } else { // 说明是通过关键字发送的请求
        var data = { key: decodeURI(obj.search) }
    }

    // 4、根据参数项data向文章搜索页发送请求并渲染到页面上
    // 4.1 封装一个发送请求的函数
    // 4.2、封装一个分页插件的函数
    // 4.3调用发送请求的函数，让页面一进入就发请求渲染

    var mypage = 1 //定义一个全局变量存放分页插件所需的当前页码值
    // 4.3调用发送请求的函数，让页面一进入就发请求渲染
    getDataByParams(1)

    // 4.1 封装一个发送请求的函数
    function getDataByParams(page) {
        data["page"] = page  //向对象data添加属性page和属性值
        // console.log(data);
        $.ajax({ //发送请求
            type: 'get',
            url: BigNew.index_search,
            data: data,
            success: function (res) {
                if (!res.data.data.length) { //说明没有数据
                    $('.setfr').html(`  <div class="list_title">
                                    <h3>一条数据都没有</h3>
                                    </div>`)
                } else { //说明有数据
                    // 4.1.1有数据就判断是通过关键字搜索还是点击类别进入的页面
                    if (obj.id) {
                        res.data.dataCategory = res.data.data[0].category
                    } else {
                        res.data.dataCategory = '关键词：' + decodeURI(obj.search)
                    }
                    // 4.1.2将数据绑定在模板上并渲染页面
                    var htmlStr = template('search', res.data)
                    $('.setfr').html(htmlStr)

                    // 4.1.3调用分页插件
                    pagination(res)
                }
            }
        })
    }

    // 4.2、封装一个分页插件的函数
    function pagination(res) {
        $("#pagination").pagination({
            currentPage: mypage, //当前选中的页面
            totalPage: Math.floor(res.data.totalCount / 6) + 1,//总页数
            callback: function (current) {
                mypage = current
                // 重新发送请求
                getDataByParams(current)
            }
        });
    }
})