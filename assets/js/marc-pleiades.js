// See post: http://asmaloney.com/2015/06/code/clustering-markers-on-leaflet-maps

// Sets up map to include widest stretch between Atlantic and Pacific Oceans
var map = L.map( 'map', {
    center: [40, 53],
    zoom: 3,
    minZoom: 3,
    maxZoom: 8,
    zoomControl: false
});

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiaXNhd255dSIsImEiOiJBWEh1dUZZIn0.SiiexWxHHESIegSmW8wedQ', {
 attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
 maxZoom: 10,
 id: 'isawnyu.map-knmctlkh',
 accessToken: 'pk.eyJ1IjoiZGl5Y2xhc3NpY3MiLCJhIjoiY2ozdW1uenYzMDFjejJxbzR2enBha3p6byJ9.0llqVkuLQVBkHA-T2G3c2Q'
 }).addTo(map);

var newControl = new L.Control.ZoomMin()
map.addControl(newControl)

var myURL = jQuery( 'script[src$="marc-pleiades.js"]' ).attr( 'src' ).replace( 'marc-pleiades.js', '' );

var myIcon = L.icon({
  iconUrl: myURL + '../img/pin24.png',
  iconRetinaUrl: myURL + '../img/pin48.png',
  iconSize: [29, 24],
  iconAnchor: [9, 21],
  popupAnchor: [0, -14]
});

var markerClusters = L.markerClusterGroup();

for ( var i = 0; i < books.length; ++i )
{
    
    if (books[i].pleiades != "") { 
        var pleiadesLink = '<br/><b>Pleiades link:</b> <a href="' + books[i].pleiades + '" target="_blank">' + books[i].pleiades + '</a>';
        
    } else {
        pleiadesLink = "";
    }    
    
  var popup = L.popup()
        .setContent(
            '<b>Title and author:</b> ' + books[i].book + '<br/>' +
            '<b>Imprint:</b> ' + books[i].imprint + '<br/>' +
            '<b>ISAW Shelving Location:</b> ' + books[i]["call-number"] + '<br/>' +
            '<a href="' + books[i].catalog + '&vid=NYU" target="_blank">View in NYU catalog</a>' + '<br/>' +
            pleiadesLink + '<br/>' +
            '<b>Representative coordinates:</b> ' + books[i].lat + ',' + books[i].lng + '</br>')
    
    if (books[i].lat != "" || books[i].lng != "" ) { 
        var m = L.marker( [books[i].lat, books[i].lng], {icon: myIcon} )
                  .bindPopup( popup, {minWidth: 400} );
    } else {
        console.log(books[i].book + ' does not have correct lat-long information.')
    }

  markerClusters.addLayer( m );
}

map.addLayer( markerClusters );
