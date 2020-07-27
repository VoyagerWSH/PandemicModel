## Date: 2020-07-20
## Developer: Kaihua Hou, Johns Hopkins University ECE & CS

library(shiny)
library(leaflet)
library(magrittr)
library(rgdal)

shinyServer(function(input, output) {
    dir <- getwd();
    
    countypolygonZip <- download.file("https://www2.census.gov/geo/tiger/TIGER2017/COUNTY/tl_2017_us_county.zip", 
                                      destfile = "tl_2017_us_county.zip");
    unzip("tl_2017_us_county.zip");
    countyPolygonData <- readOGR("tl_2017_us_county.shp", layer = "tl_2017_us_county", 
                                 GDAL1_integer64_policy = TRUE);
    ## obtaning the county shape file data provided by cencus.gov 
    
    statepolygonZip <- download.file("https://www2.census.gov/geo/tiger/GENZ2018/shp/cb_2018_us_state_500k.zip", 
                                     destfile = "cb_2018_us_state_500k.zip");
    unzip("cb_2018_us_state_500k.zip");
    statePolygonData <- readOGR("cb_2018_us_state_500k.shp", layer = "cb_2018_us_state_500k", 
                                GDAL1_integer64_policy = TRUE);
    ## obtaning the state shape file data provided by cencus.gov 
    ## for more categories of region shape file: 
    ## https://www.census.gov/geographies/mapping-files/time-series/geo/carto-boundary-file.html
    
    
    output$countyPolygonMap <-renderLeaflet ({
        countyPolygonMap <- leaflet(countyPolygonData) %>% 
            addPolygons(color = "#444444", weight = 1, 
                        smoothFactor = 0.5, opacity = 1.0, 
                        fillOpacity = 0.5,fillColor = 
                            ~colorQuantile("YlOrRd", ALAND)(ALAND),
                        highlightOptions = highlightOptions
                       (color = "white", weight = 2,bringToFront = TRUE))
    })
    ## producing the map with polygon boundary on the county level 
    
    output$statePolygonMap <-renderLeaflet ({
        neStates <- as.vector(paste(input$statesInput, sep = ", "));
        ## extracting the all inputs and combining to a string 
        statesAbbr <- subset(statePolygonData, statePolygonData$STUSPS %in% c(neStates));
        ## subsetting the shape file with the selected states
        
        leaflet(statesAbbr) %>%
            addPolygons(color = "#444444", weight = 1, smoothFactor = 0.5,
                        opacity = 1.0, fillOpacity = 0.5,
                        fillColor = ~colorQuantile("YlOrRd", ALAND)(ALAND),
                        highlightOptions = highlightOptions(color = "white", weight = 2,
                                                            bringToFront = TRUE))
    })
    ## producing the map with polygon boundary on the state level
})





