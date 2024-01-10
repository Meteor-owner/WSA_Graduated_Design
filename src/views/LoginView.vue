<template>
  <div class="container">
    <login-bar></login-bar>
    <div class="login">
      <div class="header">
        <h2>登录</h2>
        <router-link to="/register">没有账号，立即注册</router-link>
      </div>
      <div class="form">
        <div class="input">
          <input type="text" placeholder="请输入手机号" v-model="mobile">
        </div>
        <div class="input">
          <input type="password" placeholder="请输入密码" v-model="pwd">
        </div>
        <div>
          <input type="checkbox" id="terms" v-model="agreeToTerms">
          <label for="terms">我同意<router-link to="/article"
              style="text-decoration: none; color:black">相关条款</router-link></label>
          <button type="submit" :disabled="!agreeToTerms">登录</button>
        </div>
        <p>
          <router-link to="">忘记密码？</router-link>
        </p>
        <div class="three-login">
          <div class="item">
            <img src="../assets/img/qq.png" alt="">
            <span>QQ登录</span>
          </div>
          <div class="item">
            <img src="../assets/img/wechat.png" alt="">
            <span>微信登录</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LoginBar from '../components/LoginBar.vue'
export default {
  components: { LoginBar },
  data() {
    return {
      mobile: '',
      pwd: '',
      agreeToTerms: true,
    }
  },
}
</script>

<style scoped>
.container{
  background-color: #E9EEF3;
}
.login {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  padding: 40px 130px;
  width: 360px;
  height: 500px;
  background: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 99999;
  /* border:#c30d23 1px solid; */
}

.header h2 {
  float: left;
  font-size: 28px;
  line-height: 28px;
}

.header a {
  text-decoration: none;
  margin-top: 35px;
  font-size: 14px;
  float: right;
  color: #f90;
}

.header {
  margin-bottom: 35px;
  height: 10px;
}

.input {
  position: relative;
  margin-bottom: 30px;
}

.input i {
  position: absolute;
  left: 8px;
  top: 50%;
  transform: translateY(-50%);
}

input {
  padding-left: 20px;
  width: 360px;
  height: 54px;
  border: 1px solid #ccc;
  box-sizing: border-box;
  font-size: 16px;
}


.login p {
  padding-bottom: 15px;
  margin: 30px auto 0;
  width: 300px;
  text-align: center;
  font-size: 13px;
  border-bottom: 1px solid #ccc;
}

.login p a {
  color: #666;
  font-size: 14px;
}

.login p a:hover {
  color: #333;
}

#terms {
  width: 15px;
  height: 15px;
  border: 1px solid #ccc;
  box-sizing: border-box;
}

button {
  margin-top: 5px;
  width: 360px;
  height: 54px;
  color: #fff;
  font-size: 16px;
  background: #c30d23;
  text-align: center;
  line-height: 54px;
  border: 0px;
  cursor: pointer;
  transition: transform 0.1s ease;
}

button:disabled {
  background-color: #ccc;
}
button:active {
    transform: scale(0.95);
}

button:hover {
    background-color: #e60000;
}
.three-login {
  padding: 0 10px;
  margin-top: 20px;
  display: flex;
  justify-content: space-around;
}

.three-login .item img {
  width: 40px;
  height: 40px;
}

.item {
  text-align: center;
  cursor: pointer;
}

.item span {
  display: block;
}
</style>