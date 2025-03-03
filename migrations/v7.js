import { describe, whereContent, whereFromPlugin, mutateContent, checkContent, updatePlugin, getComponents, testStopWhere, testSuccessWhere } from 'adapt-migrations';
import _ from 'lodash';

describe('GMCQ - v7.2.1 to v7.3.0', async () => {
  let GMCQs;
  const originalInstruction = '';
  whereFromPlugin('GMCQ - from v7.2.1', { name: 'adapt-contrib-gmcq', version: '<7.3.0' });
  whereContent('GMCQ - where GMCQ', async (content) => {
    GMCQs = getComponents('gmcq');
    return GMCQs.length;
  });
  mutateContent('GMCQ - modify instruction attribute', async (content) => {
    GMCQs.forEach(GMCQ => {
      if (GMCQ.instruction === originalInstruction) GMCQ.instruction = 'Choose {{#if _isRadio}}one option{{else}}one or more options{{/if}} then select Submit.';
    });
    return true;
  });
  checkContent('GMCQ - check instruction attribute', async (content) => {
    const isInvalid = GMCQs.every(GMCQ => GMCQ.instruction === originalInstruction);
    if (isInvalid) throw new Error('GMCQ - instruction attribute not updated');
    return true;
  });
  updatePlugin('GMCQ - update to v7.3.0', { name: 'adapt-contrib-gmcq', version: '7.3.0', framework: '>=5.19.1' });

  testSuccessWhere('gmcq components with/custom/no instruction', {
    fromPlugins: [{ name: 'adapt-contrib-gmcq', version: '7.2.1' }],
    content: [
      { _id: 'c-100', _component: 'gmcq', instruction: originalInstruction, _items: [{ _graphic: { } }] },
      { _id: 'c-105', _component: 'gmcq', instruction: 'custom instruction', _items: [{ _graphic: { } }] },
      { _id: 'c-110', _component: 'gmcq', _items: [{ _graphic: { } }] }
    ]
  });

  testStopWhere('incorrect version', {
    fromPlugins: [{ name: 'adapt-contrib-gmcq', version: '7.3.0' }]
  });

  testStopWhere('no gmcq components', {
    fromPlugins: [{ name: 'adapt-contrib-gmcq', version: '7.2.1' }],
    content: [{ _component: 'other' }]
  });
});

describe('GMCQ - v7.3.0 to v7.3.1', async () => {
  let GMCQs;
  whereFromPlugin('GMCQ - from v7.3.0', { name: 'adapt-contrib-gmcq', version: '<7.3.1' });
  whereContent('GMCQ - where GMCQ', async (content) => {
    GMCQs = getComponents('gmcq');
    return GMCQs.length;
  });
  mutateContent('GMCQ - add ariaQuestion attribute', async (content) => {
    GMCQs.forEach(GMCQ => {
      GMCQ.ariaQuestion = '';
    });
    return true;
  });
  checkContent('GMCQ - check item ariaQuestion attribute', async (content) => {
    const isValid = GMCQs.every(GMCQ => GMCQ.ariaQuestion === '');
    if (!isValid) throw new Error('GMCQ - no ariaQuestion attribute found');
    return true;
  });
  updatePlugin('GMCQ - update to v7.3.1', { name: 'adapt-contrib-gmcq', version: '7.3.1', framework: '>=5.19.1' });

  testSuccessWhere('correct version gmcq components', {
    fromPlugins: [{ name: 'adapt-contrib-gmcq', version: '7.3.0' }],
    content: [
      { _id: 'c-100', _component: 'gmcq', _items: [{ _graphic: { } }] },
      { _id: 'c-105', _component: 'gmcq', _items: [{ _graphic: { } }] }
    ]
  });

  testStopWhere('incorrect version', {
    fromPlugins: [{ name: 'adapt-contrib-gmcq', version: '7.3.1' }]
  });

  testStopWhere('no gmcq components', {
    fromPlugins: [{ name: 'adapt-contrib-gmcq', version: '7.3.0' }],
    content: [{ _component: 'other' }]
  });
});

