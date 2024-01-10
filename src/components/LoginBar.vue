<template>
    <header>
        <div class="header">
            <img src="../assets/img/logo.png" alt="">
            <router-link to="/">
                返回首页
            </router-link>
        </div>
    </header>
</template>

<style scoped>
header {
    background: #fff;
    position: relative;
    margin: 0 auto 20px;
    width: 100%;
    height: 60px;
    line-height: 80px;
}

.header img {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    margin-left: 25%;
}

.header a {
    margin-right: 25%;
    margin-top: -10px;
    text-decoration: none;
    float: right;
    font-size: 18px;
    color: #777;
}
</style>
