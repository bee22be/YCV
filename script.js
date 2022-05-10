$(function () {
  // Load the IFrame Player API code asynchronously.
  const tag = document.createElement("script");
  tag.src = "https://www.youtube.com/player_api";
  var firstScriptTag = document.getElementsByTagName("script")[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

  // Replace the 'ytplayer' element with an <iframe> and
  // YouTube player after the API code downloads.
  const isIOS = /iP(hone|(o|a)d)/.test(navigator.userAgent);
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
  function initYT(YTarray = ["afe", "afe-s5a0"]) {
    for (let i = 0; i < YTarray.length; i++) {
      console.log(YTarray[i]);
      let op = YToption;
      const start = document.querySelector("#s").value -
      0 +
      (document.querySelector("#jisa-"+i).value - 0);
      op["videoId"] = YTarray[i];
      op["playerVars"]["start"] = start;
      players[i] = new YT.Player("ytplayer" + i, op);
      console.log(players);
    }
    setTimeout(() => {
      for( var i in players ) {
        players[i].mute();
        players[i].playVideo();
        players[i].pauseVideo();
      }
      
      setTimeout(() => {
        for( var i in players ) {
          players[i].playVideo();
        }
        players[0].unMute();
        // !isIOS && players[0].unMute();
        document.querySelector("footer").classList.add("on");
        document.querySelector("#functions").classList.add("on");
        setInterval(() => {
          localStorage["YCV__s"] = Math.floor(players[0].getCurrentTime());
        }, 1000);
      }, 2000);
    }, 2000);
  }
  function playYT() {
    players[0].unMute();
    for( var i in players ) {
      players[i].playVideo();
    }
  }
  function pauseYT() {
    for( var i in players ) {
      players[i].pauseVideo();
    }
  }

  $("#start").on("click", function () {
    playYT();
  });
  $("#stop").on("click", function () {
    adjustTimeDetail();
    pauseYT();
  });
  $("#reload").on("click", function () {
    location.reload();
  });
  $("#reset").on("click", function () {
    $("#setting input").each(function () {
      localStorage.removeItem("YCV__" + this.id);
    });
    location.reload();
  });

  $("#init").on("click", function () {
    const urlEl = document.querySelectorAll(".url");
    let urls = [];
    let html = "";
    let i = 0
    for (i; i < urlEl.length; i++) {
      if(urlEl[i].value !== ''){
        urls.push(urlEl[i].value);
        html += `<div class="youtube"><div id="ytplayer${i}"></div></div>`
      }
    }
    document.querySelector("main").innerHTML = html;
    document.querySelector("main").className = 'l-'+i;

    initYT(urls);
    document.querySelector("#setting").classList.remove("on");
  });

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
    adjustTime(30);
  });
  $("#ff").on("click", function () {
    adjustTime(-30);
  });
  $("#rew2").on("click", function () {
    adjustTime(5);
  });
  $("#ff2").on("click", function () {
    adjustTime(-5);
  });

  function adjustTime(val) {
    const num = Math.floor(players[0].getCurrentTime()) + val;
    for( var i in players ) {
      players[i].seekTo(num + ($("#jisa-"+i).val() - 0));
    }
  }
  function adjustTimeDetail() {
    const num = players[0].getCurrentTime();
    for( var i in players ) {
      players[i].seekTo(num + ($("#jisa-"+i).val() - 0));
    }
    // players[0].seekTo(num);
    // players[1].seekTo(num + ($("#jisa-1").val() - 0));
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
