function getScript(source, callback) {
  var allsuspects = document.getElementsByTagName('script');
  var scriptArr = [];

  for (var i = allsuspects.length; i >= 0; i--) {
    if (allsuspects[i] && allsuspects[i].getAttribute('src') != null) {
      scriptArr.push(allsuspects[i].getAttribute('src'));
    }
  }

  if (scriptArr.indexOf(source) < 0) {
    var script = document.createElement('script');
    var prior = document.getElementsByTagName('script')[0];
    script.async = 1;

    script.onload = script.onreadystatechange = function (_, isAbort) {
      if (isAbort || !script.readyState || /loaded|complete/.test(script.readyState)) {
        script.onload = script.onreadystatechange = null;
        script = undefined;

        if (!isAbort) {
          if (callback) callback();
        }
      }
    };

    script.src = source;
    prior.parentNode.insertBefore(script, prior);
  } else {
    if (callback) callback();
  }
}

var speed_start = new Date(),
  speed_load = null,
  speed_all_load = null;

var isInit = false;

function speedReport(pids) {
  if (window.performance || window.webkitPerformance) {
    var perf = window.performance || window.webkitPerformance;
    var timing = perf.timing;
    var timer = setInterval(function () {
      if (0 !== timing.loadEventEnd) {
        clearInterval(timer);
        speedObj = {
          t1: speed_load - speed_start,
          t2: speed_all_load - speed_start,
          t3: timing.domLoading - timing.navigationStart,
          t4: timing.responseStart - timing.navigationStart,
          t5: timing.responseEnd - timing.requestStart,
          t6: timing.connectEnd - timing.connectStart,
          t7: timing.loadEventEnd - timing.navigationStart
        }

        var url =
          '//report.huatuo.qq.com/report.cgi?appid=20286&platform=unknown&speedparams=',
          s = 'flag1=' + pids[0] + '&flag2=' + pids[1] + '&flag3=' + pids[
            2] + '&flag5=' + pids[3] + '&1=' + speedObj.t1 + '&2=' +
          speedObj.t2 +
          '&3=' + speedObj.t3 + '&4=' + speedObj.t4 + '&5=' + speedObj.t5 +
          '&6=' + speedObj.t6 +
          '&7=' + speedObj.t7;

        var imgSendTimePoint = new Image();
        imgSendTimePoint.src = url + encodeURIComponent(s);

        var outTimer = setTimeout(function () {
          var stayUrl =
            '//report.huatuo.qq.com/report.cgi?appid=20286&platform=unknown&speedparams=',
            _stay = 'flag1=' + pids[0] + '&flag2=' + pids[1] +
            '&flag3=' + pids[
              2] + '&flag5=' + pids[3] + '&8=3000';

          var stayTimePoint = new Image();
          stayTimePoint.src = stayUrl + encodeURIComponent(_stay);
          clearTimeout(outTimer);
        }, 3000);
      }
    }, 60);
  }
}

