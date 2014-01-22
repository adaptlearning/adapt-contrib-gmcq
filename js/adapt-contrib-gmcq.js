define(function(require) {
    var Mcq = require('components/adapt-contrib-mcq/js/adapt-contrib-mcq');
    var Adapt = require('coreJS/adapt');
    
    var Gmcq = Mcq.extend({

        events: {
            'focus .gmcq-item input':'onItemFocus',
            'blur .gmcq-item input':'onItemBlur',
            'change .gmcq-item input':'onItemSelected',
            "click .gmcq-widget .button.submit": "onSubmitClicked",
            "click .gmcq-widget .button.reset": "onResetClicked",
            "click .gmcq-widget .button.model": "onModelAnswerClicked",
            "click .gmcq-widget .button.user": "onUserAnswerClicked"
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
            this.listenTo(Adapt, 'device:changed', this.resizeImage);
        },

        postRender: function() {
            this.resizeImage(Adapt.device.screenSize);
        },

        inview: function(event, visible) {
            if (visible) {
                this.setCompletionStatus();
            }
        },
        
        resizeImage: function(width) {

            this.$('label').each(function( index ) {
              var src = $(this).find('img').attr('data-' + width);
              $(this).find('img').attr('src', src);
            });       

            this.$('label').imageready(_.bind(function() {
                this.setReadyStatus();
            }, this));
        }
    });
    
    Adapt.register("gmcq", Gmcq);

    return Gmcq;
    
});