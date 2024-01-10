<template>
    <div class="container">
        <main-bar></main-bar>
        <div class="box2">
            <div class="page-nav">
                <el-breadcrumb separator-class="el-icon-arrow-right">
                    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                    <el-breadcrumb-item>租房列表</el-breadcrumb-item>
                </el-breadcrumb>
            </div>
            <div class="search-button-area">
                <input class="fll" type="text" placeholder="搜索" v-model="keywords" @keyup="keyUp">
                <span class="search-button" @click="searchHouse">
                    搜索
                </span>
            </div>
            <div class="checkbox-search">
                <div class="search-condition">
                    <div class="search-title">
                        区域
                    </div>
                    <div class="checked-container">
                        <div>
                            <el-checkbox-group v-model="checkedData.addrs">
                                <el-checkbox v-for="(addr, index) in addrs" :label="addr.title" :key="index"
                                    @keyup.enter="callEvent"></el-checkbox>
                            </el-checkbox-group>
                        </div>
                    </div>
                </div>
                <div class="search-condition">
                    <div class="search-title">
                        户型
                    </div>
                    <div class="checked-container">
                        <div>
                            <el-checkbox-group v-model="checkedData.bedrooms">
                                <el-checkbox v-for="(bedroom, index) in bedrooms" :label="bedroom.title" :key="index"
                                    @keyup.enter="callEvent"></el-checkbox>
                            </el-checkbox-group>
                        </div>
                    </div>
                </div>
                <div class="search-condition">
                    <div class="search-title">
                        价格
                    </div>
                    <div class="checked-container">
                        <div>
                            <el-checkbox-group v-model="checkedData.price">
                                <el-checkbox v-for="(item, index) in price" :label="item.title" :key="index"
                                    @keyup.enter="callEvent"></el-checkbox>
                            </el-checkbox-group>
                        </div>
                    </div>
                </div>
            </div>
            <div class="gap-line"></div>
            <div class="sort-choose">
                <label>
                    <input type="radio" style="display: none" name="sort" value="1" v-model="checkedData.order">
                    <div class="sort-item">最新</div>
                </label>
                <label>
                    <input type="radio" style="display: none" name="sort" value="2" v-model="checkedData.order">
                    <div class="sort-item">
                        房屋租金
                        <i class="iconfont icon-55"></i>
                    </div>
                </label>
                <label>
                    <input type="radio" style="display: none" name="sort" value="4" v-model="checkedData.order">
                    <div class="sort-item">
                        房屋面积
                        <i class="iconfont icon-55"></i>
                    </div>
                </label>
            </div>
            <div class="rental-house-list">
                <h2>共找到<span>{{ count }}</span>个 房源</h2>
            </div>
            <div class="show-data" v-for="(item, index) in HouseList" :key="index">
                <div class="image">
                    <router-link :to="'/detail?id=' + item.id" @click.prevent="transportID(item.id)" target="_blank">
                        <img src="../assets/img/room.jpg" alt="">
                    </router-link>
                    <!-- <div @click="transportID(item.id)">
                        <img src="../assets/img/room.jpg" alt="">
                    </div> -->
                </div>
                <div class="data-dec">
                    <h3>
                        <router-link :to="'/detail?id=' + item.id" @click.prevent="transportID(item.id)" target="_blank">{{
                            item.location }}市{{ item.village }}好房出租</router-link>
                    </h3>
                    <p>{{ item.village }} <span>|</span> {{ item.bedroom }}室{{ item.livingroom }}厅{{ item.wc }}卫
                        <span>|</span> {{ item.direction }}朝向 <span>|</span> {{ item.area }}平
                    </p>
                    <p>{{ item.cur_floor }}/{{ item.tol_floor }}层 <span>|</span> {{ item.decoration }} <span>|</span> {{
                        item.build_year }}年建</p>
                    <p>{{ item.follow_num }}人关注 <span>|</span> {{ item.publish_date }}发布</p>
                </div>
                <div class="data-price">
                    <h3><span>{{ item.price }}</span>元/月</h3>
                    <p>{{ item.update_date }}更新</p>
                    <div class="care" @click="attention(item.id)" v-if="item.guanzhu == 0 || !item.guanzhu">
                        关注
                    </div>
                    <div class="overCare" v-else @click="overCare(item.id)">
                        已关注
                    </div>
                </div>
            </div>
            <div class="pages">
                <el-pagination layout="prev, pager, next, jumper" @current-change="handleCurrentChange"
                    :current-page="pagination.page_num" :page-size="pagination.page_size" :total="count"
                    :background="isBackground">
                </el-pagination>
            </div>
        </div>
        <footer-bar></footer-bar>
    </div>
