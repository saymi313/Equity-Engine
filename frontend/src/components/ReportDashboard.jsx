import React from 'react'
import ExecutiveSummary from './reports/ExecutiveSummary'
import FinancialBreakdown from './reports/FinancialBreakdown'
import DetailedAnalysis from './reports/DetailedAnalysis'
import ProjectionTables from './reports/ProjectionTables'
import ExportSection from './reports/ExportSection'

function ReportDashboard({ propertyData, results }) {
  if (!results) return null

  return (
    <div className="space-y-6 report-dashboard">
      <ExecutiveSummary results={results} />
      <FinancialBreakdown results={results} />
      <DetailedAnalysis propertyData={propertyData} results={results} />
      <ProjectionTables results={results} />
      <ExportSection propertyData={propertyData} results={results} />
    </div>
  )
}

export default ReportDashboard
