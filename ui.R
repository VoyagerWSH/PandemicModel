## Date: 2020-07-20
## Developer: Kaihua Hou, Johns Hopkins University ECE & CS

library(shiny)
library(plotly)
library(leaflet)

shinyUI(fluidPage(
    
    titlePanel("JHU COVID-19 Modeling Visualization Map"),
    
    sidebarLayout(
        sidebarPanel(
            radioButtons("countyFill", "Choose the County Map Type", c("Map by total confirmed", "Map by total death"), selected = "Map by total confirmed"),
            checkboxGroupInput("statesInput", "Choose the State(s)", 
                               c("AL", "MO", "AK", "MT", "AZ", "NE", 
                                 "AR", "NV", "CA", "NH", "CO", "NJ", 
                                 "CT", "NM", "DE", "NY", "DC", "NC", 
                                 "FL", "ND", "GA", "OH", "HI", "OK", 
                                 "ID", "OR", "IL", "PA", "IN", "RI", 
                                 "IA", "SC", "KS", "SD", "KY", "TN", 
                                 "LA", "TX", "ME", "UT", "MD", "VT", 
                                 "MA", "VA", "MI", "WA", "MN", "WV", 
                                 "MS", "WI", "WY"),
                               inline = TRUE),                       
            submitButton("Submit")
                ), 

        mainPanel(
            tabsetPanel(type = "tabs", 
                        tabPanel("County Level", plotlyOutput("countyPolygonMap")), 
                        tabPanel("State Level", leafletOutput("statePolygonMap"))
            )
        )
)))

