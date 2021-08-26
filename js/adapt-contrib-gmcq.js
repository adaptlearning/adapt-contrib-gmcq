import Adapt from 'core/js/adapt';
import GmcqView from './GmcqView';
import GmcqModel from './GmcqModel';

export default Adapt.register('gmcq', {
  model: GmcqModel,
  view: GmcqView
});
