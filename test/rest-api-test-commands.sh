#!/bin/bash

# List of scripts to run to test the rest API

#Returns all the most recent posisitions for each mmsi
curl http://localhost:8000/denmarkTraffic/AISMessages/
#Returns the locations 
curl  http://localhost:8000/denmarkTraffic/AISMessages/257961000
