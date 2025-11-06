# Property Advisor - Property Investment Analysis Platform

**Property Advisor** is a comprehensive real estate investment analysis platform that helps investors evaluate rental properties through detailed financial calculations, projections, and professional reporting. The platform provides a modern web interface for inputting property data and generates comprehensive investment analysis reports with exportable PDF and Excel formats.

---

## 🎯 Project Overview

Property Advisor is a full-stack application that combines a modern React frontend with a Python Flask backend to perform sophisticated property investment analysis. It calculates key financial metrics, generates long-term projections (up to 30 years), and produces professional reports suitable for client presentations and investment decision-making.

### Key Features

- **📊 Comprehensive Financial Analysis**
  - Monthly and annual cash flow calculations
  - ROI, Cap Rate, Cash-on-Cash Return, and IRR calculations
  - Debt coverage ratios and break-even analysis
  - Equity accumulation tracking

- **📈 Long-term Projections**
  - 1, 5, 10, 20, and 30-year financial projections
  - Property value appreciation modeling
  - Rent and expense growth projections
  - Tax benefit calculations (depreciation, deductions)

- **💼 Professional Reporting**
  - Modern, aesthetic PDF reports with branded styling
  - Comprehensive Excel spreadsheets
  - Executive summaries and detailed breakdowns
  - Export-ready formats for presentations

- **🎨 Modern User Interface**
  - Clean, professional design with animations
  - Intuitive form sections with validation
  - Real-time calculations and visual feedback
  - Responsive layout for all devices

- **🔍 Detailed Property Analysis**
  - Property information tracking
  - Purchase and financing details
  - Operating expenses breakdown
  - Tax implications and benefits

---

## 🛠️ Tech Stack

### Frontend
- **React 19.2** - UI framework
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **Lucide React** - Icon library
- **jsPDF** - PDF generation
- **XLSX** - Excel file generation
- **File Saver** - File download handling

### Backend
- **Python 3.x** - Programming language
- **Flask** - Web framework
- **Flask-CORS** - Cross-origin resource sharing
- **Pandas** - Data manipulation
- **NumPy** - Numerical computing
- **NumPy-Financial** - Financial calculations

---

## 📁 Project Structure

```
Property Advisor/
├── backend/                    # Python Flask backend
│   ├── app.py                 # Flask API server
│   ├── property_analysis.py   # Main analysis logic
│   ├── loan_calculations.py   # Loan calculation functions
│   ├── data_processing.py     # Data processing utilities
│   ├── report_generation.py   # Report generation logic
│   ├── analyzer.py           # Analysis orchestrator
│   ├── main.py               # Entry point
│   ├── check.py              # Reference output with dummy data
│   └── requirements.txt      # Python dependencies
│
├── frontend/                  # React frontend
│   ├── src/
│   │   ├── App.jsx           # Main application component
│   │   ├── main.jsx          # Application entry point
│   │   ├── components/       # React components
│   │   │   ├── forms/        # Form components
│   │   │   │   ├── PropertyInfoSection.jsx
│   │   │   │   ├── PurchaseInfoSection.jsx
│   │   │   │   ├── LoanInfoSection.jsx
│   │   │   │   ├── ExpensesSection.jsx
│   │   │   │   ├── UtilitiesSection.jsx
│   │   │   │   └── ...
│   │   │   ├── reports/      # Report components
│   │   │   │   ├── ExecutiveSummary.jsx
│   │   │   │   ├── FinancialBreakdown.jsx
│   │   │   │   ├── DetailedAnalysis.jsx
│   │   │   │   ├── ProjectionTables.jsx
│   │   │   │   └── ExportSection.jsx
│   │   │   ├── HeroSection.jsx
│   │   │   ├── PropertyForm.jsx
│   │   │   ├── PropertySummary.jsx
│   │   │   ├── ReportDashboard.jsx
│   │   │   └── Footer.jsx
│   │   └── data/
│   │       └── us-states.json  # US states data
│   ├── package.json          # Node.js dependencies
│   └── tailwind.config.js    # Tailwind configuration
│
└── README.md                 # This file
```

