/**
 * @license jquery-divable v0.1
 * (c) 2015 Pathsofdesign http://www.pathsofdesign.com
 * License: MIT
 */
(function($) { 'use strict';
    $.fn.divable = function(options) {
        var defaults = {
            prefix: 'divable-',
            replaceTags: [ 'thead', 'tbody', 'table', 'tr', 'td', 'th' ],
            replaceWith: 'div'
        }

        var settings = $.extend({}, defaults, options);

        var $element = $(this);

        settings.replaceTags.forEach(function(tag, index) {
            // Add Class to parent element
            if (index == 0) {
                $element.addClass(settings.prefix + $element.prop("tagName").toLowerCase());
            }

            // Add Classes to child elements
            $(tag, $element).addClass(settings.prefix + tag);
            

            // Once the loop is finished run regular expression function to replace tags
            var html = $element[0].outerHTML;
 
            if (index == settings.replaceTags.length - 1) {
                
                settings.replaceTags.forEach(function(tag) {
                    html = replaceTag(html, tag)
                });

                /**
                 * The magic happens here!
                 * Replaces our provided element html with the new html
                 */
                $element[0].outerHTML = html
            }
        });

        /**
         * Replace matches in provided html with tag
         * @param  {String} html
         * @param  {String} tag
         * @return {String}
         */
        function replaceTag(html, tag) {
            var start = new RegExp("<" + tag, 'gi');
                html = html.replace(start, '<' + settings.replaceWith);
            
            var end = new RegExp("</" + tag + ">", 'gi');
                html = html.replace(end, '</' + settings.replaceWith + '>');

            return html
        }
                
    }
})(jQuery);