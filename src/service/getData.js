import fetch from '../config/fetch';
import {getStore} from '../config/mUtils';

/**
 * 获取默认城市
 */
export const cityGuess = () => fetch('/v1/cities', {type: 'guess'});

/**
 * 获取热门城市列表
 */
export const hotcity = () => fetch('/v1/cities',{type: 'hot'});

/**
 * 获取所有城市
 */
export const groupcity = () => fetch('/v1/cities', {type: 'group'});

/**
 * 获取用户信息
 */
export const getUser = () => fetch('/v1/user', {user_id: getStore("user_id")});

/**
 * 获取验证码图片
 */
export const getcaptchas = () => fetch('v1/captchas', {}, "POST");