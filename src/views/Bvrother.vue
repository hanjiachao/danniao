<template>
    <div class="block">
        <div class="learn-bg">
            <LeftPanel></LeftPanel>
            <RightPanel></RightPanel>
            <ContentPanel>
                <div class="chart-search">
                    <p class="learn-title">师兄</p>
                </div>
                <div class="brolist">
                    <div class="bro-name clearfix">【{{info.nickname}}】</div>
                    <div class="brolist-box clearfix border-bor">
                        <div class="left bro-img">
                            <img :src="info.headimgurl">
                        </div>
                        <div class="bro-content">
                            <p>师德等级：{{info.grade_name}}</p>
                            <div class="younger-img">
                                <div class="left" v-for="(item, index) in info.children">
                                    <img v-if="!item" src="../assets/img/icon01.png">
                                    <img v-else src="../assets/img/icon02.png">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="brolist-box clearfix">
                        <p>【名望】</p>
                        <div class="younger-li-img">
                            <img v-if="info.grade_name === '见习'" src="../assets/img/icon03.png" class="left">
                            <img v-if="info.grade_name === '匠师'" src="../assets/img/icon04.png" class="left">
                            <img v-if="info.grade_name === '大师'" src="../assets/img/icon05.png" class="left">
                            <img v-if="info.grade_name === '宗师'" src="../assets/img/icon06.png" class="left">
                            <img v-if="info.grade_name === '泰斗'" src="../assets/img/icon07.png" class="left">
                        </div>
                    </div>
                </div>
                <div class="exit-btn">
                    <img v-if="userinfo.type === '师弟' && !flag" @click="join" src="../assets/img/btn12.png">
                    <img v-if="userinfo.type === '师弟' && flag" @click="exit" src="../assets/img/btn06.png">
                    <img v-if="userinfo.type === '师兄'" @click="extrude" src="../assets/img/btn14.png">
                </div>
            </ContentPanel>
        </div>
    </div>
</template>

<script>
    import LeftPanel from '../components/LeftPanel'
    import RightPanel from '../components/RightPanel'
    import ContentPanel from '../components/ContentPanel'
    export default {
        name: "Bvrother",
        components: {LeftPanel,RightPanel,ContentPanel},
        data () {
            return {
                user_id: '',
                info: {},
                userinfo: {},
                flag: false,
                us_id: ''
            }
        },
        methods: {
            getSuperiorInfo:function (id) {
                let that = this
                that.$common.ajax.post({
                    url: '/User/getSuperiorInfo',
                    userinfo: true,
                    data: {
                        user_id: id
                    }
                }).then(res => {
                    that.info = res.result.data
                    that.user_id = res.result.data.user_id
                    if (that.user_id === that.userinfo.superior_id) {
                        that.flag = true
                    }
                })
            },
            getChildren:function () {
                let that = this
                that.$common.ajax.post({
                    url: '/User/getChildren',
                    userinfo: true,
                }).then(res => {
                    console.log(res)
                })
            },
            getApprenticed:function (id) {
                let that = this
                that.$common.ajax.post({
                    url: '/User/apprenticed',
                    userinfo: true,
                    data: {
                        user_id: id
                    }
                }).then(res => {
                    console.log(res)
                })
            },
            exit: function () {
                let that = this
                this.$dialog.confirm({
                    title: '提示',
                    message: '是否确定退出师门？',
                    cancelButtonText: '取消',
                    cancelButtonColor: '#ee0a24',
                    confirmButtonText: '确定',
                    confirmButtonColor: '#000',
                    closeOnClickOverlay: true
                }).then((res) => {
                    that.$common.ajax.post({
                        url: '/User/signOut',
                        userinfo: true,
                    }).then(res => {
                        console.log(res)
                    })
                }).catch((res) => {

                })
            },
            join:function () {
                this.getApprenticed(this.user_id)
            },
            extrude:function () {
                let that = this
                that.$common.ajax.post({
                    url: '/User/expulsion',
                    userinfo: true,
                    data: {
                        user_id: that.us_id
                    }
                }).then(res => {
                    console.log(res)
                })
            }
        },
        created() {
            this.userinfo = {...this.$store.state.userinfo}
            if (this.$route.query.id) {
                this.user_id = this.$route.query.id
            }
            if (this.$route.query.us_id) {
                this.us_id = this.$route.query.us_id
            }else {
                this.getSuperiorInfo(this.user_id)
            }
        }
    }
</script>

<style scoped lang="less">
    .block{
        margin: 0px auto;
        width: 1400px;
        overflow: hidden;
        height: 100vh;
        .learn-bg{
            margin: 140px 15px 15px;
            height: calc(100vh - 260px);
            .chart-search {
                margin: 80px 70px 30px;
                .learn-title {
                    background: url(../assets/img/kuang04.png) no-repeat;
                    background-size: cover;
                    text-align: left;
                    height: 46px;
                    line-height: 46px;
                    padding-left: 30px;
                    margin: 0px;
                }
            }
            .brolist {
                margin: 0px 70px;
                height: 400px;
                background: url(../assets/img/kuang12.png) no-repeat;
                background-size: cover;
                background-position: center;
                .bro-name {
                    background: url(../assets/img/bg5.png) no-repeat;
                    padding: 5px 35px 5px 10px;
                    background-size: cover;
                    display: inline-block;
                    margin: 25px;
                }
                .brolist-box {
                    margin: 0px 25px;
                    overflow: hidden;
                    padding: 10px 0px;
                    border-bottom: 1px solid #FFF690;
                    .bro-img {
                        width: 90px;
                        height: 90px;
                        padding: 20px;
                        background: url(../assets/img/kuang11.png) no-repeat;
                        background-size: cover;
                        background-position: center;
                        margin-right: 20px;
                        -webkit-box-sizing: border-box;
                        -moz-box-sizing: border-box;
                        box-sizing: border-box;
                        overflow: hidden;
                    }
                    .bro-content{
                        p{
                            margin: 0;
                        }
                        .younger-img img {
                            width: 70px;
                        }
                    }
                    p{
                        margin: 10px 0px;
                    }
                    .younger-li-img {
                        margin-left: 115px;
                        img {
                            width: 15%;
                        }
                    }
                }
                .brolist-box:last-child{
                    border: 0;
                }
            }
            .exit-btn {
                width: 160px;
                /*height: 40px;*/
                float: right;
                cursor: pointer;
                margin: 0px 70px;
                cursor: pointer;
            }
        }
    }
</style>
