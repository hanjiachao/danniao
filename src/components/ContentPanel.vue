<template>
    <div class="learn-content younger-line">
        <div class="learn-younger1">
            <img src="../assets/img/kuang20.png">
        </div>
        <div class="learn-younger2">
            <img src="../assets/img/kuang21.png">
        </div>
        <div class="learn-younger3">
            <img src="../assets/img/kuang23.png">
        </div>
        <div class="learn-younger4">
            <img src="../assets/img/kuang22.png">
        </div>
        <div class="younger-box">
            <slot></slot>
        </div>
    </div>
</template>

<script>
    export default {
        name: "ContentPanel"
    }
</script>

<style scoped lang="less">
    .learn-content {
        width: calc(100% - 420px);
        margin-left: 295px;
        height: 100%;
        overflow: hidden;
        border: 1px solid #462203;
        background: rgba(177, 133, 87, 0.37);
        position: relative;
        .learn-younger1, .learn-younger2, .learn-younger3, .learn-younger4 {
            position: absolute;
            width: 99px;
            height: 99px;
            z-index: 1;
        }
        .learn-younger1 {
            left: 10px;
            top: 10px;
        }
        .learn-younger2 {
            right: 10px;
            top: 10px;
        }
        .learn-younger3 {
            bottom: 10px;
            left: 10px;
        }
        .learn-younger4 {
            bottom: 10px;
            right: 10px;
        }
        .younger-box{
            position: absolute;
            width: 100%;
            height: 100%;
            left: 0px;
            top: 0px;
            z-index: 2;
            overflow: auto;
        }
    }
    .younger-line {
        position: relative;
    }
    .younger-line:before {
        content: '';
        position: absolute;
        z-index: 1;
        left: 10px;
        top: 109px;
        width: calc(100% - 21px);
        height: calc(100% - 217px);
        border: 1px solid #462203;
        border-top: 0px;
        border-bottom: 0px;
    }
    .younger-line:after {
        content: '';
        position: absolute;
        z-index: 1;
        left: 109px;
        top: 10px;
        width: calc(100% - 217px);
        height: calc(100% - 21px);
        border: 1px solid #462203;
        border-left: 0px;
        border-right: 0px;
    }
</style>
