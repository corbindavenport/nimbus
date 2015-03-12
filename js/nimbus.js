// Initialize everything

$(document).ready(function(){

	$('ul.tabs').tabs();
	$('#current').hide();
	$('#settings-trigger').hide();
	$('#save-trigger').hide();

	if (document.addEventListener && window.localStorage) {
    	console.log("Compatible web browser detected.");
	} else {
		$('#warning').openModal();
	}
	
	if (localStorage.getItem("weather") === null) {
		localStorage['weather'] = '10001';
		$('#welcome').openModal();
	}
	if (localStorage.getItem("unit") === null) {
		localStorage['unit'] = 'f';
	}
	if (localStorage.getItem("radar") === null) {
		localStorage['radar'] = '1';
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
	$("#radar").val(localStorage['radar']);
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

	// Set buttons color

	$(".btn").css("background", localStorage['color'], 'important');
	$(".btn").css("background", localStorage['color'], 'important');

	// Actions on settings button click/tap

	$('#settings-trigger').click(function() {
		$('#settings-trigger').fadeOut( "slow", function() {});
		$('#settings').fadeIn( "slow", function() {});
		$('#save-trigger').fadeIn( "slow", function() {});
	});

	// Color picker 

	$('.color-trigger').click(function() {
		$('#colormodal').openModal();
	});

	$('.color-reset').click(function() {
		document.getElementById("color").value = "#13A38D";
		toast('Color reset!', 3000, 'rounded');
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

	// PayPal Donate

	$('.paypal').click(function() {
		$('#paypalmodal').openModal();
	});

	// Bitcoin Donate

	$('.bitcoin').click(function() {
		$('#bitcoinmodal').openModal();
	});

	// Privacy Policy

	$('.privacy').click(function() {
		$('#privacymodal').openModal();
	});

	// Actions on save button click/tap

	$('#save-trigger').click(function() {
		if ($("#location").val().length == '5') {
			localStorage['weather'] = $("#location").val();
			localStorage['unit'] = $("#unit").val();
			localStorage['radar'] = $("#radar").val();
			localStorage['color'] = $("#color").val();
			localStorage['bg'] = $("#bg").val();
			if ($('#analytics').is(':checked')) {
				localStorage['analytics'] = "true";
			} else {
				localStorage['analytics'] = "false";
			}
			window.location.replace('index.html');
		} else {
			toast('Enter a valid ZIP code.', 3000, 'rounded');
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
		now = '<div class="card"><div class="card-content"><span class="card-title">' + weather.city + ', ' + weather.region + '</span><table><tr><th class="weather-icon"><img src="img/' + weather.code + '.png" /></th><th class="weather-info"><h3>' + weather.temp + '&deg;' + weather.units.temp + '</h3><p>' + weather.high + '&deg;' + weather.units.temp + ' / ' + weather.low + '&deg;' + weather.units.temp + '</p></th></tr></table></div></div><div class="card"><div class="card-content"><span class="card-title">Winds</span><p><b>Wind chill:</b> ' + weather.wind.chill + '&deg;' + weather.units.temp + '<p><b>Speed:</b> ' + weather.wind.speed + ' ' + weather.units.speed + ' ' + weather.wind.direction + '</div></div><div class="card"><div class="card-content"><span class="card-title">Daylight</span><p><b>Sunrise:</b> ' + weather.sunrise + '</p><p><b>Sunset:</b> ' + weather.sunset + '</p><p><b>Visibility:</b> ' + weather.visibility + ' ' + weather.units.distance + '</p></div></div><div class="card"><div class="card-content"><p><button type="submit" name="action" class="btn-flat" id="share-twitter">Share on Twitter<i class="mdi-content-send right"></i></button><button type="submit" name="action" class="btn-flat" id="share-tumblr">Share on Tumblr<i class="mdi-content-send right"></i></button></p></div></div><div class="card"><div class="card-content">Weather info last updated ' + weather.updated + ' from Yahoo Weather.</div></div>';
		$("#current").append(now);

		forecast = '<div id="forecast-container"><div class="card forecast1"><div class="card-content"><span class="card-title">Forecast on ' + weather.forecast[0].day + '</span><table><tr><th class="forecast-icon"><img src="img/' + weather.forecast[0].code + '.png" /></th><th class="forecast-info"><p><b>High:</b> ' + weather.forecast[0].high + '&deg;' + weather.units.temp + '</p><b>Low:</b> ' + weather.forecast[0].low + '&deg;' + weather.units.temp + '</p><p>' + weather.forecast[0].text + '</p></th></tr></table></div></div><div class="card forecast2"><div class="card-content"><span class="card-title">Forecast on ' + weather.forecast[1].day + '</span><table><tr><th class="forecast-icon"><img src="img/' + weather.forecast[1].code + '.png" /></th><th class="forecast-info"><p><b>High:</b> ' + weather.forecast[1].high + '&deg;' + weather.units.temp + '</p><b>Low:</b> ' + weather.forecast[1].low + '&deg;' + weather.units.temp + '</p><p>' + weather.forecast[1].text + '</p></th></tr></table></div></div><div class="card forecast3"><div class="card-content"><span class="card-title">Forecast on ' + weather.forecast[2].day + '</span><table><tr><th class="forecast-icon"><img src="img/' + weather.forecast[2].code + '.png" /></th><th class="forecast-info"><p><b>High:</b> ' + weather.forecast[2].high + '&deg;' + weather.units.temp + '</p><b>Low:</b> ' + weather.forecast[2].low + '&deg;' + weather.units.temp + '</p><p>' + weather.forecast[2].text + '</p></th></tr></table></div></div><div class="card forecast4"><div class="card-content"><span class="card-title">Forecast on ' + weather.forecast[3].day + '</span><table><tr><th class="forecast-icon"><img src="img/' + weather.forecast[3].code + '.png" /></th><th class="forecast-info"><p><b>High:</b> ' + weather.forecast[3].high + '&deg;' + weather.units.temp + '</p><b>Low:</b> ' + weather.forecast[3].low + '&deg;' + weather.units.temp + '</p><p>' + weather.forecast[3].text + '</p></th></tr></table></div></div><div class="card forecast5"><div class="card-content"><span class="card-title">Forecast on ' + weather.forecast[4].day + '</span><table><tr><th class="forecast-icon"><img src="img/' + weather.forecast[4].code + '.png" /><th class="forecast-info"><p><b>High:</b> ' + weather.forecast[4].high + '&deg;' + weather.units.temp + '</p><b>Low:</b> ' + weather.forecast[4].low + '&deg;' + weather.units.temp + '</p><p>' + weather.forecast[4].text + '</p></th></tr></table></div></div></div>';
		$("#forecast").append(forecast);
		
		var state = weather.region;
		
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
	var width = ($("#map").width() * localStorage["radar"]);
	var radarmap = "url(http://www.tephigram.weather.net/cgi-bin/razradar.cgi?zipcode=" + localStorage["weather"] + "&width=" + width + "&height=" + $("#map").height() + ") #000000 center no-repeat"
	$("#map").css("background", radarmap);
});

// Display everything

$(window).load(function(){
	$('.preloader-wrapper').fadeOut( "slow", function() {});
	$('#current').fadeIn( "slow", function() {});
	$('#settings-trigger').fadeIn( "slow", function() {});
	$('#colorpicker').farbtastic('#color');
});