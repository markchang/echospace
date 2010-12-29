function onArtists(artists) {
  if( artists ) {
    
    // create overlay
    // probably should push into a popup
    var artists_dom = document.createElement('div');
    var title_dom = document.createElement('strong');
    title_dom.innerText = 'Search similar artists: ';
    artists_dom.appendChild(title_dom);
    artists_dom.style.background = '#36b';
    artists_dom.style.color = '#fff';
    artists_dom.style.padding = '10px';
    artists_dom.style.position = 'relative';
    artists_dom.style.zIndex = '9999999999';
    artists_dom.style.font = '14px Arial';
    artists_dom.style.textDecoration = 'none';
    
    for ( var artist in artists ) {
      var linkText = document.createTextNode( artists[artist].name );
      var spacerText = document.createTextNode( ' ' );
      var link = document.createElement('a');
      link.setAttribute('href', 
        'http://www.myspace.com/search/people?q='
        + artists[artist].name );
      link.style.textDecoration = 'none';
      link.appendChild(linkText);
      artists_dom.appendChild(link);
      artists_dom.appendChild(spacerText);
    }

    document.body.insertBefore(artists_dom, document.body.firstChild);
  }
};

function onMyspaceSearchResults(data) {
  if( data ) {
    // create overlay
    // probably should push into a popup
    var artists_dom = document.createElement('div');
    var title_dom = document.createElement('strong');
    title_dom.innerText = 'Similar artists on Myspace: ';
    artists_dom.appendChild(title_dom);
    artists_dom.style.background = '#36b';
    artists_dom.style.color = '#fff';
    artists_dom.style.padding = '10px';
    artists_dom.style.position = 'relative';
    artists_dom.style.zIndex = '9999999999';
    artists_dom.style.font = '14px Arial';
    artists_dom.style.textDecoration = 'none';
    
    for ( var x in data ) {
      var linkText = document.createTextNode( data[x].artist );
      var spacerText = document.createTextNode( ' | ' );
      var link = document.createElement('a');
      link.setAttribute('href', data[x].profileUrl );
      link.style.textDecoration = 'none';
      link.appendChild(linkText);
      artists_dom.appendChild(link);
      if (x < data.length - 1 ) artists_dom.appendChild(spacerText);
    }

    document.body.insertBefore(artists_dom, document.body.firstChild);
  }
};

// find a.userLink
var userLink = document.getElementsByClassName('userLink');
if ( userLink.length > 0 ) {
  // FIXME: this shit is so fragile
  var artistName = userLink[0].innerHTML;
  chrome.extension.sendRequest({data: artistName}, onMyspaceSearchResults);
} else {
  console.log('[MYSPACED]: no userLink found');
}