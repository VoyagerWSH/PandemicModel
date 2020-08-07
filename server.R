## Date: 2020-07-20
## Developer: Kaihua Hou, Johns Hopkins University ECE & CS

library(shiny)
library(leaflet)
library(magrittr)
library(rgdal)
library(plotly)
library(rjson)
library(dplyr)
library(viridis) 
library(googleVis)
library(lubridate)
library(reshape2)
library(data.table)
library(shinyWidgets)


server <- function(input, output, session) {
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
    colnames(covidCases)[11] <- "countyNames"
    totalComfirmed <- covidCases[,c(which(names(covidCases)=="countyNames"), ncol(covidCases))]
    names(totalComfirmed) <- c("countyNames", "cases")
    
    destroyX = function(es) {
        f = es
        for (col in c(1:ncol(f))){ #for each column in dataframe
            if (startsWith(colnames(f)[col], "X") == TRUE)  { #if starts with 'X' ..
                colnames(f)[col] <- substr(colnames(f)[col], 2, 100) #get rid of it
            }
        }
        assign(deparse(substitute(es)), f, inherits = TRUE) #assign corrected data to original name
    }
    destroyX(covidCases)
    
    gvisCasesData <- cbind.data.frame(covidCases[,c(11:ncol(covidCases))])
    gvisCasesData <- melt(data = setDT(gvisCasesData), id.vars = c("countyNames"),measure.vars = c(colnames(covidCases)[c(12:ncol(covidCases))]))
    colnames(gvisCasesData)[2:3] <- c("Date", "numCases")
    gvisCasesData$Date <- mdy(gvisCasesData$Date)
    
    
    url3 <- "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_deaths_US.csv"
    covidDeath <- read.csv(url3, header = TRUE)
    fips <- sprintf("%05d",covidDeath$FIPS)
    colnames(covidDeath)[11] <- "countyNames"
    totalDeath <- covidDeath[,c(which(names(covidDeath)=="countyNames"), ncol(covidDeath))]
    names(totalDeath) <- c("countyNames", "totalDeath")
    destroyX(covidDeath)
    
    gvisDeathData <- cbind.data.frame(covidDeath[,c(11, 13:ncol(covidDeath))])
    gvisDeathData <- melt(data = setDT(gvisDeathData), id.vars = c("countyNames"),measure.vars = c(colnames(covidDeath)[c(13:ncol(covidDeath))]))
    colnames(gvisDeathData)[2:3] <- c("Date", "numDeath")
    gvisDeathData$Date <- mdy(gvisDeathData$Date)
    
    observeEvent(input$submit, {
        req(input$submit)  

    observeEvent(input$countyFill, {
        if (input$countyFill == "Map by total confirmed") {
            output$countyPolygonMap <- renderPlotly({
                countyPolygonMap <- plot_ly(source = "casesMap") %>% add_trace(
                    countyName <- covidCases$countyNames,
                    type="choroplethmapbox",
                    geojson=countyGeo,
                    locations=fips,
                    z=totalComfirmed$cases,
                    colorscale="Viridis",
                    zmin= 100,
                    zmax= 12000,
                    text = ~with(covidCases, paste(countyNames)),
                    marker=list(line=list(width=0),opacity=0.5),
                    customdata =~totalComfirmed$countyNames
                ) %>% layout(
                    mapbox=list(
                        style="carto-positron",
                        zoom =2,
                        center=list(lon= -95.71, lat=37.09))
                    %>% event_register(event = "plotly_selected")
                );
                countyPolygonMap;
                ## generating the interactive plotly map
            })
            output$casesMotionChart <- renderGvis({
                selected <- event_data(event = "plotly_selected", source = "casesMap")$customdata
                gvisCasesDataSubset <- subset(gvisCasesData, countyNames %in% c(selected))
                motionChart <- gvisMotionChart(gvisCasesDataSubset, "countyNames", "Date", options=list(width="automatic", height="automatic"))
            })
        }
        if (input$countyFill == "Map by total death") {
            output$countyPolygonMap <- renderPlotly({
                countyPolygonMap <- plot_ly(source = "deathMap") %>% add_trace(
                    countyName <- covidDeath$countyNames,
                    type="choroplethmapbox",
                    geojson=countyGeo,
                    locations=fips,
                    z=totalDeath$totalDeath,
                    colorscale="Viridis",
                    zmin= 0,
                    zmax= 1600,
                    text = ~with(covidDeath, paste(countyNames)),
                    marker=list(line=list(width=0),opacity=0.5),
                    customdata =~totalDeath$countyNames
                ) %>% layout(
                    mapbox=list(
                        style="carto-positron",
                        zoom =2,
                        center=list(lon= -95.71, lat=37.09))
                    %>% event_register(event = "plotly_selected")
                );
                countyPolygonMap;
                ## generating the interactive plotly map
            })
            output$deathMotionChart <- renderGvis({
                selected <- event_data(event = "plotly_selected", source = "deathMap")$customdata
                gvisDeathDataSubset <- subset(gvisDeathData, countyNames %in% c(selected))
                motionChart <- gvisMotionChart(gvisDeathDataSubset, "countyNames", "Date", options=list(width="automatic", height="automatic"))
            })
        }
    })

        
        
        
        output$statePolygonMap <-renderLeaflet ({
            statesAbbr <- subset(statePolygonData, statePolygonData$STUSPS %in% input$statesInput);
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
    
}