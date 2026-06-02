import pandas as pd
import logging

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

def run_quality_checks(df: pd.DataFrame):
    """
    Simulates automated data quality and SLA checks as defined in the Data Governance Policy.
    """
    logging.info("Starting Data Quality Validation...")
    errors = []

    # Check 1: Completeness
    if df.isnull().values.any():
        errors.append("Completeness Check Failed: Null values detected in dataset.")

    # Check 2: Accuracy (FX Rates)
    if not df['eur_to_usd'].between(0.8, 1.5).all():
        errors.append("Accuracy Check Failed: EUR/USD rate outside expected historical bounds.")

    # Check 3: Domain validation (Transport Mode)
    valid_modes = ['Sea Freight', 'Air France Cargo']
    if not df['transport_mode'].isin(valid_modes).all():
        errors.append(f"Domain Validation Failed: Invalid transport mode detected.")

    if errors:
        for error in errors:
            logging.error(error)
        raise ValueError("Data Quality Checks Failed. See logs for details.")
    else:
        logging.info("All Data Quality SLA Checks Passed Successfully.")

if __name__ == "__main__":
    # Simulated data for testing the script
    test_data = pd.DataFrame({
        'vendor_id': ['VND-NV-01', 'VND-TSMC-02'],
        'eur_to_usd': [1.082, 1.085],
        'transport_mode': ['Sea Freight', 'Air France Cargo']
    })
    run_quality_checks(test_data)
