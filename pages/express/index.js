var app = getApp()

Page({
    data: {
        no: '',
        com: '',

        showTopTips: false,
        errorText: '输入不能为空',

        motto: 'Hello World',
        userInfo: {},
        companies: ['汇通', "顺丰", "申通", '圆通', '韵达', '天天', 'EMS', '中通'],
        companyInfo: [
            {com: "汇通", no: "ht"},
            {com: "顺丰", no: "sf"},
            {com: "申通", no: "sto"},
            {com: "圆通", no: "yt"},
            {com: "韵达", no: "yd"},
            {com: "天天", no: "tt"},
            {com: "EMS", no: "ems"},
            {com: "中通", no: "zto"}
        ],
        list: []
    },
    // 查询事件
    input: function (e) {
        console.log(e.detail.value)

        this.setData({
            showTopTips: false,
            no: e.detail.value
        })
    },
    btnClick: function () {
        let _this = this
        var thisexpress = this;

        console.log(this.data.com, this.data.no)

        if (!this.data.no) {
            this.setData({
                showTopTips: true,
                errorText: '请输入快递单号'
            })
            return
        }

        console.log('---', this.data.no)
        if (!this.data.com) {
            this.setData({
                showTopTips: true,
                errorText: '请选择公司名称'
            })
            return
        }

        wx.request({
            url: 'https://v.juhe.cn/exp/index',
            data: {
                com: _this.data.com,
                no: _this.data.no,
                key: '4d4dc97228d9420fc1f5b25cd1340427'
            },
            success: function (res) {
                console.log(res.data.result)

                var result = res.data.result.list
                var viewList = []
                result.forEach(item => {
                    viewList.push(item.datetime + '： ' + item.remark)
                })
                _this.setData({
                    list: viewList
                })
            }
        })
    },
    bindPickerChange: function (e) {
        console.log('picker发送选择改变，携带值为', this.data.companyInfo[e.detail.value].no)
        this.setData({
            showTopTips: false,
            index: e.detail.value
        })
        this.data.com = this.data.companyInfo[e.detail.value].no
    },
    onLoad: function () {
        wx.getStorage({
            key: 'company',
            success: function (res) {
                console.log(res.data)
            },
            complete: function (res) {
                console.log(1212, res)
            },
            fail: function (res) {
                console.log(3434, res)
            }
        })
    }
})
