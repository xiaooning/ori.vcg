var caseData = {
    imageList: [],
    titleData: {
        vm1: {
            en: {
                title: 'INSTALLATION',
                subtitle: 'AND VM DESIGN'
            },
            zh: {
                title: 'INSTALLATION',
                subtitle: '视觉设计'
            }
        },
        graphic: {
            en: {
                title: 'IDENTITY',
                subtitle: 'AND GRAPHIC DESIGN'
            },
            zh: {
                title: 'INSTALLATION',
                subtitle: '平面设计'
            }
        },
        vm2: {
            en: {
                title: 'INSTALLATION',
                subtitle: 'AND VM DESIGN'
            },
            zh: {
                title: 'INSTALLATION',
                subtitle: '视觉设计'
            }
        },
    }
};
$(document).ready(function() {
    var params = searchParse();
    caseData = Object.assign(caseData, { type: params.type, lang: params.lang });
    eleMoveByMouse('.circle');
    dropMenuToggle(caseData);
    footerIconsModule();
    jumpPlatform()
    getCaseData(caseData);
})

//dropMenu点击事件
function dropMenuToggle(params) {
    var language = params.lang ? params.lang : 'en';
    $('.language').html(language === 'en' ? 'English' : '中文');
    changeLanguage(language);
    $('.dropdown-menu li').each(function(index, ele) {
        $(ele).on('click', function() {
            language = index === 0 ? 'en' : 'zh';
            caseData.lang = language;
            $('.language').html(index === 0 ? 'English' : '中文');
            changeLanguage(language);
            getCaseData(caseData);
        })
    })
}

function changeLanguage(language) {
    $.i18n.properties({
        name: 'Messages',
        path: 'locale/',
        mode: 'both',
        language: language,
        callback: function() {
            var title = caseData['titleData'][caseData.type][caseData.lang]['title'];
            var subtitle = caseData['titleData'][caseData.type][caseData.lang]['subtitle'];
            $('.detail-content .title').eq(0).html(title)
            $('.detail-content .title').eq(1).html(subtitle)
            $('.footer .title').html($.i18n.prop('footer_title'))
            $('.footer .subtitle').html($.i18n.prop('footer_subtitle'))
        }
    })
}

//请求vm1、vm2和graph
function getCaseData(caseData) {
    request({
        type: caseData.type,
        lang: caseData.lang,
        cmd: 'ori.cases.search'
    }).then(function(res) {
        if (res.code === 0) {
            if (res.result) {
                caseData.imageList = res.result;
                loadImage('.detail-content .detail-img .case-list', caseData.imageList);
                imageLazyLoad();
                hadleImageEvent(caseData);
            }
        }
    });
}

//显示图片
function loadImage(selector, array) {
    var imageStr = '';
    for (var i = 0; i < array.length; i++) {
        var imageDOM = "<div class='cell'><img class='lozad' src='./img/filter.png' data-src='" + array[i]['img'] + "'/>";
        var pDOM = "<p>" + array[i]['title'] + '</p></div>'
        var dom = imageDOM + pDOM;
        imageStr += dom;
    }
    $(selector).html(imageStr);
}

//图片点击事件
function hadleImageEvent(caseData) {
    $('.case-list .cell').each(function(index, ele) {
        $(ele).on('click', function() {
            var item = caseData.imageList[index];
            var name = item.name;
            window.open('./caseDetail.html?name=' + name + '&lang=' + caseData.lang, '_blank')
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
    $('.footer .footer-icon li').each(function(index, ele) {
        $(ele).on('mouseenter', function() {
            if (index == 1) {
                $('#footer-icon' + (index + 1)).tooltip('show');
            }
            $(ele).find('span').eq(0).css('color', '#fff');
        })
        $(ele).on('mouseleave', function() {
            if (index == 1) {
                $('#footer-icon' + (index + 1)).tooltip('hide');
            }
            $(ele).find('span').eq(0).css('color', '#999');
        })
    })
}


//底部点击事件
function jumpPlatform() {
    $('.footer .footer-icon li').each(function(index, ele) {
        $(ele).on('click', function(e) {
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
}