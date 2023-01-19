var totalBookletPages = 0;
var bookletBackup = "";
var backupInside;

var startOrEnd = true;
var previousPage = 0;

function managePages() {
  try {
    if (!startOrEnd) {
      if ($.wowBook("#booklet").isOnPage(totalBookletPages - 2) && previousPage
          < $.wowBook("#booklet").currentPage)//inside and comes from last page
      {
        centerSingleInside();
      } else if ($.wowBook("#booklet").isOnPage(1) && previousPage > $.wowBook(
          "#booklet").currentPage)//front and comes from second
      {
        centerSingleFront();
      } else if ($.wowBook("#booklet").isOnPage(1) && previousPage == 0) {
        centerSingleFront();
      } else if ($.wowBook("#booklet").isOnPage(totalBookletPages - 2)
          && previousPage == totalBookletPages - 1)//inside and comes from last page
      {
        centerSingleInside();
      } else {
        centerDoubleBooklet();
      }
      previousPage = $.wowBook("#booklet").currentPage;
    }
  } catch (Exception) {
  }
}

function createArtBooklet() {
  $("#bookletcontainer").show();
  bookletBackup = $("#bookletcontainer").html();
  totalBookletPages = $("#bookletcontainer #booklet .softpage").length;

  $startPage = totalBookletPages - 1;
  if (isDigipak()) {
    $startPage = 0;
    if ($("#bookletcontainer").hasClass("default")) {
      $("#bookletcontainer").removeClass("default");
    }
    if (!$("#bookletcontainer").hasClass("defaultDigipak")) {
      $("#bookletcontainer").addClass("defaultDigipak");
    }
  }

  $('#booklet').wowBook({
    height: 492
    , width: 984
    , centeredWhenClosed: false
    , hardcovers: false
    , turnPageDuration: 500
    , numberedPages: []
    , onShowPage: function () {
      managePages();
    }
    , startPage: $startPage
  }).css({'display': 'none', 'margin': 'auto'}).show();
  //centerSingleInside();

  if (!isDigipak()) {
    setTimeout(function () {
      backupInside = $("#art-inside").attr("style");
      $("#art-inside").attr("style", $("#bakpInside").val());
      $.wowBook("#booklet").gotoPage(0);
      centerSingleFront();
    }, 500);
    setTimeout(function () {
      if ($("#bookletcontainer").hasClass("default")) {
        $("#bookletcontainer").removeClass("default");
      }
      startOrEnd = false;
      previousPage = 0;
    }, 1200);
  } else {
    backupInside = $("#art-inside").attr("style");
    $("#art-inside").attr("style", $("#bakpInside").val());
    setTimeout(function () {

      if ($("#bookletcontainer").hasClass("defaultDigipak")) {
        $("#bookletcontainer").removeClass("defaultDigipak");
      }
      //centerSingleFront();
      startOrEnd = false;
      previousPage = 0;
    }, 500);
    setTimeout(function () {
      centerSingleFront();
    }, 1000);
  }

  /*$("#front_booklet").on("click", function(){
      centerDoubleBooklet();
  });
  $("#inside_booklet").on("click", function(){
      centerDoubleBooklet();
  });*/
  $(".leftbooklet").on("click", function () {
    $.wowBook("#booklet").back();
    /*if($.wowBook("#booklet").isOnPage(1))
        centerSingleFront();*/
  });
  $(".rightbooklet").on("click", function () {
    /*if($.wowBook("#booklet").isOnPage(totalBookletPages-2))
        centerSingleInside();*/
    $.wowBook("#booklet").advance();
  });

}

function hideArtBooklet() {
  startOrEnd = true;
  previousPage = 0;
  try {

    if (!isDigipak()) {
      $.wowBook("#booklet").gotoPage(totalBookletPages - 1);
      centerSingleInsideEnd();
      setTimeout(function () {
        if (!$("#bookletcontainer").hasClass("default")) {
          $("#bookletcontainer").addClass("default");
        }
        setTimeout(function () {
          $("#bookletcontainer").html(bookletBackup);
          $("#art-inside").attr("style", backupInside);
          $("#bookletcontainer").hide();

        }, 500);
      }, 1500);
    } else {
      $.wowBook("#booklet").gotoPage(0);
      centerSingleInsideEnd();
      setTimeout(function () {
        if (!$("#bookletcontainer").hasClass("defaultDigipak")) {
          $("#bookletcontainer").addClass("defaultDigipak");
        }
        setTimeout(function () {
          $("#bookletcontainer").html(bookletBackup);
          $("#art-inside").attr("style", backupInside);
          $("#bookletcontainer").hide();

        }, 1000);
      }, 1000);

    }
  } catch (Exception) {
  }//no booklet
}

