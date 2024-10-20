import json

# Load the old JSON file
with open('company_tickers_exchange.json', 'r') as file:
    old_data = json.load(file)

# Extract the fields and data dynamically
fields = old_data['fields']
data = old_data['data']

# Create a new mapping of symbol to CIK and name as a dictionary
companies_mapping = {}
for company in data:
    symbol = company[fields.index('ticker')]
    name = company[fields.index('name')]
    cik = company[fields.index('cik')]
    companies_mapping[symbol] = {
        "name": name,
        "cik": cik
    }

# Save the new mapping into a new JSON file
with open('companies_mapping.json', 'w') as outfile:
    json.dump(companies_mapping, outfile, indent=4)

print("New JSON file with symbol-to-CIK-and-name mapping created.")
