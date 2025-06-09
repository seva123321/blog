import { forwardRef } from 'react'

import { getUpperCaseStartedWord } from '@/services/utils'

const TextArea = forwardRef(
  ({ name, label, id, defaultValue = '', error, ...props }, ref) => {
    const labelName = label || getUpperCaseStartedWord(name)
    const textAreaId = id || name

    return (
      <div className="flex flex-col">
        <label
          htmlFor={textAreaId}
          className="mb-1 text-sm font-medium text-gray-700"
        >
          {labelName}
        </label>
        <textarea
          id={textAreaId}
          name={name}
          rows={7}
          ref={ref}
          defaultValue={defaultValue}
          placeholder={label}
          spellCheck
          className={`resize-none rounded-lg border border-gray-300 p-3 transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none ${
            error
              ? 'border-red-500 focus:border-red-500 focus:ring-red-200'
              : ''
          } ${props.disabled ? 'cursor-not-allowed bg-gray-100 opacity-70' : ''}`}
          {...props}
        />
        {error && <span className="mt-1 text-sm text-red-500">{error}</span>}
      </div>
    )
  },
)

export default TextArea
