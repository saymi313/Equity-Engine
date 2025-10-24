from flask import Flask, request, jsonify
from flask_cors import CORS
from property_analysis import analyze_property_investment

app = Flask(__name__)
CORS(app)

@app.route('/health', methods=['GET'])
def health():
    return jsonify({'status': 'ok'}), 200

@app.route('/analyze', methods=['POST'])
def analyze():
    # Note: To avoid changing business logic, we ignore incoming payload for now
    # and run the existing analysis as-is, returning a frontend-compatible summary
    analysis = analyze_property_investment()

    # Build frontend-compatible results object based on backend output (Year 1)
    y1 = analysis['yearly_data'][1]
    purchase = analysis['purchase_info']
    derived = analysis['derived_values']

    results = {
        'cashFlow': round(y1['cash_flow_before_tax'] / 12),
        'roi': analysis['yearly_data'][1]['roi_pre_tax'],
        'capRate': analysis['yearly_data'][1]['cap_rate_annual'],
        'equityGrowth': int(analysis['yearly_data'][1]['equity']),
        'monthlyRent': int(purchase['rent_monthly']),
        'monthlyExpenses': int((derived['op_exp_initial']) / 12),
        'netIncome': round(y1['cash_flow_before_tax'] / 12),

        'cashOnCashReturn': analysis['yearly_data'][1]['cash_on_cash_return'],
        'returnOnEquity': analysis['yearly_data'][1]['return_on_equity'],
        'irr': analysis['yearly_data'][1]['irr_before_tax'],
        'rentToValue': analysis['yearly_data'][1]['rent_to_value'],
        'grossRentMultiplier': analysis['yearly_data'][1]['gross_rent_multiplier'],
        'equityMultiple': analysis['yearly_data'][1]['equity_multiplier'],
        'breakEvenRatio': analysis['yearly_data'][1]['break_even_ratio'],
        'debtCoverageRatio': analysis['yearly_data'][1]['debt_coverage_ratio'],
        'debtYield': analysis['yearly_data'][1]['debt_yield'] if analysis['yearly_data'][1]['debt_yield'] != 'N/A' else 0,

        'purchasePrice': purchase['purchase_price'],
        'downPayment': int(derived['down_payment']),
        'loanAmount': int(derived['loan_amount']),
        'totalCashInvested': int(derived['total_cash_invested']),
        'mortgageMonthly': int(derived['mortgage_monthly']),

        'propertyTaxMonthly': int(derived['property_tax_monthly']),
        'insuranceMonthly': int(derived['insurance_monthly']),
        'ownerPaidUtilitiesMonthly': int(derived['owner_paid_utilities_monthly']),
        'propertyManagementMonthly': int(purchase['rent_monthly'] * analysis['expenses_info']['management_rate']),
        'maintenanceMonthly': int(purchase['rent_monthly'] * analysis['expenses_info']['maintenance_rate']),

        'grossRentAnnual': int(derived['gross_rent_initial']),
        'vacancyLossAnnual': int(derived['vacancy_loss_initial']),
        'operatingIncomeAnnual': int(derived['egi_initial']),
        'operatingExpensesAnnual': int(derived['op_exp_initial']),
        'noiAnnual': int(derived['noi_initial']),
        'loanPaymentsAnnual': int(y1['loan_payments']),
        'cashFlowAnnual': int(y1['cash_flow_before_tax']),

        'projections': {
            'years': [1, 5, 10, 20, 30],
            'grossRent': [int(analysis['yearly_data'][y]['gross_rent']) for y in [1,5,10,20,30]],
            'operatingIncome': [int(analysis['yearly_data'][y]['effective_gross_income']) for y in [1,5,10,20,30]],
            'operatingExpenses': [int(analysis['yearly_data'][y]['total_operating_expenses']) for y in [1,5,10,20,30]],
            'noi': [int(analysis['yearly_data'][y]['noi']) for y in [1,5,10,20,30]],
            'cashFlow': [int(analysis['yearly_data'][y]['cash_flow_before_tax']) for y in [1,5,10,20,30]],
            'propertyValue': [int(analysis['yearly_data'][y]['property_value']) for y in [1,5,10,20,30]],
            'equity': [int(analysis['yearly_data'][y]['equity']) for y in [1,5,10,20,30]],
            'capRate': [float(analysis['yearly_data'][y]['cap_rate_annual'] * 100) for y in [1,5,10,20,30]],
            'cashOnCashReturn': [float(analysis['yearly_data'][y]['cash_on_cash_return'] * 100) for y in [1,5,10,20,30]],
            'roi': [float(analysis['yearly_data'][y]['roi_pre_tax'] * 100) for y in [1,5,10,20,30]],
            'irr': [float(analysis['yearly_data'][y]['irr_before_tax'] * 100) for y in [1,5,10,20,30]],
        }
    }

    return jsonify({'propertyData': analysis, 'results': results}), 200

if __name__ == '__main__':
    app.run(host='127.0.0.1', port=8000, debug=False)