---

## 🚀 Installation & Setup

### Prerequisites

- **Node.js** (v16 or higher) and **npm**
- **Python** (3.8 or higher) and **pip**

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install Python dependencies:
   ```bash
   pip install -r requirements.txt
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install Node.js dependencies:
   ```bash
   npm install
   ```

---

## 🏃 Running the Application

### Start the Backend Server

From the `backend` directory:

```bash
python app.py
```

Or using Python module syntax:

```bash
python -c "from backend.app import app; app.run(host='127.0.0.1', port=8000)"
```

The backend API will be available at `http://127.0.0.1:8000`

**API Endpoints:**
- `GET /health` - Health check endpoint
- `POST /analyze` - Property analysis endpoint (accepts JSON form data)

### Start the Frontend Development Server

From the `frontend` directory:

```bash
npm run dev
```

The frontend will be available at `http://localhost:5173` (or the port shown in the terminal)

### Production Build

To build the frontend for production:

```bash
cd frontend
npm run build
```

---

## 📊 Reference Output

The `backend/check.py` file contains a reference implementation with dummy input values that demonstrates the expected output format. This file can be used to:

- Understand the calculation logic
- Verify output format
- Test calculations independently

### Running the Reference Script

```bash
cd backend
python check.py
```

This will output a comprehensive text-based analysis report showing:
- Property description
- Purchase analysis & financing details
- Returns & ratios (Year 1)
- Cash flow breakdown
- Operating expenses
- Buy & hold projections (1, 5, 10, 20, 30 years)
- Tax benefits & deductions
- Capital gain tax calculations
- Investment returns and financial ratios

### Example Dummy Input Values (from check.py)

```python
# Property Information
property_type = "House"
street = "123 ABC Street"
city = "City"
state = "State"
zip_code = "Zip Code"
year_built = 2024
sqft = 1234
lot_size = 1
parking = "Garage"
total_beds = 3
total_baths = 2

# Purchase Information
rent_monthly = 4600
purchase_price = 400000
closing_cost = 12000
initial_improvements = 0
purchase_date = "2025-01-01"

# Loan Information
percent_down = 0.20  # 20%
interest_rate = 0.04  # 4%
loan_term_years = 30

# Expenses
property_tax_yr = 6000
management_rate = 0.10  # 10%
vacancy_rate = 0.04  # 4%
maintenance_rate = 0.10  # 10%

# Growth Rates
appreciation = 0.02  # 2%
rent_rate_inc = 0.02  # 2%
property_tax_rate_inc = 0.02  # 2%
```

---

## 📝 API Documentation

### POST /analyze

Analyzes a property investment based on provided form data.

**Request Body (JSON):**
```json
{
  "property_info": {
    "property_type": "House",
    "street": "123 ABC Street",
    "city": "City",
    "state": "CA",
    "zip_code": "12345",
    "year_built": 2024,
    "sqft": 1234,
    "lot_size": 1.0,
    "parking": "Garage",
    "total_beds": 3,
    "total_baths": 2
  },
  "purchase_info": {
    "rent_monthly": 4600,
    "purchase_price": 400000,
    "closing_cost": 12000,
    "initial_improvements": 0,
    "purchase_date": "2025-01-01"
  },
  "loan_info": {
    "percent_down": 0.20,
    "interest_rate": 0.04,
    "loan_term_years": 30,
    "interest_only": false
  },
  "owner_paid_expenses": {
    "property_tax_yr": 6000,
    "hoa": 0,
    "insurance_mo": 0,
    "water_mo": 0,
    "sewer_mo": 0,
    "garbage_mo": 0,
    "gas_electric_mo": 0,
    "lawn_mo": 0,
    "other_expenses": 0,
    "management_rate": 0.10,
    "vacancy_rate": 0.04,
    "maintenance_rate": 0.10
  },
  "rates": {
    "appreciation": 0.02,
    "rent_rate_inc": 0.02,
    "property_tax_rate_inc": 0.02,
    "insurance_rate_inc": 0.02,
    "utility_rate_inc": 0.02
  },
  "tax_info": {
    "improved_value_ratio": 0.7336,
    "income_tax_rate": 0.22,
    "cap_gains_tax_rate": 0.15,
    "recapture_tax_rate": 0.25,
    "depreciation_years": 27.5,
    "q1_tax": "I will use a 1031 exchange",
    "selling_cost_percentage": 0.03
  }
}
```

