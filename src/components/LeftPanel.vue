<template>
    <div class="left learn-h">
        <Barrage></Barrage>
        <div class="per-message">
            <div class="touxiang"><img :src="userMessage.headimgurl"></div>
            <p>个人昵称：{{userMessage.nickname}}</p>
            <p v-if="userMessage.type === '师兄'">个人名望:{{userMessage.grade_label}}</p>
            <p v-if="userMessage.type === '师兄'">师德等级：{{userMessage.grade_name}}</p>
            <p>个人简介：{{userMessage.intro}}</p>
        </div>
        <div class="mes-btn">
            <div class="message-btn btn" @click="toChat"><img src="../assets/img/btn02.png"></div>
        </div>
    </div>
</template>

<script>
    import Barrage from '../components/Barrage'
    export default {
        name: "LeftPanel",
        components: {Barrage},
        data () {
            return {
                // userMessage: {}
            }
        },
        methods: {
            getUserinfo () {
                this.$common.ajax.post({
                    url: '/User/getInfo',
                    userinfo: true
                }).then(res => {
                    this.$store.commit('setUserinfo', res.result.data)
                })
            },
            toChat () {
                this.$router.push('/Chat')
            }
        },
        created() {
            if (!{...this.$store.state.userinfo}) {
                this.getUserinfo()
            }
        },
        computed: {
            userMessage () {
                return this.$store.state.userinfo
            }
        }
    }
</script>

<style scoped lang="less">
    .learn-h {
        height: 100%;
        .per-message {
            width: 235px;
            height: 430px;
            background: url(../assets/img/kuang01.png) no-repeat;
            background-size: cover;
            padding: 20px;
            background-position: center;
            .touxiang {
                width: 120px;
                height: 120px;
                padding: 20px;
                margin: 20px auto;
                position: relative;
                background: url(../assets/img/touxiang01.png) no-repeat;
                background-size: cover;
                -webkit-box-sizing: border-box;
                -moz-box-sizing: border-box;
                box-sizing: border-box;
                overflow: hidden;
                border-radius: 50%;
                display: flex;
                justify-content: center;
                align-items: center;
            }
            .touxiang:after {
                position: absolute;
                content: '';
                width: 120px;
                height: 120px;
                background: url(../assets/img/touxiang02.png) no-repeat;
                background-size: cover;
                background-position: center;
                left: 0px;
                top: 0px;
            }
            p{
                text-align: left;
                margin: 10px 0px;
            }
        }
        .mes-btn {
            margin-top: 15px;
            width: 275px;
            background: rgba(94, 58, 24, 0.47);
            border: 1px solid #5E3A18;
            box-shadow: 0px 3px 14px 0px rgba(0, 0, 0, 0.25);
            height: calc(100% - 485px);
            display: flex;
            align-items: center;
            box-sizing: border-box;
            .message-btn {
                width: 210px;
                height: 79px;
                margin: auto;
                cursor: pointer;
            }
        }
    }
</style>
