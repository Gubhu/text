//封装一个$函数
function $(obj,content){
		var firstChar=obj.charAt(0);
		var content=content||document;
		if(firstChar=="#"){
			return content.getElementById(obj.substring(1));
		}else if(firstChar=="."){
			var arr=[];
			var aEls=content.getElementsByTagName("*");
				for(var i=0;i<aEls.length;i++){
						var aClassName=	aEls[i].className.split(" ");
							 for(var j=0;j<aClassName.length;j++){
								if(aClassName[j]==obj.slice(1)){
									arr.push(aEls[i]);
									break;
								}
								
							 }
						}
			return arr;
		}else{
			return document.getElementsByTagName(obj);
		}
	
	}



        //获取的是第一个元素节点的函数
		function first(ele){
			var firstchild=ele.firstElementChild||ele.firstChild;
			if(!firstchild||firstchild.nodeType!==1){
				return null;
			}else{
				return firstchild;
			}
		}
		//获取最后一个元素节点的函数
		function last(ele){
			var lastchild=ele.lastElementChild||ele.lastChild;
			if(!lastchild||lastchild.nodeType!==1){
				return null;
			}else{
				return lastchild;
			}
		}
		
		//获取下一个兄弟元素节点的函数
		function next(ele){
			var nextnode=ele.nextElementSibling||ele.nextSibling;
			if(!nextnode||nextnode.nodeType!==1){
				return null;
			}else{
				return nextnode;
			}
		}
		//获取上一个兄弟元素节点
		function prev(ele){
			var prevnode=ele.previousElementSibling||ele.previousSibling;
			if(!prevnode||prevnode.nodeType!==1){
				return null;
			}else{
				return prevnode;
			}

//一个得到位置的函数
	function getPos(obj){
			var pos={left:0,top:0};
			
			while(obj){
				pos.left +=obj.offsetLeft;
				pos.top +=obj.offsetTop;
				obj=obj.offsetParent;
			}
			return pos;
		}	}


//封装一个得到样式的兼容性函数

function getStyle(obj,attr){
		if(obj.currentStyle){
			return obj.currentStyle[attr];
		}else{
			return getComputedStyle(obj)[attr];
		}
	}
//封装一个添加class 函数
function addClass(obj,className){
	if(obj.className==""){
		obj.className=className;
	}else{
		var arrClassName=obj.className.split(" ");
		var _index=arrIndex(arrClassName,className);
		if(_index==-1){
			obj.className +=" "+className;
		}
	}
}
//循环遍历原来class里面的每一项，与要添加的类做比较
function arrIndex(arr,k){
	for(var i=0;i<arr.length;i++){
		if(arr[i]==k){
			return i;//如果有相同的，返回原数组相同的那一项对应的下标
		}
	};
	return -1;
}
//移除class函数
function removeClass(obj,className){
if(obj.className!==""){
	var arrClassName=obj.className.split(" ");
	var _index=arrIndex(arrClassName,className);
	if(_index!==-1){
		arrClassName.splice(_index,1);//删除了对应的那个找到的class
		obj.className=arrClassName.join(" ");//将数组转回字符串
	}
	
}

}

//做运动的函数

   function Move(obj,attr,dir,target,callBack){
				
				dir=  parseInt(getStyle(obj,attr))>target?-dir:dir;
				
				clearInterval(obj.timer);
				obj.timer=setInterval(function(){
					var speed=parseInt(getStyle(obj,attr))+dir; //10(px)
					//&&与运算比||或运算优先级高
					if(speed>=target&&dir>0||speed<=target&&dir<0){
						speed=target;
					}
					
					obj.style[attr]=speed+"px";
					
					if(speed==target){
						clearInterval(obj.timer);
						callBack&&callBack();
						//alert(speed);
					}
					
				},30);
				
			}

