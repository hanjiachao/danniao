<template>
    <div class="block">
        <div class="learn-bg">
            <LeftPanel></LeftPanel>
            <RightPanel></RightPanel>
            <ContentPanel>
                <div class="chart-search">
                    <div class="search clearfix">
                        <div class="right">搜索</div>
                        <input type="text" placeholder="请搜索您要私聊的昵称" v-model="userName">
                    </div>
                </div>
                <div v-if="searchFlag">
                    <ul class="dialog-list clearfix">
                        <li v-for="(item, index) in userList" :key="index">
                            <div class="chart-pho left">
                                <img :src="item.headimgurl">
                            </div>
                            <div class="right send-btn btn" @click="sendMessage(item.user_id)">发送消息</div>
                            <div class="dialog-text">
                                <p>【{{item.nickname}}】</p>
                                <p>师德等级：{{item.grade_name}}</p>
                            </div>
                        </li>
                    </ul>
                    <Pages v-if="total >= limit" :currentPage="currentPage" :total="total" :pageSize="limit" @pageClick="getPages"></Pages>
                </div>
                <div v-else>
                    <img class="no-img" src="../assets/img/img01.png">
                </div>
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
        name: "PrivateChat",
        components: {LeftPanel,RightPanel,ContentPanel,Pages},
        data () {
            return {
                searchFlag: true,
                userName: '',
                userList: [],
                total: 0,
                limit: 8,
                currentPage: 1,
                page: 1
            }
        },
        watch: {
            userName:function(e){
                let that = this
                that.userName = e
                that.page = 1
                that.currentPage = 1
                that.getUserList(that.page,e)
            }
        },
        methods: {
            getUserList: function (page, name) {
                let that = this
                that.$common.ajax.post({
                    url: '/News/getUserList',
                    userinfo: true,
                    data: {
                        page: page,
                        nickname: name
                    }
                }).then(res => {
                    that.userList = res.result.data.user_list
                    that.total = res.result.data.total
                    that.limit = res.result.data.limit
                    if ((page === 1) && (res.result.data.user_list.length === 0)) {
                        that.searchFlag = false
                    }else {
                        that.searchFlag = true
                    }
                })
            },
            getPages:function (e) {
                this.getUserList(e,this.userName)
                this.currentPage = e
            },
            sendMessage:function (e) {
                this.$router.push({
                    path: '/Chat',
                    query: {
                        user_id: e
                    }
                })
            }
        },
        created() {
            this.getUserList(1)
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
                .search {
                    width: 100%;
                    height: 40px;
                    line-height: 40px;
                    background: rgba(56, 38, 22, 0.35);
                    .right{
                        width: 110px;
                        height: 40px;
                        text-align: center;
                        line-height: 40px;
                        background: url(../assets/img/btn05.png) no-repeat;
                        background-size: cover;
                        cursor: pointer;
                    }
                    input{
                        padding: 0 15px;
                        width: calc(100% - 140px);
                        color: #381B02;
                    }
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
                        width: 80px;
                        height: 80px;
                        padding: 15px;
                        background: url(../assets/img/kuang11.png) no-repeat;
                        background-size: cover;
                        -webkit-box-sizing: border-box;
                        -moz-box-sizing: border-box;
                        box-sizing: border-box;
                    }
                    .send-btn {
                        width: 91px;
                        height: 33px;
                        text-align: center;
                        line-height: 33px;
                        background: url(../assets/img/btn05.png) no-repeat;
                        background-size: cover;
                        margin-top: 25px;
                        cursor: pointer;
                    }
                    .dialog-text {
                        margin: 16px 91px 0px 80px;
                        p{
                            margin: 10px 0px;
                        }
                    }
                }
            }
            .no-img {
                width: 70%;
                margin: 20% auto;
                overflow: hidden;
            }
        }
    }
</style>
