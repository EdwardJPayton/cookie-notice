'use strict';

var cookieNotice = function(options) {

  var isUndefined = function(myObj,myDefault){
    return (typeof myObj === 'undefined') ? myDefault : myObj;
  }

  var position = isUndefined(options.position, 'bottom'),
      theme = isUndefined(options.theme, 'dark'),
      text = isUndefined(options.text, 'No text entered'),
      policyPage = isUndefined(options.policyPage, false),
      timeToHide = isUndefined(options.timeToHide, 12);

  var titleCase = function(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  var cookieFind = function(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
      var c = ca[i];
      while (c.charAt(0)==' ') c = c.substring(1,c.length);
      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
  }
  var cookieVisibility = function() {
    var cookieNotice = document.getElementById('cookieNotice');
    cookieNotice.style.opacity = 0;
    setTimeout(function() {
      cookieNotice.style.visibility = 'hidden';
    },250);
  }

  // If cookie does not exist
  if(!cookieFind('cookieWarning')) {
    // Create bar
    var classPosition = titleCase(position);
    var classColor = titleCase(theme);
    var cookieHtml = document.createElement('div');
    cookieHtml.id = 'cookieNotice';
    cookieHtml.className = 'cookie-notice';
    cookieHtml.innerHTML = '<div class="cookie-content _position' + classPosition + ' _theme' + classColor + '"><p id="cookieText">' + text + '</p><button id="cookieClose">OK</button></div>';
    document.body.insertBefore(cookieHtml, document.body.firstChild);

    // Add link to bar
    if(policyPage) {
      var policyLink = document.createElement('a');
      policyLink.href = location.protocol + '//' + location.host + policyPage;
      policyLink.title = 'Cookie Policy';
      policyLink.innerHTML = 'More info';
      document.getElementById('cookieText').appendChild(policyLink);
    }

    // Set cookieHtml
    var date = new Date();
    date.setDate(date.getDate() + 365);
    document.cookie = 'cookieWarning' + "=" + true + "; expires=" + date.toGMTString() + "; path=/";

    // Onclick, hide bar
    var cookieClose = document.getElementById('cookieClose');
    if(cookieClose.addEventListener) {
      cookieClose.addEventListener('click', function() {
        cookieVisibility();
      },false);
    } else {
      cookieClose.attachEvent('onclick', function() {
        cookieVisibility();
      });
    }

    // Hide bar
    setTimeout(function() {
      cookieVisibility();
    },timeToHide * 1000);

  }

}
