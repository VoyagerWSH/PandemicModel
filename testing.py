#!/usr/bin/env python
import numpy as np
import matplotlib.pyplot as plt
import requests
import json
overpass_url = "http://overpass-api.de/api/interpreter"
overpass_query = """
[out:json];
(node["amenity"](36.5379,-96.2065,36.5820,-96.1129);
 way["amenity"](36.5379,-96.2065,36.5820,-96.1129);
 rel["amenity"](36.5379,-96.2065,36.5820,-96.1129);
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
#plt.plot(X[:, 0], X[:, 1], 'o')

#plt.title('Marketplaces in Barnsdall')
#plt.xlabel('Longitude')
#plt.ylabel('Latitude')
#plt.axis('equal')
#plt.show()
