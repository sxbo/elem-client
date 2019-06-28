<template>
    <div class="shoplist_container">
        <ul v-load-more="loaderMore" v-if="shopListArr.length" type="1">
            <router-link v-for="item in shopListArr" :to="{path: 'shop', query: {geohash, id: item.id}}" tag="li" :key="item.id" class="shop_li">
                <section>
                    <img :src="imgBaseUrl + item.image_path" class="shop_img">
                </section>
                <hgroup class="shop_right">
                    <header class="shop_detail_header">
                        <h4 :class="item.is_premium? 'premium' : ''" class="shop_title ellipsis">{{item.name}}</h4>
                        <ul class="shop_detail_ul">
                            <li v-for="item in item.supports" :key="item.id" class="supports">{{item.icon_name}}</li>
                        </ul>
                    </header>
                    <h5 class="roating_order_num">
                        <section class="rating_order_num_left">
                            <section class="roating_section">
                                <roating-star :rating="item.rating"></roating-star>
                                <span class="rating_num">{{item.rating}}</span>
                            </section>
                            <section class="order_section">
                                月售{{item.recent_order_num}}单
                            </section>
                        </section>
                        <section class="rating_order_num_right">
                            <span class="delivery_style delivery_left" v-if="item.delivery_mode">{{item.delivery_mode.text}}</span>
                            <span class="delivery_style delivery_right" v-if="onTime(item.supports)">准时达</span>
                        </section>
                    </h5>
                    <h5 class="fee_distance">
                        <p class="fee">
                            ¥{{item.float_minimum_order_amount}}起送
                            <span class="segmentation">/</span>
                            {{item.piecewise_agent_fee.tips}}
                        </p>
                        <p class="distance_time">
                            <span v-if="Number(item.distance)">
                                {{item.distance > 1000? (item.distance/1000).toFixed(2) + 'km': item.distance + 'm'}}
                                <span class="segmentation"></span>
                            </span>
                            <span v-else>{{item.distance}}</span>
                            <span class="segmentation"></span>
                            <span class="order_time">{{item.order_lead_time}}</span>
                        </p>
                    </h5>
                </hgroup>
            </router-link>
        </ul>
        <ul v-else class="animation_opactiy">
            <li class="list_back_li" v-for="item in 10" :key="item">
                <img src="../../images/shopback.svg" class="list_back_svg">
            </li>
        </ul>
        <p v-if="touchend" class="empty_data">没有更多了</p>
        <aside class="return_top" @click="backTop" v-if="showBackStatus">
			<svg class="back_top_svg">
				<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#backtop"></use>
			</svg>
		</aside>
        <div ref="abc" style="background-color: red;"></div>
		<transition name="loading">
			<loading v-show="showLoading"></loading>
		</transition>
    </div>    
</template>

<script>
import {imgBaseUrl} from 'src/config/env';
import ratingStar from './ratingStar';
import loading from './loading'

export default {

    data() {
        return {
           shopListArr: [], // 店铺列表数据
           preventRepeatReuqest: false, //到达底部加载数据，防止重复加载
           showBackStatus: false,  //  显示返回顶部按钮
           imgBaseUrl,         //图片加载url
           showLoading: true,   //显示加载动画
           touchend: false,    //没有更多数据
           offset: 0,    //起始标志位  ，批次加载店铺列表，每次加载20个 limit = 20
        }
    },

    methods:{

        //到达底部加载更多 数据
        async loaderMore(){
                
        },
        //准时
        onTime(supports) {

        },

        //返回顶部
        backTop() {

        }
    }
    
}
</script>

<style lang="scss" scoped>

</style>
