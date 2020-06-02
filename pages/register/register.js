Page({
  data: {
    userId: null,
    userName: null,
    userDepartmentId: null,
    department: [],
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