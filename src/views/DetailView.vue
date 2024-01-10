<template>
    <div class="container">
        <main-bar></main-bar>
        <div class="box">
            <div class="page-nav">
                <el-breadcrumb separator-class="el-icon-arrow-right">
                    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                    <el-breadcrumb-item :to="{ path: '/houseList' }">租房列表</el-breadcrumb-item>
                    <el-breadcrumb-item>{{ houseList.village }}</el-breadcrumb-item>
                </el-breadcrumb>
            </div>
            <div class="detail">
                <div class="base-info">
                    <h1>{{ houseList.location }}市{{ houseList.village }}</h1>
                    <div class="main-info">
                        <div class="show-pic">
                            <div class="big-img">
                                <img :src="picList[cur_index]" alt="" @click="expandImg(picList[cur_index])">
                            </div>
                            <div v-if="show_img" class="modal" @click.self="closeImg">
                                <div class="modal-content">
                                    <span class="close" @click="closeImg">&times;</span>
                                    <img :src="big_img" class="modal-image">
                                </div>
                            </div>
                            <div class="image">
                                <div class="signal">
                                    <div class="arrow left-arrow" @click="handleLeftClick">&#10094;</div>
                                    <div class="img-container">
                                        <div class="img-show" ref="imgContainer">
                                            <img v-for="(image, index) in picList" :key="index" :src="image"
                                                class="img-content" :class="{ 'img-active': index === cur_index }"
                                                @click="imgChange(index)">
                                        </div>
                                    </div>
                                    <div class="arrow right-arrow" @click="handleRightClick">&#10095;</div>
                                </div>
                            </div>
                        </div>
                        <div class="right-info">
                            <div class="right-top-info">
                                <h3><span>{{ houseList.price }}</span>元/月</h3>
                            </div>
                            <div class="right-second-info">
                                <div class="second-item">
                                    <span>{{ houseList.bedroom }}室{{ houseList.livingroom }}厅</span>
                                    <p>{{ houseList.cur_floor }}|{{ houseList.tol_floor }}层</p>
                                </div>
                                <div class="second-item">
                                    <span>{{ houseList.direction }}</span>
                                    <p>{{ houseList.decoration }}</p>
                                </div>
                                <div class="second-item">
                                    <span>{{ houseList.area }}平米</span>
                                    <p>{{ houseList.room_type }}</p>
                                </div>
                            </div>
                            <div class="right-third-info">
                                <div class="third-left fll">
                                    <p>房源编号：<span>{{ houseList.id }}</span></p>
                                    <p>所在区域：<span>{{ houseList.location }}</span></p>
                                </div>
                                <div class="third-right">
                                    <p>小区名称：<span>{{ houseList.village }}</span></p>
                                    <p>发布时间：<span>{{ houseList.publish_date }}</span></p>
                                </div>
                            </div>
                            <div class="right-fourth-button">
                                <div class="follow">加入关注</div>
                                <div class="follow">现在就租</div>
                            </div>
                        </div>
                    </div>
                </div>
                <h1>基本信息</h1>
                <div class="detail-info">
                    <div class="detail-left">
                        <p>租赁方式：<span>{{ houseList.rental_type }}</span></p>
                        <p>房屋户型：<span>{{ houseList.bedroom }}室{{ houseList.livingroom }}厅{{ houseList.wc }}卫</span></p>
                        <p>建筑面积：<span>{{ houseList.area }}㎡</span></p>
                        <p>套内面积：<span>{{ houseList.inner_area }}㎡</span></p>
                        <p>装修情况：<span>{{ houseList.decoration }}</span></p>
                        <p>建筑类型：<span>多层</span></p>
                    </div>
                    <div class="detail-right">
                        <p>付款方式：<span></span></p>
                        <p>所在楼层：<span>{{ houseList.cur_floor }} | {{ houseList.tol_floor }}层</span></p>
                        <p>房屋类型：<span>{{ houseList.room_type }}</span></p>
                        <p>房屋朝向：<span>{{ houseList.direction }}</span></p>
                        <p>配备电梯：<span>{{ houseList.has_elevator === 'y' ? '有电梯' : '无电梯' }}</span></p>
                        <p>梯户比例：<span>{{ houseList.stair_to_house_ratio }}</span></p>
                    </div>
                </div>
                <h1>房源特色</h1>
                <div class="special">
                    <div class="tips">
                        <div class="tips-icon">
                            <div class="icon">
                                <img :src="houseList.has_bed === 'y' ? require('../assets/img/signal/bed2.png') : require('../assets/img/signal/bed1.png')"
                                    style="margin-top:5px">
                            </div>
                            <span :style="{ color: houseList.has_bed === 'y' ? '#9e8d71' : '#000' }">床</span>
                        </div>
                        <div class="tips-icon">
                            <div class="icon">
                                <img :src="houseList.has_tv === 'y' ? require('../assets/img/signal/tv2.png') : require('../assets/img/signal/tv1.png')"
                                    style="margin-top:5px">
                            </div>
                            <span :style="{ color: houseList.has_tv === 'y' ? '#9e8d71' : '#000' }">电视</span>
                        </div>
                        <div class="tips-icon">
                            <div class="icon">
                                <img
                                    :src="houseList.has_fridge === 'y' ? require('../assets/img/signal/fr2.png') : require('../assets/img/signal/fr1.png')">
                            </div>
                            <span :style="{ color: houseList.has_fridge === 'y' ? '#9e8d71' : '#000' }">冰箱</span>
                        </div>
                        <div class="tips-icon">
                            <div class="icon">
                                <img
                                    :src="houseList.has_wm === 'y' ? require('../assets/img/signal/wm2.png') : require('../assets/img/signal/wm1.png')">
                            </div>
                            <span :style="{ color: houseList.has_wm === 'y' ? '#9e8d71' : '#000' }">洗衣机</span>
                        </div>
                        <div class="tips-icon">
                            <div class="icon">
                                <img :src="houseList.has_ac === 'y' ? require('../assets/img/signal/ac2.png') : require('../assets/img/signal/ac1.png')"
                                    style="margin-top:5px">
                            </div>
                            <span :style="{ color: houseList.has_ac === 'y' ? '#9e8d71' : '#000' }">空调</span>
                        </div>
                        <div class="tips-icon">
                            <div class="icon">
                                <img
                                    :src="houseList.has_wifi === 'y' ? require('../assets/img/signal/wifi2.png') : require('../assets/img/signal/wifi1.png')">
                            </div>
                            <span :style="{ color: houseList.has_wifi === 'y' ? '#9e8d71' : '#000' }">WIFI</span>
                        </div>
                        <!-- <div class="tips-icon">
                            <div class="icon">
                                <img :src="houseList.has_furniture === 'y' ? require('../assets/img/signal/fu2.png') : require('../assets/img/signal/fu1.png')"
                                    style="margin-top:5px">
                            </div>
                            <span :style="{ color: houseList.has_furniture === 'y' ? '#9e8d71' : '#000' }">家具</span>
                        </div> -->
                        <div class="tips-icon">
                            <div class="icon">
                                <img
                                    :src="houseList.has_gas === 'y' ? require('../assets/img/signal/gas2.png') : require('../assets/img/signal/gas1.png')">
                            </div>
                            <span :style="{ color: houseList.has_gas === 'y' ? '#9e8d71' : '#000' }">天然气</span>
                        </div>
                        <div class="tips-icon">
                            <div class="icon">
                                <img :src="houseList.has_heater === 'y' ? require('../assets/img/signal/heat2.png') : require('../assets/img/signal/heat1.png')"
                                    style="margin-top:10px">
                            </div>
                            <span :style="{ color: houseList.has_heater === 'y' ? '#9e8d71' : '#000' }">热水器</span>
                        </div>
                        <!-- <div class="tips-icon">
                            <div class="icon">
                                <img
                                    :src="houseList.has_elevator === 'y' ? require('../assets/img/signal/elv2.png') : require('../assets/img/signal/elv1.png')">
                            </div>
                            <span :style="{ color: houseList.has_elevator === 'y' ? '#9e8d71' : '#000' }">电梯</span>
                        </div> -->
                        <div class="tips-icon">
                            <div class="icon">
                                <img
                                    :src="houseList.near_metro === 'y' ? require('../assets/img/signal/metro2.png') : require('../assets/img/signal/metro1.png')">
                            </div>
                            <span :style="{ color: houseList.near_metro === 'y' ? '#9e8d71' : '#000' }">地铁</span>
                        </div>
                    </div>
                    <p>核心卖点：<span>{{ houseList.highlights }}</span></p>
                    <p>户型介绍：<span>{{ houseList.house_introduce }}</span></p>
                    <p>小区介绍：<span>{{ houseList.village_introduce }}</span></p>
                    <p>周边配套：<span>{{ houseList.peripheral_matching }}</span></p>
                </div>
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
            houseList: [],
            houseId: '',
            isActive: 1,
            picList: [require('../assets/img/detail_img/room0.jpg'), require('../assets/img/detail_img/room1.jpg'), require('../assets/img/detail_img/room2.jpg'), require('../assets/img/detail_img/room3.jpg'), require('../assets/img/detail_img/room4.jpg'), require('../assets/img/detail_img/room5.jpg'), require('../assets/img/detail_img/room6.jpg'), require('../assets/img/detail_img/room7.jpg')],
            cur_index: 0,
            position: 0,
            show_img: false,
            big_img: '',
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
        getData() {
            axios.get('https://yapi.pro/mock/220305/houses').then((result) => {
                this.houseList = result.data.data;
                console.log('id:', this.houseList[this.houseId - 1]);
                this.houseList = this.houseList[this.houseId - 1];
            });
        },
        handleCurrentChange(newPage) {
            this.pagination.page_num = newPage;
            // console.log('the next page is', this.pagination.page_num);
            // console.log('the new page is', newPage);
            this.getData();
            window.scrollTo(0, 0);
        },
        handleLeftClick() {
            if (this.cur_index > 0) {
                this.cur_index--;
            } else {
                this.cur_index = this.picList.length - 1;
            }
            const container = this.$refs.imgContainer;
            const imgWidth = 125;
            // const totalWidth = container.scrollWidth; // 总滚动宽度
            // const maxScrollPosition = totalWidth - container.clientWidth; // 最大滚动位置
            this.position -= imgWidth;
            // if(this.position ==0)

            // if (this.position < 0) {
            //     this.position = maxScrollPosition;
            // }
            container.scrollLeft = this.position;
        },
        handleRightClick() {
            if (this.cur_index < this.picList.length - 1) {
                this.cur_index++;
            } else {
                this.cur_index = 0;
            }
            const container = this.$refs.imgContainer;
            console.log(container.scrollLeft);
            const imgWidth = 125;
            this.position += imgWidth;
            if (this.position >= (this.picList.length * imgWidth)) {
                this.position = 0;
            }
            container.scrollLeft = this.position;
        },
        imgChange(index) {
            this.cur_index = index;
        },
        expandImg(selected) {
            this.big_img = selected;
            this.show_img = true;
        },
        closeImg() {
            this.show_img = false;
        }
    },
    mounted() {
        this.getData();
        this.houseId = cookies.get('houseId');
        console.log('id: ', this.houseId);
    },
}
</script>

