import pandas as pd
import numpy as np
import numpy_financial as npf
import sys
from datetime import datetime

# --------------- Creating Functions for Loan Calculation ---------------
def calculate_cumipmt(rate, nper, pv, start_period, end_period, when=0):
    """
    Calculate cumulative interest paid between start_period and end_period.
    Mimics Excel's CUMIPMT to match provided output.
    Args:
        rate (float): Annual interest rate.
        nper (int): Total number of payment periods.
        pv (float): Present value (loan amount).
        start_period (int): Starting period for calculation.
        end_period (int): Ending period for calculation.
        when (int): When payments are due (0 = end of period, 1 = beginning).
    Returns:
        float: Total interest paid over the specified periods.
    """
    monthly_rate = rate / 12
    payment = npf.pmt(monthly_rate, nper, pv)
    balance = -pv
    total_interest = 0
    for period in range(1, end_period + 1):
        if when == 1 and period == 1:
            interest = 0
        else:
            interest = balance * monthly_rate
        principal = payment - interest
        if period >= start_period:
            total_interest += interest
        balance -= principal
        if balance < 0:
            balance = 0
    return total_interest

def calculate_cumprinc(rate, nper, pv, start_period, end_period, when=0):
    """
    Calculate cumulative principal paid between start_period and end_period.
    Args:
        rate (float): Annual interest rate.
        nper (int): Total number of payment periods.
        pv (float): Present value (loan amount).
        start_period (int): Starting period for calculation.
        end_period (int): Ending period for calculation.
        when (int): When payments are due (0 = end of period, 1 = beginning).
    Returns:
        float: Total principal paid over the specified periods.
    """
    monthly_rate = rate / 12
    payment = npf.pmt(monthly_rate, nper, pv)
    total_principal = 0
    balance = -pv
    for period in range(1, end_period + 1):
        if when == 1 and period == 1:
            interest = 0
        else:
            interest = balance * monthly_rate
        principal = payment - interest
        if period >= start_period:
            total_principal += principal
        balance -= principal
        if balance < 0:
            total_principal += balance
            balance = 0
    return total_principal

# -------------- Main Property Analysis Function -------------
def main():
    try:
# -------------------- Input Data --------------------
        # Property Information (Input)
        property_type = "House"
        street = "123 ABC Street"
        city = "City"
        state = "State"
        zip_code = "Zip Code"
        year_built = 2024
        sqft = 1234
        lot_size = 1
        parking = "Garage"
        units = [{'beds': 3, 'baths': 2, 'rent': 4600}]
        total_beds = 3
        total_baths = 2

        # Purchase Price & Rental Income (Input)
        rent_monthly = 4600
        purchase_price = 400000
        closing_cost = 12000
        initial_improvements = 0
        purchase_date_str = "2025-01-01"
        purchase_date = datetime.strptime(purchase_date_str, "%Y-%m-%d")

        #Loan Info (Input)
        percent_down = 0.20
        interest_rate = 0.04
        loan_term_years = 30
        interest_only = False

        # Yearly Rate Increase (Input)
        appreciation = 0.02
        rent_rate_inc = 0.02
        property_tax_rate_inc = 0.02
        insurance_rate_inc = 0.02
        utility_rate_inc = 0.02

        # Owner Paid Expenses (Input)
        property_tax_yr = 6000
        insurance_mo = 0
        water_mo = 0
        sewer_mo = 0
        garbage_mo = 0
        gas_electric_mo = 0
        lawn_mo = 0
        hoa = 0
        other_expenses = 0
        management_rate = 0.10
        vacancy_rate = 0.04
        maintenance_rate = 0.10

        # Tax Info (Input)
        improved_value_ratio = 0.7336
        income_tax_rate = 0.22
        cap_gains_tax_rate = 0.15
        recapture_tax_rate = 0.25
        depreciation_years = 27.5
        q1_tax = "I will use a 1031 exchange"
        selling_cost_percentage = 0.03

        # Derived Values (Formulae)
        down_payment = purchase_price * percent_down
        loan_amount = purchase_price - down_payment
        mortgage_monthly = -npf.pmt(interest_rate / 12, loan_term_years * 12, loan_amount)
        property_tax_monthly = property_tax_yr / 12
        insurance_monthly = insurance_mo
        owner_paid_utilities_monthly = (water_mo + sewer_mo + garbage_mo + gas_electric_mo + lawn_mo + hoa + other_expenses)
        total_cash_invested = down_payment + initial_improvements + closing_cost
        pay_cap_gains = not (q1_tax in [
            "I will use a 1031 exchange",
            "I will have lived in it as a homestead for 2 out of 5 years",
            "Other, I will NOT pay capital gains"
        ])
        gross_rent_initial = rent_monthly * 12
        vacancy_loss_initial = gross_rent_initial * vacancy_rate
        egi_initial = gross_rent_initial - vacancy_loss_initial
        op_exp_initial = (property_tax_yr + insurance_monthly * 12 +
                          owner_paid_utilities_monthly * 12 +
                          gross_rent_initial * management_rate +
                          gross_rent_initial * maintenance_rate)
        noi_initial = egi_initial - op_exp_initial
        initial_cap_rate = noi_initial / (purchase_price + initial_improvements + closing_cost)

        # Yearly Financial Projections (Formulae)
        years = list(range(1, 31))
        yearly_data = {}
        before_tax_flows_cum = [-total_cash_invested]
        after_tax_flows_cum = [-total_cash_invested]
        cum_noi = 0
        cum_interest = 0
        cum_principal = 0
        cum_income_tax = 0
        cum_dep = 0
        cum_operating_income = 0
        cum_operating_expenses = 0
        cum_cash_flow = 0

        for year in years:
            # Calculate rental income (Formulae)
            gross_rent = rent_monthly * 12 * (1 + rent_rate_inc) ** (year - 1)
            vacancy_loss = gross_rent * vacancy_rate
            effective_gross_income = gross_rent - vacancy_loss
            cum_operating_income += effective_gross_income

            # Calculate operating expenses (Formulae)
            property_taxes = property_tax_yr * (1 + property_tax_rate_inc) ** (year - 1)
            insurance = insurance_monthly * 12 * (1 + insurance_rate_inc) ** (year - 1)
            owner_paid_utilities = owner_paid_utilities_monthly * 12 * (1 + utility_rate_inc) ** (year - 1)
            property_management = gross_rent * management_rate
            maintenance = gross_rent * maintenance_rate
            total_operating_expenses = (property_taxes + insurance + owner_paid_utilities + property_management + maintenance)
            cum_operating_expenses += total_operating_expenses

            # Net operating income (Formulae)
            noi = effective_gross_income - total_operating_expenses
            cum_noi += noi

            # Loan calculations (Formulae)
            if percent_down < 1 and interest_rate > 0:
                start_per = (year - 1) * 12 + 1
                end_per = year * 12
                interest_paid = calculate_cumipmt(interest_rate, loan_term_years * 12, -loan_amount, start_per, end_per, 0)
                principal_paid = calculate_cumprinc(interest_rate, loan_term_years * 12, -loan_amount, start_per, end_per)
                cum_princ_total = calculate_cumprinc(interest_rate, loan_term_years * 12, -loan_amount, 1, end_per)
                loan_payments = mortgage_monthly * 12
                mortgage_balance = loan_amount - cum_princ_total
            else:
                interest_paid = 0
                principal_paid = 0
                loan_payments = 0
                cum_princ_total = 0
                mortgage_balance = 0
            cum_interest += interest_paid
            cum_principal += principal_paid

            # Property value and equity (Formulae)
            property_value = purchase_price * (1 + appreciation) ** year
            appreciation_amount = (property_value - purchase_price * (1 + appreciation) ** (year - 1)
                                   if year > 1 else purchase_price * appreciation)
            equity = property_value - mortgage_balance
            selling_cost = property_value * selling_cost_percentage
            sale_proceeds = property_value - mortgage_balance - selling_cost

            # Cash flow and tax calculations (Formulae)
            cash_flow_before_tax = noi - loan_payments
            cum_cash_flow += cash_flow_before_tax
            dep_this_year = ((improved_value_ratio * purchase_price + initial_improvements + closing_cost) / depreciation_years
                             if year <= depreciation_years else 0)
            cum_dep += dep_this_year
            taxable_income = effective_gross_income - total_operating_expenses - interest_paid - dep_this_year
            income_tax_due = max(taxable_income * income_tax_rate, 0)
            cum_income_tax += income_tax_due
            cash_flow_after_tax = cash_flow_before_tax - income_tax_due

            # Capital gains and cost basis (Formulae)
            original_cost_basis = purchase_price + closing_cost
            adjusted_cost_basis = original_cost_basis + initial_improvements - cum_dep + selling_cost
            capital_gain = property_value - adjusted_cost_basis
            tax_on_capital_gain = capital_gain * cap_gains_tax_rate if pay_cap_gains and capital_gain > 0 else 0
            recapture_tax = cum_dep * recapture_tax_rate if pay_cap_gains else 0
            total_taxes_due_from_sale = tax_on_capital_gain + recapture_tax

            # Profit calculations (Formulae)
            total_profit_pre_tax = sale_proceeds + cum_cash_flow - total_cash_invested
            total_profit_post_tax = total_profit_pre_tax - cum_income_tax - total_taxes_due_from_sale

            # Financial metrics (Formulae)
            cap_rate_annual = noi / (purchase_price + initial_improvements + closing_cost)
            cash_on_cash_return = cash_flow_before_tax / total_cash_invested if total_cash_invested > 0 else 0
            return_on_equity = cash_flow_before_tax / equity if equity > 0 else 0
            roi_pre_tax = total_profit_pre_tax / total_cash_invested if total_cash_invested > 0 else 0
            rent_to_value = ((gross_rent / 12) / (purchase_price if year == 1 else property_value)
                             if (purchase_price if year == 1 else property_value) > 0 else 0)
            gross_rent_multiplier = property_value / gross_rent if gross_rent > 0 else 0
            equity_multiplier = (equity + cum_cash_flow) / total_cash_invested if total_cash_invested > 0 else 0
            break_even_ratio = (total_operating_expenses + loan_payments) / gross_rent if gross_rent > 0 else 0
            debt_coverage_ratio = noi / loan_payments if loan_payments > 0 else 'N/A'
            debt_yield = noi / loan_amount if loan_amount > 0 else 'N/A'

            # Internal rate of return (Formulae)
            before_tax_flows = before_tax_flows_cum + [cash_flow_before_tax]
            irr_before_tax = (npf.irr(before_tax_flows[:-1] + [cash_flow_before_tax + sale_proceeds])
                              if len(before_tax_flows) > 1 else 0)
            after_tax_flows = after_tax_flows_cum + [cash_flow_after_tax]
            irr_after_tax = (
                npf.irr(after_tax_flows[:-1] + [cash_flow_after_tax + (sale_proceeds - total_taxes_due_from_sale)])
                if len(after_tax_flows) > 1 else 0)
            before_tax_flows_cum = before_tax_flows
            after_tax_flows_cum = after_tax_flows

            # Store yearly data
            yearly_data[year] = {
                'gross_rent': gross_rent,
                'vacancy_loss': vacancy_loss,
                'effective_gross_income': effective_gross_income,
                'property_taxes': property_taxes,
                'insurance': insurance,
                'owner_paid_utilities': owner_paid_utilities,
                'property_management': property_management,
                'maintenance': maintenance,
                'total_operating_expenses': total_operating_expenses,
                'noi': noi,
                'interest_paid': interest_paid,
                'principal_paid': principal_paid,
                'loan_payments': loan_payments,
                'mortgage_balance': mortgage_balance,
                'equity': equity,
                'appreciation_amount': appreciation_amount,
                'property_value': property_value,
                'selling_cost': selling_cost,
                'sale_proceeds': sale_proceeds,
                'cash_flow_before_tax': cash_flow_before_tax,
                'depreciation': dep_this_year,
                'cum_dep': cum_dep,
                'taxable_income': taxable_income,
                'income_tax_due': income_tax_due,
                'cum_income_tax': cum_income_tax,
                'cash_flow_after_tax': cash_flow_after_tax,
                'original_cost_basis': original_cost_basis,
                'adjusted_cost_basis': adjusted_cost_basis,
                'capital_gain': capital_gain,
                'tax_on_capital_gain': tax_on_capital_gain,
                'recapture_tax': recapture_tax,
                'total_taxes_due_from_sale': total_taxes_due_from_sale,
                'total_profit_pre_tax': total_profit_pre_tax,
                'total_profit_post_tax': total_profit_post_tax,
                'cap_rate_annual': cap_rate_annual,
                'cash_on_cash_return': cash_on_cash_return,
                'return_on_equity': return_on_equity,
                'roi_pre_tax': roi_pre_tax,
                'irr_before_tax': irr_before_tax,
                'irr_after_tax': irr_after_tax,
                'rent_to_value': rent_to_value,
                'gross_rent_multiplier': gross_rent_multiplier,
                'equity_multiplier': equity_multiplier,
                'break_even_ratio': break_even_ratio,
                'debt_coverage_ratio': debt_coverage_ratio,
                'debt_yield': debt_yield,
                'cum_operating_income': cum_operating_income,
                'cum_operating_expenses': cum_operating_expenses,
                'cum_noi': cum_noi,
                'cum_cash_flow': cum_cash_flow
            }

        # Output Generation
        address = f"{street}, {city}, {state} {zip_code}"
        initial_cash = total_cash_invested
        arv = purchase_price + initial_improvements

        # Header and Summary
        print(f"\n{'Investment Analysis for ' + address:^{80}}\n")
        print(f"{address:^{80}}")
        print(f"{'Investment Property - Rental':^{80}}\n")
        print(f"{property_type}   ·   {total_beds} Beds   ·   {total_baths} Baths   ·   {sqft:,.0f} Sq.Ft.\n")
        print(f"${purchase_price:,.0f} Purchase Price")
        print(
            f"${initial_cash:,.0f} Cash Needed   ·   ${yearly_data[1]['cash_flow_before_tax'] / 12:,.0f}/mo Cash Flow   ·   {yearly_data[1]['cap_rate_annual'] * 100:.1f}% Cap Rate   ·   {yearly_data[1]['cash_on_cash_return'] * 100:.1f}% COC\n")

        print(f"{'Property Description':^{80}}\n")
        print(f"ADDRESS".ljust(20))
        print(f"{street}".ljust(20))
        print(f"{city}".ljust(20))
        print(f"{state} {zip_code}".ljust(20) + "\n")
        print("DESCRIPTION")
        print(f"Property Type:".ljust(20) + f"\t{property_type:>15}")
        print(f"Square Footage:".ljust(20) + f"\t{sqft:>15,.0f}")
        print(f"Beds:".ljust(20) + f"\t{total_beds:>15}")
        print(f"Baths:".ljust(20) + f"\t{total_baths:>15}")
        print(f"Year Built:".ljust(20) + f"\t{year_built:>15}")
        print(f"Parking:".ljust(20) + f"\t{parking:>15}")
        print(f"Lot Size:".ljust(20) + f"\t{lot_size:>15.2f}\n")
        print("\t\t\tClick for Map\n")

        # Purchase Analysis & Return
        print("Purchase Analysis & Return")
        print("\tPURCHASE & REHAB".ljust(43) + "\t" + "FINANCING (PURCHASE)".ljust(30))
        print(f"Purchase Price:".ljust(30) + f"\t${purchase_price:>12,.0f}" + "\t" + f"Loan Type:".ljust(30) + f"\t{'Amortizing' if not interest_only else 'Interest Only'}, {loan_term_years} Year".rjust(15))
        print(f"Amount Financed:".ljust(30) + f"\t-${loan_amount:>12,.0f}" + "\t" + f"Interest Rate:".ljust(30) + f"\t{interest_rate * 100:>12.2f}%".rjust(15))
        print(f"Down Payment:".ljust(30) + f"\t=${down_payment:>12,.0f}" + "\t" + f"Percent Down:".ljust(30) + f"\t{percent_down * 100:>12.2f}%".rjust(15))
        print(f"Purchase Cost:".ljust(30) + f"\t+${closing_cost:>12,.0f}" + "\t" + f"Loan Amount:".ljust(30) + f"\t${loan_amount:>12,.0f}".rjust(15))
        print(f"Rehab Cost:".ljust(30) + f"\t+${initial_improvements:>12,.0f}" + "\t" + f"Loan Payment:".ljust(30) + f"\t${mortgage_monthly:>12,.0f} Per Month".rjust(15))
        print(f"Total Cash Needed:".ljust(30) + f"\t=${initial_cash:>12,.0f}" + "\t" + "".ljust(30) + f"\t${mortgage_monthly * 12:>12,.0f} Per Year".rjust(15))
        print(f"\nAfter Repair Value:".ljust(30) + f"\t${arv:>12,.0f}")
        print(f"ARV per Square Foot:".ljust(30) + f"\t${arv / sqft:>12,.1f}")
        print(f"Price per Square Foot:".ljust(30) + f"\t${purchase_price / sqft:>12,.1f}\n")

        print("RETURNS & RATIOS (Year 1)".ljust(45) + "\t" + "ASSUMPTIONS & PROJECTIONS".ljust(30))
        print(f"Cap Rate:".ljust(30) + f"\t{yearly_data[1]['cap_rate_annual'] * 100:>12.1f}%" + "\t" + f"Purchase Date:".ljust(30) + f"\t{purchase_date_str:>15}".rjust(15))
        print(f"Cash on Cash Return:".ljust(30) + f"\t{yearly_data[1]['cash_on_cash_return'] * 100:>12.1f}%" + "\t" + f"Initial Improvements:".ljust(30) + f"\t${initial_improvements:>12,.0f}".rjust(15))
        print(f"Return on Equity:".ljust(30) + f"\t{yearly_data[1]['return_on_equity'] * 100:>12.1f}%" + "\t" + f"Purchase Cost:".ljust(30) + f"\t${closing_cost:>12,.0f}".rjust(15))
        print(f"Return on Investment:".ljust(30) + f"\t{yearly_data[1]['roi_pre_tax'] * 100:>12.1f}%" + "\t" + f"Vacancy Rate:".ljust(30) + f"\t{vacancy_rate * 100:>12.0f}%".rjust(15))
        print(f"Internal Rate of Return:".ljust(30) + f"\t{yearly_data[1]['irr_before_tax'] * 100:>12.1f}%" + "\t" + f"Appreciation:".ljust(30) + f"\t{appreciation * 100:>12.0f}%".rjust(15))
        print("".ljust(30) + "\t" + "".rjust(15) + "\t" + f"Rent Rate Increase:".ljust(30) + f"\t{rent_rate_inc * 100:>12.0f}%".rjust(15))
        print(f"Rent to Value:".ljust(30) + f"\t{yearly_data[1]['rent_to_value'] * 100:>12.1f}%" + "\t" + f"Property Tax Increase:".ljust(30) + f"\t{property_tax_rate_inc * 100:>12.0f}%".rjust(15))
        print(f"Gross Rent Multiplier:".ljust(30) + f"\t{yearly_data[1]['gross_rent_multiplier']:>12.2f}" + "\t" + f"Insurance Rate Increase:".ljust(30) + f"\t{insurance_rate_inc * 100:>12.0f}%".rjust(15))
        print(f"Equity Multiple:".ljust(30) + f"\t{yearly_data[1]['equity_multiplier']:>12.2f}" + "\t" + f"Utilities Rate Increase:".ljust(30) + f"\t{utility_rate_inc * 100:>12.0f}%".rjust(15))
        print(f"Break Even Ratio:".ljust(30) + f"\t{yearly_data[1]['break_even_ratio'] * 100:>12.1f}%" + "\t" + f"Selling Costs:".ljust(30) + f"\t{selling_cost_percentage * 100:>12.0f}%".rjust(15))
        print(f"Debt Coverage Ratio:".ljust(30) + f"\t{yearly_data[1]['debt_coverage_ratio']:>12.2f}" + "\t" + f"Depreciation Period:".ljust(30) + f"\t{depreciation_years:>12.1f}\tYears".rjust(15))
        print(f"Debt Yield:".ljust(30) + f"\t{yearly_data[1]['debt_yield'] * 100:>12.1f}%" + "\t" + f"Land Value:".ljust(30) + f"\t${purchase_price * (1 - improved_value_ratio):>12,.0f}".rjust(15))

        # Cash Flow (Year 1)
        print("\nCash Flow (Year 1)\n")
        print("\t".ljust(30) + "\t" + "Monthly".rjust(12) + "\t" + "Yearly".rjust(12))
        print("\tCASH FLOW")
        print(f"\tGross Rent:".ljust(30) + f"\t${rent_monthly:>12,.0f}" + f"\t${gross_rent_initial:>12,.0f}")
        print(f"\tVacancy ({vacancy_rate * 100:.0f}%):".ljust(30) + f"\t-${vacancy_loss_initial / 12:>12,.0f}" + f"\t-${vacancy_loss_initial:>12,.0f}")
        print(f"\tOperating Income:".ljust(30) + f"\t=${egi_initial / 12:>12,.0f}" + f"\t=${egi_initial:>12,.0f}")
        print(f"\tOperating Expense ({op_exp_initial / egi_initial * 100 if egi_initial > 0 else 0:.0f}%):".ljust(30) + f"\t+${op_exp_initial / 12:>12,.0f}" + f"\t+${op_exp_initial:>12,.0f}")
        print(f"\tNet Operating Income:".ljust(30) + f"\t=${noi_initial / 12:>12,.0f}" + f"\t=${noi_initial:>12,.0f}")
        print(f"\tLoan Payments:".ljust(30) + f"\t-${mortgage_monthly:>12,.0f}" + f"\t-${yearly_data[1]['loan_payments']:>12,.0f}")
        print(f"\tCash Flow:".ljust(30) + f"\t=${yearly_data[1]['cash_flow_before_tax'] / 12:>12,.0f}" + f"\t=${yearly_data[1]['cash_flow_before_tax']:>12,.0f}\n")
        print("\tOPERATING EXPENSES")
        print(f"\tProperty Taxes:".ljust(30) + f"\t${property_tax_monthly:>12,.0f}" + f"\t${property_tax_yr:>12,.0f}")
        print(f"\tInsurance:".ljust(30) + f"\t${insurance_monthly:>12,.0f}" + f"\t${insurance_monthly * 12:>12,.0f}")
        print(f"\tOwner Paid Utilities:".ljust(30) + f"\t${owner_paid_utilities_monthly:>12,.0f}" + f"\t${owner_paid_utilities_monthly * 12:>12,.0f}")
        print(f"\tProperty Management ({management_rate * 100:.0f}%):".ljust(30) + f"\t${rent_monthly * management_rate:>12,.0f}" + f"\t${gross_rent_initial * management_rate:>12,.0f}")
        print(f"\tMaintenance Reserve ({management_rate * 100:.0f}%):".ljust(30) + f"\t${rent_monthly * maintenance_rate:>12,.0f}" + f"\t${gross_rent_initial * maintenance_rate:>12,.0f}")
        print(f"\tTotal:".ljust(30) + f"\t${op_exp_initial / 12:>12,.0f}" + f"\t${op_exp_initial:>12,.0f}")

        # Buy & Hold Projections
        proj_years = [1, 5, 10, 20, 30]
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
            proj_df.at['Capital Improvements', f'Year {y}'] = initial_improvements
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
            proj_df.at['Debt Yield', f'Year {y}'] = round(data['debt_yield'] * 100, 1)

        # Buy & Hold Projections
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
            f"{appreciation * 100:>15.2f}%",
            f"{rent_rate_inc * 100:>15.2f}%",
            f"{property_tax_rate_inc * 100:>15.2f}%",
            f"{insurance_rate_inc * 100:>15.2f}%",
            f"{utility_rate_inc * 100:>15.2f}%",
            f"{selling_cost_percentage * 100:>15.2f}%"
        ]))
        print("\n\t\t\t\t" + "\t".join([f"Year {y}".rjust(15) for y in proj_years]))
        print("RENTAL INCOME")
        for idx in ['Gross Rent', f'Vacancy ({vacancy_rate * 100:.0f}%)', 'Operating Income']:
            row = [idx.ljust(30)] + [f"${x:>12,.0f}" if isinstance(x, (int, float)) else str(x).rjust(15) for x in proj_df.loc[idx]]
            print("\t" + "\t".join(row))
        print("\nOPERATING EXPENSES")
        for idx in ['Property Taxes', 'Insurance', 'Owner Paid Utilities',
                    f'Property Mgmt ({management_rate * 100:.0f}%)',
                    f'Maintenance Reserve ({maintenance_rate * 100:.0f}%)', 'Operating Expenses']:
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
        for idx in ['Equity', f'Selling Cost ({selling_cost_percentage * 100:.0f}%)', 'Sale Proceeds',
                    'Cumulative Operating Income', 'Cumulative Operating Expenses', 'Cumulative NOI',
                    'Cumulative Cash Flow', 'Total Cash Invested', 'Total Profit (Pre-Tax)']:
            row = [idx.ljust(30)] + [f"${x:>12,.0f}" if isinstance(x, (int, float)) else str(x).rjust(15) for x in proj_df.loc[idx]]
            print("\t" + "\t".join(row))
        print("\nTAX BENEFITS & DEDUCTIONS")
        for idx in ['Operating Expenses (Tax)', 'Loan Interest', 'Depreciation', 'Total Deductions',
                    'Operating Income (Tax)', 'Taxable Income', f'Income Tax Due ({income_tax_rate * 100:.0f}%)']:
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

    except Exception as e:
        print(f"An error occurred: {e}")
        sys.exit(1)

if __name__ == "__main__":
    main()


