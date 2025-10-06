import React from 'react'
import { motion } from 'framer-motion'
import { BarChart3, TrendingUp, DollarSign, PieChart } from 'lucide-react'

const ProjectionTables = ({ results }) => {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const formatPercentage = (value) => {
    return `${value.toFixed(1)}%`
  }

  if (!results.projections) return null

  const { projections } = results

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
    >
      <div className="bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 p-6 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-50" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Ccircle cx='30' cy='30' r='1.5'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
        <div className="relative z-10 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl shadow-lg">
              <BarChart3 className="w-7 h-7 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-bold">Buy & Hold Projections</h3>
              <p className="text-slate-300 text-sm">30-year financial projections and growth analysis</p>
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-2 text-slate-300">
            <div className="w-2 h-2 bg-indigo-400 rounded-full animate-pulse"></div>
            <span className="text-sm">Projections</span>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="space-y-8">
          {/* Assumptions Header */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-200/50 p-6">
            <h4 className="font-bold text-blue-800 mb-4 text-lg">Growth Assumptions</h4>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-700">2.0%</div>
                <div className="text-sm text-blue-600">Appreciation</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-700">2.0%</div>
                <div className="text-sm text-blue-600">Rent Increase</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-700">2.0%</div>
                <div className="text-sm text-blue-600">Tax Increase</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-700">2.0%</div>
                <div className="text-sm text-blue-600">Insurance Increase</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-700">2.0%</div>
                <div className="text-sm text-blue-600">Utility Increase</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-700">3.0%</div>
                <div className="text-sm text-blue-600">Selling Cost</div>
              </div>
            </div>
          </div>

          {/* Projection Tables */}
          <div className="space-y-6">
            {/* Rental Income Projections */}
            <div>
              <h5 className="font-bold text-gray-800 mb-4 text-lg flex items-center">
                <TrendingUp className="w-5 h-5 mr-2 text-emerald-600" />
                Rental Income Projections
              </h5>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gradient-to-r from-emerald-50 to-green-50">
                      <th className="border border-gray-200 px-4 py-3 text-left font-semibold text-emerald-800">Metric</th>
                      {projections.years.map(year => (
                        <th key={year} className="border border-gray-200 px-4 py-3 text-center font-semibold text-emerald-800">
                          Year {year}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="hover:bg-gray-50">
                      <td className="border border-gray-200 px-4 py-3 font-medium">Gross Rent</td>
                      {projections.grossRent.map((amount, index) => (
                        <td key={index} className="border border-gray-200 px-4 py-3 text-center font-semibold text-emerald-600">
                          {formatCurrency(amount)}
                        </td>
                      ))}
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="border border-gray-200 px-4 py-3 font-medium">Operating Income</td>
                      {projections.operatingIncome.map((amount, index) => (
                        <td key={index} className="border border-gray-200 px-4 py-3 text-center font-semibold text-emerald-600">
                          {formatCurrency(amount)}
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Cash Flow Projections */}
            <div>
              <h5 className="font-bold text-gray-800 mb-4 text-lg flex items-center">
                <DollarSign className="w-5 h-5 mr-2 text-blue-600" />
                Cash Flow Projections
              </h5>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gradient-to-r from-blue-50 to-cyan-50">
                      <th className="border border-gray-200 px-4 py-3 text-left font-semibold text-blue-800">Metric</th>
                      {projections.years.map(year => (
                        <th key={year} className="border border-gray-200 px-4 py-3 text-center font-semibold text-blue-800">
                          Year {year}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="hover:bg-gray-50">
                      <td className="border border-gray-200 px-4 py-3 font-medium">Net Operating Income</td>
                      {projections.noi.map((amount, index) => (
                        <td key={index} className="border border-gray-200 px-4 py-3 text-center font-semibold text-blue-600">
                          {formatCurrency(amount)}
                        </td>
                      ))}
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="border border-gray-200 px-4 py-3 font-medium">Cash Flow</td>
                      {projections.cashFlow.map((amount, index) => (
                        <td key={index} className="border border-gray-200 px-4 py-3 text-center font-semibold text-blue-600">
                          {formatCurrency(amount)}
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Equity Accumulation */}
            <div>
              <h5 className="font-bold text-gray-800 mb-4 text-lg flex items-center">
                <PieChart className="w-5 h-5 mr-2 text-purple-600" />
                Equity Accumulation
              </h5>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gradient-to-r from-purple-50 to-violet-50">
                      <th className="border border-gray-200 px-4 py-3 text-left font-semibold text-purple-800">Metric</th>
                      {projections.years.map(year => (
                        <th key={year} className="border border-gray-200 px-4 py-3 text-center font-semibold text-purple-800">
                          Year {year}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="hover:bg-gray-50">
                      <td className="border border-gray-200 px-4 py-3 font-medium">Property Value</td>
                      {projections.propertyValue.map((amount, index) => (
                        <td key={index} className="border border-gray-200 px-4 py-3 text-center font-semibold text-purple-600">
                          {formatCurrency(amount)}
                        </td>
                      ))}
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="border border-gray-200 px-4 py-3 font-medium">Equity</td>
                      {projections.equity.map((amount, index) => (
                        <td key={index} className="border border-gray-200 px-4 py-3 text-center font-semibold text-purple-600">
                          {formatCurrency(amount)}
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Investment Returns */}
            <div>
              <h5 className="font-bold text-gray-800 mb-4 text-lg flex items-center">
                <BarChart3 className="w-5 h-5 mr-2 text-orange-600" />
                Investment Returns
              </h5>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gradient-to-r from-orange-50 to-amber-50">
                      <th className="border border-gray-200 px-4 py-3 text-left font-semibold text-orange-800">Metric</th>
                      {projections.years.map(year => (
                        <th key={year} className="border border-gray-200 px-4 py-3 text-center font-semibold text-orange-800">
                          Year {year}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="hover:bg-gray-50">
                      <td className="border border-gray-200 px-4 py-3 font-medium">Cap Rate</td>
                      {projections.capRate.map((rate, index) => (
                        <td key={index} className="border border-gray-200 px-4 py-3 text-center font-semibold text-orange-600">
                          {formatPercentage(rate)}
                        </td>
                      ))}
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="border border-gray-200 px-4 py-3 font-medium">Cash on Cash Return</td>
                      {projections.cashOnCashReturn.map((rate, index) => (
                        <td key={index} className="border border-gray-200 px-4 py-3 text-center font-semibold text-orange-600">
                          {formatPercentage(rate)}
                        </td>
                      ))}
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="border border-gray-200 px-4 py-3 font-medium">Return on Investment</td>
                      {projections.roi.map((rate, index) => (
                        <td key={index} className="border border-gray-200 px-4 py-3 text-center font-semibold text-orange-600">
                          {formatPercentage(rate)}
                        </td>
                      ))}
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="border border-gray-200 px-4 py-3 font-medium">Internal Rate of Return</td>
                      {projections.irr.map((rate, index) => (
                        <td key={index} className="border border-gray-200 px-4 py-3 text-center font-semibold text-orange-600">
                          {formatPercentage(rate)}
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default ProjectionTables
