<template>
    <div class="loginContainer">
        <head-Top :head-title="loginWay?'登录':'密码登录'" goBack="true">

        </head-Top>
    </div>
</template>

<script>
import headTop from "../../components/header/head"
export default {
    data() {
        return {
            loginWay: false //登录方式，默认短信登录
        }
    },
    components: {
        headTop,
    },

    props: {}
}
</script>

<style lang="scss" scoped>
    @import '../../style/mixin';

    .loginContainer{
        padding-top: 1.95rem;
        p, span, input{
            font-family: Helvetica Neue,Tahoma,Arial;
        }
    }
</style>

