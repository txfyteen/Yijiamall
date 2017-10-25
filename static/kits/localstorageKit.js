

const key =  "buyGoodsCount"

/**
 * @export
 * @param {any} goodsinfo = {'gid':'88','bcount':'1'}
 */


 //设置方法
export function setItem (goodsinfo){
    //1 判断localstorage中是否有这个商品的记录
    var goodsObj = getItem();
    if(goodsObj[goodsinfo.gid]){
        //如果有
        goodsObj[goodsinfo.gid] = goodsObj[goodsinfo.gid]+goodsinfo.bcount;
    }else{
        goodsObj[goodsinfo.gid] = goodsinfo.bcount;
    }
    //存储到localStorage
    localStorage.setItem(key,JSON.stringify(goodsObj));
} 


//获取方法
export function getItem(){
    var gStr = localStorage.getItem(key);
    var obj = JSON.parse(gStr);
    //如果obj为null,返回一个空对象
    if(!obj){
        return {}
    }
    return obj;
}

//{goodsid:buycount}

//删除方法
export function removeItem(){


}