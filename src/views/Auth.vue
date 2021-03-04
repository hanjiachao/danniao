<template>
  <div class="block">
    <div class="slogan">
      <img src="../assets/img/title.png">
      <div class="btn" @click="depart">
        <img src="../assets/img/btn01.png">
      </div>
    </div>
    <div class="pos" v-if="statusFlag">
      <div class="pos-box">
        <div class="pos-title">请选择您当前的身份</div>
        <div class="btn-t1" @click="brother"><img src="../assets/img/btn10.png"></div>
        <div class="btn-t1" @click="younger"><img src="../assets/img/btn11.png"></div>
      </div>
      <!--<div class="pos-box" v-else>
        <div class="pos-title">提示</div>
        <div class="ipt">
          <input type="text" placeholder="请输入身份校验码">
        </div>
        <div class="btn-t1" @click=""><img src="../assets/img/btn01.png"></div>
      </div>-->
    </div>
  </div>
</template>

<script>
  import * as dd from "dingtalk-jsapi";
  export default {
    name: 'Auth',
    components: {},
    data() {
      return {
        statusFlag: false,
        iptFlag: true,
        ddStatus: false
      }
    },
    mounted() {
      const self = this;
      try {
        dd.ready(function () {
          self.ddStatus = true
          try {
            dd.runtime.permission.requestAuthCode({
              // corpId: 'dingc40b7ad0c90613bf35c2f4657eb6378f', //自己公司ID
              // corpId: 'ding6395656a2de60d9135c2f4657eb6378f', //菜鸟ID
              corpId: 'ding200885d63222e1ad35c2f4657eb6378f',
              onSuccess: function (result) {
                /**
                 * 获取菜鸟那边的用户信息
                 */
                self.$common.ajax.post({
                  url: '/Login/getInfo',
                  data: {
                    code: result.code
                  }
                }).then(res => {
                  self.$store.commit('setAccessToken', res.result.data)
                })
                /**
                 * 获取自己公司的用户信息
                 */
                // self.$common.ajax.post({
                //   url: '/Login/getInfoBak',
                //   data: {
                //     code: result.code
                //   }
                // }).then(res => {
                //   self.$store.commit('setAccessToken', res.result.data)
                // })
              },
              onFail: function (err) {
                alert(JSON.stringify(err));
              }
            });
          } catch (e) {
            alert(e);
          }
        });
      }catch (e) {
        alert(e);
      }
    },
    methods: {
      getUserinfo () {
        this.$common.ajax.post({
          url: '/User/getInfo',
          userinfo: true
        }).then(res => {
          this.$store.commit('setUserinfo', res.result.data)
          if (res.result.data.type === '师兄') {
            this.$router.push('/SeniorClass1')
          }else if(res.result.data.type === '师弟') {
            if (res.result.data.cancel_type === '主动退出' || res.result.data.cancel_type === '逐出师门' || res.result.data.cancel_type === '正常出师') {
              this.$dialog.alert({
                title: '提示',
                message: '您已' + res.result.data.cancel_type,
              })
              // this.$Notice.open({
              //   title: '系统提示',
              //   duration: 3,
              //   desc: '您已' + res.result.data.cancel_type
              // })
              return false
            }
            this.$router.push('/IndexYounger')
          }else {
            this.$dialog.alert({
              title: '提示',
              message: '您的身份信息暂未录入系统，请联系管理员录入。',
            })
          }
        })
      },
      depart: function () {
        if(this.ddStatus){
          this.getUserinfo()
        }else{
          this.$toast.fail({
            message: '请在钉钉中打开该应用。',
            duration: 1500
          })
        }
      }
    },
    created() {
      // let self = this
      // self.$common.ajax.post({
      //   url: '/Login/getInfo',
      //   data: {
      //     code: '9a519d78345531e5b9030f630a3be950'
      //   }
      // }).then(res => {
      //   self.$store.commit('setAccessToken', res.result.data)
      // })
    }
  }
</script>

<style scoped lang="less">
  .block{
    .slogan{
      position: absolute;
      top: 50%;
      left: 50%;
      -webkit-transform: translate(-50%, -50%);
      -moz-transform: translate(-50%, -50%);
      -ms-transform: translate(-50%, -50%);
      -o-transform: translate(-50%, -50%);
      transform: translate(-50%, -50%);
      .btn{
        position: absolute;
        bottom: 25%;
        left: 54%;
        -webkit-transform: translateX(-50%);
        -moz-transform: translateX(-50%);
        -ms-transform: translateX(-50%);
        -o-transform: translateX(-50%);
        transform: translateX(-50%);
        cursor: pointer;
      }
    }
    .pos {
      position: fixed;
      z-index: 1;
      top: 0px;
      left: 0px;
      width: 100%;
      height: 100vh;
      background: rgba(0,0,0,.6);
      .pos-box {
        width: 800px;
        height: 460px;
        background: url(../assets/img/bg8.png) no-repeat;
        background-size: cover;
        top: 50%;
        margin-top: -230px;
        left: 50%;
        margin-left: -400px;
        position: absolute;
        .pos-title {
          background: url(../assets/img/bg7.png) no-repeat;
          background-size: cover;
          width: 310px;
          height: 91px;
          margin: 96px auto 30px;
          text-align: center;
          line-height: 83px;
          font-size: 20px;
        }
        .ipt{
          width: 200px;
          height: 30px;
          line-height: 30px;
          padding: 0 5px;
          margin: 0 auto 20px;
          border: 1px solid #703905;
          input{
            display: block;
            width: 100%;
            height: 100%;
          }
        }
        .btn-t1 {
          width: 170px;
          margin: 0px auto;
          cursor: pointer;
        }
      }
    }
  }
</style>
