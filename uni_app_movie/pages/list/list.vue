<template>
	<view class="container">
		<!-- 正在上映的电影-北京  banner -->
		<view class="bannerList">
			<swiper class="swiper" :indicator-dots="true" :autoplay="true" :interval="2000">
				<swiper-item v-for="(item,index) in nowPlayingList.subjects" :key="index">
					<image mode="widthFix" class="slider" :src="item.images.small" @click="toDetails(item.id)"/>
				</swiper-item>
			</swiper>
		</view>
		
		<!-- 推荐 -->
				<view class="list" v-for="(item,index) in moviesList" :key="index">
					<view class="title">
						{{item.title}} 
						<text @click="toClass(item.title)">→</text> 
					</view>
					<scroll-view scroll-x="true" style="white-space: nowrap;">
					  <view class="slider" v-for="(it,inx) in item.subjects" :key="inx" style="">
						  <image mode="aspectFill" :src="it.images.small" @click="toDetails(it.id)"/>
						  <view class="name">{{it.title}}</view>
					  </view>
					</scroll-view>
				</view>
		
	</view>
</template>

<script>
	import {comingSoon, newMovies, hotTop} from '../../apis'
	export default {
		data() {
			return {
				moviesList:[]
			}
		},
		onReady(){
			this.pageInit();
		},
		computed:{
			nowPlayingList(){
				return this.$store.state.nowPlayingList;
			}
		},
		methods: {
			pageInit(){
				uni.showLoading({
					title:'加载中'
				})
				Promise.all([
					this._comingSoon(),
					this._newMovies(),
					this._hotTop()
				]).then(res=>{
					uni.hideLoading();
					//console.log(res);
					let rel =[];
					rel.push(this.nowPlayingList)
					res.map((item)=>{
						rel.push(item[1].data);
					})
					//console.log(rel);
					this.moviesList=rel;
				})
			},
			// 跳转 详情页
			toDetails(id){
				// console.log(id)
				uni.navigateTo({
					url:"../dtails/dtails?id="+id
				})
			},
			toClass(title){
				uni.navigateTo({
					url:"../class/class?title="+title
				})
			},
			_comingSoon(){
				// 即将上映
				return comingSoon({
					city:this.$store.state.city,
					start:"0",
					count:"8"
				})
			},
			_newMovies(){
				// 新片榜单
				return newMovies({})
			},
			// top250
			_hotTop(){
				return hotTop({
					start:"0",
					count:"8"
				})
			}
		}
	}
</script>

<style scoped lang="scss">
.container{
	background:#2C405A;
	.bannerList{
		.swiper{
			height:400upx;
			.slider{
					width:100%;
				   }
		}
	}
	.list{
		margin-top:40upx;
		background:#2e4461;
		.title{
			color: #fff;
			margin-left :20upx;
			padding:10upx 0;
			text{
				float:right;
				padding:0 10upx;
			}
		}
		.slider{
			height:300upx;
			margin-left:20upx;
			background:red;
			width: 180upx;
			height:100px;
			display: inline-block;
			image{
				width: 100%;
				height:100%;
			}
			.name{
				text-align: center;
				color:#fff;
				overflow:hidden;
				text-overflow:ellipsis;
			}
		}
	}
}
</style>
