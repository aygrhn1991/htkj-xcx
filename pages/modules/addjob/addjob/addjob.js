var util = require('../../../../utils/util');
Page({
  data: {
    date: util.dateToYYYYMMDD(new Date()),
    dateStart: util.dateToYYYYMMDD(new Date()),
    meal: 1,
    bus: 1,
    mealOption: [
      { id: 0, name: '不用餐', checked: false },
      { id: 1, name: '用餐', checked: true },
    ],
    busOption: [
      { id: 0, name: '不乘车', checked: false },
      { id: 1, name: '乘车', checked: true },
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
  bindSubmit: function () {
    if (util.isNull(this.data.meal) || util.isNull(this.data.bus)) {
      wx.showToast({ title: '请完善加班信息', icon: 'none' });
      return;
    }
    wx.request({
      url: 'https://wx2.fenglingtime.com/api/addJob',
      method: 'POST',
      data: {
        userid: getApp().globalData.user.id,
        time: this.data.date,
        meal: this.data.meal,
        bus: this.data.bus,
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