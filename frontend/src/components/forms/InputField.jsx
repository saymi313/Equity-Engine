import React from 'react'

const InputField = ({ label, icon: Icon, type = "text", value, onChange, placeholder, step, min, max, help, error, pattern, maxLength, list, name, onBlur }) => (
  <div className="space-y-2">
    <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700">
      {Icon && <Icon className="w-4 h-4" />}
      <span>{label}</span>
    </label>
    <div className="relative">
      <input
        type={type}
        value={(value === undefined || value === null || Number.isNaN(value)) ? '' : value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        step={step}
        min={min}
        max={max}
        name={name}
        pattern={pattern}
        maxLength={maxLength}
        list={list}
        className={`w-full px-4 py-3 rounded-xl focus:outline-none focus:ring-2 transition-all duration-200 bg-gray-50 focus:bg-white ${error ? 'border-red-400 focus:ring-red-500 border' : 'border border-gray-200 focus:ring-blue-500 focus:border-transparent'}`}
        aria-invalid={!!error}
        aria-describedby={help ? `${label}-help` : undefined}
      />
    </div>
    {help && !error && (
      <p id={`${label}-help`} className="text-xs text-gray-500">{help}</p>
    )}
    {error && (
      <p className="text-xs text-red-600">{error}</p>
    )}
  </div>
)

export default InputField
