// Initialize everything

$(document).ready(function(){

	$('ul.tabs').tabs();
	$('#current').hide();
	$('.mapcontrol').hide();
	$('.mapshare').hide();
	$('.map-preloader').show();
	$('select').material_select();

	if (localStorage.getItem("weather") === null) {
		// Never opened before
		localStorage['weather'] = '10001';
		localStorage['nimbus'] = '2.2';
		$('#welcome').openModal();
	} else if (localStorage.getItem("nimbus") != "2.2") {
		//localStorage['nimbus'] = '2.2';
		$('#new').openModal();
	}

	if (localStorage.getItem("unit") === null) {
		localStorage['unit'] = 'f';
	}

	if (localStorage.getItem("radar-location") === null) {
		localStorage['radar-location'] = '';
	}

	if (localStorage.getItem("radar-player") === null) {
		localStorage['radar-player'] = 'true';
	}

	if (localStorage.getItem("color") === null) {
		localStorage['color'] = '#3ca2eb';
	} else if (localStorage.getItem("color") === "#13A38D") {
		// Change old default color to new default color
		localStorage['color'] = '#3ca2eb';
	}

	if (localStorage.getItem("bg") === null) {
		localStorage['bg'] = '';
	}

	// Test HTML5 radar map support

	function supportType(type) {
		var video = document.createElement('video');
		if (video.canPlayType(type)) {
			return true;
		} else {
			return false;
		}
	}

	// Fixes for Firefox OS

	if (($.browser.mozilla) && ($.browser.version < "32.0") && (navigator.userAgent.indexOf("Mobile") > -1)) {
		alert("You are running an older version of Firefox OS.\n\nNimbus may work, but it is designed for Firefox OS 2.0 and higher. Please update your device if possible.\n\nThis warning will not be shown again.");
		localStorage["oldalert"] = "completed";
	}

	// Read values of settings from localStorage

	$("#location").val(localStorage['weather']);
	$("#unit").val(localStorage['unit']);
	$("#radar-location").val(localStorage['radar-location']);
	if (!(supportType('video/webm') || supportType('video/mp4')) || (($.browser.mozilla) && (navigator.userAgent.indexOf("Mobile") > -1))) {
		localStorage['radar-player'] = 'false';
		$("#radar-player").prop('disabled', true);
		$('#radar-player').parent().parent().click(function() {
			$('#html5modal').openModal();
		});
	} else {
		if (localStorage.getItem("radar-player") === "true") {
			$("#radar-player").prop('checked', true);
		} else {
			$("#radar-player").prop('checked', false);
		}
	}
	$("#color").val(localStorage['color']);
	$("#bg").val(localStorage['bg']);

	// Google Analytics

	(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
	  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
	  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
	  })(window,document,'script','http://www.google-analytics.com/analytics.js','ga');

	  ga('create', 'UA-59452245-1', 'auto');
	  ga('send', 'pageview');

	// Set background image

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

	// Set buttons color

	$(".settings-save").css("background", localStorage['color'], 'important');
	$(".mapcontrol").css("background", localStorage['color'], 'important');
	$(".mapshare").css("background", localStorage['color'], 'important');
	$(".btn").css("background", localStorage['color'], 'important');
	$(".btn").css("background", localStorage['color'], 'important');

	// Set spinning wheel color

	$(".spinner-layer").css("border-color", localStorage['color'], 'important');

	// Actions on settings button click/tap

	$(document).on('click', ".settings-trigger", function() {
		$('#settings').fadeIn( "slow", function() {});
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
	$('.reset-item').click(function() {
		$('#reset-modal').openModal();
	});
	$('.reset-confirm').click(function() {
		localStorage['weather'] = '10001';
		localStorage['unit'] = 'f';
		localStorage['radar-quality'] = '1';
		localStorage['radar-location'] = '';
		localStorage['radar-player'] = 'true';
		localStorage['color'] = '#3ca2eb';
		localStorage['bg'] = '';
		window.location.replace('index.html');
	});
	$('.radar-location-item').click(function() {
		$('#radar-location-modal').openModal();
		$("#radar-location").select();
	});
	$('.hex-item').click(function() {
		$('#hex-modal').openModal();
		$("#color").select();
	});
	$('.picker-item').click(function() {
		$('#picker-modal').openModal();
	});
	$('.color-reset').click(function() {
		document.getElementById("color").value = "#3ca2eb";
		Materialize.toast('Color reset!', 3000, 'rounded');
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

	$('.settings-save').click(function() {
		if (($("#location").val().length > '0') && (($("#radar-location").val().match(/^\d+$/) != null)) || ($("#radar-location").val() === "")) {
			localStorage['weather'] = $("#location").val();
			localStorage['unit'] = $("#unit").val();
			localStorage['radar-location'] = $("#radar-location").val();
			if ($('#radar-player').is(':checked')) {
				localStorage['radar-player'] = "true";
			} else {
				localStorage['radar-player'] = "false";
			}
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

	// Determine correct icon
	// Yahoo Weather API condition codes: https://developer.yahoo.com/weather/documentation.html#codes
	function getIcon(condition) {
		var icon = "";
		if (condition == 0) {
			icon = "wi-tornado";
		} else if (condition == 1 || condition == 45) {
			icon = "wi-storm-showers";
		} else if (condition == 2) {
			icon = "wi-lightning";
		} else if (condition == 3 || condition == 4 || condition == 47) {
			icon = "wi-thunderstorm";
		} else if (condition == 5 || condition == 46) {
			icon = "wi-rain-mix";
		} else if (condition == 6 || condition == 7 || condition == 13 || condition == 14 || condition == 18 || condition == 36) {
			icon = "wi-sleet";
		} else if (condition == 8 || condition == 9 || condition == 10 || condition == 11 || condition == 12) {
			icon = "wi-showers";
		} else if (condition == 15 || condition == 41 || condition == 42 || condition == 43) {
			icon = "wi-snow";
		} else if (condition == 16) {
			icon = "wi-snow-wind";
		} else if (condition == 17) {
			icon = "wi-hail";
		} else if (condition == 19) {
			icon = "wi-dust";
		} else if (condition == 20) {
			icon = "wi-fog";
		} else if (condition == 21) {
			icon = "wi-day-haze";
		} else if (condition == 22) {
			icon = "wi-smoke";
		} else if (condition == 23 || condition == 24) {
			icon = "wi-windy";
		} else if (condition == 25) {
			icon = "wi-snowflake-cold";
		} else if (condition == 26) {
			icon = "wi-cloud";
		} else if (condition == 27 || condition == 29) {
			icon = "wi-night-cloudy";
		} else if (condition == 28 || condition == 30) {
			icon = "wi-day-cloudy";
		} else if (condition == 31 || condition == 33 || condition == 44) {
			icon = "wi-stars";
		} else if (condition == 32 || condition == 34) {
			icon = "wi-day-sunny";
		} else if (condition == 36) {
			icon = "wi-hot";
		} else if (condition == 37 || condition == 38 || condition == 39) {
			icon = "wi-thunderstorm";
		} else if (condition == 40) {
			icon = "wi-showers";
		} else if (condition == 3200) {
			icon = "wi-alien";
		}
		return icon;
	}

	// Weather

	var country = "";

	$.simpleWeather({
	location: localStorage['weather'],
	woeid: '',
	unit: localStorage['unit'],
	success: function(weather) {

		// Fill content
		current = '<div class="card"><div class="card-content"><span class="card-title">' + weather.city + ', ' + weather.region + '</span><table><tr><th class="weather-icon"><i class="wi ' + getIcon(weather.code) + '"></i></th><th class="weather-info"><span class="temp">' + weather.temp + '&deg;' + weather.units.temp + '</span><br />' + weather.high + '&deg;' + weather.units.temp + ' / ' + weather.low + '&deg;' + weather.units.temp + '</th></tr></table><div class="weather-updated">Last updated ' + weather.updated + '</div></div></div><div class="card"><div class="card-content"><span class="card-title">Winds</span><p><b>Wind chill:</b> ' + weather.wind.chill + '&deg;' + weather.units.temp + '<p><b>Speed:</b> ' + weather.wind.speed + ' ' + weather.units.speed + ' ' + weather.wind.direction + '</div></div><div class="card"><div class="card-content"><span class="card-title">Daylight</span><p><b>Sunrise:</b> ' + weather.sunrise + '</p><p><b>Sunset:</b> ' + weather.sunset + '</p><p><b>Visibility:</b> ' + weather.visibility + ' ' + weather.units.distance + '</p></div></div><div class="card"><a class="btn-flat btn-large waves-effect share-twitter" href="#">Share on Twitter<i class="mdi-content-send right"></i></a></div><div class="card"><a class="btn-flat btn-large waves-effect settings-trigger" href="#">Open Settings</a></div>';
		$("#current").append(current);
		forecast = '<div id="forecast-container"><div class="card forecast1"><div class="card-content"><span class="card-title">Forecast on ' + weather.forecast[0].day + '</span><table><tr><th class="forecast-icon"><i class="wi ' + getIcon(weather.forecast[0].code) + '"></i></th><th class="forecast-info"><span class="temp">' + weather.forecast[0].high + '&deg;' + weather.units.temp + ' / ' + weather.forecast[0].low + '&deg;' + weather.units.temp + '</span><br />' + weather.forecast[0].text + '</th></tr></table></div></div><div class="card forecast2"><div class="card-content"><span class="card-title">Forecast on ' + weather.forecast[1].day + '</span><table><tr><th class="forecast-icon"><i class="wi ' + getIcon(weather.forecast[1].code) + '"></i></th><th class="forecast-info"><span class="temp">' + weather.forecast[1].high + '&deg;' + weather.units.temp + ' / ' + weather.forecast[1].low + '&deg;' + weather.units.temp + '</span><br />' + weather.forecast[1].text + '</th></tr></table></div></div><div class="card forecast3"><div class="card-content"><span class="card-title">Forecast on ' + weather.forecast[2].day + '</span><table><tr><th class="forecast-icon"><i class="wi ' + getIcon(weather.forecast[2].code) + '"></i></th><th class="forecast-info"><span class="temp">' + weather.forecast[2].high + '&deg;' + weather.units.temp + ' / ' + weather.forecast[2].low + '&deg;' + weather.units.temp + '</span><br />' + weather.forecast[2].text + '</th></tr></table></div></div><div class="card forecast4"><div class="card-content"><span class="card-title">Forecast on ' + weather.forecast[3].day + '</span><table><tr><th class="forecast-icon"><i class="wi ' + getIcon(weather.forecast[3].code) + '"></i></th><th class="forecast-info"><span class="temp">' + weather.forecast[3].high + '&deg;' + weather.units.temp + ' / ' + weather.forecast[3].low + '&deg;' + weather.units.temp + '</span><br />' + weather.forecast[3].text + '</th></tr></table></div></div><div class="card forecast5"><div class="card-content"><span class="card-title">Forecast on ' + weather.forecast[4].day + '</span><table><tr><th class="forecast-icon"><i class="wi ' + getIcon(weather.forecast[4].code) + '"></i></th><th class="forecast-info"><span class="temp">' + weather.forecast[4].high + '&deg;' + weather.units.temp + ' / ' + weather.forecast[4].low + '&deg;' + weather.units.temp + '</span><br />' + weather.forecast[4].text + '</th></tr></table></div></div></div>';
		$("#forecast").append(forecast);

		// Share button
		var socialmessage = "It's currently " + weather.temp + "°" + weather.units.temp + " and " + weather.currently + " in " + weather.city + " right now!";
		$('.share-twitter').click(function() {
			window.open("https://twitter.com/intent/tweet?via=NimbusWeather&text=" + encodeURIComponent(socialmessage), "Twitter", "width=500,height=300,scrollbars=0");
		});

		// Radar Map

		if (weather.country === 'United States') {
			if (localStorage.getItem('radar-location') !== '') {
				var radarmap = 'http://www.adiabatic.weather.net/cgi-bin/razradar.cgi?zipcode=' + localStorage["radar-location"];
				if ((localStorage.getItem("radar-player") === "true") && (supportType('video/webm') || supportType('video/mp4'))) {
					$('.forecast-trigger').click(function() { $('.mapcontrol').hide(); $('.mapshare').hide(); });
					$('.current-trigger').click(function() { $('.mapcontrol').hide(); $('.mapshare').hide(); });
					$('.map-trigger').click(function() { $('.mapcontrol').show(); $('.mapshare').show(); });
					// Generate string of date/time and add it to URL to avoid Gfy caching
					var currentdate = new Date();
					// Generate Gyfcat URL
					var gfycat = "http://upload.gfycat.com/transcode?fetchUrl=" + encodeURIComponent(radarmap + "&width=" + $("#map").width() + "&height=" + $("#map").height() + ".gif" + "&time=" + currentdate.getMonth() + currentdate.getDate() + currentdate.getFullYear() + currentdate.getHours());
					$('#map').prepend('<div class="toast map-toast">Requesting map...</div>');
					$.getJSON(gfycat, function(data) {
						if (data.error != null) {
							$('.map-toast').fadeOut("slow", function() {});
							$('.map-preloader').fadeOut("slow", function() {});
							if (data.error === "Unable to encode gif") {
								$('#map').append('<div class="card"><div class="card-content"><span class="card-title">Freese-Notis Error</span><p>There was an error trying to load the weather map from Freese-Notis Weather. There is nothing Nimbus can do until they fix their API.</p></div></div><div class="card"><div class="card-image"><img src="http://sirocco.accuweather.com/sat_mosaic_640x480_public/ei/iseun.gif"></div><div class="card-content"><p>Current national radar from AccuWeather.</p></div></div>');
							} else {
								$('#map').append('<div class="card"><div class="card-content"><span class="card-title">Gfycat API Error</span><p>Gfycat was unable to load the radar map, and reported this error:</p><p class="error">' + data.error + '</p><p>You can try reopening Nimbus, or switching "New radar player" to off in the settings.</div></div><div class="card"><a class="btn-flat btn-large waves-effect settings-trigger" href="#">Open Settings</a></div>');
							}
							$('.mapcontrol').fadeOut("slow", function() {
								$('.mapcontrol').remove();
							});
							$('.mapshare').fadeOut("slow", function() {
								$('.mapshare').remove();
							});
						} else {
							$('.map-toast').html('Downloading map...');
							$('#map').append('<video id="mapvideo" autoplay muted loop webkit-playsinline><source src="http://zippy.gfycat.com/' + data.gfyName + '.webm" type="video/webm"><source src="http://zippy.gfycat.com/' + data.gfyName + '.mp4" type="video/mp4"></video>');
							var mapvideo = document.getElementById("mapvideo");
							$('#mapvideo').hide();
							$('#mapvideo').on('loadedmetadata', function() {
								$('.map-toast').html('Map loaded!');
								$('.map-toast').fadeOut("slow", function() {});
								$('.map-preloader').fadeOut("slow", function() {});
								$('#mapvideo').show();
								$('.mapcontrol').html('<i class="mdi-av-play-arrow"></i>');
								$('.mapshare').click(function() {
									$('#share-modal').openModal();
								});
								$("#share-modal").html('<div class="collection"><a href="#" class="collection-item share-map-gfycat">Open on Gfycat</a><a href="#" class="collection-item share-map-twitter">Share on Twitter</a><a href="#" class="collection-item share-map-googleplus">Share on Google+</a><a href="#" class="collection-item share-map-facebook">Share on Facebook</a><a href="#" class="collection-item share-map-evernote">Save to Evernote</a></div><div class="modal-footer"><a class="waves-effect btn-flat modal-close">Close</a></div>');
								$('.share-map-gfycat').click(function() {
									window.open("http://gfycat.com/" + data.gfyName, "_blank");
								});
								$('.share-map-twitter').click(function() {
									window.open("https://twitter.com/intent/tweet?via=NimbusWeather&text=http://zippy.gfycat.com/" + data.gfyName + ".gif", "Twitter", "width=500,height=300,scrollbars=0");
								});
								$('.share-map-googleplus').click(function() {
									window.open("https://plus.google.com/share?url=http://zippy.gfycat.com/" + data.gfyName + ".gif", "Google+", "width=600,height=400,scrollbars=0");
								});
								$('.share-map-facebook').click(function() {
									window.open("http://www.facebook.com/sharer.php?u=http://zippy.gfycat.com/" + data.gfyName + ".gif", "Facebook", "width=600,height=400,scrollbars=0");
								});
								$('.share-map-evernote').click(function() {
									window.open("http://www.evernote.com/clip.action?url=http://zippy.gfycat.com/" + data.gfyName + ".gif", "Evernote", "width=600,height=400,scrollbars=0");
								});
								$(".collection-item").css("color", localStorage['color'], 'important');
								mapvideo.play(); // Attempt to auto-play video, doesn't work on some mobile browsers
								if (mapvideo.paused) {
									$(".mapcontrol").html('<i class="mdi-av-play-arrow"></i>');
								} else {
									$(".mapcontrol").html('<i class="mdi-av-pause"></i>');
								}
								$('.mapcontrol').click(function() {
									if (mapvideo.paused) {
										$(".mapcontrol").children().addClass('mdi-av-pause').removeClass('mdi-av-play-arrow');
										mapvideo.play();
									} else {
										$(".mapcontrol").children().addClass('mdi-av-play-arrow').removeClass('mdi-av-pause');
										mapvideo.pause();
									}
								});
							});
						}
					});
				} else {
					$('.forecast-trigger').click(function() { $('.mapshare').hide(); });
					$('.current-trigger').click(function() { $('.mapshare').hide(); });
					$('.map-trigger').click(function() { $('.mapshare').show(); });
					$('.mapshare').css('bottom', '16px');
					var radargif = radarmap + "&width=" + $("#map").width() + "&height=" + $("#map").height();
					$(window).load(function(){
						$('#map').append('<img id="mapgif" src="' + radargif + '" \>');
						$('#mapgif').hide();
						$('#map').prepend('<div class="toast map-toast">Loading GIF...</div>');
						$('#mapgif').load(function(){
							$('.map-toast').html('Map loaded!');
							$('#mapgif').fadeIn("slow", function() {
								$('.map-preloader').fadeOut("slow", function() {});
								$('.map-toast').fadeOut("slow", function() {});
							});
						});
					});
					$('.mapshare').click(function() {
						$('#share-modal').openModal();
					});
					var sharedradargif = radarmap + "&width=500&height=500";
					$("#share-modal").html('<div class="collection"><a href="#" class="collection-item share-map-gfycat">Open on Gfycat</a><a href="#" class="collection-item share-map-twitter">Share on Twitter</a><a href="#" class="collection-item share-map-googleplus">Share on Google+</a><a href="#" class="collection-item share-map-facebook">Share on Facebook</a><a href="#" class="collection-item share-map-evernote">Save to Evernote</a></div><div class="modal-footer"><a class="waves-effect btn-flat modal-close">Close</a></div>');
					$('.share-map-gfycat').click(function() {
						// Generate string of date/time and add it to URL to avoid Gfy caching
						var currentdate = new Date();
						window.open("http://gfycat.com/fetch/" + encodeURIComponent(sharedradargif + ".gif" + "&time=" + currentdate.getMonth() + currentdate.getDate() + currentdate.getFullYear() + currentdate.getHours()), "_blank");
					});
					$('.share-map-twitter').click(function() {
						window.open("https://twitter.com/intent/tweet?via=NimbusWeather&text=" + sharedradargif, "Twitter", "width=500,height=300,scrollbars=0");
					});
					$('.share-map-googleplus').click(function() {
						window.open("https://plus.google.com/share?url=" + sharedradargif, "Google+", "width=600,height=400,scrollbars=0");
					});
					$('.share-map-facebook').click(function() {
						window.open("http://www.facebook.com/sharer.php?u=" + sharedradargif, "Facebook", "width=600,height=400,scrollbars=0");
					});
					$('.share-map-evernote').click(function() {
						window.open("http://www.evernote.com/clip.action?url=" + sharedradargif, "Evernote", "width=600,height=400,scrollbars=0");
					});
					$(".collection-item").css("color", localStorage['color'], 'important');
				}

			} else {
				$('#map').html('<div class="card"><div class="card-content"><span class="card-title">Map not configured</span><p>Due to an API limitation, you need to configure the location for the radar map seperately. Go to the settings and set a radar location.</p></div></div><div class="card"><a class="btn-flat btn-large waves-effect settings-trigger" href="#">Open Settings</a></div>');
			}
		} else {
			$('#map').html('<div class="card"><div class="card-content"><span class="card-title">Map unavailable</span><p>Due to an API limitation, radar maps are not available for locations outside the United States. This is being worked on, and may be available in a future update.</p></div></div>');
		}

	},
	error: function(error) {
		$("#current").html('<div class="card"><div class="card-content"><span class="card-title">Error</span><p>There was an error loading the weather.</p></div><div class="card-action"><a href="javascript:window.location.replace(' + index + ');">Try again</a></div></div><div class="card"><a class="btn-flat btn-large waves-effect settings-trigger" href="#">Open Settings</a></div>');
		$("#forecast").html('<div class="card"><div class="card-content"><span class="card-title">Error</span><p>There was an error loading the forecast.</p></div><div class="card-action"><a href="javascript:window.location.replace(' + index + ');">Try again</a></div></div><div class="card"><a class="btn-flat btn-large waves-effect settings-trigger" href="#">Open Settings</a></div>');
		$("#map").html('<div class="card"><div class="card-content"><span class="card-title">Error</span><p>There was an error loading the radar map.</p></div><div class="card-action"><a href="javascript:window.location.replace(' + index + ');">Try again</a></div></div><div class="card"><a class="btn-flat btn-large waves-effect settings-trigger" href="#">Open Settings</a></div>');
	}
	});

});

// Display everything

$(window).load(function(){
	$('.nimbus-preloader').fadeOut( "slow", function() {});
	$('#current').fadeIn( "slow", function() {});
	$("#tabs").css("visibility","visible");
	$('#settings-trigger').fadeIn( "slow", function() {});
	$('#colorpicker').farbtastic('#color');
});
