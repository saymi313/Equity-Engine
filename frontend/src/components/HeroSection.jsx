import React from 'react'
import { motion } from 'framer-motion'
import { TrendingUp, Calculator, FileText, Home, DollarSign, BarChart3 } from 'lucide-react'

function HeroSection() {
  return (
    <div className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="w-full h-full" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
      </div>
      
      {/* Floating Elements */}
      <motion.div 
        className="absolute top-20 left-10 w-20 h-20 bg-blue-500/20 rounded-full blur-xl"
        animate={{ 
          y: [0, -20, 0],
          x: [0, 10, 0]
        }}
        transition={{ 
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div 
        className="absolute top-40 right-20 w-32 h-32 bg-purple-500/20 rounded-full blur-xl"
        animate={{ 
          y: [0, 20, 0],
          x: [0, -15, 0]
        }}
        transition={{ 
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl mb-6 shadow-2xl">
              <Home className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent mb-4">
              EquityEngine
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-3 font-light">
              Your Property & Financial Analyzer
            </p>
            <p className="text-base text-blue-200 max-w-2xl mx-auto leading-relaxed">
              Transform your real estate investments with AI-powered analysis, 
              comprehensive financial modeling, and professional-grade reporting.
            </p>
          </motion.div>
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {[
            { icon: DollarSign, title: "Zero Setup Cost", desc: "Start analyzing immediately", color: "from-green-500 to-emerald-600" },
            { icon: Calculator, title: "5-Minute Analysis", desc: "Get results in minutes", color: "from-blue-500 to-cyan-600" },
            { icon: FileText, title: "Professional Reports", desc: "Export-ready documentation", color: "from-purple-500 to-pink-600" }
          ].map((item, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05, y: -5 }}
              className="group relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-20 rounded-2xl blur-xl transition-opacity duration-300" 
                   style={{ backgroundImage: `linear-gradient(to right, var(--tw-gradient-stops))` }}></div>
              <div className="relative bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 hover:border-white/40 transition-all duration-300">
                <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${item.color} rounded-xl mb-4 shadow-lg`}>
                  <item.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                <p className="text-blue-200">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-8"
        >
          <div className="inline-flex items-center space-x-4 bg-white/10 backdrop-blur-md rounded-full px-6 py-3 border border-white/20">
            <TrendingUp className="w-5 h-5 text-green-400" />
            <span className="text-white font-medium text-sm">Start Your Investment Analysis</span>
            <BarChart3 className="w-5 h-5 text-blue-400" />
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default HeroSection
