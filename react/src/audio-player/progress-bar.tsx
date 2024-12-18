import { useRef } from 'react'
import {
  mergeProps,
  useFocusRing,
  useSlider,
  useSliderThumb,
  VisuallyHidden,
} from 'react-aria'
import {
  type SliderState,
  type SliderStateOptions,
  useSliderState,
} from 'react-stately'
import clsx from 'clsx'

function parseTime(seconds: number) {
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds - hours * 3600) / 60)
  seconds = seconds - hours * 3600 - minutes * 60
  return [hours, minutes, seconds]
}

function formatTime(seconds: Array<number>, totalSeconds = seconds) {
  const totalWithoutLeadingZeroes = totalSeconds.slice(
    totalSeconds.findIndex((x) => x !== 0),
  )
  return seconds
    .slice(seconds.length - totalWithoutLeadingZeroes.length)
    .map((x) => x.toString().padStart(2, '0'))
    .join(':')
}

function Thumb(props: {
  index: number
  state: SliderState
  trackRef: React.RefObject<React.ElementRef<'div'>>
  focusProps: ReturnType<typeof useFocusRing>['focusProps']
  onChangeStart?: () => void
}) {
  const { state, trackRef, focusProps, index } = props
  const inputRef = useRef<React.ElementRef<'input'>>(null)
  const { thumbProps, inputProps } = useSliderThumb(
    { index, trackRef, inputRef },
    state,
  )

  return (
    <div
      className="absolute top-1/2 -tranneutral-x-1/2"
      style={{
        left: `${state.getThumbPercent(index) * 100}%`,
      }}
    >
      <div
        {...thumbProps}
        onMouseDown={(...args) => {
          thumbProps.onMouseDown?.(...args)
          props.onChangeStart?.()
        }}
        onPointerDown={(...args) => {
          thumbProps.onPointerDown?.(...args)
          props.onChangeStart?.()
        }}
      >
        <VisuallyHidden>
          <input ref={inputRef} {...mergeProps(inputProps, focusProps)} />
        </VisuallyHidden>
      </div>
    </div>
  )
}

export function ProgressBar(
  props: SliderStateOptions<Array<number>> & { onChangeStart?: () => void },
) {
  const trackRef = useRef<React.ElementRef<'div'>>(null)
  const state = useSliderState(props)
  const { groupProps, trackProps, labelProps, outputProps } = useSlider(
    props,
    state,
    trackRef,
  )
  const { focusProps, isFocusVisible } = useFocusRing()

  const currentTime = parseTime(state.getThumbValue(0))
  const totalTime = parseTime(state.getThumbMaxValue(0))

  return (
    <div
      {...groupProps}
      className="absolute inset-x-0 bottom-full flex flex-auto touch-none items-center gap-6 md:relative"
    >
      {props.label && (
        <label className="sr-only" {...labelProps}>
          {props.label}
        </label>
      )}
      <div
        {...trackProps}
        onMouseDown={(...args) => {
          trackProps.onMouseDown?.(...args)
          props.onChangeStart?.()
        }}
        onPointerDown={(...args) => {
          trackProps.onPointerDown?.(...args)
          props.onChangeStart?.()
        }}
        ref={trackRef}
        className="relative w-full bg-neutral-100 md:rounded-full"
      >
        <div
          className={clsx(
            'h-3 md:rounded-l-xl transition-colors text-primary bg-current',
            isFocusVisible || state.isThumbDragging(0) ? 'opacity-50' : ''
          )}
          style={{
            width:
              state.getThumbValue(0) === 0
                ? 0
                : `calc(${state.getThumbPercent(0) * 100}% - ${
                    isFocusVisible || state.isThumbDragging(0)
                      ? '0.3125rem'
                      : '0.25rem'
                  })`,
          }}
        />
        <Thumb
          index={0}
          state={state}
          trackRef={trackRef}
          onChangeStart={props.onChangeStart}
          focusProps={focusProps}
        />
      </div>
      <div className="hidden items-center gap-2 md:flex">
        <output
          {...outputProps}
          aria-live="off"
          className={clsx(
            'hidden rounded-md p-0.5 font-mono text-xs leading-6 md:block',
            state.getThumbMaxValue(0) === 0 && 'opacity-0',
            isFocusVisible || state.isThumbDragging(0)
              ? 'bg-neutral-100 text-neutral-900'
              : 'text-neutral-400',
          )}
        >
          {formatTime(currentTime, totalTime)}
        </output>
        <span className="text-sm leading-6 text-neutral-300" aria-hidden="true">{'|'}</span>
        <span
          className={clsx(
            'hidden rounded-md p-0.5 font-mono text-xs leading-6 text-neutral-400 md:block',
            state.getThumbMaxValue(0) === 0 && 'opacity-0',
          )}
        >
          {formatTime(totalTime)}
        </span>
      </div>
    </div>
  )
}
