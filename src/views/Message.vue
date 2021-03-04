<template>
    <div class="block">
        <div class="learn-bg">
            <LeftPanel></LeftPanel>
            <RightPanel></RightPanel>
            <ContentPanel>
                <ul class="learn-list">
                    <li v-for="(item, index) in infoList" :key="index" @click="setAgree(item)">
                        <p class="learn-title">【{{item.nickname}}】的拜师申请</p>
                        <div class="learn-title learn-text">
                            <div class="right">{{item.add_time}}</div>
                            <p>【{{item.nickname}}】通过师兄堂选择了你，并像你发送了一条拜师申请！</p>
                        </div>
                    </li>
                </ul>
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
        name: "Message",
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
            getApprenticedRecord:function (page) {
                let that = this
                that.$common.ajax.post({
                    url: '/User/apprenticedRecord',
                    userinfo: true,
                    data: {
                        page: page,
                    }
                }).then(res => {
                    that.infoList = res.result.data.list
                    that.total = res.result.data.total
                    that.limit = res.result.data.limit
                })
            },
            getPages:function (e) {
                this.getSuperior(e)
                this.currentPage = e
            },
            setConfirm:function(id) {
                let that = this
                that.$common.ajax.post({
                    url: '/User/confirm',
                    userinfo: true,
                    data: {
                        id: id,
                    }
                }).then(res => {
                    if (res.status == 'SUCCESS') {
                        that.$toast.success({
                            message: '已同意该申请',
                            duration: 1500
                        })
                    }
                })
            },
            setReject:function(id) {
                let that = this
                that.$common.ajax.post({
                    url: '/User/reject',
                    userinfo: true,
                    data: {
                        id: id,
                    }
                }).then(res => {
                    if (res.status == 'SUCCESS') {
                        that.$toast.success({
                            message: '已驳回该申请',
                            duration: 1500
                        })
                    }
                })
            },
            setAgree:function (item) {
                let msg = {...item}
                this.$dialog.confirm({
                    title: '提示',
                    message: '是否同意' + msg.nickname + '的拜师申请。',
                    cancelButtonText: '驳回',
                    cancelButtonColor: '#ee0a24',
                    confirmButtonText: '同意',
                    confirmButtonColor: '#000'
                }).then((res) => {
                    this.setConfirm(item.id)
                }).catch((res) => {
                    this.setReject(item.id)
                })
            }
        },
        created() {
            this.getApprenticedRecord(1)
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
            .learn-list {
                padding: 70px;
                overflow: auto;
                height: calc(100% - 300px);
                li{
                    margin-bottom: 20px;
                    .learn-title {
                        background: url(../assets/img/kuang04.png) no-repeat;
                        background-size: cover;
                        height: 46px;
                        line-height: 46px;
                        padding-left: 30px;
                        margin: 0px;
                    }
                    .learn-text {
                        background-image: url(../assets/img/kuang05.png);
                        padding: 0px 30px;
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
