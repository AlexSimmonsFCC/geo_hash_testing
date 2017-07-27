# **geohash-helper**

# About
geohash-helper is an AMD module you can pull into your ArcGIS API for JavaScript version 4.4+ applications to help you build and work with geohash grid data.


# Sample
A sample app can be found [here](http://bit.ly/2vLojXH). This uses the module to generate a grid based on the current map view extent send of a series of queries to a feature service to find out the number of features within each geohash grid shape and display this to the user.

# Using
Start by cloning the repo and to ensure you have a copy of the modules folder. Point to the modules folder in the head of your HTML file

'''
 <script>
        var dojoConfig = {
            async: true,
            isDebug: true,
            paths: {
                modules: location.href.replace(location.href.split("/").pop(), "") + "/lib/modules"
            }
        };
    </script>
'''

In your JavaScript load the geohash-helper module alongside ArcGIS modules you are making use of.

'''
require([
            "esri/Map",
            "esri/views/MapView",
            "modules/geohash"
        ], function(Map, MapView, geohash) {...
            '''

Available methods are...

'''

geohash.getGeohashPolygon(geohashcode) //Takes a geohash code as a string, e.g. "djb". Returns a polygon object
geohash.getGeohashPolygons(geohashcodes) //Takes an array of geohash codes, e.g. ["djb","djc"].. Returns an array of polygon objects
geohash.buildGeohash(view,precision) //Takes a map view object and a geohash grid precision number. Returns an array of geohash codes for the view extent
geohash.buildGeohashPolygons(view,precision) //Takes a map view object and a geohash grid precision number. Returns an array of polygon objects for the view extent

'''

Note - requries the view's spatial reference to be Web Mercator. 

# Issues

Find a bug or want to request a new feature? Please let us know by submitting an issue.

# Licensing

Copyright 2016 ESRI (UK) Limited

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the Licence.
