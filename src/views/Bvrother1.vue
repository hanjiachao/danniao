<template>
    <div class="block">
        <div class="learn-bg">
            <LeftPanel></LeftPanel>
            <RightPanel></RightPanel>
            <ContentPanel>
                <div class="chart-search">
                    <p class="learn-title">师弟</p>
                </div>
                <div class="brolist">
                    <div class="bro-name clearfix">
                        <span>【{{userinfo.name}}】</span>
                    </div>
                    <div class="brolist-box clearfix border-bor">
                        <div class="left bro-img">
                            <img :src="userinfo.headimgurl">
                        </div>
                        <div class="exit-btn-right">
                            <img @click="sendRemind" src="../assets/img/btn18.png">
                        </div>
                        <div class="bro-content">
                            <p>简介：{{userinfo.intro}}</p>
                        </div>
                    </div>
                    <div class="teacher-box">
                        <p><span class="right">{{userinfo.confirm_task_num}}/{{userinfo.total_task_num}}</span></p>
                        <div class="total-box">
                            <p class="line" :style="setWidth(userinfo.confirm_task_num, userinfo.total_task_num)"></p>
                        </div>
                    </div>
                </div>
                <div class="exit-btn">
                    <img @click="extrude" src="../assets/img/btn14.png">
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
        name: "Bvrother1",
        components: {LeftPanel,RightPanel,ContentPanel},
        data () {
            return {
                children_id: '',
                userinfo: {},
            }
        },
        methods: {
            setWidth(x,y){
                let width = ''
                width = (100 / y) * x
                return {
                    width: width + "%"
                }
            },
            getChildrenInfo:function (id) {
                let that = this
                that.$common.ajax.post({
                    url: '/User/getChildrenInfo',
                    userinfo: true,
                    data: {
                        children_id: id
                    }
                }).then(res => {
                    that.userinfo = res.result.data
                })
            },
            sendRemind:function () {
                let that = this
                that.$common.ajax.post({
                    url: '/User/sendRemind',
                    userinfo: true,
                    data: {
                        children_id: that.children_id
                    }
                }).then(res => {
                    if (res.status === 'SUCCESS') {
                        this.$toast.success({
                            message: '已发送提醒。',
                            duration: 1500
                        })
                    }
                })
            },
            extrude:function () {
                let that = this
                that.$dialog.confirm({
                    title: '提示',
                    message: '是否确定逐出师门？',
                    cancelButtonText: '取消',
                    cancelButtonColor: '#ee0a24',
                    confirmButtonText: '确定',
                    confirmButtonColor: '#000',
                    closeOnClickOverlay: true
                }).then((res) => {
                    that.$common.ajax.post({
                        url: '/User/expulsion',
                        userinfo: true,
                        data: {
                            user_id: e
                        }
                    }).then(res => {
                        console.log(res)
                    })
                }).catch((res) => {

                })
            }
        },
        created() {
            this.children_id = JSON.parse(this.$route.query.id)
            this.getChildrenInfo(this.children_id)
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
                        -webkit-box-sizing: border-box;
                        -moz-box-sizing: border-box;
                        box-sizing: border-box;
                        overflow: hidden;
                    }
                    .exit-btn-right{
                        float: right;
                        width: 160px;
                        cursor: pointer;
                    }
                    .bro-content{
                        margin: 0 170px 0 110px;
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
                .teacher-box{
                    margin: 40px;
                    p{
                        margin: 10px 0px;
                        overflow: hidden;
                    }
                    .total-box{
                        height: 9px;
                        background: #662F02;
                        border-radius: 20px;
                        position: relative;
                        .line{
                            height: 100%;
                            position: absolute;
                            left: 0px;
                            top: -10px;
                            background: linear-gradient(-89deg, #FFD03F 0%, #FB6211 52%, #C46431 100%);
                            border-radius: 20px;
                        }
                    }
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