function centerSingleInsideEnd() {
  if ($("#bookletcontainer").hasClass("bookletcontainer_singleinside")) {
    $("#bookletcontainer").removeClass("bookletcontainer_singleinside");
  }
  if ($("#bookletcontainer").hasClass("bookletcontainer_singlefront")) {
    $("#bookletcontainer").removeClass("bookletcontainer_singlefront");
  }
  if (!$("#bookletcontainer").hasClass("bookletcontainer")) {
    $("#bookletcontainer").addClass("bookletcontainer");
  }
}

function centerSingleInside() {
  if (!$("#bookletcontainer").hasClass("bookletcontainer_singleinside")) {
    $("#bookletcontainer").addClass("bookletcontainer_singleinside");
  }
}

function centerSingleFront() {
  if (!$("#bookletcontainer").hasClass("bookletcontainer_singlefront")) {
    $("#bookletcontainer").addClass("bookletcontainer_singlefront");
  }
}

function centerDoubleBooklet() {
  if ($("#bookletcontainer").hasClass("bookletcontainer_singleinside")) {
    $("#bookletcontainer").removeClass("bookletcontainer_singleinside");
  }
  if ($("#bookletcontainer").hasClass("bookletcontainer_singlefront")) {
    $("#bookletcontainer").removeClass("bookletcontainer_singlefront");
  }
}

function clearLeftHover() {
  var $case = $('#main-art-Book');
  if ($case.hasClass('art-viewfronthover')) {
    $case.removeClass('art-viewfronthover');
  }
  if ($case.hasClass('art-viewfronthoverop')) {
    $case.removeClass('art-viewfronthoverop');
  }
  if ($case.hasClass('art-viewfronthover2')) {
    $case.removeClass('art-viewfronthover2');
  }
  if ($case.hasClass('art-viewinsideHoverRet')) {
    $case.removeClass('art-viewinsideHoverRet');
  }
}

function clearRightHover() {
  var $case = $('#main-art-Book');
  if ($case.hasClass('art-viewbackhover')) {
    $case.removeClass('art-viewbackhover');
  }
  if ($case.hasClass('art-viewinsideHover')) {
    $case.removeClass('art-viewinsideHover');
  }
}

function rotateToSpinArt() {
  var $case = $('#main-art-Book');
  $case.addClass('art-viewflip');
}

function rotateToFrontArt() {
  var $case = $('#main-art-Book');
  $case.removeClass('art-viewflip');
  $case.addClass('art-bookdefault');
}

