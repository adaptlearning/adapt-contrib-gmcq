import { describe, whereContent, whereFromPlugin, mutateContent, checkContent, updatePlugin } from 'adapt-migrations';

describe('GMCQ - v5.0.2 to v5.1.0', async () => {
  let course, courseGMCQGlobals, GMCQs;
  const originalAriaRegion = 'Multiple choice question. Select your option and then submit.';
  whereFromPlugin('GMCQ - from v5.0.2', { name: 'adapt-contrib-gmcq', version: '<5.1.0' });
  whereContent('GMCQ - where GMCQ', async (content) => {
    GMCQs = content.filter(({ _component }) => _component === 'gmcq');
    if (GMCQs.length) return true;
  });
  mutateContent('GMCQ - add globals if missing', async (content) => {
    course = content.find(({ _type }) => _type === 'course');

    course._globals._components = course._globals._components ?? {};
    courseGMCQGlobals = course._globals._components._gmcq ?? {};
    return true;
  });
  mutateContent('GMCQ - modify global ariaRegion default', async (content) => {
    if (courseGMCQGlobals.ariaRegion === originalAriaRegion) courseGMCQGlobals.ariaRegion = 'Multiple choice question';
    return true;
  });
  checkContent('GMCQ - check global ariaRegion default', async (content) => {
    const isValid = courseGMCQGlobals.ariaRegion !== originalAriaRegion;
    if (!isValid) throw new Error('GMCQ - global ariaRegion default not updated');
    return true;
  });

  updatePlugin('GMCQ - update to v5.1.0', { name: 'adapt-contrib-gmcq', version: '5.1.0', framework: '>=5.0.0' });
});

describe('GMCQ - v5.0.2 to v5.1.0', async () => {
  let course, courseGMCQGlobals, GMCQs;
  const originalAltText = 'Placeholder graphic';
  whereFromPlugin('GMCQ - from v5.0.2', { name: 'adapt-contrib-gmcq', version: '<5.1.0' });
  whereContent('GMCQ - where GMCQ', async (content) => {
    GMCQs = content.filter(({ _component }) => _component === 'gmcq');
    if (GMCQs.length) return true;
  });
  mutateContent('GMCQ - add globals if missing', async (content) => {
    course = content.find(({ _type }) => _type === 'course');
    if (course?._globals?._components?._gmcq) return true;

    course._globals._components = course._globals._components ?? {};
    courseGMCQGlobals = course._globals._components._gmcq ?? {};
    return true;
  });
  mutateContent('GMCQ - add default item alt value', async (content) => {
    GMCQs.forEach(GMCQ => {
      GMCQ._items.forEach(item => {
        if (item.alt === originalAltText) item.alt = '';
      });
    });
    return true;
  });
  mutateContent('GMCQ - add global ariaCorrectAnswer value', async (content) => {
    courseGMCQGlobals.ariaCorrectAnswer = 'The correct answer is {{{correctAnswer}}}';
    return true;
  });
  mutateContent('GMCQ - add global ariaCorrectAnswers value', async (content) => {
    courseGMCQGlobals.ariaCorrectAnswers = 'The correct answers are {{{correctAnswer}}}';
    return true;
  });
  mutateContent('GMCQ - add global ariaUserAnswer value', async (content) => {
    courseGMCQGlobals.ariaUserAnswer = 'The answer you chose was {{{userAnswer}}}';
    return true;
  });
  mutateContent('GMCQ - add global ariaUserAnswers value', async (content) => {
    courseGMCQGlobals.ariaUserAnswers = 'The answers you chose were {{{userAnswer}}}';
    return true;
  });
  checkContent('GMCQ - check default item alt value', async (content) => {
    const isValid = GMCQs.every(GMCQ =>
      GMCQ._items.every(item =>
        item.alt !== originalAltText
      )
    );
    if (!isValid) throw new Error('GMCQ - item default alt text not updated');
    return true;
  });
  checkContent('GMCQ - check global ariaCorrectAnswer attribute', async (content) => {
    const isValid = courseGMCQGlobals.ariaCorrectAnswer === 'The correct answer is {{{correctAnswer}}}';
    if (!isValid) throw new Error('GMCQ - global ariaCorrectAnswer attribute incorrect');
    return true;
  });
  checkContent('GMCQ - check global ariaCorrectAnswers attribute', async (content) => {
    const isValid = courseGMCQGlobals.ariaCorrectAnswers === 'The correct answers are {{{correctAnswer}}}';
    if (!isValid) throw new Error('GMCQ - global ariaCorrectAnswers attribute incorrect');
    return true;
  });
  checkContent('GMCQ - check global ariaUserAnswer attribute', async (content) => {
    const isValid = courseGMCQGlobals.ariaUserAnswer === 'The answer you chose was {{{userAnswer}}}';
    if (!isValid) throw new Error('GMCQ - global ariaUserAnswer attribute incorrect');
    return true;
  });
  checkContent('GMCQ - check global ariaUserAnswers attribute', async (content) => {
    const isValid = courseGMCQGlobals.ariaUserAnswers === 'The answers you chose were {{{userAnswer}}}';
    if (!isValid) throw new Error('GMCQ - global ariaUserAnswers attribute incorrect');
    return true;
  });

  updatePlugin('GMCQ - update to v5.1.0', { name: 'adapt-contrib-gmcq', version: '5.1.0', framework: '>=5.0.0' });
});

describe('GMCQ - v5.1.0 to v5.2.0', async () => {
  let GMCQs;
  whereFromPlugin('GMCQ - from v5.1.0', { name: 'adapt-contrib-gmcq', version: '<5.2.0' });
  whereContent('GMCQ - where GMCQ', async (content) => {
    GMCQs = content.filter(({ _component }) => _component === 'gmcq');
    if (GMCQs.length) return true;
  });
  mutateContent('GMCQ - add _hasItemScoring attribute', async (content) => {
    GMCQs.forEach(GMCQ => {
      GMCQ._hasItemScoring = false;
    });
    return true;
  });
  mutateContent('GMCQ - add item _isPartlyCorrect attribute', async (content) => {
    GMCQs.forEach(GMCQ => {
      GMCQ._items.forEach(item => {
        item._isPartlyCorrect = false;
      });
    });
    return true;
  });
  mutateContent('GMCQ - add item _score attribute', async (content) => {
    GMCQs.forEach(GMCQ => {
      GMCQ._items.forEach(item => {
        item._score = 0;
      });
    });
    return true;
  });
  checkContent('GMCQ - check _hasItemScoring attribute', async (content) => {
    const isValid = GMCQs.every(GMCQ => GMCQ._hasItemScoring === false);
    if (!isValid) throw new Error('GMCQ - _hasItemScoring attribute not updated');
    return true;
  });
  checkContent('GMCQ - check item _isPartlyCorrect attribute', async(content) => {
    const isValid = GMCQs.every(GMCQ =>
      GMCQ._items.every(item =>
        Object.hasOwn(item, '_isPartlyCorrect')
      )
    );
    if (!isValid) throw new Error('GMCQ - no item _isPartlyCorrect found');
    return true;
  });
  checkContent('GMCQ - check item _score attribute', async(content) => {
    const isValid = GMCQs.every(GMCQ =>
      GMCQ._items.every(item =>
        Object.hasOwn(item, '_score')
      )
    );
    if (!isValid) throw new Error('GMCQ - no item _score found');
    return true;
  });
  updatePlugin('GMCQ - update to v5.2.0', { name: 'adapt-contrib-gmcq', version: '5.2.0', framework: '>=5.0.0' });
});
