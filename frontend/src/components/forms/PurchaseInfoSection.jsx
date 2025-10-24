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
        min={0}
        value={formData.purchase_info.rent_monthly}
        onChange={(e) => {
          const v = e.target.value
          handleInputChange('purchase_info', 'rent_monthly', v === '' ? '' : Math.max(0, parseInt(v) || 0))
        }}
        placeholder="4600"
        help="Expected market rent for all units combined."
        error={!formData.purchase_info.rent_monthly ? 'Required' : undefined}
      />
      
      <InputField
        label="Purchase Price"
        icon={DollarSign}
        type="number"
        min={0}
        value={formData.purchase_info.purchase_price}
        onChange={(e) => {
          const v = e.target.value
          handleInputChange('purchase_info', 'purchase_price', v === '' ? '' : Math.max(0, parseInt(v) || 0))
        }}
        placeholder="400000"
        help="Contract purchase price of the property."
        error={!formData.purchase_info.purchase_price ? 'Required' : undefined}
      />
      
      <InputField
        label="Closing Cost"
        icon={DollarSign}
        type="number"
        min={0}
        value={formData.purchase_info.closing_cost}
        onChange={(e) => {
          const v = e.target.value
          handleInputChange('purchase_info', 'closing_cost', v === '' ? '' : Math.max(0, parseInt(v) || 0))
        }}
        placeholder="12000"
        help="Title, escrow, lender, and recording fees paid at closing."
      />
      
      <InputField
        label="Initial Improvements"
        icon={DollarSign}
        type="number"
        min={0}
        value={formData.purchase_info.initial_improvements}
        onChange={(e) => {
          const v = e.target.value
          handleInputChange('purchase_info', 'initial_improvements', v === '' ? '' : Math.max(0, parseInt(v) || 0))
        }}
        placeholder="0"
        help="Renovation costs at or immediately after purchase."
      />
      
      <div className="md:col-span-2">
        <InputField
          label="Purchase Date"
          icon={Calendar}
          type="date"
          value={formData.purchase_info.purchase_date}
          onChange={(e) => handleInputChange('purchase_info', 'purchase_date', e.target.value)}
          max={new Date().toISOString().split('T')[0]}
          help="Date of closing. Future dates are not allowed."
        />
      </div>
    </div>
  </FormSection>
)

export default PurchaseInfoSection
