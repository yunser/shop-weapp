const App = getApp()

Page({
    data: {
        indicatorDots: !0,
        vertical: !1,
        autoplay: !1,
        interval: 3000,
        duration: 1000,
        current: 0,
        goods: {
            item: {}
        },

        product: {},
        images: [
            'http://120.24.226.112:9998/static/img/logo.png',
            'http://120.24.226.112:9998/static/img/logo.png',
            'http://120.24.226.112:9998/static/img/logo.png'
        ]
    },
    swiperchange(e) {
        this.setData({
            current: e.detail.current, 
        })
    },
    onLoad(option) {
        this.goods = App.HttpResource('/goodses/:id', {id: '@id'})
        this.setData({
            id: option.id
        })
    },
    onShow() {
        this.getDetail(this.data.id)
    },
    addCart(e) {
        const goods = this.data.goods.item._id
        App.HttpService.addCartByUser(this.data.product)
        .then(res => {
            res = res.data
            console.log(res)
            if (res.code === 0) {
                this.showToast('添加成功')
            }
        })
    },
    previewImage(e) {
        const urls = this.data.goods && this.data.goods.item.images.map(n => n.path)
        const index = e.currentTarget.dataset.index
        const current = urls[Number(index)]
        
        App.WxService.previewImage({
            current: current, 
            urls: urls, 
        })
    },
    showToast(message) {
        App.WxService.showToast({
            title   : message, 
            icon    : 'success', 
            duration: 1500, 
        })
    },
    getDetail(id) {
    	// App.HttpService.getDetail(id)
        this.goods.getAsync({id: id})
        .then(res => {
            res = res.data
            console.log(res)
        	if (res.code == 0) {
        		this.setData({
                    product: res.data
                })
        	}
        })
    },
})