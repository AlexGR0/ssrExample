<template>
  <div id="app">
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view/> -->
    <nav>
      <router-link to="/">首页</router-link> | 
      <router-link to="/detail">详情页</router-link>
    </nav>
    <router-view></router-view>
    <!-- <svg class="icon">
      <use xlink:href="#icon-wx"></use>
    </svg>
    <svg class="icon">
      <use xlink:href="#icon-qq"></use>
    </svg> -->
    <SvgIcon iconClass="qq" className="qqIcon"></SvgIcon>
    <SvgIcon iconClass="wx"></SvgIcon>
  </div>
</template>

<script>
// import SvgIcon from './components/SvgIcon.vue'
// import './icons/svg/wx.svg'
export default {
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
.qqIcon{
  font-size: 12px;
  color: aqua;
}
</style>