<style>
.box {
    margin: 0 auto;
    width: 1500px;
}

.page-nav {
    margin: 15px 10%;
}

.detail {
    align-items: center;
    padding: 0 10%;
    margin-bottom: 5%;
}

h1 {
    margin: 30px 0;
    font-size: 30px;
    color: #333;
}

.main-info {
    display: flex;
    justify-content: space-between;
}

.show-pic {
    position: relative;
    width: 55%;
    height: 548px;
}

.big-img {
    height: 442px;
    position: relative;
    width: 100%;
}

.big-img img {
    width: 100%;
    height: 90%;
    object-fit: cover;
    left: 0;
    top: 0;
}

.modal {
    display: none;
    position: fixed;
    z-index: 1000;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgba(0, 0, 0, 0.9);
}

.modal-content {
    margin: 0 10% 0;
    padding: 20px;
    width: 80%;
}

.modal-image {
    width: 100%;
    /* 或者 'auto' 如果您希望保持图片的原始比例 */
    height: auto;
    /* 保持图片比例 */
}

.close {
    color: #9e8d71;
    float: right;
    font-size: 28px;
    font-weight: bold;
}

.close:hover,
.close:focus {
    color: #fff;
    text-decoration: none;
    cursor: pointer;
}

.modal {
    /* 当 showModal 为 true 时显示 */
    display: block;
    margin-bottom: -17px;
    padding-bottom: 17px;
    margin-right: -17px;
    padding-right: 17px;
}

