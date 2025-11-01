import numpy as np
import numpy_financial as npf
from datetime import datetime
from loan_calculations import calculate_cumipmt, calculate_cumprinc

def safe_float(value, default=0):
    """Safely convert value to float, handling None, empty strings, and strings."""
    if value is None or value == '':
        return default
    try:
        return float(value)
    except (ValueError, TypeError):
        return default

def safe_int(value, default=0):
    """Safely convert value to int, handling None, empty strings, and strings."""
    if value is None or value == '':
        return default
    try:
        return int(float(value))  # Convert to float first to handle "3.0" strings
    except (ValueError, TypeError):
        return default

def analyze_property_investment(form_data=None):
    """
    Main property investment analysis function.
    Returns the analysis results and yearly data.
    
    Args:
        form_data: Dictionary containing form data from frontend. If None, uses default values.
    """
    # -------------------- Input Data --------------------
    # Use form data if provided, otherwise use defaults
    if form_data:
        # Property Information (Input)
        prop_info = form_data.get('property_info', {})
        property_type = prop_info.get('property_type', 'House')
        street = prop_info.get('street', '')
        city = prop_info.get('city', '')
        state = prop_info.get('state', '')
        zip_code = prop_info.get('zip_code', '')
        year_built = safe_int(prop_info.get('year_built'), 2024)
        sqft = safe_float(prop_info.get('sqft'))
        lot_size = safe_float(prop_info.get('lot_size'))
        parking = prop_info.get('parking', 'Garage')
        units = prop_info.get('units', [])
        total_beds = safe_int(prop_info.get('total_beds'))
        total_baths = safe_int(prop_info.get('total_baths'))

        # Purchase Price & Rental Income (Input)
        purchase_info = form_data.get('purchase_info', {})
        rent_monthly = safe_float(purchase_info.get('rent_monthly'))
        purchase_price = safe_float(purchase_info.get('purchase_price'))
        closing_cost = safe_float(purchase_info.get('closing_cost'))
        initial_improvements = safe_float(purchase_info.get('initial_improvements'))
        purchase_date_str = purchase_info.get('purchase_date', '2025-01-01')
        try:
            purchase_date = datetime.strptime(purchase_date_str, "%Y-%m-%d")
        except (ValueError, TypeError):
            purchase_date = datetime.strptime('2025-01-01', "%Y-%m-%d")

        # Loan Info (Input) - already converted to decimals in frontend
        loan_info = form_data.get('loan_info', {})
        percent_down = float(loan_info.get('percent_down', 0.20))
        interest_rate = float(loan_info.get('interest_rate', 0.04))
        loan_term_years = int(loan_info.get('loan_term_years', 30))
        interest_only = loan_info.get('interest_only', False)

        # Yearly Rate Increase (Input)
        rates = form_data.get('yearly_rate_increase', {})
        appreciation = float(rates.get('appreciation', 0.02))
        rent_rate_inc = float(rates.get('rent_rate_inc', 0.02))
        property_tax_rate_inc = float(rates.get('property_tax_rate_inc', 0.02))
        insurance_rate_inc = float(rates.get('insurance_rate_inc', 0.02))
        utility_rate_inc = float(rates.get('utility_rate_inc', 0.02))

        # Owner Paid Expenses (Input)
        expenses = form_data.get('owner_paid_expenses', {})
        property_tax_yr = safe_float(expenses.get('property_tax_yr'))
        insurance_mo = safe_float(expenses.get('insurance_mo'))
        water_mo = safe_float(expenses.get('water_mo'))
        sewer_mo = safe_float(expenses.get('sewer_mo'))
        garbage_mo = safe_float(expenses.get('garbage_mo'))
        gas_electric_mo = safe_float(expenses.get('gas_electric_mo'))
        lawn_mo = safe_float(expenses.get('lawn_mo'))
        hoa = safe_float(expenses.get('hoa'))
        other_expenses = safe_float(expenses.get('other_expenses'))
        management_rate = float(expenses.get('management_rate', 0.10))
        vacancy_rate = float(expenses.get('vacancy_rate', 0.04))
        maintenance_rate = float(expenses.get('maintenance_rate', 0.10))

        # Tax Info (Input)
        tax_info = form_data.get('tax_info', {})
        improved_value_ratio = float(tax_info.get('improved_value_ratio', 0.7336))
        income_tax_rate = float(tax_info.get('income_tax_rate', 0.22))
        cap_gains_tax_rate = float(tax_info.get('cap_gains_tax_rate', 0.15))
        recapture_tax_rate = float(tax_info.get('recapture_tax_rate', 0.25))
        depreciation_years = float(tax_info.get('depreciation_years', 27.5))
        q1_tax = tax_info.get('q1_tax', 'I will use a 1031 exchange')
        selling_cost_percentage = float(tax_info.get('selling_cost_percentage', 0.03))
    else:
        # Default values (for backward compatibility)
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

    return {
        'property_info': {
            'property_type': property_type,
            'street': street,
            'city': city,
            'state': state,
            'zip_code': zip_code,
            'year_built': year_built,
            'sqft': sqft,
            'lot_size': lot_size,
            'parking': parking,
            'units': units,
            'total_beds': total_beds,
            'total_baths': total_baths
        },
        'purchase_info': {
            'rent_monthly': rent_monthly,
            'purchase_price': purchase_price,
            'closing_cost': closing_cost,
            'initial_improvements': initial_improvements,
            'purchase_date': purchase_date_str
        },
        'loan_info': {
            'percent_down': percent_down,
            'interest_rate': interest_rate,
            'loan_term_years': loan_term_years,
            'interest_only': interest_only
        },
        'expenses_info': {
            'property_tax_yr': property_tax_yr,
            'insurance_mo': insurance_mo,
            'management_rate': management_rate,
            'vacancy_rate': vacancy_rate,
            'maintenance_rate': maintenance_rate
        },
        'rates': {
            'appreciation': appreciation,
            'rent_rate_inc': rent_rate_inc,
            'property_tax_rate_inc': property_tax_rate_inc,
            'insurance_rate_inc': insurance_rate_inc,
            'utility_rate_inc': utility_rate_inc
        },
        'tax_info': {
            'improved_value_ratio': improved_value_ratio,
            'income_tax_rate': income_tax_rate,
            'cap_gains_tax_rate': cap_gains_tax_rate,
            'recapture_tax_rate': recapture_tax_rate,
            'depreciation_years': depreciation_years,
            'q1_tax': q1_tax,
            'selling_cost_percentage': selling_cost_percentage
        },
        'derived_values': {
            'down_payment': down_payment,
            'loan_amount': loan_amount,
            'mortgage_monthly': mortgage_monthly,
            'property_tax_monthly': property_tax_monthly,
            'insurance_monthly': insurance_monthly,
            'owner_paid_utilities_monthly': owner_paid_utilities_monthly,
            'total_cash_invested': total_cash_invested,
            'gross_rent_initial': gross_rent_initial,
            'vacancy_loss_initial': vacancy_loss_initial,
            'egi_initial': egi_initial,
            'op_exp_initial': op_exp_initial,
            'noi_initial': noi_initial,
            'initial_cap_rate': initial_cap_rate
        },
        'yearly_data': yearly_data
    }
