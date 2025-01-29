import { describe, whereContent, whereFromPlugin, mutateContent, checkContent, updatePlugin } from 'adapt-migrations';

describe('GMCQ - v3.0.0 to v4.0.0', async () => {
  let course, courseGMCQGlobals, GMCQs;
  const originalAriaRegion = 'This is a graphical multiple choice question. Once you have selected an option, select the submit button below.';
  whereFromPlugin('GMCQ - from v3.0.0', { name: 'adapt-contrib-gmcq', version: '<4.0.0' });
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
  mutateContent('GMCQ - add feedback title attribute', async (content) => {
    GMCQs.forEach(GMCQ => {
      GMCQ._feedback.title = '';
    });
    return true;
  });
  mutateContent('GMCQ - modify global ariaRegion default', async (content) => {
    if (courseGMCQGlobals.ariaRegion === originalAriaRegion) courseGMCQGlobals.ariaRegion = 'Multiple choice question. Select your option and then submit.';
    return true;
  });
  checkContent('GMCQ - check feedback title attribute', async (content) => {
    const isValid = GMCQs.every(GMCQ =>
      Object.hasOwn(GMCQ._feedback, 'title')
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
});
