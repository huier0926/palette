$(function(){
	    var palebox=$(".palebox");
	    var divs=$(".left>div");
	    var colorfill=$(".colorfill");
	    var colorstroke=$(".colorstroke");
	    var canvas=null;
	    var copy=null;
		var o=null;//实例化对象 全局变量
		$(".add").click(function(){
			var w=prompt("请输入宽度","500px");
			var h=prompt("请输入高度","500px");
		    canvas=$("<canvas>").attr({"width":w,"height":h}).css({background:"#fff"});
		    copy=$("<div>").css({"width":w,"height":h,"position":"absolute","zIndex":"10000","top":0,"left":0});
		    palebox.append(canvas).append(copy).css({"width":w,"height":h,margin:"10px"});
		    create();
	     })   

		 function create(){
		 	 var pat=new palette(canvas[0].getContext("2d"),canvas[0],copy[0]); 
             colorstroke.change(function(){
             	pat.strokeStyle=$(this).val();
             	// alert($(this).val())
             })
             colorfill.change(function(){
             	pat.fillStyle=$(this).val();
             	// alert($(this).val())
             })
		 	 pat.draw();
		 	 divs.click(function(){
				divs.css({"background":"transparent"})
				$(this).css({"background":"#fff"});
	            
	            var attr=$(this).attr("role");
	            
	            if(attr!=undefined){	            	
	            	if(attr=="pencil"){
	            		pat.pencil();
	            	}else if(attr=="poly"||attr=="polystar"){
                        var num=prompt("请输入边数",5);
                        pat.bnum=num||5;
                        pat.jnum=num||5;
                        pat.type=attr;
                        pat.draw();
	            	}else if(attr=="stroke"||attr=="fill"){
                        pat.style=attr;
                        pat.draw();
	            	}else{
                        pat.type=attr;
                        pat.draw();
	            	}
	            }else{
	            	return;
	            }
		    })
		 }
	
})