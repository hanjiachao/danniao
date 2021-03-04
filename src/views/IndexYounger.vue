<template>
    <div class="block">
        <div class="learn-bg">
            <LeftPanel></LeftPanel>
            <RightPanel></RightPanel>
            <ContentPanel>
                <div class="task-box">
                    <div v-for="(item, index) in taskList" :key="index" class="task-btn" :class="setStyle(item, index)" @click="confirmTask(item.task_id, index)">{{item.task_name}}</div>
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
        name: "IndexYounger",
        components: {LeftPanel,RightPanel,ContentPanel},
        data () {
            return {
                taskList: []
            }
        },
        methods: {
            getMyTask:function () {
                let that = this
                that.$common.ajax.post({
                    url: '/User/getMyTask',
                    userinfo: true
                }).then(res => {
                    that.taskList = res.result.data
                    if (res.result.data.length === 0) {
                        that.$toast({
                            message: '您还未拜师请前去拜师！',
                            duration: 1500
                        })
                        setTimeout(()=>{
                            this.$router.push('/SeniorClass')
                        },1000)
                    }
                    if (res.result.data[4].status === '已完成') {
                        this.$router.push('/End')
                    }
                })
            },
            setStyle(item,index) {
                let s1 = 'task' + index
                let s2 = item.status === '已完成'?'task-active':''
                return s1 + ' ' + s2
            },
            confirmTask:function (id,e) {
                let i = (e ? e-1 : 0)
                if (this.taskList[i].status === '未完成' && e != 0) {
                    this.$toast.fail({
                        message: '您前面的任务还没完成。',
                        duration: 1500
                    })
                    return false
                }
                if (this.taskList[e].status === '已完成') {
                    this.$toast.fail({
                        message: '您此任务任务已完成。',
                        duration: 1500
                    })
                    return false
                }
                this.$dialog.confirm({
                    title: '提示',
                    message: '是否确定完成了此任务？',
                    cancelButtonText: '否',
                    cancelButtonColor: '#ee0a24',
                    confirmButtonText: '是',
                    confirmButtonColor: '#000',
                    closeOnClickOverlay: true
                }).then((res) => {
                    this.$common.ajax.post({
                        url: '/User/confirmTask',
                        userinfo: true,
                        data: {
                            task_id: id
                        }
                    }).then(res => {
                        this.taskList[e].status = '已完成'
                        if (e === 4) {
                            this.$router.push('/End')
                        }
                    })
                }).catch((res) => {

                })
            }
        },
        created() {
            this.getMyTask()
        }
    }
</script>

<style scoped lang="less">
    .block{
        margin: 0px auto;
        width: 1400px;
        overflow: hidden;
        .learn-bg{
            margin: 140px 15px 15px;
            height: calc(100vh - 260px);
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
                        margin: 20px auto;
                        position: relative;
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
                    }
                }
            }
            .fr-btn {
                width: 100px;
                overflow: hidden;
            }
            .task-box {
                margin: 15% 7%;
                height: 62%;
                background: url(../assets/img/kuang08.png) no-repeat;
                background-size: cover;
                background-position: center;
                position: relative;
                .task-btn {
                    width: 16px;
                    height: 66px;
                    background: url(../assets/img/kuang10.png) no-repeat;
                    background-size: cover;
                    padding: 30px 20px;
                    position: absolute;
                    z-index: 2;
                    cursor: pointer;
                }
                .task-active {
                    background-image: url(../assets/img/kuang09.png);
                }
                .task0 {
                    left: 18%;
                    bottom: 42%;
                }
                .task1 {
                    left: 32%;
                    bottom: 60%;
                }
                .task2 {
                    left: 48%;
                    bottom: 54%;
                }
                .task3 {
                    left: 62%;
                    bottom: 37%;
                }
                .task4 {
                    left: 78%;
                    bottom: 20%;
                }
            }
            .task-box:after {
                content: '';
                background: url(../assets/img/bg6.png) no-repeat;
                background-size: cover;
                background-position: center;
                width: 78%;
                height: 46%;
                position: absolute;
                left: 7%;
                bottom: 20%;
                z-index: 1;
            }
        }
    }
</style>
