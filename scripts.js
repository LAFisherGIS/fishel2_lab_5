$(document).ready(pollutionMap);
$(document).ready(clusterMap);
$(document).ready(schoolMap);
$(document).ready(parkMap);
$(document).ready(modeCheck);

/* This code is based on Tero Karvinen's reference implementation (https://terokarvinen.com/2018/save-checkbox-state-to-localstorage-javascript-and-jquery-example/) for the use of localStorage to preserve the state of a checkbox between pages and sessions. */
function modeCheck(){
  let checked="true"==localStorage.getItem("status");
  $("#lightordark").prop('checked', checked)
  $("#lightordark").click(modeSet);
}

function modeSet(){
  let checked=$("#lightordark").is(":checked");
  localStorage.setItem("status", checked);
}

// End Tero-based scripting

function pollutionMap(){

    var dark = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id:'lafishergis/ckvwv1qz354hp14s8pcasgvi8',
        accessToken: 'sk.eyJ1IjoibGFmaXNoZXJnaXMiLCJhIjoiY2t2OXJ4dnV1YTY2ZjJwbnpjM3BxbWRnYiJ9.CW4oaT94TkbelBF0Fj4rJw',
        tileSize: 512,
        zoomOffset: -1,
    });

    var pbgMap = L.map('pbgmap', {
      layers:[dark],
      maxBounds : [[47.37396776157878, -122.63860441671564], [47.09334144436703, -122.29401946898379]],
      minZoom : 12
    }).setView([47.2528769, -122.4442906], 12);

//This is a six class jenks natural breaks classification

    function colorization(d) {
        return d > 15       ? '#b30000' :
              d > 7         ? '#e34a33' :
              d > 3         ? '#fc8d59' :
              d > 1         ? '#fdbb84' :
              d > 0         ? '#fdd49e' :
                              '#fef0d9';
    }

    function bgPaint(feature) {
        return {
            fillColor: colorization(feature.properties.Pollution_),
            weight: 2,
            opacity: 1,
            color: 'white',
            dashArray: '3',
            fillOpacity: 0.5
        };
    }

    var info = L.control();

    info.onAdd = function infoDiv(pbgMap) {
        this._div = L.DomUtil.create('div', 'info');
        this.update();
        return this._div;
    };

    info.update = function infoFill(props) {
        this._div.innerHTML = '<h4>Blockgroup Demographics and Pollution</h4>' +  (props ?
            '<b>' + '(For Ethnicities, 1 = 100%, 0 = 0%)' + '<br><b>' + 'Blockgroup Number: ' + props.NAMELSAD + '</b><br />' + '<b>' + 'Pollution Index ' + props.Pollution_ + '</b><br />'  + 'Socioeconomic Status Index ' + props.Socioecono + '<br />' + 'White Portion ' + props.White_Port + '<br />' + 'Black Portion ' + props.Black_Port + '<br />' + 'Native American Portion ' + props.Native_Por + '<br />' + 'Asian Portion ' + props.Asian_Port + '<br />' + 'Pacific Islander Portion ' + props.Pacific_Po + '<br />' + 'Multiracial Portion ' + props.Multiracia + '<br />' + 'Portion of Other Ethnicities ' + props.Other_Port + '<br />'
            : 'Hover over a blockgroup to learn more.');
    };

    info.addTo(pbgMap);

    function scrollOn(e) {
      var layer = e.target;
      layer.setStyle({
        weight: 5,
        color: '#666',
        dashArray: '',
        fillOpacity: 0.7
      });

      if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();
      }
      info.update(layer.feature.properties);
    }

    function scrollOff(e) {
      geojson.resetStyle(e.target);
      info.update();
    }

    function zoomClick(e) {
      pbgMap.fitBounds(e.target.getBounds());
    }

    function mouseIntegration(feature, layer) {
      layer.on({
          mouseover: scrollOn,
          mouseout: scrollOff,
          click: zoomClick
      });
    }

    let geojson = L.geoJson(pollutionBlockgroups, {
      style: bgPaint,
      onEachFeature: mouseIntegration
    }).addTo(pbgMap);

    let Legend =  new L.Control.Legend({
        position: 'bottomright',
    });

    pbgMap.addControl(Legend);
    $("#pbgmap .legend-container").append( $("#pbglegend") );
}

