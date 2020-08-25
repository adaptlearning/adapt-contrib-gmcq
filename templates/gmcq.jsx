import Adapt from 'core/js/adapt';
import { templates, classes, html, compile } from 'core/js/reactHelpers';

export default function(model, view) {
  const data = model.toJSON();
  const ariaLabels = Adapt.course.get('_globals')._accessibility._ariaLabels;

  const isInteractive = model.isInteractive();

  const screenSize = Adapt.device.screenSize;
  const imageWidth = (screenSize === 'medium') ? 'small' : screenSize;

  return (
    <div className='component__inner gmcq__inner'>

      {templates.component(model, view)}

      <div
        className={classes([
          'component__widget',
          'gmcq__widget',
          !data._isEnabled && 'is-disabled',
          data._isInteractionComplete && 'is-complete is-submitted show-user-answer',
          data._isCorrect && 'is-correct',
          (data._columns && screenSize === 'large') ? 'has-column-layout' : null
        ])}
        role={data._isRadio ? 'radiogroup' : 'group'}
      >

        {data._items.map(({ text, _index, _isActive, _shouldBeSelected, _graphic }, index) =>

          <div
            className={classes([
              `gmcq__item item-${index}`,
              (!isInteractive && data._canShowMarking && _shouldBeSelected) ? 'is-correct' : null,
              (!isInteractive && data._canShowMarking && !_shouldBeSelected) ? 'is-incorrect' : null
            ])}
            style={(data._columns && screenSize === 'large') ?
              {width: `${100/data._columns}%`} :
              null}
            key={_index}
          >

            <input
              className='gmcq__item-input'
              id={`${data._id}-${index}-input`}
              name={data._isRadio ? `${data._id}-item` : null}
              type={data._isRadio ? 'radio' : 'checkbox'}
              disabled={!data._isEnabled}
              aria-label={(isInteractive || !data._canShowMarking) ?
                Adapt.a11y.normalize(text) :
                `${_shouldBeSelected ? ariaLabels.correct : ariaLabels.incorrect}, ${_isActive ? ariaLabels.selectedAnswer : ariaLabels.unselectedAnswer}. ${Adapt.a11y.normalize(text)}`}
              data-adapt-index={_index}
              onKeyPress={(event) => view.onKeyPress(event)}
              onChange={(event) => view.onItemSelect(event)}
              onFocus={(event) => view.onItemFocus(event)}
              onBlur={(event) => view.onItemBlur(event)}
            />

            <label
              className={classes([
                'gmcq__item-label',
                'js-item-label',
                !data._isEnabled && 'is-disabled',
                (data._isCorrectAnswerShown ? _shouldBeSelected : _isActive) && 'is-selected'
              ])}
              aria-hidden={true}
              htmlFor={`${data._id}-${index}-input`}
              data-adapt-index={_index}
            >

              <img
                className='gmcq__item-image'
                src={_graphic[imageWidth] || _graphic.src}
                aria-hidden={_graphic.alt ? null : 'true'}
                aria-label={_graphic.alt ? Adapt.a11y.normalize(_graphic.alt) : null}
              />

              {_graphic.attribution &&
              <div className='component__attribution gmcq__attribution'>
                <div className='component__attribution-inner gmcq__attribution-inner'>
                  {html(_graphic.attribution)}
                </div>
              </div>
              }

              <div className='gmcq__item-option'>

                <div className='gmcq__item-state'>
                  <div
                    className={classes([
                      'gmcq__item-icon',
                      'gmcq__item-answer-icon',
                      data._isRadio ? 'is-radio' : 'is-checkbox'
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
