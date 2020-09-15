$(document).ready(function () {
    init();
})

function init() {
    eleMoveByMouse('.circle');
    documentScrollEvent();
    dropMenuToggle();
    submitFeedback();
    asideEvent()
    // lineWordAnimate('.instroduct2');
    getCaseData('vm1', 'imgList1', 1);
    getCaseData('graphic', 'imgList2', 2);
    getCaseData('vm2', 'imgList3', 3);
    lineWordAnimate('.profile .profile-right');
    // lineWordAnimate('#team .news-title');
    // lineWordAnimate('#team .news-time');
    loadOfferList();
    jumpPlatform();
    swiper();
    handleMoreEvent();
    footerIconsModule();
}

function asideEvent() {
    var dom = document.getElementsByClassName('right')[0];
    dom.addEventListener('click', function (e) {
        console.log(e)
        appData.isColloase = !appData.isColloase;
        if (appData.isColloase) {
            changeLanguage(appData.language, appData.isColloase);
            changeAside();
        } else {
            $('.right ul').removeClass('animate__animated animate__fadeInDown')
            $('.right .divide').removeClass('animate__animated animate__fadeIn')
            $('.right .divide').addClass('animate__animated animate__slideInUp')
            $('.right ul').html('');
        }
    }, false)
    // $('.right').on('click', function(e) {
    //     e.preventDefault();
    //     e.stopPropagation();
    //     appData.isColloase = !appData.isColloase;
    //     if (appData.isColloase) {
    //         changeLanguage(appData.language, appData.isColloase);
    //         changeAside();
    //     } else {
    //         $('.right ul').removeClass('animate__animated animate__fadeInDown')
    //         $('.right .divide').removeClass('animate__animated animate__fadeIn')
    //         $('.right .divide').addClass('animate__animated animate__slideInUp')
    //         $('.right ul').html('');
    //     }

    // })
}

function changeAside() {
    var list = ['instroduct', 'works', 'offer', 'approach', 'team'];
    $('.aside-item').each(function (index, ele) {
        $(ele).on('click', function (e) {
            e.preventDefault();
            e.stopPropagation();
            var top = 0;
            if (index === 0) {
                top = 0
            } else {
                top = $("#" + list[index]).offset().top - 200;
            }
            $("html,body").animate({ scrollTop: top }, 1000);
        })
    })
}

//文字以行动画形式展示
function lineWordAnimate(selector) {
    var mySplitText = new SplitText($(selector), { type: "lines" });
    var splitTextTimeline = new TimelineLite();
    splitTextTimeline.staggerFrom(mySplitText.lines, 1, { opacity: 0, rotationX: -120, force3D: true, transformOrigin: "top center -150" }, 0.3);
}

//显示图片
function loadImage(selector, array, index) {
    var imageStr = '';
    var realH = calculateImageStyle();
    for (var i = 0; i < array.length; i++) {
        var imageDOM = "<div class='cell' data-index=" + i + "><img class='lozad' style='height:'" + realH + "px src='./img/filter.png' data-src='" + array[i]['img'] + "'/>";
        var pDOM = "<p>" + array[i]['title'] + '</p></div>'
        var dom = imageDOM + pDOM;
        imageStr += dom;
    }
    $(selector).html(imageStr);
    hadleImageEvent(selector, array);

}

function calculateImageStyle() {
    var w = 480,
        h = 420;
    var containerW = $('#works .work-grid').width();
    var realW = containerW / 3 * 0.8;
    var rate = w / realW;
    var realH = h * rate;
    return realH;
}

//加载offer列表
function loadOfferList() {
    var selectIndex = appData.offerListIndex;
    var data = appData.offerList[selectIndex];
    var dom = $('.offer-section-head').eq(selectIndex).siblings();
    var list = data.list;
    for (var i = 0; i < list.length; i++) {
        (function () {
            $(dom).append("<p class='wow animate__fadeInUp'>0" + (i + 1) + " " + list[i] + "</p>");
            setTimeout(function () { }, 100)
        })(i)
    }
    $('.offer-section-head').each(function (i, ele) {
        var data = appData.offerList[i];
        $('.offer-section-head').eq(i).find('.offer-title').eq(0).html(data.title)
        $(ele).on('click', function () {
            var _this = this;
            $('.offer-section-head').each(function (i, ele) {
                if (_this === ele) {
                    appData.offerListIndex = i;
                    var selectIndex = appData.offerListIndex;
                    var data = appData.offerList[selectIndex];
                    $(ele).find('.offer-circle').eq(0).addClass('circle-active');
                    $(ele).find('.offer-title').eq(0).addClass('title-active');
                    $(ele).siblings().addClass('cell-active');
                    var dom = $(ele).siblings();
                    $(dom).html('')
                    var list = data.list;
                    for (var j = 0; j < list.length; j++) {
                        (function () {
                            $(dom).append("<p class='animate__animated animate__fadeInUp'>0" + (j + 1) + " " + $.i18n.prop('offer_plan' + (i + 1) + '_item' + (j + 1)) + "</p>");
                            setTimeout(function () { }, 100)
                        })(j)
                    }
                } else {
                    $(ele).find('.offer-circle').eq(0).removeClass('circle-active');
                    $(ele).find('.offer-title').eq(0).removeClass('title-active');
                    $(ele).siblings().removeClass('cell-active')
                }

            })
        })
    })


}

