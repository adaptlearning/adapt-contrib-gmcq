define(function(require) {
    var Mcq = require('components/adapt-contrib-mcq/js/adapt-contrib-mcq');
    var Adapt = require('coreJS/adapt');
    
    var Gmcq = Mcq.extend({

        events: function() {
            var events = {
            'focus .gmcq-item input':'onItemFocus',
            'blur .gmcq-item input':'onItemBlur',
            'change .gmcq-item input':'onItemSelected',
            "click .gmcq-widget .button.submit": "onSubmitClicked",
            "click .gmcq-widget .button.reset": "onResetClicked",
            "click .gmcq-widget .button.model": "onModelAnswerClicked",
            "click .gmcq-widget .button.user": "onUserAnswerClicked",
            }
            if ($('html').hasClass('ie8')) {
                var ie8Events = {
                    'click label img':'forceChangeEvent'
                }
                events = _.extend(events, ie8Events);
            }
            return events;
            
        },

        canReset: function() {
            return !this.$('.gmcq-widget, .button.reset').hasClass('disabled');
        },

        resetItems: function() {
            this.$('.gmcq-item label').removeClass('selected');
            this.$('input').prop('checked', false);
            this.deselectAllItems();
            this.setAllItemsEnabled(true);
        },

        onItemSelected: function(event) {
            var selectedItemObject = this.model.get('items')[$(event.currentTarget).parent('.gmcq-item').index()];
            
            if(this.model.get('_isEnabled') && !this.model.get('_isSubmitted')){
                this.toggleItemSelected(selectedItemObject, event);
            }
        },

        preRender: function() {
            Mcq.prototype.preRender.apply(this);

            this.listenTo(Adapt, 'device:changed', this.resizeImage);
        },

        postRender: function() {
            Mcq.prototype.postRender.apply(this);
            
            this.resizeImage(Adapt.device.screenSize);
        },
                
        resizeImage: function(width) {
            this.$('label').each(function( index ) {
                var src = $(this).find('img').attr('data-' + width);
                $(this).find('img').attr('src', src);
            });       

            this.$('label').imageready(_.bind(function() {
                this.setReadyStatus();
            }, this));
        },
        forceChangeEvent: function(event) {
            $("#" + $(event.currentTarget).closest("label").attr("for")).change();
        }
    });
    
    Adapt.register("gmcq", Gmcq);

    return Gmcq;
    
});