var Artwork = (function () {
  function init() {
    hideBookletHovers();

    var $case = $('#main-art-Book');
    $other = $('#main-art-Book').not($case);

    $("#case_left_left_hover").mouseenter(function () {
      if (!$case.hasClass('art-viewinsideHoverRet')) {
        $case.addClass('art-viewinsideHoverRet');
      }
    });
    $("#case_left_left_hover").mouseleave(function () {
      clearLeftHover();
      clearRightHover();
    });
    $("#case_left_left_hover").click(function () {
      clearLeftHover();
      clearRightHover();
      if ($("#art-left").hasClass('hov')) {
        $("#art-left").removeClass('hov');
      }
      var $this = $(this);
      $other.data('opened', false).removeClass('art-viewinside').parent().css(
          'z-index', 0);
      if (!$other.hasClass('art-viewback')) {
        $other.addClass('art-bookdefault');
      }
      $this.removeClass('art-active');
      if ($(".hovercont_").hasClass('art-viewinside')) {
        $(".hovercont_").removeClass('art-viewinside');
        $(".hovercont_").addClass('art-viewfront');

      }
      $case.data({opened: false, flip: false}).removeClass(
          'art-viewinside').addClass('art-bookdefault');
      setTimeout("hideBookletHovers()", 500);

    });

    $("#case_right_hover").mouseenter(function () {
      clearLeftHover();
      if (!$case.data('flip')) { //front view
        if ($case.data('opened')) { //opened
          if (!$case.hasClass('art-viewinsideHoverRet')) {
            $case.addClass('art-viewinsideHoverRet');
          }
          if ($("#art-left").hasClass('hov')) {
            $("#art-left").removeClass('hov');
          }

        } else if (!$case.hasClass('art-viewinsideHover')) {
          $case.addClass('art-viewinsideHover');
          if (!$("#art-left").hasClass('hov')) {
            $("#art-left").addClass('hov');
          }
        }
      } else //back view
      {
        if (!$case.hasClass('art-viewbackhover')) {
          $case.addClass('art-viewbackhover');
        }
      }
    });

    $("#case_right_hover").mouseleave(function () {
      clearLeftHover();
      clearRightHover();
      if ($("#art-left").hasClass('hov')) {
        $("#art-left").removeClass('hov');
      }

    });

    $("#case_left_hover").mouseenter(function () {
      clearRightHover();
      if (!$case.data('flip')) {

        if ($case.data('opened') && !$case.hasClass('art-viewfronthoverop')) {
          $case.addClass('art-viewfronthoverop');
        } else if (!$case.hasClass('art-viewfronthover')) {
          $case.addClass('art-viewfronthover');
        }
      } else {
        if (!$case.hasClass('art-viewfronthover2')) {
          $case.addClass('art-viewfronthover2');
        }

      }
    });

    $("#case_left_hover").mouseleave(function () {
      clearLeftHover();
      clearRightHover();
    });

    $("#case_left_hover").click(function () {
      clearLeftHover();
      if ($(".hovercont_").hasClass('art-viewinside')) {
        $(".hovercont_").removeClass('art-viewinside');
        $(".hovercont_").addClass('art-viewfront');
        setTimeout("hideBookletHovers()", 500);
      }
      if ($case.data('flip')) {
        $case.data({opened: false, flip: false}).removeClass(
            'art-viewback').addClass('art-bookdefault');

      } else {
        $case.data({opened: false, flip: true}).removeClass(
            'art-viewinside art-bookdefault').addClass('art-viewback');

      }
    });

    $("#case_right_hover").click(function () {
      clearLeftHover();
      clearRightHover();
      if ($("#art-left").hasClass('hov')) {
        $("#art-left").removeClass('hov');
      }
      if ($case.data('flip')) {
        $case.data({opened: false, flip: false}).removeClass(
            'art-viewback').addClass('art-bookdefault');
      } else {
        var $this = $(this);
        $other.data('opened', false).removeClass('art-viewinside').parent().css(
            'z-index', 0);
        if (!$other.hasClass('art-viewback')) {
          $other.addClass('art-bookdefault');
        }
        if ($case.data('opened')) {

          $("#case_disc_hover").hide();
          $this.removeClass('art-active');
          if ($(".hovercont_").hasClass('art-viewinside')) {
            $(".hovercont_").removeClass('art-viewinside');
            $(".hovercont_").addClass('art-viewfront');

          }
          $case.data({opened: false, flip: false}).removeClass(
              'art-viewinside').addClass('art-bookdefault');
          setTimeout("hideBookletHovers()", 500);
        } else {

          $("#case_disc_hover").show();
          $this.addClass('art-active');
          //move
          if ($(".hovercont_").hasClass('art-viewfront')) {
            $(".hovercont_").removeClass('art-viewfront');
            $(".hovercont_").addClass('art-viewinside');
            setTimeout("showBookletHovers()", 500);
          }
          $case.data({opened: true, flip: false}).removeClass(
              'art-viewback art-bookdefault').addClass('art-viewinside');
        }
      }

    });

    $("#case_disc_hover").mouseenter(function () {
      /*if(! $(".disc_cover_area").hasClass("rotationEnter")){
          $(".disc_cover_area").addClass("rotationEnter");
      }*/
    });
    $("#case_disc_hover").mouseleave(function () {
      /*if($(".disc_cover_area").hasClass("rotationEnter")){
          $(".disc_cover_area").removeClass("rotationEnter");
      }*/
    });

    $("#case_disc_hover").on("click", function () {
      if (!$(".disc_cover_area").hasClass("rotation")) {
        $(".disc_cover_area").addClass("rotation");
      }
    });

    if (_booklet.length > 0) {
      $("#case_left_inside_hover").on("click", function () {
        createArtBooklet();
        $("#case_bottom_inside_hover").show();
      });
      $("#case_bottom_inside_hover").on("click", function () {
        hideArtBooklet();
        $("#case_bottom_inside_hover").hide();
      });

      document.onkeydown = function (evt) {
        if (evt.key === "Escape" || evt.key === "Esc") {
          hideArtBooklet();
          $("#case_bottom_inside_hover").hide();
        }
      };
    }

  }

  return {init: init};
})();

