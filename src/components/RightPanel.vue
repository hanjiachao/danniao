<template>
    <div class="right learn-h fr-btn">
        <img v-if="type === '师兄'" @click="toSeniorClass1" src="../assets/img/btn03.png" class="learn-img">
        <img v-if="type === '师弟'" @click="toSeniorClass" src="../assets/img/btn03.png" class="learn-img">
        <img v-if="type === '师兄'" @click="toMessage" src="../assets/img/btn03-1.png" class="learn-img">
        <img v-if="type === '师弟'" @click="toBvrother" src="../assets/img/btn07-1.png" class="learn-img">
        <img v-if="type === '师弟'" @click="toIndexYounger" src="../assets/img/btn07-2.png" class="learn-img">
    </div>
</template>

<script>
    export default {
        name: "RightPanel",
        data () {
            return {
                // type: ''
            }
        },
        methods: {
            getUserinfo () {
                this.$common.ajax.post({
                    url: '/User/getInfo',
                    userinfo: true
                }).then(res => {
                    // this.type = res.result.data.type
                    this.$store.commit('setUserinfo', res.result.data)
                })
            },
            toSeniorClass1:function () {
                this.$router.push('/SeniorClass1')
            },
            toSeniorClass:function () {
                this.$router.push('/SeniorClass')
            },
            toMessage:function () {
                this.$router.push('/Message')
            },
            toBvrother:function () {
                this.$router.push('/Bvrother')
            },
            toIndexYounger:function () {
                this.$router.push('/IndexYounger')
            }
        },
        created() {
            if (!{...this.$store.state.userinfo}) {
                this.getUserinfo()
            }
        },
        computed: {
            type () {
                return this.$store.state.userinfo.type
            }
        }
    }
</script>

<style scoped lang="less">
    .fr-btn {
        width: 100px;
        overflow: hidden;
        img{
            cursor: pointer;
        }
    }
</style>
