import React from 'react'
import { motion } from 'framer-motion'
import { Home, MapPin, Calendar, Square, TreePine, Car, Bed, Bath } from 'lucide-react'

function PropertySummary({ propertyData }) {
  if (!propertyData) return null

  const { property_info } = propertyData

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
            <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl shadow-lg">
              <Home className="w-7 h-7 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-bold">Property Summary</h3>
              <p className="text-slate-300 text-sm">Property details and key specifications</p>
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-2 text-slate-300">
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
            <span className="text-sm">Verified</span>
          </div>
        </div>
      </div>
      
      <div className="p-6 space-y-6">
        {/* Address Section */}
        <div className="bg-gradient-to-r from-slate-50 to-gray-50 rounded-2xl p-6 border border-slate-200/50">
          <div className="flex items-start space-x-4">
            <div className="p-3 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl shadow-md">
              <MapPin className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h4 className="font-bold text-slate-800 text-xl mb-1">
                {property_info.street || 'Property Address'}
              </h4>
              <p className="text-slate-600 text-lg">
                {property_info.city}, {property_info.state} {property_info.zip_code}
              </p>
            </div>
          </div>
        </div>

        {/* Property Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-4 rounded-xl border border-blue-200/50">
            <div className="flex items-center space-x-3 mb-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <div className="text-sm text-blue-600 font-medium uppercase tracking-wide">Property Type</div>
            </div>
            <div className="text-lg font-bold text-blue-800">{property_info.property_type}</div>
          </div>
          
          <div className="bg-gradient-to-br from-emerald-50 to-green-50 p-4 rounded-xl border border-emerald-200/50">
            <div className="flex items-center space-x-3 mb-2">
              <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
              <div className="text-sm text-emerald-600 font-medium uppercase tracking-wide">Year Built</div>
            </div>
            <div className="text-lg font-bold text-emerald-800">{property_info.year_built}</div>
          </div>
          
          <div className="bg-gradient-to-br from-purple-50 to-violet-50 p-4 rounded-xl border border-purple-200/50">
            <div className="flex items-center space-x-3 mb-2">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <div className="text-sm text-purple-600 font-medium uppercase tracking-wide">Lot Size</div>
            </div>
            <div className="text-lg font-bold text-purple-800">{property_info.lot_size} acres</div>
          </div>
          
          <div className="bg-gradient-to-br from-orange-50 to-amber-50 p-4 rounded-xl border border-orange-200/50">
            <div className="flex items-center space-x-3 mb-2">
              <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
              <div className="text-sm text-orange-600 font-medium uppercase tracking-wide">Parking</div>
            </div>
            <div className="text-lg font-bold text-orange-800">{property_info.parking}</div>
          </div>
        </div>

        {/* Feature Badges */}
        <div className="space-y-4">
          <h5 className="text-sm font-semibold text-slate-600 uppercase tracking-wide">Key Features</h5>
          <div className="flex flex-wrap gap-3">
            <motion.span 
              whileHover={{ scale: 1.05 }}
              className="px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-full text-sm font-medium shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              {property_info.total_beds} Beds, {property_info.total_baths} Baths
            </motion.span>
            <motion.span 
              whileHover={{ scale: 1.05 }}
              className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-green-500 text-white rounded-full text-sm font-medium shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              {property_info.sqft} sqft
            </motion.span>
            <motion.span 
              whileHover={{ scale: 1.05 }}
              className="px-4 py-2 bg-gradient-to-r from-purple-500 to-violet-500 text-white rounded-full text-sm font-medium shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              Built {property_info.year_built}
            </motion.span>
            <motion.span 
              whileHover={{ scale: 1.05 }}
              className="px-4 py-2 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-full text-sm font-medium shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              {property_info.parking}
            </motion.span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default PropertySummary
