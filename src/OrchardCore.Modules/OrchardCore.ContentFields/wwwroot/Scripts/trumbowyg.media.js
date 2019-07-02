/*
** NOTE: This file is generated by Gulp and should not be edited directly!
** Any changes made directly to this file will be overwritten next time its asset group is processed by Gulp.
*/

(function ($) {
    'use strict';

    $.extend(true, $.trumbowyg, {
        langs: {
            en: {
                insertImage: 'Insert Media'
            }
        },
        plugins: {
            insertImage: {
                init: function (trumbowyg) {
                    var btnDef = {
                        fn: function () {
                            trumbowyg.saveRange();
                            $("#mediaApp").detach().appendTo('#mediaModalHtmlField .modal-body');
                            $("#mediaApp").show();
                            mediaApp.selectedMedias = [];
                            var modal = $('#mediaModalHtmlField').modal();
                            $('#mediaHtmlFieldSelectButton').on('click', function (v) {
                                trumbowyg.restoreRange();
                                trumbowyg.range.deleteContents();
                                for (i = 0; i < mediaApp.selectedMedias.length; i++) {
                                    //mediaBodyContent += ' {{ "' + mediaApp.selectedMedias[i].mediaPath + '" | asset_url | img_tag }}';
                                    var node = document.createElement("img");
                                    node.setAttribute("src", "/media/"+mediaApp.selectedMedias[i].mediaPath);
                                    node.classList.add("img-fluid", "rounded");
                                    trumbowyg.range.insertNode(node);
                                }
                                trumbowyg.syncTextarea();
                                $(document).trigger('contentpreview:render');
                                $('#mediaModalHtmlField').modal('hide');
                                return true;
                            });
                        }
                    };

                    trumbowyg.addBtnDef('insertImage', btnDef);
                }
            }
        }
    });
})(jQuery);