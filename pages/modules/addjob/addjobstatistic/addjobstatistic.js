var util = require('../../../../utils/util');
Page({
  data: {
    date: util.dateToYYYYMMDD(new Date()),
    weekDay: util.dateToWeekDay(new Date()),
    record: [],
    statistic: {
      userCount: 0,
      meal1Count: 0,
      meal2Count: 0,
      busToCount: 0,
      bus1Count: 0,
      bus2Count: 0,
    },
  },
  onLoad: function (options) {
    wx.showLoading({ title: '加载中' });
    wx.request({
      url: getApp().globalData.host + `/api/getAddJobRecordOfDateWithoutPage/${this.data.date}`,
      success: res => {
        res.data.data.forEach(x => {
          this.data.statistic.userCount++;
          if (x.meal_time == 1 || x.meal_time == 3) {
            this.data.statistic.meal1Count++;
          }
          if (x.meal_time == 2 || x.meal_time == 3) {
            this.data.statistic.meal2Count++;
          }
          if (x.bus_time == 1) {
            this.data.statistic.bus1Count++;
          }
          if (x.bus_time == 2) {
            this.data.statistic.bus2Count++;
          }
          if (x.bus_to == 1) {
            this.data.statistic.busToCount++;
          }
        })
        this.setData({ statistic: this.data.statistic });
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
      complete: () => { wx.hideLoading() }
    })
  }
})