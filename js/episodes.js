+ function ($) {
  'use strict';
  var alerts = ""

  function buildAlert($form) {
  }

  $(window).on('load', function () {

    $(".js-city").click(function (event) {
      event.preventDefault();
      $(".js-city").removeClass("arrow");
      $(this).addClass("arrow");
      $(".js-seasons").hide();
      $("#"+$(this).data("city")).show();
    });
    
    $("#more-episodes").click(function (event) {
      event.preventDefault();
      $(".episode-list").removeClass("less-episodes");
      $("#less-episodes").show();
      $(this).hide();
    });
    
    $("#less-episodes").click(function (event) {
      event.preventDefault();
      $(".episode-list").addClass("less-episodes");
      $("#more-episodes").show();
      $('body').scrollTop($('#more-episodes').position().top-300);
      $(this).hide();
    });
    
    $(".lastEpisodeBox").click(function (event) {
      event.preventDefault();
      $(".episode-label").hide();
      $(".video-play").hide();
      $(this).children(".videowrapper").removeClass("opacity-none");
      player.playVideo();
    });
    
    $(".js-episode").click(function (event) {
      event.preventDefault();
      $(".lastEpisodeBox").children(".videowrapper").removeClass("opacity-none");
      $(".video-play").hide();
      $("#js-last-episode-name").text($(this).data("episodename"));
      $("#js-last-episode-desc").text($(this).data("episodedesc"));
      player.loadVideoById($(this).data("episodeurl"), 5, "large")
      player.playVideo();
      $('body').scrollTop($('.lastEpisodeBox').position().top+300);
    });

  })

}(jQuery);

var tag = document.createElement('script');
  tag.src = "http://www.youtube.com/iframe_api";
  var firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
  var player;
  var episodeUrl = document.getElementById('js-last-episode-url').dataset.episodeurl;
  function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
      videoId: episodeUrl,
      events: {
        'onReady': onPlayerReady,
        'onStateChange': onPlayerStateChange
      }
    });
  }
  function onPlayerReady(event) {
    //event.target.playVideo();
  }
  var done = false;
  function onPlayerStateChange(event) {
    if (event.data == YT.PlayerState.PLAYING && !done) {
      //setTimeout(stopVideo, 6000);
      done = true;
    }
  }
  function stopVideo() {
    player.stopVideo();
  }