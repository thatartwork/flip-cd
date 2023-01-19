var changeMadeInCovers=false;

function prepareCovers(){
    $('html').on('click',function(event) {

        // Hide the menus
        if(changeMadeInCovers && !$(event.target).hasClass("cover_button_sp"))
            restartAllCovers();
    });

    $.each($(".thumbnail"), function(index, thumbnail) {
        var flagcoverimage = false;
        $(thumbnail).find(".cover_image").bind("touchstart click", function(){
            if(!flagcoverimage){
                //change others opacity
                opacityAllButCovers(thumbnail);

                //action
                $(thumbnail).find(".btn.btn-inverse.dropdown-toggle.cover_button_sp").trigger("click");
                flagcoverimage=true;
                setTimeout(function(){flagcoverimage=false;}, 100);
            }
            return false;
        });
        //only desktop browsers
        /*$(thumbnail).find(".cover_image").mouseenter( function(){
            $(thumbnail).find(".btn.btn-inverse.dropdown-toggle.cover_button_sp").focus();
            return false;
        });
        $(thumbnail).find(".cover_image").mouseleave( function(){
            $(thumbnail).find(".btn.btn-inverse.dropdown-toggle.cover_button_sp").blur();
            return false;
        });*/
        $(thumbnail).find(".btn.btn-inverse.dropdown-toggle.cover_button_sp").bind("touchstart click", function(){
            opacityAllButCovers(thumbnail);
        });




    });


}


function opacityAllButCovers(thumbnail){
    //$(".thumbnails").css({zoom:2});
    changeMadeInCovers=true;
    $(thumbnail).css({opacity:1});
    //$(thumbnail).find("button").removeAttr("disabled");
    $.each($(".thumbnail").not(thumbnail), function(index, thumb){
        $(thumb).css({opacity:0.5});
        //$(thumb).find("button").attr("disabled", true);
    });
    //location

    setTimeout(function(){window.location="#"+$(thumbnail).attr("id");}, 10);
}

function restartAllCovers(){
    changeMadeInCovers=false;
    //$(".thumbnails").css({zoom:1});
    $.each($(".thumbnail"), function(index, thumbnail) {
        $(thumbnail).css({opacity:1});
    });
}