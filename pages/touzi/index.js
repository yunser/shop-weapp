Page({
    global: {
        timer: null,
        isRand: false
    },
    data: {
        dice: ['first', 'second', 'third', 'fourth', 'fifth', 'sixth'],
        buttonType: 'primary',
        buttonValue: '摇一摇',
        isShow: 'hidden',
        num1: 0,
        num2: 0,
        num3: 0,
        total: 0,
        last_update:0,
        last_x:0,
        last_y:0,
        last_z:0
    },
    onReady: function (e) {
        var determination = false
        var that = this

        wx.onAccelerometerChange(function(res) {

            var curTime = new Date().getTime()
            var SHAKE_THRESHOLD = 60
            var last_update = that.data.last_update

            if ((curTime - last_update) > 100) {
                var diffTime = curTime - last_update;
                var speed = Math.abs(res.x + res.y + res.z - that.data.last_x - that.data.last_y - that.data.last_z) / diffTime * 10000;
                console.log(speed)
                if (speed > SHAKE_THRESHOLD && !determination) {
                    determination = true
                    that.shakeClick()
                    //determination = that.f(util.res[list])
                }
                that.setData({
                    last_update: curTime,
                    last_x: res.x,
                    last_y: res.y,
                    last_z: res.z
                })
            }
        })
    },
    shakeClick: function () {
        let me = this;
        this.global.isRand = !this.global.isRand;
        if (this.global.isRand) {
            this.global.timer = setInterval(function () {
                let num1 = Math.floor(Math.random() * 6);
                let num2 = Math.floor(Math.random() * 6);
                let num3 = Math.floor(Math.random() * 6);
                me.setData({num1: num1});
                me.setData({num2: num2});
                me.setData({num3: num3});
                me.setData({total: num1 + num2 + num3 + 3});
            }, 50);

            setTimeout(function () {
                clearInterval(me.global.timer);
                me.global.isRand = !me.global.isRand;
            }, 1000)
        } else {
        }

        this.setData({
            dice: this.data.dice,
            buttonType: (this.global.isRand) ? 'default' : 'primary',
            buttonValue: (this.global.isRand) ? '停止' : '摇一摇',
            isShow: (this.global.isRand) ? 'hidden' : 'show',
        });

    },
})