describe('GMCQ - v7.3.10 to v7.4.0', async () => {
  let GMCQs;
  whereFromPlugin('GMCQ - from v7.3.10', { name: 'adapt-contrib-gmcq', version: '<7.4.0' });
  whereContent('GMCQ - where GMCQ', async (content) => {
    GMCQs = getComponents('gmcq');
    return GMCQs.length;
  });
  mutateContent('GMCQ - add altText attribute to _items', async (content) => {
    GMCQs.forEach(GMCQ => {
      GMCQ._items.forEach(item => {
        item.altText = '';
      });
    });
    return true;
  });
  checkContent('GMCQ - check item altText attribute', async (content) => {
    const isValid = GMCQs.every(GMCQ => {
      return GMCQ._items.every(item => _.has(item, 'altText'));
    });
    if (!isValid) throw new Error('GMCQ - no item altText found');
    return true;
  });
  updatePlugin('GMCQ - update to v7.4.0', { name: 'adapt-contrib-gmcq', version: '7.4.0', framework: '>=5.31.2' });

  testSuccessWhere('correct version gmcq components', {
    fromPlugins: [{ name: 'adapt-contrib-gmcq', version: '7.3.10' }],
    content: [
      { _id: 'c-100', _component: 'gmcq', _items: [{ title: 'item 1' }] },
      { _id: 'c-105', _component: 'gmcq', _items: [{ title: 'item 2' }] }
    ]
  });

  testStopWhere('incorrect version', {
    fromPlugins: [{ name: 'adapt-contrib-gmcq', version: '7.4.0' }]
  });

  testStopWhere('no gmcq components', {
    fromPlugins: [{ name: 'adapt-contrib-gmcq', version: '7.3.10' }],
    content: [{ _component: 'other' }]
  });
});

describe('GMCQ - v7.4.0 to v7.5.0', async () => {
  let GMCQs;
  whereFromPlugin('GMCQ - from v7.4.0', { name: 'adapt-contrib-gmcq', version: '<7.5.0' });
  whereContent('GMCQ - where GMCQ', async (content) => {
    GMCQs = getComponents('gmcq');
    return GMCQs.length;
  });
  mutateContent('GMCQ - add _isRound attribute', async (content) => {
    GMCQs.forEach(GMCQ => {
      GMCQ._isRound = false;
    });
    return true;
  });
  checkContent('GMCQ - check _isRound attribute', async (content) => {
    const isValid = GMCQs.every(({ _isRound }) => _isRound !== undefined);
    if (!isValid) throw new Error('GMCQ - no _isRound attribute found');
    return true;
  });
  updatePlugin('GMCQ - update to v7.5.0', { name: 'adapt-contrib-gmcq', version: '7.5.0', framework: '>=5.31.2' });

  testSuccessWhere('correct version gmcq components', {
    fromPlugins: [{ name: 'adapt-contrib-gmcq', version: '7.4.0' }],
    content: [
      { _id: 'c-100', _component: 'gmcq' },
      { _id: 'c-105', _component: 'gmcq' }
    ]
  });

  testStopWhere('incorrect version', {
    fromPlugins: [{ name: 'adapt-contrib-gmcq', version: '7.5.0' }]
  });

  testStopWhere('no gmcq components', {
    fromPlugins: [{ name: 'adapt-contrib-gmcq', version: '7.4.0' }],
    content: [{ _component: 'other' }]
  });
});

describe('GMCQ - v7.5.2 to v7.6.0', async () => {
  let GMCQs;
  whereFromPlugin('GMCQ - from v7.5.2', { name: 'adapt-contrib-gmcq', version: '<7.6.0' });
  whereContent('GMCQ - where GMCQ', async (content) => {
    GMCQs = getComponents('gmcq');
    return GMCQs.length;
  });
  mutateContent('GMCQ - add _canShowCorrectness attribute', async (content) => {
    GMCQs.forEach(GMCQ => {
      GMCQ._canShowCorrectness = false;
    });
    return true;
  });
  checkContent('GMCQ - check _canShowCorrectness attribute', async (content) => {
    const isValid = GMCQs.every(({ _canShowCorrectness }) => _canShowCorrectness !== undefined);
    if (!isValid) throw new Error('GMCQ - no _canShowCorrectness attribute found');
    return true;
  });
  updatePlugin('GMCQ - update to v7.6.0', { name: 'adapt-contrib-gmcq', version: '7.6.0', framework: '>=5.31.2' });

  testSuccessWhere('correct version gmcq components', {
    fromPlugins: [{ name: 'adapt-contrib-gmcq', version: '7.5.2' }],
    content: [
      { _id: 'c-100', _component: 'gmcq' },
      { _id: 'c-105', _component: 'gmcq' }
    ]
  });

  testStopWhere('incorrect version', {
    fromPlugins: [{ name: 'adapt-contrib-gmcq', version: '7.6.0' }]
  });

  testStopWhere('no gmcq components', {
    fromPlugins: [{ name: 'adapt-contrib-gmcq', version: '7.5.2' }],
    content: [{ _component: 'other' }]
  });
});
