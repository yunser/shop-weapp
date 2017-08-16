//index.js
//获取应用实例
var app = getApp()
Page({
    data: {
        motto: 'Hello World',
        userInfo: {}
    },
    //事件处理函数
    bindViewTap: function () {
        wx.navigateTo({
            url: '../logs/logs'
        })
    },
    //查询事件
    btnClick:function(){
        var thisexpress=this;
        app.getExpressInfo(this.data.einputinfo,function(data){
            console.log(data);
            thisexpress.setData({expressInfo:data})
        })
    },
    globalData:{
        userInfo:null
    },
    pay() {

    },
    onLoad: function () {
        console.log('onLoad')
        var that = this
        //调用应用实例的方法获取全局数据
        app.getUserInfo(function (userInfo) {
            //更新数据
            that.setData({
                userInfo: userInfo
            })
        })
    }
})
