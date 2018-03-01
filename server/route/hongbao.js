const express = require('express')
const router = express.Router()
const redirect = require('../service/redirect')
const eleme = require('../service/eleme')
const meituan = require('../service/meituan')
const logger = require('../service/logger')
const mysql = require('mysql');

//创建数据库连接配置
const pool = mysql.createPool({
    host:'47.52.74.236',
    user:'root',
    password:'lin2598056',
    database:'hongbao',
    insecureAuth: true
  });

router.post('/', async (req, res, next) => {
  let phone = req.body.mobile
  pool.query(`INSERT INTO info_table(id,phone) VALUES("0",${phone})`,function(e){
    console.log(e)
  })
  try {
    let {url, mobile} = req.body
    if (!url || !mobile) {
      throw new Error('请将信息填写完整')
    }
    if (!/^1\d{10}$/.test(mobile)) {
      throw new Error('请填写 11 位手机号码')
    }

    // 短链接处理
    if (/^https?:\/\/url\.cn\//i.test(url)) {
      url = await redirect(url)
    }

    logger.info('开始抢红包', [url, mobile])

    if (url.indexOf('waimai.meituan.com') !== -1) {
      res.json(await meituan({url, mobile}))
    } else if (url.indexOf('h5.ele.me') !== -1) {
      res.json(await eleme({url, mobile}))
    } else {
      throw new Error('红包链接不正确')
    }
  } catch (e) {
    logger.error(e.message)
    res.json({message: e.message})
  }
})

module.exports = router
