define([
  'core/js/adapt',
  'components/adapt-contrib-mcq/js/adapt-contrib-mcq'
], function(Adapt, Mcq) {

  var Gmcq = Mcq.view.extend({

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

      this.$('.js-item-label').imageready(this.setReadyStatus.bind(this));

    },

    onDeviceResize: function() {
      this.setUpColumns();
    },

    resizeImage: function(width) {
      var imageWidth = width === 'medium' ? 'small' : width;

      this.$('.js-item-label').each(function(index) {
        var $img = $(this).find('img');
        var newSrc = $img.attr('data-' + imageWidth);
        if (!newSrc) return;
        $img.attr('src', newSrc);
      });

    },

    setUpColumns: function() {
      var columns = this.model.get('_columns');

      if (!columns) return;

      var isLarge = Adapt.device.screenSize === 'large';

      this.$el.toggleClass('has-column-layout', isLarge);
      this.$('.js-mcq-item').css('width', isLarge ? (100 / columns) + '%' : '');
    },

    updateMarking: function() {

      var isInteractive = this.model.isInteractive();
      var canShowMarking = this.model.get('_canShowMarking');
      var ariaLabels = Adapt.course.get('_globals')._accessibility._ariaLabels;

      this.model.getChildren().forEach(function(itemModel) {

        var index = itemModel.get('_index');
        var $itemInput = this.$('.js-item-input').filter('[data-adapt-index="' + index + '"]');
        var $item = $itemInput.parents('.js-mcq-item');

        if (isInteractive || !canShowMarking) {
          // Remove item marking
          $item.removeClass('is-correct is-incorrect');
          $itemInput.attr('aria-label', [
            Adapt.a11y.normalize(itemModel.get('text')),
            '. ',
            Adapt.a11y.normalize(itemModel.get('_graphic').alt)
          ].join(''));
          return;
        }

        // Mark item
        var shouldBeSelected = itemModel.get('_shouldBeSelected');
        var isCorrect = Boolean(itemModel.get('_isCorrect'));
        var isActive = Boolean(itemModel.get('_isActive'));

        $item
          .toggleClass('is-correct', isCorrect)
          .toggleClass('is-incorrect', !isCorrect);

        $itemInput.attr('aria-label', [
          (shouldBeSelected ? ariaLabels.correct : ariaLabels.incorrect),
          ', ',
          (isActive ? ariaLabels.selectedAnswer : ariaLabels.unselectedAnswer),
          '. ',
          $.a11y_normalize(itemModel.get('text')),
          '. ',
          $.a11y_normalize(itemModel.get('_graphic').alt)
        ].join(''));

      }, this);
    }

  }, {
    template: 'gmcq'
  });

  return Adapt.register('gmcq', {
    view: Gmcq,
    model: Mcq.model.extend({})
  });

});
