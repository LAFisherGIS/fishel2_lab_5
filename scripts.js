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

    var map = L.map('pbgmap', {
      layers:[dark],
      maxBounds : [[47.33126776157878, -122.63860441671564], [47.09334144436703, -122.29401946898379]],
      minZoom : 12
    }).setView([47.2528769, -122.4442906], 12);

    var myControl = L.control.layers(baseMaps).addTo(map);


}

function clusterMap(){

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

    var map = L.map('clustermap', {
      layers:[dark],
      maxBounds : [[47.33126776157878, -122.63860441671564], [47.09334144436703, -122.29401946898379]],
      minZoom : 12
    }).setView([47.2528769, -122.4442906], 12);

    var myControl = L.control.layers(baseMaps).addTo(map);


}

function schoolMap(){

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

    var map = L.map('schoolmap', {
      layers:[dark],
      maxBounds : [[47.33126776157878, -122.63860441671564], [47.09334144436703, -122.29401946898379]],
      minZoom : 12
    }).setView([47.2528769, -122.4442906], 12);

    var myControl = L.control.layers(baseMaps).addTo(map);


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

    var map = L.map('parkmap', {
      layers:[dark],
      maxBounds : [[47.33126776157878, -122.63860441671564], [47.09334144436703, -122.29401946898379]],
      minZoom : 12
    }).setView([47.2528769, -122.4442906], 12);

    var myControl = L.control.layers(baseMaps).addTo(map);


}
