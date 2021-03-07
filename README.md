# gun.js

<a href="https://win5do.github.io/gun.js/" target="_blank">Preview LiveDemo</a>

a fullpage scroll plugin for Zepto &amp; jQuery

短小轻快的fullpage滚动插件，适用于zepto和jquery，适用于支持css3的现代浏览器，支持拥有滚轮、上下方向键、及触摸事件，兼容pc端和移动端

## usage

1. 引入zepto或者jquery然后引入gun.js

2. html template
    
    ```html
    <div class="gun-wrap">
        <div class="gun-content">
            <div class="gun-page on"></div>
            <div class="gun-page"></div>
            <div class="gun-page"></div>
            <div class="gun-page"></div>
            <div class="gun-page"></div>
            <div class="gun-page"></div>
            <div class="gun-page"></div>
            <div class="gun-page"></div>
            <div class="gun-page"></div>
        </div>
    </div>
    <!--需要多少页面就写多少个div.gun-page-->
    ```
          
3. 自定义式样
    
    页面大小可自定义，横向滚动需设置容器为flex或float，css请参考gun.css

    ```css
    <!--关键式样-->
    .page-warp {
        overflow: hidden;
    }
    ```

4. 执行下面的一行代码就能愉快的gun了
                        
    ```js
    $('.gun-page').gun();
    // 可以嵌套多个滚动框架，传入不同的clsssName即可
    $('.different').gun();
    ```

5. 个性化设置，给gun()传入option参数;

    ```js
    // option参数可为空，传入制定传入来自定义
    $('.gun-page').gun({time: 800, nav: 'gun-li', landscape: true});
    // option可设置值如下:
        {
            time: 500, // [Number] 滚动动画的时间，默认为500，时间单位为ms；
            nav: 'className', // [String] 导航按钮，默认没有导航菜单；传入导航按钮的className启用，点击切换至对应屏，按钮结构和式样参考demo
            landscape: false // [Boolean] 横向滚动，默认false；横向css需使用float或flex，参考demo
        }
    ```
