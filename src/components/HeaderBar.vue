<template>
  <header class="navbar" :class="{ shadow: hasScrolled }">
    <div class="nav-logo">
      <a><img src="../assets/img/logo.png"></a>
    </div>
    <nav>
      <ul class="nav-links">
        <li><router-link to="/">首页</router-link></li>
        <li><router-link to="/houseList">房源</router-link></li>
        <li><router-link to="/offer">发布房源</router-link></li>
        <li><router-link to="/userPage">个人中心</router-link></li>
        <li>
          <router-link to="" v-if="username">{{ username }}</router-link>
          <router-link to="/login" v-else>登录</router-link>
          <span style="color: #9e8d71;"> | </span>
          <a v-if="username" @click="logout" class="logout"></a>
          <router-link to="/register" v-else>注册</router-link>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script>
import common from "../js/common"
import cookies from 'js-cookie'

export default {
  data() {
    return {
      username: cookies.get("username"),
      showLoginForm: true,
      lastScrollPosition: 0,
      hasScrolled: false
    }
  },
  components: {
  },
  methods: {
    getLoginStatus: common.getLoginStatus,
    logOut: common.logOut,
    logout() {
      this.logOut();
      this.$router.go(0)
    },
    login() {
      this.$router.push('/login').catch(err => {
        console.error(err);
      })
    },
    handleScroll() {
      // 获取当前滚动位置
      const currentScrollPosition = window.pageYOffset || document.documentElement.scrollTop;

      // 检测是否向下滚动
      if (currentScrollPosition > this.lastScrollPosition) {
        this.hasScrolled = true; // 如果是向下滚动，更新 hasScrolled 为 true
      } else {
        this.hasScrolled = false; // 向上滚动则更新为 false
      }

      // 更新上一次滚动位置
      this.lastScrollPosition = currentScrollPosition;
    }
  },
  mounted() {
    // 组件挂载后，开始监听滚动事件
    window.addEventListener('scroll', this.handleScroll);
  },
  destroyed() {
    // 组件销毁前，移除滚动事件监听
    window.removeEventListener('scroll', this.handleScroll);
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.navbar {
  position: fixed;
  font-family: 微软雅黑;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  padding: 0 2rem;
  height: 50px;
  transition: all 0.3s ease;
  border-top: #9e8d71 1px solid;
  left: 0;
  right: 0;
  margin: auto;
  width: 95.7%;
}

.navbar.shadow {
  top: 0;
  width: 90%;
  z-index: 1000;
  border-radius: 10px;
  top: 5px;
  box-shadow: 0 3px 5px rgba(0, 0, 0, 0.2);
}

.nav-logo a img {
  height: 80px;
}

.nav-links {
  list-style: none;
  display: flex;
  gap: 1rem;
}

.nav-links a {
  text-decoration: none;
  color: #9e8d71;
}

.nav-links a:hover {
  border-bottom: #9e8d71 1px solid;
  box-sizing: border-box;
  /* font-size: 20px; */
}
</style>
