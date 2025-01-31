import { describe, whereContent, whereFromPlugin, mutateContent, checkContent, updatePlugin } from 'adapt-migrations';
import _ from 'lodash';

describe('GMCQ - v1.1.5 to v2.0.0', async () => {
  let GMCQs;
  whereFromPlugin('GMCQ - from v1.1.5', { name: 'adapt-contrib-gmcq', version: '<2.0.0' });
  whereContent('GMCQ - where GMCQ', async (content) => {
    GMCQs = content.filter(({ _component }) => _component === 'gmcq');
    return GMCQs.length;
  });
  mutateContent('GMCQ - add _shouldDisplayAttempts attribute', async (content) => {
    GMCQs.forEach(GMCQ => {
      GMCQ._shouldDisplayAttempts = false;
    });
    return true;
  });
  mutateContent('GMCQ - delete _graphic.title attribute', async (content) => {
    GMCQs.forEach(GMCQ => {
      GMCQ._items.forEach(item => {
        delete item._graphic.title;
      });
    });
    return true;
  });
  mutateContent('GMCQ - delete _graphic.medium attribute', async (content) => {
    GMCQs.forEach(GMCQ => {
      GMCQ._items.forEach(item => {
        delete item._graphic.medium;
      });
    });
    return true;
  });
  checkContent('GMCQ - check _shouldDisplayAttempts attribute', async (content) => {
    const isValid = GMCQs.every(GMCQ =>
      Object.hasOwn(GMCQ, '_shouldDisplayAttempts')
    );
    if (!isValid) throw new Error('GMCQ - _shouldDisplayAttempts not found');
    return true;
  });
  checkContent('GMCQ - check _graphic title attribute', async (content) => {
    const isInvalid = GMCQs.some(GMCQ => {
      return GMCQ._items.find(item => !_.has(item, '_graphic.title'));
    });
    if (isInvalid) throw new Error('GMCQ - _graphic title still found');
    return true;
  });
  checkContent('GMCQ - check _graphic.medium attribute', async (content) => {
    const isInvalid = GMCQs.some(GMCQ => {
      return GMCQ._items.find(item => !_.has(item, '_graphic.medium'));
    });
    if (isInvalid) throw new Error('GMCQ - _graphic medium still found');
    return true;
  });
  updatePlugin('GMCQ - update to v2.0.0', { name: 'adapt-contrib-gmcq', version: '2.0.0', framework: '>=2.0.0' });
});

describe('GMCQ - v2.0.2 to v2.0.3', async () => {
  let GMCQs;
  whereFromPlugin('GMCQ - from v2.0.2', { name: 'adapt-contrib-gmcq', version: '<2.0.3' });
  whereContent('GMCQ - where GMCQ', async (content) => {
    GMCQs = content.filter(({ _component }) => _component === 'gmcq');
    return GMCQs.length;
  });
  mutateContent('GMCQ - add _canShowModelAnswer attribute', async (content) => {
    GMCQs.forEach(GMCQ => {
      GMCQ._canShowModelAnswer = true;
    });
    return true;
  });
  mutateContent('GMCQ - add _columns attribute', async (content) => {
    GMCQs.forEach(GMCQ => {
      GMCQ._columns = 0;
    });
    return true;
  });
  checkContent('GMCQ - check _canShowModelAnswer attribute', async (content) => {
    const isValid = GMCQs.every(GMCQ =>
      _.has(GMCQ, '_canShowModelAnswer')
    );
    if (!isValid) throw new Error('GMCQ - _canShowModelAnswer not found');
    return true;
  });
  checkContent('GMCQ - check _columns attribute', async (content) => {
    const isValid = GMCQs.every(GMCQ =>
      _.has(GMCQ, '_columns')
    );
    if (!isValid) throw new Error('GMCQ - _columns not found');
    return true;
  });
  updatePlugin('GMCQ - update to v2.0.3', { name: 'adapt-contrib-gmcq', version: '2.0.3', framework: '>=2.0.0' });
});

