<template>
    <div class="rating_page">
        <head-top head-title="账户信息" go_back="true"></head-top>

    </div>
</template>

<script>
import headTop from 'src/components/header/head';
export default {
    data() {
        return {
            username: '',  //用户名
        }
    },

    components: {
        headTop,
    }
}
</script>

<style lang="scss" scoped>
    @import 'src/style/mixin.scss';
    .rating_page{
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: -7.65rem;
        background-color: #f2f2f2;
        z-index: 202;
    }
</style>

