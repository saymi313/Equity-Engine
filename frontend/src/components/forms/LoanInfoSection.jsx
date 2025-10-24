import React from 'react'
import { Percent, Calendar } from 'lucide-react'
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
        value={formData.loan_info.percent_down}
        onChange={(e) => handleInputChange('loan_info', 'percent_down', parseFloat(e.target.value))}
        help="Fraction of purchase paid in cash (e.g., 0.20 for 20%)."
        error={formData.loan_info.percent_down < 0 || formData.loan_info.percent_down >= 1 ? 'Enter between 0 and 1' : undefined}
      />
      
      <InputField
        label="Interest Rate (%)"
        icon={Percent}
        type="number"
        step="0.001"
        min={0}
        value={formData.loan_info.interest_rate}
        onChange={(e) => handleInputChange('loan_info', 'interest_rate', parseFloat(e.target.value))}
        help="Annual interest rate as a decimal (e.g., 0.04 for 4%)."
        error={formData.loan_info.interest_rate <= 0 || formData.loan_info.interest_rate >= 1 ? 'Enter between 0 and 1' : undefined}
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
    </div>
  </FormSection>
)

export default LoanInfoSection
