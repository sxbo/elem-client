<template>
    <div class="loginContainer">
        <head-Top :head-title="loginWay?'登录':'密码登录'" goBack="true">
            <div slot="changeLogin" class="change_login" @click="changeLoginWay">{{loginWay? "短信登录":"账号登录"}}</div>
        </head-Top>
        <form class="loginForm" v-if="loginWay">
            <section class="input_container phone_number">
                <input type="text" placeholder="手机号码" name="phone" maxlength="11" v-model="phoneNumber">
                <button v-on:click.prevent="getVerifyCode" :class="{right_phone_number:rightPhoneNumber}" v-show="!computedTime">获取验证码</button>
                <button @click.prevent v-show="computedTime">已发送({{computedTime}}s)</button>
            </section>
            <section class="input_container">
                <input type="text" placeholder="验证码" name="mobileCode" maxlength="6" v-model="mobileCode">
            </section>
        </form>
        <form class="loginForm" v-else>
            <section class="input_container">
                <input type="text" placeholder="账号密码随便输入！" >
            </section>
            <section class="input_container">
                <input v-if="!showPassword" type="password" placeholder="密码" v-model="passWord">
                <input v-else placeholder="密码" v-model="passWord">
                <div class="button_switch" v-bind:class="{change_to_text: showPassword}">
                    <div class="circle_button" :class="{trans_to_right: showPassword}"  @click="changePassWordType"></div>
                    <span v-if="showPassword" class="start_up">开启</span>
                    <span v-else class="shut_down">关闭</span>
                </div>
            </section>
            <section class="input_container captcha_code_container">
                <input type="text" placeholder="验证码" maxlength="4">
                <div class="img_change_img">
                    <img v-bind:src="captchaCodeImg" v-show="captchaCodeImg" alt="图">
                    <div class="change_img" @click="getCaptchaCode">
                        <p>看不清</p>
                        <p>换一张</p>
                    </div>
                </div>
            </section>
        </form>
        <p class="login_tips">
            温馨提示：未注册过的账号，登录时将自动注册
        </p>
        <p class="login_tips">
            注册过的账号可凭账号密码登录
        </p>
        <div class="login_container" v-on:click="login">登录</div>
        <router-link to="/forget" class="to_forget" v-if="!loginWay">重置密码？</router-link>
        <alert-tip v-if="showAlert" @closeTip="closeTip" :alertText="alertText"></alert-tip>
    </div>
</template>

<script>
import headTop from "../../components/header/head";
import alertTip from "../../components/common/alertTip"
import {getcaptchas, checkExsis, mobileCode} from '../../service/getData';
export default {
    data() {
        return {
            loginWay: false, //登录方式，默认短信登录
            showPassword: false, //是否显示密码
            passWord: null, //密码
            captchaCodeImg: null, //验证码地址
            phoneNumber: null, //电话号码
            computedTime: 0, //倒数计时
            mobileCode: null, //验证码
            showAlert: false, //是否显示提示框
            alertText: "", //提示的内容
            validate_token: null, //获取短信时返回的验证值，登录时需要
        }
    },
    created() {
        this.getCaptchaCode();
    },
    components: {
        headTop,
        alertTip,
    },

    props: {},
    methods: {
        changePassWordType() {
            this.showPassword = !this.showPassword;
        },

        async getCaptchaCode() {
            let res = await getcaptchas();
            this.captchaCodeImg = res.code; 
        },

        changeLoginWay() {
            this.loginWay = !this.loginWay;  
        },
        //发送登录信息
        login() {

        },
        //获取验证码j
        async getVerifyCode() {
            if (this.rightPhoneNumber) {
                this.computedTime = 30;
                this.timer = setInterval(() => {
                    this.computedTime --;
                    if(this.computedTime == 0){
                        clearInterval(this.timer);
                    }
                }, 1000)
            }

            //判断用户是否存在
            let exsis = await checkExsis(this.phoneNumber, 'mobile');
            if (exsis.message) {
                this.showAlert = true;
                this.alertText = exsis.message;
                return;
            } else if (!exsis.is_exists) {
                this.showAlert = true;
                this.alertText = "您输入的手机号尚未绑定";
                return;
            }

            //发送短信验证码
            let res = await mobileCode(this.phoneNumber);
            if (res.message) {
                this.showAlert = true;
                this.alertText = res.message;
                return;
            }

            this.validate_token = res.validate_token;
        },

        //关闭提示窗口
        closeTip() {
            this.showAlert = false;
        }
    },
    computed: {
        //判断手机号码是否合法
        rightPhoneNumber: function() {
            return /^1\d{10}$/gi.test(this.phoneNumber);
        }
    }
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

    .change_login{
        position: absolute;
        @include ct;
        right: 0.75rem;
        @include sc(.7rem, #fff);
    }

    .loginForm{
        background-color: #fff;
        margin-top: .6rem;
        .input_container{
            display: flex;
            justify-content: space-between;
            padding: .6rem .8rem;
            border-bottom: 1px solid #f1f1f1;
            input{
                @include sc(.7rem, #666);
            }
            button{
                @include sc(.65rem, #fff);
                font-family: Helvetica Neue,Tahoma,Arial;
                padding: .28rem .4rem;
                border: 1px;
                border-radius: 0.15rem;
            }
            .right_phone_number{
                background-color: #4cd964;
            }
        }
        .phone_number{
            padding: .3rem .8rem;
        }
        .captcha_code_container{
            height: 2.2rem;
            .img_change_img{
                display: flex;
                align-items: center;
                img{
                    @include wh(3.5rem, 1.5rem);
                    margin-right: .2rem;
                }
                .change_img{
                    display: flex;
                    flex-direction: column;
                    flex-wrap: wrap;
                    width: 2rem;
                    justify-content: center;
                    p{
                        @include sc(.55rem, #666);
                    }
                    p:nth-of-type(2){
                        color: #3b95e9;
                        margin-top: .2rem;
                    }
                }
            }
        }
    }
    .login_tips{
        @include sc(.5rem, red);
        padding: .4rem .6rem;
        line-height: .5rem;
        a{
            color: #3b95e9;
        }
    }
    .login_container{
        margin: 0 .5rem 1rem;
        @include sc(.7rem, #fff);
        background-color: #4cd964;
        padding: .5rem 0;
        border: 1px;
        border-radius: 0.15rem;
        text-align: center;
    }
    .button_switch{
        background-color: #ccc;
        display: flex;
        justify-content: center;
        @include wh(2rem, .7rem);
        padding: 0 .2rem;
        border: 1px;
        border-radius: .5rem;
        position: relative;
        .circle_button{
            transition: all .3s;
            position: absolute;
            top: -0.2rem;
            z-index: 1;
            left: -0.3rem;
            @include wh(1.2rem, 1.2rem);
            box-shadow: 0 0.026667rem 0.053333rem 0 rgba(0,0,0,.1);
            background-color: #f1f1f1;
            border-radius: 50%;
        }
        .trans_to_right{
            transform: translateX(1.3rem);
        }
        span{
            @include sc(.45rem, #fff);
            transform: translateY(.05rem);
            line-height: .6rem;
        }
        .start_up{
            transform: translateX(-0.45rem);
        }
        .shut_down{
            transform: translateX(0.45rem);
        }
    }
    .change_to_text{
        background-color: #4cd964;
    }
    .to_forget{
        float: right;
        @include sc(.6rem, #3b95e9);
        margin-right: .3rem;
    }
</style>


