import React, { useState } from 'react'
import HeroSection from './components/HeroSection'
import PropertyForm from './components/PropertyForm'
import PropertySummary from './components/PropertySummary'
import ReportDashboard from './components/ReportDashboard'
import Footer from './components/Footer'

function App() {
  const [formData, setFormData] = useState(null)
  const [analysisResults, setAnalysisResults] = useState(null)

  const handleFormSubmit = async (data) => {
    setFormData(data)
    // Backend-compatible results structure based on actual backend output
    setAnalysisResults({
      // Year 1 key metrics
      cashFlow: 1468, // Monthly cash flow
      roi: 0.076, // Return on Investment
      capRate: 0.087, // Cap Rate
      equityGrowth: 93635, // Year 1 equity
      monthlyRent: 4600,
      monthlyExpenses: 1420, // Monthly operating expenses
      netIncome: 1468, // Monthly cash flow
      
      // Additional metrics from backend
      cashOnCashReturn: 0.192, // 19.2%
      returnOnEquity: 0.188, // 18.8%
      irr: 0.076, // Internal Rate of Return
      rentToValue: 0.011, // 1.1%
      grossRentMultiplier: 7.39,
      equityMultiple: 1.21,
      breakEvenRatio: 0.641, // 64.1%
      debtCoverageRatio: 1.96,
      debtYield: 0.112, // 11.2%
      
      // Purchase analysis
      purchasePrice: 400000,
      downPayment: 80000,
      loanAmount: 320000,
      totalCashInvested: 92000,
      mortgageMonthly: 1528,
      
      // Operating expenses breakdown
      propertyTaxMonthly: 500,
      insuranceMonthly: 0,
      ownerPaidUtilitiesMonthly: 0,
      propertyManagementMonthly: 460,
      maintenanceMonthly: 460,
      
      // Year 1 annual totals
      grossRentAnnual: 55200,
      vacancyLossAnnual: 2208,
      operatingIncomeAnnual: 52992,
      operatingExpensesAnnual: 17040,
      noiAnnual: 35952,
      loanPaymentsAnnual: 18333,
      cashFlowAnnual: 17619,
      
      // Projections data (Year 1, 5, 10, 20, 30)
      projections: {
        years: [1, 5, 10, 20, 30],
        grossRent: [55200, 59750, 65969, 80416, 98027],
        operatingIncome: [52992, 57360, 63330, 77199, 94106],
        operatingExpenses: [17040, 18445, 20364, 24824, 30260],
        noi: [35952, 38916, 42966, 52375, 63845],
        cashFlow: [17619, 20583, 24633, 34043, 45512],
        propertyValue: [408000, 441632, 487598, 594379, 724545],
        equity: [93635, 152200, 235489, 443485, 724545],
        capRate: [8.7, 9.4, 10.4, 12.7, 15.5],
        cashOnCashReturn: [19.2, 22.4, 26.8, 37.0, 49.5],
        roi: [7.6, 154.8, 368.7, 913.6, 1651.4],
        irr: [7.6, 26.4, 25.5, 23.7, 23.1]
      }
    })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <HeroSection />
      
      {/* Navigation Tabs */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8">
            <button className="py-4 px-1 border-b-2 border-blue-500 text-blue-600 font-medium text-sm">
              Property Analysis
            </button>
            {formData && (
              <button className="py-4 px-1 border-b-2 border-transparent text-gray-500 hover:text-gray-700 font-medium text-sm">
                Property Summary
              </button>
            )}
            {analysisResults && (
              <button className="py-4 px-1 border-b-2 border-transparent text-gray-500 hover:text-gray-700 font-medium text-sm">
                Financial Report
              </button>
            )}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!formData ? (
          // Step 1: Property Form
          <div className="max-w-4xl mx-auto">
            <PropertyForm onSubmit={handleFormSubmit} />
          </div>
        ) : !analysisResults ? (
          // Step 2: Property Summary
          <div className="max-w-4xl mx-auto">
            <PropertySummary propertyData={formData} />
            <div className="mt-8 text-center">
              <button 
                onClick={() => setFormData(null)}
                className="bg-gray-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-600 transition-colors duration-200"
              >
                Back to Form
              </button>
            </div>
          </div>
        ) : (
          // Step 3: Full Report
          <div className="space-y-8">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <PropertySummary propertyData={formData} />
            </div>
            
            <ReportDashboard 
              propertyData={formData} 
              results={analysisResults} 
            />
            
            <div className="text-center">
              <button 
                onClick={() => {
                  setFormData(null)
                  setAnalysisResults(null)
                }}
                className="bg-gray-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-600 transition-colors duration-200 mr-4"
              >
                Start Over
              </button>
              <button 
                onClick={() => setAnalysisResults(null)}
                className="bg-blue-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-600 transition-colors duration-200"
              >
                Back to Summary
              </button>
            </div>
          </div>
        )}
      </div>
      
      <Footer />
    </div>
  )
}

export default App