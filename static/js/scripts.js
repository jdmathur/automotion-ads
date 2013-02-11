function include(url) {
    document.write('<script src="' + url + '"></script>');
}
var MSIE = true, content, mh, mw, h;

function addAllListeners() {
    var val1 = $('.readMore').css('backgroundColor');
    var val2 = $('.readMore').css('color');
    $('.readMore').hover(
        function(){
        	$(this).stop().animate({'color':'#fff', 'backgroundColor':'#747641'},300,'easeOutExpo');  
        },
        function(){
            $(this).stop().animate({'color':val2,'backgroundColor': val1},600,'easeOutCubic');  
        }
    ); 
    $('.list2>li>a').hover(
        function(){
        	$('span',this).stop().animate({'backgroundPosition':'120% center'},400,'easeInOutExpo');  
        },
        function(){
            $('span',this).stop().animate({'backgroundPosition':'-20% center'},0).animate({'backgroundPosition':'center center'},600,'easeOutCubic');  
        }
    ); 
    $('.readMore2').hover(
        function(){
        	$(this).stop().animate({'backgroundPosition':'left center'},400,'easeInOutExpo');  
        },
        function(){
            $(this).stop().animate({'backgroundPosition':'right center'},500,'easeInOutExpo');  
        }
    );
}

function showSplash(){  
    content.stop().animate({'width':'0'},400,'easeInOutExpo');
    $('.splash>div').stop(true).delay(400).animate({'marginLeft':'0px'},800,'easeOutExpo')
    $('body').css('minWidth',mw);
}

function hideSplash(){  
    content.stop().animate({'width':'0'},400,'easeInOutExpo')
        .delay(250)
        .animate({'width':'680px'},700,'easeOutExpo');
    $('.splash>div').stop(true).animate({'marginLeft':'-1000px'},700,'easeOutExpo')
    $('body').css('minWidth','965px');
}

function hideSplash2(){
    content.stop().animate({'width':'680px'},800,'easeInOutExpo');
    $('.splash>div').stop(true).animate({'marginLeft':'-1000px'},700,'easeInOutExpo')
    $('body').css('minWidth','965px');
}

function hideSplashQ(){
    content.css({'width':'0px'})   
    $('.splash>div').css({'marginLeft':'0'})
}

$(document).ready(ON_READY);
$(window).load(ON_LOAD);

function ON_READY() {
    /*SUPERFISH MENU*/   
    $('.menu #menu').superfish({
	   delay: 800,
	   animation: {
	       height: 'show'
	   },
       speed: 'slow',
       autoArrows: false,
       dropShadows: false
    });
}

function ON_LOAD(){
    MSIE = ($.browser.msie) && ($.browser.version <= 8);
    $('.spinner').fadeOut();
    
    $('#form2').jqTransform({imgPath:'images/'});
    
	$('.list2>li>a').fancybox({
        'padding': 0,
        'width': 640,
        'height': 480,
        'type': 'iframe'
    });
    
    if ($(".mSlider>ul").length) {
        $('.mSlider>ul').cycle({
  		    fx: 'scrollHorz',
    		speed: 600,
    		timeout: 0,
            next: '.next',
    		prev: '.prev',                
    		easing: 'easeInOutExpo',
    		cleartypeNoBg: true ,
            rev:0,
            startingSlide: 0,
            nowrap:1
  		})
   	}    
    if ($(".calSlider").length) {
        $('.calSlider').cycle({
  		    fx: 'scrollHorz',
    		speed: 600,
    		timeout: 0,
            next: '.next',
    		prev: '.prev',                
    		easing: 'easeInOutExpo',
    		cleartypeNoBg: true ,
            rev:0,
            startingSlide: 0,
            nowrap:1
  		})
   	}
    
    if ($(".slogans").length) {
        $('.slogans').cycle({
            fx: 'scrollVert',
            speed: 600,
    		timeout: 0,             
    		easing: 'easeOutExpo',
    		cleartypeNoBg: true ,
            rev:0,
            startingSlide: 0,
            wrap: true
  		})
    };
    var ind = 0;
    var len = $('.pagin>ul>li').length;
    $('.pagin>ul>li>a').bind('click',function(){
        ind = $(this).parent().index();
        $('.pagin>ul>li').each(function(index){if (index!=(ind)){$(this).removeClass('active');}});
        $(this).addClass('active');
        $('.slogans').cycle(ind);
    });
    
    //content switch
    content = $('#content');
    content.tabs({
        show:0,
        preFu:function(_){
            _.li.css({'display':'none'});	
            hideSplashQ();	
        },
        actFu:function(_){
            if (_.curr) {
                h = parseInt(_.curr.css('height'));
                content.find('>ul').css({'height':h});
                if (_.n == 0){
                    showSplash()
                } else if(_.pren == 0) {
                    hideSplash2();
                } else  {
                    hideSplash();
                }
            }
            if(_.curr){
                _.curr
                    .css({'left':'-890px','display':'block'}).stop(true).delay(400).show().animate({'left':'0px'},{duration:1000,easing:'easeOutExpo'});
            }   
    		if(_.prev){
  		        _.prev
                    .show().stop(true).animate({'left':'-890px'},{duration:400,easing:'easeInOutExpo',complete:function(){
                            if (_.prev){
                                _.prev.css({'display':'none'});                                
                            }
                            $(window).trigger('resize');
                        }
		              });
            }            
  		}
    });
    var nav = $('.menu');
    nav.navs({
		useHash:true,
        defHash: '#!/page_home',
        hoverIn:function(li){
            $('>a', li).stop().animate({'backgroundPosition': 'center bottom'},300,'easeOutExpo');
            $('>a>span:first-child',li).stop().animate({'marginTop':'-43px'},300,'easeOutExpo');
        },
        hoverOut:function(li){
            if ((!li.hasClass('with_ul')) || (!li.hasClass('sfHover'))) {
                $('> a', li).stop().animate({'backgroundPosition': 'center top'},700,'easeOutExpo');
                $('>a>span:first-child',li).stop().animate({'marginTop':'0px'},700,'easeOutExpo');
            }
        }
    })
    .navs(function(n,_){
   	    $('#content').tabs(n);
        if (_.prevHash == '#!/page_mail') { 
            $('#form1 a').each(function (ind, el){
                if ($(this).attr('data-type') == 'reset') { $(this).trigger('click') }   
            })
        }
   	});
    
    setTimeout(function(){
        $('#bgStretch').bgStretch({
    	   align:'rightBottom',
           autoplay: false,
           navs:$('.pagin').navs({})
        })
        .sImg({
            sleep: 1000,
            spinner:$('<div class="spinner spinner_bg"></div>').css({opacity:.65}).stop().hide(3000)
        });
    },0);
    
    setTimeout(function(){
        $('body').css({'overflow':'visible'});
        $(window).trigger('resize');    
    },300); 
    
    addAllListeners();
    
    mh = parseInt($('body').css('minHeight'));
    mw = parseInt($('body').css('minWidth'));
}

$(window).resize(function (){
    if (content) {        
        var newMh = mh + (h-650);
        if (newMh < mh) { newMh = mh; }
        $('body').css('minHeight',newMh);        
        content.find('>ul').stop().animate({'top':(windowH()-h)*.5},0);
    }
    if ($('.splash')) $('.splash').stop().animate({'top':(windowH()-$('.splash').height())*.5},0);
});