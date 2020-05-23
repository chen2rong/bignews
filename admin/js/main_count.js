$(function () {
    // 1、向统计数据接口发送请求
    $.ajax({
        type: 'get',
        url: BigNew.data_info,
        success: function (res) {
            // 1.1、请求回来的数据要渲染到页面
            // console.log(res);
            $('.scolor00 em').text(res.totalArticle) //文章总数
            $('.scolor01 em').text(res.dayArticle)  //日新增文章数
            $('.scolor02 em').text(res.totalComment)//总评论数
            $('.scolor03 em').text(res.dayComment)//日新增评论数
        }
    })


    // 2、折线图 
    // 2.1向日新增文章数量统计接口发送请求准备图表数据
    // 2.2将数据传入图表

    // 2.1向日新增文章数量统计接口发送请求准备图表数据
    $.ajax({
        type: 'get',
        url: BigNew.data_article,
        success: function (obj) {
            // 2.2将数据传入图表
            // console.log(obj);
            loadEchars(obj);

            function loadEchars(obj) {

                // 基于准备好的dom，初始化echarts实例
                var myChart = echarts.init(document.getElementById('curve_show'));

                var data = [];
                var date = [];
                for (var i = 0; i < obj.date.length; i++) {
                    data.push(obj.date[i].count);
                    date.push(obj.date[i].date);
                }

                option = {
                    tooltip: {
                        trigger: 'axis',
                        position: function (pt) {
                            return [pt[0], '10%'];
                        }
                    },
                    title: {
                        left: 'center',
                        text: '月新增文章数',
                    },

                    xAxis: {
                        name: '日',
                        type: 'category',
                        boundaryGap: false,
                        data: date
                    },
                    legend: {
                        data: ['新增文章'],
                        top: '40'
                    },
                    toolbox: {
                        show: true,
                        feature: {
                            dataZoom: {
                                yAxisIndex: 'none'
                            },
                            dataView: { readOnly: false },
                            magicType: { type: ['line', 'bar'] },
                            restore: {},
                            saveAsImage: {}
                        },
                        right: 50
                    },
                    yAxis: {
                        type: 'value',
                        boundaryGap: [0, '100%']
                    },
                    series: [
                        {
                            name: '新增文章',
                            type: 'line',
                            smooth: true,
                            // symbol: 'none',
                            sampling: 'average',
                            itemStyle: {
                                color: '#f80'
                            },
                            areaStyle: {
                                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                    offset: 0,
                                    color: 'rgba(255,136,0,0.39)'
                                }, {
                                    offset: .34,
                                    color: 'rgba(255,180,0,0.25)'
                                },
                                {
                                    offset: 1,
                                    color: 'rgba(255,222,0,0.00)'
                                }])
                            },
                            data: data
                        }
                    ],
                }
                // 使用刚指定的配置项和数据显示图表。
                myChart.setOption(option);
            }
        }
    })


    // 3、环形图 
    // 3.1向各类型文章数量统计接口发送请求准备图表数据
    // 3.2将数据传入图表


    // 2.1向各类型文章数量统计接口发送请求准备图表数据
    $.ajax({
        type: 'get',
        url: BigNew.data_category,
        success: function (obj) {
            // 2.2将数据传入图表
            loadEchars(obj);

            function loadEchars(obj) {
                console.log(obj);
                // 基于准备好的dom，初始化echarts实例
                var myChart1 = echarts.init(document.getElementById('pie_show'));

                var data = [];
                var date = [];
                for (var i = 0; i < obj.date.length; i++) {
                    var res = { value: obj.date[i].articles, name: obj.date[i].name }
                    data.push(res)
                    date.push(obj.date[i].name)
                }
                console.log(data, date);


                option1 = {
                    title: {
                        left: 'center',
                        text: '分类文章数量比',
                    },
                    tooltip: {
                        trigger: 'item',
                        formatter: "{a} <br />{b}: {c} ({d}%)"
                    },
                    legend: {
                        orient: 'horizontal',
                        x: 'center',
                        /* data:["爱生活", "爱旅行", "爱美食", "爱运动", "经济特区"], */
                        data: date,
                        top: 30
                    },
                    color: ['#5885e8', '#13cfd5', '#00ce68', '#ff9565', '#20ff19'],
                    series: [
                        {
                            name: '分类名称',
                            type: 'pie',
                            radius: ['50%', '70%'],
                            avoidLabelOverlap: false,
                            label: {
                                emphasis: {
                                    show: true,
                                    textStyle: {
                                        fontSize: '30',
                                        fontWeight: 'bold'
                                    }
                                }
                            },
                            /* data: [
                                { value: 335, name: '爱生活' },
                                { value: 310, name: '趣美味' },
                                { value: 234, name: '爱旅行' },
                                { value: 135, name: '爱电影' },
                                { value: 548, name: '爱游泳' }
                            ] */
                            data: data
                        }
                    ]
                };
                // 使用刚指定的配置项和数据显示图表。
                myChart1.setOption(option1);


            }
        }
    })

})