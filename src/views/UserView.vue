<template>
    <div class="container">
        <main-bar></main-bar>
        <div class="box">
            <div class="sidebar">
                
            </div>
            <div class="content">

            </div>
        </div>
        <footer-bar></footer-bar>
    </div>
</template>

<script>
import FooterBar from '../components/FooterBar.vue'
import MainBar from "../components/MainBar.vue"

export default {
    components: { MainBar, FooterBar },
}
</script>

<style scoped>
.box {
    margin: 0 auto;
    /* width: 1500px; */
}
</style>