//绑定多个事件的函数（可以兼容各个浏览器）
//第四个参数的意思是，是冒泡阶段，还是捕获阶段，若写true则是捕获阶段，若写false则是冒泡阶段.

         function bind(obj,evname,evFn,isCapture){                                                 
                               if(obj.addEventListener){
                                            obj.addEventListener(evname,evFn,isCapture);
                                                        }  else if(obj.attachEvent){
                          obj.attachEvent("on"+evname,function(){
                                 evFn.call(obj);
                              });
                          }else{
                                      obj["on"+evname]=evFn;
                                }


                              }



//解除事件绑定的函数（可以兼容各个浏览器）


               function unbind(obj,evname,evFn,isCapture){
                                  if(obj.removeEventListener){
                                       obj.removeEventListener(evname,evFn,isCapture);
                                        }else if(obj.detachEvent){
                                         obj.detachEvent("on"+evname,evFn);

                                             }
                                                           else{
                                                         obj["on"+evname]=null;
                                                                              }
                                           }

//图片拖拽的函数  
            function drag(obj){
            	         var disX;
					     var disY;
					     var aImg=document.getElementsByTagName("img");
					     var newObj=null;
					obj.onmousedown=function(ev){
						 document.onmouseup=document.onmousemove=null;
						 var e=ev||event;
						if(e.preventDefault){
							e.preventDefault();
		                    }else{
							event.returnValue=false;
						}
		                    obj.setCapture&&obj.setCapture();
						    disX=e.clientX-obj.offsetLeft;
						    disY=e.clientY-obj.offsetTop;
						    var firstL=obj.offsetLeft;
						    var firstT=obj.offsetTop;
					   document.onmousemove=function(ev){
					 	var e=ev||event;
					 	var valueX=e.clientX-disX;
					 	var valueY=e.clientY-disY;
					 	var maxL=document.documentElement.clientWidth-obj.offsetWidth;
					 	var maxT=document.documentElement.clientHeight-obj.offsetHeight;
					 	valueX=valueX<0?0:valueX;
					 	valueX=valueX>maxL?maxL:valueX;
					 	valueY=valueY<0?0:valueY;
					 	valueY=valueY>maxT?maxT:valueY;
					 	obj.style.left=valueX+"px";
					 	obj.style.top=valueY+"px";
					 	var arr=[];
					 	      for(var i=0;i<aImg.length;i++){
					 	      	 if(aImg[i]!=obj){
					 	      	 	    if(hitText(aImg[i],obj)){
					 	      	 	    	 arr.push(aImg[i]);
					 	      	 	    }
					 	      	 }
					 	      }
					 	      var min=Infinity;
					 	    for(var j=0;j<arr.length;j++ ){
					 	    	 var a=-arr[j].offsetLeft-obj.offsetLeft;
					 	    	 var b=arr[j].offsetTop-obj.offsetTop;
					 	    	 var value=a*a+b*b;
					 	    	 if(min>value){
					 	    	 	min=value;
					 	    	 	newObj=arr[j];
					 	    	 }
					 	    }
					 		
					 	}
					 
					    document.onmouseup=function(){
					 	document.onmouseup=document.onmousemove=null;
					 	obj.repleaseCapture&&obj.releaseCapture();
					 	if(newObj){
					 		  obj.style.left=newObj.offsetLeft+"px";
					 		  obj.style.top=newObj.offsetTop+"px";
					 		  newObj.style.left=firstL+"px";
					 		  newObj.style.top=firstT+"px";
					 	}
					 	else{
					 		obj.style.left=firstL+"px";
					 		obj.style.Top=firstT+"px";
					 	}
					 }
	                }
					
					function hitText(obj,obj2){
						  var objH=obj.offsetHeight;
						  var objL=obj.offsetLeft;
						  var objW=obj.offsetWidth;
						  var objT=obj.offsetTop;
						  var obj2H=obj2.offsetHeight;
						  var obj2W=obj2.offsetWidth;
						  var obj2L=obj2.offsetLeft;
						  var obj2T=obj2.offsetTop;
						  if(objL+objW<obj2L||objT+objH<obj2T||obj2L+obj2W<objL||obj2T+obj2H<objT){
						  	  return false;
						  }
						  else{
						  	return true;
						  }
					}
					 }
