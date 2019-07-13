<template>
    <div class="rating_page">
        <head-top head-title="账户信息" go_back="true"></head-top>
        <section class="profile-info">
            <section class="headportrait">
                <input type="file" class="profileinfopanel-upload" @change="uploadAvatar">
                <h2>头像</h2>
                <div class="headportrait-div">
                    <img v-if="userInfo" :src="imgBaseUrl + userInfo.avatar" class="headportrait-div-top">
                    <span class="headportrait-div-top" v-else>
                        <svg>
                            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#avatar-default"></use>
                        </svg>
                    </span>
                    <span class="headportrait-div-bottom">
                        <svg fill="#d8d8d8">
                            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
                        </svg>
                    </span>
                </div>
            </section>
        </section>
    </div>
</template>

<script>
import headTop from 'src/components/header/head';
import {mapMutations, mapState} from 'vuex';
import {imgBaseUrl} from 'src/config/env';

export default {
    data() {
        return {
            username: '',      //用户名
            resetname: '',     //重置的用户名
            infotel: '',       //用户手机
            avatar: '',        //用户头像
            show: false,       //显示提示框
            isEnter: true,     //是否登录
            isLeave: false,    //是否退出
            showAlert: false,  //是否显示提示框
            alertText: null,   //提示框内容
            imgBaseUrl,        //图片加载地址
        }
    },

    components: {
        headTop,
    },

    methods: {
        //头像上传
        async uploadAvatar() {

        }
    },

    computed: {
        ...mapState([
            'userInfo'
        ])
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
        bottom: 0;
        background-color: #f2f2f2;
        z-index: 202;
        padding-top: 1.95rem;
        p, span{
            font-family: Helvetica Neue,Tahoma,Arial;
        }
    }

    .profile-info{
        @include wh(100%, 3.1rem);
        background: #c5abab;
        .profileinfopanel-upload{
            display: block;
            position: absolute;
            opacity: 0;
            top: 2.35rem;
            left: 0;
            @include wh(100%,3.1rem);
        }
        .headportrait{
            margin-top: .4rem;
            padding: .5rem .4rem;
            @include fj(space-between);
            align-items: center;
            border-top: 1px solid #ddd;
            background:#fff;
            h2{
                @include sc(.6rem,#333);
                font-weight:500;
                display:flex;
                align-items:center;
            }
            .headportrait-div{
                span{
                    display:inline-block;
                    svg{
                        @include wh(100%,100%);
                        @include borderRadius(50%);
                    }
                }
                .headportrait-div-top{
                    @include wh(2rem,2rem);
                    @include borderRadius(50%);
                    vertical-align:middle;
                }
                .headportrait-div-bottom{
                    @include wh(.66667rem,1.4rem);
                    top:0.44rem;
                    position:relative;
                }
            }
        }
    }
</style>

