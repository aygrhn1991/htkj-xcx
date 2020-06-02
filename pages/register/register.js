// pages/register/register.js
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
    // wx.redirectTo({
    //   url: '../index/index',
    // })
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

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.request({
      url: 'https://wx2.fenglingtime.com/common/getDepartment',
      success: res => {
        console.log(res.data);
        this.setData({
          department: res.data
        });
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    wx.hideHomeButton();
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  goHome: function () {
    wx.redirectTo({
      url: '../index/index',
    })
  },
})