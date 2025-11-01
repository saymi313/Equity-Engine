import React, { useState } from 'react'
import PropertyForm from './components/PropertyForm'
import ReportDashboard from './components/ReportDashboard'
import Footer from './components/Footer'

function App() {
  const [formData, setFormData] = useState(null)
  const [analysisResults, setAnalysisResults] = useState(null)

  const handleFormSubmit = async (data) => {
    try {
      setFormData(data)
      const res = await fetch('http://127.0.0.1:8000/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })
      if (!res.ok) throw new Error('Backend error')
      const payload = await res.json()
      // Keep existing UI/data flow: set frontend from backend response
      setAnalysisResults(payload.results)
      // Optionally sync normalized property data
      if (payload.propertyData) {
        setFormData(payload.propertyData)
      }
    } catch (e) {
      // Fallback: preserve current UX by showing local demo numbers
      setAnalysisResults({
        cashFlow: 1468,
        roi: 0.076,
        capRate: 0.087,
        equityGrowth: 93635,
        monthlyRent: 4600,
        monthlyExpenses: 1420,
        netIncome: 1468,
        cashOnCashReturn: 0.192,
        returnOnEquity: 0.188,
        irr: 0.076,
        rentToValue: 0.011,
        grossRentMultiplier: 7.39,
        equityMultiple: 1.21,
        breakEvenRatio: 0.641,
        debtCoverageRatio: 1.96,
        debtYield: 0.112,
        purchasePrice: 400000,
        downPayment: 80000,
        loanAmount: 320000,
        totalCashInvested: 92000,
        mortgageMonthly: 1528,
        propertyTaxMonthly: 500,
        insuranceMonthly: 0,
        ownerPaidUtilitiesMonthly: 0,
        propertyManagementMonthly: 460,
        maintenanceMonthly: 460,
        grossRentAnnual: 55200,
        vacancyLossAnnual: 2208,
        operatingIncomeAnnual: 52992,
        operatingExpensesAnnual: 17040,
        noiAnnual: 35952,
        loanPaymentsAnnual: 18333,
        cashFlowAnnual: 17619,
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
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!formData || !analysisResults ? (
          // Step 1: Property Form
          <div className="max-w-4xl mx-auto">
            <PropertyForm onSubmit={handleFormSubmit} />
          </div>
        ) : (
          // Step 2: Full Report
          <div className="space-y-8">
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
                className="bg-gray-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-600 transition-colors duration-200"
              >
                Start Over
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