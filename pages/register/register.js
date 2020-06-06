var util = require('../../utils/util');
Page({
  data: {
    userId: null,
    userName: null,
    userDepartmentId: null,
    departmentOption: [],
    departmentIndex: 0
  },
  bindDepartmentChange: function (e) {
    this.setData({
      departmentIndex: e.detail.value
    })
  },
  bindSubmit: function () {
    if (util.isNull(this.data.userId) || util.isNull(this.data.userName) || util.isNull(this.data.departmentIndex)) {
      wx.showToast({ title: '请完善加班信息', icon: 'none' });
      return;
    }
    wx.request({
      url: 'https://wx2.fenglingtime.com/auth/register',
      method: 'POST',
      data: {
        id: this.data.userId,
        openid: getApp().globalData.openid,
        name: this.data.userName,
        department_id: this.data.departmentOption[this.data.departmentIndex].id
      },
      success: res => {
        wx.showToast({
          title: res.data.message,
          icon: res.data.success ? 'success' : 'none',
          complete: r => {
            if (res.data.success) {
              wx.redirectTo({
                url: '../index/index',
              })
            }
          }
        })
      }
    })
  },
  onLoad: function (options) {
    wx.hideHomeButton();
    wx.request({
      url: 'https://wx2.fenglingtime.com/api/getDepartment',
      success: res => {
        this.setData({
          departmentOption: res.data.data
        });
      }
    })
  }
})