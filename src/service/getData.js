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

/**
 * 检测账号是否存在
 * @param {*} checkNumber 账号
 * @param {*} type 账号类型 enum{‘mobile’，‘email’}
 */
export const checkExsis = (checkNumber, type) => fetch('/v1/users/exists', {[type]: checkNumber,type} );

/**
 * 获取短信验证码
 * @param {*} phone 
 */
export const mobileCode = phone => fetch('/v4/mobile/verify_code/send', {
    mobile: phone,
    scene: 'login',
    type: 'sms'
}, "POST");

/**
 * 手机登录
 * @param {*} code 
 * @param {*} mobile 
 * @param {*} validate_token 
 */
export const mLogin = (code, mobile, validate_token) => fetch('/v1/login/app_mobile',{
    code,
    mobile,
    validate_token
}, 'POST');

/**
 * 账号密码登录
 * @param {*} username 
 * @param {*} password 
 * @param {*} captcha_code 
 */
export const accountLogin = (username, password, captcha_code) => fetch('/v2/login', {username, password, captcha_code}, "POST");

/**
 * 获取当前城市
 * @param {*} number 城市编号 
 */
export const currentcity = number => fetch('/v1/cities/' + number);

/**
 * 获取搜索地址结果
 * @param {*} cityid 
 * @param {*} value 
 */
export const searchPlace = (cityid, value) => fetch('/v1/pois', {
    type: 'search',
    city_id: cityid,
    keyword: value
});