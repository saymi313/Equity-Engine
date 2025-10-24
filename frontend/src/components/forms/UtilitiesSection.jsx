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
        min={0}
        value={formData.owner_paid_expenses.water_mo}
        onChange={(e) => {
          const v = e.target.value
          handleInputChange('owner_paid_expenses', 'water_mo', v === '' ? '' : Math.max(0, parseInt(v) || 0))
        }}
        placeholder="0"
        help="Water utility paid by owner."
      />
      
      <InputField
        label="Sewer (monthly)"
        icon={Droplets}
        type="number"
        min={0}
        value={formData.owner_paid_expenses.sewer_mo}
        onChange={(e) => {
          const v = e.target.value
          handleInputChange('owner_paid_expenses', 'sewer_mo', v === '' ? '' : Math.max(0, parseInt(v) || 0))
        }}
        placeholder="0"
        help="Sewer utility paid by owner."
      />
      
      <InputField
        label="Garbage (monthly)"
        icon={Trash2}
        type="number"
        min={0}
        value={formData.owner_paid_expenses.garbage_mo}
        onChange={(e) => {
          const v = e.target.value
          handleInputChange('owner_paid_expenses', 'garbage_mo', v === '' ? '' : Math.max(0, parseInt(v) || 0))
        }}
        placeholder="0"
        help="Trash collection fees paid by owner."
      />
      
      <InputField
        label="Gas & Electric (monthly)"
        icon={Zap}
        type="number"
        min={0}
        value={formData.owner_paid_expenses.gas_electric_mo}
        onChange={(e) => {
          const v = e.target.value
          handleInputChange('owner_paid_expenses', 'gas_electric_mo', v === '' ? '' : Math.max(0, parseInt(v) || 0))
        }}
        placeholder="0"
        help="Energy costs if owner-paid."
      />
      
      <InputField
        label="Lawn Care (monthly)"
        icon={Scissors}
        type="number"
        min={0}
        value={formData.owner_paid_expenses.lawn_mo}
        onChange={(e) => {
          const v = e.target.value
          handleInputChange('owner_paid_expenses', 'lawn_mo', v === '' ? '' : Math.max(0, parseInt(v) || 0))
        }}
        placeholder="0"
        help="Landscaping or snow removal."
      />
      
      <InputField
        label="Other Expenses (monthly)"
        icon={Home}
        type="number"
        min={0}
        value={formData.owner_paid_expenses.other_expenses}
        onChange={(e) => {
          const v = e.target.value
          handleInputChange('owner_paid_expenses', 'other_expenses', v === '' ? '' : Math.max(0, parseInt(v) || 0))
        }}
        placeholder="0"
        help="Any other recurring owner-paid costs."
      />
    </div>
  </FormSection>
)

export default UtilitiesSection
