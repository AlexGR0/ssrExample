<template>
  <div>
    about
    <SvgIcon iconClass="qq" className="qqIcon"></SvgIcon>
    <SvgIcon iconClass="wx"></SvgIcon>

    <button v-promission="['admin','editor']">editorButton</button>
    <button v-promission="['admin']">adminButton</button>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
</style>