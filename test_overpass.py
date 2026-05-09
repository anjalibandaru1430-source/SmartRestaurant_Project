import requests
import json

overpass_url = "http://overpass-api.de/api/interpreter"
overpass_query = """
[out:json][timeout:25];
area["name"="Bengaluru"]["boundary"="administrative"]->.searchArea;
node["amenity"="restaurant"](area.searchArea);
out 50;
"""
response = requests.get(overpass_url, params={'data': overpass_query})
data = response.json()

restaurants = []
for element in data['elements']:
    if 'tags' in element and 'name' in element['tags']:
        restaurants.append({
            'name': element['tags']['name'],
            'lat': element['lat'],
            'lon': element['lon'],
            'cuisine': element['tags'].get('cuisine', 'Unknown')
        })

print(json.dumps(restaurants[:10], indent=2))
