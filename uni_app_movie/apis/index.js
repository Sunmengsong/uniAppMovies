const baseUrl="https://douban.uieee.com";

export const getInTheaters=params=>(
// 正在上映的电影
	// new Promise((resolve,reject)=>{
		uni.request({
			url:`${baseUrl}/v2/movie/in_theaters`,
			data:params,
			header:{
				"content-type":"json"
			},
			// 不加success,默认直接返回一个promise
			// success(res){
			// 	resolve(res)
			// }
		})
	// })
)

export const comingSoon=params=>(
// 即将上映的电影
	// new Promise((resolve,reject)=>{
		uni.request({
			url:`${baseUrl}/v2/movie/coming_soon`,
			data:params,
			header:{
				"content-type":"json"
			},
			// 不加success,默认直接返回一个promise
			// success(res){
			// 	resolve(res)
			// }
		})
	// })
)

export const newMovies=params=>(
// 豆瓣新片榜
	// new Promise((resolve,reject)=>{
		uni.request({
			url:`${baseUrl}/v2/movie/new_movies`,
			data:params,
			header:{
				"content-type":"json"
			},
			// 不加success,默认直接返回一个promise
			// success(res){
			// 	resolve(res)
			// }
		})
	// })
)

export const hotTop=params=>(
// 豆瓣新片榜
	// new Promise((resolve,reject)=>{
		uni.request({
			url:`${baseUrl}/v2/movie/top250`,
			data:params,
			header:{
				"content-type":"json"
			},
			// 不加success,默认直接返回一个promise
			// success(res){
			// 	resolve(res)
			// }
		})
	// })
)

export const details=id=>(
// 豆瓣新片榜
	// new Promise((resolve,reject)=>{
		uni.request({
			url:`${baseUrl}/v2/movie/subject/${id}`,
			header:{
				"content-type":"json"
			},
			// 不加success,默认直接返回一个promise
			// success(res){
			// 	resolve(res)
			// }
		})
	// })
)
