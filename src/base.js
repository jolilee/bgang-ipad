

var page = {

	init:function(){

        var me = this;

        me.Token = "hYB1pLI26n9lyWJI-N7qk5tPPCHagQ8SSY5SowQvonw";

        $.ajax({
            url : 'http://baogang.dpsapi.com/service/user/token',
            dataType : "json",
            type : "post",
            success : function(data) {

                me.Token = data.token;
            },
            error : function(XMLHttpRequest, textStatus, errorThrown) {
            }
        });

        this.initPageEvent();
        //alert(window.innerHeight + '   '+window.innerWidth);
	},
    ajax:function(url,callback){

        var me = this;

        $.ajax({
            url : url,
            dataType : "jsonp",
            type : "GET",
            jsonp : "callback",
            success : function(data) {

                console.log(data);
                callback(data);
            },
            error : function(XMLHttpRequest, textStatus, errorThrown) {

                console.log(XMLHttpRequest,textStatus,errorThrown);
                alert('error');
            }
        });
    },
    hoverTab:function(){
        $('.newslist-header a').click(function(){
            $(this).css({'background':'#3f8bcb'}).siblings().css({'background':'#b5b6b6','cursor':'pointer'});
            $('#newslist-panel ul').eq($(this).index()).show().siblings().hide();
            $('#newslist-panel').css('transform','translate(0,0)');
        });
    },
    listNewsHeight: function () {
        var a='',b='', c='';
        a= $('#newscontent-main li').length;
        b= $('#newscontent-sub li').length;
        c= a>=b? a*116 : b*116;
        $('#newslist-panel').css('height',c+'px');
    },

    blockNewsWidth:function(){
        var x='',y='';
         x= $('.block-news-content li').length;
         y= x * 205;
        $('.block-news-panel').css("width",y+"px");
    },
    listNewsHeightForSingleTab:function(){
        var m='',n='';
        m=$('#newscontent-main li').length;
        n=m*110;
        $('#newslist-panel').css('height',n+'px');
    },
    listNewsHeightForIndexTab:function(){
        var e='',f='';
        e=$('#newscontent-main li').length;
        f=e*125;
        $('#newslist-panel').css('height',f+'px');
    },
    listNewsHeightFor4Tabs: function () {
        var p;
        var harr= new Array(4);
        harr[0]=$('#newscontent-main li').length;
        harr[1]=$('#newscontent-sub-b li').length;
        harr[2]=$('#newscontent-sub-c li').length;
        harr[3]=$('#newscontent-sub-d li').length;
        var max=harr[0];
        for(var i=1;i<harr.length;i++){
            if(harr[i]>max){
                max=harr[i];
            }
        }
        p=max*118;
        $('#newslist-panel').css('height',p+'px');
    },

    /*initBlockNews:function(){

        $('#blocknews').css({

            'width':$('#blocknews').children().size()*($('#blocknews li').innerWidth()+1)+'px'
        });
        $('.allow-right').on('click',function(){

            $('#blocknews').animate({

                'left':parseInt($('#blocknews').css('left'))-($('#blocknews li').innerWidth()+1)+'px'

            }, 300,'linear',null);
        });
        $('.allow-left').on('click',function(){

            $('#blocknews').animate({

                'left':parseInt($('#blocknews').css('left'))+($('#blocknews li').innerWidth()+1)+'px'

            }, 300,'linear',null);
        });
    },*/


	initPageEvent:function(){
		$('[name=MNav]').on('click',function(){

			location.href = $(this).attr('id')+'.html';
		})

		$('#home').on('click',function(){

			location.href = 'index.html';
		});

		$('#back').on('click',function(){

			history.back();
		});

		$('[slider=pic]').on('click',function(){

			location.href = $(this).attr('tourl');
		})
	},

    getCommentList:function(nid){

        var me = this;

        me.curNid = nid;

        me.ajax('http://baogang.dpsapi.com/api/comment/'+nid,function(list){

            var me = this, html = '', tpl = $('#comment_item').html();

            for(var i=0;i<list.length;i++){

                html += Mustache.render(tpl, list[i]);
            }

            $('#commentList').html(html);
        });
    },

    comment:function(){

        if($('#commentBox').val()==''){

            alert('请输入评论内容！');

            return;
        }

        var me = this;

        var comment = {
            nid:me.curNid,
            comment_body:{
                "und":[{'value':$('#commentBox').val()}]
            }
        };


        var options = {
            type:"post",
            url:"http://baogang.dpsapi.com/service/comment.json",
            data:comment,
            dataType: 'json',
            headers: {'X-CSRF-Token':me.Token},
            success: function(data) {
                alert('评论成功！');
            }
        };

        $.ajax(options);
    },

    like:function(){

        var me = this;

        var vote_data = {votes:{
            entity_type:'node',
            entity_id:me.curNid,
            value_type:'points',
            value:1,
            tag:'plus1_node_vote'
        }};

        var options = {
            type:"post",
            url:"http://baogang.dpsapi.com/service/votingapi/set_votes",
            data:vote_data,
            dataType: 'json',
            headers: {'X-CSRF-Token':me.Token},
            success: function(data) {

                var num = parseInt($('#likeNum').html(),10);

                $('#likeNum').html(num+1);
            }
        }

        $.ajax(options);
    }

}




