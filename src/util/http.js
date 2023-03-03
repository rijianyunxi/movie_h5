import axios from "axios";
import {Toast} from "vant"

axios.defaults.baseURL='http://172.18.21.59:8520/serve';
axios.defaults.timeout=10000;
axios.defaults.headers['Content-Type']='application/x-www-form-urlencoded'

axios.interceptors.request.use(config=>{
    // let token=localStorage.getItem('token')
    // token && (config.headers.Authoriztion=token)
    Toast.loading({
        duration: 0,
        forbidClick: true,
        loadingType: 'spinner',
        message: '加载中...',
    });
    return config
},error=>{
    return Promise.reject(error)
})

axios.interceptors.response.use(response=>{
    Toast.clear();
    if(response.data.result){
        return response.data
    }else{
        Toast.fail(response.data.message || '');
    }
},error=>{
    Toast.clear();
    let { response }=error
    if(response){
        switch(response.status){
            case 404:
                Toast.fail('资源不存在！');
                break;
            default :
                Toast.fail('请联系管理员！');
        }
    }else{
        if(!window.navigator.onLine){
            Toast.fail('请检查您的网络！');
            return;
        }else{
            Toast.fail("ERR_NETWORK");
        }
        return Promise.reject(error)
    }
})

export default axios;