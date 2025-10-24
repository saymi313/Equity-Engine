import React from 'react'
import { motion } from 'framer-motion'
import { Calculator } from 'lucide-react'

const SubmitButton = ({ disabled }) => (
  <motion.button
    type="submit"
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    disabled={disabled}
    className={`w-full py-4 px-8 rounded-2xl font-bold text-lg shadow-lg transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-500/50 ${disabled ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-xl'}`}
  >
    <div className="flex items-center justify-center space-x-3">
      <Calculator className="w-6 h-6" />
      <span>{disabled ? 'Please fix errors above' : 'Analyze Property Investment'}</span>
    </div>
  </motion.button>
)

export default SubmitButton
