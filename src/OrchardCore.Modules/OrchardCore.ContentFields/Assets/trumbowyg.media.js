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
                                //the code below insert liquid tag for images, can't show properly when filtered by | raw.
                                //var mediaBodyContent = "";
                                //for (i = 0; i < mediaApp.selectedMedias.length; i++) {
                                //    mediaBodyContent += ' {{ "' + mediaApp.selectedMedias[i].mediaPath + '" | asset_url | img_tag }}';
                                //}
                                //var node = document.createTextNode(mediaBodyContent);
                                //trumbowyg.restoreRange();
                                //trumbowyg.range.deleteContents();
                                //trumbowyg.range.insertNode(node);

                                //Insert <img> html element instead.
                                trumbowyg.restoreRange();
                                trumbowyg.range.deleteContents();
                                for (i = 0; i < mediaApp.selectedMedias.length; i++) {
                                    //mediaBodyContent += ' {{ "' + mediaApp.selectedMedias[i].mediaPath + '" | asset_url | img_tag }}';
                                    var node = document.createElement("img");
                                    node.setAttribute("src", "/media/" + mediaApp.selectedMedias[i].mediaPath);
                                    node.classList.add("img-fluid","rounded");
                                    trumbowyg.range.insertNode(node);
                                }
                                ////////////////////////////////////////////
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