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
  const [errors, setErrors] = useState({})
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
      percent_down: 20,  // 20%
      interest_rate: 4,  // 4%
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

  const validate = (data) => {
    const e = {}
    // Property info
    if (!data.property_info.street) e.street = 'Enter street address'
    if (!data.property_info.city) e.city = 'Enter city'
    if (!data.property_info.state) e.state = 'Enter state'
    if (!data.property_info.zip_code) e.zip_code = 'Enter ZIP code'
    if (!data.property_info.sqft || data.property_info.sqft <= 0) e.sqft = 'Square feet must be > 0'
    if (!data.property_info.total_beds || data.property_info.total_beds < 0) e.total_beds = 'Beds cannot be negative'
    if (!data.property_info.total_baths || data.property_info.total_baths < 0) e.total_baths = 'Baths cannot be negative'
    // Purchase info
    if (!data.purchase_info.rent_monthly || data.purchase_info.rent_monthly <= 0) e.rent_monthly = 'Monthly rent must be > 0'
    if (!data.purchase_info.purchase_price || data.purchase_info.purchase_price <= 0) e.purchase_price = 'Purchase price must be > 0'
    if (data.purchase_info.closing_cost < 0) e.closing_cost = 'Closing cost cannot be negative'
    // Loan info
    if (data.loan_info.percent_down < 0 || data.loan_info.percent_down > 100) e.percent_down = 'Down payment must be between 0 and 100'
    if (data.loan_info.interest_rate <= 0 || data.loan_info.interest_rate > 100) e.interest_rate = 'Interest rate must be between 0 and 100'
    if (!data.loan_info.loan_term_years || data.loan_info.loan_term_years <= 0) e.loan_term_years = 'Loan term must be > 0'
    // Expenses
    if (data.owner_paid_expenses.property_tax_yr < 0) e.property_tax_yr = 'Yearly tax cannot be negative'
    if (data.owner_paid_expenses.management_rate < 0 || data.owner_paid_expenses.management_rate >= 1) e.management_rate = 'Mgmt rate must be between 0 and 1'
    if (data.owner_paid_expenses.vacancy_rate < 0 || data.owner_paid_expenses.vacancy_rate >= 1) e.vacancy_rate = 'Vacancy rate must be between 0 and 1'
    if (data.owner_paid_expenses.maintenance_rate < 0 || data.owner_paid_expenses.maintenance_rate >= 1) e.maintenance_rate = 'Maintenance rate must be between 0 and 1'
    // Yearly increases
    if (data.yearly_rate_increase.appreciation < 0) e.appreciation = 'Appreciation cannot be negative'
    if (data.yearly_rate_increase.rent_rate_inc < 0) e.rent_rate_inc = 'Rent increase cannot be negative'
    // Tax info
    if (data.tax_info.improved_value_ratio <= 0 || data.tax_info.improved_value_ratio >= 1) e.improved_value_ratio = 'Improved ratio must be between 0 and 1'
    if (data.tax_info.income_tax_rate < 0 || data.tax_info.income_tax_rate >= 1) e.income_tax_rate = 'Income tax must be between 0 and 1'
    if (data.tax_info.cap_gains_tax_rate < 0 || data.tax_info.cap_gains_tax_rate >= 1) e.cap_gains_tax_rate = 'Cap gains tax must be between 0 and 1'
    if (data.tax_info.recapture_tax_rate < 0 || data.tax_info.recapture_tax_rate >= 1) e.recapture_tax_rate = 'Recapture tax must be between 0 and 1'
    if (data.tax_info.depreciation_years <= 0) e.depreciation_years = 'Depreciation years must be > 0'
    if (data.tax_info.selling_cost_percentage < 0 || data.tax_info.selling_cost_percentage >= 1) e.selling_cost_percentage = 'Selling cost % must be between 0 and 1'
    return e
  }

  // Convert form data to backend format (percentages to decimals where needed)
  const convertFormDataForBackend = (data) => {
    const converted = JSON.parse(JSON.stringify(data)) // Deep clone

    // Convert loan info percentages to decimals
    converted.loan_info.percent_down = converted.loan_info.percent_down / 100
    converted.loan_info.interest_rate = converted.loan_info.interest_rate / 100

    return converted
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const eMap = validate(formData)
    setErrors(eMap)
    if (Object.keys(eMap).length === 0) {
      const backendData = convertFormDataForBackend(formData)
      onSubmit(backendData)
    }
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

        <SubmitButton disabled={Object.keys(errors).length > 0} />
      </form>
    </div>
  )
}

export default PropertyForm
