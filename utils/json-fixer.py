import json

# Read the JSON file
with open('locations.json', 'r') as file:
    data = json.load(file)

# Swap lat and lng values
for location in data:
    location['lat'], location['lng'] = location['lng'], location['lat']

# Write the modified data to a new JSON file
with open('locations.fixed.json', 'w') as file:
    json.dump(data, file, indent=2)

print("New JSON file 'locations.fixed.json' created.")
