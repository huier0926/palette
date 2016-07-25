/*
   绘制对象 2d
   canvas  标签（宽，高，填充/描边，形状）
*/



	function palette(cobj,canvas,copy){
	this.o=cobj;
	this.canvas=canvas;
	this.copy=copy;
	this.width=canvas.width;
	this.height=canvas.height;
	this.lineWidth=1;
  this.fillStyle="#000";
  this.strokeStyle="#000";
	this.style="stroke";
	this.type="poly";
	this.bnum=5;
	this.jnum=5;
	this.status=[];
}
palette.prototype.init=function(){//定颜色
    this.o.lineWidth=this.lineWidth;
    this.o.fillStyle=this.fillStyle;
    this.o.strokeStyle=this.strokeStyle;
}
palette.prototype.pencil=function(){//铅笔
    var that=this;
    this.copy.onmousedown=function(){
       that.init();
      that.o.beginPath();

     document.onmousemove=function(e){
     	var ev=e||window.event;
     	var mx=ev.offsetX;
     	var my=ev.offsetY;
     	that.o.lineTo(mx,my);
     	that.o.stroke();
     }
     document.onmouseup=function(){
     	that.o.closePath();
     	document.onmousemove=null;
     	document.onmouseup=null;
     }
    }
}
palette.prototype.eraser=function(){
	 var w=30;
	 var that=this;
	 this.copy.onmousedown=function(e){
      var ev=e||window.event;
        var x=ev.offsetX;
        var y=ev.offsetY;

	 	  var a=document.createElement("div");
	 	  a.style.border="1px solid red";
	 	  a.style.width=w+"px";
	 	  a.style.height=w+"px";
	 	  // a.style.position="abosolute";
       a.setAttribute("id","eraser")
        // a.style.left=x-w/2+"px";
        // a.style.top=y-w/2+"px";
      
	 	  that.canvas.parentNode.appendChild(a);
          that.o.beginPath();
	    document.onmousemove=function(e){
	     	var ev=e||window.event;
	     	var mx=ev.offsetX;
	     	var my=ev.offsetY;
	     	a.style.left=mx-w/2+"px";
	     	a.style.top=my-w/2+"px";
	     	that.o.clearRect(mx-w/2,my-w/2,w,w);
	   }
       document.onmouseup=function(){
       	   that.o.closePath();
           that.canvas.parentNode.removeChild(a);
           document.onmousemove=null;
           document.onmouseup=null;
       }
	 }
}
palette.prototype.draw=function(){
	var that=this;
	this.copy.onmousedown=function(e){
	    // alert(x+","+y)
        var ev=e||window.event;
    	var x=ev.offsetX;
    	var y=ev.offsetY; 
    	that.init();
    	document.onmousemove=function(e){
    		var ev=e||window.event;
    		that.o.clearRect(0,0,that.width,that.height);
            if(that.status.length>0){
    		     that.o.putImageData(that.status[that.status.length-1],0,0,0,0,that.width,that.height)
    		}
    		var mx=ev.offsetX;
    		var my=ev.offsetY;
    		that[that.type](x,y,mx,my);
    		
    	}
    	document.onmouseup=function(){
    		that.status.push(that.o.getImageData(0,0,that.width,that.height))        
    		document.onmousemove=null;
    		document.onmouseup=null;
    	}
    }
}

palette.prototype.line=function(x1,y1,x2,y2){//直线
	this.o.beginPath();
	this.o.lineTo(x1,y1);
	this.o.lineTo(x2,y2);
	this.o.closePath();
	this.o.stroke();	
}
palette.prototype.rect=function(x1,y1,x2,y2){//矩形
	var ow=x2-x1;
	var oh=y2-y1;
	this.o.beginPath();
	this.o.rect(x1,y1,ow,oh);
	this.o.closePath();
	this.o[this.style]();
}
palette.prototype._r=function(x1,y1,x2,y2){//求半径
	var rr=Math.pow((x2-x1),2)+Math.pow((y2-y1),2);
	return Math.sqrt(rr);
}
palette.prototype.circle=function(x1,y1,x2,y2){//圆
	var r=this._r(x1,y1,x2,y2)
	this.o.beginPath();
	this.o.arc(x1,y1,r,0,Math.PI*2,true);	
	this.o.closePath();
	this.o[this.style]();
}
palette.prototype.triangle=function(x1,y1,x2,y2){//三角
	this.o.beginPath();
	this.o.lineTo(x1,y1);	
	this.o.lineTo(x1,y2);	
	this.o.lineTo(x2,y2);	
	this.o.closePath();
	this.o[this.style]();	
}
palette.prototype.poly=function(x1,y1,x2,y2){//多边形
   var r=this._r(x1,y1,x2,y2);
   var ang=360/this.bnum;  
   this.o.beginPath();	
   for (var i = 0; i<this.bnum; i++) {
     // alert(0)
   	  this.o.lineTo(x1+Math.cos((ang*Math.PI/180)*i)*r,y1+Math.sin((ang*Math.PI/180)*i)*r);
   }
  
   this.o.closePath();
   this.o[this.style]();
}
palette.prototype.polystar=function(x1,y1,x2,y2){//多角形
   var r=this._r(x1,y1,x2,y2);
   var r2=0.7*r;
   var ang=360/this.jnum*2;  
   this.o.beginPath();	
   for (var i = 0; i<this.jnum*2; i++) {
   	if(i%2==0){
   		this.o.lineTo(x1+Math.cos((ang*Math.PI/180)*i)*r,y1+Math.sin((ang*Math.PI/180)*i)*r);
   	}else if(i%2==1){
   		this.o.lineTo(x1+Math.cos((ang*Math.PI/180)*i)*r2,y1+Math.sin((ang*Math.PI/180)*i)*r2);        
   	}  	  
   }
   
   this.o.closePath();
   this.o[this.style]();
}