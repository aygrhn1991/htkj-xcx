var util = require('../../../../utils/util');
Page({
    data: {
        date: util.dateToYYYYMMDD(util.addDay(new Date(), new Date().getHours() < 15 ? 1 : 2)),
        dateStart: util.dateToYYYYMMDD(util.addDay(new Date(), new Date().getHours() < 15 ? 1 : 2)),
        weekDay: util.dateToWeekDay(util.addDay(new Date(), new Date().getHours() < 15 ? 1 : 2)),
        meal: 1,
        mealTime: 2,
        bus: 1,
        busTime: 2,
        busTo: 0,
        busToStation: null,
        mealOption: [
            { id: 0, name: '不用餐', checked: false },
            { id: 1, name: '用餐', checked: true },
        ],
        mealTimeOption: [
            { id: 1, name: '午餐', checked: false },
            { id: 2, name: '晚餐', checked: true },
        ],
        busOption: [
            { id: 0, name: '不乘车', checked: false },
            { id: 1, name: '乘车', checked: true },
        ],
        busTimeOption: [
            { id: 1, name: '16:30', checked: false },
            { id: 2, name: '19:30', checked: true },
        ],
        busToOption: [
            { id: 1, name: '8:00', checked: false },
        ]
    },
    bindDateChange: function (e) {
        this.setData({
            date: e.detail.value,
            weekDay: util.dateToWeekDay(util.stringToDate(e.detail.value))
        })
    },
    bindMealChange: function (e) {
        this.data.mealOption.forEach(x => {
            if (x.id == e.detail.value) {
                this.data.meal = e.detail.value;
                x.checked = true;
            } else {
                x.checked = false;
            }
        });
        this.setData({
            meal: this.data.meal,
            mealOption: this.data.mealOption
        })
    },
    bindMealTimeChange: function (e) {
        if (e.detail.value.length == 2) {
            this.data.mealTime = 3;
        } else if (e.detail.value.length == 1) {
            this.data.mealTime = e.detail.value[0];
        } else {
            this.data.mealTime = null;
        }
        this.data.mealTimeOption.forEach(x => {
            x.checked = false;
            e.detail.value.forEach(y => {
                if (x.id == y) {
                    x.checked = true;
                }
            });
        });
        this.setData({
            mealTime: this.data.mealTime,
            mealTimeOption: this.data.mealTimeOption
        });
    },
    bindBusChange(e) {
        this.data.busOption.forEach(x => {
            if (x.id == e.detail.value) {
                this.data.bus = e.detail.value;
                x.checked = true;
            } else {
                x.checked = false;
            }
        });
        this.setData({
            bus: this.data.bus,
            busOption: this.data.busOption
        })
    },
    bindBusTimeChange(e) {
        this.data.busTimeOption.forEach(x => {
            if (x.id == e.detail.value) {
                this.data.busTime = e.detail.value;
                x.checked = true;
            } else {
                x.checked = false;
            }
        });
        this.setData({
            busTime: this.data.busTime,
            busTimeOption: this.data.busTimeOption
        })
    },
    bindBusToChange(e) {
        if (e.detail.value.length == 1) {
            this.data.busTo = 1;
            this.data.busToOption[0].checked = true;
        } else {
            this.data.busTo = 0;
            this.data.busToOption[0].checked = false;
        }
        this.setData({
            busTo: this.data.busTo,
            busToOption: this.data.busToOption
        });
    },
    bindSubmit: function () {
        if (this.data.meal == 1 && util.isNull(this.data.mealTime)) {
            wx.showToast({ title: '请选择用餐时间', icon: 'none' });
            return;
        }
        if (this.data.busTo == 1 && util.isNull(this.data.busToStation)) {
            wx.showToast({ title: '请填写乘车站点', icon: 'none' });
            return;
        }
        wx.request({
            url: getApp().globalData.host + '/api/addJob',
            method: 'POST',
            data: {
                userid: getApp().globalData.user.id,
                date: this.data.date,
                meal: this.data.meal,
                meal_time: this.data.meal == 1 ? this.data.mealTime : 0,
                bus: this.data.bus,
                bus_time: this.data.bus == 1 ? this.data.busTime : 0,
                bus_to: this.data.busTo,
                bus_to_station: this.data.busTo == 1 ? this.data.busToStation : null
            },
            success: res => {
                wx.showToast({
                    title: res.data.message,
                    icon: res.data.success ? 'success' : 'none',
                    success: () => {
                        if (res.data.success) {
                            setTimeout(() => {
                                wx.redirectTo({ url: '/pages/modules/addjob/addjobrecord/addjobrecord', })
                            }, 1500);
                        }
                    }
                })
            }
        })
    },
    gotoAddJobRecord: function () {
        wx.navigateTo({ url: '/pages/modules/addjob/addjobrecord/addjobrecord' })
    },
    onLoad: function (options) { },

})