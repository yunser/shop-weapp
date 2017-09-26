const App = getApp()

Page({
    data: {
        addresses: [],
        address: {},
        prompt: {
            hidden: !0,
            icon: '../../../assets/images/iconfont-addr-empty.png',
            title: '还没有收货地址呢',
            text: '暂时没有相关数据',
        },
    },
    onLoad() {
        this.address = App.HttpResource('/addresses/:id', {id: '@id'})
        this.onPullDownRefresh()
    },
    onShow() {
        this.onPullDownRefresh()
    },
    initData() {
        this.setData({
            address: {
                items: [],
                params: {
                    page : 1,
                    limit: 10,
                },
                paginate: {}
            }
        })
    },
    toAddressEdit(e) {
        console.log(e)
        App.WxService.navigateTo('/pages/address/edit/index', {
            id: e.currentTarget.dataset.id
        })
    },
    toAddressAdd(e) {
        console.log(e)
        App.WxService.navigateTo('/pages/address/add/index')
    },
    setDefalutAddress(e) {
        const id = e.currentTarget.dataset.id
        App.HttpService.setDefalutAddress(id)
        .then(res => {
            res = res.data
            console.log(res)
            if (res.code === 0) {
                this.onPullDownRefresh()
            }
        })
    },
    getList() {
        const address = this.data.address
        const params = address.params

        // App.HttpService.getAddressList(params)
        this.address.queryAsync(params)
        .then(res => {
            res = res.data
            console.log(res)
            if (res.code === 0) {
                // address.items = [...address.items, ...data.data.items]
                // address.paginate = data.data.paginate
                // address.params.page = data.data.paginate.next
                // address.params.limit = data.data.paginate.perPage
                this.setData({
                    addresses: res.data
                    // address: address,
                    // 'prompt.hidden': address.items.length,
                })
            }
        })
    },
    onPullDownRefresh() {
        console.info('onPullDownRefresh')
        this.initData()
        this.getList()
    },
    onReachBottom() {
        console.info('onReachBottom')
        if (!this.data.address.paginate.hasNext) return
        this.getList()
    },
})