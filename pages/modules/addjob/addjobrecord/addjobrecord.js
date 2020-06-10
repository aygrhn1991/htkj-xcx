var util = require('../../../../utils/util');
Page({
  data: {
    record: null
  },
  onLoad: function (options) {
    wx.request({
      url: 'https://wx2.fenglingtime.com/api/addJobRecord/' + getApp().globalData.user.id,
      success: res => {
        var set = new Set();
        res.data.data.forEach(x => {
          set.add(x.date.substr(0, 7));
        });
        this.data.record = [];
        Array.from(set).forEach(x => {
          var temp = { date: x, data: [] };
          res.data.data.forEach(y => {
            if (util.startWith(y.date, x)) {
              temp.data.push(y);
            }
          });
          this.data.record.push(temp);
        });
        this.setData({ record: this.data.record });
      }
    })
  }
})