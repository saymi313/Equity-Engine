import React from 'react'
import { motion } from 'framer-motion'
import { Calculator } from 'lucide-react'

const FinancialBreakdown = ({ results }) => {
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
      transition={{ duration: 0.5, delay: 0.1 }}
      className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
    >
      <div className="bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 p-6 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-50" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Ccircle cx='30' cy='30' r='1.5'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
        <div className="relative z-10 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl shadow-lg">
              <Calculator className="w-7 h-7 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-bold">Financial Breakdown</h3>
              <p className="text-slate-300 text-sm">Monthly income, expenses, and net cash flow analysis</p>
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-2 text-slate-300">
            <div className="w-2 h-2 bg-indigo-400 rounded-full animate-pulse"></div>
            <span className="text-sm">Real-time</span>
          </div>
        </div>
      </div>
      
      <div className="p-6">
        <div className="space-y-6">
          {/* Income Section */}
          <div className="bg-gradient-to-r from-emerald-50 to-green-50 rounded-2xl border border-emerald-200/50 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-emerald-500 rounded-lg">
                  <div className="w-4 h-4 bg-white rounded-sm"></div>
                </div>
                <div>
                  <h4 className="font-semibold text-emerald-800">Monthly Income</h4>
                  <p className="text-sm text-emerald-600">Gross rental income</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-emerald-700">
                  {formatCurrency(results.monthlyRent)}
                </div>
                <div className="text-sm text-emerald-600">per month</div>
              </div>
            </div>
            <div className="w-full bg-emerald-200 rounded-full h-2">
              <div className="bg-emerald-500 h-2 rounded-full w-full"></div>
            </div>
          </div>

          {/* Expenses Section */}
          <div className="bg-gradient-to-r from-red-50 to-rose-50 rounded-2xl border border-red-200/50 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-red-500 rounded-lg">
                  <div className="w-4 h-4 bg-white rounded-sm"></div>
                </div>
                <div>
                  <h4 className="font-semibold text-red-800">Monthly Expenses</h4>
                  <p className="text-sm text-red-600">Total operating costs</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-red-700">
                  {formatCurrency(results.monthlyExpenses)}
                </div>
                <div className="text-sm text-red-600">per month</div>
              </div>
            </div>
            <div className="w-full bg-red-200 rounded-full h-2">
              <div className="bg-red-500 h-2 rounded-full" style={{width: `${(results.monthlyExpenses / results.monthlyRent) * 100}%`}}></div>
            </div>
          </div>

          {/* Net Income Section */}
          <div className="bg-gradient-to-r from-slate-50 to-gray-50 rounded-2xl border-2 border-slate-300 p-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-emerald-400/10 to-green-400/10 rounded-full -translate-y-16 translate-x-16"></div>
            <div className="relative">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <div className="p-4 bg-gradient-to-r from-emerald-500 to-green-500 rounded-2xl shadow-lg">
                    <div className="w-6 h-6 bg-white rounded-lg flex items-center justify-center">
                      <span className="text-emerald-600 font-bold text-lg">$</span>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-2xl font-bold text-slate-800">Net Cash Flow</h4>
                    <p className="text-slate-600">Monthly profit after all expenses</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-4xl font-bold text-emerald-700 mb-2">
                    {formatCurrency(results.netIncome)}
                  </div>
                  <div className="text-lg text-emerald-600 font-medium">per month</div>
                </div>
              </div>
              
              {/* Progress Bar */}
              <div className="space-y-3">
                <div className="flex justify-between text-sm text-slate-600">
                  <span>Expenses</span>
                  <span>Income</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-4 relative overflow-hidden">
                  <div 
                    className="bg-red-400 h-4 rounded-l-full absolute left-0" 
                    style={{width: `${(results.monthlyExpenses / results.monthlyRent) * 100}%`}}
                  ></div>
                  <div 
                    className="bg-emerald-500 h-4 rounded-r-full absolute right-0" 
                    style={{width: `${(results.netIncome / results.monthlyRent) * 100}%`}}
                  ></div>
                </div>
                <div className="flex justify-between text-xs text-slate-500">
                  <span>{formatCurrency(results.monthlyExpenses)}</span>
                  <span>{formatCurrency(results.monthlyRent)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default FinancialBreakdown
