var caseDetaiData = {
    detailData: null
}
$(document).ready(function() {
    var params = searchParse();
    caseDetaiData = Object.assign(caseDetaiData, params);
    eleMoveByMouse('.circle');
    dropMenuToggle(caseDetaiData);
    footerIconsModule();
    jumpPlatform();
    getCaseDetail(caseDetaiData);
})

//dropMenu点击事件
function dropMenuToggle(params) {
    var language = params.lang ? params.lang : 'en';
    $('.language').html(language === 'en' ? 'English' : '中文');
    changeLanguage(language);
    $('.dropdown-menu li').each(function(index, ele) {
        $(ele).on('click', function() {
            language = index === 0 ? 'en' : 'zh';
            caseDetaiData.lang = language;
            $('.language').html(index === 0 ? 'English' : '中文');
            changeLanguage(language);
            getCaseDetail(caseDetaiData);
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
            $('.case-detail .case-title').html($.i18n.prop('case_detail_h1'))
            $('.footer .title').html($.i18n.prop('footer_title'))
            $('.footer .subtitle').html($.i18n.prop('footer_subtitle'))
        }
    })
}

//请求vm1、vm2和graph
function getCaseDetail(caseDetaiData) {
    request({
        name: caseDetaiData.name,
        lang: caseDetaiData.lang,
        cmd: 'ori.case.get'
    }).then(function(res) {
        if (res.code === 0) {
            if (res.result) {
                caseDetaiData.detailData = res.result;
                $('.case-detail .case-title').html(caseDetaiData.detailData.title);
                $('.case-detail .section-header img').attr('src', caseDetaiData.detailData.img);
                $('.case-detail .section-header-title').html(caseDetaiData.detailData.abstract);
                var width = document.body.clientWidth;
                if (width <= 768) {
                    if (caseDetaiData.detailData.phonecontent) {
                        $('.case-detail .section-body').html(caseDetaiData.detailData.phonecontent);
                    }
                } else {
                    if (caseDetaiData.detailData.content) {
                        $('.case-detail .section-body').html(caseDetaiData.detailData.content);
                    }
                }

            }
        }
    });
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