export default {
  // 存储搜索地址的历史记录
  historys: [],
  // 存储搜索商家的历史记录
  new_history: [],
  // 是否已经登录
  login: false,
  // 用户id
  user_id: "",
  // 所有登录信息
  user_data: "",
  
  food_list: [],

  city_id: "",

  city_address: "",
  // 存储经纬度
  geohash: "",
  address_msg: [],

  user_msg: {
    usr_name: [],
    count: 0
  }
}
