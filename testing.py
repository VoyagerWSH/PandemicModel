#!/usr/bin/env python
import numpy as np
import matplotlib.pyplot as plt
import requests
import json
overpass_url = "http://overpass-api.de/api/interpreter"
overpass_query = """
[out:json];
(node["amenity"](poly:"39.1905 -77.0238 39.3606 -77.0238 39.3606 -76.6496 39.1905 -76.6496");
 way["amenity"](poly:"39.1905 -77.0238 39.3606 -77.0238 39.3606 -76.6496 39.1905 -76.6496");
 rel["amenity"](poly:"39.1905 -77.0238 39.3606 -77.0238 39.3606 -76.6496 39.1905 -76.6496");
);
out center;
"""
response = requests.get(overpass_url, 
                        params={'data': overpass_query})
data = response.json()
for k,v in data.items():
  print(k,v)
# Collect coords into list
coords = []
for element in data['elements']:
  if element['type'] == 'node':
    lon = element['lon']
    lat = element['lat']
    coords.append((lon, lat))
  elif 'center' in element:
    lon = element['center']['lon']
    lat = element['center']['lat']
    coords.append((lon, lat))
# Convert coordinates into numpy array
X = np.array(coords)
print(X)
plt.plot(X[:, 0], X[:, 1], 'o')

plt.title('Amenities in Ellicott City')
plt.xlabel('Longitude')
plt.ylabel('Latitude')
plt.axis('equal')
plt.show()
