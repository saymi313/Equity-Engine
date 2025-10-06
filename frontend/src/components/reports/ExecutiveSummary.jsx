import React from 'react'
import { motion } from 'framer-motion'
import { TrendingUp, DollarSign, Percent, BarChart3, PieChart } from 'lucide-react'

const ExecutiveSummary = ({ results }) => {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const formatPercentage = (value) => {
    return `${(value * 100).toFixed(2)}%`
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
    >
      <div className="bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 p-6 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-50" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Ccircle cx='30' cy='30' r='1.5'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
        <div className="relative z-10 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl shadow-lg">
              <BarChart3 className="w-7 h-7 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-bold">Executive Summary</h3>
              <p className="text-slate-300 text-sm">Key performance indicators and financial metrics</p>
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-2 text-slate-300">
            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
            <span className="text-sm">Live Analysis</span>
          </div>
        </div>
      </div>
      
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <motion.div 
            whileHover={{ scale: 1.02, y: -2 }}
            className="group relative overflow-hidden bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 rounded-2xl border border-emerald-200/50 shadow-sm hover:shadow-lg transition-all duration-300"
          >
            <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-emerald-400/20 to-teal-400/20 rounded-full -translate-y-10 translate-x-10"></div>
            <div className="relative p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl shadow-md group-hover:shadow-lg transition-shadow duration-300">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <div className="text-right">
                  <div className="text-xs text-emerald-600 font-medium uppercase tracking-wide">Monthly</div>
                  <div className="text-xs text-gray-500">Cash Flow</div>
                </div>
              </div>
              <div className="text-3xl font-bold text-emerald-700 mb-2">
                {formatCurrency(results.cashFlow)}
              </div>
              <div className="flex items-center text-sm text-emerald-600">
                <div className="w-2 h-2 bg-emerald-500 rounded-full mr-2"></div>
                Monthly Cash Flow
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            whileHover={{ scale: 1.02, y: -2 }}
            className="group relative overflow-hidden bg-gradient-to-br from-blue-50 via-indigo-50 to-cyan-50 rounded-2xl border border-blue-200/50 shadow-sm hover:shadow-lg transition-all duration-300"
          >
            <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-400/20 to-cyan-400/20 rounded-full -translate-y-10 translate-x-10"></div>
            <div className="relative p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl shadow-md group-hover:shadow-lg transition-shadow duration-300">
                  <Percent className="w-6 h-6 text-white" />
                </div>
                <div className="text-right">
                  <div className="text-xs text-blue-600 font-medium uppercase tracking-wide">Return</div>
                  <div className="text-xs text-gray-500">On Investment</div>
                </div>
              </div>
              <div className="text-3xl font-bold text-blue-700 mb-2">
                {formatPercentage(results.roi)}
              </div>
              <div className="flex items-center text-sm text-blue-600">
                <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                Return on Investment
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            whileHover={{ scale: 1.02, y: -2 }}
            className="group relative overflow-hidden bg-gradient-to-br from-purple-50 via-violet-50 to-pink-50 rounded-2xl border border-purple-200/50 shadow-sm hover:shadow-lg transition-all duration-300"
          >
            <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full -translate-y-10 translate-x-10"></div>
            <div className="relative p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl shadow-md group-hover:shadow-lg transition-shadow duration-300">
                  <PieChart className="w-6 h-6 text-white" />
                </div>
                <div className="text-right">
                  <div className="text-xs text-purple-600 font-medium uppercase tracking-wide">Capitalization</div>
                  <div className="text-xs text-gray-500">Rate</div>
                </div>
              </div>
              <div className="text-3xl font-bold text-purple-700 mb-2">
                {formatPercentage(results.capRate)}
              </div>
              <div className="flex items-center text-sm text-purple-600">
                <div className="w-2 h-2 bg-purple-500 rounded-full mr-2"></div>
                Capitalization Rate
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            whileHover={{ scale: 1.02, y: -2 }}
            className="group relative overflow-hidden bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 rounded-2xl border border-orange-200/50 shadow-sm hover:shadow-lg transition-all duration-300"
          >
            <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-orange-400/20 to-red-400/20 rounded-full -translate-y-10 translate-x-10"></div>
            <div className="relative p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl shadow-md group-hover:shadow-lg transition-shadow duration-300">
                  <DollarSign className="w-6 h-6 text-white" />
                </div>
                <div className="text-right">
                  <div className="text-xs text-orange-600 font-medium uppercase tracking-wide">Annual</div>
                  <div className="text-xs text-gray-500">Equity Growth</div>
                </div>
              </div>
              <div className="text-3xl font-bold text-orange-700 mb-2">
                {formatCurrency(results.equityGrowth)}
              </div>
              <div className="flex items-center text-sm text-orange-600">
                <div className="w-2 h-2 bg-orange-500 rounded-full mr-2"></div>
                Year 1 Equity
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}

export default ExecutiveSummary