//底部点击事件
function jumpPlatform() {
    $('.footer .footer-icon li').each(function (index, ele) {
        $(ele).on('click', function (e) {
            if (index != 1) {
                $('#footer-icon' + (index + 1)).tooltip('hide');
                var url = e.currentTarget.dataset.url;
                window.open(url, '_blank');
            } else {
                var width = $(window).innerWidth();
                if (width <= 768) {
                    $('#footer-icon' + (index + 1)).tooltip('show');
                    setTimeout(() => {
                        $('#footer-icon' + (index + 1)).tooltip('hide');
                    }, 3000)
                }
            }
        })
    })

    $('.modal .modal-dialog .modal-body .modal-icon li').each(function (index, ele) {
        $(ele).on('click', function (e) {
            if (index != 1) {
                $('#icon' + (index + 1)).tooltip('hide');
                var url = e.currentTarget.dataset.url;
                window.open(url, '_blank');
            } else {
                var width = $(window).innerWidth();
                if (width <= 768) {
                    $('#icon' + (index + 1)).tooltip('show');
                    setTimeout(() => {
                        $('#icon' + (index + 1)).tooltip('hide');
                    }, 3000)
                }

            }

        })
    })
}

function swiper() {
    var mySwiper = new Swiper('.swiper-container', {
        direction: 'vertical',
        // effect: 'fade',
        grabCursor: true,
        mousewheel: true,
        loop: false,
        cubeEffect: {
            shadow: true,
            slideShadows: true,
            shadowOffset: 100,
            shadowScale: 0.94,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
            // bulletClass: 'my-bullet',
            // bulletActiveClass: 'my-bullet-active',
            // observer: true,

        },
        on: {
            slideChangeTransitionEnd: function () {
                // alert(this.activeIndex); //切换结束时，告诉我现在是第几个slide
                // mySwiper.update();
                // console.log(this.activeIndex)
                if (this.activeIndex === 0) {

                } else if (this.activeIndex === 1) {
                    var str1 = "<img src='./img/approach.png'></img>";
                    var str2 = "<img src='./img/approach3.png' class='top-text animate__animated animate__fadeInDown'>";
                    var str3 = "<img src='./img/approach4.png' class='middle-text animate__animated animate__fadeIn'>";
                    var str4 = " <img src='./img/approach5.png' class='bottom-text animate__animated animate__fadeInDown'>";
                    var str5 = "<div>Ori Approach Structure Over Pyramid </div>";
                    var str = str1 + str2 + str3 + str4 + str5;
                    $('#approach #swiper-slide-two .cont-box').html(str)
                } else if (this.activeIndex === 2) {
                    var str1 = "<img src='./img/approach.png'></img>";
                    var str2 = "<img src='./img/approach3.png' class='top-text animate__animated animate__fadeIn'>";
                    var str3 = "<img src='./img/approach4.png' class='middle-text animate__animated animate__fadeIn'>";
                    var str4 = "<img src='./img/approach5.png' class='bottom-text animate__animated animate__fadeIn'>";
                    var str5 = "<img src='./img/arrow1.png' class='left-top-arrow animate__animated animate__fadeIn'>";
                    var str6 = "<img src='./img/arrow2.png' class='left-middle-arrow animate__animated animate__fadeIn'>";
                    var str7 = "<img src='./img/arrow3.png' class='left-bottom-arrow animate__animated animate__fadeIn'>";
                    var str8 = "<img src='./img/arrow4.png' class='right-arrow animate__animated animate__fadeIn'>";
                    var str9 = "<img src='./img/text1.png' class='left-top-text animate__animated animate__fadeInDown'>";
                    var str10 = "<img src='./img/text2.png' class='left-middle-text animate__animated animate__fadeInDown'>";
                    var str11 = "<img src='./img/text3.png' class='left-bottom-text animate__animated animate__fadeInDown'>";
                    var str12 = "<img src='./img/text4.png' class='right-text animate__animated animate__fadeInDown'>";
                    var str13 = "<div style='margin-top:.12rem;'>Ori Approach Structure Over Pyramid </div>";
                    var str = str1 + str2 + str3 + str4 + str5 + str6 + str7 + str8 + str9 + str10 + str11 + str12 + str13;
                    $('#approach #swiper-slide-three .cont-box').html(str)
                } else if (this.activeIndex === 3) {
                    var str1 = "<img src='./img/approach.png' class='main-img'></img>";
                    var str2 = "<img src='./img/approach3.png' class='top-text animate__animated animate__fadeIn'>";
                    var str3 = "<img src='./img/approach4.png' class='middle-text animate__animated animate__fadeIn'>";
                    var str4 = "<img src='./img/approach5.png' class='bottom-text animate__animated animate__fadeIn'>";
                    var str5 = "<img src='./img/arrow6.png' class='top-arrow animate__animated animate__fadeIn'>";
                    var str6 = "<img src='./img/arrow5.png' class='middle-arrow animate__animated animate__fadeIn'>";
                    var str7 = "<img src='./img/arrow7.png' class='bottom-arrow animate__animated animate__fadeIn'>";
                    var str8 = "<img src='./img/leader1.png' class='top-leader animate__animated animate__fadeInDown'>";
                    var str9 = "<img src='./img/leader2.png' class='bottom-leader animate__animated animate__fadeInDown'>";
                    var str = str1 + str2 + str3 + str4 + str5 + str6 + str7 + str8 + str9;
                    $('#approach #swiper-slide-four .left-team').html(str)
                }
            },
        },
    })
}

