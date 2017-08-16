//app.js
App({
    onLaunch: function () {
        //调用API从本地缓存中获取数据
        var logs = wx.getStorageSync('logs') || []
        logs.unshift(Date.now())
        wx.setStorageSync('logs', logs)
    },
    getExpressInfo: function (nu, cb) {
        wx.request({
            url: 'https://v.juhe.cn/exp/com?key=4d4dc97228d9420fc1f5b25cd1340427',
            success: function (res) {
                console.log(res.data)
                cb(res.data);
                var arr = res.data.result

            }
        })
    },
    getUserInfo: function (cb) {
        var that = this
        if (this.globalData.userInfo) {
            typeof cb == "function" && cb(this.globalData.userInfo)
        } else {
            //调用登录接口
            wx.getUserInfo({
                withCredentials: false,
                success: function (res) {
                    that.globalData.userInfo = res.userInfo
                    typeof cb == "function" && cb(that.globalData.userInfo)
                }
            })
        }
    },

    globalData: {
        userInfo: null
    },

    //自定义配置
    settings: {
        debug: true, //是否调试模式
        moreLink: 'http://github.com/oopsguy'
    }
})