describe('GMCQ - v2.0.4 to v2.0.5', async () => {
  let GMCQs;
  whereFromPlugin('GMCQ - from v2.0.4', { name: 'adapt-contrib-gmcq', version: '<2.0.5' });
  whereContent('GMCQ - where GMCQ', async (content) => {
    GMCQs = content.filter(({ _component }) => _component === 'gmcq');
    return GMCQs.length;
  });
  mutateContent('GMCQ - add _graphic attribution attribute', async (content) => {
    GMCQs.forEach(GMCQ => {
      GMCQ._canShowMarking = true;
    });
    return true;
  });
  checkContent('GMCQ - check _graphic attribution attribute', async (content) => {
    const isValid = GMCQs.every(GMCQ =>
      _.has(GMCQ, '_canShowMarking')
    );
    if (!isValid) throw new Error('GMCQ - _graphic attribution not found');
    return true;
  });
  updatePlugin('GMCQ - update to v2.0.5', { name: 'adapt-contrib-gmcq', version: '2.0.5', framework: '>=2.0.0' });
});

describe('GMCQ - v2.0.5 to v2.1.0', async () => {
  let GMCQs;
  whereFromPlugin('GMCQ - from v2.0.5', { name: 'adapt-contrib-gmcq', version: '<2.1.0' });
  whereContent('GMCQ - where GMCQ', async (content) => {
    GMCQs = content.filter(({ _component }) => _component === 'gmcq');
    return GMCQs.length;
  });
  mutateContent('GMCQ - add _graphic attribution attribute', async (content) => {
    GMCQs.forEach(GMCQ => {
      GMCQ._items.forEach(item => {
        item._graphic.attribution = 'Copyright © 2015';
      });
    });
    return true;
  });
  checkContent('GMCQ - check _graphic attribution attribute', async (content) => {
    const isValid = GMCQs.every(GMCQ =>
      GMCQ._items.every(item =>
        _.has(item._graphic, 'attribution')
      )
    );
    if (!isValid) throw new Error('GMCQ - _graphic attribution not found');
    return true;
  });
  updatePlugin('GMCQ - update to v2.1.0', { name: 'adapt-contrib-gmcq', version: '2.1.0', framework: '>=2.0.0' });
});

describe('GMCQ - v2.1.0 to v2.1.1', async () => {
  let course, courseGMCQGlobals, GMCQs;
  const originalAriaRegion = 'This component is a graphical multiple choice question. Once you have selected an option select the submit button below.';
  whereFromPlugin('GMCQ - from v2.1.0', { name: 'adapt-contrib-gmcq', version: '<2.1.1' });
  whereContent('GMCQ - where GMCQ', async (content) => {
    GMCQs = content.filter(({ _component }) => _component === 'gmcq');
    return GMCQs.length;
  });
  mutateContent('GMCQ - add globals if missing', async (content) => {
    course = content.find(({ _type }) => _type === 'course');
    if (!_.has(course, '_globals._components._gmcq')) _.set(course, '_globals._components._gmcq', {});
    courseGMCQGlobals = course._globals._components._gmcq;
    return true;
  });
  mutateContent('GMCQ - modify global ariaRegion default', async (content) => {
    if (courseGMCQGlobals.ariaRegion === originalAriaRegion) courseGMCQGlobals.ariaRegion = 'This is a graphical multiple choice question. Once you have selected an option, select the submit button below.';
    return true;
  });
  checkContent('GMCQ - check globals exist', async (content) => {
    const isValid = _.has(course, '_globals._components._gmcq');
    if (!isValid) throw new Error('GMCQ - globals do not exist');
    return true;
  });
  checkContent('GMCQ - check global ariaRegion default', async (content) => {
    const isValid = courseGMCQGlobals.ariaRegion !== originalAriaRegion;
    if (!isValid) throw new Error('GMCQ - global ariaRegion default not updated');
    return true;
  });

  updatePlugin('GMCQ - update to v2.1.1', { name: 'adapt-contrib-gmcq', version: '2.1.1', framework: '>=2.0.0' });
});
