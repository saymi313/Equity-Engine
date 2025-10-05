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
        value={formData.loan_info.percent_down}
        onChange={(e) => handleInputChange('loan_info', 'percent_down', parseFloat(e.target.value))}
      />
      
      <InputField
        label="Interest Rate (%)"
        icon={Percent}
        type="number"
        step="0.001"
        value={formData.loan_info.interest_rate}
        onChange={(e) => handleInputChange('loan_info', 'interest_rate', parseFloat(e.target.value))}
      />
      
      <InputField
        label="Loan Term (years)"
        icon={Calendar}
        type="number"
        value={formData.loan_info.loan_term_years}
        onChange={(e) => handleInputChange('loan_info', 'loan_term_years', parseInt(e.target.value))}
      />
    </div>
  </FormSection>
)

export default LoanInfoSection
