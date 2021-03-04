<template>
    
</template>

<script>
  export default {
    name: "CleanToken",
    created () {
      this.$store.commit('setAccessToken', null)
    }
  }
</script>

<style scoped>

</style>