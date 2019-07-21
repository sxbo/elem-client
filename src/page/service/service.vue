<template>
    <div>
            <router-view>aaabb</router-view>
            <div>
                <span>hello</span>
                <img src="abv" alt="2367ds">
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
        }
    }
    
}
</script>

<style lang="sass" scoped>

</style>

