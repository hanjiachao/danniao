<template>
    <Pages :currentPage="current" :total="total" :pageSize="limit" @pageClick="getPages"></Pages>
</template>

<script>
    import Pages from '../components/Pages'
    export default {
        name: "Test",
        components: {Pages},
        data () {
            return {
                total: 60,
                limit: 6,
                current: 1
            }
        },
        methods:{
            getPages:function (e) {
                console.log(e)
                this.current = e
            }
        }
    }
</script>

<style scoped>

</style>
