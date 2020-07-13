var items = document.getElementsByClassName('item'); //图片
var goPreBtn = document.getElementById('goPre');
var goNextBtn = document.getElementById('goNext');
var points = document.getElementsByClassName('point'); //点
var index = 0; //index表示第几张图片在展示  ---》第index张图片有active这个类名
var time = 0; //定时器跳转参数

//第几个点在展示

var clearActive = function() {
    for (var i = 0; i < items.length; i++) {
        items[i].className = 'item';
    }
    for (var i = 0; i < items.length; i++) {
        points[i].className = 'point'
    }
}
var goIndex = function() {
    clearActive();
    points[index].className = 'point active'
    items[index].className = 'item active';
}
var goNext = function() {
    if (index < 6) {
        index++;

    } else {
        index = 0;
    }

    goIndex();

}
var goPre = function() {
    if (index == 0) {
        index = 6;
    } else {
        index--;
    }
    goIndex();
}
goNextBtn.addEventListener('click', function() {
    time = 0;
    goNext();
})
goPreBtn.addEventListener('click', function() {
    time = 0;
    goPre();
})
for (var i = 0; i < points.length; i++) {
    points[i].addEventListener('click', function() {
        var pointIndex = this.getAttribute('data-index');
        index = pointIndex;

        goIndex();
        time = 0;
    })
}

function swipe(el, options) {
    //设置开关，监听move事件
    var isMove = false;
    // 设置手指触摸开始的坐标
    var startX = 0;
    var startY = 0;
    // 设置手指移动的坐标
    var moveX = 0;
    var moveY = 0;
    //设置指针距离元素的边框的距离
    var disX = 0;
    var disY = 0;
    // 如果用户未传入参数2，自己定义一个
    var data = {
            swipeLeft: function() {},
            swipeRight: function() {},
            swipeDown: function() {},
            swipeUp: function() {},
            drag: function() {}
        }
        // 判断是否传入参数2，有的话覆盖默认值
    Object.assign(data, options);
    // 给元素绑定三个事件
    el.addEventListener('touchstart', function(e) {
        //获取手指开始的坐标
        startX = e.touches[0].pageX;
        startY = e.touches[0].pageY;
        //计算指针距离元素边框的位置
        disX = startX - el.offsetLeft;
        disY = startY - el.offsetTop;
    });
    el.addEventListener('touchmove', function(e) {
        //如果触发了move事件，打开开关
        isMove = true;
        // 获取移动时的坐标
        moveX = e.touches[0].pageX;
        moveY = e.touches[0].pageY;
        e.mation = {
            startX: startX,
            startY: startY,
            moveX: moveX,
            moveY: moveY,
            disX: disX,
            disY: disY
        }
        data.drag.call(el, e);
    });
    el.addEventListener('touchend', function(e) {
        // 判断是否触发了move事件
        if (isMove) {
            // 计算水平边长
            var absX = Math.abs(moveX - startX);
            // 计算垂直边长
            var absY = Math.abs(moveY - startY);
            // 判断垂直还是水平滑动
            if (absX > absY) {
                // console.log('水平滑动');
                //再判断是左滑右滑
                if (moveX - startX > 0) {
                    //data.swipeRight.call(el, e);
                    goPre();
                    time = 0;
                } else {
                    //data.swipeLeft.call(el, e);
                    goNext();
                    time = 0;
                }
            }
        }
        isMove = false;
    });
}
var box = document.querySelector('.list');
swipe(box, {
        swipeLeft: function() {},
        swipeRight: function() {},
        swipeDown: function() {},
        swipeUp: function() {},
        drag: function(e) {
            //给元素设置样式，实现运动
            //goPre();
        }
    })
    //4000ms   跳转一次
setInterval(function() {
    time++;
    if (time == 40) {
        time = 0;
        goNext();

    }
}, 100)