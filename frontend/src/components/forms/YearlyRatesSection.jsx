import React from 'react'
import { TrendingUp, Percent } from 'lucide-react'
import FormSection from './FormSection'
import InputField from './InputField'

const YearlyRatesSection = ({ formData, handleInputChange, isExpanded, onToggle }) => (
  <FormSection
    title="Yearly Rate Increases"
    icon={TrendingUp}
    section="yearly_rates"
    isExpanded={isExpanded}
    onToggle={onToggle}
  >
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <InputField
        label="Appreciation Rate (%)"
        icon={Percent}
        type="number"
        step="0.01"
        value={formData.yearly_rate_increase.appreciation}
        onChange={(e) => handleInputChange('yearly_rate_increase', 'appreciation', parseFloat(e.target.value))}
        placeholder="2.0"
        help="Annual home value growth (e.g., 2%)."
      />
      
      <InputField
        label="Rent Rate Increase (%)"
        icon={Percent}
        type="number"
        step="0.01"
        value={formData.yearly_rate_increase.rent_rate_inc}
        onChange={(e) => handleInputChange('yearly_rate_increase', 'rent_rate_inc', parseFloat(e.target.value))}
        placeholder="2.0"
        help="Expected annual rent growth."
      />
      
      <InputField
        label="Property Tax Rate Increase (%)"
        icon={Percent}
        type="number"
        step="0.01"
        value={formData.yearly_rate_increase.property_tax_rate_inc}
        onChange={(e) => handleInputChange('yearly_rate_increase', 'property_tax_rate_inc', parseFloat(e.target.value))}
        placeholder="2.0"
        help="Year-over-year tax increase assumption."
      />
      
      <InputField
        label="Insurance Rate Increase (%)"
        icon={Percent}
        type="number"
        step="0.01"
        value={formData.yearly_rate_increase.insurance_rate_inc}
        onChange={(e) => handleInputChange('yearly_rate_increase', 'insurance_rate_inc', parseFloat(e.target.value))}
        placeholder="2.0"
        help="Year-over-year insurance premium change."
      />
      
      <InputField
        label="Utility Rate Increase (%)"
        icon={Percent}
        type="number"
        step="0.01"
        value={formData.yearly_rate_increase.utility_rate_inc}
        onChange={(e) => handleInputChange('yearly_rate_increase', 'utility_rate_inc', parseFloat(e.target.value))}
        placeholder="2.0"
        help="Annual increase in utilities paid by owner."
      />
    </div>
  </FormSection>
)

export default YearlyRatesSection