function showBookletHovers() {
  $("#case_left_inside_hover").show();
}

function hideBookletHovers() {
  $("#case_left_inside_hover").hide();
  $("#case_bottom_inside_hover").hide();
  $("#case_disc_hover").hide();
}

function isDigipak() {
  return ($("#art-inlay").attr("style").indexOf("digipak") >= 0);
}

var _front_type, _front_source, _back_type, _back_source, _inlay_type,
    _inlay_source, _inside_type, _inside_source, _left_type, _left_source,
    _disc_type, _disc_source, _booklet;

function setArtworkVariables(
    front_type,
    front_source,
    back_type,
    back_source,
    inlay_type,
    inlay_source,
    inside_type,
    inside_source,
    left_type,
    left_source,
    disc_type,
    disc_source,
    booklet
) {
  _front_type = front_type;
  _front_source = front_source;
  _back_type = back_type;
  _back_source = back_source;
  _inlay_type = inlay_type;
  _inlay_source = inlay_source;
  _inside_type = inside_type;
  _inside_source = inside_source;
  _left_type = left_type;
  _left_source = left_source;
  _disc_type = disc_type;
  _disc_source = disc_source;
  _booklet = booklet;
}

function createFlipCase(front_type,
    front_source,
    back_type,
    back_source,
    inlay_type,
    inlay_source,
    inside_type,
    inside_source,
    left_type,
    left_source,
    disc_type,
    disc_source,
    booklet) {
  setArtworkVariables(
      front_type,
      front_source,
      back_type,
      back_source,
      inlay_type,
      inlay_source,
      inside_type,
      inside_source,
      left_type,
      left_source,
      disc_type,
      disc_source,
      booklet
  );

  displayFlipCase(
      _front_type,
      _front_source,
      _back_type,
      _back_source,
      _inlay_type,
      _inlay_source,
      _inside_type,
      _inside_source,
      _left_type,
      _left_source,
      _disc_type,
      _disc_source,
      _booklet
  );

}

var art_area_content_st = "<div class='hovercont_ art-viewfront' id='case_bottom_inside_hover'></div><div id='bookletcontainer' class='bookletcontainer default'><div id='booklet'></div> <!-- booklet --></div> <!--! end of #container --><div class='hovercont' id='padder'><section class='hovercontainer'><div class='hovercont_ art-viewfront' id='case_left_hover'></div><div class='hovercont_ art-viewfront' id='case_disc_hover'></div><div class='hovercont_ art-viewfront' id='case_right_hover'></div><div class='hovercont_ art-viewfront' id='case_left_left_hover'></div><div class='hovercont_ art-viewfront' id='case_left_inside_hover'></div></section></div><div class='art_container' id='art_container'><!-- Codrops top bar --><div id='main-art-Book' class='art-book'><div class='art-front'><!-- FRONT --><div id='art-cover' class='art-cover'></div><!-- INSIDE --><div id='art-inside' class='art-cover-back'><input id='bakpInside' type='hidden' value='background:url('images/case_inside_single.png');'></div></div><div class='art-page'><!-- CD --><div class='disc_cover_area'><canvas class='disc_cover' id='disc_cover' width='496' height='496'></canvas></div><!-- INLAY --><div id='art-inlay' class='art-content art-content-current'></div></div><!-- BACK --><div id='art-back' class='art-back'></div><div class='art-right'></div><div id='art-left' class='art-left'></div><div class='art-top'></div><div class='art-bottom'></div></div></div>";

