import React from 'react'
import { Percent, Calendar, CheckCircle } from 'lucide-react'
import FormSection from './FormSection'
import InputField from './InputField'

const LoanInfoSection = ({ formData, handleInputChange, isExpanded, onToggle }) => (
  <FormSection
    title="Loan Information"
    icon={Percent}
    section="loan"
    isExpanded={isExpanded}
    onToggle={onToggle}
  >
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <InputField
        label="Down Payment (%)"
        icon={Percent}
        type="number"
        step="0.01"
        min={0}
        max={100}
        value={formData.loan_info.percent_down}
        onChange={(e) => handleInputChange('loan_info', 'percent_down', parseFloat(e.target.value))}
        help="Percentage of purchase paid in cash (e.g., 20 for 20%)."
        error={formData.loan_info.percent_down < 0 || formData.loan_info.percent_down >= 100 ? 'Enter between 0 and 100' : undefined}
      />

      <InputField
        label="Interest Rate (%)"
        icon={Percent}
        type="number"
        step="0.01"
        min={0}
        max={100}
        value={formData.loan_info.interest_rate}
        onChange={(e) => handleInputChange('loan_info', 'interest_rate', parseFloat(e.target.value))}
        help="Annual interest rate as percentage (e.g., 4 for 4%)."
        error={formData.loan_info.interest_rate <= 0 || formData.loan_info.interest_rate >= 100 ? 'Enter between 0 and 100' : undefined}
      />

      <InputField
        label="Loan Term (years)"
        icon={Calendar}
        type="number"
        min={0}
        value={formData.loan_info.loan_term_years}
        onChange={(e) => handleInputChange('loan_info', 'loan_term_years', parseInt(e.target.value))}
        help="Amortization term of the loan in years."
        error={!formData.loan_info.loan_term_years || formData.loan_info.loan_term_years <= 0 ? 'Must be > 0' : undefined}
      />

      <div className="md:col-span-3">
        <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-xl border border-gray-200">
          <input
            type="checkbox"
            id="interest_only"
            checked={formData.loan_info.interest_only}
            onChange={(e) => handleInputChange('loan_info', 'interest_only', e.target.checked)}
            className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500 cursor-pointer"
          />
          <label htmlFor="interest_only" className="flex items-center space-x-2 text-sm font-medium text-gray-700 cursor-pointer">
            <CheckCircle className="w-4 h-4" />
            <span>Interest-Only Loan</span>
          </label>
          <p className="text-xs text-gray-500 ml-2">Only pay interest, no principal</p>
        </div>
      </div>
    </div>
  </FormSection>
)

export default LoanInfoSection
