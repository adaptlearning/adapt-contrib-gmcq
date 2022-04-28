import Adapt from 'core/js/adapt';
import a11y from 'core/js/a11y';
import device from 'core/js/device';
import React from 'react';
import { templates, classes, compile } from 'core/js/reactHelpers';

export default function Gmcq(props) {
  const ariaLabels = Adapt.course.get('_globals')._accessibility._ariaLabels;

  const {
    _id,
    _isEnabled,
    _isInteractionComplete,
    _isCorrect,
    _isCorrectAnswerShown,
    _shouldShowMarking,
    _isRadio,
    _columns,
    displayTitle,
    body,
    instruction,
    onKeyPress,
    onItemSelect,
    onItemFocus,
    onItemBlur
  } = props;

  const screenSize = device.screenSize;

  return (
    <div className='component__inner gmcq__inner'>

      <templates.header {...props} />

      <div
        className={classes([
          'component__widget',
          'gmcq__widget',
          !_isEnabled && 'is-disabled',
          _isInteractionComplete && 'is-complete is-submitted show-user-answer',
          _isCorrect && 'is-correct',
          _columns && screenSize === 'large' && 'has-column-layout'
        ])}
        role={_isRadio ? 'radiogroup' : 'group'}
        aria-labelledby={(displayTitle || body || instruction) && `${_id}-header`}
      >

        {props._items.map(({ text, _index, _isActive, _shouldBeSelected, _graphic }, index) =>

          <div
            className={classes([
              `gmcq-item item-${index}`,
              (_shouldShowMarking && _shouldBeSelected) ? 'is-correct' : null,
              (_shouldShowMarking && !_shouldBeSelected) ? 'is-incorrect' : null
            ])}
            style={(_columns && screenSize === 'large') ?
              { width: `${100 / _columns}%` } :
              null}
            key={_index}
          >

            <input
              className='gmcq-item__input'
              id={`${_id}-${index}-input`}
              name={_isRadio ? `${_id}-item` : null}
              type={_isRadio ? 'radio' : 'checkbox'}
              disabled={!_isEnabled}
              defaultChecked={_isActive}
              aria-label={!_shouldShowMarking ?
                `${a11y.normalize(text)} ${_graphic?.alt || ''}` :
                `${_shouldBeSelected ? ariaLabels.correct : ariaLabels.incorrect}, ${_isActive ? ariaLabels.selectedAnswer : ariaLabels.unselectedAnswer}. ${a11y.normalize(text)} ${_graphic?.alt || ''}`}
              data-adapt-index={_index}
              onKeyPress={onKeyPress}
              onChange={onItemSelect}
              onFocus={onItemFocus}
              onBlur={onItemBlur}
            />

            <label
              className={classes([
                'gmcq-item__label',
                'js-item-label',
                !_isEnabled && 'is-disabled',
                (_isCorrectAnswerShown ? _shouldBeSelected : _isActive) && 'is-selected'
              ])}
              aria-hidden={true}
              htmlFor={`${_id}-${index}-input`}
              data-adapt-index={_index}
            >

              <templates.image {..._graphic}
                classNamePrefixes={['gmcq-item']}
                attributionClassNamePrefixes={['component', 'gmcq']}
              />

              <div className='gmcq-item__option'>

                <div className='gmcq-item__state'>
                  <div
                    className={classes([
                      'gmcq-item__icon',
                      'gmcq-item__answer-icon',
                      _isRadio ? 'is-radio' : 'is-checkbox'
                    ])}
                  >

                    <div className='icon'></div>

                  </div>

                  <div className='gmcq-item__icon gmcq-item__correct-icon'>
                    <div className='icon'></div>
                  </div>

                  <div className='gmcq-item__icon gmcq-item__incorrect-icon'>
                    <div className='icon'></div>
                  </div>
                </div>

                {text &&
                <div className='gmcq-item__text'>
                  <div className='gmcq-item__text-inner' dangerouslySetInnerHTML={{ __html: compile(text) }}>
                  </div>
                </div>
                }

              </div>

            </label>

          </div>
        )}

      </div>

      <div className='btn__container'></div>

    </div>
  );
}
