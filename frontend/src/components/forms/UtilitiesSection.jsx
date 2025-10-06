import React from 'react'
import { Droplets, Zap, Trash2, Scissors, Home } from 'lucide-react'
import FormSection from './FormSection'
import InputField from './InputField'

const UtilitiesSection = ({ formData, handleInputChange, isExpanded, onToggle }) => (
  <FormSection
    title="Utilities & Other Expenses"
    icon={Droplets}
    section="utilities"
    isExpanded={isExpanded}
    onToggle={onToggle}
  >
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <InputField
        label="Water (monthly)"
        icon={Droplets}
        type="number"
        value={formData.owner_paid_expenses.water_mo}
        onChange={(e) => handleInputChange('owner_paid_expenses', 'water_mo', parseInt(e.target.value) || 0)}
        placeholder="0"
      />
      
      <InputField
        label="Sewer (monthly)"
        icon={Droplets}
        type="number"
        value={formData.owner_paid_expenses.sewer_mo}
        onChange={(e) => handleInputChange('owner_paid_expenses', 'sewer_mo', parseInt(e.target.value) || 0)}
        placeholder="0"
      />
      
      <InputField
        label="Garbage (monthly)"
        icon={Trash2}
        type="number"
        value={formData.owner_paid_expenses.garbage_mo}
        onChange={(e) => handleInputChange('owner_paid_expenses', 'garbage_mo', parseInt(e.target.value) || 0)}
        placeholder="0"
      />
      
      <InputField
        label="Gas & Electric (monthly)"
        icon={Zap}
        type="number"
        value={formData.owner_paid_expenses.gas_electric_mo}
        onChange={(e) => handleInputChange('owner_paid_expenses', 'gas_electric_mo', parseInt(e.target.value) || 0)}
        placeholder="0"
      />
      
      <InputField
        label="Lawn Care (monthly)"
        icon={Scissors}
        type="number"
        value={formData.owner_paid_expenses.lawn_mo}
        onChange={(e) => handleInputChange('owner_paid_expenses', 'lawn_mo', parseInt(e.target.value) || 0)}
        placeholder="0"
      />
      
      <InputField
        label="Other Expenses (monthly)"
        icon={Home}
        type="number"
        value={formData.owner_paid_expenses.other_expenses}
        onChange={(e) => handleInputChange('owner_paid_expenses', 'other_expenses', parseInt(e.target.value) || 0)}
        placeholder="0"
      />
    </div>
  </FormSection>
)

export default UtilitiesSection
