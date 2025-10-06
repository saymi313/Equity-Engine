import React from 'react'
import { motion } from 'framer-motion'
import { PieChart } from 'lucide-react'

const DetailedAnalysis = ({ propertyData, results }) => {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
    >
      <div className="bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 p-6 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-50" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Ccircle cx='30' cy='30' r='1.5'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
        <div className="relative z-10 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl shadow-lg">
              <PieChart className="w-7 h-7 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-bold">Detailed Analysis</h3>
              <p className="text-slate-300 text-sm">Comprehensive financial breakdown and projections</p>
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-2 text-slate-300">
            <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
            <span className="text-sm">Advanced</span>
          </div>
        </div>
      </div>
      
      <div className="p-6">
        <div className="space-y-8">
          {/* Purchase Analysis */}
          <div>
            <h4 className="font-bold text-gray-800 mb-6 text-xl">Purchase Analysis & Financing</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-200/50 p-6">
                <h5 className="font-semibold text-blue-800 mb-4">Purchase & Rehab</h5>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Purchase Price</span>
                    <span className="font-semibold text-blue-600">
                      {formatCurrency(results.purchasePrice)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Down Payment</span>
                    <span className="font-semibold text-blue-600">
                      {formatCurrency(results.downPayment)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Closing Costs</span>
                    <span className="font-semibold text-blue-600">
                      {formatCurrency(12000)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center border-t pt-3">
                    <span className="text-gray-800 font-medium">Total Cash Invested</span>
                    <span className="font-bold text-blue-600">
                      {formatCurrency(results.totalCashInvested)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-purple-50 to-violet-50 rounded-2xl border border-purple-200/50 p-6">
                <h5 className="font-semibold text-purple-800 mb-4">Financing Details</h5>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Loan Amount</span>
                    <span className="font-semibold text-purple-600">
                      {formatCurrency(results.loanAmount)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Interest Rate</span>
                    <span className="font-semibold text-purple-600">4.00%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Loan Term</span>
                    <span className="font-semibold text-purple-600">30 Years</span>
                  </div>
                  <div className="flex justify-between items-center border-t pt-3">
                    <span className="text-gray-800 font-medium">Monthly Payment</span>
                    <span className="font-bold text-purple-600">
                      {formatCurrency(results.mortgageMonthly)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Operating Expenses Breakdown */}
          <div>
            <h4 className="font-bold text-gray-800 mb-6 text-xl">Operating Expenses Breakdown</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-r from-red-50 to-rose-50 rounded-2xl border border-red-200/50 p-6">
                <h5 className="font-semibold text-red-800 mb-4">Monthly Expenses</h5>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Property Taxes</span>
                    <span className="font-semibold text-red-600">
                      {formatCurrency(results.propertyTaxMonthly)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Insurance</span>
                    <span className="font-semibold text-red-600">
                      {formatCurrency(results.insuranceMonthly)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Property Management (10%)</span>
                    <span className="font-semibold text-red-600">
                      {formatCurrency(results.propertyManagementMonthly)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Maintenance Reserve (10%)</span>
                    <span className="font-semibold text-red-600">
                      {formatCurrency(results.maintenanceMonthly)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center border-t pt-3">
                    <span className="text-gray-800 font-medium">Total Monthly</span>
                    <span className="font-bold text-red-600">
                      {formatCurrency(results.monthlyExpenses)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-emerald-50 to-green-50 rounded-2xl border border-emerald-200/50 p-6">
                <h5 className="font-semibold text-emerald-800 mb-4">Annual Totals</h5>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Gross Rent</span>
                    <span className="font-semibold text-emerald-600">
                      {formatCurrency(results.grossRentAnnual)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Vacancy Loss (4%)</span>
                    <span className="font-semibold text-yellow-600">
                      -{formatCurrency(results.vacancyLossAnnual)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Operating Income</span>
                    <span className="font-semibold text-emerald-600">
                      {formatCurrency(results.operatingIncomeAnnual)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Operating Expenses</span>
                    <span className="font-semibold text-red-600">
                      -{formatCurrency(results.operatingExpensesAnnual)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center border-t pt-3">
                    <span className="text-gray-800 font-medium">Net Operating Income</span>
                    <span className="font-bold text-emerald-600">
                      {formatCurrency(results.noiAnnual)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Key Financial Ratios */}
          <div>
            <h4 className="font-bold text-gray-800 mb-6 text-xl">Key Financial Ratios</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl border border-blue-200/50 p-4 text-center">
                <div className="text-2xl font-bold text-blue-700">
                  {(results.cashOnCashReturn * 100).toFixed(1)}%
                </div>
                <div className="text-sm text-blue-600">Cash on Cash Return</div>
              </div>
              <div className="bg-gradient-to-r from-purple-50 to-violet-50 rounded-xl border border-purple-200/50 p-4 text-center">
                <div className="text-2xl font-bold text-purple-700">
                  {(results.returnOnEquity * 100).toFixed(1)}%
                </div>
                <div className="text-sm text-purple-600">Return on Equity</div>
              </div>
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200/50 p-4 text-center">
                <div className="text-2xl font-bold text-green-700">
                  {results.grossRentMultiplier.toFixed(2)}
                </div>
                <div className="text-sm text-green-600">Gross Rent Multiplier</div>
              </div>
              <div className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-xl border border-orange-200/50 p-4 text-center">
                <div className="text-2xl font-bold text-orange-700">
                  {(results.breakEvenRatio * 100).toFixed(1)}%
                </div>
                <div className="text-sm text-orange-600">Break Even Ratio</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default DetailedAnalysis