function clusterMap(){

    var dark = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id:'lafishergis/ckvwv1qz354hp14s8pcasgvi8',
        accessToken: 'sk.eyJ1IjoibGFmaXNoZXJnaXMiLCJhIjoiY2t2OXJ4dnV1YTY2ZjJwbnpjM3BxbWRnYiJ9.CW4oaT94TkbelBF0Fj4rJw',
        tileSize: 512,
        zoomOffset: -1,
    });

    function colorization(d) {
        return d == 'HH'       ? '#045a8d' :
              d == 'HL'        ? '#2b8cbe' :
              d == 'LH'        ? '#bdc9e1' :
              d == 'LL'        ? '#f1eef6' :
                               '#74a9cf';
    }

    function clustPaint(feature) {
        return {
            fillColor: colorization(feature.properties.COType),
            weight: 2,
            opacity: 1,
            color: 'white',
            dashArray: '3',
            fillOpacity: 0.5
        };
    }

    let polluJson = L.geoJson(pollutionCluster, {
      style: clustPaint,
    });

    let socioJson = L.geoJson(socioeconomicCluster, {
      style: clustPaint,
    });

    let whiteJson = L.geoJson(whitePop, {
      style: clustPaint,
    });

    let blackJson = L.geoJson(blackPop, {
      style: clustPaint,
    });

    let nativeJson = L.geoJson(nativePop, {
      style: clustPaint,
    });

    let asianJson = L.geoJson(asianPop, {
      style: clustPaint,
    });

    let pacificJson = L.geoJson(pacificPop, {
      style: clustPaint,
    });

    let multiJson = L.geoJson(multiPop, {
      style: clustPaint,
    });

    let otherJson = L.geoJson(otherPop, {
      style: clustPaint,
    });

    let clusterOverlay = {
      "Pollution Clusters": polluJson,
      "Socioeconomic Status Clusters": socioJson,
      "White Population Clusters": whiteJson,
      "Black Population Clusters": blackJson,
      "Native American Population Clusters": nativeJson,
      "Asian Population Clusters": asianJson,
      "Pacific Islander Population Clusters": pacificJson,
      "Multiracial Population Clusters": multiJson,
      "Other Ethnicity Population Clusters": otherJson
    }

    var clusterMap = L.map('clustermap', {
      layers:[dark, polluJson],
      maxBounds : [[47.37396776157878, -122.63860441671564], [47.09334144436703, -122.29401946898379]],
      minZoom : 12
    }).setView([47.2528769, -122.4442906], 12);

    var myControl = L.control.layers(clusterOverlay,'', {collapsed:false}).addTo(clusterMap);

    let Legend =  new L.Control.Legend({
        position: 'bottomright',
    });

    clusterMap.addControl(Legend);
    $("#clustermap .legend-container").append( $("#clusterlegend") );
}

