import React, { useState } from 'react'
import { motion } from 'framer-motion'
import PropertyInfoSection from './forms/PropertyInfoSection'
import PurchaseInfoSection from './forms/PurchaseInfoSection'
import LoanInfoSection from './forms/LoanInfoSection'
import ExpensesSection from './forms/ExpensesSection'
import YearlyRatesSection from './forms/YearlyRatesSection'
import UtilitiesSection from './forms/UtilitiesSection'
import TaxInfoSection from './forms/TaxInfoSection'
import SubmitButton from './forms/SubmitButton'

function PropertyForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    property_info: {
      property_type: 'House',
      street: '',
      city: '',
      state: '',
      zip_code: '',
      year_built: new Date().getFullYear(),
      sqft: '',
      lot_size: '',
      parking: 'Garage',
      units: [{ beds: 3, baths: 2, rent: '' }],
      total_beds: 3,
      total_baths: 2
    },
    purchase_info: {
      rent_monthly: '',
      purchase_price: '',
      closing_cost: '',
      initial_improvements: 0,
      purchase_date: new Date().toISOString().split('T')[0]
    },
    loan_info: {
      percent_down: 0.2,
      interest_rate: 0.04,
      loan_term_years: 30,
      interest_only: false
    },
    yearly_rate_increase: {
      appreciation: 0.02,
      rent_rate_inc: 0.02,
      property_tax_rate_inc: 0.02,
      insurance_rate_inc: 0.02,
      utility_rate_inc: 0.02
    },
    owner_paid_expenses: {
      property_tax_yr: '',
      insurance_mo: 0,
      water_mo: 0,
      sewer_mo: 0,
      garbage_mo: 0,
      gas_electric_mo: 0,
      lawn_mo: 0,
      hoa: 0,
      other_expenses: 0,
      management_rate: 0.1,
      vacancy_rate: 0.04,
      maintenance_rate: 0.1
    },
    tax_info: {
      improved_value_ratio: 0.7336,
      income_tax_rate: 0.22,
      cap_gains_tax_rate: 0.15,
      recapture_tax_rate: 0.25,
      depreciation_years: 27.5,
      q1_tax: 'I will use a 1031 exchange',
      selling_cost_percentage: 0.03
    }
  })

  const [expandedSections, setExpandedSections] = useState({
    property: true,
    purchase: false,
    loan: false,
    expenses: false,
    yearly_rates: false,
    utilities: false,
    tax_info: false
  })

  const handleInputChange = (section, field, value) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }))
  }

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <div className="max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-6"
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Property Investment Analysis</h2>
        <p className="text-gray-600">Complete the form below to get detailed financial insights</p>
      </motion.div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <PropertyInfoSection
          formData={formData}
          handleInputChange={handleInputChange}
          isExpanded={expandedSections.property}
          onToggle={toggleSection}
        />

        <PurchaseInfoSection
          formData={formData}
          handleInputChange={handleInputChange}
          isExpanded={expandedSections.purchase}
          onToggle={toggleSection}
        />

        <LoanInfoSection
          formData={formData}
          handleInputChange={handleInputChange}
          isExpanded={expandedSections.loan}
          onToggle={toggleSection}
        />

            <ExpensesSection
              formData={formData}
              handleInputChange={handleInputChange}
              isExpanded={expandedSections.expenses}
              onToggle={toggleSection}
            />

            <YearlyRatesSection
              formData={formData}
              handleInputChange={handleInputChange}
              isExpanded={expandedSections.yearly_rates}
              onToggle={toggleSection}
            />

            <UtilitiesSection
              formData={formData}
              handleInputChange={handleInputChange}
              isExpanded={expandedSections.utilities}
              onToggle={toggleSection}
            />

            <TaxInfoSection
              formData={formData}
              handleInputChange={handleInputChange}
              isExpanded={expandedSections.tax_info}
              onToggle={toggleSection}
            />

            <SubmitButton />
      </form>
    </div>
  )
}

export default PropertyForm