</template>

<script>
import FooterBar from '../components/FooterBar.vue'
import MainBar from '../components/MainBar.vue'
import axios from 'axios'
import cookies from 'js-cookie'

export default {
    components: { MainBar, FooterBar },
    data() {
        return {
            checkedData: {
                addrs: [],
                price: [],
                bedrooms: [],
                order: 1,
                status: false,
            },
            addrs: [
                {
                    title: "不限",
                    value: 0
                },
                {
                    title: "广州",
                    value: 1
                },
                {
                    title: "上海",
                    value: 2
                },
                {
                    title: "北京",
                    value: 3
                },
                {
                    title: "杭州",
                    value: 4
                },
                {
                    title: "其他",
                    value: 5
                }
            ],
            price: [
                {
                    title: "不限",
                    value: 0
                },
                {
                    title: "1000以下",
                    value: 1
                },
                {
                    title: "1000-2000",
                    value: 2
                },
                {
                    title: "2000-3000",
                    value: 3
                },
                {
                    title: "3000以上",
                    value: 4
                }
            ],
            bedrooms: [
                {
                    title: "陋室",
                    value: 0
                },
                {
                    title: "一室",
                    value: 1
                },
                {
                    title: "两室",
                    value: 2
                },
                {
                    title: "三室",
                    value: 3
                },
                {
                    title: "四室",
                    value: 4
                },
            ],
            pagination: {
                r_id: "",
                page_num: 1,
                page_size: 10,
                order: 1,
                // userid: cookies.get("userid")
            },
            HouseList: [],
            count: 0,
            load: null,
            keywords: "",
            isBackground: true
        }
    },
    methods: {
        searchHouse() {
            this.$router.push({ path: "/houseList", query: { q: this.keywords } })//将查询参数 q 设置为 keywords 的值
            this.$router.go(0)
        },
        keyUp(key) {
            if (key.keyCode == 13) {
                this.searchHouse()
            }
        },
        callEvent() {
            console.log('Choose this checkbox')
        },
        attention(house_id) {
            if (cookies.get("userid")) {
                this.$axios.post("/api.php?s=Operation/houseCollect", { type: 1, user_id: cookies.get("userid"), house_id }).then(res => {
                    // this.getData()
                    console.log(res)
                })
            } else {
                this.$router.push("/login")
            }
        },
        overCare(house_id) {
            if (cookies.get("userid")) {
                this.$axios.post("/api.php?s=Operation/houseCollectCancel", { type: 1, user_id: cookies.get("userid"), house_id }).then(res => {
                    this.getData()
                    console.log('res: ', res)
                })
            }
        },
        getData() {
            axios.get('https://yapi.pro/mock/220305/houses').then((result) => {
                this.count = result.data.data.length;
                const fullData = result.data.data;
                const start = (this.pagination.page_num - 1) * this.pagination.page_size;
                const end = start + this.pagination.page_size;
                const show_data = fullData.slice(start, end);

                this.HouseList = [];
                for (let item of show_data) {
                    this.HouseList.push(item);
                }
            });
        },
        handleCurrentChange(newPage) {
            this.pagination.page_num = newPage;
            this.getData();
            window.scrollTo(0, 0);
        },
        transportID(houseId) {
            cookies.set('houseId', houseId);
            console.log(houseId);
            setTimeout(() => {
                console.log('cookie id: ', cookies.get('houseId'));
            }, 500);
            this.$router.push('/detail?id=' + houseId);
        }
    },
    mounted() {
        this.getData();
        // this.keywords = this.$route.query.q;
        console.log('cookie: ', cookies.get('houseId'));
    }
}
</script>

<style scoped>
.box2 {
    margin: 0 auto;
    width: 1100px;
}

.page-nav {
    margin-top: 10px;
    font-size: 14px;
}

.search-button-area {
    margin: 40px 0;
    align-content: center;
    padding-left: 10%;
}

