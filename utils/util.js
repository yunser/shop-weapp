import Promise from 'bluebird';

function formatTime(time, format) {
    let temp = '0000000000' + time
    let len = format.length
    return temp.substr(-len)
}
/**/
function formatTime(date) {
    var year = date.getFullYear()
    var month = date.getMonth() + 1
    var day = date.getDate()

    var hour = date.getHours()
    var minute = date.getMinutes()
    var second = date.getSeconds()


    return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
    n = n.toString()
    return n[1] ? n : '0' + n
}

//浮点数加法运算
function floatAdd(arg1, arg2) {
    var r1, r2, m;
    try {
        r1 = arg1.toString().split(".")[1].length
    } catch (e) {
        r1 = 0
    }
    try {
        r2 = arg2.toString().split(".")[1].length
    } catch (e) {
        r2 = 0
    }
    m = Math.pow(10, Math.max(r1, r2));
    return (arg1 * m + arg2 * m) / m;
}

//浮点数减法运算
function floatSub(arg1, arg2) {
    var r1, r2, m, n;
    try {
        r1 = arg1.toString().split(".")[1].length
    } catch (e) {
        r1 = 0
    }
    try {
        r2 = arg2.toString().split(".")[1].length
    } catch (e) {
        r2 = 0
    }
    m = Math.pow(10, Math.max(r1, r2));
    //动态控制精度长度
    n = (r1 = r2) ? r1 : r2;
    return ((arg1 * m - arg2 * m) / m).toFixed(n);
}

//浮点数乘法运算
function floatMul(arg1, arg2) {
    var m = 0, s1 = arg1.toString(), s2 = arg2.toString();
    try {
        m += s1.split(".")[1].length
    } catch (e) {
    }
    try {
        m += s2.split(".")[1].length
    } catch (e) {
    }
    return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m);
}


//浮点数除法运算
function floatDiv(arg1, arg2) {
    var t1 = 0, t2 = 0, r1, r2;
    try {
        t1 = arg1.toString().split(".")[1].length
    } catch (e) {
    }
    try {
        t2 = arg2.toString().split(".")[1].length
    } catch (e) {
    }
    r1 = Number(arg1.toString().replace(".", ""));
    r2 = Number(arg2.toString().replace(".", ""));
    return (r1 / r2) * Math.pow(10, t2 - t1);
}
/**/
function formatNumber(n) {
    n = n.toString()
    return n[1] ? n : '0' + n
}

function getDateStr(date) {
    if (!date) return '';
    return date.getFullYear() + '年' +  (date.getMonth() + 1) + '月' +date.getDate() + '日';
}

/**
 * 生成GUID序列号
 * @returns {string} GUID
 */
function guid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        let r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

/**
 * 记录日志
 * @param {Mixed} 记录的信息
 * @returns {Void}
 */
function log(msg) {
    if (!msg) return;
    if (getApp().settings['debug'])
        console.log(msg);
    let logs = wx.getStorageSync('logs') || [];
    logs.unshift(msg)
    wx.setStorageSync('logs', logs)
}

/**
 * @param {Function} func 接口
 * @param {Object} options 接口参数
 * @returns {Promise} Promise对象
 */
function promiseHandle(func, options) {
    options = options || {};
    return new Promise((resolve, reject) => {
        if (typeof func !== 'function')
            reject();
        options.success = resolve;
        options.fail = reject;
        func(options);
    });
}
module.exports = {
    formatTime: formatTime,

    floatMul: floatMul,
    floatDiv: floatDiv,
    floatSub: floatSub,
    floatAdd: floatAdd,

    guid: guid,
    log: log,
    promiseHandle: promiseHandle,
    getDateStr: getDateStr,
    formatNumber: formatNumber
}