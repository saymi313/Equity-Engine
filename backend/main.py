import sys
from property_analysis import analyze_property_investment
from report_generation import generate_investment_report

def main():
    try:
        # Run the property investment analysis
        analysis_data = analyze_property_investment()
        
        # Generate and display the report
        generate_investment_report(analysis_data)
        
    except Exception as e:
        print(f"An error occurred: {e}")
        sys.exit(1)

if __name__ == "__main__":
    main()
