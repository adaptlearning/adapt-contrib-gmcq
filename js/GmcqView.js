import McqView from 'components/adapt-contrib-mcq/js/McqView';

class GmcqView extends McqView {

  onQuestionRendered() {
    this.$('.js-item-label').imageready(() => this.setReadyStatus());
  }

}

GmcqView.template = 'gmcq.jsx';

export default GmcqView;
