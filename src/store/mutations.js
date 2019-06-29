import {
	GET_USERINFO,
	RECORD_USERINFO,
	RECORD_ADDRESS,
	SAVE_GEOHASH
} from './mutation-types'
import { setStore } from '../config/mUtils';

export default {
    //获取用户信息存入vuex
    [GET_USERINFO](state, info) {
        if (state.userInfo && (state.userInfo.username !== info.username)) {
			return;
		};
		if (!state.login) {
			return
		}
		if (!info.message) {
			state.userInfo = {...info};
		} else {
			state.userInfo = null;
		}
	},
	
	//记录登录状态和用户信息到 vuex
	[RECORD_USERINFO](state, info) {
		state.userInfo = info;
		state.login = true;
		setStore('user_id', info.user_id);
	},

	//记录当前经纬度 到vuex
	[RECORD_ADDRESS](state, {latitude, longitude}) {
		state.latitude = latitude;
		state.longitude = longitude;
	},

	//保存geohash 到 vuex
	[SAVE_GEOHASH](state, geohash) {
		state.geohash = geohash;
	}



    
}