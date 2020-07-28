## Date: 2020-07-20
## Developer: Kaihua Hou, Johns Hopkins University ECE & CS

library(shiny)
library(leaflet)
library(magrittr)
library(rgdal)

shinyServer(function(input, output) {
    library(rjson)
    library(plotly)
    library(dplyr)
    
    statepolygonZip <- download.file("https://www2.census.gov/geo/tiger/GENZ2018/shp/cb_2018_us_state_500k.zip", 
                                     destfile = "cb_2018_us_state_500k.zip");
    unzip("cb_2018_us_state_500k.zip");
    statePolygonData <- readOGR("cb_2018_us_state_500k.shp", layer = "cb_2018_us_state_500k", 
                                GDAL1_integer64_policy = TRUE);
    ## obtaning the state shape file data provided by cencus.gov 
    ## for more categories of region shape file: 
    ## https://www.census.gov/geographies/mapping-files/time-series/geo/carto-boundary-file.html
    
    
    output$countyPolygonMap <- renderPlotly({
        url <- 'https://raw.githubusercontent.com/plotly/datasets/master/geojson-counties-fips.json'
        countyGeo <- rjson::fromJSON(file=url)
        ## Obtaining the geographical file for all U.S. counties
        url2<- "https://raw.githubusercontent.com/plotly/datasets/master/fips-unemp-16.csv"
        df <- read.csv(url2, colClasses=c(fips="character"))
        names(df)[2] = "unemployment"
        ## obtaining the unemployment rate data 
        url3 <- "https://storage.googleapis.com/kagglesdsdata/datasets%2F579969%2F1374720%2Fus_county.csv?GoogleAccessId=gcp-kaggle-com@kaggle-161607.iam.gserviceaccount.com&Expires=1596139521&Signature=easqHBFZ757D%2F7LVyDM%2BF%2FIMU6l2OEY6giqVvIC0l0tSSe%2Fohq6NC%2FLFKbsIV6FdFALmPUqG9vATbg0cuRVVwGQMsoUOjlW%2BZLhTVluxbYh1dDE1MTFzWRpzlSH18ejIwqa61F0ARJ%2Bpq6ryIfJuE7wQQ1rOCEpaVB9m%2FP7QaZm2gBJeHYLXJXcvO8w1p0sEnqRsGAesg2Fgj%2Bv8unPGNtDJekEWuNbl1K9k7CAaZWjG2QQ94LB9tAPvfKqykDWDD7w6yN3YFkcfu7kUmjs0CybnMD6IP%2FM5hvJXuUTIie0MOMTWt5bIua4qcTHxIxR5l918y1H17JA2HHrnKLVY%2BA%3D%3D"
        county <- read.csv(url3)
        county$nfips <- sprintf("%05d",county$fips)

        countyPolygonMap <- plot_ly() %>% add_trace(
            type="choroplethmapbox",
            geojson=countyGeo,
            locations=county$nfips,
            z=~county$population,
            colorscale="Viridis",
            zmin=200,
            zmax=1100000,
            marker=list(line=list(width=0),opacity=0.5)
        ) %>% layout(
            mapbox=list(
                style="carto-positron",
                zoom =2,
                center=list(lon= -95.71, lat=37.09))
        );
        countyPolygonMap;
        ## generating the interactive plotly map
    })
    
    output$statePolygonMap <-renderLeaflet ({
        statesAbbr <- subset(statePolygonData, input$statesInput %in% statePolygonData$STUSPS);
        ## subsetting the shape file with the selected states
        
        leaflet(statesAbbr) %>%
            addPolygons(color = "#444444", weight = 1, smoothFactor = 0.5,
                        opacity = 1.0, fillOpacity = 0.5,
                        fillColor = ~colorQuantile("YlOrRd", ALAND)(ALAND),
                        highlightOptions = highlightOptions
                        (color = "white", weight = 2,bringToFront = TRUE))
    })
    ## producing the map with polygon boundary on the state level
})





