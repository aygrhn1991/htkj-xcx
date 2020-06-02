Page({
  data: {
    userId: null,
    userName: null,
    userDepartmentId: null,
    departmentOption: [],
    departmentIndex: 0
  },
  bindUserIdChange: function (e) {
    this.setData({
      userId: e.detail.value
    })
  },
  bindUserNameChange: function (e) {
    this.setData({
      userName: e.detail.value
    })
  },
  bindDepartmentChange: function (e) {
    this.setData({
      departmentIndex: e.detail.value
    })
  },
  bindSubmit: function () {
    if (util.isNull(this.data.userId) || util.isNull(this.data.userName) || util.isNull(this.data.userDepartmentId)) {
      wx.showToast({ title: '请完善加班信息', icon: 'none', duration: 2000 });
      return;
    }
    wx.request({
      url: 'https://wx2.fenglingtime.com/api/addUser',
      method: 'POST',
      data: {
        id: this.data.userId,
        openid: getApp().globalData.openid,
        name: this.data.userName,
        department_id: this.data.department[this.data.departmentIndex].id
      },
      success: res => {
        wx.redirectTo({
          url: '../index/index',
        })
      }
    })
  },
  onLoad: function (options) {
    wx.request({
      url: 'https://wx2.fenglingtime.com/common/getDepartment',
      success: res => {
        this.setData({
          department: res.data
        });
      }
    })
  }
})