(function (w) {
    var baseURL = 'http://localhost:8080/api/v1'
    var BigNew = {
        baseURL: baseURL,//基地址
        // 后台
        user_login: baseURL + '/admin/user/login',//用户登录
        user_info: baseURL + '/admin/user/info',//用户信息
        user_detail: baseURL + '/admin/user/detail',//用户详情
        user_edit: baseURL + '/admin/user/edit',//用户编辑
        category_list: baseURL + '/admin/category/list',//文章类别查询
        category_add: baseURL + '/admin/category/add',//文章类别新增
        category_search: baseURL + '/admin/category/search',//文章类别搜索
        category_edit: baseURL + '/admin/category/edit',//文章类别编辑
        category_delete: baseURL + '/admin/category/delete',//文章类别删除
        article_query: baseURL + '/admin/article/query',//文章搜索
        article_publish: baseURL + '/admin/article/publish',//文章发布
        article_search: baseURL + '/admin/article/search',//文章信息查询
        article_edit: baseURL + '/admin/article/edit',//文章编辑
        article_delete: baseURL + '/admin/article/delete',//文章删除
        comment_list: baseURL + '/admin/comment/search',//文章评论列表
        comment_pass: baseURL + '/admin/comment/pass',//文章评论通过
        comment_reject: baseURL + '/admin/comment/reject',//文章评论不通过
        comment_delete: baseURL + '/admin/comment/delete',//文章评论删除
        // 前端
        index_categoty: baseURL + '/index/category', //文章类型
        index_hotpic: baseURL + '/index/hotpic',//热点图
        index_latest: baseURL + '/index/latest',//最新资讯
        index_rank: baseURL + '/index/rank', //文章热门
        latest_comment: baseURL + '/index/latest_comment', //最新评论
        index_attention: baseURL + '/index/attention', //焦点关注 
        index_search: baseURL + '/index/search',//文章搜索
        index_article: baseURL + '/index/article',//文章详情内容
        get_comment: baseURL + '/index/get_comment', //评论列表
        post_comment: baseURL + '/index/post_comment',//发表评论
    };
    // 向外暴露对象
    w.BigNew = BigNew
})(window)