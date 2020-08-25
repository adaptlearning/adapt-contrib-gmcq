import McqView from 'components/adapt-contrib-mcq/js/mcqView';

class GmcqView extends McqView {

  setupQuestion(...args) {
    super.setupQuestion(...args);
  }

  onQuestionRendered() {
    this.$('.js-item-label').imageready(() => this.setReadyStatus());
  }

}

GmcqView.template = 'gmcq.jsx';

export default GmcqView;
