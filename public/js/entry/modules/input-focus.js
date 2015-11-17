define(['jquery'], function($) {
    function InputFocus(input, info) {
        this.input = input;
        this.input.on({
            focus: function() {
                if (window.jQuery) {
                    lib = 'jQuery';
                }
                if (window.Zepto) {
                    lib = 'Zepto';
                }                
                if (sameContent(this, info)) {
                    $(this).val('');
                }
            },
            blur: function() {
                if (isNull(this)) {
                    $(this).val(info);
                }
            }
        })
    }

    function sameContent(input, info) {
        var content = $(input).val().trim();
        if (content === info) return true;
        else return false;
    }

    function isNull(input) {
        var content = $(input).val().trim();
        if (content == '' || content.length === 0) return true;
        else return false;
    }
    $.fn.extend({
        inputFocus: function(info) {
            return this.each(function() {

                new InputFocus($(this), info);
            })
        }
    })

})
