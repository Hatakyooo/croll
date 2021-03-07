(function($) {
    if (typeof $ === 'undefined') {
        throw new Error('require Zepto or jQuery');
    }

    $.fn.gun = function(option) {
        let page = this;
        let $content = this.parent();
        let onScroll = false;
        let onIndex = 1;
        // 初始化option
        if (!option || $.isEmptyObject(option)) {
            option = {
                time: 500,
                nav: null,
                landscape: false
            }
        }

        if (!option.time) {
            option.time = 500;
        }
        option.class = $(this).selector;
        option.pages = $(this).length;

        function preventCombo() {
            // 滚动后设置一个倒计时 防止频繁出发滚动事件
            if (!onScroll) {
                onScroll = true;
                setTimeout(function() {
                    onScroll = false;
                }, option.time);
                return false;
            } else {
                return true;
            }
        }

        function setMtAndOn() {
            // 通过onIndex的值来设置content的translate值

            function currentOn(className) {
                // 给当前所在屏加上class——on
                $(className).removeClass('on');
                $(className).eq(onIndex - 1).addClass('on');
                console.log(className);
            }

            let mt = 0;
            mt = (onIndex - 1) * -100;
            $($content).css({
                'transition': 'all ' + option.time / 1000 + 's ease'
            });
            // 横竖判断
            if (option.landscape) {
                $($content).css({
                    'transform': 'translateX(' + mt + '%)'
                });
            } else {
                $($content).css({
                    'transform': 'translateY(' + mt + '%)'
                });
            }

            setTimeout(function() {
                currentOn(option.class);
                if (option.nav) {
                    currentOn('.' + option.nav);
                }
            }, option.time);
        }

        function deriection(event) {
            if (preventCombo()) {
                return false;
            };

            event = event || window.event;
            let delta = event.wheelDelta || -event.detail;
            let plusKey = option.landscape ? 39 : 40;
            let minusKey = option.landscape ? 37 : 38;
            // 滚轮向下滚动event.wheelDelta为负
            if (delta < 0 || event.keyCode === plusKey) {
                if (onIndex < option.pages) {
                    onIndex++;
                }
            }
            // 滚轮向上滚动event.wheelDelta为正
            else if (delta > 0 || event.keyCode === minusKey) {
                if (onIndex > 1) {
                    onIndex--;
                }
            }
            setMtAndOn();
        }

        // 滚轮事件绑定在容器上
        $content.on('mousewheel DOMMouseScroll', function(event) {
            event.stopPropagation();
            deriection(event);
        });

        // 键盘事件
        $(document).on('keyup', deriection);

        $('.' + option.nav).each(function(index) {
            $(this).click(function(event) {
                event.stopPropagation();
                onIndex = index + 1;
                setMtAndOn();
            })
        });

        (function swipe() {
            function slideDirect(dX, dY) {
                // 判断滑动方向  注意移动是与滑动相反的方向　左滑应该右移 
                var abs = Math.abs(dX) - Math.abs(dY);
                var width = $(window).width();
                var height = $(window).height();
                if (Math.abs(dX) / width < 0.1 && Math.abs(dY) / height < 0.1) {
                    // 没有滑动
                    return 0;
                } else if (abs > 0) {
                    if (dX > 0) {
                        // 右滑
                        return 1;
                    } else {
                        // 左滑
                        return -1;
                    }
                } else {
                    if (dY > 0) {
                        // 下滑
                        return 2;
                    } else {
                        // 上滑
                        return -2;
                    }
                }
            }
            // 移动端滑动事件
            var startX = 0;
            var startY = 0;
            var endX = 0;
            var endY = 0;

            $content.on({
                'touchmove': function(event) {
                    event.preventDefault();
                },
                'touchstart': function(event) {
                    startX = event.touches[0].clientX;
                    startY = event.touches[0].clientY;
                },
                'touchend': function(event) {
                    event.stopPropagation();
                    if (preventCombo()) {
                        return false;
                    };

                    endX = event.changedTouches[0].clientX;
                    endY = event.changedTouches[0].clientY;
                    var dX = endX - startX;
                    var dY = endY - startY;
                    switch (slideDirect(dX, dY)) {
                        case -1:
                            // 没有break 如果横向向下执行     
                            if (!option.landscape) {
                                return;
                            }
                        case -2:
                            if (onIndex < option.pages) {
                                onIndex++;
                            }
                            break;
                        case 1:
                            if (!option.landscape) {
                                return;
                            }
                        case 2:
                            if (onIndex > 1) {
                                onIndex--;
                            }
                            break;
                    }
                    setMtAndOn();
                }
            });
        })();

        return this;
    }

})($);

// run
var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-36251023-1']);
_gaq.push(['_setDomainName', 'jqueryscript.net']);
_gaq.push(['_trackPageview']);

(function() {
    var ga = document.createElement('script');
    ga.type = 'text/javascript';
    ga.async = true;
    ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(ga, s);
})();
//
$('.gun-page').gun({
    nav: 'gun-li'
});
$('.gun-page2').gun({
    landscape: true
});