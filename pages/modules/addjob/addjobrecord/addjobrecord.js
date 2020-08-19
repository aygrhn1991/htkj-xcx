var util = require('../../../../utils/util');
Page({
    data: {
        record: []
    },
    slideButtonTap: function (e) {
        if (e.detail.data.date < util.dateToYYYYMMDD(util.addDay(new Date(), new Date().getHours() < 12 ? 0 : 1))) {
            wx.showToast({ title: '该记录已生效，无法撤回', icon: 'none' });
            return;
        }
        wx.request({
            url: getApp().globalData.host + `/api/deleteAddJobRecord/${e.detail.data.id}`,
            method: 'POST',
            success: res => {
                wx.showToast({
                    title: res.data.message,
                    icon: res.data.success ? 'success' : 'none',
                    success: () => {
                        if (res.data.success) {
                            this.onLoad();
                        }
                    }
                })
            }
        })
    },
    onLoad: function (options) {
        wx.showLoading({ title: '加载中' });
        wx.request({
            url: getApp().globalData.host + `/api/getAddJobRecordOfUser/${getApp().globalData.user.id}`,
            success: res => {
                var set = new Set();
                res.data.data.forEach(x => {
                    set.add(x.date.substr(0, 7));
                });
                this.data.record = [];
                Array.from(set).forEach(x => {
                    var temp = { date: x, data: [] };
                    res.data.data.forEach(y => {
                        y.buttons = [{ type: 'warn', text: '撤回', data: util.copyObject(y) }];
                        if (util.startWith(y.date, x)) {
                            temp.data.push(y);
                        }
                    });
                    this.data.record.push(temp);
                });
                this.setData({ record: this.data.record });
            },
            complete: () => { wx.hideLoading() }
        })
    }
})