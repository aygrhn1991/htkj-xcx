var util = require('../../utils/util');
Page({
    data: {
        userId: null,
        userName: null,
        userDepartmentId: null,
        departmentOption: [],
        departmentIndex: 0
    },
    bindDepartmentChange: function(e) {
        this.setData({ departmentIndex: e.detail.value })
    },
    bindSubmit: function() {
        if (util.isNull(this.data.userId) || util.isNull(this.data.userName) || util.isNull(this.data.departmentIndex)) {
            wx.showToast({ title: '请完善注册信息', icon: 'none' });
            return;
        }
        wx.request({
            url: getApp().globalData.host + '/auth/register',
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
                    success: () => {
                        if (res.data.success) {
                            setTimeout(() => {
                                wx.redirectTo({ url: '../index/index', })
                            }, 1500);
                        }
                    }
                })
            }
        })
    },
    onLoad: function(options) {
        wx.hideHomeButton();
        wx.request({
            url: getApp().globalData.host + '/api/common/getDepartment',
            success: res => {
                this.setData({ departmentOption: res.data.data });
            }
        })
    }
})