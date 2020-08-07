## Date: 2020-07-20
## Developer: Kaihua Hou, Johns Hopkins University ECE & CS
library(shiny)
library(shinyWidgets)
library(plotly)
library(leaflet)

ui <- fluidPage(
    
    titlePanel("Johns Hopkins COVID-19 Modeling Visualization Map"),
    setBackgroundImage(
        src = "https://brand.jhu.edu/assets/uploads/sites/5/2014/06/university.logo_.small_.horizontal.blue_.jpg"
    ),
    
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
            actionButton("submit", "Submit (may take 30s to load)")
        ), 
        
        mainPanel(
            tabsetPanel(type = "tabs", 
                        tabPanel("County Level", plotlyOutput("countyPolygonMap"),
                                 htmlOutput("casesMotionChart"),
                                 htmlOutput("deathMotionChart")),
                        tabPanel("State Level", leafletOutput("statePolygonMap")),
                        tags$div(
                            tags$p(
                                "JHU.edu Copyright © 2020 by Johns Hopkins University & Medicine. All rights reserved."
                            ),
                            tags$p(
                                tags$a(href="https://it.johnshopkins.edu/policies/privacystatement",
                                       "JHU Information Technology Privacy Statement for Websites and Mobile Applications")
                            )
                        )
            )
        )
    )
)