function displayFlipCase(
    front_type,
    front_source,
    back_type,
    back_source,
    inlay_type,
    inlay_source,
    inside_type,
    inside_source,
    left_type,
    left_source,
    disc_type,
    disc_source,
    booklet
) {
  $("#art_area").html(art_area_content_st);
  $("#bookletcontainer").hide();
  Artwork.init();

  try {
    //booklet variables
    $rightStatic = "<div class='rightbooklet pagefx softpage'>";
    $rightStaticEnd = "</div>";
    $leftStatic = "<div class='leftbooklet pagefx softpage'>";
    $leftStaticEnd = "</div>";

    //disc vars
    var can = document.getElementById('disc_cover');
    var ctx = can.getContext('2d');

    //ctx.arc(x,y,radius,startAngle,endAngle, anticlockwise);

    ctx.beginPath();
    ctx.arc(246, 246, 246, 0, Math.PI * 2, false); // outer (filled)

    //DISC TYPE:
    //complete fill: 42
    //if(disc_type=="max_disc")
    ctx.arc(246, 246, 42, 0, Math.PI * 2, true); // outer (unfills it)
    //ctx.fill();
    ctx.clip();

    var img = new Image();
    img.addEventListener('load', function (e) {
      ctx.drawImage(this, -5, -5, 506, 506);//0,0,496,496
    }, true);

    //DISC
    img.src = disc_source;
    //$(".disc_cover_area").addClass("rotation");

    //CASE EXAMPLE
    $front_name = front_type;
    $("#art-cover").addClass(
        (!$("#art-cover").hasClass($front_name) ? $front_name : ""));
    $("#art-cover").attr("style",
        "background-image: url('images/" + $front_name + ".png') , url('"
        + front_source + "');");
    //check double case
    if (front_type == "case_front_double") {
      var added = "<div id='art-cover' class='art-cover case_front_single' style=\"background-image: url('images/case_front_double_t.png') , url('images/transp.png');\"></div>";
      $(".art-front").prepend(added);
    }

    //INSIDE: case_inside_single
    $inside_name = inside_type;
    $("#art-inside").addClass(
        (!$("#art-inside").hasClass($inside_name) ? $inside_name : ""));
    $("#art-inside").attr("style",
        "background-image: url('" + inside_source + "'), url('images/"
        + $inside_name + ".png');");
    if ($inside_name.indexOf("digipak") >= 0) {
      $("#bakpInside").val(
          "background-image: url('" + inside_source + "'), url('images/"
          + $inside_name + ".png');");
    }
    //check double case
    if (inside_type == "case_inside_double") {
      var added_inside = "<div id='art-inside' class='art-cover-back case_inside_single' style=\"background-image: url('images/transp.png'), url('images/case_inside_double_t.png');\"></div>";
      $(".art-front").append(added_inside);
    }

    //INLAY: case_inlay_single
    $inlay_name = inlay_type;
    $("#art-inlay").addClass(
        (!$("#art-inlay").hasClass($inlay_name) ? $inlay_name : ""));
    $("#art-inlay").attr("style",
        "background-image: url('images/" + $inlay_name + ".png'), url('"
        + inlay_source + "');");

    if ($inlay_name.indexOf("digipak") >= 0) {
      $(".disc_cover_area").addClass(
          (!$(".disc_cover_area").hasClass("digipak_cover_area")
              ? "digipak_cover_area" : ""));
    }

    //BACK: case_back_single
    $back_name = back_type;
    $("#art-back").addClass(
        (!$("#art-back").hasClass($back_name) ? $back_name : ""));
    $("#art-back").attr("style",
        "background-image: url('images/" + $back_name + ".png'), url('"
        + back_source + "');");

    //RIGHT

    //LEFT: case_left_single
    $left_name = left_type;
    $("#art-left").addClass(
        (!$("#art-left").hasClass($left_name) ? $left_name : ""));
    $("#art-left").attr("style",
        "background-image: url('images/digipak_front_single.png'), url('"
        + left_source + "');");

    //BOOKLET
    $.each(booklet, function (index, value) {
      if (index == 0) {
        $("#booklet").append(
            $rightStatic + "<img id='front_booklet' class='" + value[0]
            + "' src='" + value[1] + "'/>" + $rightStaticEnd);
      } else if (index == booklet.length - 1) {
        $("#booklet").append(
            $leftStatic + "<img id='inside_booklet' class='" + value[0]
            + "' src='" + value[1] + "' />" + $leftStaticEnd);
      } else if (index % 2 == 0) {
        $("#booklet").append(
            $leftStatic + "<img class='" + value[0] + "' src='" + value[1]
            + "'/>" + $leftStaticEnd);
      } else {
        $("#booklet").append(
            $rightStatic + "<img class='" + value[0] + "' src='" + value[1]
            + "' />" + $rightStaticEnd);
      }
    });

  } catch (Exception) {
  }
}

