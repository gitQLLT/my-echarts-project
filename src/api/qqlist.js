import axios from 'axios'

// 获取CSDN排行榜
export function getCSDNRank() {
  const url = '/phoenix/web/v2/rank'
  const data = {
    page: 1,
    pageSize: 10,
    rankType: 'total_author'
  }
  //使用ajax请求，这里用axios
  return axios.get(url, {
    params: data
  }).then((res) => {
    //  成功返回一个Promise对象
    return Promise.resolve(res.data)
  }).catch((error) => {
    console.log(error)
  })
}

// 歌手详情
export function getSingerInfo(){
  const url = '/cgi-bin/musics.fcg'
  const data = {
    _: '1657591722465',
    sign: 'zzb0abd3fc6fxusjun2gn6q6hcjnrzq3d2d961c',
    data: {"comm":{"cv":4747474,"ct":24,"format":"json","inCharset":"utf-8","outCharset":"utf-8","notice":0,"platform":"yqq.json","needNewCode":1,"uin":0,"g_tk_new_20200303":904366303,"g_tk":904366303},"req_1":{"module":"Concern.ConcernSystemServer","method":"cgi_qry_concern_status","param":{"vec_userinfo":[{"usertype":1,"userid":""}],"opertype":5,"encrypt_singerid":1}},"req_2":{"module":"yqq.WhiteListServer","method":"Pass","param":{}},"req_3":{"method":"GetSingerDetail","param":{"singer_mids":["0025NhlN2yWrP4"],"ex_singer":1,"wiki_singer":1,"group_singer":0,"pic":1,"photos":0},"module":"music.musichallSinger.SingerInfoInter"},"req_4":{"method":"GetAlbumList","param":{"singerMid":"0025NhlN2yWrP4","order":0,"begin":0,"num":5,"songNumTag":0,"singerID":0},"module":"music.musichallAlbum.AlbumListServer"},"req_5":{"method":"GetSingerMvList","param":{"singermid":"0025NhlN2yWrP4","count":20,"start":0,"order":1},"module":"MvService.MvInfoProServer"},"req_6":{"method":"GetSingerSongList","param":{"singerMid":"0025NhlN2yWrP4","order":1,"begin":0,"num":10},"module":"musichall.song_list_server"},"req_7":{"method":"cgi_qry_concern_num","module":"Concern.ConcernSystemServer","param":{"vec_userinfo":[{"userid":"0025NhlN2yWrP4","usertype":1}]}},"req_8":{"method":"GetSimilarSingerList","param":{"singerMid":"0025NhlN2yWrP4","num":5},"module":"music.SimilarSingerSvr"}}
  }
  //使用ajax请求，这里用axios
  return axios.get(url, {
    params: data
  }).then((res) => {
    //  成功返回一个Promise对象
    return Promise.resolve(res.data)
  }).catch((error) => {
    console.log(error)
  })
}

// 获取排行榜
export function getRankList(){
  const url = '/cgi-bin/musics.fcg'
  const data = {
    _: '1657528766081',
    sign: 'zzb646728e17csonx5iwm8dhgmldgneadaadbc78',
    data: {"comm":{"cv":4747474,"ct":24,"format":"json","inCharset":"utf-8","outCharset":"utf-8","notice":0,"platform":"yqq.json","needNewCode":1,"uin":1294483828,"g_tk_new_20200303":904366303,"g_tk":904366303},"req_1":{"module":"MessageCenter.MessageCenterServer","method":"GetMessage","param":{"uin":"1294483828","red_dot":[{"msg_type":1}]}},"req_2":{"module":"GlobalComment.GlobalCommentMessageReadServer","method":"GetMessage","param":{"uin":"1294483828","page_num":0,"page_size":1,"last_msg_id":"","type":0}},"req_3":{"module":"musicToplist.ToplistInfoServer","method":"GetAll","param":{}}}
  }
  //使用ajax请求，这里用axios
  return axios.get(url, {
    params: data
  }).then((res) => {
    //  成功返回一个Promise对象
    return Promise.resolve(res.data)
  }).catch((error) => {
    console.log(error)
  })
}

// 获取hotsong榜
export function getHotRankList(){
  const url = '/cgi-bin/musics.fcg'
  const data = {
    _: '1657617606497',
    sign: 'zzbd04ee490o6hzu2cabyzxrnqvkawdq8958f710',
    data: {"comm":{"cv":4747474,"ct":24,"format":"json","inCharset":"utf-8","outCharset":"utf-8","notice":0,"platform":"yqq.json","needNewCode":1,"uin":0,"g_tk_new_20200303":5381,"g_tk":5381},"req_1":{"module":"musicToplist.ToplistInfoServer","method":"GetDetail","param":{"topid":26,"offset":0,"num":20,"period":"2022-07-09"}}}
  }
  //使用ajax请求，这里用axios
  return axios.get(url, {
    params: data
  }).then((res) => {
    //  成功返回一个Promise对象
    return Promise.resolve(res.data)
  }).catch((error) => {
    console.log(error)
  })
}

// 获取npm下载量
export function getNpmDownList(data) {
  const url = '/downloads/point/'+data.date+'/'+data.pack
  //使用ajax请求，这里用axios
  return axios.get(url).then((res) => {
    //  成功返回一个Promise对象
    return Promise.resolve(res.data)
  }).catch((error) => {
    console.log(error)
  })
}

// 获取npm下载集合
export function getNpmRangeList(data) {
  const url = '/downloads/range/'+data.date+'/'+data.pack
  //使用ajax请求，这里用axios
  return axios.get(url).then((res) => {
    //  成功返回一个Promise对象
    return Promise.resolve(res.data)
  }).catch((error) => {
    console.log(error)
  })
}

// 获取npm包版本下载量
export function getNpmVersions(data) {
  const url = '/versions/'+data.pack+'/last-week'
  //使用ajax请求，这里用axios
  return axios.get(url).then((res) => {
    //  成功返回一个Promise对象
    return Promise.resolve(res.data)
  }).catch((error) => {
    console.log(error)
  })
}