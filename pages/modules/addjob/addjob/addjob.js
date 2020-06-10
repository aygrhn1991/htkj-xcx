var util = require('../../../../utils/util');
Page({
  data: {
    date: util.dateToYYYYMMDD(new Date()),
    dateStart: util.dateToYYYYMMDD(new Date()),
    meal: 1,
    mealTime: 2,
    bus: 1,
    busTime: 2,
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
    ]
  },
  bindDateChange: function (e) {
    this.setData({ date: e.detail.value, })
  },
  bindMealChange: function (e) {
    var meal = null;
    this.data.mealOption.forEach(x => {
      if (x.id == e.detail.value) {
        meal = e.detail.value;
        x.checked = true;
      } else {
        x.checked = false;
      }
    });
    this.setData({
      meal: meal,
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
  },
  bindBusChange(e) {
    var bus = null;
    this.data.busOption.forEach(x => {
      if (x.id == e.detail.value) {
        bus = e.detail.value;
        x.checked = true;
      } else {
        x.checked = false;
      }
    });
    this.setData({
      bus: bus,
      busOption: this.data.busOption
    })
  },
  bindBusTimeChange(e) {
    this.data.busTime = e.detail.value;
  },
  bindSubmit: function () {
    if (this.data.meal == 1) {
      if (util.isNull(this.data.mealTime)) {
        wx.showToast({ title: '请选择用餐时间', icon: 'none' });
        return;
      }
    }
    console.log('date', this.data.date);
    console.log('meal', this.data.meal);
    console.log('mealTime', this.data.mealTime);
    console.log('bus', this.data.bus);
    console.log('busTime', this.data.busTime);
    wx.request({
      url: 'https://wx2.fenglingtime.com/api/addJob',
      method: 'POST',
      data: {
        userid: getApp().globalData.user.id,
        date: this.data.date,
        meal: this.data.meal,
        meal_time: this.data.meal == 1 ? this.data.mealTime : 0,
        bus: this.data.bus,
        bus_time: this.data.bus == 1 ? this.data.busTime : 0
      },
      success: res => {
        wx.showToast({
          title: res.data.message,
          icon: res.data.success ? 'success' : 'none',
          success: () => {
            if (res.data.success) {
              setTimeout(() => {
                wx.redirectTo({ url: '../addjobrecord/addjobrecord', })
              }, 1500);
            }
          }
        })
      }
    })
  },
  gotoAddJobRecord: function () {
    wx.navigateTo({ url: '../addjobrecord/addjobrecord' })
  },
  onLoad: function (options) { },

})