// Initialize everything

$(document).ready(function(){

	$('ul.tabs').tabs();
	$('#current').hide();
	$('#settings-trigger').hide();
	$('#save-trigger').hide();
	$('#share-trigger').hide();
	$('select').material_select();

	if (localStorage.getItem("weather") === null) {
		localStorage['weather'] = '10001';
		$('#welcome').openModal();
	} else if (localStorage.getItem("nimbus") != "1.2") {
		//localStorage['nimbus'] = '1.1';
		$('#new').openModal();
	}
	
	if (localStorage.getItem("unit") === null) {
		localStorage['unit'] = 'f';
	}

	if (localStorage.getItem("radar-quality") === null) {
	  if (localStorage.getItem("radar") === null) {
	    localStorage['radar-quality'] = '1';
	  } else {
	    localStorage['radar-quality'] = localStorage['radar'];
	  }
	}
	
	if (localStorage.getItem("radar-location") === null) {
		localStorage['radar-location'] = '';
	}

	if (localStorage.getItem("color") === null) {
		localStorage['color'] = '#13A38D';
	}

	if (localStorage.getItem("bg") === null) {
		localStorage['bg'] = '';
	}

	if (localStorage.getItem("analytics") === null || localStorage.getItem("analytics") === "yes") {
		localStorage['analytics'] = 'true';
	}

	// Read values of settings from localStorage

	$("#location").val(localStorage['weather']);
	$("#unit").val(localStorage['unit']);
	$("#radar-location").val(localStorage['radar-location']);
	$("#radar-quality").val(localStorage['radar-quality']);
	$("#color").val(localStorage['color']);
	$("#bg").val(localStorage['bg']);
	$("#analytics").prop('checked', JSON.parse(localStorage['analytics']));
	
	// Google Analytics

	if (localStorage.getItem("analytics") == "true") {
		(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
		  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
		  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
		  })(window,document,'script','http://www.google-analytics.com/analytics.js','ga');

		  ga('create', 'UA-59452245-1', 'auto');
		  ga('send', 'pageview');
	}

	// Set background color

	if (localStorage.getItem("bg").length > 0) {
		$(".content").css("background", "url(" + localStorage.getItem("bg") + ") center no-repeat", "important");
	}

	// Set tab/links color

	$("#tabs").css("background", localStorage['color'], 'important');
	$(".tabs").css("background", localStorage['color'], 'important');
	$(".tab a").css("background", localStorage['color'], 'important');
	$(".credit").css("color", localStorage['color'], 'important');
	$(".title").css("color", localStorage['color'], 'important');
	$(".secondary-content").css("color", localStorage['color'], 'important');
	
	// Set hovering buttons color

	$("#settings-trigger").css("background", localStorage['color'], 'important');
	$("#save-trigger").css("background", localStorage['color'], 'important');
	$("#share-trigger").css("background", localStorage['color'], 'important');

	// Set buttons color

	$(".btn").css("background", localStorage['color'], 'important');
	$(".btn").css("background", localStorage['color'], 'important');

	// Actions on settings button click/tap

	$('#settings-trigger').click(function() {
		$('#settings-trigger').fadeOut( "slow", function() {});
		$('#settings').fadeIn( "slow", function() {});
		$('#save-trigger').fadeIn( "slow", function() {});
	});

	// Social Media links

	$('.twitterlink').click(function() {
		window.open("https://twitter.com/NimbusWeather", "_blank");
	});

	$('.googlelink').click(function() {
		window.open("https://plus.google.com/107563170995027312930", "_blank");
	});

	$('.githublink').click(function() {
		window.open("https://github.com/corbindavenport/nimbus", "_blank");
	});

	// Settings

	$('.location-item').click(function() {
		$('#location-modal').openModal();
		$("#location").select();
	});
	$('.units-item').click(function() {
		$('#units-modal').openModal();
	});
	$('.radar-location-item').click(function() {
		$('#radar-location-modal').openModal();
		$("#radar-location").select();
	});
	$('.radar-quality-item').click(function() {
		$('#radar-quality-modal').openModal();
	});
	$('.hex-item').click(function() {
		$('#hex-modal').openModal();
		$("#color").select();
	});
	$('.picker-item').click(function() {
		$('#picker-modal').openModal();
	});
	$('.color-reset').click(function() {
		document.getElementById("color").value = "#13A38D";
		toast('Color reset!', 3000, 'rounded');
	});
	$('.background-item').click(function() {
		$('#background-modal').openModal();
		$("#bg").select();
	});
	$('.privacy').click(function() {
		$('#privacymodal').openModal();
	});
  $('.paypal').click(function() {
		$('#paypalmodal').openModal();
	});
	$('.bitcoin').click(function() {
		$('#bitcoinmodal').openModal();
	});

	// Actions on save button click/tap

	$('#save-trigger').click(function() {
		if (($("#location").val().length > '0') && (($("#radar-location").val().match(/^\d+$/) != null)) || ($("#radar-location").val() === "")) {
			localStorage['weather'] = $("#location").val();
			localStorage['unit'] = $("#unit").val();
			localStorage['radar-location'] = $("#radar-location").val();
			localStorage['radar-quality'] = $("#radar-quality").val();
			localStorage['color'] = $("#color").val();
			localStorage['bg'] = $("#bg").val();
			if ($('#analytics').is(':checked')) {
				localStorage['analytics'] = "true";
			} else {
				localStorage['analytics'] = "false";
			}
			window.location.replace('index.html');
		} else {
			toast('Enter a valid location!', 3000, 'rounded');
		}
	});
	
});