//用户留言
function submitFeedback() {
    $('#myModal').on('show.bs.modal', function () {
        $('.instroduct1-dialog').css('display', 'none');
    })
    $('#myModal').on('hidden.bs.modal', function () {
        $('.instroduct1-dialog').css('display', 'block');
    })
    var name = '';
    var email = '';
    var project = '';
    var message = '';
    $('.name').on('input', function (e) {
        name = e.target.value;
    })
    $('.email').on('input', function (e) {
        email = e.target.value;
    })
    $('.project').on('input', function (e) {
        project = e.target.value;
    })

    $('.modal-submit').on('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        if (name.length === 0) {
            if (appData.language === 'en') {
                message = 'Please input your name!'
            } else {
                message = '请输入您的名字!'
            }
            $.growl.error({
                title: "",
                message: message
            });
            return;
        } else if (email.length === 0) {
            if (appData.language === 'en') {
                message = 'Please input your  email!'
            } else {
                message = '请输入您的邮箱!'
            }
            $.growl.error({
                title: "",
                message: message
            });
            return;
        } else if (!validatedEmail(email)) {
            if (appData.language === 'en') {
                message = 'Please input your correct email!'
            } else {
                message = '请输入您正确的邮箱!'
            }
            $.growl.error({
                title: "",
                message: message
            });
            return;
        } else if (project.length === 0) {
            if (appData.language === 'en') {
                message = 'Please input your project!'
            } else {
                message = '请输入您项目!'
            }
            $.growl.error({
                title: "",
                message: message
            });
            return;
        } else {
            request({
                cmd: 'ori.contact.insert',
                name: name,
                email: email,
                project: project
            }).then(function (res) {
                if (res.code === 0) {
                    $('#myModal').modal('hide');
                }
            })
        }

    })
}

function handleMoreEvent() {
    $('#works .section').each(function (index, ele) {
        $(ele).find('.section-right').eq(0).on('click', function (e) {
            var type = e.currentTarget.dataset.type;
            window.open('./case.html?type=' + type + '&lang=' + appData.language, '_blank')
        })
    })
}


//底部icon切换
function footerIconsModule() {
    var width = $(window).innerWidth();
    if (width <= 768) {
        return;
    }
    var list = ['./img/sina', './img/wechat', './img/bili', './img/tokit']
    $('.footer .footer-icon li').each(function (index, ele) {
        $(ele).on('mouseenter', function () {
            if (index == 1) {
                $('#footer-icon' + (index + 1)).tooltip('show');
            }
            $(ele).find('span').eq(0).css('color', '#fff');
        })
        $(ele).on('mouseleave', function () {
            if (index == 1) {
                $('#footer-icon' + (index + 1)).tooltip('hide');
            }
            $(ele).find('span').eq(0).css('color', '#999');
        })
    })
    $('.modal .modal-body .modal-icon li').each(function (index, ele) {
        $(ele).on('mouseenter', function () {
            if (index == 1) {

                $('#icon' + (index + 1)).tooltip('show');
            }
            $(ele).find('span').eq(0).css('color', '#000');
        })
        $(ele).on('mouseleave', function () {
            if (index == 1) {
                $('#icon' + (index + 1)).tooltip('hide');
            }
            $(ele).find('span').eq(0).css('color', '#999');
        })
    })
}


//请求vm1、vm2和graph
function getCaseData(type, name, index) {
    request({
        type: type,
        lang: appData.language,
        cmd: 'ori.cases.search'
    }).then(function (res) {
        if (res.code === 0) {
            if (res.result) {
                appData[name] = res.result;
                loadImage('#works .image' + index, appData[name], index);
                imageLazyLoad();
                // loadImage('#works .image2', appData.imgList2);
                // loadImage('#works .image3', appData.imgList3);
            }
        }
    });
}


//图片点击事件
function hadleImageEvent(selector, array) {
    $(selector).find('.cell').each(function (index, ele) {
        $(ele).on('click', function () {
            var item = array[index];
            var name = item.name;
            window.open('./caseDetail.html?name=' + name + '&lang=' + appData.language, '_blank')
        })
    })
}