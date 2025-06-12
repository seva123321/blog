import { forwardRef } from 'react'

import { getUpperCaseStartedWord } from '@/services/utils'

const Input = forwardRef(
  (
    {
      name = '',
      type = 'text',
      label = '',
      placeholder = '',
      error = '',
      useLabel = true,
      containerClass = '',
      ...props
    },
    ref,
  ) => {
    const labelName = label || getUpperCaseStartedWord(name)
    const isCheckboxOrRadio = type === 'checkbox' || type === 'radio'

    return (
      <div
        className={`${containerClass} ${isCheckboxOrRadio ? 'flex items-center justify-end gap-3' : 'flex flex-col'}`}
      >
        {!isCheckboxOrRadio && useLabel && (
          <label
            htmlFor={name}
            className="mb-1 text-sm font-medium text-gray-700"
          >
            {labelName}
          </label>
        )}

        <input
          ref={ref}
          id={name}
          type={type}
          name={name}
          placeholder={placeholder || getUpperCaseStartedWord(name)}
          className={`rounded-lg border border-gray-300 p-3 transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none ${error ? 'border-red-500 focus:border-red-500 focus:ring-red-200' : ''} ${isCheckboxOrRadio ? 'h-5 w-5 cursor-pointer accent-blue-600' : ''} ${props.disabled ? 'cursor-not-allowed bg-gray-100 opacity-70' : ''} `}
          {...props}
        />
        {!isCheckboxOrRadio && error && (
          <span className="mt-1 text-sm text-red-600">{error}</span>
        )}

        {isCheckboxOrRadio && (
          <div className="">
            <label
              htmlFor={name}
              className="cursor-pointer text-sm text-gray-700"
            >
              {labelName}
            </label>
            {error && (
              <span className="mt-1 text-sm text-red-600">{` (${error})`}</span>
            )}
          </div>
        )}
      </div>
    )
  },
)

export default Input
