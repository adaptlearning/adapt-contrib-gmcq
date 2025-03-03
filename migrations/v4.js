import { describe, whereContent, whereFromPlugin, mutateContent, checkContent, updatePlugin, testStopWhere, testSuccessWhere, getComponents, getCourse } from 'adapt-migrations';
import _ from 'lodash';

describe('GMCQ - v3.0.0 to v4.0.0', async () => {
  let course, courseGMCQGlobals, GMCQs;
  const originalAriaRegion = 'This is a graphical multiple choice question. Once you have selected an option, select the submit button below.';
  whereFromPlugin('GMCQ - from v3.0.0', { name: 'adapt-contrib-gmcq', version: '<4.0.0' });
  whereContent('GMCQ - where GMCQ', async (content) => {
    GMCQs = getComponents('gmcq');
    return GMCQs.length;
  });
  mutateContent('GMCQ - add globals if missing', async (content) => {
    course = getCourse();
    if (!_.has(course, '_globals._components._gmcq.ariaRegion')) _.set(course, '_globals._components._gmcq.ariaRegion', originalAriaRegion);
    courseGMCQGlobals = course._globals._components._gmcq;
    return true;
  });
  mutateContent('GMCQ - add feedback title attribute', async (content) => {
    GMCQs.forEach(GMCQ => {
      _.set(GMCQ, '_feedback.title', '');
    });
    return true;
  });
  mutateContent('GMCQ - modify global ariaRegion default', async (content) => {
    if (courseGMCQGlobals.ariaRegion === originalAriaRegion) courseGMCQGlobals.ariaRegion = 'Multiple choice question. Select your option and then submit.';
    return true;
  });
  checkContent('GMCQ - check globals exist', async (content) => {
    const isValid = _.has(course, '_globals._components._gmcq');
    if (!isValid) throw new Error('GMCQ - globals do not exist');
    return true;
  });
  checkContent('GMCQ - check feedback title attribute', async (content) => {
    const isValid = GMCQs.every(GMCQ =>
      _.has(GMCQ._feedback, 'title')
    );
    if (!isValid) throw new Error('GMCQ - feedback title not found');
    return true;
  });
  checkContent('GMCQ - check global ariaRegion default', async (content) => {
    const isValid = courseGMCQGlobals.ariaRegion !== originalAriaRegion;
    if (!isValid) throw new Error('GMCQ - global ariaRegion default not updated');
    return true;
  });

  updatePlugin('GMCQ - update to v4.0.0', { name: 'adapt-contrib-gmcq', version: '4.0.0', framework: '>=4.0.0' });

  testSuccessWhere('gmcq components with empty course', {
    fromPlugins: [{ name: 'adapt-contrib-gmcq', version: '3.0.0' }],
    content: [
      { _id: 'c-100', _component: 'gmcq', _feedback: {}, _items: [{ _graphic: { } }] },
      { _id: 'c-105', _component: 'gmcq', _items: [{ _graphic: { } }] },
      { _type: 'course' }
    ]
  });

  testSuccessWhere('gmcq components with original ariaRegion', {
    fromPlugins: [{ name: 'adapt-contrib-gmcq', version: '3.0.0' }],
    content: [
      { _id: 'c-100', _component: 'gmcq', _feedback: {}, _items: [{ _graphic: { } }] },
      { _id: 'c-105', _component: 'gmcq', _items: [{ _graphic: { } }] },
      { _type: 'course', _globals: { _components: { _gmcq: { ariaRegion: originalAriaRegion } } } }
    ]
  });

  testSuccessWhere('gmcq components with custom ariaRegion', {
    fromPlugins: [{ name: 'adapt-contrib-gmcq', version: '3.0.0' }],
    content: [
      { _id: 'c-100', _component: 'gmcq', _feedback: {}, _items: [{ _graphic: { } }] },
      { _id: 'c-105', _component: 'gmcq', _items: [{ _graphic: { } }] },
      { _type: 'course', _globals: { _components: { _gmcq: { ariaRegion: 'custom ariaRegion' } } } }
    ]
  });

  testStopWhere('incorrect version', {
    fromPlugins: [{ name: 'adapt-contrib-gmcq', version: '4.0.0' }]
  });

  testStopWhere('no gmcq components', {
    fromPlugins: [{ name: 'adapt-contrib-gmcq', version: '3.0.0' }],
    content: [{ _component: 'other' }]
  });
});