// Weather

$(document).ready(function() {

	$.simpleWeather({
	location: localStorage['weather'],
	woeid: '',
	unit: localStorage['unit'],
	success: function(weather) {
		now = '<div class="card"><div class="card-content"><span class="card-title">' + weather.city + ', ' + weather.region + '</span><table><tr><th class="weather-icon"><img src="img/' + weather.code + '.png" /></th><th class="weather-info"><h3>' + weather.temp + '&deg;' + weather.units.temp + '</h3><p>' + weather.high + '&deg;' + weather.units.temp + ' / ' + weather.low + '&deg;' + weather.units.temp + '</p></th></tr></table></div></div><div class="card"><div class="card-content"><span class="card-title">Winds</span><p><b>Wind chill:</b> ' + weather.wind.chill + '&deg;' + weather.units.temp + '<p><b>Speed:</b> ' + weather.wind.speed + ' ' + weather.units.speed + ' ' + weather.wind.direction + '</div></div><div class="card"><div class="card-content"><span class="card-title">Daylight</span><p><b>Sunrise:</b> ' + weather.sunrise + '</p><p><b>Sunset:</b> ' + weather.sunset + '</p><p><b>Visibility:</b> ' + weather.visibility + ' ' + weather.units.distance + '</p></div></div><div class="card"><div class="card-content"><div class="row"><button type="submit" name="action" class="btn-flat col s12 m6" id="share-twitter">Share on Twitter<i class="mdi-content-send right"></i></button><button type="submit" name="action" class="btn-flat col s12 m6" id="share-tumblr">Share on Tumblr<i class="mdi-content-send right"></i></button></div></div></div><div class="card"><div class="card-content">Weather info last updated ' + weather.updated + ' from Yahoo Weather.</div></div>';
		$("#current").append(now);

		forecast = '<div id="forecast-container"><div class="card forecast1"><div class="card-content"><span class="card-title">Forecast on ' + weather.forecast[0].day + '</span><table><tr><th class="forecast-icon"><img src="img/' + weather.forecast[0].code + '.png" /></th><th class="forecast-info"><p><b>High:</b> ' + weather.forecast[0].high + '&deg;' + weather.units.temp + '</p><b>Low:</b> ' + weather.forecast[0].low + '&deg;' + weather.units.temp + '</p><p>' + weather.forecast[0].text + '</p></th></tr></table></div></div><div class="card forecast2"><div class="card-content"><span class="card-title">Forecast on ' + weather.forecast[1].day + '</span><table><tr><th class="forecast-icon"><img src="img/' + weather.forecast[1].code + '.png" /></th><th class="forecast-info"><p><b>High:</b> ' + weather.forecast[1].high + '&deg;' + weather.units.temp + '</p><b>Low:</b> ' + weather.forecast[1].low + '&deg;' + weather.units.temp + '</p><p>' + weather.forecast[1].text + '</p></th></tr></table></div></div><div class="card forecast3"><div class="card-content"><span class="card-title">Forecast on ' + weather.forecast[2].day + '</span><table><tr><th class="forecast-icon"><img src="img/' + weather.forecast[2].code + '.png" /></th><th class="forecast-info"><p><b>High:</b> ' + weather.forecast[2].high + '&deg;' + weather.units.temp + '</p><b>Low:</b> ' + weather.forecast[2].low + '&deg;' + weather.units.temp + '</p><p>' + weather.forecast[2].text + '</p></th></tr></table></div></div><div class="card forecast4"><div class="card-content"><span class="card-title">Forecast on ' + weather.forecast[3].day + '</span><table><tr><th class="forecast-icon"><img src="img/' + weather.forecast[3].code + '.png" /></th><th class="forecast-info"><p><b>High:</b> ' + weather.forecast[3].high + '&deg;' + weather.units.temp + '</p><b>Low:</b> ' + weather.forecast[3].low + '&deg;' + weather.units.temp + '</p><p>' + weather.forecast[3].text + '</p></th></tr></table></div></div><div class="card forecast5"><div class="card-content"><span class="card-title">Forecast on ' + weather.forecast[4].day + '</span><table><tr><th class="forecast-icon"><img src="img/' + weather.forecast[4].code + '.png" /><th class="forecast-info"><p><b>High:</b> ' + weather.forecast[4].high + '&deg;' + weather.units.temp + '</p><b>Low:</b> ' + weather.forecast[4].low + '&deg;' + weather.units.temp + '</p><p>' + weather.forecast[4].text + '</p></th></tr></table></div></div></div>';
		$("#forecast").append(forecast);
		
		localStorage['region'] = weather.region;
		
		var socialmessage = "It's currently " + weather.temp + "°" + weather.units.temp + " and " + weather.currently + " in " + weather.city + " right now!";
		
		$('#share-twitter').click(function() {
			window.open("https://twitter.com/intent/tweet?via=NimbusWeather&text=" + encodeURIComponent(socialmessage), "Twitter", "width=500,height=300,scrollbars=0");
		});

		$('#share-tumblr').click(function() {
			window.open("https://www.tumblr.com/share?s=&v=3&t=" + encodeURIComponent(socialmessage), "Tumblr", "width=500,height=300,scrollbars=0");
		});

	},
	error: function(error) {
		$("#current").append('<div class="card"><div class="card-content"><span class="card-title">Error</span><p>There was an error loading the weather.</p></div></div>');
	}
	});

});

