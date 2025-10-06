import numpy_financial as npf

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