.signal {
    font-size: 30px;
    display: flex;
    justify-content: space-between;
    background-color: rgba(255, 255, 255, 0.5);
    align-items: center;
    margin-top: -5%;
}

signal img {
    cursor: pointer;
    transition: transform 0.3s ease;
}

.signal img:hover {
    transform: scale(1.1);
}

.signal img:active {
    transform: scale(0.9);
}

.arrow {
    cursor: pointer;
    margin-bottom: 17px;
    user-select: none;
    /* color: #9e8d71; */
}

.left-arrow,
.right-arrow {
    font-size: 24px;
    width: 30px;
    text-align: center;
}

.img-content {
    flex: 0 0 auto;
    width: 120px;
    height: 90px;
    margin-right: 5px;
}

.img-show {
    width: auto;
    height: calc(90px + 17px);
    display: flex;
    flex-wrap: nowrap;
    overflow-x: scroll;
    overflow-y: hidden;
    scroll-behavior: smooth;
    align-items: flex-start;
    margin-bottom: -17px;
    padding-bottom: 17px;
    position: relative;
}

.img-container {
    margin: 0 5px;
    width: 510px;
    overflow: hidden;
    display: flex;
    position: relative;
}

.img-active {
    border: black 3px solid;

}


.right-info {
    position: relative;
    width: 478px;
    height: 548px;
}

