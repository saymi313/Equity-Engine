import React from 'react'
import { Calculator, DollarSign, Percent } from 'lucide-react'
import FormSection from './FormSection'
import InputField from './InputField'

const ExpensesSection = ({ formData, handleInputChange, isExpanded, onToggle }) => (
  <FormSection
    title="Expenses & Taxes"
    icon={Calculator}
    section="expenses"
    isExpanded={isExpanded}
    onToggle={onToggle}
  >
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <InputField
        label="Property Tax (yearly)"
        icon={DollarSign}
        type="number"
        value={formData.owner_paid_expenses.property_tax_yr}
        onChange={(e) => handleInputChange('owner_paid_expenses', 'property_tax_yr', parseInt(e.target.value))}
        placeholder="6000"
      />
      
      <InputField
        label="HOA (monthly)"
        icon={DollarSign}
        type="number"
        value={formData.owner_paid_expenses.hoa}
        onChange={(e) => handleInputChange('owner_paid_expenses', 'hoa', parseInt(e.target.value))}
        placeholder="0"
      />
      
      <InputField
        label="Insurance (monthly)"
        icon={DollarSign}
        type="number"
        value={formData.owner_paid_expenses.insurance_mo}
        onChange={(e) => handleInputChange('owner_paid_expenses', 'insurance_mo', parseInt(e.target.value))}
        placeholder="0"
      />
      
      <InputField
        label="Management Rate (%)"
        icon={Percent}
        type="number"
        step="0.01"
        value={formData.owner_paid_expenses.management_rate}
        onChange={(e) => handleInputChange('owner_paid_expenses', 'management_rate', parseFloat(e.target.value))}
      />
      
      <InputField
        label="Vacancy Rate (%)"
        icon={Percent}
        type="number"
        step="0.01"
        value={formData.owner_paid_expenses.vacancy_rate}
        onChange={(e) => handleInputChange('owner_paid_expenses', 'vacancy_rate', parseFloat(e.target.value))}
      />
      
      <InputField
        label="Maintenance Rate (%)"
        icon={Percent}
        type="number"
        step="0.01"
        value={formData.owner_paid_expenses.maintenance_rate}
        onChange={(e) => handleInputChange('owner_paid_expenses', 'maintenance_rate', parseFloat(e.target.value))}
      />
    </div>
  </FormSection>
)

export default ExpensesSection
