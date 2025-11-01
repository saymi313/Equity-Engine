import React from 'react'
import { motion } from 'framer-motion'
import { FileText, Download } from 'lucide-react'
import jsPDF from 'jspdf'
import * as XLSX from 'xlsx'
import { saveAs } from 'file-saver'

const ExportSection = ({ propertyData, results }) => {
  const exportToPDF = async () => {
    try {
      if (!results) {
        alert('No data available to export. Please generate a report first.')
        return
      }

      const pdf = new jsPDF('p', 'mm', 'a4')
      const page = { w: 210, h: 297, margin: 20 }

      // Modern color scheme
      const colors = {
        primary: '#1e293b',    // slate-800
        secondary: '#3b82f6',  // blue-500
        accent: '#8b5cf6',     // violet-500
        success: '#10b981',    // emerald-500
        warning: '#f59e0b',    // amber-500
        danger: '#ef4444',     // red-500
        light: '#f8fafc',      // slate-50
        dark: '#0f172a',       // slate-900
        gray: '#64748b'         // slate-500
      }

      // Helper functions for formatting
      const formatCurrency = (value) => {
        if (typeof value !== 'number' || isNaN(value)) return '—'
        const formatted = new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        }).format(Math.abs(value))
        return value < 0 ? `-${formatted}` : formatted
      }

      const formatPercentage = (value) => {
        if (typeof value !== 'number' || isNaN(value)) return '—'
        return new Intl.NumberFormat('en-US', {
          style: 'percent',
          minimumFractionDigits: 1,
          maximumFractionDigits: 1,
        }).format(value)
      }

      const formatNumber = (value, decimals = 2) => {
        if (typeof value !== 'number' || isNaN(value)) return '—'
        return value.toFixed(decimals)
      }

      // Helper function to add section headers
      const addSectionHeader = (title, y, color = colors.primary) => {
        pdf.setFillColor(248, 250, 252) // slate-50
        pdf.rect(page.margin - 5, y - 8, page.w - 2 * (page.margin - 5), 12, 'F')

        pdf.setFont('helvetica', 'bold')
        pdf.setFontSize(14)
        pdf.setTextColor(color)
        pdf.text(title, page.margin, y)

        // Add subtle line
        pdf.setDrawColor(color)
        pdf.setLineWidth(0.8)
        pdf.line(page.margin, y + 2, page.w - page.margin, y + 2)

        return y + 10
      }

      // Helper function to add data rows with proper spacing
      const addDataRows = (rows, startY, columns = 2) => {
        let y = startY
        const colWidth = (page.w - 2 * page.margin) / columns

        rows.forEach((row, index) => {
          const col = index % columns
          const x = page.margin + (col * colWidth)

          // Add subtle background for alternating rows
          if (index % 2 === 0) {
            pdf.setFillColor(248, 250, 252) // slate-50
            pdf.rect(x - 2, y - 3, colWidth - 4, 8, 'F')
          }

          // Label
          pdf.setFont('helvetica', 'normal')
          pdf.setFontSize(10)
          pdf.setTextColor(colors.gray)
          pdf.text(row.label, x, y)

          // Value
          pdf.setFont('helvetica', 'bold')
          pdf.setFontSize(10)
          pdf.setTextColor(colors.primary)
          const valueText = typeof row.value === 'string' ? row.value : formatCurrency(row.value)
          pdf.text(valueText, x + colWidth - 10, y, { align: 'right' })

          // Move to next row
          if (col === columns - 1) y += 8
        })

        return y + (rows.length % columns === 0 ? 0 : 8) + 5
      }

      // Helper function to check if we need a new page
      const checkNewPage = (currentY, spaceNeeded = 20) => {
        if (currentY + spaceNeeded > page.h - 30) {
          pdf.addPage()
          return 30
        }
        return currentY
      }

      let y = 30

      // Modern Header with gradient effect
      pdf.setFillColor(30, 41, 59) // slate-800
      pdf.rect(0, 0, page.w, 35, 'F')

      // Logo area
      pdf.setFillColor(59, 130, 246) // blue-500
      pdf.rect(0, 0, 8, 35, 'F')

      // Header text
      pdf.setTextColor(255, 255, 255)
      pdf.setFont('helvetica', 'bold')
      pdf.setFontSize(18)
      pdf.text('EquityEngine', 15, 15)

      pdf.setFont('helvetica', 'normal')
      pdf.setFontSize(10)
      pdf.text('Property Investment Analysis Report', 15, 22)

      // Date
      pdf.setFontSize(9)
      pdf.text(`Generated: ${new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })}`, page.w - page.margin, 15, { align: 'right' })

      y = 50

      // Property Information Section
      y = addSectionHeader('Property Information', y, colors.secondary)
      y = checkNewPage(y, 30)

      const propertyRows = [
        {
          label: 'Address', value: propertyData?.property_info ?
            `${propertyData.property_info.street}, ${propertyData.property_info.city}, ${propertyData.property_info.state} ${propertyData.property_info.zip_code}` : '—'
        },
        { label: 'Property Type', value: propertyData?.property_info?.property_type || '—' },
        { label: 'Year Built', value: propertyData?.property_info?.year_built || '—' },
        { label: 'Square Feet', value: propertyData?.property_info?.sqft ? `${propertyData.property_info.sqft.toLocaleString()} sqft` : '—' },
        { label: 'Lot Size', value: propertyData?.property_info?.lot_size ? `${propertyData.property_info.lot_size} acres` : '—' },
        {
          label: 'Beds/Baths', value: propertyData?.property_info ?
            `${propertyData.property_info.total_beds}/${propertyData.property_info.total_baths}` : '—'
        },
        { label: 'Parking', value: propertyData?.property_info?.parking || '—' }
      ]
      y = addDataRows(propertyRows, y, 2)

      // Executive Summary Section
      y = checkNewPage(y, 40)
      y = addSectionHeader('Executive Summary (Year 1)', y, colors.accent)

      const summaryRows = [
        { label: 'Monthly Cash Flow', value: results.cashFlow },
        { label: 'Return on Investment (ROI)', value: results.roi },
        { label: 'Capitalization Rate', value: results.capRate },
        { label: 'Year 1 Equity Growth', value: results.equityGrowth },
        { label: 'Cash on Cash Return', value: results.cashOnCashReturn },
        { label: 'Return on Equity', value: results.returnOnEquity }
      ]
      y = addDataRows(summaryRows, y, 2)

      // Monthly Financial Breakdown
      y = checkNewPage(y, 40)
      y = addSectionHeader('Monthly Financial Breakdown', y, colors.success)

      const monthlyRows = [
        { label: 'Gross Monthly Rent', value: results.monthlyRent },
        { label: 'Monthly Operating Expenses', value: results.monthlyExpenses },
        { label: 'Net Monthly Income', value: results.netIncome },
        { label: 'Monthly Mortgage Payment', value: results.mortgageMonthly }
      ]
      y = addDataRows(monthlyRows, y, 2)

      // Purchase & Financing Details
      y = checkNewPage(y, 40)
      y = addSectionHeader('Purchase & Financing', y, colors.warning)

      const purchaseRows = [
        { label: 'Purchase Price', value: results.purchasePrice },
        { label: 'Down Payment', value: results.downPayment },
        { label: 'Loan Amount', value: results.loanAmount },
        { label: 'Total Cash Invested', value: results.totalCashInvested },
        {
          label: 'Interest Rate', value: propertyData?.loan_info?.interest_rate ?
            formatPercentage(propertyData.loan_info.interest_rate) : '—'
        },
        {
          label: 'Loan Term', value: propertyData?.loan_info?.loan_term_years ?
            `${propertyData.loan_info.loan_term_years} years` : '—'
        }
      ]
      y = addDataRows(purchaseRows, y, 2)

      // Annual Financial Summary
      y = checkNewPage(y, 40)
      y = addSectionHeader('Annual Financial Summary (Year 1)', y, colors.danger)

      const annualRows = [
        { label: 'Gross Annual Rent', value: results.grossRentAnnual },
        { label: 'Vacancy Loss', value: results.vacancyLossAnnual },
        { label: 'Operating Income', value: results.operatingIncomeAnnual },
        { label: 'Operating Expenses', value: results.operatingExpensesAnnual },
        { label: 'Net Operating Income (NOI)', value: results.noiAnnual },
        { label: 'Annual Cash Flow', value: results.cashFlowAnnual }
      ]
      y = addDataRows(annualRows, y, 2)

      // Key Financial Ratios
      y = checkNewPage(y, 40)
      y = addSectionHeader('Key Financial Ratios', y, colors.primary)

      const ratioRows = [
        {
          label: 'Gross Rent Multiplier', value: results.grossRentMultiplier ?
            formatNumber(results.grossRentMultiplier) : '—'
        },
        { label: 'Break Even Ratio', value: results.breakEvenRatio },
        {
          label: 'Debt Coverage Ratio', value: results.debtCoverageRatio ?
            formatNumber(results.debtCoverageRatio) : '—'
        },
        { label: 'Debt Yield', value: results.debtYield },
        {
          label: 'Equity Multiple', value: results.equityMultiple ?
            formatNumber(results.equityMultiple) : '—'
        },
        { label: 'Internal Rate of Return (IRR)', value: results.irr }
      ]
      y = addDataRows(ratioRows, y, 2)

      // Operating Expenses Breakdown
      y = checkNewPage(y, 40)
      y = addSectionHeader('Operating Expenses Breakdown', y, colors.secondary)

      const expenseRows = [
        { label: 'Property Tax (Monthly)', value: results.propertyTaxMonthly },
        { label: 'Insurance (Monthly)', value: results.insuranceMonthly },
        { label: 'Property Management (Monthly)', value: results.propertyManagementMonthly },
        { label: 'Maintenance (Monthly)', value: results.maintenanceMonthly },
        { label: 'Owner Paid Utilities (Monthly)', value: results.ownerPaidUtilitiesMonthly }
      ]
      y = addDataRows(expenseRows, y, 2)

      // Tax Benefits & Deductions Section (if yearly_data available)
      if (propertyData?.yearly_data?.[1]) {
        const year1 = propertyData.yearly_data[1]
        y = checkNewPage(y, 50)
        y = addSectionHeader('Tax Benefits & Deductions (Year 1)', y, colors.accent)

        const taxRows = [
          { label: 'Operating Income (Tax)', value: year1.effective_gross_income },
          { label: 'Operating Expenses (Tax)', value: -year1.total_operating_expenses },
          { label: 'Loan Interest', value: -year1.interest_paid },
          { label: 'Depreciation', value: -year1.depreciation },
          { label: 'Total Deductions', value: -(year1.total_operating_expenses + year1.interest_paid + year1.depreciation) },
          { label: 'Taxable Income', value: year1.taxable_income },
          { label: 'Income Tax Due', value: -year1.income_tax_due }
        ]
        y = addDataRows(taxRows, y, 2)
      }

      // Capital Gain Tax Section (if yearly_data available)
      if (propertyData?.yearly_data?.[1]) {
        const year1 = propertyData.yearly_data[1]
        y = checkNewPage(y, 60)
        y = addSectionHeader('Capital Gain Tax Analysis (Year 1)', y, colors.warning)

        const capGainRows = [
          { label: 'Original Cost Basis', value: year1.original_cost_basis },
          { label: 'Capital Improvements', value: propertyData.purchase_info?.initial_improvements || 0 },
          { label: 'Cumulative Depreciation', value: -year1.cum_dep },
          { label: 'Selling Cost (Tax)', value: year1.selling_cost },
          { label: 'Adjusted Cost Basis', value: -year1.adjusted_cost_basis },
          { label: 'Sale Price', value: year1.property_value },
          { label: 'Capital Gain', value: year1.capital_gain },
          { label: 'Tax on Capital Gain', value: -year1.tax_on_capital_gain },
          { label: 'Recapture Tax', value: -year1.recapture_tax }
        ]
        y = addDataRows(capGainRows, y, 2)
      }

      // Sale Analysis Section (if yearly_data available)
      if (propertyData?.yearly_data?.[1]) {
        const year1 = propertyData.yearly_data[1]
        y = checkNewPage(y, 60)
        y = addSectionHeader('Sale Analysis - Pre-Tax (Year 1)', y, colors.success)

        const salePreTaxRows = [
          { label: 'Equity', value: year1.equity },
          { label: 'Selling Cost', value: -year1.selling_cost },
          { label: 'Sale Proceeds', value: year1.sale_proceeds },
          { label: 'Cumulative Cash Flow', value: year1.cum_cash_flow },
          { label: 'Total Cash Invested', value: -results.totalCashInvested },
          { label: 'Total Profit (Pre-Tax)', value: year1.total_profit_pre_tax }
        ]
        y = addDataRows(salePreTaxRows, y, 2)
      }

      // Sale Analysis Post-Tax Section (if yearly_data available)
      if (propertyData?.yearly_data?.[1]) {
        const year1 = propertyData.yearly_data[1]
        y = checkNewPage(y, 50)
        y = addSectionHeader('Sale Analysis - Post-Tax (Year 1)', y, colors.danger)

        const salePostTaxRows = [
          { label: 'Total Profit (Pre-Tax)', value: year1.total_profit_pre_tax },
          { label: 'Cumulative Income Tax Paid', value: -year1.cum_income_tax },
          { label: 'Capital Gain Tax Due', value: -year1.tax_on_capital_gain },
          { label: 'Recapture Tax Due', value: -year1.recapture_tax },
          { label: 'Total Profit (Post-Tax)', value: year1.total_profit_post_tax }
        ]
        y = addDataRows(salePostTaxRows, y, 2)
      }

      // Detailed Projections Table (if available)
      if (results.projections && propertyData?.yearly_data) {
        y = checkNewPage(y, 80)
        y = addSectionHeader('Long-term Projections (Years 1, 5, 10, 20, 30)', y, colors.accent)

        const projectionYears = results.projections.years
        const projectionData = [
          ['Year', 'Gross Rent', 'Op Income', 'Op Expenses', 'NOI', 'Cash Flow', 'Prop Value', 'Equity', 'Cap Rate %', 'ROI %']
        ]

        projectionYears.forEach((year, index) => {
          const yearData = propertyData.yearly_data[year]
          if (yearData) {
            projectionData.push([
              year.toString(),
              formatCurrency(results.projections.grossRent[index]),
              formatCurrency(results.projections.operatingIncome[index]),
              formatCurrency(results.projections.operatingExpenses[index]),
              formatCurrency(results.projections.noi[index]),
              formatCurrency(results.projections.cashFlow[index]),
              formatCurrency(results.projections.propertyValue[index]),
              formatCurrency(results.projections.equity[index]),
              `${results.projections.capRate[index].toFixed(1)}%`,
              `${results.projections.roi[index].toFixed(1)}%`
            ])
          }
        })

        // Enhanced table implementation with more columns
        const colWidths = [12, 22, 22, 22, 22, 22, 22, 22, 18, 18]
        const startX = page.margin

        projectionData.forEach((row, rowIndex) => {
          let x = startX
          row.forEach((cell, colIndex) => {
            pdf.setFont('helvetica', rowIndex === 0 ? 'bold' : 'normal')
            pdf.setFontSize(rowIndex === 0 ? 8 : 7)
            pdf.setTextColor(rowIndex === 0 ? colors.primary : colors.gray)
            // Truncate long values for better fit
            const displayCell = cell.length > 15 ? cell.substring(0, 12) + '...' : cell
            pdf.text(displayCell, x, y, { maxWidth: colWidths[colIndex] })
            x += colWidths[colIndex]
          })
          y += rowIndex === 0 ? 6 : 5
          // Check for new page
          if (y > page.h - 30 && rowIndex < projectionData.length - 1) {
            pdf.addPage()
            y = 30
            // Redraw header row on new page
            pdf.setFont('helvetica', 'bold')
            pdf.setFontSize(8)
            pdf.setTextColor(colors.primary)
            let hx = startX
            projectionData[0].forEach((cell, colIndex) => {
              pdf.text(cell, hx, y, { maxWidth: colWidths[colIndex] })
              hx += colWidths[colIndex]
            })
            y += 6
          }
        })
        y += 10
      }

      // Modern Footer with proper branding
      const footerY = page.h - 25

      // Footer background
      pdf.setFillColor(248, 250, 252) // slate-50
      pdf.rect(0, footerY - 10, page.w, 25, 'F')

      // Footer line
      pdf.setDrawColor(203, 213, 225) // slate-300
      pdf.setLineWidth(0.5)
      pdf.line(page.margin, footerY - 5, page.w - page.margin, footerY - 5)

      // Footer text
      pdf.setFont('helvetica', 'bold')
      pdf.setFontSize(11)
      pdf.setTextColor(colors.primary)
      pdf.text('Equity Engine', page.margin, footerY + 5)

      pdf.setFont('helvetica', 'normal')
      pdf.setFontSize(10)
      pdf.setTextColor(colors.gray)
      pdf.text('  a project of', page.margin + 25, footerY + 5)

      pdf.setFont('times new roman', 'bold')
      pdf.setTextColor(colors.secondary)
      pdf.textWithLink('Avancod', page.margin + 45, footerY + 5, { url: 'https://www.avancod.com' })

      pdf.save('EquityEngine_Property_Analysis_Report.pdf')
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

      // Helper functions for formatting
      const formatCurrency = (value) => {
        if (typeof value !== 'number' || isNaN(value)) return 'N/A'
        return `$${value.toLocaleString()}`
      }

      const formatPercentage = (value) => {
        if (typeof value !== 'number' || isNaN(value)) return 'N/A'
        return `${(value * 100).toFixed(2)}%`
      }

      const formatNumber = (value, decimals = 2) => {
        if (typeof value !== 'number' || isNaN(value)) return 'N/A'
        return value.toFixed(decimals)
      }

      // Prepare comprehensive data for Excel
      const excelData = []

      // Header
      excelData.push(['EQUITY ENGINE - PROPERTY INVESTMENT ANALYSIS REPORT'])
      excelData.push(['Generated on:', new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })])
      excelData.push([])

      // Property Information
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

      // Executive Summary
      excelData.push(['EXECUTIVE SUMMARY (YEAR 1)'])
      excelData.push(['Monthly Cash Flow:', formatCurrency(results.cashFlow)])
      excelData.push(['Return on Investment (ROI):', formatPercentage(results.roi)])
      excelData.push(['Capitalization Rate:', formatPercentage(results.capRate)])
      excelData.push(['Year 1 Equity Growth:', formatCurrency(results.equityGrowth)])
      excelData.push(['Cash on Cash Return:', formatPercentage(results.cashOnCashReturn)])
      excelData.push(['Return on Equity:', formatPercentage(results.returnOnEquity)])
      excelData.push([])

      // Monthly Financial Breakdown
      excelData.push(['MONTHLY FINANCIAL BREAKDOWN'])
      excelData.push(['Gross Monthly Rent:', formatCurrency(results.monthlyRent)])
      excelData.push(['Monthly Operating Expenses:', formatCurrency(results.monthlyExpenses)])
      excelData.push(['Net Monthly Income:', formatCurrency(results.netIncome)])
      excelData.push(['Monthly Mortgage Payment:', formatCurrency(results.mortgageMonthly)])
      excelData.push([])

      // Purchase & Financing
      excelData.push(['PURCHASE & FINANCING'])
      excelData.push(['Purchase Price:', formatCurrency(results.purchasePrice)])
      excelData.push(['Down Payment:', formatCurrency(results.downPayment)])
      excelData.push(['Loan Amount:', formatCurrency(results.loanAmount)])
      excelData.push(['Total Cash Invested:', formatCurrency(results.totalCashInvested)])
      if (propertyData.loan_info) {
        excelData.push(['Interest Rate:', formatPercentage(propertyData.loan_info.interest_rate)])
        excelData.push(['Loan Term:', `${propertyData.loan_info.loan_term_years} years`])
      }
      excelData.push([])

      // Annual Financial Summary
      excelData.push(['ANNUAL FINANCIAL SUMMARY (YEAR 1)'])
      excelData.push(['Gross Annual Rent:', formatCurrency(results.grossRentAnnual)])
      excelData.push(['Vacancy Loss:', formatCurrency(results.vacancyLossAnnual)])
      excelData.push(['Operating Income:', formatCurrency(results.operatingIncomeAnnual)])
      excelData.push(['Operating Expenses:', formatCurrency(results.operatingExpensesAnnual)])
      excelData.push(['Net Operating Income (NOI):', formatCurrency(results.noiAnnual)])
      excelData.push(['Annual Cash Flow:', formatCurrency(results.cashFlowAnnual)])
      excelData.push([])

      // Key Financial Ratios
      excelData.push(['KEY FINANCIAL RATIOS'])
      excelData.push(['Gross Rent Multiplier:', formatNumber(results.grossRentMultiplier)])
      excelData.push(['Break Even Ratio:', formatPercentage(results.breakEvenRatio)])
      excelData.push(['Debt Coverage Ratio:', formatNumber(results.debtCoverageRatio)])
      excelData.push(['Debt Yield:', formatPercentage(results.debtYield)])
      excelData.push(['Equity Multiple:', formatNumber(results.equityMultiple)])
      excelData.push(['Internal Rate of Return (IRR):', formatPercentage(results.irr)])
      excelData.push([])

      // Operating Expenses Breakdown
      excelData.push(['OPERATING EXPENSES BREAKDOWN'])
      excelData.push(['Property Tax (Monthly):', formatCurrency(results.propertyTaxMonthly)])
      excelData.push(['Insurance (Monthly):', formatCurrency(results.insuranceMonthly)])
      excelData.push(['Property Management (Monthly):', formatCurrency(results.propertyManagementMonthly)])
      excelData.push(['Maintenance (Monthly):', formatCurrency(results.maintenanceMonthly)])
      excelData.push(['Owner Paid Utilities (Monthly):', formatCurrency(results.ownerPaidUtilitiesMonthly)])
      excelData.push([])

      // Long-term Projections (if available)
      if (results.projections) {
        excelData.push(['LONG-TERM PROJECTIONS'])
        excelData.push(['Year', 'Gross Rent', 'NOI', 'Cash Flow', 'Property Value', 'Equity', 'Cap Rate (%)', 'ROI (%)'])

        results.projections.years.forEach((year, index) => {
          excelData.push([
            year,
            results.projections.grossRent[index],
            results.projections.noi[index],
            results.projections.cashFlow[index],
            results.projections.propertyValue[index],
            results.projections.equity[index],
            results.projections.capRate[index].toFixed(1),
            results.projections.roi[index].toFixed(1)
          ])
        })
        excelData.push([])
      }

      // Additional Property Details
      if (propertyData.purchase_info) {
        excelData.push(['ADDITIONAL PROPERTY DETAILS'])
        excelData.push(['Closing Cost:', formatCurrency(propertyData.purchase_info.closing_cost)])
        excelData.push(['Initial Improvements:', formatCurrency(propertyData.purchase_info.initial_improvements)])
        excelData.push(['Purchase Date:', propertyData.purchase_info.purchase_date])
        excelData.push([])
      }

      // Footer
      excelData.push([''])
      excelData.push(['Equity Engine - a project of Avancod'])
      excelData.push(['Website: https://www.avancod.com'])

      // Create workbook and worksheet
      const ws = XLSX.utils.aoa_to_sheet(excelData)
      const wb = XLSX.utils.book_new()
      XLSX.utils.book_append_sheet(wb, ws, 'Property Analysis')

      // Set column widths for better formatting
      ws['!cols'] = [
        { wch: 30 },  // Labels column
        { wch: 25 },  // Values column
        { wch: 20 },  // Additional columns for projections
        { wch: 20 },
        { wch: 20 },
        { wch: 20 },
        { wch: 15 },
        { wch: 15 }
      ]

      // Add some styling to the header
      const range = XLSX.utils.decode_range(ws['!ref'])
      for (let R = range.s.r; R <= range.e.r; ++R) {
        for (let C = range.s.c; C <= range.e.c; ++C) {
          const cellAddress = XLSX.utils.encode_cell({ r: R, c: C })
          if (!ws[cellAddress]) continue

          // Style section headers
          if (ws[cellAddress].v && typeof ws[cellAddress].v === 'string' &&
            ws[cellAddress].v.includes('INFORMATION') ||
            ws[cellAddress].v.includes('SUMMARY') ||
            ws[cellAddress].v.includes('BREAKDOWN') ||
            ws[cellAddress].v.includes('RATIOS') ||
            ws[cellAddress].v.includes('PROJECTIONS')) {
            ws[cellAddress].s = {
              font: { bold: true, size: 12 },
              fill: { fgColor: { rgb: "E3F2FD" } }
            }
          }
        }
      }

      // Save the file
      const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' })
      const data = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })
      saveAs(data, 'EquityEngine_Property_Analysis_Report.xlsx')
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
                <div className="text-sm opacity-90">Branded report (tabular)</div>
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
