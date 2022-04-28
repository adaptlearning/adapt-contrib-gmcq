import components from 'core/js/components';
import GmcqView from './GmcqView';
import GmcqModel from './GmcqModel';

export default components.register('gmcq', {
  model: GmcqModel,
  view: GmcqView
});