TGBarba.init({
  index: {
    namespace: 'index',
    onEnter: function () {
      document.documentElement.scrollTop = document.body.scrollTop = 0;
      // $('.strategy-slide').height('auto');
      // $('.strategy-slide .slide-item').height('auto');
      if (!isInit) {
        Barba.Dispatcher.on('newPageReady', function (currentStatus, oldStatus, container) {
          speed_load = new Date();
        });
      }

      isInit = true;

      speed_start = new Date()

      samResize();

      // getScript('ossweb-img/dist/js/index.min.js', function () {
      getScript('//game.gtimg.cn/images/yxzj/m/m201706/dist/js/index.min.js', function () {
        IndexObj.initPopVideo();
        IndexObj.initAd();
        IndexObj.bindEvent();
        IndexObj.getQuickEntry();

        // var scrollTimer = setTimeout(function () {
        IndexObj.initPageScroll();
        // clearTimeout(scrollTimer);
        // }, 100);

        FirstScreen.init();
      })
    },
    onEnterCompleted: function () {
      if (typeof Strategy != 'undefined') {
        Strategy.pageArr = [1, 1, 1, 1, 1];
      }
      speed_all_load = new Date();
      speedReport([21854, 1, 1, 2]);

      document.body.classList.add('index');

      setSite = {
        siteType: "os",
        pageType: "index",
        pageName: "首页",
        stayTime: 0,
        osact: "m",
        project: "base"
      }
      if (typeof (pgvMain) == 'function') pgvMain({
        repeatApplay: "true"
      });

      $(".home_bottom li").removeClass("currentL").eq(0).addClass("currentL");
    },
    onLeave: function () {
      document.body.classList.remove('index');
      $('.index-wrap .section').addScroll(false);
      $('.controller').remove();
      // Strategy.pageArr = [1, 1, 1, 1, 1];
    },
    onLeaveCompleted: function () {

    },
    fadeFrom: {
      marginTop: '300px',
      opacity: 0
    },
    fadeTo: {
      marginTop: 0,
      opacity: 1
    },
    barbaUrl: [
      // 'v2/index',
      // 'v2/strategycenter',
      // 'v2/matchindex',
      '/m/index.shtml',
      '/m/m201706/index.shtml',
      'strategycenter',
      'matchindex'
    ]
  },
  strategycenter: {
    namespace: 'strategycenter',
    onEnter: function () {
      document.documentElement.scrollTop = document.body.scrollTop = 0;
      if (!isInit) {
        Barba.Dispatcher.on('newPageReady', function (currentStatus, oldStatus, container) {
          speed_load = new Date();
        });
      }

      isInit = true;

      speed_start = new Date()

      // getScript('ossweb-img/dist/js/strategycenter.min.js', function () {
      getScript('//game.gtimg.cn/images/yxzj/m/m201706/dist/js/strategycenter.min.js', function () {
        $('#search').val('');
        var newsSearch = new KeywordSearch({
          container: '#search'
        });

        var hero = new HeroStrategy();

        searchChange();

        firstScreen.init();
        initScroll();
      });
    },
    onEnterCompleted: function () {
      if (typeof articlePage != 'undefined') {
        articlePage = [1, 1, 1, 1, 1];
      }

      speed_all_load = new Date();
      speedReport([21854, 1, 5, 2]);
      document.body.classList.add('strategycenter');

      setSite = {
        siteType: "os",
        pageType: "strategycenter",
        pageName: "攻略中心首页",
        project: "base",
        osact: "m"
      }
      if (typeof (pgvMain) == 'function') pgvMain({
        repeatApplay: "true"
      });

      $(".home_bottom li").removeClass("currentL").eq(1).addClass("currentL");
    },
    onLeave: function () {
      document.body.classList.remove('strategycenter');
      $('.strategy-wrap .section').addScroll(false);
      $('.controller').remove();
    },
    onLeaveCompleted: function () {

    },
    fadeFrom: {
      marginTop: '300px',
      opacity: 0
    },
    fadeTo: {
      marginTop: 0,
      opacity: 1
    }
  },
  matchindex: {
    namespace: 'matchindex',
    onEnter: function () {
      document.documentElement.scrollTop = document.body.scrollTop = 0;
      if (!isInit) {
        Barba.Dispatcher.on('newPageReady', function (currentStatus, oldStatus, container) {
          speed_load = new Date();
        });
      }

      isInit = true;

      speed_start = new Date()

      // getScript('//pvp.qq.com/m/m201606/js/activity.js', function () {});
      getScript('//ossweb-img.qq.com/images/js/eas/eas.js', function () {});
      getScript('//ossweb-img.qq.com/images/clientpop/js/tgadshow.min.js', function () {});
      getScript('//game.gtimg.cn/images/yxzj/m/m201706/js/common.js', function () {});

      window.gpmAdProcess = function () {
        var gpmTimer = setTimeout(function () {
          window.tab[0] = new mo.Slide({
            target: Zepto('.match-slide-item.current .ad-slide-item'),
            touchMove: true,
            // autoPlay: true,
            stay: 3000,
            animateTime: 500,
            direction: 'x'
          });
          var currHeight = Zepto('.match-slide-content .match-slide-item').eq(0).height();
          Zepto('.match-slide-content').height(currHeight);

          clearTimeout(gpmTimer);
        }, 0);
      };
    },
    onEnterCompleted: function () {
      speed_all_load = new Date();

      speedReport([21854, 1, 7, 2]);
      document.body.classList.add('matchindex');

      setSite = {
        siteType: "os",
        pageType: "matchindex",
        pageName: "赛事中心",
        osact: "m",
        project: "match"
      }
      if (typeof (pgvMain) == 'function') pgvMain({
        repeatApplay: "true"
      });

      getScript('//game.gtimg.cn/images/yxzj/m/m201706/utf8/matchindex.js', function () {
        // getScript('ossweb-img/utf8/matchindex.js', function () {
        var match = new MatchSlide;

        getScript('//vm.gtimg.cn/tencentvideo/txvlive/2017/txvlive.js', function () {
          createChannel('kpl-slide');
          createChannel('kcc-slide');
        });
      });

      $(".home_bottom li").removeClass("currentL").eq(2).addClass("currentL");
    },
    onLeave: function () {
      document.body.classList.remove('matchindex');
    },
    onLeaveCompleted: function () {

    },
    fadeFrom: {
      marginTop: '300px',
      opacity: 0
    },
    fadeTo: {
      marginTop: 0,
      opacity: 1
    }
  }
})