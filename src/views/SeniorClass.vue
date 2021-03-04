<template>
    <div class="block">
        <div class="learn-bg">
            <LeftPanel></LeftPanel>
            <RightPanel></RightPanel>
            <ContentPanel>
                <div class="chart-search">
                    <p class="learn-title">师兄堂</p>
                </div>
                <ul class="dialog-list younger-list clearfix">
                    <li v-for="(item, index) in infoList" :key="index" @click="toBvrother(item)">
                        <div class="chart-pho left">
                            <img :src="item.headimgurl">
                        </div>
                        <div class="younger-text">
                            <p>{{item.nickname}}</p>
                            <p>师德等级：{{item.grade_name}}</p>
                            <div class="younger-img">
                                <img v-if="!item.children[0]" src="../assets/img/icon01.png" class="left">
                                <img v-if="item.children[0]" src="../assets/img/icon02.png" class="left">
                                <img v-if="!item.children[1]" src="../assets/img/icon01.png" class="left">
                                <img v-if="item.children[1]" src="../assets/img/icon02.png" class="left">
                                <img v-if="!item.children[2]" src="../assets/img/icon01.png" class="left">
                                <img v-if="item.children[2]" src="../assets/img/icon02.png" class="left">
                            </div>
                        </div>
                    </li>
                </ul>
<!--                <Pages :currentPage="currentPage" :total="120" :pageSize="limit" @pageClick="getPages"></Pages>-->
                <Pages v-if="total >= limit" :currentPage="currentPage" :total="total" :pageSize="limit" @pageClick="getPages"></Pages>
            </ContentPanel>
        </div>
    </div>
</template>

<script>
    import LeftPanel from '../components/LeftPanel'
    import RightPanel from '../components/RightPanel'
    import ContentPanel from '../components/ContentPanel'
    import Pages from '../components/Pages'
    export default {
        name: "SeniorClass",
        components: {LeftPanel,RightPanel,ContentPanel,Pages},
        data () {
            return {
                infoList: [],
                total: 0,
                limit: 6,
                currentPage: 1
            }
        },
        methods: {
            getSuperior:function (page) {
                let that = this
                that.$common.ajax.post({
                    url: '/User/getSuperior',
                    userinfo: true,
                    data: {
                        page: page,
                    }
                }).then(res => {
                    that.infoList = res.result.data.user_list
                    that.total = res.result.data.total
                    that.limit = res.result.data.limit
                })
            },
            getPages:function (e) {
                this.getSuperior(e)
                this.currentPage = e
            },
            toBvrother:function (e) {
                this.$router.push({
                    path: '/Bvrother',
                    query: {
                        id: e.user_id
                    }
                })
            }
        },
        created() {
            this.getSuperior(1)
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
            .dialog-list {
                margin: 10px 60px;
                height: calc(100% - 324px);
                overflow-y: auto;
                li{
                    width: calc(50% - 37px);
                    background: url(../assets/img/kuang14.png) no-repeat;
                    background-size: cover;
                    background-position: center;
                    float: left;
                    overflow: hidden;
                    padding: 5px 15px;
                    margin-bottom: 15px;
                    .chart-pho {
                        width: 100px;
                        height: 100px;
                        padding: 20px;
                        margin: 15px;
                        background: url(../assets/img/kuang11.png) no-repeat;
                        background-size: cover;
                        -webkit-box-sizing: border-box;
                        -moz-box-sizing: border-box;
                        box-sizing: border-box;
                    }
                    .younger-text {
                        margin-left: 134px;
                        p{
                            text-align: left;
                        }
                        p:first-child{
                            margin-top: 20px;
                            margin-bottom: 8px;
                        }
                    }
                    .younger-img{
                        overflow: hidden;
                        img{
                            width: 70px;
                        }
                    }
                }
                li:nth-child(2n) {
                    float: right;
                }
            }
        }
    }
</style>
