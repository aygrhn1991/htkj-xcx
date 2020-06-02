var util = require('../../../../utils/util');
Page({
  data: {
    date: util.dateToYYYYMMDD(new Date()),
    dateStart: util.dateToYYYYMMDD(new Date()),
    meal: null,
    bus: null,
    mealOption: [
      { id: '0', name: '不用餐' },
      { id: '1', name: '用餐' },
    ],
    busOption: [
      { id: '0', name: '不乘车' },
      { id: '1', name: '乘车' },
    ]
  },
  bindDateChange: function (e) {
    this.setData({
      date: e.detail.value,
    })
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
      wx.showToast({ title: '请完善加班信息', icon: 'none', duration: 2000 });
      return;
    }
    wx.showToast({ title: '提交成功', icon: 'success', duration: 2000 });
    // wx.request({
    //   url: 'https://wx2.fenglingtime.com/api/addJob',
    //   method: 'POST',
    //   data: {
    //     openid: getApp().globalData.openid,
    //     date: this.data.date,
    //     meal: this.data.meal,
    //     bus: this.data.bus,
    //   },
    //   success: res => {
    //     wx.showToast({
    //       title: '成功',
    //       icon: 'success',
    //       duration: 2000
    //     })
    //   }
    // })
  },
  gotoAddJobRecord: function () {
    wx.navigateTo({
      url: '../addjobrecord/addjobrecord'
    })
  },
  onLoad: function (options) { },

})