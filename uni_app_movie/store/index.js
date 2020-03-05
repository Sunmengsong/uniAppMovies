import Vue from 'vue'
import Vuex from 'vuex'
// var QQMapWX = require('xxx/qqmap-wx.js');
import QQMapWX from "../static/js/qqmap-wx-jssdk.min.js"
import {getInTheaters} from "../apis"

Vue.use(Vuex);

export default new Vuex.Store({
	state:{
		city:"北京市",
		nowPlayingList:{}
	},
	mutations:{
		
	},
	actions:{
		getCity(context ){
			uni.showLoading({
				title:'加载中'
			})
			// 检测用户是否授权
			uni.authorize({
				scope:"scope.userLocation",
				success(){
					uni.getLocation({
						type:'gcj02', //腾讯地图标准
						success:function(res){
							// 腾讯地图接口
							let qqmapsdk = new QQMapWX({
							    key: 'QECBZ-NOQCS-IJUOL-6IROO-2TBLK-DPFAU' // 必填
							}); 
							// 逆地址 
							qqmapsdk.reverseGeocoder({
								location: {
								  latitude: res.latitude,
								  longitude: res.longitude
								},
								success(res){
									// console.log(res.result.address_component.city)
									context.state.city=res.result.address_component.city;
									//console.log(context.state.city)
									getInTheaters({
										start:"0",
										count:"8",
										city:context.state.city,
									})
									.then(res=>{
										// console.log(res)
										let [error, data] = res;
										context.state.nowPlayingList=data.data;
										uni.hideLoading()
									})
								}
							})
						}
					})
				},
				fail(res){
					uni.showToast({
						icon:'none',
						title:'需要获取您的位置,否则部分功能不能使用',
						duration:2000
					})
				}
			})
		}
	}
})