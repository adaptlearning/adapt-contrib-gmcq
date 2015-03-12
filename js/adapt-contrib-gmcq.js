/*
 * adapt-contrib-gmcq
 * License - https://github.com/adaptlearning/adapt_framework/blob/master/LICENSE
 * Maintainers - Daryl Hedley <darylhedley@gmail.com>, Himanshu Rajotia <himanshu.rajotia@credipoint.com>
 */
define(function(require) {
    var Mcq = require('components/adapt-contrib-mcq/js/adapt-contrib-mcq');
    var Adapt = require('coreJS/adapt');

    var Gmcq = Mcq.extend({

        events: function() {

            var events = {
                'focus .gmcq-item input': 'onItemFocus',
                'blur .gmcq-item input': 'onItemBlur',
                'change .gmcq-item input': 'onItemSelected',
                'keyup .gmcq-item input':'onKeyPress'
            };

            if ($('html').hasClass('ie8')) {

                var ie8Events = {
                    'click label img': 'forceChangeEvent'
                };

                events = _.extend(events, ie8Events);

            }

            return events;

        },

        onItemSelected: function(event) {

            var selectedItemObject = this.model.get('_items')[$(event.currentTarget).parent('.gmcq-item').index()];

            if (this.model.get('_isEnabled') && !this.model.get('_isSubmitted')) {
                this.toggleItemSelected(selectedItemObject, event);
            }

        },

        setupQuestion: function() {
            // Radio button or checkbox
            this.model.set("_isRadio", (this.model.get("_selectable") == 1) );

            this.listenTo(Adapt, 'device:changed', this.resizeImage);

        },

        onQuestionRendered: function() {

            this.resizeImage(Adapt.device.screenSize);

            this.$('label').imageready(_.bind(function() {
                this.setReadyStatus();
            }, this));

        },

        resizeImage: function(width) {

            var imageWidth = width === 'medium' ? 'small' : width;

            this.$('label').each(function(index) {
                var src = $(this).find('img').attr('data-' + imageWidth);
                $(this).find('img').attr('src', src);
            });

        },

        forceChangeEvent: function(event) {

            $("#" + $(event.currentTarget).closest("label").attr("for")).change();

        }

    });

    Adapt.register("gmcq", Gmcq);

    return Gmcq;

});