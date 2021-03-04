<template>
    <div class="page">
        <van-pagination
                v-model="current"
                :total-items="total"
                :show-page-size="3"
                force-ellipses
                :items-per-page="pageSize"
                @change="changeDate"
        />
    </div>
</template>

<script>
    export default {
        name: "Pages",
        props: {
            pageSize: {
                type: Number,
                default: 6
            },
            total: {
                type: Number,
                default: 0
            },
            currentPage: {
                type: Number,
                default: 1
            },
        },
        data () {
            return {
                current: this.currentPage
            }
        },
        methods: {
            changeDate:function (e) {
                this.$emit('pageClick',e)
            }
        }
    }
</script>

<style scoped lang="less">
    .page {
        padding: 10px 60px;
        overflow: hidden;
        .van-pagination{
            width: 100%;
            margin: 0;
            /deep/ .van-pagination__prev, /deep/ .van-pagination__next{
                display: block;
                float: left;
                -webkit-box-flex: none;
                -webkit-flex: none;
                flex: none;
                -webkit-box-sizing: content-box;
                -moz-box-sizing: content-box;
                box-sizing: content-box;
                color: #FFFFFF;
            }
            /deep/ .van-pagination__prev{
                width: 120px;
                height: 100px;
                text-align: left;
                background: url(../assets/img/bg2.png) no-repeat;
                background-size: cover;
                line-height: 100px;
                padding-left: 180px;
                padding-right: 0;
                cursor: pointer;
            }
            /deep/ .van-pagination__next{
                width: 174px;
                height: 100px;
                background: url(../assets/img/bg3.png) no-repeat;
                background-size: cover;
                line-height: 105px;
                text-align: left;
                padding-left: 29px;
                padding-right: 0;
                cursor: pointer;
            }
            ::v-deep .van-pagination__page{
                flex: 1;
                color: #2C1503;
                width: 25%;
                text-align: center;
                margin-top: 40px;
                position: relative;
                background: transparent;
                color: #000;
                height: 40px;
                line-height: 40px;
            }
            /deep/ .van-pagination__item--active{
                background: transparent;
                color: #000;
            }
            /deep/ .van-pagination__item--active::after{
                content: '';
                background: url(../assets/img/bg4.png) no-repeat;
                background-size: cover;
                background-position: center;
                width: 35px;
                height: 35px;
                left: 50%;
                position: absolute;
                margin-left: -20px;
                top: 5px;
                -webkit-transform: scale(1);
                -moz-transform: scale(1);
                -ms-transform: scale(1);
                -o-transform: scale(1);
                transform: scale(1);
            }
            ::v-deep .van-pagination__item::after{
                border: 0;
            }
        }
    }
</style>
