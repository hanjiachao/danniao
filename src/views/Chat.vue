<template>
    <div class="block">
        <div class="learn-bg">
            <LeftPanel></LeftPanel>
            <RightPanel></RightPanel>
            <ContentPanel>
                <ul class="message-list" ref="handleId" @scroll="handleScroll">
                    <li v-for="(item, index) in arrList" :key="index">
                        <div class="left">【{{item.us_name}}】</div>
                        <p>{{item.ne_content}}</p>
                    </li>
                </ul>
                <div class="message-b clearfix">
                    <div class="left send-btn btn" v-for="(item, index) in typeList" :key="index" @click="changeType(index)">{{item}}</div>
                </div>
                <div class="text-send">
                    <div class="right send"><img src="../assets/img/btn04.png" @click="getNotedata"></div>
                    <textarea placeholder="请输入内容" v-model="notedata"></textarea>
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
        name: "Chat",
        components: {LeftPanel,RightPanel,ContentPanel},
        data () {
            return {
                userinfo: {},
                notedata: '',
                type: '世界',
                userId: '',
                typeList: ['世界','部门','师门','私聊'],
                idx: 0,
                arrList: [],
                msgList: [
                    [],
                    [],
                    [],
                    []
                ],
                timer : null
            }
        },
        mounted () {
            let self = this;
            clearInterval(self.timer)
            self.timer = null
            self.timer = setInterval(self.freshTable, 5000);
        },
        beforeDestroy () {
            clearInterval(this.timer)
            this.timer = null;
        },
        destroyed () {
            clearInterval(this.timer)
            this.timer = null;
        },
        methods: {
            freshTable:function () {
                let self = this;
                let lastId = self.msgList[self.idx][self.msgList[self.idx].length -1].id
                self.$common.ajax.post({
                    url: '/News/getList',
                    userinfo: true,
                    silence: true,
                    data: {
                        type: self.type,
                        last_id: lastId,
                        user_id: self.userId
                    }
                }).then(res => {
                    if (res.result.data.news_list.length !== 0) {
                        self.msgList[self.idx].push(res.result.data.news_list)
                        self.arrList = self.msgList[self.idx]
                    }
                })
            },
            sendMessage:function (news, type, id) {
                let that = this
                that.$common.ajax.post({
                    url: '/News/send',
                    userinfo: true,
                    data: {
                        news: news,
                        type: type,
                        user_id: id
                    }
                }).then(res => {
                    that.msgList[that.idx].push({
                        id: res.result.data.id,
                        ne_content: news,
                        us_name: that.userinfo.nickname
                    })
                    that.arrList = that.msgList[that.idx]
                })
            },
            getMsgList:function (idx, type, lastId, firstId, userId) {
                let that = this
                that.$common.ajax.post({
                    url: '/News/getList',
                    userinfo: true,
                    data: {
                        type: type,
                        last_id: lastId,
                        first_id: firstId,
                        user_id: userId
                    }
                }).then(res => {
                    that.msgList[idx] = res.result.data.news_list
                    that.arrList = that.msgList[idx]
                })
            },
            getNotedata:function () {
                this.sendMessage(this.notedata,this.type,this.userId)
                this.notedata = ''
            },
            changeType:function (e) {
                let that = this
                that.idx =  e
                that.type = this.typeList[this.idx]
                if (that.type === '私聊') {
                    this.$router.push('/PrivateChat')
                }else {
                    if (that.msgList[e].length === 0) {
                        this.getMsgList(e,this.type,0,0)
                    }else {
                        that.arrList = that.msgList[e]
                    }
                }
            },
            handleScroll() {
                let that = this
                let scrollNum = this.$refs.handleId.scrollTop
                if (scrollNum === 0) {
                    that.$common.ajax.post({
                        url: '/News/getList',
                        userinfo: true,
                        silence: true,
                        data: {
                            type: that.type,
                            first_id: that.msgList[that.idx][0].id,
                            user_id: that.userId
                        }
                    }).then(res => {
                        if (res.result.data.news_list.length !== 0){
                            that.msgList[that.idx].unshift(res.result.data.news_list)
                            that.arrList = that.msgList[that.idx]
                        }
                    })
                }
            },
        },
        created() {
            let userinfo = {...this.$store.state.userinfo}
            this.userinfo = userinfo
            this.type = this.typeList[this.idx]
            console.log(this.$route.query.user_id)
            if (this.$route.query.user_id) {
                this.userId = this.$route.query.user_id
                this.idx = 3
                this.type = this.typeList[this.idx]
            }
            this.getMsgList(this.idx,this.type,'','',this.userId)
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
            .message-list {
                margin: 70px 70px 0px;
                height: calc(100% - 300px);
                overflow-y: scroll;
                li{
                    margin-bottom: 20px;
                    overflow: hidden;
                    .left{
                        min-width: 80px;
                        background: url(../assets/img/bg5.png) no-repeat;
                        background-size: cover;
                        background-position: left;
                        padding: 6px 51px 9px 10px;
                    }
                    p{
                        margin-top: 5px;
                    }
                }
            }
            .message-b {
                margin: 10px 70px;
                .send-btn {
                    width: 91px;
                    height: 33px;
                    text-align: center;
                    line-height: 33px;
                    background: url(../assets/img/btn05.png) no-repeat;
                    background-size: cover;
                    margin-top: 25px;
                    margin-right: 10px;
                    cursor: pointer;
                }
            }
            .text-send {
                margin: 0px 60px;
                overflow: hidden;
                background: url(../assets/img/kuang07.png) no-repeat;
                background-size: cover;
                background-position: center;
                height: 80px;
                padding: 15px;
                width: calc(100% - 142px);
                .send{
                    width: 120px;
                    height: 40px;
                    margin-top: 50px;
                    cursor: pointer;
                }
                textarea{
                    width: calc(100% - 140px);
                    height: 100%;
                    margin: 0px 10px;
                    resize: none;
                    background: none;
                    outline: none;
                    border: 0;
                }
            }
        }
    }
</style>
