<template>
  <div>
    login
    <input type="text" v-model="username" />
    <button @click="login">login</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: "admin",
    };
  },
  methods:{
      login(){
          this.$store
            .dispatch("user/login",{username:this.username})
            .then(() => {
                this.$router.push({
                    path: this.$route.query.redirect||"/"
                })
            }).catch((err) => {
                alert(err)
            });
      }
  }
};
</script>

<style lang="scss" scoped>
</style>