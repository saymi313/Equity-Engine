import React from 'react'
import { DollarSign, Calendar } from 'lucide-react'
import FormSection from './FormSection'
import InputField from './InputField'

const PurchaseInfoSection = ({ formData, handleInputChange, isExpanded, onToggle }) => (
  <FormSection
    title="Purchase Information"
    icon={DollarSign}
    section="purchase"
    isExpanded={isExpanded}
    onToggle={onToggle}
  >
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <InputField
        label="Monthly Rent"
        icon={DollarSign}
        type="number"
        value={formData.purchase_info.rent_monthly}
        onChange={(e) => handleInputChange('purchase_info', 'rent_monthly', parseInt(e.target.value))}
        placeholder="4600"
      />
      
      <InputField
        label="Purchase Price"
        icon={DollarSign}
        type="number"
        value={formData.purchase_info.purchase_price}
        onChange={(e) => handleInputChange('purchase_info', 'purchase_price', parseInt(e.target.value))}
        placeholder="400000"
      />
      
      <InputField
        label="Closing Cost"
        icon={DollarSign}
        type="number"
        value={formData.purchase_info.closing_cost}
        onChange={(e) => handleInputChange('purchase_info', 'closing_cost', parseInt(e.target.value))}
        placeholder="12000"
      />
      
      <InputField
        label="Initial Improvements"
        icon={DollarSign}
        type="number"
        value={formData.purchase_info.initial_improvements}
        onChange={(e) => handleInputChange('purchase_info', 'initial_improvements', parseInt(e.target.value))}
        placeholder="0"
      />
      
      <div className="md:col-span-2">
        <InputField
          label="Purchase Date"
          icon={Calendar}
          type="date"
          value={formData.purchase_info.purchase_date}
          onChange={(e) => handleInputChange('purchase_info', 'purchase_date', e.target.value)}
        />
      </div>
    </div>
  </FormSection>
)

export default PurchaseInfoSection
