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
        }
    });
    
    Adapt.register("gmcq", Gmcq);

    return Gmcq;
    
});