.search-button-area input {
    padding-left: 20px;
    margin-right: 10px;
    background: #f4f4f4;
    font-size: 16px;
    width: 740px;
    height: 60px;
    color: #666666;
    border: none;
    box-sizing: border-box;
}

.search-button {
    display: inline-block;
    width: 160px;
    height: 60px;
    color: #fff;
    font-size: 16px;
    background: #c30d23;
    text-align: center;
    line-height: 58px;
    cursor: pointer;
    transition: transform 0.1s ease;
}

.search-button:disabled {
    background-color: #ccc;
}

.search-button:active {
    transform: scale(0.95);
}

.search-button:hover {
    background-color: #e60000;
}

.search-condition {
    font-size: 14px;
    line-height: 40px;
    display: flex;
    /* border: #9e8d71 1px solid; */
}

.search-title {
    width: 65px;
    margin-right: 35px;
    color: #333;
    font-size: 18px;
}

.checked-container {
    width: 530px;
    display: flex;
    flex-wrap: wrap;
    /* border: #9e8d71 1px solid; */
}

.gap-line {
    padding: 20px 0;
    border-bottom: 1px solid #999;
}

.sort-choose label {
    float: left;
    margin: 40px 24px 15px 0;
    font-size: 18px;
    color: #9e8d71;
    border: 1px solid #9e8d71;
    border-radius: 18px;
    cursor: pointer;
}

.sort-item {
    padding: 8px 15px;
}

.sort-choose i {
    font-weight: 700;
}

.sort-choose input:checked+.sort-item {
    background: #9e8d71;
    color: #fff;
    border-radius: 14px;
}

.rental-house-list {
    margin: 40px 0;
}

.rental-house-list h2 {
    font-size: 30px;
    color: #333;
}

.rental-house-list h2 span {
    color: #857863;
}

.show-data {
    margin-bottom: 40px;
    height: 240px;
    display: flex;
    /* border: #9e8d71 1px solid; */
    font-family: 微软雅黑;
}

.image {
    position: relative;
    float: left;
    margin-right: 5px;
}

.data-dec {
    margin-left: 10px;
    padding-left: 10px;
    width: 30%;
}

.data-dec h3 {
    margin-bottom: 30px;
    font-size: 20px;
    color: #333;
}

.data-dec a {
    text-decoration: none;
    color: #494848;
}

.data-dec p {
    margin-bottom: 18px;
    font-size: 14px;
    color: #949090;
}

.data-dec span {
    font-size: 16px;
}

.data-price {
    /* float: right; */
    width: 20%;
    margin-left: 30%;
}

.data-price h3 {
    margin-bottom: 28px;
    color: #9e8d71;
    font-size: 20px;
    text-align: right;
}

.data-price span {
    font-size: 40px;
}

.data-price p {
    margin-bottom: 40px;
    text-align: right;
    font-size: 15px;
    color: #949090;
}

.care {
    float: right;
    width: 102px;
    height: 38px;
    text-align: center;
    line-height: 38px;
    border: 1px solid #9e8d71;
    border-radius: 5px;
    font-size: 16px;
    color: #9e8d71;
    cursor: pointer;
}

.overCare {
    float: right;
    width: 102px;
    height: 38px;
    text-align: center;
    line-height: 38px;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 16px;
    color: #666;
    cursor: pointer;
}

.pages {
    margin-bottom: 30px;
    text-align: center;
}
</style>

<style lang="scss">
.el-checkbox__input.is-checked+.el-checkbox__label {
    color: black;
}

.el-checkbox .el-checkbox__label {
    color: black;
    font-size: 16px;
    line-height: 22px;
}

.el-checkbox__input.is-checked .el-checkbox__inner,
.el-checkbox__input.is-indeterminate .el-checkbox__inner {
    border-color: #9e8d71;
    background-color: #9e8d71;
}

.el-checkbox__inner:hover {
    border-color: #9e8d71;
}

.el-pagination.is-background .el-pager li:not(.disabled).active {
    background-color: #9e8d71;
    color: #fff;
}

.el-pagination.is-background .el-pager li:hover {
    color: #9e8d71;
}

.el-pagination.is-background .el-pager li:not(.disabled):hover {
    color: #9e8d71;
}

.el-pagination.is-background .el-pager li:not(.disabled).active:hover {
    background-color: #9e8d71;
    color: #FFF;
}
</style>
