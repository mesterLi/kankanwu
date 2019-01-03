const superagent = require('superagent')
const cheerio = require('cheerio')
const fs = require('fs')
const url = 'https://m.kankanwu.com'
module.exports = async function(ctx, next) {
	const body = await superagent.get(url)
	const $ = cheerio.load(body.text)
	getSwiperJson($)
	getHotListJson($)
}

const getSwiperJson = $ => {
	const swiperList = $('#focus .focusList li')
	const list = []
	swiperList.each((index, node) => {
		list.push({
			title: $(node).find('span em').text(),
			uri: url + $(node).find('img').attr('src'),
			link: url + $(node).find('a').attr('href')
		})
	})
	fs.writeFile('./swiper.json', JSON.stringify(list), ()=>{})
}

const getHotListJson = $ => {
	const hotList = $('.main')
	const hotTitleList = $('.modo_title')
	const list = []
	hotList.each((index, node) => {
		const item = []
		const lis = $(node).find('.all_tab .list_tab_img li')
		console.log(lis.length)
		lis.each((k, v) => {
			item.push({
				mvTitle: $(v).find('.title').text(),
				mvImg: 'https:' + $(v).find('img').attr('src'),
				mvName: $(v).find('.name').text()
			})
		})
		list.push({
			title: $(hotTitleList[index]).find('h2 a').text(),
			data: item
		})
	})
	fs.writeFile('./hot.json', JSON.stringify(list), ()=>{})
}
