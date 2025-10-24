import React, { useEffect, useState } from 'react'
import { Building, MapPin, Calendar, Square, TreePine, Car, Bed, Bath } from 'lucide-react'
import FormSection from './FormSection'
import InputField from './InputField'

const PropertyInfoSection = ({ formData, handleInputChange, isExpanded, onToggle }) => {
  const [states, setStates] = useState([])
  const [zipError, setZipError] = useState('')

  const fallbackStates = [
    { name: 'Alabama', abbreviation: 'AL' }, { name: 'Alaska', abbreviation: 'AK' },
    { name: 'Arizona', abbreviation: 'AZ' }, { name: 'Arkansas', abbreviation: 'AR' },
    { name: 'California', abbreviation: 'CA' }, { name: 'Colorado', abbreviation: 'CO' },
    { name: 'Connecticut', abbreviation: 'CT' }, { name: 'Delaware', abbreviation: 'DE' },
    { name: 'District of Columbia', abbreviation: 'DC' }, { name: 'Florida', abbreviation: 'FL' },
    { name: 'Georgia', abbreviation: 'GA' }, { name: 'Hawaii', abbreviation: 'HI' },
    { name: 'Idaho', abbreviation: 'ID' }, { name: 'Illinois', abbreviation: 'IL' },
    { name: 'Indiana', abbreviation: 'IN' }, { name: 'Iowa', abbreviation: 'IA' },
    { name: 'Kansas', abbreviation: 'KS' }, { name: 'Kentucky', abbreviation: 'KY' },
    { name: 'Louisiana', abbreviation: 'LA' }, { name: 'Maine', abbreviation: 'ME' },
    { name: 'Maryland', abbreviation: 'MD' }, { name: 'Massachusetts', abbreviation: 'MA' },
    { name: 'Michigan', abbreviation: 'MI' }, { name: 'Minnesota', abbreviation: 'MN' },
    { name: 'Mississippi', abbreviation: 'MS' }, { name: 'Missouri', abbreviation: 'MO' },
    { name: 'Montana', abbreviation: 'MT' }, { name: 'Nebraska', abbreviation: 'NE' },
    { name: 'Nevada', abbreviation: 'NV' }, { name: 'New Hampshire', abbreviation: 'NH' },
    { name: 'New Jersey', abbreviation: 'NJ' }, { name: 'New Mexico', abbreviation: 'NM' },
    { name: 'New York', abbreviation: 'NY' }, { name: 'North Carolina', abbreviation: 'NC' },
    { name: 'North Dakota', abbreviation: 'ND' }, { name: 'Ohio', abbreviation: 'OH' },
    { name: 'Oklahoma', abbreviation: 'OK' }, { name: 'Oregon', abbreviation: 'OR' },
    { name: 'Pennsylvania', abbreviation: 'PA' }, { name: 'Rhode Island', abbreviation: 'RI' },
    { name: 'South Carolina', abbreviation: 'SC' }, { name: 'South Dakota', abbreviation: 'SD' },
    { name: 'Tennessee', abbreviation: 'TN' }, { name: 'Texas', abbreviation: 'TX' },
    { name: 'Utah', abbreviation: 'UT' }, { name: 'Vermont', abbreviation: 'VT' },
    { name: 'Virginia', abbreviation: 'VA' }, { name: 'Washington', abbreviation: 'WA' },
    { name: 'West Virginia', abbreviation: 'WV' }, { name: 'Wisconsin', abbreviation: 'WI' },
    { name: 'Wyoming', abbreviation: 'WY' }
  ]

  useEffect(() => {
    fetch('/src/data/us-states.json')
      .then(r => r.json())
      .then(data => setStates(Array.isArray(data) ? data : fallbackStates))
      .catch(() => setStates(fallbackStates))
  }, [])

  const validateZip = async (zip) => {
    setZipError('')
    if (!zip || zip.length < 5) return
    try {
      const res = await fetch(`https://api.zippopotam.us/us/${zip}`)
      if (!res.ok) {
        // If ZIP not found in API, don't block the user; treat as unknown
        return
      }
      const data = await res.json()
      const placeState = data.places?.[0]?.['state abbreviation'] || data.places?.[0]?.state
      if (placeState && formData.property_info.state && placeState.toUpperCase() !== formData.property_info.state.toUpperCase()) {
        setZipError(`ZIP belongs to ${placeState}, not ${formData.property_info.state}`)
      }
    } catch (e) {
      // Network/CORS issues: don't block user input
      return
    }
  }

  return (
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
        help="Legal street address of the property."
        error={!formData.property_info.street ? 'Required' : undefined}
      />
      
      <InputField
        label="City"
        icon={MapPin}
        value={formData.property_info.city}
        onChange={(e) => handleInputChange('property_info', 'city', e.target.value)}
        placeholder="City"
        help="City where the property is located."
        error={!formData.property_info.city ? 'Required' : undefined}
      />
      
      <div className="relative">
        <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700 mb-2">
          <MapPin className="w-4 h-4" />
          <span>State</span>
        </label>
        <div className="mt-1">
          <select
            value={formData.property_info.state}
            onChange={(e) => handleInputChange('property_info', 'state', e.target.value)}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
          >
            <option value="">Select a state</option>
            {states.map(s => (
              <option key={s.abbreviation} value={s.abbreviation}>{s.abbreviation} — {s.name}</option>
            ))}
          </select>
          {!formData.property_info.state && (
            <p className="text-xs text-gray-500 mt-1">Choose a US state (2-letter code)</p>
          )}
        </div>
      </div>
      
      <InputField
        label="ZIP Code"
        icon={MapPin}
        value={formData.property_info.zip_code}
        onChange={(e) => handleInputChange('property_info', 'zip_code', e.target.value)}
        placeholder="12345"
        help="ZIP code"
        error={!formData.property_info.zip_code ? 'Required' : undefined}
      />
      
      <InputField
        label="Year Built"
        icon={Calendar}
        type="number"
        value={formData.property_info.year_built}
        onChange={(e) => handleInputChange('property_info', 'year_built', parseInt(e.target.value))}
        help="Construction year of the building."
      />
      
      <InputField
        label="Square Feet"
        icon={Square}
        type="number"
        value={formData.property_info.sqft}
        onChange={(e) => handleInputChange('property_info', 'sqft', parseInt(e.target.value))}
        placeholder="1234"
        help="Total interior living area."
        error={!formData.property_info.sqft || formData.property_info.sqft <= 0 ? 'Must be > 0' : undefined}
      />
      
      <InputField
        label="Lot Size (acres)"
        icon={TreePine}
        type="number"
        step="0.1"
        value={formData.property_info.lot_size}
        onChange={(e) => handleInputChange('property_info', 'lot_size', parseFloat(e.target.value))}
        placeholder="1.0"
        help="Land area in acres."
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
        help="Number of bedrooms in the property."
        error={formData.property_info.total_beds < 0 ? 'Cannot be negative' : undefined}
      />
      
      <InputField
        label="Total Bathrooms"
        icon={Bath}
        type="number"
        step="0.5"
        value={formData.property_info.total_baths}
        onChange={(e) => handleInputChange('property_info', 'total_baths', parseFloat(e.target.value))}
        help="Number of bathrooms (use .5 for half baths)."
        error={formData.property_info.total_baths < 0 ? 'Cannot be negative' : undefined}
      />
    </div>
  </FormSection>
)}

export default PropertyInfoSection
