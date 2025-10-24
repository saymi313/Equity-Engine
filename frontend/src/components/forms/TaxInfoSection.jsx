import React from 'react'
import { Receipt, Percent, Calendar, FileText } from 'lucide-react'
import FormSection from './FormSection'
import InputField from './InputField'

const TaxInfoSection = ({ formData, handleInputChange, isExpanded, onToggle }) => (
  <FormSection
    title="Tax Information"
    icon={Receipt}
    section="tax_info"
    isExpanded={isExpanded}
    onToggle={onToggle}
  >
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <InputField
        label="Improved Value Ratio"
        icon={Percent}
        type="number"
        step="0.0001"
        value={formData.tax_info.improved_value_ratio}
        onChange={(e) => handleInputChange('tax_info', 'improved_value_ratio', parseFloat(e.target.value))}
        placeholder="0.7336"
        help="Portion of purchase price attributable to the building (not land)."
        error={formData.tax_info.improved_value_ratio <= 0 || formData.tax_info.improved_value_ratio >= 1 ? 'Enter between 0 and 1' : undefined}
      />
      
      <InputField
        label="Income Tax Rate (%)"
        icon={Percent}
        type="number"
        step="0.01"
        value={formData.tax_info.income_tax_rate}
        onChange={(e) => handleInputChange('tax_info', 'income_tax_rate', parseFloat(e.target.value))}
        placeholder="22.0"
        help="Marginal tax rate applied to taxable income."
        error={formData.tax_info.income_tax_rate < 0 || formData.tax_info.income_tax_rate >= 1 ? 'Enter between 0 and 1' : undefined}
      />
      
      <InputField
        label="Capital Gains Tax Rate (%)"
        icon={Percent}
        type="number"
        step="0.01"
        value={formData.tax_info.cap_gains_tax_rate}
        onChange={(e) => handleInputChange('tax_info', 'cap_gains_tax_rate', parseFloat(e.target.value))}
        placeholder="15.0"
        help="Rate applied to long-term capital gains upon sale."
        error={formData.tax_info.cap_gains_tax_rate < 0 || formData.tax_info.cap_gains_tax_rate >= 1 ? 'Enter between 0 and 1' : undefined}
      />
      
      <InputField
        label="Recapture Tax Rate (%)"
        icon={Percent}
        type="number"
        step="0.01"
        value={formData.tax_info.recapture_tax_rate}
        onChange={(e) => handleInputChange('tax_info', 'recapture_tax_rate', parseFloat(e.target.value))}
        placeholder="25.0"
        help="Rate for depreciation recapture on sale."
        error={formData.tax_info.recapture_tax_rate < 0 || formData.tax_info.recapture_tax_rate >= 1 ? 'Enter between 0 and 1' : undefined}
      />
      
      <InputField
        label="Depreciation Years"
        icon={Calendar}
        type="number"
        step="0.1"
        value={formData.tax_info.depreciation_years}
        onChange={(e) => handleInputChange('tax_info', 'depreciation_years', parseFloat(e.target.value))}
        placeholder="27.5"
        help="Residential property depreciates over 27.5 years."
        error={formData.tax_info.depreciation_years <= 0 ? 'Must be > 0' : undefined}
      />
      
      <InputField
        label="Selling Cost Percentage (%)"
        icon={Percent}
        type="number"
        step="0.01"
        value={formData.tax_info.selling_cost_percentage}
        onChange={(e) => handleInputChange('tax_info', 'selling_cost_percentage', parseFloat(e.target.value))}
        placeholder="3.0"
        help="Estimated closing costs when selling (e.g., commissions)."
        error={formData.tax_info.selling_cost_percentage < 0 || formData.tax_info.selling_cost_percentage >= 1 ? 'Enter between 0 and 1' : undefined}
      />
    </div>
    
    <div className="mt-6">
      <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700 mb-2">
        <FileText className="w-4 h-4" />
        <span>Q1 Tax Strategy</span>
      </label>
      <select 
        value={formData.tax_info.q1_tax}
        onChange={(e) => handleInputChange('tax_info', 'q1_tax', e.target.value)}
        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
      >
        <option value="I will use a 1031 exchange">I will use a 1031 exchange</option>
        <option value="I will have lived in it as a homestead for 2 out of 5 years">I will have lived in it as a homestead for 2 out of 5 years</option>
        <option value="Other, I will NOT pay capital gains">Other, I will NOT pay capital gains</option>
        <option value="I will pay capital gains tax">I will pay capital gains tax</option>
      </select>
    </div>
  </FormSection>
)

export default TaxInfoSection
