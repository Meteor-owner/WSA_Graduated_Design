<template>
  <div>
    <div class="big-img">
      <my-header></my-header>
      <img class="img" src="../assets/img/home.jpg" alt="">
      <div class="up-search">
        <div class="search">
          <div class="search-content">
            <input type="text" class="fll" :placeholder="placeholderText" v-model="keywords">
            <span class="search-button" @click="searchHouse">
              搜索
            </span>
          </div>
        </div>
      </div>
    </div>
    <div class="pic-nav">
      <div class="four-nav">
        <div class="four-item">
          <router-link to='/houseList' style="text-decoration: none; color: black;">
            <img src="../assets/img/store.png" alt="">
            <h3>查看房源</h3>
            <p>来看看好房子吧</p>
          </router-link>
        </div>
        <div class="four-item">
          <img src="../assets/img/entrust.png" alt="">
          <h3>上传房源</h3>
          <p>把房子租出去吧</p>
        </div>
      </div>
    </div>
    <div class="recommend">
      <p class="title">新房推荐</p>
      <div class="house-list">
        <div class="house-list-item" v-for="item in rentHouse" :key="item.id">
          <div v-if="item.id < 7" class="house-img">
            <router-link :to="'/detail?id=' + item.id">
              <img src="../assets/img/room.jpg" alt="">
            </router-link>
          </div>
          <div v-if="item.id < 7" class="price-img">
            <img src="../assets/img/hot.png" alt="">
          </div>
          <div class="house-introduction">
            <router-link :to="'/detail?id=' + item.id" style="text-decoration: none;">
              <h3 v-if="item.id < 7" class="house-title">{{ item.location }}</h3>
            </router-link>
            <p v-if="item.id < 7" class="house-info">{{ item.bedroom }}室 {{ item.livingroom }}厅 {{ item.wc }}卫
              {{ item.area }}㎡</p>
          </div>
        </div>
      </div>
    </div>

    <my-footer></my-footer>
  </div>
</template>

<script>
import MyHeader from '../components/HeaderBar.vue'
import MyFooter from '../components/FooterBar.vue'
import axios from 'axios'

export default {
  data() {
    return {
      index: 0,
      placeholderText: "查找房源",
      rentHouse: [],
      load: null,
      keywords: "",
    }
  },
  components: {
    MyHeader,
    MyFooter,
  },
  methods: {
    searchHouse() {
      this.$router.push({ path: "/used_house_list", query: { q: this.keywords } });
    },
  },
  mounted() {
    axios.get("https://yapi.pro/mock/220305/index").then((result) => {
      this.rentHouse = result.data.data;
    });
  }
}
</script>

<style scoped>
.big-img {
  position: relative;
  background: #000;
  /* margin-top: 50px; */
}

.big-img img {
  display: block;
  width: 100%;
  height: 700px;
  object-fit: cover;
  box-sizing: border-box;
}

.up-search {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 10px;
}

.search {
  width: 100%;
  opacity: 1;
  align-items: center;
  height: 70px;
  margin-top: -175px;
}

.search-content input {
  padding: 0 15px;
  background: #fff;
  width: 65%;
  height: 60px;
  font-size: 18px;
  color: #666;
  border-radius: 5px;
  margin-bottom: 90px;
  margin-left: 15%;
}

.search-button {
  display: inline-block;
  color: #fff;
  background: #c30d23;
  font-size: 18px;
  height: 60px;
  width: 80px;
  text-align: center;
  line-height: 57px;
  border-radius: 5px;
  cursor: pointer;
  margin-left: 5px;
  font-weight: 600;
  position: absolute;
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
.pic-nav {
  margin: 25px auto;
  width: 1100px;
  display: flex;
  justify-content: space-around;
}

.four-nav {
  margin-bottom: 40px;
  display: flex;
  justify-content: space-around;
}

.four-item {
  margin: 0 40px;
  width: 195px;
  height: 162px;
  text-align: center;
  cursor: pointer;
}

.four-item h3 {
  margin: 20px 0 10px;
  font-size: 18px;
  color: #333;
}

.four-item p {
  font-size: 13px;
}

.recommend {
  text-align: center;
  margin-top: -40px;
}

.recommend .title {
  font-size: 30px;
  font-weight: 800;
}

.house-list {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}

.house-list-item {
  position: relative;
  width: 400px
}

.house-img {
  position: relative;
  width: 342px;
  height: 233px;
  cursor: pointer;
  perspective: 1000px;
  overflow: hidden;
}

.house-img img{
  width: 342px;
  height: 233px;
}
.price-img {
  position: absolute;
  top: 10px;
  left: 0;
}

.price-img span {
  position: absolute;
  left: 10px;
  top: 50%;
  transform: translateY(-50%);
  color: #fff;
}

.house-title {
  margin: 5px 0;
  font-size: 16px;
  color: #333;
}

.house-info {
  font-size: 14px;
}

.house-introduction {
  width: 342px;
  text-align: center;
}
</style>