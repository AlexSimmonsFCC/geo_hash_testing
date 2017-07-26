define([
     "esri/geometry/Polygon",
     "esri/geometry/support/webMercatorUtils",
     "modules/latlon_geohash"
], function (Polygon, webMercatorUtils) {

    //Function that takes a geohash code and returns a polygon
    var getGeohashPolygon = function (geohashCode) {
        var geometry = Geohash.bounds(geohashCode);
        var polygon = new Polygon({
            rings: [
              [geometry.sw.lon, geometry.ne.lat],
              [geometry.ne.lon, geometry.ne.lat],
              [geometry.ne.lon, geometry.sw.lat],
              [geometry.sw.lon, geometry.sw.lat],
              [geometry.sw.lon, geometry.ne.lat]
            ]
        });
        return polygon;
    }

    //Function that takes an array of geohash codes and return an array of polygons
    var getGeohashPolygons = function (geohashCodes) {
        var geohash = [];
        for (i = 0; i < geohashCodes.length; i++) {
            var polygon = getGeohashPolygon(geohashCodes[i])
            geohash.push(polygon);
        }
        return geohash;
    }

    //Function that takes a view object and geohash precision value and returns an array of geohash values for the view extent
    var buildGeohash = function (view, precision) {
        var geohash = [];
        var topLeft = webMercatorUtils.xyToLngLat(view.extent.xmin, view.extent.ymax);
        var topRight = webMercatorUtils.xyToLngLat(view.extent.xmax, view.extent.ymax);
        var bottomLeft = webMercatorUtils.xyToLngLat(view.extent.xmin, view.extent.ymin);
        var start = Geohash.encode(topLeft[1], topLeft[0], precision);
        var finish = Geohash.encode(topRight[1], topRight[0], precision);
        geohash.push(start);
        var arrayHorizontal = [start]
        var latest = start;
        while (arrayHorizontal.includes(finish) == false) {
            latest = Geohash.adjacent(latest, "E");
            geohash.push(latest);
            arrayHorizontal.push(latest);
        }
        finish = Geohash.encode(bottomLeft[1], bottomLeft[0], precision);
        var arrayVertical = [start];
        var latest = start;
        while (arrayVertical.includes(finish) == false) {
            latest = Geohash.adjacent(latest, "S");
            geohash.push(latest);
            arrayVertical.push(latest);
        }
        var horizontalCount = 1;
        latest = arrayHorizontal[horizontalCount];
        while (arrayHorizontal.length != horizontalCount) {
            var verticalCount = 1;
            while (arrayVertical.length != verticalCount) {
                latest = Geohash.adjacent(latest, "S");
                geohash.push(latest);
                verticalCount++;
            }
            horizontalCount++;
            latest = arrayHorizontal[horizontalCount];
        }
        return geohash;
    }

    //Function that takes a view object and geohash precision value and returns an array of geohash polygons for the view extent
    var buildGeohashPolygons = function (view, precision) {
        var geohashCodes = buildGeohash(view, precision);
        var geohash = [];
        for (i = 0; i < geohashCodes.length; i++) {
            var polygon = getGeohashPolygon(geohashCodes[i])
            geohash.push(polygon);
        }
        return geohash;
    }

    return {
        getGeohashPolygon: getGeohashPolygon,
        getGeohashPolygons: getGeohashPolygons,
        buildGeohash: buildGeohash,
        buildGeohashPolygons: buildGeohashPolygons
    };
});