//添加cookie的一个小函数
                       function setCookie(key,value,time){
				var mydate=new Date();
				mydate.setDate(mydate.getDate()+time);
				document.cookie=key+"="+encodeURI(value)+";expires="+mydate.toGMTString();
			}
//获得cookie的一个小函数
                     function getCookie(key){
				var str=document.cookie;
				var arr=str.split("; ");
				for(var i=0;i<arr.length;i++){
					var newArr=arr[i].split("=");
					if(newArr[0]==key){
						 return decodeURI(newArr[1]);
					}
				}
			}
//删除cookie的一个小函数
                        function removeCookie(key){
				 setCookie(key,"",-1);
			}
//ajax的函数      options这个参数是个对象。也就是调用的时候传参的时候是个对象。实际传入参数是五个，method(数据的提交方式"get","post"),url(调用的路径),
//data(传入的数据);successFn(如果需要回调函数的话，回调一下);datetype(返回数据的格式.xml或json之类的)
		function ajax(options){
			var defaults={
				method:options.method||"get",
				url:options.url,
				data:options.data||"",
				successFn:options.successFn||null,
				dataType: options.dataType || ""
			}
			defaults.method=options.method.toLowerCase();
			
			 if( defaults.url === "" ){
		            alert( "url不能为空" );
		            return;
		          }
			 
			var xhr=null;
			try{
				xhr=new XMLHttpRequest();
			}catch(e){
				xhr=new ActiveXObject("Microsoft.XMLHTTP");
			}
			if(defaults.method=='get'&&defaults.data){
				defaults.url +='?'+defaults.data;
			}
			xhr.open(defaults.method,defaults.url,true);
			if(defaults.method=='get'){
				xhr.send();
			}else{
				xhr.setRequestHeader('content-type','application/x-www-form-urlencoded')
				xhr.send(defaults.data);
			}
			xhr.onreadystatechange=function(){
				if(xhr.readyState==4){
					if(xhr.status==200){
						var data=xhr.responseText;
						 if( defaults.dataType.toLowerCase() === "json" ){
		                    data = JSON.parse( data );
		                }
		
		                if( defaults.dataType.toLowerCase() === "xml" ){
		                   data = xhr.responseXML;
		                }
		                
						 if( typeof defaults.successFn === "function" ){
		                  defaults.successFn(data);
		                }
					}else{
						alert('出错了,Err:'+xhr.status);
					}
				}
			}
		}
  //正式版的运动函数
  function startMove(obj, json,fnEnd) {
	var MAX = 30;
	//每次调用就只有一个定时器在工作(开始运动时关闭已有定时器)
	//并且关闭或者开启都是当前物体的定时器，已防止与页面上其他定时器的冲突，使每个定时器都互不干扰 
	  clearInterval(obj.timer);
	  obj.timer = setInterval(function() {
		var bStop = true; // 假设：所有的值都已经到了
		for (var name in json) {
			var iTarget = json[name]; // 目标点
			if (name == 'opacity') {
				// *100 会有误差 0000007 之类的 所以要用 Math.round() 会四舍五入
				var cur = parseInt(parseFloat(getStyle(obj, name)) * 100);
			} else {
				var cur = parseInt(getStyle(obj, name)); // cur 当前移动的数值
			}
			var speed = (iTarget - cur) / 10// 物体运动的速度 数字越小动的越慢 /5 : 自定义的数字
			speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
			if (Math.abs(speed) > MAX) speed = speed > 0 ? MAX : -MAX;
			if (name == 'opacity') {
				obj.style.filter = 'alpha(opacity:' + (cur + speed) + ')'; //IE
				obj.style.opacity = (cur + speed) / 100; //ff chrome
			} else {
				obj.style[name] = cur + speed + 'px';
			}
			// 某个值不等于目标点 
			if (cur != iTarget) {
				bStop = false;
			}
		}
		// 都达到了目标点
		if (bStop) {
			clearInterval(obj.timer);
			if (fnEnd) //只有传了这个函数才去调用
			{
				fnEnd();
			}
		}
	}, 20);
    }