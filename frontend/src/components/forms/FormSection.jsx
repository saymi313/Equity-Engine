import React from 'react'
import { motion } from 'framer-motion'
import { ChevronDown, ChevronUp } from 'lucide-react'

const FormSection = ({ title, icon: Icon, section, children, isExpanded, onToggle }) => (
  <motion.div 
    className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    <div 
      className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 cursor-pointer hover:from-blue-100 hover:to-indigo-100 transition-all duration-200"
      onClick={() => onToggle(section)}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-blue-500 rounded-lg">
            <Icon className="w-5 h-5 text-white" />
          </div>
          <h3 className="text-xl font-bold text-gray-800">{title}</h3>
        </div>
        {isExpanded ? (
          <ChevronUp className="w-5 h-5 text-gray-600" />
        ) : (
          <ChevronDown className="w-5 h-5 text-gray-600" />
        )}
      </div>
    </div>
    
    <motion.div
      initial={false}
      animate={{ 
        height: isExpanded ? "auto" : 0,
        opacity: isExpanded ? 1 : 0
      }}
      transition={{ duration: 0.3 }}
      className="overflow-hidden"
    >
      <div className="p-6">
        {children}
      </div>
    </motion.div>
  </motion.div>
)

export default FormSection
