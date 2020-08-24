import Adapt from 'core/js/adapt';
import GmcqView from './gmcqView';
import GmcqModel from './gmcqModel';

export default Adapt.register('gmcq', {
  model: GmcqModel,
  view: GmcqView
});