// Map

$(window).load(function() {

	if ( (localStorage.getItem("region") === "DC") || (localStorage.getItem("region") === "AL") || (localStorage.getItem("region") === "AK") || (localStorage.getItem("region") === "AZ") || (localStorage.getItem("region") === "AR") || (localStorage.getItem("region") === "CA") || (localStorage.getItem("region") === "CO") || (localStorage.getItem("region") === "CT") || (localStorage.getItem("region") === "DE") || (localStorage.getItem("region") === "FL") || (localStorage.getItem("region") === "GA") || (localStorage.getItem("region") === "HI") || (localStorage.getItem("region") === "ID") || (localStorage.getItem("region") === "IL") || (localStorage.getItem("region") === "IN") || (localStorage.getItem("region") === "IA") || (localStorage.getItem("region") === "KS") || (localStorage.getItem("region") === "KY") || (localStorage.getItem("region") === "LA") || (localStorage.getItem("region") === "ME") || (localStorage.getItem("region") === "MD") || (localStorage.getItem("region") === "MA") || (localStorage.getItem("region") === "MI") || (localStorage.getItem("region") === "MN") || (localStorage.getItem("region") === "MS") || (localStorage.getItem("region") === "MO") || (localStorage.getItem("region") === "MT") || (localStorage.getItem("region") === "NE") || (localStorage.getItem("region") === "NV") || (localStorage.getItem("region") === "NH") || (localStorage.getItem("region") === "NJ") || (localStorage.getItem("region") === "NM") || (localStorage.getItem("region") === "NY") || (localStorage.getItem("region") === "NC") || (localStorage.getItem("region") === "ND") || (localStorage.getItem("region") === "OH") || (localStorage.getItem("region") === "OK") ||  (localStorage.getItem("region") === "OR") || (localStorage.getItem("region") === "PA") || (localStorage.getItem("region") === "RI") || (localStorage.getItem("region") === "SC") || (localStorage.getItem("region") === "SD") || (localStorage.getItem("region") === "TN") || (localStorage.getItem("region") === "TX") || (localStorage.getItem("region") === "UT") || (localStorage.getItem("region") === "VT") || (localStorage.getItem("region") === "VA") || (localStorage.getItem("region") === "WA") || (localStorage.getItem("region") === "WV") || (localStorage.getItem("region") === "WI") || (localStorage.getItem("region") === "WY") ) {
		if (localStorage.getItem("radar-location") != "") {
  		var loaded = "false";
  
  		var width = ($("#map").width() * localStorage["radar-quality"]);
  		var height = ($("#map").height() * localStorage["radar-quality"]);
  		var radarmap = "http://www.tephigram.weather.net/cgi-bin/razradar.cgi?zipcode=" + localStorage["radar-location"];
  		$("#map").css("background", "url(" + radarmap + "&width=" + width + "&height=" + height + ") #000000 bottom center no-repeat");
  
  		$('.forecast-trigger').click(function() {
  			$('#share-trigger').hide();
  			$('#settings-trigger').show();
  		});
  
  		$('.current-trigger').click(function() {
  			$('#share-trigger').hide();
  			$('#settings-trigger').show();
  		});
  
  		$('.map-trigger').click(function() {
  			$('#settings-trigger').hide();
  			$('#share-trigger').show();
  		});
  
  		$('#share-trigger').click(function() {
  			$('#share').openModal();
  			if (loaded === "false") {
  				$.ajax({ 
  					url: 'https://api.imgur.com/3/image',
  					headers: {
  						'Authorization': 'Client-ID bb3c3cd294bba78'
  					},
  					type: 'POST',
  					data: {
  						'image': radarmap + '&width=480&height=360'
  					},
  					dataType: 'json',
  					success: function(response) {
  						if(response.success) {
  							$('.share-content').html('<p>This is a direct image link to the current radar map.</p><div class="row"><div class="input-field col s12"><i class="mdi-content-link prefix"></i><input id="share-url" type="text" value="' + response.data.link + '"></div></div>');
  							$('.share-footer').append('<a href="' + response.data.link + '" target="_blank" class="waves-effect btn-flat">Open Image</a>');
  							$("#share-url").select();
  							loaded = "true";
  						}
  					},
  					error: function(xhr, status, error) {
  						$('.share-content').html('<p><b>Imgur error:</b></p><p>' + xhr.responseText + '</p>');
  					}
  				});
  			}
  			$("#share-url").select();
  		});
  	} else {
  	  $('#map').html('<div class="card"><div class="card-content"><span class="card-title">Map not configured</span><p>Due to an API limitation, you need to configure the location for the radar map seperately. Go to the settings and set a radar location.</p></div></div>');
  	}

	} else {
		$('#map').html('<div class="card"><div class="card-content"><span class="card-title">Map unavailable</span><p>Due to an API limitation, radar maps are not available for locations outside the United States. This is being worked on, and may be available in a future update.</p></div></div>');
	}

});

// Display everything

$(window).load(function(){
	$('.preloader-wrapper').fadeOut( "slow", function() {});
	$('#current').fadeIn( "slow", function() {});
	$('#settings-trigger').fadeIn( "slow", function() {});
	$('#colorpicker').farbtastic('#color');
});