;(function (win, undefined) {

    function slideXFn(el, optins) {
        this.config = {
            index: 0,
            speed: 2000,
            timer: null,
            type: 'default'
        };
        this.box = document.querySelector(el);
        this.netxBtn = this.box.querySelector('.next');
        this.prevBtn = this.box.querySelector('.prev');
        this.slideXContent = this.box.querySelector('.slideX-content');
        this.imgsLis = this.slideXContent.querySelectorAll('li');
        this.icons = this.box.querySelector('.icon');
        this.len = this.imgsLis.length;
        this.w = this.imgsLis[0].clientWidth;

        if (typeof optins !== 'undefined') {
            this.config = this.extend(this.config, optins);
        }
    }

    slideXFn.prototype = {
        constructor: slideXFn,
        init: function () {
            var _that = this;
            this.circle();
            if (this.config.type != 'default') {
                this.moveJG();
            }
            this.moveEv();
        },
        /*事件*/
        moveEv: function () {
            var _that = this;
            var iconsList = this.icons.children;
            this.auto();
            this.slideXContent.addEventListener('mouseover', function () {
                clearInterval(_that.config.timer);
            });
            this.slideXContent.addEventListener('mouseout', function () {
                _that.auto();
            });
            this.netxBtn.addEventListener('click', function () {
                var index = _that.next();
                clearInterval(_that.config.timer);
                _that.iconActive(index);
                switch (_that.config.type) {
                    case 'default':
                        _that.typeDefault(index);
                        break;
                    case 'move':
                        _that.typeMoveR(index);
                        break;
                }
            });
            this.prevBtn.addEventListener('click', function () {
                clearInterval(_that.config.timer);
                _that.core(_that.prev());
            });
            for (var i = 0; i < iconsList.length; i++) {
                (function (n) {
                    iconsList[n].addEventListener('click', function () {
                        clearInterval(_that.config.timer);
                        _that.core(n);
                    });
                })(i)
            }
        },
        /*上翻对应的index*/
        next: function () {
            this.config.index--;
            if (this.config.index < 0) {
                this.config.index = this.len - 1;
            }
            return this.config.index;
        },
        /*下翻对应的index*/
        prev: function () {
            this.config.index++;
            if (this.config.index > this.len - 1) {
                this.config.index = 0;
            }
            return this.config.index;
        },
        /*move形式*/
        typeMove: function (index) {
            var _that = this;
            this.slideXContent.style.transition = '0.5s';
            this.slideXContent.style.transform = 'translateX(-' + this.w * (index + 1) + 'px)';
            if (index == this.len - 1) {
                setTimeout(function () {
                    _that.slideXContent.style.transition = 'none';
                    _that.slideXContent.style.transform = 'translateX(0)';
                }, 500);
            }
        },
        typeMoveR: function (index) {
            var _that = this;
            if (index == this.len - 1) {
                this.slideXContent.style.transition = '0.5s';
                this.slideXContent.style.transform = 'translateX(0)';
                setTimeout(function () {
                    _that.slideXContent.style.transition = 'none';
                    _that.slideXContent.style.transform = 'translateX(-' + _that.w * (_that.len ) + 'px)';
                }, 500)
            } else {
                this.slideXContent.style.transition = '0.5s';
                this.slideXContent.style.transform = 'translateX(-' + this.w * (index + 1) + 'px)';
            }
        },
        /*默认形式*/
        typeDefault: function (index) {
            for (var i = 0; i < this.len; i++) {
                this.imgsLis[i].style.display = 'none';
            }
            this.imgsLis[index].style.display = 'block';
        },
        /*运动形式初始化*/
        core: function (index) {
            this.iconActive(index);
            switch (this.config.type) {
                case 'default':
                    this.typeDefault(index);
                    break;
                case 'move':
                    this.typeMove(index);
                    break;
            }
        },
        /*自动播放*/
        auto: function () {
            var self = this;
            clearInterval(this.config.timer);
            this.config.timer = setInterval(function () {
                self.core(self.prev());
            }, this.config.speed);
        },
        /*圆点*/
        circle: function () {
            var iconLi = '';
            for (var i = 0; i < this.len; i++) {
                if (i == 0) {
                    iconLi += '<li class="active"></li>';
                } else {
                    iconLi += '<li></li>';
                }

            }
            this.icons.innerHTML = iconLi;
        },
        iconActive: function (index) {
            var iconsList = this.icons.children;
            for (var i = 0; i < iconsList.length; i++) {
                iconsList[i].className = '';
            }
            iconsList[index].className = 'active';
        },
        moveJG: function () {
            var firstChild = this.imgsLis[this.len - 1].cloneNode(true),
                lastChild = this.imgsLis[0].cloneNode(true);
            this.slideXContent.insertBefore(firstChild, this.imgsLis[0]);
            this.slideXContent.appendChild(lastChild);
            this.slideXContent.style.width = (this.len + 2) * 100 + '%';
            this.slideXContent.style.transform = 'translateX(-' + this.w + 'px)';
        },
        extend: function (obj1, obj2) {
            var o = obj1;
            for (var attr in obj2) {
                if (typeof obj2[attr] === 'object') {
                    o[attr] = extend({}, obj2[attr]);
                } else {
                    o[attr] = obj2[attr];
                }
            }
            return o;
        }
    };

    win.slideX = function (el, options) {
        return new slideXFn(el, options).init();
    };


})(window, undefined);