import pandas as pd

def create_projection_dataframe(yearly_data, derived_values, rates, tax_info):
    """
    Create a comprehensive projection dataframe for the analysis.
    """
    proj_years = [1, 5, 10, 20, 30]
    vacancy_rate = rates.get('vacancy_rate', 0.04)
    management_rate = rates.get('management_rate', 0.10)
    maintenance_rate = rates.get('maintenance_rate', 0.10)
    selling_cost_percentage = tax_info.get('selling_cost_percentage', 0.03)
    income_tax_rate = tax_info.get('income_tax_rate', 0.22)
    total_cash_invested = derived_values.get('total_cash_invested', 0)
    
    proj_df = pd.DataFrame(index=[
        'Gross Rent', f'Vacancy ({vacancy_rate * 100:.0f}%)', 'Operating Income',
        'Property Taxes', 'Insurance', 'Owner Paid Utilities',
        f'Property Mgmt ({management_rate * 100:.0f}%)', f'Maintenance Reserve ({maintenance_rate * 100:.0f}%)',
        'Operating Expenses', 'Net Operating Income', 'Loan Payments', 'Cash Flow',
        'Property Value', 'Loan Balance', 'Equity', f'Selling Cost ({selling_cost_percentage * 100:.0f}%)',
        'Sale Proceeds', 'Cumulative Operating Income', 'Cumulative Operating Expenses',
        'Cumulative NOI', 'Cumulative Cash Flow', 'Total Cash Invested', 'Total Profit (Pre-Tax)',
        'Operating Expenses (Tax)', 'Loan Interest', 'Depreciation', 'Total Deductions',
        'Operating Income (Tax)', 'Taxable Income', f'Income Tax Due ({income_tax_rate * 100:.0f}%)',
        'Original Cost Basis', 'Capital Improvements', 'Cumulative Depreciation',
        'Selling Cost (Tax)', 'Adjusted Cost Basis', 'Sale Price', 'Capital Gain',
        'Tax on Capital Gain (15%)', 'Recapture Tax (25%)', 'Total Profit (Pre-Tax, Sale)',
        'Cumulative Income Tax Paid', 'Capital Gain Tax Due', 'Recapture Tax Due', 'Total Profit (Post-Tax)',
        'Cap Rate', 'Cash on Cash Return', 'Return on Equity', 'Return on Investment',
        'Internal Rate of Return', 'Rent to Value', 'Gross Rent Multiplier', 'Equity Multiple',
        'Break Even Ratio', 'Debt Coverage Ratio', 'Debt Yield'
    ], columns=[f'Year {y}' for y in proj_years])

    for y in proj_years:
        data = yearly_data[y]
        proj_df.at['Gross Rent', f'Year {y}'] = data['gross_rent']
        proj_df.at[f'Vacancy ({vacancy_rate * 100:.0f}%)', f'Year {y}'] = -data['vacancy_loss']
        proj_df.at['Operating Income', f'Year {y}'] = data['effective_gross_income']
        proj_df.at['Property Taxes', f'Year {y}'] = -data['property_taxes']
        proj_df.at['Insurance', f'Year {y}'] = -data['insurance']
        proj_df.at['Owner Paid Utilities', f'Year {y}'] = -data['owner_paid_utilities']
        proj_df.at[f'Property Mgmt ({management_rate * 100:.0f}%)', f'Year {y}'] = -data['property_management']
        proj_df.at[f'Maintenance Reserve ({maintenance_rate * 100:.0f}%)', f'Year {y}'] = -data['maintenance']
        proj_df.at['Operating Expenses', f'Year {y}'] = -data['total_operating_expenses']
        proj_df.at['Net Operating Income', f'Year {y}'] = data['noi']
        proj_df.at['Loan Payments', f'Year {y}'] = -data['loan_payments']
        proj_df.at['Cash Flow', f'Year {y}'] = data['cash_flow_before_tax']
        proj_df.at['Property Value', f'Year {y}'] = data['property_value']
        proj_df.at['Loan Balance', f'Year {y}'] = -data['mortgage_balance']
        proj_df.at['Equity', f'Year {y}'] = data['equity']
        proj_df.at[f'Selling Cost ({selling_cost_percentage * 100:.0f}%)', f'Year {y}'] = -data['selling_cost']
        proj_df.at['Sale Proceeds', f'Year {y}'] = data['sale_proceeds']
        proj_df.at['Cumulative Operating Income', f'Year {y}'] = data['cum_operating_income']
        proj_df.at['Cumulative Operating Expenses', f'Year {y}'] = -data['cum_operating_expenses']
        proj_df.at['Cumulative NOI', f'Year {y}'] = data['cum_noi']
        proj_df.at['Cumulative Cash Flow', f'Year {y}'] = data['cum_cash_flow']
        proj_df.at['Total Cash Invested', f'Year {y}'] = -total_cash_invested
        proj_df.at['Total Profit (Pre-Tax)', f'Year {y}'] = data['total_profit_pre_tax']
        proj_df.at['Operating Expenses (Tax)', f'Year {y}'] = -data['total_operating_expenses']
        proj_df.at['Loan Interest', f'Year {y}'] = -data['interest_paid']
        proj_df.at['Depreciation', f'Year {y}'] = -data['depreciation']
        proj_df.at['Total Deductions', f'Year {y}'] = -(data['total_operating_expenses'] + data['interest_paid'] + data['depreciation'])
        proj_df.at['Operating Income (Tax)', f'Year {y}'] = data['effective_gross_income']
        proj_df.at['Taxable Income', f'Year {y}'] = data['taxable_income']
        proj_df.at[f'Income Tax Due ({income_tax_rate * 100:.0f}%)', f'Year {y}'] = -data['income_tax_due']
        proj_df.at['Original Cost Basis', f'Year {y}'] = data['original_cost_basis']
        proj_df.at['Capital Improvements', f'Year {y}'] = 0  # initial_improvements
        proj_df.at['Cumulative Depreciation', f'Year {y}'] = -data['cum_dep']
        proj_df.at['Selling Cost (Tax)', f'Year {y}'] = data['selling_cost']
        proj_df.at['Adjusted Cost Basis', f'Year {y}'] = -data['adjusted_cost_basis']
        proj_df.at['Sale Price', f'Year {y}'] = data['property_value']
        proj_df.at['Capital Gain', f'Year {y}'] = data['capital_gain']
        proj_df.at['Tax on Capital Gain (15%)', f'Year {y}'] = -data['tax_on_capital_gain']
        proj_df.at['Recapture Tax (25%)', f'Year {y}'] = -data['recapture_tax']
        proj_df.at['Total Profit (Pre-Tax, Sale)', f'Year {y}'] = data['total_profit_pre_tax']
        proj_df.at['Cumulative Income Tax Paid', f'Year {y}'] = -data['cum_income_tax']
        proj_df.at['Capital Gain Tax Due', f'Year {y}'] = -data['tax_on_capital_gain']
        proj_df.at['Recapture Tax Due', f'Year {y}'] = -data['recapture_tax']
        proj_df.at['Total Profit (Post-Tax)', f'Year {y}'] = data['total_profit_post_tax']
        proj_df.at['Cap Rate', f'Year {y}'] = data['cap_rate_annual'] * 100
        proj_df.at['Cash on Cash Return', f'Year {y}'] = data['cash_on_cash_return'] * 100
        proj_df.at['Return on Equity', f'Year {y}'] = data['return_on_equity'] * 100
        proj_df.at['Return on Investment', f'Year {y}'] = data['roi_pre_tax'] * 100
        proj_df.at['Internal Rate of Return', f'Year {y}'] = data['irr_before_tax'] * 100
        proj_df.at['Rent to Value', f'Year {y}'] = data['rent_to_value'] * 100
        proj_df.at['Gross Rent Multiplier', f'Year {y}'] = data['gross_rent_multiplier']
        proj_df.at['Equity Multiple', f'Year {y}'] = data['equity_multiplier']
        proj_df.at['Break Even Ratio', f'Year {y}'] = data['break_even_ratio'] * 100
        proj_df.at['Debt Coverage Ratio', f'Year {y}'] = data['debt_coverage_ratio']
        proj_df.at['Debt Yield', f'Year {y}'] = round(data['debt_yield'] * 100, 1) if data['debt_yield'] != 'N/A' else 'N/A'

    return proj_df
