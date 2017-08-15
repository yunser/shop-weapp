var app = getApp()
Page({
    data: {
        showTopTips: false,
        errorText: '输入不能为空',
        motto: 'Hello World2',
        userInfo: {}
    },
    formSubmit: function(e) {
        console.log('form发生了submit事件，携带数据为：', e.detail.value)
    },
    formReset: function() {
        console.log('form发生了reset事件')
    },
    showTopTips: function(){
        var that = this;
        this.setData({
            showTopTips: true
        });
        setTimeout(function(){
            that.setData({
                showTopTips: false
            });
        }, 3000);
    },
    //事件处理函数
    bindViewTap: function () {
        wx.navigateTo({
            url: '../logs/logs'
        })
    },
    onLoad: function () {

    }
})
