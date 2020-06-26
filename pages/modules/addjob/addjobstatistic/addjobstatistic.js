var util = require('../../../../utils/util');
Page({
  data: {
    date: util.dateToYYYYMMDD(new Date()),
    weekDay: util.dateToWeekDay(new Date()),
    record: []
  },
  onLoad: function (options) {
    wx.showLoading({ title: '加载中' });
    wx.request({
      url: getApp().globalData.host + `/api/getAddJobRecordOfDateWithoutPage/${this.data.date}`,
      success: res => {
        var set = new Set();
        res.data.data.forEach(x => {
          set.add(x.department_name);
        });
        this.data.record = [];
        Array.from(set).forEach(x => {
          var temp = { name: x, data: [] };
          res.data.data.forEach(y => {
            if (y.department_name == x) {
              temp.data.push(y);
            }
          });
          this.data.record.push(temp);
        });
        this.setData({ record: this.data.record });
      },
      complete: function () { wx.hideLoading() }
    })
  }
})