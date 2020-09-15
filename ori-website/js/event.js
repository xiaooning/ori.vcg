 //dropMenu点击事件
 function dropMenuToggle() {
     changeLanguage(appData.language, appData.isColloase);
     $('.dropdown-menu li').each(function(index, ele) {
         $(ele).on('click', function() {
             language = index === 0 ? 'en' : 'zh';
             $('.language').html(index === 0 ? 'English' : '中文');
             appData.language = language;
             changeLanguage(appData.language, appData.isColloase);
             getCaseData('vm1', 'imgList1', 1);
             getCaseData('graphic', 'imgList2', 2);
             getCaseData('vm2', 'imgList3', 3);
         })
     })
 }
 //获取案例数据
 function getCaseData() {
     request({
         type: appData.type,
         lang: appData.language,
         cmd: 'ori.cases.search'
     }).then(function(res) {
         if (res.code === 0) {
             if (res.result) {
                 appData['imageList'] = res.result;
                 imageLazyLoad();
             }
         }
     });

 }

 //切换语言
 function changeLanguage(language, isColloase) {
     $.i18n.properties({
         name: 'Messages',
         path: 'locale/',
         mode: 'both',
         language: language,
         callback: function() {
             if (isColloase) {
                 var str = '';
                 for (var i = 0; i < 5; i++) {
                     var val = $.i18n.prop('aslide_item' + (i + 1));
                     str += '<li class="aside-item">' + val + '</li>'
                 }
                 $('.right ul').html(str);
                 $('.right ul').addClass('animate__animated animate__fadeInDown')
                 $('.right .divide').addClass('animate__animated animate__fadeIn')
             }
             $('.instroduct2').html($.i18n.prop('introduction_des1'));
             $('.instroduct3 .desc4').html($.i18n.prop('introduction_des2'));
             $('#works .work-header .title .t1').html($.i18n.prop('work_title1'));
             $('#works .work-header .title .t2').html($.i18n.prop('work_title2'));
             $('#works .work-header .sub-title').html($.i18n.prop('work_sub_title'));
             $('#works .more').html($.i18n.prop('work_desc'));


             $('#works .profile .profile-name').html($.i18n.prop('profile_name'));
             $('#works .profile .profile-position').html($.i18n.prop('profile_position'));
             $('#works .profile .profile-right').html($.i18n.prop('profile_desc'));
             $('#works').find('.section').each(function(index, ele) {
                 if (index === 0 || index === 2) {
                     $(ele).find('.section-subtitle').eq(0).html($.i18n.prop('work_vm'))
                 } else {
                     $(ele).find('.section-subtitle').eq(0).html($.i18n.prop('work_graphic'))
                 }
             })
             $('#offer .offer-header .sub-title').html($.i18n.prop('offer_title'));
             $('#offer .section .header-title').html($.i18n.prop('offer_subtitle'));
             $('#offer .section .thing-title').html($.i18n.prop('offer_thing_title'));
             $('#offer .things p').each(function(index, ele) {
                 var i = index + 1;
                 $(ele).html('0' + i + ' ' + $.i18n.prop('thing_item' + i))
             })

             $('#offer .offer-list').find('.offer-section').each(function(index, ele) {
                 $(ele).find('.offer-title').eq(0).html($.i18n.prop('offer_plan' + (index + 1)))
                 $(ele).find('.offer-cell').eq(0).find('p').each(function(i, e) {
                     //  console.log($.i18n.prop('offer_plan' + (index + 1) + '_item' + (i + 1)))
                     $(e).html($.i18n.prop('offer_plan' + (index + 1) + '_item' + (i + 1)))
                 })
             })
             $('#approach .title-two').each(function(index, ele) {
                 if (index === 3) {
                     $(ele).html($.i18n.prop('approach_title1'));
                 } else {
                     $(ele).html($.i18n.prop('approach_title'));
                 }

             })
             $('#team .team-left p').eq(1).html($.i18n.prop('team_news_title'));
             $('#team .team-right li').each(function(index, ele) {
                 $(ele).find('p').each(function(i, e) {
                     if (i === 0) {
                         $(e).html($.i18n.prop('team_news_item' + (index + 1)))
                     } else {
                         $(e).html($.i18n.prop('team_news_time' + (index + 1)))
                     }

                 })
             })
             $('.footer .footer-left .title').html($.i18n.prop('footer_title'));
             $('.footer .footer-left .subtitle').html($.i18n.prop('footer_subtitle'));
             $('.modal .modal-body-left .modal-title').html($.i18n.prop('dialog_title'))
             $('.modal .modal-body-right .input-name .label').html($.i18n.prop('dialog_name'))
             $('.modal .modal-body-right .input-name input').attr('placeholder', $.i18n.prop('dialog_placehold_name'))
             $('.modal .modal-body-right .input-email .label').html($.i18n.prop('dialog_email'))
             $('.modal .modal-body-right .input-emailinput').attr('placeholder', $.i18n.prop('dialog_placehold_email'))
             $('.modal .modal-body-right .modal-textarea .label').html($.i18n.prop('dialog_project'))
             $('.modal .modal-body-right .modal-textarea textarea').attr('placeholder', $.i18n.prop('dialog_placehold_project'))
             $('.modal .modal-body-right .modal-submit').html($.i18n.prop('dialog_submit'))

            //  lineWordAnimate('.instroduct2')
         }
     })
 }

 //头部侧边栏点击事件
 function changeAside() {
     var list = ['instroduction', 'works', 'offer', 'approach', 'team'];
     $('.asides ul li').each(function(index, ele) {
         $(ele).on('click', function() {
             $("html,body").animate({ scrollTop: $("#" + list[index]).offset().top }, 1000);
         })
     })
 }

 //图片懒加载
 function imageLazyLoad() {
     var observer = lozad('.lozad', {
         load: function(el) { // 生命周期：加载图片前
             // 需要自定义图片src
             el.src = el.getAttribute('data-src');
         },
         loaded: function(el) { // 加载完毕，实际图片还在pending中，页面还没显示图片
             //  console.log(el.getAttribute('data-name') + '加载完毕(end)')
             //  console.log(el)
         }
     })
     observer.observe() // 加载，如果有新图片加入，再次执行即可
 }

 //元素随着鼠标移动
 function eleMoveByMouse(selector) {
     var cursor = $('.circle');
     //  $(document).mouseover(function(event) {
     //      var x = event.pageX - 15 + 'px';
     //      var y = event.pageY - 15 + 'px';
     //      setTimeout(function() {
     //          $(selector).css({
     //              left: x,
     //              top: y
     //          })
     //      }, 100)
     //  })
     $(window).mousemove(function(event) {
             //  var x = event.pageX - 15 + 'px';
             //  var y = event.pageY - 15 + 'px';

             var x = event.clientX - cursor.width() / 2;
             var y = event.clientY - cursor.height() / 2;
            //  setTimeout(function() {
                 cursor.css({
                     left: x + 'px',
                     top: y + 'px'
                 })
            //  })
         })
         //  $(document).mouseleave(function(event) {
         //      $(selector).css({
         //          left: '-115px',
         //          top: '-115px'
         //      })
         //  })
     $('.footer,.instroduct1-dialog,.modal-submit').mouseenter(function() {
         $('.circle').addClass('circle-footer')
     }).mouseleave(function() {
         $('.circle').removeClass('circle-footer')
     });

     $('.dropdown,a ,li,aside-item,ul,.more,.offer-title,.right,.swiper-pagination,.instroduct1-dialog,.close,.modal-submit')
         .mouseenter(function() {
             cursor.css({
                 transform: 'scale(1.5)',
                 opacity: 0.7,
             });
         })
         .mouseleave(function() {
             cursor.css({
                 transform: 'scale(1)',
                 opacity: 1,
             });
         });
 }

 //窗口滚动事件
 function documentScrollEvent() {
     var isShow = false,
         isShow1 = false;
     $(document).on('scroll', function(event) {
         var scrollTop = $(window).scrollTop();
         var topHeihgt = getElementStyle('.instroduct2');

         if (scrollTop <= topHeihgt) {
             if (!isShow) {
                //  lineWordAnimate('.instroduct2');
                 isShow = true;
             }
         } else {
             isShow = false;
             var topHeihgt1 = getElementStyle('.profile .profile-right');
             if (scrollTop <= topHeihgt1) {
                 //  console.log('.profile-right')
                 if (!isShow1) {
                     lineWordAnimate('.profile .profile-right');
                     isShow1 = true;
                 }
             } else {
                 isShow1 = false;
             }

         }

     })
 }

 function addClass(selector, name) {
     $(selector).removeClass(name)
     $(selector).addClass(name)
 }

 function getElementStyle(selector) {
     return $(selector).offset().top + $(selector).outerHeight();
 }

 //检验邮箱
 function validatedEmail(value) {
     var emailTest = (/^[\w\+\-]+(\.[\w\+\-]+)*@[a-z\d\-]+(\.[a-z\d\-]+)*\.([a-z]{2,4})$/i).test(value);
     return emailTest;
 }

 //解析search
 function searchParse() {
     var resultObj = {};
     var search = window.location.search;
     if (search && search.length > 1) {
         var search = search.substring(1);
         var items = search.split('&');
         for (var index = 0; index < items.length; index++) {
             if (!items[index]) {
                 continue;
             }
             var kv = items[index].split('=');
             resultObj[kv[0]] = typeof kv[1] === "undefined" ? "" : kv[1];
         }
     }
     return resultObj;
 }