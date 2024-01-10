<template>
    <div class="container">
        <main-bar></main-bar>
        <div class="box">
            <div class="page-nav">
                <el-breadcrumb separator-class="el-icon-arrow-right">
                    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                    <el-breadcrumb-item>发布房源</el-breadcrumb-item>
                </el-breadcrumb>
            </div>
            <div class="title">
                <h1>发布出租房源</h1>
            </div>
            <div class="form">
                <dl class="form-item">
                    <dt>小区</dt>
                    <dd>
                        <div class="item-com">
                            <input v-model="community" placeholder="请输入内容">
                        </div>
                    </dd>
                </dl>
            </div>
        </div>

        <footer-bar></footer-bar>
    </div>
</template>

<script>
import FooterBar from '../components/FooterBar.vue'
import MainBar from '../components/MainBar.vue'
export default {
    components: { MainBar, FooterBar },
    data () {
        return {
            community: '',
        }
    }
}
</script>

<style scoped>
.box{
    margin: 0 auto;
    width: 1100px;
}
.page-nav {
    margin-top: 10px;
    font-size: 14px;
}

.title {
    text-align: center;
}
.form-item{
    color: #9399a5;
    margin: 0 auto;
    width: 590px;
    padding-top: 50px;
}
.form-item dt{
    float: left;
    color: #101d37;
    font-weight: 700;
    height: 40px;
    width: 120px;
    border: #c30d23 1px solid;
}
.form-item dd{
    position: relative;
    width: 470px;
}
.form-item input{
    border: none;
    height: 40px;
    line-height: 20px;
    padding: 10px 0;
    border: #c30d23 1px solid;
}

.item-com{
    position: relative;
    width: 100%;
}
</style>
