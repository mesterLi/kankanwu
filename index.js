const Koa = require('koa')
const superagent = require('superagent')
const cheerio = require('cheerio')

// const kankanwuIndex = require('./kkw/index')
const tv = require('./kkw/tv')

const app = new Koa()

// app.use(kankanwuIndex)
app.use(tv)

app.listen(7777, err => {
	if(!err){
		console.log('运行在localhost:7777')
	}
})
