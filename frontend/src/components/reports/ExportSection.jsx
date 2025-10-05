import React from 'react'
import { motion } from 'framer-motion'
import { FileText, Download } from 'lucide-react'
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'
import * as XLSX from 'xlsx'
import { saveAs } from 'file-saver'

const ExportSection = ({ propertyData, results }) => {
  const exportToPDF = async () => {
    try {
      // Get the report dashboard element
      const reportElement = document.querySelector('.report-dashboard')
      if (!reportElement) {
        alert('Report not found. Please generate a report first.')
        return
      }

      // Create canvas from the report element
      const canvas = await html2canvas(reportElement, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff'
      })

      // Create PDF
      const imgData = canvas.toDataURL('image/png')
      const pdf = new jsPDF('p', 'mm', 'a4')
      const imgWidth = 210
      const pageHeight = 295
      const imgHeight = (canvas.height * imgWidth) / canvas.width
      let heightLeft = imgHeight

      let position = 0

      // Add header
      pdf.setFontSize(20)
      pdf.setFont('helvetica', 'bold')
      pdf.text('Property Investment Analysis Report', 20, 20)
      
      pdf.setFontSize(12)
      pdf.setFont('helvetica', 'normal')
      pdf.text(`Generated on: ${new Date().toLocaleDateString()}`, 20, 30)
      
      if (propertyData?.property_info) {
        pdf.text(`Property: ${propertyData.property_info.street}, ${propertyData.property_info.city}`, 20, 35)
      }

      // Add the image
      pdf.addImage(imgData, 'PNG', 0, 45, imgWidth, imgHeight)
      heightLeft -= pageHeight - 45

      // Add new pages if needed
      while (heightLeft >= 0) {
        position = heightLeft - imgHeight
        pdf.addPage()
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight)
        heightLeft -= pageHeight
      }

      // Save the PDF
      pdf.save('property-investment-analysis.pdf')
    } catch (error) {
      console.error('Error generating PDF:', error)
      alert('Error generating PDF. Please try again.')
    }
  }

  const exportToExcel = () => {
    try {
      if (!propertyData || !results) {
        alert('No data available to export. Please generate a report first.')
        return
      }

      // Prepare data for Excel
      const excelData = []

      // Property Information
      excelData.push(['PROPERTY INVESTMENT ANALYSIS REPORT'])
      excelData.push(['Generated on:', new Date().toLocaleDateString()])
      excelData.push([])

      if (propertyData.property_info) {
        excelData.push(['PROPERTY INFORMATION'])
        excelData.push(['Address:', `${propertyData.property_info.street}, ${propertyData.property_info.city}, ${propertyData.property_info.state} ${propertyData.property_info.zip_code}`])
        excelData.push(['Property Type:', propertyData.property_info.property_type])
        excelData.push(['Year Built:', propertyData.property_info.year_built])
        excelData.push(['Square Feet:', propertyData.property_info.sqft])
        excelData.push(['Lot Size:', `${propertyData.property_info.lot_size} acres`])
        excelData.push(['Beds/Baths:', `${propertyData.property_info.total_beds}/${propertyData.property_info.total_baths}`])
        excelData.push(['Parking:', propertyData.property_info.parking])
        excelData.push([])
      }

      // Financial Summary
      excelData.push(['FINANCIAL SUMMARY'])
      excelData.push(['Monthly Cash Flow:', `$${results.cashFlow?.toLocaleString() || 'N/A'}`])
      excelData.push(['ROI:', `${(results.roi * 100)?.toFixed(2) || 'N/A'}%`])
      excelData.push(['Cap Rate:', `${(results.capRate * 100)?.toFixed(2) || 'N/A'}%`])
      excelData.push(['Annual Equity Growth:', `$${results.equityGrowth?.toLocaleString() || 'N/A'}`])
      excelData.push([])

      // Monthly Breakdown
      excelData.push(['MONTHLY BREAKDOWN'])
      excelData.push(['Monthly Rent:', `$${results.monthlyRent?.toLocaleString() || 'N/A'}`])
      excelData.push(['Monthly Expenses:', `$${results.monthlyExpenses?.toLocaleString() || 'N/A'}`])
      excelData.push(['Net Income:', `$${results.netIncome?.toLocaleString() || 'N/A'}`])
      excelData.push([])

      // Purchase Information
      if (propertyData.purchase_info) {
        excelData.push(['PURCHASE INFORMATION'])
        excelData.push(['Purchase Price:', `$${propertyData.purchase_info.purchase_price?.toLocaleString() || 'N/A'}`])
        excelData.push(['Closing Cost:', `$${propertyData.purchase_info.closing_cost?.toLocaleString() || 'N/A'}`])
        excelData.push(['Initial Improvements:', `$${propertyData.purchase_info.initial_improvements?.toLocaleString() || 'N/A'}`])
        excelData.push(['Purchase Date:', propertyData.purchase_info.purchase_date || 'N/A'])
        excelData.push([])
      }

      // Loan Information
      if (propertyData.loan_info) {
        excelData.push(['LOAN INFORMATION'])
        excelData.push(['Down Payment:', `${(propertyData.loan_info.percent_down * 100)?.toFixed(2) || 'N/A'}%`])
        excelData.push(['Interest Rate:', `${(propertyData.loan_info.interest_rate * 100)?.toFixed(2) || 'N/A'}%`])
        excelData.push(['Loan Term:', `${propertyData.loan_info.loan_term_years || 'N/A'} years`])
        excelData.push([])
      }

      // Create workbook and worksheet
      const ws = XLSX.utils.aoa_to_sheet(excelData)
      const wb = XLSX.utils.book_new()
      XLSX.utils.book_append_sheet(wb, ws, 'Property Analysis')

      // Set column widths
      ws['!cols'] = [
        { wch: 25 },
        { wch: 20 }
      ]

      // Save the file
      const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' })
      const data = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })
      saveAs(data, 'property-investment-analysis.xlsx')
    } catch (error) {
      console.error('Error generating Excel:', error)
      alert('Error generating Excel file. Please try again.')
    }
  }

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
            <div className="p-3 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl shadow-lg">
              <FileText className="w-7 h-7 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-bold">Export Report</h3>
              <p className="text-slate-300 text-sm">Download professional reports in multiple formats</p>
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-2 text-slate-300">
            <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse"></div>
            <span className="text-sm">Ready</span>
          </div>
        </div>
      </div>
      
      <div className="p-6">
        <p className="text-gray-600 mb-6 text-center">
          Generate a professional investment report for presentations and documentation.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.button
            onClick={exportToPDF}
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="group relative overflow-hidden bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white p-6 rounded-2xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -translate-y-10 translate-x-10"></div>
            <div className="relative flex items-center justify-center space-x-3">
              <div className="p-2 bg-white/20 rounded-lg group-hover:bg-white/30 transition-colors duration-300">
                <FileText className="w-6 h-6" />
              </div>
              <div className="text-left">
                <div className="text-lg font-bold">Export PDF</div>
                <div className="text-sm opacity-90">Professional report</div>
              </div>
            </div>
          </motion.button>
          
          <motion.button
            onClick={exportToExcel}
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="group relative overflow-hidden bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white p-6 rounded-2xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -translate-y-10 translate-x-10"></div>
            <div className="relative flex items-center justify-center space-x-3">
              <div className="p-2 bg-white/20 rounded-lg group-hover:bg-white/30 transition-colors duration-300">
                <Download className="w-6 h-6" />
              </div>
              <div className="text-left">
                <div className="text-lg font-bold">Export Excel</div>
                <div className="text-sm opacity-90">Data spreadsheet</div>
              </div>
            </div>
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
}

export default ExportSection
