import React from 'react'
import { Building, MapPin, Calendar, Square, TreePine, Car, Bed, Bath } from 'lucide-react'
import FormSection from './FormSection'
import InputField from './InputField'

const PropertyInfoSection = ({ formData, handleInputChange, isExpanded, onToggle }) => (
  <FormSection
    title="Property Information"
    icon={Building}
    section="property"
    isExpanded={isExpanded}
    onToggle={onToggle}
  >
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div>
        <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700 mb-2">
          <Building className="w-4 h-4" />
          <span>Property Type</span>
        </label>
        <select 
          value={formData.property_info.property_type}
          onChange={(e) => handleInputChange('property_info', 'property_type', e.target.value)}
          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
        >
          <option value="House">House</option>
          <option value="Condo">Condo</option>
          <option value="Townhouse">Townhouse</option>
          <option value="Multi-family">Multi-family</option>
        </select>
      </div>
      
      <InputField
        label="Street Address"
        icon={MapPin}
        value={formData.property_info.street}
        onChange={(e) => handleInputChange('property_info', 'street', e.target.value)}
        placeholder="123 ABC Street"
      />
      
      <InputField
        label="City"
        icon={MapPin}
        value={formData.property_info.city}
        onChange={(e) => handleInputChange('property_info', 'city', e.target.value)}
        placeholder="City"
      />
      
      <InputField
        label="State"
        icon={MapPin}
        value={formData.property_info.state}
        onChange={(e) => handleInputChange('property_info', 'state', e.target.value)}
        placeholder="State"
      />
      
      <InputField
        label="ZIP Code"
        icon={MapPin}
        value={formData.property_info.zip_code}
        onChange={(e) => handleInputChange('property_info', 'zip_code', e.target.value)}
        placeholder="12345"
      />
      
      <InputField
        label="Year Built"
        icon={Calendar}
        type="number"
        value={formData.property_info.year_built}
        onChange={(e) => handleInputChange('property_info', 'year_built', parseInt(e.target.value))}
      />
      
      <InputField
        label="Square Feet"
        icon={Square}
        type="number"
        value={formData.property_info.sqft}
        onChange={(e) => handleInputChange('property_info', 'sqft', parseInt(e.target.value))}
        placeholder="1234"
      />
      
      <InputField
        label="Lot Size (acres)"
        icon={TreePine}
        type="number"
        step="0.1"
        value={formData.property_info.lot_size}
        onChange={(e) => handleInputChange('property_info', 'lot_size', parseFloat(e.target.value))}
        placeholder="1.0"
      />
      
      <div>
        <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700 mb-2">
          <Car className="w-4 h-4" />
          <span>Parking</span>
        </label>
        <select 
          value={formData.property_info.parking}
          onChange={(e) => handleInputChange('property_info', 'parking', e.target.value)}
          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
        >
          <option value="Garage">Garage</option>
          <option value="Driveway">Driveway</option>
          <option value="Street">Street</option>
          <option value="None">None</option>
        </select>
      </div>
      
      <InputField
        label="Total Bedrooms"
        icon={Bed}
        type="number"
        value={formData.property_info.total_beds}
        onChange={(e) => handleInputChange('property_info', 'total_beds', parseInt(e.target.value))}
      />
      
      <InputField
        label="Total Bathrooms"
        icon={Bath}
        type="number"
        step="0.5"
        value={formData.property_info.total_baths}
        onChange={(e) => handleInputChange('property_info', 'total_baths', parseFloat(e.target.value))}
      />
    </div>
  </FormSection>
)

export default PropertyInfoSection
