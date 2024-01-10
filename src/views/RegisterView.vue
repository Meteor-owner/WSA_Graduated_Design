<template>
    <div class="container">
        <login-bar></login-bar>
        <div class="content">
            <div class="register">
                <div class="head clear">
                    <h2>创建账号</h2>
                    <router-link to="/login">已有账号，立即登录</router-link>
                </div>
                <div class="form">
                    <div class="input">
                        <input type="text" placeholder="请输入昵称" v-model="form.name">
                    </div>
                    <div class="input">
                        <input type="text" placeholder="请输入手机号" v-model="form.mobile" @keyup="testMobile">
                    </div>
                    <div class="err-msg">
                        {{ errMsg }}
                    </div>
                    <div class="input">
                        <input type="password" placeholder="请输入6-18位密码" v-model="form.pwd">
                    </div>
                    <div class="input">
                        <input type="password" placeholder="重复密码" v-model="form.pwd">
                    </div>
                    <div class="form-group">
                        <input type="checkbox" id="terms" v-model="form.agreeToTerms">
                        <label for="terms">我同意<router-link to="/article"
                                style="text-decoration: none; color:black">相关条款</router-link></label>
                        <button type="submit" :disabled="!form.agreeToTerms" @click="register">立即注册</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
import LoginBar from '../components/LoginBar.vue';
// import qs from 'qs'
// import axios from "axios";

export default {
    data() {
        return {
            form: {
                mobile: '',
                shortMsg: '',
                pwd: '',
                name: '',
                agreeToTerms: false
            },
            btnText: "获取验证码",
            errMsg: "",
        };
    },
    components: {
        LoginBar
    },
    methods: {
        testMobile() {
            let mobileReg = /((13[0-9])|(14[5,7])|(15[0-3,5-9])|(17[0,3,5-8])|(18[0-9])|166|198|199|(147))\d{8}$/
            this.errMsg = mobileReg.test(this.formData.phoneNum) ? "" : "请输入正确的手机号码！"
            return mobileReg.test(this.formData.phoneNum)
        },
        register() {
            if (!this.form.agreeToTerms) {
                alert("请同意条款")
                return;
            }
            else {
                this.$router.push('/')
            }

        }
    },
}
</script>

<style>
.container {
    background: #E9EEF3;
    width: 100%;
    height: 100%;
    position: absolute;
}

.register {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    padding: 40px 130px;
    width: 360px;
    background: #fff;
    height: 500px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.head {
    margin-bottom: 60px;
}

.head h2 {
    float: left;
    font-size: 28px;
    line-height: 30px;
}

.head a {
    margin-top: 40px;
    margin-bottom: 10px;
    float: right;
    font-size: 14px;
    text-decoration: none;
    color: #f90;
}

.input {
    position: relative;
    margin-bottom: 20px;
}

input {
    padding-left: 20px;
    width: 360px;
    height: 54px;
    border: 1px solid #ccc;
    box-sizing: border-box;
    font-size: 16px;
}

.verify {
    float: right;
    width: 110px;
    height: 54px;
    text-align: center;
    line-height: 54px;
    font-size: 14px;
    cursor: pointer;
    border: 1px solid #ccc;
    box-sizing: border-box;
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
    /* cursor: not-allowed; */
}

button:active {
    transform: scale(0.95);
}

button:hover {
    background-color: #e60000;
}
</style>