## Date: 2020-07-20
## Developer: Kaihua Hou, Johns Hopkins University ECE & CS

library(shiny)
library(leaflet)
library(magrittr)
library(rgdal)
library(plotly)
library(rjson)
library(dplyr)

shinyServer(function(input, output, session) {
    statepolygonZip <- download.file("https://www2.census.gov/geo/tiger/GENZ2018/shp/cb_2018_us_state_500k.zip", 
                                     destfile = "cb_2018_us_state_500k.zip");
    unzip("cb_2018_us_state_500k.zip");
    statePolygonData <- readOGR("cb_2018_us_state_500k.shp", layer = "cb_2018_us_state_500k", 
                                GDAL1_integer64_policy = TRUE);
    ## obtaning the state shape file data provided by cencus.gov 
    ## for more categories of region shape file: 
    ## https://www.census.gov/geographies/mapping-files/time-series/geo/carto-boundary-file.html
    
    url <- 'https://raw.githubusercontent.com/plotly/datasets/master/geojson-counties-fips.json'
    countyGeo <- rjson::fromJSON(file=url)
    ## Obtaining the geographical file for all U.S. counties
    
    url2<- "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_confirmed_US.csv"
    covidCases <- read.csv(url2, header = TRUE)
    fips <- sprintf("%05d",covidCases$FIPS)
    countyName <- covidCases$Country_Region
    totalComfirmed <- covidCases[,ncol(covidCases)]
    
    url3 <- "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_deaths_US.csv"
    covidDeath <- read.csv(url3, header = TRUE)
    totalDeath <- covidDeath[,ncol(covidDeath)]
    
    v <- reactiveValues(data = totalComfirmed)
    observeEvent(input$countyFill, {
        if (input$countyFill == "Map by total confirmed") {
           v$data <-  totalComfirmed;
           v$zmin = 100;
           v$zmax = 12000;
           v$color = "plasma";
           v$hover <- with(covidCases, paste(Admin2));
        }
        if (input$countyFill == "Map by total death") {
            v$data <-  totalDeath;
            v$zmin = 0;
            v$zmax = 1600;
            v$color = "inferno";
            v$hover <- with(covidDeath, paste(Admin2));
        }
    })
    
    output$countyPolygonMap <- renderPlotly({
        countyPolygonMap <- plot_ly() %>% add_trace(
            countyName <- covidCases$Country_Region,
            type="choroplethmapbox",
            geojson=countyGeo,
            locations=fips,
            z=v$data,
            colorscale="Viridis",
            zmin= v$zmin,
            zmax= v$zmax,
            text = ~v$hover,
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





