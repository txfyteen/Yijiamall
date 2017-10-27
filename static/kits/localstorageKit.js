

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
export function removeItem(goodsid){
    var goods =  getItem();

    delete goods[goodsid];

    localStorage.setItem(key,JSON.stringify(goods));
}

function getItems(){
    var arrString =  localStorage.getItem('count');
    var arr = JSON.parse(arrString);
    return !arr?[]:arr;
}

// obj:{gid}
export function setItemCount(gid){
   
    var arr = getItems();
    if(arr.indexOf(gid)==-1){
        arr.push(gid);
    }

    localStorage.setItem('count',JSON.stringify(arr));
}

export function getItemCount(){
  var arrString =  localStorage.getItem('count');
  if(!arrString){
    return 0;
  }

  return JSON.parse(arrString).length;
}