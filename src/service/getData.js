import fetch from '../config/fetch';

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