function schoolMap(){

    var dark = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id:'lafishergis/ckvwv1qz354hp14s8pcasgvi8',
        accessToken: 'sk.eyJ1IjoibGFmaXNoZXJnaXMiLCJhIjoiY2t2OXJ4dnV1YTY2ZjJwbnpjM3BxbWRnYiJ9.CW4oaT94TkbelBF0Fj4rJw',
        tileSize: 512,
        zoomOffset: -1,
    });

    function sbPaint(feature) {
        return {
            fillColor: '#808000',
            weight: 2,
            opacity: 1,
            color: 'white',
            dashArray: '3',
            fillOpacity: 0.5
        };
    }

    function sgPaint(feature) {
        return {
            fillColor: '#2b8cbe',
            weight: 2,
            opacity: 1,
            color: 'white',
            dashArray: '3',
            fillOpacity: 0.5
        };
    }

    let ebJson = L.geoJson(elemBounds, {
      style: sbPaint,
    });

    let mbJson = L.geoJson(midBounds, {
      style: sbPaint,
    });

    let egJson = L.geoJson(elemGrounds, {
      style: sgPaint,
    });

    let epJson = L.geoJson(elemPoints, {
      pointToLayer: function(feature, latlng){
        var polluColor,
        risk = feature.properties.Pollution_;
          if (feature.properties.Pollution_ > 15) polluColor = '#bd0026';
          else if (feature.properties.Pollution_ > 7) polluColor = '#f03b20';
          else if (feature.properties.Pollution_ > 3) polluColor = '#fd8d3c';
          else if (feature.properties.Pollution_ > 1) polluColor = '#feb24c';
          else if (feature.properties.Pollution_ > 0) polluColor = '#fed976';
          else polluColor = '#ffffb2'
        var marker = L.circle(latlng, {size: 'm', color: polluColor});
          marker.bindPopup("Name: " + feature.properties.NAME + "<br>Address: " + feature.properties.ADDRESS + "<br> Grades: " + feature.properties.GRADE + "<br>" + "<br>Pollution Index: " + " " + feature.properties.Pollution_ + "<br>Average Socioeconomic Status Index: " + " " + feature.properties.MEAN_SES + "<br>White Portion of Cachement Area: " + " " + feature.properties.MEAN_White + "<br>Black Portion of Cachement Area: " + " " + feature.properties.MEAN_Black + "<br>Native American Portion of Cachement Area: " + " " + feature.properties.MEAN_Nativ + "<br>Asian Portion of Cachement Area: " + " " + feature.properties.MEAN_Asian + "<br>Pacific Islander Portion of Cachement Area: " + " " + feature.properties.MEAN_Pacif + "<br>Multiracial Portion of Cachement Area: " + " " + feature.properties.MEAN_Multi + "<br>Other Ethnicity Portion of Cachement Area: " + " " + feature.properties.MEAN_Other)
          if (feature.properties.Pollution_ !== "")
          return marker;
        }
    });

    let mgJson = L.geoJson(midGrounds, {
      style: sgPaint,
    });

    let mpJson = L.geoJson(midPoints, {
      pointToLayer: function(feature, latlng){
        var polluColor,
        risk = feature.properties.Pollution_;
          if (feature.properties.Pollution_ > 15) polluColor = '#bd0026';
          else if (feature.properties.Pollution_ > 7) polluColor = '#f03b20';
          else if (feature.properties.Pollution_ > 3) polluColor = '#fd8d3c';
          else if (feature.properties.Pollution_ > 1) polluColor = '#feb24c';
          else if (feature.properties.Pollution_ > 0) polluColor = '#fed976';
          else polluColor = '#ffffb2'
        var marker = L.circle(latlng, {size: 'm', color: polluColor});
          marker.bindPopup("Name: " + feature.properties.NAME + "<br>Address: " + feature.properties.ADDRESS + "<br> Grades: " + feature.properties.GRADE + "<br>" + "<br>Pollution Index: " + " " + feature.properties.Pollution_ + "<br>Average Socioeconomic Status Index: " + " " + feature.properties.MEAN_SES + "<br>White Portion of Cachement Area: " + " " + feature.properties.MEAN_White + "<br>Black Portion of Cachement Area: " + " " + feature.properties.MEAN_Black + "<br>Native American Portion of Cachement Area: " + " " + feature.properties.MEAN_Nativ + "<br>Asian Portion of Cachement Area: " + " " + feature.properties.MEAN_Asian + "<br>Pacific Islander Portion of Cachement Area: " + " " + feature.properties.MEAN_Pacif + "<br>Multiracial Portion of Cachement Area: " + " " + feature.properties.MEAN_Multi + "<br>Other Ethnicity Portion of Cachement Area: " + " " + feature.properties.MEAN_Other)
          if (feature.properties.Pollution_ !== "")
          return marker;
        }
    });

    let elem = L.layerGroup([ebJson, egJson, epJson])

    let mid = L.layerGroup([mbJson, mgJson, mpJson])

    let schoolOverlay = {
      "Elementary Schools": elem,
      "Middle Schools": mid
    }

    var schoolMap = L.map('schoolmap', {
      layers:[dark, elem],
      maxBounds : [[47.37396776157878, -122.63860441671564], [47.09334144436703, -122.29401946898379]],
      minZoom : 12
    }).setView([47.2528769, -122.4442906], 12);

    var myControl = L.control.layers(schoolOverlay,'', {collapsed:false}).addTo(schoolMap);

    let Legend =  new L.Control.Legend({
        position: 'bottomright',
    });

    schoolMap.addControl(Legend);
    $("#schoolmap .legend-container").append( $("#schoollegend") );
}

function parkMap(){

    var light = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 18,
      id:'lafishergis/ckvwum7mc30u214nxeoigeyr6',
      accessToken: 'sk.eyJ1IjoibGFmaXNoZXJnaXMiLCJhIjoiY2t2OXJ4dnV1YTY2ZjJwbnpjM3BxbWRnYiJ9.CW4oaT94TkbelBF0Fj4rJw',
      tileSize: 512,
      zoomOffset: -1,
    });

    var dark = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id:'lafishergis/ckvwv1qz354hp14s8pcasgvi8',
        accessToken: 'sk.eyJ1IjoibGFmaXNoZXJnaXMiLCJhIjoiY2t2OXJ4dnV1YTY2ZjJwbnpjM3BxbWRnYiJ9.CW4oaT94TkbelBF0Fj4rJw',
        tileSize: 512,
        zoomOffset: -1,
    });

    var baseMaps = {"Light Mode": light, "Dark Mode": dark};

    var parkMap = L.map('parkmap', {
      layers:[dark],
      maxBounds : [[47.37396776157878, -122.63860441671564], [47.09334144436703, -122.29401946898379]],
      minZoom : 12
    }).setView([47.2528769, -122.4442906], 12);

    var myControl = L.control.layers(baseMaps).addTo(parkMap);

    let Legend =  new L.Control.Legend({
        position: 'bottomright',
    });

    parkMap.addControl(Legend);
    $("#parkmap .legend-container").append( $("#parklegend") );
}
