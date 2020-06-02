var util = require('../../../utils/util');
Page({
  data: {
    date: '2021-06-01',
    cf: [
      { value: '1', name: '吃饭' },
      { value: '2', name: '不吃饭' },
    ],
    zc: [
      { value: '1', name: '坐车' },
      { value: '2', name: '不坐车' },
    ]
  },
  bindDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e)
    this.setData({
      date: e.detail.value,
    })
  },

  radioChange(e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value)

    const items = this.data.items
    for (let i = 0, len = items.length; i < len; ++i) {
      items[i].checked = items[i].value === e.detail.value
    }

    this.setData({
      items
    })
  },

  onLoad: function (options) {
    console.log(util.formatTime(new Date));
  },

})