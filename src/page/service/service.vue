<template>
    <div>
            <router-view>aaabb</router-view>
            <div>
                <span>hello</span>
                <img src="abv" alt="2367ds">
            </div>
        服务中心页
        <div>
            <div>
                123
            </div>
            <div>
                456
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            a: 'a',
            b: 'b',
            c: 'c',
            d: false,
            d: 0
        }
    },
    methods: {
        mapData() {
            return 'data';
        },

        counter() {
            let a = 1 + 2;
        },

        watchCount() {
            //隐藏历史记录
            this.showHistory = false;
            //获取搜索结果
            this.restaurantList = await searchRestaurant(this.geohash, this.searchValue);
            this.emptyResult = !this.restaurantList.length;
             /**
             * 点击搜索结果进入下一页面时进行判断是否已经有一样的历史记录
             * 如
             */
        }
    }
    
}
</script>

<style lang="sass" scoped>

</style>

