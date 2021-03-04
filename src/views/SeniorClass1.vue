<template>
    <div class="block">
        <div class="learn-bg">
            <LeftPanel></LeftPanel>
            <RightPanel></RightPanel>
            <ContentPanel>
                <div class="brother-box">
                    <p class="learn-title">师兄堂</p>
                    <ul class="brother-list">
                        <li v-for="(item, index) in info" :key="index" @click="toBvrother(item.us_id)">
                            <div class="chart-pho left">
                                <img :src="item.us_headimgurl">
                            </div>
                            <div class="teacher-box">
                                <p><span class="right">{{item.confirm_task_num}}/{{item.total_task_num}}</span>{{item.us_nickname}}</p>
                                <div class="total-box">
                                    <p class="line" :style="setWidth(item.confirm_task_num, item.total_task_num)"></p>
                                </div>
                            </div>
                        </li>
                    </ul>
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
        name: "SeniorClass1",
        components: {LeftPanel,RightPanel,ContentPanel},
        data () {
            return {
                info: {}
            }
        },
        methods: {
            getChildrenInfo:function () {
                let that = this
                that.$common.ajax.post({
                    url: '/User/getChildren',
                    userinfo: true,
                }).then(res => {
                    that.info = res.result.data
                })
            },
            setWidth(x,y){
                let width = ''
                width = (100 / y) * x
                return {
                    width: width + "%"
                }
            },
            toBvrother:function (e) {
                let that = this
                this.$router.push({
                    path: '/Bvrother1',
                    query: {
                        id: e
                    }
                })
            }
        },
        created() {
            this.getChildrenInfo()
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
            .brother-box {
                margin: 70px 70px 20px;
                height: calc(100% - 100px);
                .learn-title {
                    background: url(../assets/img/kuang04.png) no-repeat;
                    background-size: cover;
                    height: 46px;
                    line-height: 46px;
                    padding-left: 30px;
                    margin: 0px;
                }
                .brother-list {
                    height: calc(100% - 80px);
                    width: 100%;
                    overflow-y: auto;
                    li{
                        background: url(../assets/img/kuang16.png) no-repeat;
                        background-size: cover;
                        width: calc(100% - 40px);
                        padding: 20px;
                        height: 60px;
                        .chart-pho {
                            width: 67px;
                            height: 67px;
                            padding: 15px;
                            background: url(../assets/img/kuang11.png) no-repeat;
                            background-size: cover;
                            -webkit-box-sizing: border-box;
                            -moz-box-sizing: border-box;
                            box-sizing: border-box;
                        }
                        .teacher-box {
                            margin-left: 90px;
                            p{
                                margin: 10px 0px;
                            }
                            .total-box {
                                width: 100%;
                                height: 9px;
                                background: #662F02;
                                border-radius: 20px;
                                position: relative;
                                .line {
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
                }
            }
        }
    }
</style>
