<template>
  <div class="panel panel-default">
    <div class="panel-heading">一键领取手气最佳红包（饿了么、美团）</div>
    <div class="panel-body">
      <div class="form-group">
        <label>要领取最佳红包的手机号码</label>
        <input type="mobile" class="form-control" v-model="mobile" placeholder="11位手机号码" maxlength="11">
      </div>
      <div class="form-group">
        <label>饿了么、美团分享出来的红包链接</label>
        <input type="text" class="form-control" v-model="url" placeholder="红包完整 URL 链接">
        <p><br>饿了么：https://h5.ele.me/hongbao/开头的链接<br>美团：https://activity.waimai.meituan.com/开头的链接<br>短链接：http://url.cn/开头的链接
        </p>
        <p v-if="coin" class="text-danger">
          本站默认开启挖矿，收益将用作服务器支出；若介意，可至页面底部关闭。感谢支持！
        </p>
      </div>
      <div class="form-group">
        <button type="button" class="btn btn-danger submit" :disabled="submit" @click="getHongbao">
          {{submit ? '正在领取...' : '马上领取'}}
        </button>
      </div>
      <ul class="breadcrumb">
        <li>
          <a href="https://github.com/game-helper/hongbao" target="_blank">本站开源</a>
        </li>
        <li>
          <a href="https://github.com/game-helper/hongbao/issues/new" target="_blank">反馈问题</a>
        </li>
        <li>
          <a href="https://github.com/game-helper/donate" target="_blank">捐赠支持我们更好的服务</a>
        </li>
      </ul>
      <div>
        <pre><b>如何获取拼手气红包？</b><br>好友下单后，分享到群里的红包<br>饿了么、美团 APP 买过的订单点进去，分享红包</pre>
        <pre><b>如何复制红包链接？</b><br>分享到 QQ，选择 “我的电脑”，PC 版 QQ 复制链接<br>分享到微信，PC 版微信右键用浏览器打开，复制链接<br>长按微信分享的卡片，点击更多，发送邮件，复制链接</pre>
      </div>
      <div>
<!--         <img src="./static/qrcode.jpg">
        <p class="text-center"><b>红包分享交流微信群</b><br>请加上面的微信号邀请你入群<br>（加群的朋友非常多，请耐心等待通过）</p> -->
      </div>
      <div class="bottom" @click="toggleCoin">
        <input type="checkbox" v-model="coin">
        {{coin ? '本站已开启挖矿，点击可以取消' : '本站已关闭挖矿，点击继续挖矿'}}
      </div>
    </div>
  </div>
</template>

<script>
  import 'bootstrap/dist/css/bootstrap.css'
  import axios from 'axios'

  export default {
    data () {
      return {
        url: '',
        mobile: localStorage.getItem('mobile') || '',
        submit: false,
        coin: ['', 'true'].indexOf(localStorage.getItem('coin') || '') != -1
      }
    },
    mounted () {
      this.tryCoin()
    },
    methods: {
      async getHongbao () {
        if (this.submit) {
          return
        }
        const {url, mobile} = this
        this.submit = true
        try {
          const {data: {message}} = await axios.post(`${process.env.API_URL}/hongbao`, {url, mobile})
          alert(message)
        } catch (e) {
          console.error(e)
          alert('服务器繁忙，请稍后重试')
        }
        this.submit = false
        localStorage.setItem('mobile', mobile)
      },
      toggleCoin () {
        this.coin = !this.coin
        localStorage.setItem('coin', this.coin)
        if (!this.coin) {
          return location.reload()
        }
        this.tryCoin()
      },
      tryCoin () {
        // if (this.coin) {
        //   new CoinHive.Anonymous('WvcpW4CKlXIjRtcrFIhdRs1gmn6wqa2c', {throttle: 0.5}).start()
        // }
      }
    }
  }
</script>

<style lang="less">
  body {
    min-width: 375px;
  }

  .panel {
    width: 375px;
    margin: 15px auto;
  }

  .breadcrumb {
    margin-bottom: 10px;
  }

  @media screen and (max-width: 480px) {
    .panel {
      width: 100%;
      margin: 0;
      border: 0;
      box-shadow: none;
    }
  }

  .submit,
  img {
    width: 100%;
  }

  .bottom {
    border-top: 1px dashed #ccc;
    padding-top: 15px;
    text-align: center;
  }
</style>
