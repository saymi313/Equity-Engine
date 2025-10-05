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
    // TODO: Send to Python backend for calculations
    // For now, we'll simulate results
    setAnalysisResults({
      cashFlow: 1250,
      roi: 0.085,
      capRate: 0.062,
      equityGrowth: 8500,
      monthlyRent: data.purchase_info.rent_monthly,
      monthlyExpenses: 3350,
      netIncome: 1250
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