**Response (JSON):**
```json
{
  "propertyData": { /* Full analysis data */ },
  "results": {
    "cashFlow": 1468,
    "roi": 0.076,
    "capRate": 0.087,
    "equityGrowth": 93635,
    "monthlyRent": 4600,
    "monthlyExpenses": 1420,
    "netIncome": 1468,
    "cashOnCashReturn": 0.192,
    "returnOnEquity": 0.188,
    "irr": 0.076,
    "grossRentMultiplier": 7.39,
    "equityMultiple": 1.21,
    "breakEvenRatio": 0.641,
    "debtCoverageRatio": 1.96,
    "debtYield": 0.112,
    "purchasePrice": 400000,
    "downPayment": 80000,
    "loanAmount": 320000,
    "totalCashInvested": 92000,
    "mortgageMonthly": 1528,
    "projections": {
      "years": [1, 5, 10, 20, 30],
      "grossRent": [...],
      "noi": [...],
      "cashFlow": [...],
      "propertyValue": [...],
      "equity": [...],
      "capRate": [...],
      "roi": [...],
      "irr": [...]
    }
  }
}
```

---

## 🎨 Features in Detail

### Form Sections

1. **Property Information**
   - Property type, address, location details
   - Year built, square footage, lot size
   - Bedrooms, bathrooms, parking

2. **Purchase Information**
   - Monthly rent, purchase price
   - Closing costs, initial improvements
   - Purchase date

3. **Loan Information**
   - Down payment percentage
   - Interest rate
   - Loan term

4. **Expenses & Taxes**
   - Property tax, HOA, insurance
   - Management, vacancy, maintenance rates
   - Owner-paid utilities

5. **Utilities & Other Expenses**
   - Water, sewer, garbage
   - Gas & electric, lawn care
   - Other monthly expenses

### Report Sections

1. **Executive Summary**
   - Key metrics at a glance
   - Monthly cash flow, ROI, Cap Rate
   - Equity growth

2. **Financial Breakdown**
   - Monthly and annual income/expenses
   - Operating expenses detail
   - Loan breakdown

3. **Detailed Analysis**
   - Tax benefits & depreciation
   - Capital gains calculations
   - Financial ratios

4. **Projection Tables**
   - Long-term projections (1, 5, 10, 20, 30 years)
   - Property value appreciation
   - Equity accumulation

5. **Export Options**
   - Professional PDF reports
   - Comprehensive Excel spreadsheets

---

## 🔧 Development

### Backend Development

The backend uses a modular architecture:
- `property_analysis.py` - Core analysis logic
- `loan_calculations.py` - Loan-specific calculations
- `data_processing.py` - Data transformation utilities
- `report_generation.py` - Report formatting

### Frontend Development

The frontend uses a component-based architecture:
- Form components in `components/forms/`
- Report components in `components/reports/`
- Reusable UI components
- State management via React hooks

---

## 📄 License

This project is proprietary software developed by Avancod.

---

## 👥 Credits

**Property Advisor** - A project of **Avancod**

- Website: [www.avancod.com](https://www.avancod.com)
- Repository: [GitHub - Equity Engine](https://github.com/saymi313/Equity-Engine.git)

---

## 📞 Support

For issues, questions, or contributions, please refer to the project repository or contact the development team.

---

## 🔄 Version History

- **v1.0.0** - Initial release
  - Full-stack property analysis platform
  - Modern React frontend with Tailwind CSS
  - Python Flask backend with comprehensive calculations
  - PDF and Excel export functionality
  - Long-term projection capabilities

---

**Note:** This README provides an overview of the Property Advisor platform. For detailed calculation logic and output examples, refer to `backend/check.py` which contains a reference implementation with dummy input values.

