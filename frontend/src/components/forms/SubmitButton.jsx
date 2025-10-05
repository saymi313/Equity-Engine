import React from 'react'
import { motion } from 'framer-motion'
import { Calculator } from 'lucide-react'

const SubmitButton = () => (
  <motion.button
    type="submit"
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-8 rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-500/50"
  >
    <div className="flex items-center justify-center space-x-3">
      <Calculator className="w-6 h-6" />
      <span>Analyze Property Investment</span>
    </div>
  </motion.button>
)

export default SubmitButton
