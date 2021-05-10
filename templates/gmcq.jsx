import Adapt from 'core/js/adapt';
import React from 'react';
import { templates, classes, html, compile } from 'core/js/reactHelpers';

export default function GMcq(props) {
  const ariaLabels = Adapt.course.get('_globals')._accessibility._ariaLabels;

  const {
    _id,
    _isEnabled,
    _isInteractionComplete,
    _isCorrect,
    _isCorrectAnswerShown,
    _canShowMarking,
    _isRadio,
    _columns,
    onKeyPress,
    onItemSelect,
    onItemFocus,
    onItemBlur,
    isInteractive
  } = props;

  const screenSize = Adapt.device.screenSize;
  const shouldShowMarking = isInteractive() && _canShowMarking;

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
          (_columns && screenSize === 'large') ? 'has-column-layout' : null
        ])}
        role={_isRadio ? 'radiogroup' : 'group'}
      >

        {props._items.map(({ text, _index, _isActive, _shouldBeSelected, _graphic }, index) =>

          <div
            className={classes([
              `gmcq__item item-${index}`,
              (shouldShowMarking && _shouldBeSelected) ? 'is-correct' : null,
              (shouldShowMarking && !_shouldBeSelected) ? 'is-incorrect' : null
            ])}
            style={(_columns && screenSize === 'large') ?
              { width: `${100 / _columns}%` } :
              null}
            key={_index}
          >

            <input
              className='gmcq__item-input'
              id={`${_id}-${index}-input`}
              name={_isRadio ? `${_id}-item` : null}
              type={_isRadio ? 'radio' : 'checkbox'}
              disabled={!_isEnabled}
              aria-label={!shouldShowMarking ?
                Adapt.a11y.normalize(text) :
                `${_shouldBeSelected ? ariaLabels.correct : ariaLabels.incorrect}, ${_isActive ? ariaLabels.selectedAnswer : ariaLabels.unselectedAnswer}. ${Adapt.a11y.normalize(text)}`}
              data-adapt-index={_index}
              onKeyPress={onKeyPress}
              onChange={onItemSelect}
              onFocus={onItemFocus}
              onBlur={onItemBlur}
            />

            <label
              className={classes([
                'gmcq__item-label',
                'js-item-label',
                !_isEnabled && 'is-disabled',
                (_isCorrectAnswerShown ? _shouldBeSelected : _isActive) && 'is-selected'
              ])}
              aria-hidden={true}
              htmlFor={`${_id}-${index}-input`}
              data-adapt-index={_index}
            >

              <templates.image {..._graphic}
                classNamePrefixes={['gmcq__item']}
                attributionClassNamePrefixes={['component', 'gmcq']}
              />

              <div className='gmcq__item-option'>

                <div className='gmcq__item-state'>
                  <div
                    className={classes([
                      'gmcq__item-icon',
                      'gmcq__item-answer-icon',
                      _isRadio ? 'is-radio' : 'is-checkbox'
                    ])}
                  >

                    <div className='icon'></div>

                  </div>

                  <div className='gmcq__item-icon gmcq__item-correct-icon'>
                    <div className='icon'></div>
                  </div>

                  <div className='gmcq__item-icon gmcq__item-incorrect-icon'>
                    <div className='icon'></div>
                  </div>
                </div>

                {text &&
                <div className='gmcq__item-text'>
                  <div className='gmcq__item-text-inner'>
                    {html(compile(text))}
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
