$(function () {
  // Load the IFrame Player API code asynchronously.
  const tag = document.createElement("script");
  tag.src = "https://www.youtube.com/player_api";
  var firstScriptTag = document.getElementsByTagName("script")[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

  // Replace the 'ytplayer' element with an <iframe> and
  // YouTube player after the API code downloads.
  const isIOS = /iP(hone|(o|a)d)/.test(navigator.userAgent);
  var player;
  var player2;
  let players = [];
  const YToption = {
    height: "360",
    width: "640",
    playerVars: {
      // autoplay: 1,
      modestbranding: 1,
      controls: 1,
      disablekb: 0,
      fs: 0,
      iv_load_policy: 3,
      modestbranding: 1,
      playsinline: 1,
      rel: 0,
      showinfo: 0,
    },
  };
  function onYouTubePlayerAPIReady() {
    //onload function
  }
  function initYT(YTarray = ["afe", "afe-s5a0"], starts = [1380, 1382]) {
    for (let i = 0; i < YTarray.length; i++) {
      console.log(YTarray[i]);
      let op = YToption;
      op["videoId"] = YTarray[i];
      op["playerVars"]["start"] = starts[i];
      console.log(op);
      players[i] = new YT.Player("ytplayer" + i, op);
    }
    setTimeout(() => {
      players[0].mute();
      players[1].mute();
      players[0].playVideo();
      players[1].playVideo();
      players[0].pauseVideo();
      players[1].pauseVideo();
      setTimeout(() => {
        players[0].playVideo();
        players[1].playVideo();
        !isIOS && players[0].unMute();
        document.querySelector("footer").classList.add("on");
        document.querySelector("#ff").classList.add("on");
        document.querySelector("#rew").classList.add("on");
        setInterval(() => {
          localStorage["YCV__s"] = Math.floor(players[0].getCurrentTime());
        }, 1000);
      }, 2000);
    }, 2000);
  }
  function playYT() {
    players[0].unMute();
    players[0].playVideo();
    players[1].playVideo();
  }
  function pauseYT() {
    players[0].pauseVideo();
    players[1].pauseVideo();
  }

  document.querySelector("#start").addEventListener(
    "click",
    function () {
      adjustTimeDetail();
      playYT();
    },
    false
  );
  document.querySelector("#stop").addEventListener(
    "click",
    function () {
      pauseYT();
    },
    false
  );
  document.querySelector("#reload").addEventListener(
    "click",
    function () {
      location.reload();
    },
    false
  );
  $("#reset").on("click", function () {
    $("#setting input").each(function () {
      localStorage.removeItem("YCV__" + this.id);
    });
    location.reload();
  });
  document.querySelector("#init").addEventListener(
    "click",
    function () {
      const startTime1 = document.querySelector("#s").value - 0;
      const startTime2 =
        document.querySelector("#s").value -
        0 +
        (document.querySelector("#jisa").value - 0);
      console.log(startTime1, startTime2);
      initYT(
        [
          document.querySelector("#url1").value,
          document.querySelector("#url2").value,
        ],
        [startTime1, startTime2]
      );
      document.querySelector("#setting").classList.remove("on");
    },
    false
  );

  const init = function () {
    $("#setting input").each(function () {
      localStorage["YCV__" + this.id] &&
        $("#" + this.id).val(localStorage["YCV__" + this.id]);
    });
  };

  $("#setting input").on("change keyup", function () {
    localStorage["YCV__" + $(this).attr("id")] = $(this).val();
  });

  $("#rew").on("click", function () {
    adjustTime(5);
  });
  $("#ff").on("click", function () {
    adjustTime(-5);
  });

  function adjustTime(val) {
    const num = Math.floor(players[0].getCurrentTime()) + val;
    players[0].seekTo(num);
    players[1].seekTo(num + ($("#jisa").val() - 0));
  }
  function adjustTimeDetail(val = 0) {
    const num = players[0].getCurrentTime() + val;
    players[0].seekTo(num);
    players[1].seekTo(num + ($("#jisa").val() - 0));
  }

  const target = document.querySelector("main");
  var passiveSupported = false;
  try {
    target.addEventListener(
      "test",
      null,
      Object.defineProperty({}, "passive", {
        get: function () {
          passiveSupported = true;
        },
      })
    );
  } catch (err) {}
  target.addEventListener(
    "touchstart",
    function listener(e) {
      e.preventDefault();
    },
    passiveSupported ? { passive: false } : false
  );
  target.addEventListener(
    "touchmove",
    function listener(e) {
      e.preventDefault();
    },
    passiveSupported ? { passive: false } : false
  );

  init();
});
