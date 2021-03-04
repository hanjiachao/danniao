<template>
    <div class="block" v-if="noticeList.length > 0">
        <van-notice-bar scrollable color="#3A2310">
            <ul>
                <li v-for="(item, index) in noticeList" :key="index"><img src="../assets/img/notice.png"><span>{{item}}</span></li>
            </ul>
        </van-notice-bar>
    </div>
</template>

<script>
    import noticeImg from '../assets/img/notice.png'
    export default {
        name: "Barrage",
        data () {
            return{
                noticeList: []
            }
        },
        methods: {
            getNotice () {
                this.$common.ajax.get({
                    url: '/Index/getNotice'
                }).then(res => {
                    this.noticeList = res.result.data
                })
            }
        },
        created () {
            this.getNotice()
        }
    }
</script>

<style scoped lang="less">
    .block{
        width: 80%;
        height: 30px;
        line-height: 30px;
        position: absolute;
        top: 5%;
        left: 50%;
        -webkit-transform: translateX(-50%);
        -moz-transform: translateX(-50%);
        -ms-transform: translateX(-50%);
        -o-transform: translateX(-50%);
        transform: translateX(-50%);
        overflow: hidden;
        /deep/ .van-notice-bar{
            background: transparent;
        }
        ul{
            display: inline-block;
            overflow: hidden;
            li{
                float: left;
                height: 30px;
                line-height: 30px;
                display: flex;
                align-items: center;
                margin-right: 30px;
                overflow: hidden;
                img{
                    width: 15px;
                    height: 15px;
                    margin-right: 10px;
                }
            }
        }
    }
</style>
