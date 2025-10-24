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
        min={0}
        value={formData.owner_paid_expenses.property_tax_yr}
        onChange={(e) => {
          const v = e.target.value
          handleInputChange('owner_paid_expenses', 'property_tax_yr', v === '' ? '' : Math.max(0, parseInt(v) || 0))
        }}
        placeholder="6000"
        help="Annual property taxes."
        error={formData.owner_paid_expenses.property_tax_yr < 0 ? 'Cannot be negative' : undefined}
      />
      
      <InputField
        label="HOA (monthly)"
        icon={DollarSign}
        type="number"
        min={0}
        value={formData.owner_paid_expenses.hoa}
        onChange={(e) => {
          const v = e.target.value
          handleInputChange('owner_paid_expenses', 'hoa', v === '' ? '' : Math.max(0, parseInt(v) || 0))
        }}
        placeholder="0"
        help="Monthly homeowners association dues."
      />
      
      <InputField
        label="Insurance (monthly)"
        icon={DollarSign}
        type="number"
        min={0}
        value={formData.owner_paid_expenses.insurance_mo}
        onChange={(e) => {
          const v = e.target.value
          handleInputChange('owner_paid_expenses', 'insurance_mo', v === '' ? '' : Math.max(0, parseInt(v) || 0))
        }}
        placeholder="0"
        help="Monthly property insurance premium."
      />
      
      <InputField
        label="Management Rate (%)"
        icon={Percent}
        type="number"
        step="0.01"
        value={formData.owner_paid_expenses.management_rate}
        onChange={(e) => handleInputChange('owner_paid_expenses', 'management_rate', parseFloat(e.target.value))}
        help="Portion of rent paid to the property manager (e.g., 0.10)."
        error={formData.owner_paid_expenses.management_rate < 0 || formData.owner_paid_expenses.management_rate >= 1 ? 'Enter between 0 and 1' : undefined}
      />
      
      <InputField
        label="Vacancy Rate (%)"
        icon={Percent}
        type="number"
        step="0.01"
        value={formData.owner_paid_expenses.vacancy_rate}
        onChange={(e) => handleInputChange('owner_paid_expenses', 'vacancy_rate', parseFloat(e.target.value))}
        help="Expected fraction of time units are vacant."
        error={formData.owner_paid_expenses.vacancy_rate < 0 || formData.owner_paid_expenses.vacancy_rate >= 1 ? 'Enter between 0 and 1' : undefined}
      />
      
      <InputField
        label="Maintenance Rate (%)"
        icon={Percent}
        type="number"
        step="0.01"
        value={formData.owner_paid_expenses.maintenance_rate}
        onChange={(e) => handleInputChange('owner_paid_expenses', 'maintenance_rate', parseFloat(e.target.value))}
        help="Reserve for repairs and upkeep (e.g., 0.10 of rent)."
        error={formData.owner_paid_expenses.maintenance_rate < 0 || formData.owner_paid_expenses.maintenance_rate >= 1 ? 'Enter between 0 and 1' : undefined}
      />
    </div>
  </FormSection>
)

export default ExpensesSection
