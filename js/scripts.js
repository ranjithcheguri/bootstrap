        $(document).ready(function(){

            $('#loginButton').click(function(){
                $('#loginModal').modal();
            })

             $('#reserveButton').click(function(){
                $('#reserveModal').modal();
            })


            $('#mycarousel').carousel({interval:2000});
            $('#carouselButton').click(function(){

                if($('#carouselButton').children('span').hasClass('fa-pause')){
                    $('#mycarousel').carousel('pause');
                    $('#carouselButton').children('span').removeClass('fa-pause');
                    $('#carouselButton').children('span').addClass('fa-play');
                }
                else{
                     $('#mycarousel').carousel('cycle');
                    $('#carouselButton').children('span').removeClass('fa-play');
                    $('#carouselButton').children('span').addClass('fa-pause');
                }
                
            })
            
        });

    /* 
    $(document).ready(function(){
         $('[data-toggle="tooltip"').tooltip();
     }); 
    */ 


