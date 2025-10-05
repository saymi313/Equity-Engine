import React from 'react'

function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-2xl font-bold mb-4">EquityEngine</h3>
            <p className="text-gray-400 mb-4">
              Professional real estate investment analysis and financial reporting platform.
            </p>
            <p className="text-sm text-gray-500">
              © 2025 EquityEngine. All rights reserved.
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <div className="space-y-2 text-gray-400">
              <p>Email: info@equityengine.com</p>
              <p>Phone: (555) 123-4567</p>
              <p>Address: 123 Financial District, NY 10001</p>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Legal</h4>
            <div className="space-y-2 text-gray-400">
              <p className="text-sm">
                <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              </p>
              <p className="text-sm">
                <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              </p>
              <p className="text-sm">
                <a href="#" className="hover:text-white transition-colors">Disclaimer</a>
              </p>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="text-center text-gray-500 text-sm">
            <p className="mb-2">
              <strong>Disclaimer:</strong> This tool is for informational purposes only and should not be considered as financial advice. 
              Always consult with qualified professionals before making investment decisions.
            </p>
            <p>
              Investment results may vary and past performance does not guarantee future results.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
