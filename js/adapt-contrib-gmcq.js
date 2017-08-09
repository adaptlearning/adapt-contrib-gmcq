define([
    'coreJS/adapt',
    'components/adapt-contrib-mcq/js/adapt-contrib-mcq'
], function(Adapt, Mcq) {

    var Gmcq = Mcq.view.extend({

        events: {
            'focus .gmcq-item input': 'onItemFocus',
            'blur .gmcq-item input': 'onItemBlur',
            'change .gmcq-item input': 'onItemSelected',
            'keyup .gmcq-item input': 'onKeyPress'
        },

        onItemSelected: function(event) {

            var selectedItemObject = this.model.get('_items')[$(event.currentTarget).parent('.gmcq-item').index()];

            if (this.model.get('_isEnabled') && !this.model.get('_isSubmitted')) {
                this.toggleItemSelected(selectedItemObject, event);
            }

        },

        setupQuestion: function() {
            Mcq.view.prototype.setupQuestion.call(this);

            this.listenTo(Adapt, {
                'device:changed': this.resizeImage,
                'device:resize': this.onDeviceResize
            });

        },

        onQuestionRendered: function() {

            this.resizeImage(Adapt.device.screenSize);
            this.setUpColumns();

            this.$('label').imageready(_.bind(function() {
                this.setReadyStatus();
            }, this));

        },
        
        onDeviceResize: function() {
            this.setUpColumns();
        },

        resizeImage: function(width) {

            var imageWidth = width === 'medium' ? 'small' : width;

            this.$('label').each(function(index) {
                var src = $(this).find('img').attr('data-' + imageWidth);
                $(this).find('img').attr('src', src);
            });

        },

        setUpColumns: function() {
            var columns = this.model.get('_columns');

            if (!columns) return;

            if (Adapt.device.screenSize === 'large') {
                this.$el.addClass('gmcq-column-layout');
                this.$('.gmcq-item').css('width', (100 / columns) + '%');
            } else {
                this.$el.removeClass('gmcq-column-layout');
                this.$('.gmcq-item').css('width', '');
            }
        }

    }, {
        template: 'gmcq'
    });

    return Adapt.register("gmcq", {
        view: Gmcq,
        model: Mcq.model.extend({})
    });

});
