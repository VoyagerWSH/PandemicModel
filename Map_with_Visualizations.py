from bokeh.io import output_file, show
from bokeh.models import Circle, ColumnDataSource, GMapOptions
from bokeh.plotting import gmap
import pandas as pd

output_file("gmap.html")
data = pd.read_csv("sampleData.csv")
lats = data['Lat']
longs = data['Long']

print(data['Lat'])

map_options = GMapOptions(lat=33.03544, lng=-111.644, map_type="roadmap", zoom=2)
p = gmap("AIzaSyBkeKK8GaNumlCxgPf1-DtbB4bAo2Sqrwg", map_options, title="Covid Map", tools = "pan, box_select, zoom_in, zoom_out")
#p.circle(x="lats", y="longs", size=15, fill_color="blue", fill_alpha=0.8)
#glyph = Circle(x="lats", y="longs")
#p.add_glyph(glyph)
show(p)