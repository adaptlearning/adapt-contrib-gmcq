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

        setUpColumns: function() {
            var columns = this.model.get('_columns');

        	if (!columns) return;

            if (Adapt.device.screenSize === 'large') {
                var itemWidth = 100 / columns;

                this.$('.gmcq-item').css({
                    width: itemWidth + '%'
                });
                this.setItemLayout();
            } else {
                this.$('.gmcq-item').css({
                    width: '100%',
                    margin: '0'
                });
            }
        },

        setItemLayout: function() {
            var columns = this.model.get('_columns');
            var itemLength = this.model.get('_items').length;
            var $items = this.$('.gmcq-item');
            var itemRemainder = itemLength % columns;

            if (itemRemainder !== 0) {
                if (itemRemainder === 1) {
                    var index = itemLength - 1;
                    var $item = $items.eq(index);
                    this.centerItem($item);
                } else {
                    var itemToAlignIndex = itemLength - itemRemainder;
                    var $item = $items.eq(itemToAlignIndex);
                    this.alignItem($item, itemRemainder);
                }
            }
        },

        centerItem: function(item) {
            item.css({
                float: 'none',
                margin: 'auto'
            });
        },

        alignItem: function(item, itemsToAlign) {
            var columns = this.model.get('_columns');
            var itemWidth = 100 / columns;

            if (Adapt.config.get('_defaultDirection') == 'rtl') {
                var marginRight = itemWidth / 2;
                item.css({
                    marginRight: marginRight + '%'
                });
            } else {
                var marginLeft = itemWidth / 2;
                item.css({
                    marginLeft: marginLeft + '%'
                });
            }
        },

        onItemSelected: function(event) {

            var selectedItemObject = this.model.get('_items')[$(event.currentTarget).parent('.gmcq-item').index()];

            if (this.model.get('_isEnabled') && !this.model.get('_isSubmitted')) {
                this.toggleItemSelected(selectedItemObject, event);
            }

        },

        setupQuestion: function() {
            // if only one answer is selectable, we should display radio buttons not checkboxes
            this.model.set("_isRadio", (this.model.get("_selectable") == 1) );

            this.model.set('_selectedItems', []);

            this.setupQuestionItemIndexes();

            this.setupRandomisation();

            this.restoreUserAnswers();

            this.listenTo(Adapt, 'device:changed', this.resizeImage);

        },

        onQuestionRendered: function() {

            this.resizeImage(Adapt.device.screenSize);
            this.listenTo(Adapt, 'device:resize', this.onScreenSizeChanged);
            this.setUpColumns();

            this.$('label').imageready(_.bind(function() {
                this.setReadyStatus();
            }, this));

        },

        onScreenSizeChanged: function() {
        	this.setUpColumns();
        },

        resizeImage: function(width) {

            var imageWidth = width === 'medium' ? 'small' : width;

            this.$('label').each(function(index) {
                var src = $(this).find('img').attr('data-' + imageWidth);
                $(this).find('img').attr('src', src);
            });

        },

        // hack for IE8
        forceChangeEvent: function(event) {

            $("#" + $(event.currentTarget).closest("label").attr("for")).change();

        }

    }, {
        template: 'gmcq'
    });

    Adapt.register("gmcq", Gmcq);

    return Gmcq;

});
