'use strict';

var cookieNotice = function(options) {
  var themePosition = (typeof options.position === 'undefined') ? 'bottom' : options.position,
      themeColor = (typeof options.theme === 'undefined') ? 'dark' : options.theme,
      cookieText = (typeof options.text === 'undefined') ? 'No text entered' : options.text,
      policyPage = (typeof options.policyPage === 'undefined') ? false : options.policyPage,
      timeToHide = (typeof options.timeToHide === 'undefined') ? 12 : options.timeToHide


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
  var cookieVisibility = function(choice) {
    document.getElementById('cookieNotice').style.visibility = choice;
  }

  // If cookie does not exist
  if(!cookieFind('cookieWarning')) {
    // Create bar
    var classPosition,classColor;

    switch(themePosition) {
      case "left":
        classPosition = " _boxLeft";
        break;
      case "right":
        classPosition = " _boxRight";
        break;
      case "top":
        classPosition = " _barTop";
        break;
      default:
        classPosition = " _barBottom";
    }
    switch(themeColor) {
      case "light":
        classColor = " _themeLight";
        break;
      default:
        classColor = " _themeDark";
    }
    var cookieHtml = document.createElement('div');
    cookieHtml.id = 'cookieNotice';
    cookieHtml.className = 'cookie-notice';
    cookieHtml.innerHTML = '<div class="cookie-content' + classPosition + classColor + '"><p id="cookieText">' + cookieText + '</p><button class="cookie-close" id="cookieClose">OK</button></div>';
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
        cookieVisibility('hidden');
      },false);
    } else {
      cookieClose.attachEvent('onclick', function() {
        cookieVisibility('hidden');
      });
    }

    // Hide bar
    var cookieTime = setTimeout(function() {
      cookieVisibility('hidden');
    },timeToHide * 1000);

  }

}
