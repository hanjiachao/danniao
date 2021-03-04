<template>
    <div class="block">
        <div class="end1" v-if="endFlag1">
<!--            <h3>【<span>姓名</span>】你于2020-08-02通过师兄堂自选加入丹鸟的大家庭</h3>-->
            <h3>{{info.first_msg}}</h3>
            <h3>你已经加入丹鸟 <span class="end-day">{{info.days}}</span> 天</h3>
            <div class="teacher-btn btn" @click="nextStep1"><img src="../assets/img/btn09.png"></div>
        </div>
        <div class="end2" v-if="endFlag2">
            <div class="task-box">
                <h3>任务耗时 <span>{{info.task_total_time}}</span> 天</h3>
                <p>完成了<span>{{info.task_confitm_num}}</span>个任务</p>
            </div>
            <p class="task-title">任务列表如下</p>
            <div class="task-list">
                <ul>
                    <li v-for="(item, index) in info.task_list" :key="index">
                        <h4>{{item.ut_task_name}}</h4>
                        <p>{{item.ut_task_tag}}</p>
                    </li>
                </ul>
            </div>
            <div class="teacherBtn btn" @click="nextStep2"><img src="../assets/img/btn09.png"></div>
        </div>
        <div class="end2" v-if="endFlag3">
            <div class="task-box">
                <h3>任务耗时 <span>{{info.task_total_time}}</span> 天</h3>
                <p>完成了<span>{{info.task_confitm_num}}</span>个任务</p>
            </div>
            <div class="end-teacher">
                <h3>你成为你师父【<span>{{info.superior_name}}</span>】的第【<span>{{info.sort}}</span>】个徒弟</h3>
                <div class="teacher-btn btn" @click="start"><img src="../assets/img/btn08.png"></div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "End",
        data () {
            return {
                info: {},
                endFlag1: true,
                endFlag2: false,
                endFlag3: false
            }
        },
        methods: {
            getEndPageInfo:function () {
                let that = this
                that.$common.ajax.post({
                    url: '/Index/endPage',
                    userinfo: true,
                }).then(res => {
                    that.info = res.result.data
                })
            },
            graduation:function(){
                let that = this
                that.$common.ajax.post({
                    url: '/User/graduation',
                    userinfo: true,
                }).then(res => {
                    console.log(res)
                })
            },
            nextStep1:function () {
                this.endFlag1 = false
                this.endFlag2 = true
            },
            nextStep2:function () {
                this.endFlag2 = false
                this.endFlag3 = true
            },
            start:function () {
                let that = this
                that.$dialog.confirm({
                    title: '提示',
                    message: '是否确定出师？',
                    cancelButtonText: '否',
                    cancelButtonColor: '#ee0a24',
                    confirmButtonText: '是',
                    confirmButtonColor: '#000',
                    closeOnClickOverlay: true
                }).then((res) => {
                    that.graduation()
                }).catch((res) => {

                })
            }
        },
        created() {
            this.getEndPageInfo()
        }
    }
</script>

<style scoped lang="less">
    .block{
        width: 1200px;
        margin: 0 auto;
        overflow: hidden;
        height: 100vh;
        .end1{
            width: 900px;
            height: 200px;
            background: url(../assets/img/bg.png) no-repeat;
            background-size: cover;
            position: absolute;
            left: 50%;
            margin-left: -450px;
            top: 50%;
            margin-top: -135px;
            z-index: 1;
            text-align: center;
            padding-top: 70px;
            h3{
                margin: 10px 0px;
                span{
                    color: #E79F02;
                }
            }
            .teacher-btn {
                width: 160px;
                margin: 67px auto;
                cursor: pointer;
            }
        }
        .end2{
            width: 100%;
            height: calc(100vh - 280px);
            background: url(../assets/img/kuang17.png) no-repeat;
            background-size: cover;
            background-position: top center;
            margin-top: 140px;
            text-align: center;
            overflow: hidden;
            .task-box{
                margin-top: 80px;
                h3{
                    margin: 10px 0px;
                    span{
                        color: #E79F02;
                    }
                }
                p{
                    margin: 10px 0px;
                    span{
                        color: #E79F02;
                    }
                }
            }
            .task-title {
                font-weight: bold;
                color: #FFFFFF;
                line-height: 18px;
                text-shadow: 1px 2px 3px rgba(0, 0, 0, 0.6);
                padding: 20px 0px;
                border-bottom: 1px solid #fff69052;
                width: 57%;
                margin: 50px auto 15px;
            }
            .task-list {
                width: 70%;
                height: calc(100vh - 600px);
                overflow-y: auto;
                margin: 0 auto;
                padding: 0px 15px;
                li{
                    margin-bottom: 40px;
                    h4{
                        color: #FFB000;
                        padding-bottom: 10px;
                        position: relative;
                        padding-left: 18px;
                        display: inline-block;
                    }
                    h4:after {
                        content: '';
                        position: absolute;
                        width: 5px;
                        height: 5px;
                        background: #FFB000;
                        left: 0px;
                        top: 7px;
                        -webkit-transform: rotate(-45deg);
                        -moz-transform: rotate(-45deg);
                        -ms-transform: rotate(-45deg);
                        -o-transform: rotate(-45deg);
                        transform: rotate(-45deg);
                    }
                    p{
                        margin: 10px 0px;
                        line-height: 28px;
                    }
                }
            }
            .teacherBtn{
                width: 160px;
                margin: 0 auto;
                cursor: pointer;
            }
            .end-teacher{
                margin-top: 220px;
                h3{
                    margin: 10px 0px;
                    span{
                        color: #E79F02;
                    }
                }
                .teacher-btn {
                    width: 160px;
                    margin: 67px auto;
                    cursor: pointer;
                }
            }
        }
    }
</style>
