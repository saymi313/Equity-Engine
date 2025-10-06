from data_processing import create_projection_dataframe

def generate_investment_report(analysis_data):
    """
    Generate the complete investment analysis report.
    """
    property_info = analysis_data['property_info']
    purchase_info = analysis_data['purchase_info']
    loan_info = analysis_data['loan_info']
    expenses_info = analysis_data['expenses_info']
    rates = analysis_data['rates']
    tax_info = analysis_data['tax_info']
    derived_values = analysis_data['derived_values']
    yearly_data = analysis_data['yearly_data']
    
    # Create projection dataframe
    proj_df = create_projection_dataframe(yearly_data, derived_values, rates, tax_info)
    
    # Output Generation
    address = f"{property_info['street']}, {property_info['city']}, {property_info['state']} {property_info['zip_code']}"
    initial_cash = derived_values['total_cash_invested']
    arv = purchase_info['purchase_price'] + purchase_info['initial_improvements']

    # Header and Summary
    print(f"\n{'Investment Analysis for ' + address:^{80}}\n")
    print(f"{address:^{80}}")
    print(f"{'Investment Property - Rental':^{80}}\n")
    print(f"{property_info['property_type']}   ·   {property_info['total_beds']} Beds   ·   {property_info['total_baths']} Baths   ·   {property_info['sqft']:,.0f} Sq.Ft.\n")
    print(f"${purchase_info['purchase_price']:,.0f} Purchase Price")
    print(
        f"${initial_cash:,.0f} Cash Needed   ·   ${yearly_data[1]['cash_flow_before_tax'] / 12:,.0f}/mo Cash Flow   ·   {yearly_data[1]['cap_rate_annual'] * 100:.1f}% Cap Rate   ·   {yearly_data[1]['cash_on_cash_return'] * 100:.1f}% COC\n")

    print(f"{'Property Description':^{80}}\n")
    print(f"ADDRESS".ljust(20))
    print(f"{property_info['street']}".ljust(20))
    print(f"{property_info['city']}".ljust(20))
    print(f"{property_info['state']} {property_info['zip_code']}".ljust(20) + "\n")
    print("DESCRIPTION")
    print(f"Property Type:".ljust(20) + f"\t{property_info['property_type']:>15}")
    print(f"Square Footage:".ljust(20) + f"\t{property_info['sqft']:>15,.0f}")
    print(f"Beds:".ljust(20) + f"\t{property_info['total_beds']:>15}")
    print(f"Baths:".ljust(20) + f"\t{property_info['total_baths']:>15}")
    print(f"Year Built:".ljust(20) + f"\t{property_info['year_built']:>15}")
    print(f"Parking:".ljust(20) + f"\t{property_info['parking']:>15}")
    print(f"Lot Size:".ljust(20) + f"\t{property_info['lot_size']:>15.2f}\n")
    print("\t\t\tClick for Map\n")

    # Purchase Analysis & Return
    print("Purchase Analysis & Return")
    print("\tPURCHASE & REHAB".ljust(43) + "\t" + "FINANCING (PURCHASE)".ljust(30))
    print(f"Purchase Price:".ljust(30) + f"\t${purchase_info['purchase_price']:>12,.0f}" + "\t" + f"Loan Type:".ljust(30) + f"\t{'Amortizing' if not loan_info['interest_only'] else 'Interest Only'}, {loan_info['loan_term_years']} Year".rjust(15))
    print(f"Amount Financed:".ljust(30) + f"\t-${derived_values['loan_amount']:>12,.0f}" + "\t" + f"Interest Rate:".ljust(30) + f"\t{loan_info['interest_rate'] * 100:>12.2f}%".rjust(15))
    print(f"Down Payment:".ljust(30) + f"\t=${derived_values['down_payment']:>12,.0f}" + "\t" + f"Percent Down:".ljust(30) + f"\t{loan_info['percent_down'] * 100:>12.2f}%".rjust(15))
    print(f"Purchase Cost:".ljust(30) + f"\t+${purchase_info['closing_cost']:>12,.0f}" + "\t" + f"Loan Amount:".ljust(30) + f"\t${derived_values['loan_amount']:>12,.0f}".rjust(15))
    print(f"Rehab Cost:".ljust(30) + f"\t+${purchase_info['initial_improvements']:>12,.0f}" + "\t" + f"Loan Payment:".ljust(30) + f"\t${derived_values['mortgage_monthly']:>12,.0f} Per Month".rjust(15))
    print(f"Total Cash Needed:".ljust(30) + f"\t=${initial_cash:>12,.0f}" + "\t" + "".ljust(30) + f"\t${derived_values['mortgage_monthly'] * 12:>12,.0f} Per Year".rjust(15))
    print(f"\nAfter Repair Value:".ljust(30) + f"\t${arv:>12,.0f}")
    print(f"ARV per Square Foot:".ljust(30) + f"\t${arv / property_info['sqft']:>12,.1f}")
    print(f"Price per Square Foot:".ljust(30) + f"\t${purchase_info['purchase_price'] / property_info['sqft']:>12,.1f}\n")

    print("RETURNS & RATIOS (Year 1)".ljust(45) + "\t" + "ASSUMPTIONS & PROJECTIONS".ljust(30))
    print(f"Cap Rate:".ljust(30) + f"\t{yearly_data[1]['cap_rate_annual'] * 100:>12.1f}%" + "\t" + f"Purchase Date:".ljust(30) + f"\t{purchase_info['purchase_date']:>15}".rjust(15))
    print(f"Cash on Cash Return:".ljust(30) + f"\t{yearly_data[1]['cash_on_cash_return'] * 100:>12.1f}%" + "\t" + f"Initial Improvements:".ljust(30) + f"\t${purchase_info['initial_improvements']:>12,.0f}".rjust(15))
    print(f"Return on Equity:".ljust(30) + f"\t{yearly_data[1]['return_on_equity'] * 100:>12.1f}%" + "\t" + f"Purchase Cost:".ljust(30) + f"\t${purchase_info['closing_cost']:>12,.0f}".rjust(15))
    print(f"Return on Investment:".ljust(30) + f"\t{yearly_data[1]['roi_pre_tax'] * 100:>12.1f}%" + "\t" + f"Vacancy Rate:".ljust(30) + f"\t{expenses_info['vacancy_rate'] * 100:>12.0f}%".rjust(15))
    print(f"Internal Rate of Return:".ljust(30) + f"\t{yearly_data[1]['irr_before_tax'] * 100:>12.1f}%" + "\t" + f"Appreciation:".ljust(30) + f"\t{rates['appreciation'] * 100:>12.0f}%".rjust(15))
    print("".ljust(30) + "\t" + "".rjust(15) + "\t" + f"Rent Rate Increase:".ljust(30) + f"\t{rates['rent_rate_inc'] * 100:>12.0f}%".rjust(15))
    print(f"Rent to Value:".ljust(30) + f"\t{yearly_data[1]['rent_to_value'] * 100:>12.1f}%" + "\t" + f"Property Tax Increase:".ljust(30) + f"\t{rates['property_tax_rate_inc'] * 100:>12.0f}%".rjust(15))
    print(f"Gross Rent Multiplier:".ljust(30) + f"\t{yearly_data[1]['gross_rent_multiplier']:>12.2f}" + "\t" + f"Insurance Rate Increase:".ljust(30) + f"\t{rates['insurance_rate_inc'] * 100:>12.0f}%".rjust(15))
    print(f"Equity Multiple:".ljust(30) + f"\t{yearly_data[1]['equity_multiplier']:>12.2f}" + "\t" + f"Utilities Rate Increase:".ljust(30) + f"\t{rates['utility_rate_inc'] * 100:>12.0f}%".rjust(15))
    print(f"Break Even Ratio:".ljust(30) + f"\t{yearly_data[1]['break_even_ratio'] * 100:>12.1f}%" + "\t" + f"Selling Costs:".ljust(30) + f"\t{tax_info['selling_cost_percentage'] * 100:>12.0f}%".rjust(15))
    print(f"Debt Coverage Ratio:".ljust(30) + f"\t{yearly_data[1]['debt_coverage_ratio']:>12.2f}" + "\t" + f"Depreciation Period:".ljust(30) + f"\t{tax_info['depreciation_years']:>12.1f}\tYears".rjust(15))
    print(f"Debt Yield:".ljust(30) + f"\t{yearly_data[1]['debt_yield'] * 100:>12.1f}%" + "\t" + f"Land Value:".ljust(30) + f"\t${purchase_info['purchase_price'] * (1 - tax_info['improved_value_ratio']):>12,.0f}".rjust(15))

    # Cash Flow (Year 1)
    print("\nCash Flow (Year 1)\n")
    print("\t".ljust(30) + "\t" + "Monthly".rjust(12) + "\t" + "Yearly".rjust(12))
    print("\tCASH FLOW")
    print(f"\tGross Rent:".ljust(30) + f"\t${purchase_info['rent_monthly']:>12,.0f}" + f"\t${derived_values['gross_rent_initial']:>12,.0f}")
    print(f"\tVacancy ({expenses_info['vacancy_rate'] * 100:.0f}%):".ljust(30) + f"\t-${derived_values['vacancy_loss_initial'] / 12:>12,.0f}" + f"\t-${derived_values['vacancy_loss_initial']:>12,.0f}")
    print(f"\tOperating Income:".ljust(30) + f"\t=${derived_values['egi_initial'] / 12:>12,.0f}" + f"\t=${derived_values['egi_initial']:>12,.0f}")
    print(f"\tOperating Expense ({derived_values['op_exp_initial'] / derived_values['egi_initial'] * 100 if derived_values['egi_initial'] > 0 else 0:.0f}%):".ljust(30) + f"\t+${derived_values['op_exp_initial'] / 12:>12,.0f}" + f"\t+${derived_values['op_exp_initial']:>12,.0f}")
    print(f"\tNet Operating Income:".ljust(30) + f"\t=${derived_values['noi_initial'] / 12:>12,.0f}" + f"\t=${derived_values['noi_initial']:>12,.0f}")
    print(f"\tLoan Payments:".ljust(30) + f"\t-${derived_values['mortgage_monthly']:>12,.0f}" + f"\t-${yearly_data[1]['loan_payments']:>12,.0f}")
    print(f"\tCash Flow:".ljust(30) + f"\t=${yearly_data[1]['cash_flow_before_tax'] / 12:>12,.0f}" + f"\t=${yearly_data[1]['cash_flow_before_tax']:>12,.0f}\n")
    print("\tOPERATING EXPENSES")
    print(f"\tProperty Taxes:".ljust(30) + f"\t${derived_values['property_tax_monthly']:>12,.0f}" + f"\t${expenses_info['property_tax_yr']:>12,.0f}")
    print(f"\tInsurance:".ljust(30) + f"\t${derived_values['insurance_monthly']:>12,.0f}" + f"\t${derived_values['insurance_monthly'] * 12:>12,.0f}")
    print(f"\tOwner Paid Utilities:".ljust(30) + f"\t${derived_values['owner_paid_utilities_monthly']:>12,.0f}" + f"\t${derived_values['owner_paid_utilities_monthly'] * 12:>12,.0f}")
    print(f"\tProperty Management ({expenses_info['management_rate'] * 100:.0f}%):".ljust(30) + f"\t${purchase_info['rent_monthly'] * expenses_info['management_rate']:>12,.0f}" + f"\t${derived_values['gross_rent_initial'] * expenses_info['management_rate']:>12,.0f}")
    print(f"\tMaintenance Reserve ({expenses_info['maintenance_rate'] * 100:.0f}%):".ljust(30) + f"\t${purchase_info['rent_monthly'] * expenses_info['maintenance_rate']:>12,.0f}" + f"\t${derived_values['gross_rent_initial'] * expenses_info['maintenance_rate']:>12,.0f}")
    print(f"\tTotal:".ljust(30) + f"\t${derived_values['op_exp_initial'] / 12:>12,.0f}" + f"\t${derived_values['op_exp_initial']:>12,.0f}")

    # Buy & Hold Projections
    proj_years = [1, 5, 10, 20, 30]
    
    print("\nBuy & Hold Projections")
    print("\t" + "\t".join([
        f"Appreciation".ljust(15),
        f"Rent Increase".ljust(15),
        f"Tax Increase".ljust(15),
        f"Insurance Increase".ljust(15),
        f"Utility Increase".ljust(15),
        f"Selling Cost".ljust(15)
    ]))
    print("\t" + "\t".join([
        f"{rates['appreciation'] * 100:>15.2f}%",
        f"{rates['rent_rate_inc'] * 100:>15.2f}%",
        f"{rates['property_tax_rate_inc'] * 100:>15.2f}%",
        f"{rates['insurance_rate_inc'] * 100:>15.2f}%",
        f"{rates['utility_rate_inc'] * 100:>15.2f}%",
        f"{tax_info['selling_cost_percentage'] * 100:>15.2f}%"
    ]))
    print("\n\t\t\t\t" + "\t".join([f"Year {y}".rjust(15) for y in proj_years]))
    print("RENTAL INCOME")
    vacancy_rate_pct = expenses_info['vacancy_rate'] * 100
    for idx in ['Gross Rent', f'Vacancy ({vacancy_rate_pct:.0f}%)', 'Operating Income']:
        row = [idx.ljust(30)] + [f"${x:>12,.0f}" if isinstance(x, (int, float)) else str(x).rjust(15) for x in proj_df.loc[idx]]
        print("\t" + "\t".join(row))
    print("\nOPERATING EXPENSES")
    management_rate_pct = expenses_info['management_rate'] * 100
    maintenance_rate_pct = expenses_info['maintenance_rate'] * 100
    for idx in ['Property Taxes', 'Insurance', 'Owner Paid Utilities',
                f'Property Mgmt ({management_rate_pct:.0f}%)',
                f'Maintenance Reserve ({maintenance_rate_pct:.0f}%)', 'Operating Expenses']:
        row = [idx.ljust(30)] + [f"${x:>12,.0f}" if isinstance(x, (int, float)) else str(x).rjust(15) for x in proj_df.loc[idx]]
        print("\t" + "\t".join(row))
    print("\nCASH FLOW")
    for idx in ['Operating Income', 'Operating Expenses', 'Net Operating Income', 'Loan Payments', 'Cash Flow']:
        row = [idx.ljust(30)] + [f"${x:>12,.0f}" if isinstance(x, (int, float)) else str(x).rjust(15) for x in proj_df.loc[idx]]
        print("\t" + "\t".join(row))
    print("\nEQUITY ACCUMULATION")
    for idx in ['Property Value', 'Loan Balance', 'Equity']:
        row = [idx.ljust(30)] + [f"${x:>12,.0f}" if isinstance(x, (int, float)) else str(x).rjust(15) for x in proj_df.loc[idx]]
        print("\t" + "\t".join(row))
    print("\nSALE ANALYSIS (PRE-TAX)")
    selling_cost_pct = tax_info['selling_cost_percentage'] * 100
    for idx in ['Equity', f'Selling Cost ({selling_cost_pct:.0f}%)', 'Sale Proceeds',
                'Cumulative Operating Income', 'Cumulative Operating Expenses', 'Cumulative NOI',
                'Cumulative Cash Flow', 'Total Cash Invested', 'Total Profit (Pre-Tax)']:
        row = [idx.ljust(30)] + [f"${x:>12,.0f}" if isinstance(x, (int, float)) else str(x).rjust(15) for x in proj_df.loc[idx]]
        print("\t" + "\t".join(row))
    print("\nTAX BENEFITS & DEDUCTIONS")
    income_tax_rate_pct = tax_info['income_tax_rate'] * 100
    for idx in ['Operating Expenses (Tax)', 'Loan Interest', 'Depreciation', 'Total Deductions',
                'Operating Income (Tax)', 'Taxable Income', f'Income Tax Due ({income_tax_rate_pct:.0f}%)']:
        row = [idx.ljust(30)] + [f"${x:>12,.0f}" if isinstance(x, (int, float)) else str(x).rjust(15) for x in proj_df.loc[idx]]
        print("\t" + "\t".join(row))
    print("\nCAPITAL GAIN TAX")
    for idx in ['Original Cost Basis', 'Capital Improvements', 'Cumulative Depreciation', 'Selling Cost (Tax)',
                'Adjusted Cost Basis', 'Sale Price', 'Capital Gain', 'Tax on Capital Gain (15%)',
                'Recapture Tax (25%)']:
        row = [idx.ljust(30)] + [f"${x:>12,.0f}" if isinstance(x, (int, float)) else str(x).rjust(15) for x in proj_df.loc[idx]]
        print("\t" + "\t".join(row))
    print("\nSALE ANALYSIS (POST-TAX)")
    for idx in ['Total Profit (Pre-Tax, Sale)', 'Cumulative Income Tax Paid', 'Capital Gain Tax Due',
                'Recapture Tax Due', 'Total Profit (Post-Tax)']:
        row = [idx.ljust(30)] + [f"${x:>12,.0f}" if isinstance(x, (int, float)) else str(x).rjust(15) for x in proj_df.loc[idx]]
        print("\t" + "\t".join(row))
    print("\nINVESTMENT RETURNS")
    for idx in ['Cap Rate', 'Cash on Cash Return', 'Return on Equity', 'Return on Investment',
                'Internal Rate of Return']:
        row = [idx.ljust(30)] + [f"{x:>12.1f}%" for x in proj_df.loc[idx]]
        print("\t" + "\t".join(row))
    print("\nFINANCIAL RATIOS")
    for idx in ['Rent to Value', 'Gross Rent Multiplier', 'Equity Multiple', 'Break Even Ratio',
                'Debt Coverage Ratio', 'Debt Yield']:
        row = [idx.ljust(30)] + [
            f"{x:>12.1f}%" if idx in ['Rent to Value', 'Break Even Ratio', 'Debt Yield']
            else f"{x:>12.2f}" if idx in ['Gross Rent Multiplier', 'Equity Multiple', 'Debt Coverage Ratio']
            else str(x).rjust(15) for x in proj_df.loc[idx]]
        print("\t" + "\t".join(row))
