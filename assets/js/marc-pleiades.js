// See post: http://asmaloney.com/2015/06/code/clustering-markers-on-leaflet-maps

// Centers map in Athens; zoomed to Mediterranean
var map = L.map( 'map', {
    center: [38.063831, 23.556011],
    zoom: 4,
    minZoom: 2,
    maxZoom: 8,
    zoomControl: false
});

L.tileLayer( 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
 attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
 subdomains: ['a','b','c']
}).addTo( map );


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
        var pleiadesLink = '<br/><a href="' + books[i].pleiades + '" target="_blank">' + books[i].pleiades + '</a>';
        
    } else {
        pleiadesLink = "";
    }    
    
  var popup = books[i].book +
      '<br/>' + books[i]["call-number"] +
      '<br/><a href="' + books[i].catalog + '&vid=NYU" target="_blank">View in NYU catalog</a>' +
      pleiadesLink


  var m = L.marker( [books[i].lat, books[i].lng], {icon: myIcon} )
                  .bindPopup( popup );

  markerClusters.addLayer( m );
}

map.addLayer( markerClusters );
