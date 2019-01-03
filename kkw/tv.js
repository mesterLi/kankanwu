const superagent = require('superagent')
const cheerio = require('cheerio')
const fs = require('fs')
const path = require('path')

module.exports = function (ctx, next) {
	const PAGE_SIZE = 3
	const getPageJSon = getTvJson(PAGE_SIZE)
	getPageJSon()
}

const getTvJson = pageSize => {
	let tvJson = []
	return async function () {
		// const writeStream = fs.createWriteStream('../tv.json')
		for(let i = 0; i < pageSize; i++){
			const item = []
			const url = `https://m.kankanwu.com/dsj/index_${i+1}_______1.html`
			const {text} = await superagent.get(url)
			if(text){
				const $ = cheerio.load(text)
				const lists = $('.main .list_tab_img li')
				lists.each((index, node) => {
					item.push({
						mvTitle: $(node).find('h2 a').text(),
						mvName: $(node).find('p').text(),
						mvImg: 'https:' + $(node).find('.picsize img').attr('src'),
						mcScore: $(node).find('.score').text(),
						mvLink: $(node).children('a').attr('href'),
						mvNum: $(node).find('.title').text()
					})
				})
			}
			tvJson.push(item)
			console.log(i)
			fs.writeFile('./tv.json', JSON.stringify(item), ()=>{})
		}
		// const buf = Buffer.from(tvJson)
		// console.log(buf)
		// writeStream.write('12222', 'UTF8')
		// writeStream.on('finish', ()=>console.log('写入完成'))
	}
}
