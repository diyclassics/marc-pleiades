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

// Hardcoded list of possible site types to be used later for selecting the icon
var vSites = ["Site", "City", "Region", "Broad region", "No precision"];
var vIcons = [];

// Populate the icon list with the proper choices for each site type
for ( var i = 0; i < vSites.length; i++ )
  vIcons.push( L.icon({
    iconUrl: myURL + '../img/pin24_' + vSites[i] +'.png',
    iconRetinaUrl: myURL + '../img/pin48_' + vSites[i] +'.png',
    iconSize: [24, 24],
    iconAnchor: [12, 12],
    popupAnchor: [1, 1]
  }) );

var markerClusters = L.markerClusterGroup();

for ( var i = 0; i < books.length; ++i )
{

    if (books[i].pleiades_id != "") {
        var pleiadesLink = '<br/><b>Pleiades link:</b> <a href="https://pleiades.stoa.org/places/' + books[i].pleiades_id + '" target="_blank">' + books[i].pleiades_name + ' ' + books[i].pleiades_id + '</a>';

    } else {
        pleiadesLink = "";
    }

    if (books[i].series != "") {
        var seriesContent = '<b>Series:</b> ' + books[i].series + '<br/>';
    } else {
        seriesContent = "";
    }


    bsn = books[i].bsn
    pad = '000000000'
    bsn = (pad+bsn).slice(-pad.length);
    bobcatLink = 'https://library.nyu.edu/persistent/lcn/nyu_aleph' + bsn + '?institution=NYU&persistent';

  var popup = L.popup()
        .setContent(
            '<b>Title and author:</b> ' + books[i].title + '<br/>' +
            '<b>Imprint:</b> ' + books[i].imprint + '<br/>' +
            seriesContent +
            '<b>ISAW Shelving Location:</b> ' + books[i].shelf_location + '<br/>' +
            '<a href="' + bobcatLink + '" target="_blank">View in NYU catalog</a>' + '<br/>' +
            pleiadesLink + '<br/>' +
            '<b>Region:</b> ' + books[i].region + ' <b>Location:</b> ' + books[i].location + '<br/>' +
            '<b>Representative coordinates:</b> ' + books[i].lat + ',' + books[i].lng + '<br/>' +
            '<b>Degree of Precision:</b> ' + books[i].precision + '<br/>')

    if (books[i].lat != "" || books[i].lng != "" ) {
        iSite = vSites.indexOf(books[i].precision.trim());
        if(iSite >= 0) {
          var m = L.marker( [books[i].lat, books[i].lng], {icon: vIcons[iSite]} )
                    .bindPopup( popup, {minWidth: 400} );
        }
    } else {
        console.log(books[i].book + ' does not have correct lat-long information.')
    }

  markerClusters.addLayer( m );
}

map.addLayer( markerClusters );
