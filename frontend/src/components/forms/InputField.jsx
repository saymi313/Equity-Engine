import React from 'react'

const InputField = ({ label, icon: Icon, type = "text", value, onChange, placeholder, step, min, max }) => (
  <div className="space-y-2">
    <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700">
      {Icon && <Icon className="w-4 h-4" />}
      <span>{label}</span>
    </label>
    <div className="relative">
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        step={step}
        min={min}
        max={max}
        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
      />
    </div>
  </div>
)

export default InputField