.right-top-info {
    padding: 20px 0 35px;
    border-bottom: 1px solid #ccc;
}

.right-top-info h3 {
    margin-top: -35px;
    float: left;
    color: #9e8d71;
    font-size: 28px;
}

.right-top-info h3 span {
    font-size: 40px;
}

.right-second-info {
    width: 100%;
    padding: 25px 0;
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #ccc;
}

.second-item span {
    color: #000;
    font-size: 20px;
}

.second-item p {
    font-size: 16px;
    color: #999;
    text-align: center;
}

.right-third-info {
    padding: 10px 0 20px;
    border-bottom: 1px solid #ccc;
    font-size: 14px;
}

.right-third-info .third-left {
    margin-right: 150px;
}

.right-third-info p {
    margin-bottom: 10px;
    color: #999;
    font-size: 14px;
}

.right-third-info span {
    font-size: 14px;
    color: #333;
}

.right-last-info {
    padding-top: 30px;
}

.right-fourth-button {
    display: flex;
    justify-content: space-around;
    width: 100%;
    height: 28%;
    border-bottom: 1px solid #ccc;
    align-items: center;
}

.follow {
    width: 30%;
    height: 40%;
    border: #9e8d71 1px solid;
    border-radius: 20px;
    text-align: center;
    font-size: 25px;
    color: #9e8d71;
    line-height: 60px;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
}

.follow p {
    line-height: -10px;
}

.follow:hover {
    background: #9e8d71;
    color: #fff;
}

.follow:active {
    width: 27%;
    height: 37%;
    ;
}

.detail-info {
    width: 70%;
    display: flex;
    justify-content: space-between;
}

.detail-right {
    float: right;
}

.detail-info p {
    margin-bottom: 15px;
    font-size: 14px;
    color: #999;
}

.detail-info span {
    color: #333;
}

.special p {
    margin-bottom: 20px;
    font-size: 14px;
    color: #999;
}

.special span {
    color: #333;
}

.special .label {
    display: inline-block;
    padding: 4px;
    margin-right: 10px;
    color: #fff;
    border-radius: 4px;
    background: #5f1985;
}

.tips {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
    width: 95%;
}

.tips-icon {
    display: flex;
    flex-direction: column;
    text-align: center;
}

.icon {
    height: 72px;
    margin-bottom: 3px;
}

.tips-icon span {
    font-size: 16px;
}
</style>