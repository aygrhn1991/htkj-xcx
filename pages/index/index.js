Page({
    data: {
        user: null,
        userState: null,
        userStateText: null,
        userPage: [],
        userCommonPage: [{
            name: '办公',
            pages: [{ text: '加班申报', imgUrl: '/img/addjob.png', url: '/pages/modules/addjob/addjob/addjob' }]
        }]
    },
    onLoad: function () {
        wx.login({
            success: res => {
                wx.showLoading({ title: '加载中' });
                wx.request({
                    url: getApp().globalData.host + `/auth/login/${res.code}`,
                    success: res => {
                        if (res.data.success) {
                            getApp().globalData.user = res.data.data.user;
                            this.setData({
                                user: res.data.data.user,
                                userState: 2
                            });
                            var set = new Set();
                            res.data.data.page.forEach(x => {
                                set.add(x.group_name);
                            });
                            this.data.userPage = [];
                            Array.from(set).forEach(x => {
                                var temp = { name: x, pages: [] };
                                res.data.data.page.forEach(y => {
                                    if (y.group_name == x) {
                                        temp.pages.push({ text: y.name, imgUrl: '/img/' + y.image, url: y.path });
                                    }
                                });
                                this.data.userPage.push(temp);
                            });
                            this.setData({ userPage: this.data.userPage });
                        } else {
                            if (res.data.data == 1 || res.data.data == 3) {
                                this.setData({
                                    userState: res.data.data,
                                    userStateText: res.data.message
                                });
                            } else {
                                getApp().globalData.openid = res.data.data;
                                wx.redirectTo({ url: '../register/register' });
                            }
                        }
                    },
                    complete: function () { wx.hideLoading() }
                })
            }
        })
    },
})