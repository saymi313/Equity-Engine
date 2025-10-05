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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h4 className="font-bold text-gray-800 mb-4 text-lg">Income Analysis</h4>
            <div className="space-y-3">
              <div className="flex justify-between items-center py-2 px-3 bg-gray-50 rounded-lg">
                <span className="text-gray-600">Gross Rent</span>
                <span className="font-semibold text-green-600">{formatCurrency(results.monthlyRent)}</span>
              </div>
              <div className="flex justify-between items-center py-2 px-3 bg-gray-50 rounded-lg">
                <span className="text-gray-600">Vacancy (4%)</span>
                <span className="font-semibold text-red-600">
                  -{formatCurrency(results.monthlyRent * 0.04)}
                </span>
              </div>
              <div className="flex justify-between items-center py-2 px-3 bg-gray-50 rounded-lg">
                <span className="text-gray-600">Management (10%)</span>
                <span className="font-semibold text-red-600">
                  -{formatCurrency(results.monthlyRent * 0.1)}
                </span>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="font-bold text-gray-800 mb-4 text-lg">Expense Analysis</h4>
            <div className="space-y-3">
              <div className="flex justify-between items-center py-2 px-3 bg-gray-50 rounded-lg">
                <span className="text-gray-600">Property Tax</span>
                <span className="font-semibold text-red-600">
                  -{formatCurrency(propertyData.owner_paid_expenses.property_tax_yr / 12)}
                </span>
              </div>
              <div className="flex justify-between items-center py-2 px-3 bg-gray-50 rounded-lg">
                <span className="text-gray-600">Insurance</span>
                <span className="font-semibold text-red-600">
                  -{formatCurrency(propertyData.owner_paid_expenses.insurance_mo)}
                </span>
              </div>
              <div className="flex justify-between items-center py-2 px-3 bg-gray-50 rounded-lg">
                <span className="text-gray-600">Maintenance (10%)</span>
                <span className="font-semibold text-red-600">
                  -{formatCurrency(results.monthlyRent * 0.1)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default DetailedAnalysis
