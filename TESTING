/*
Copyright Â© 2016 Benjamin Paul. All rights reserved.
*/

MOVIELOADED = false;
$.ajax({
    url: "https://dl.dropboxusercontent.com/s/59hwhdcu5ljz6hr/Movie.js",
    dataType: "script",
    success: function () {
	    if (MOVLIST) {
		    appendMovieList();
	    }
	    MOVIELOADED = true;
    }
});

TVLOADED = false;
$.ajax({
    url: "https://dl.dropboxusercontent.com/s/9if59in6evvu7mk/TV.js",
    dataType: "script",
    success: function () {
	    if (TVLIST) {
		    appendTVList();
	    }
	    TVLOADED = true;
    }
});


var PLAYLIST = getOrDefault(CHANNEL.name + "_playlist", true);
var SEARCHBUTTONS = getOrDefault(CHANNEL.name + "_searchbuttons", true);
var LISTBUTTONS = getOrDefault(CHANNEL.name + "_listbuttons", true);




function setPanelProperties(div) {
	bgcolor = $("body").css('background-color');
	color = $("body").css('color');
	height = $("#userlist").height();
	width = $("#userlist").width();
	$(div).css({
		'background-color': bgcolor,
		'color': color,
		'height': height + 'px',
		'width': width + 'px'
	});
}


months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

omdbkey = '383a5b5a';

function videoInfo(type, id, title) {
	if (type === 'yt') {
		ytid = $('.queue_active > .qe_title').attr('href').split('https://youtube.com/watch?v=')[1];
		$("#posterimage").hide().attr('src', '').off("click.poster");
		$("#gddir, #gdwri, #gdact").html('');
		$("#movietitle, #gdratings").hide().text('');
		$("#gdbottom").hide().find('*').text('');
		$("#ytinfo").show();
		$.ajax({
			url: 'https://www.googleapis.com/youtube/v3/videos?part=recordingDetails%2Csnippet%2Cstatistics&id=' + id + '&fields=etag%2CeventId%2Citems%2Ckind%2CpageInfo%2CvisitorId&key=AIzaSyBdq_JqnXoUno61qBDALehbcCCsoud1s4w',
			type: 'GET',
			data: {},
			dataType: 'json',
			success: function(data) {
				console.log(data);
				snippet = data.items[0].snippet;
				$("#vidsearching").text('').hide();
			},
			error: function(data) {
				console.log(data);
				$("#vidsearching").text('Error: ' + data.statusText);
			},
			complete: function(data) {
				if (ytid === PLAYER.mediaId) {
					pubdate = snippet.publishedAt.split('-');
					snipchanid = snippet.channelId;
					$("#channeltitle").html('<a href="https://www.youtube.com/channel/' + snipchanid + '" target="_blank">' + snippet.channelTitle + '</a>');
					$("#publishedat").text('Published on ' + months[parseInt(pubdate[1]) - 1] + ' ' + pubdate[2].split('T')[0] + ', ' + pubdate[0]);
					snipdescript = snippet.description;
					snipdescriptlen = snipdescript.length;
					if (snipdescriptlen > 200) {
						DSHOW = false;
						$("#description").html('<span>' + snipdescript.substring(0,200) + '</span><span id="ellipshow">...</span><span id="secondspan" style="display:none;">' + snipdescript.substring(200,snipdescriptlen) + '</span><p id="showmore" style="text-align:center;"><a style="cursor:pointer;">Show More</a></p>');
						$("#showmore > a").click(function() {
							if (!DSHOW) {
								DSHOW = true;
								$("#ellipshow").hide();
								$("#secondspan").show();
								$("#showmore > a").text('Show Less');
							} else {
								DSHOW = false;
								$("#ellipshow").show();
								$("#secondspan").hide();
								$("#showmore > a").text('Show More');
							}
						});
					} else {
						$("#description").html('<p>' + snipdescript + '</p>');
					}
					$.ajax({
						url: 'https://www.googleapis.com/youtube/v3/channels?part=snippet&id=' + snipchanid + '&fields=items%2Fsnippet%2Fthumbnails&key=AIzaSyBdq_JqnXoUno61qBDALehbcCCsoud1s4w',
						type: 'GET',
						data: {},
						dataType: 'json',
						success: function(data) {
							console.log(data);
							chanthumbnail = data.items[0].snippet.thumbnails.default.url;
						},
						error: function(data) {
							console.log(data);
						},
						complete: function(data) {
							$("#channeltitle").html('<a href="https://www.youtube.com/channel/' + snipchanid + '" target="_blank"><img style="max-height:50px;max-width:50px;" src="' + chanthumbnail + '"></img></a> ' + $("#channeltitle").html());
						}
					});
				}
			}
		});
		$.ajax({
			url: 'https://www.googleapis.com/youtube/v3/search?part=snippet&relatedToVideoId=' + id + '&type=video&key=AIzaSyBdq_JqnXoUno61qBDALehbcCCsoud1s4w',
			type: 'GET',
			data: {},
			dataType: 'json',
			success: function(data) {
				console.log(data);
				relarray = data.items;
			},
			error: function(data) {
				console.log(data);
			},
			complete: function(data) {
				if (ytid === PLAYER.mediaId) {
					$("#relatedtext").text('Related Videos');
					$("#related").find('th').css('text-align', 'center');
					firstvid = relarray[0];
					firstvid !== undefined ? firstvidsnip = firstvid.snippet : '';
					secondvid = relarray[1];
					secondvid !== undefined ? secondvidsnip = secondvid.snippet : '';
					thirdvid = relarray[2];
					thirdvid !== undefined ? thirdvidsnip = thirdvid.snippet : '';
					fourthvid = relarray[3];
					fourthvid !== undefined ? fourthvidsnip = fourthvid.snippet : '';
					fifthvid = relarray[4];
					fifthvid !== undefined ? fifthvidsnip = fifthvid.snippet : '';
					relatedchil = $("#related").children().eq(0).children();
					titlerowchil = relatedchil.eq(0).children();
					firstvid !== undefined ? titlerowchil.eq(0).html('<p style="font-size:13px;color:#c8c8c8;font-weight:normal;">' + firstvidsnip.title + '</p>') : '';
					secondvid !== undefined ? titlerowchil.eq(1).html('<p style="font-size:13px;color:#c8c8c8;font-weight:normal;">' + secondvidsnip.title + '</p>') : '';
					thirdvid !== undefined ? titlerowchil.eq(2).html('<p style="font-size:13px;color:#c8c8c8;font-weight:normal;">' + thirdvidsnip.title + '</p>') : '';
					fourthvid !== undefined ? titlerowchil.eq(3).html('<p style="font-size:13px;color:#c8c8c8;font-weight:normal;">' + fourthvidsnip.title + '</p>') : '';
					fifthvid !== undefined ? titlerowchil.eq(4).html('<p style="font-size:13px;color:#c8c8c8;font-weight:normal;">' + fifthvidsnip.title + '</p>') : '';
					firstvid !== undefined ? firstviddesc = firstvidsnip.description : '';
					secondvid !== undefined ? secondviddesc = secondvidsnip.description : '';
					thirdvid !== undefined ? thirdviddesc = thirdvidsnip.description : '';
					fourthvid !== undefined ? fourthviddesc = fourthvidsnip.description : '';
					fifthvid !== undefined ? fifthviddesc = fifthvidsnip.description : '';
					firstvid !== undefined ? firstviddesc.length > 75 ? firstvidtitle = firstviddesc.substring(0,72) + '...' : firstvidtitle = firstviddesc : '';
					secondvid !== undefined ? secondviddesc.length > 75 ? secondvidtitle = secondviddesc.substring(0,72) + '...' : secondvidtitle = secondviddesc : '';
					thirdvid !== undefined ? thirdviddesc.length > 75 ? thirdvidtitle = thirdviddesc.substring(0,72) + '...' : thirdvidtitle = thirdviddesc : '';
					fourthvid !== undefined ? fourthviddesc.length > 75 ? fourthvidtitle = fourthviddesc.substring(0,72) + '...' : fourthvidtitle = fourthviddesc : '';
					fifthvid !== undefined ? fifthviddesc.length > 75 ? fifthvidtitle = fifthviddesc.substring(0,72) + '...' : fifthvidtitle = fifthviddesc : '';
					imagerowchil = relatedchil.eq(1).children();
					firstvid !== undefined ? imagerowchil.eq(0).html('<a href="https://youtu.be/' + firstvid.id.videoId + '" target="_blank"><img src="' + firstvidsnip.thumbnails.default.url + '" title="' + firstvidtitle + '"></img></a>') : '';
					secondvid !== undefined ? imagerowchil.eq(1).html('<a href="https://youtu.be/' + secondvid.id.videoId + '" target="_blank"><img src="' + secondvidsnip.thumbnails.default.url + '" title="' + secondvidtitle + '"></img></a>') : '';
					thirdvid !== undefined ? imagerowchil.eq(2).html('<a href="https://youtu.be/' + thirdvid.id.videoId + '" target="_blank"><img src="' + thirdvidsnip.thumbnails.default.url + '" title="' + thirdvidtitle + '"></img></a>') : '';
					fourthvid !== undefined ? imagerowchil.eq(3).html('<a href="https://youtu.be/' + fourthvid.id.videoId + '" target="_blank"><img src="' + fourthvidsnip.thumbnails.default.url + '" title="' + fourthvidtitle + '"></img></a>') : '';
					fifthvid !== undefined ? imagerowchil.eq(4).html('<a href="https://youtu.be/' + fifthvid.id.videoId + '" target="_blank"><img src="' + fifthvidsnip.thumbnails.default.url + '" title="' + fifthvidtitle + '"></img></a>') : '';
					buttonrowchil = relatedchil.eq(2).children();
					buttonrowchil.html('');
					for (var rel = 0; rel < 5; rel++) {
						$('<button numb="' + rel + '" class="btn btn-xs btn-default">Add</button>').appendTo(buttonrowchil.eq(rel)).click(function() {
							addid = $(this).parent().parent().prev().children().eq(parseInt($(this).attr('numb'))).find('a').attr('href').split('https://youtu.be/')[1];
							socket.emit("queue", {
								id: addid,
								pos: 'end',
								type: 'yt',
								temp: $(".add-temp").prop("checked")
							});
						});
					}
				}
			}
		});
	} else if (type === 'gd') {
		gdid = $('.queue_active > .qe_title').attr('href').split('https://docs.google.com/file/d/')[1];
		$("#channeltitle, #description").html('');
		$("#publishedat, #relatedtext").text('');
		relatedchil = $("#related").children().eq(0).children();
		relatedchil.eq(0).children().html(''); //titlerowchil
		relatedchil.eq(1).children().html(''); //imagerowchil
		relatedchil.eq(2).children().html(''); //buttonrowchil
		$("#ytinfo").hide();
		$("#gdinfo, #posterimage, #movietitle, #gdratings, #gdbottom").show();
		gdtitle = title.split(/ \(\d{4}/)[0];
		gdyear = title.match(/ \((\d{4})/)[1];
		$.ajax('https://cors-anywhere.herokuapp.com/http://www.omdbapi.com/?t=' + gdtitle + '&y=' + gdyear + '&plot=full&tomatoes=true&totalSeasons=true&apikey=' + omdbkey, {
			success: function(data) {
				if (gdid === PLAYER.mediaId) {
					$("#vidsearching").text('').hide();
					$("#posterimage").off("click.poster").attr('src', data.Poster).on("click.poster", function() {
						window.open(data.Poster, '_blank');
					});
					$("#movietitle").text(data.Title + ' (' + data.Year + ')');
					if (data.Ratings[1] !== undefined && data.Ratings[1].Source === 'Rotten Tomatoes') {
						gdrt = data.Ratings[1].Value;
					} else {
						gdrt = 'N/A';
					}
					$("#gdratings").text(data.Rated + ' | ' + data.Runtime + ' | ' + data.Genre + ' | ' + data.Released + ' | IMDb Rating: ' + data.imdbRating + ' from ' + data.imdbVotes + ' users | Tomatometer: ' + gdrt + ' | Metascore: ' + data.Metascore);
					$("#gdplot").text(data.Plot);
					$("#gddir").html('<b>Directors:</b> ' + data.Director + ' | ');
					$("#gdwri").html('<b>Writers:</b> ' + data.Writer + ' | ');
					$("#gdact").html('<b>Actors:</b> ' + data.Actors);
					$("#fullcast").attr('href', 'http://www.imdb.com/title/' + data.imdbID + '/fullcredits?ref_=tt_cl_sm#cast').text('See full cast Â»');
					$("#gdother").text(data.Language + ' | ' + data.Country + ' | ' + data.Awards);
					$("#gdimdb").attr('href', 'http://www.imdb.com/title/' + data.imdbID).text('http://www.imdb.com/title/' + data.imdbID);
					$("#gdrt").attr('href', data.tomatoURL).text(data.tomatoURL);
				}
			},
			error: function(data) {
				console.log(data);
				if (data.statusText === "timeout" && gdid === PLAYER.mediaId && incretime < 10000) {
					incretime += 1000;
					$("#vidsearching").text($("#vidsearching").text() + ' Trying again...');
					videoInfo(type, id, title);
				} else if (gdid === PLAYER.mediaId) {
					$("#vidsearching").text('Error: ' + data.statusText);
				}
			},
			timeout: incretime
		});
	}
}

$('<div id="infowrap" style="display:none;" class="col-lg-12 col-md-12"><div id="infowell" class="well form-horizontal"><center id="vidsearching" class="text-info"></center><div id="ytinfo"><b id="channeltitle"></b><br /><b id="publishedat"></b><br /><span id="description"></span><br /><p id="relatedtext" style="text-align:center;font-size:16px;font-weight:bold;text-decoration:underline;"></p><table id="related" style="width:100%"><tbody><tr><th></th><th></th><th></th><th></th><th></th></tr><tr><th></th><th></th><th></th><th></th><th></th></tr><tr><th></th><th></th><th></th><th></th><th></th></tr></tbody></table></div></div></div>').prependTo("#rightpane");
$("#infowell").append('<div id="gdinfo"><table style="width: 100%; display: table;" id="movieposter"><tbody><tr><th style="width:101px;"><img id="posterimage" style="cursor:pointer;" height="150" src=""></th><th><table style="width:100%;"><tbody><tr><th style="float:left;margin-left:10px;"><h3 id="movietitle"></h3></th></tr><tr><th style="float:left;margin-left:10px;"><h6 id="gdratings"></h6></th></tr></tbody></table></th></tr></tbody></table><div id="gdbottom"><br><span id="gdplot"></span><br><br><span id="gddir"></span><span id="gdwri"></span><span id="gdact"></span><br><a id="fullcast" href="" target="_blank"></a><br><br><span id="gdother"></span><br><br><a id="gdimdb" href="" target="_blank"></a><br><a id="gdrt" href="" target="_blank"></a></div></div>');

pactive = '';

function postInfo() {
	$("#switchdescr-btn").removeClass('btn-default').addClass('btn-success');
	$("#infowrap").show();
	if (pactive !== PLAYER.mediaId && $('.queue_active > .qe_title').length > 0) {
		incretime = 3000;
		$("#vidsearching").text('Searching. Please wait...').show();
		if ($('.queue_active > .qe_title').attr('href').indexOf('https://docs.google.com/file/d/') === 0) {
			playermediatype = 'gd';
			playermediaid = $('.queue_active > .qe_title').attr('href').split('https://docs.google.com/file/d/')[1];
		} else if ($('.queue_active > .qe_title').attr('href').indexOf('https://youtube.com/watch?v=') === 0) {
			playermediatype = 'yt';
			playermediaid = $('.queue_active > .qe_title').attr('href').split('https://youtube.com/watch?v=')[1];
		}
		pactive = playermediaid;
		setTimeout(function() {
			videoInfo(playermediatype, playermediaid, $(".queue_active > .qe_title").text());
		}, 1000);
	}
}

socket.on("changeMedia", function(data) {
	setTimeout(function() {
		if (!DEFDESCR) {
			pactive = PLAYER.mediaId;
			if ($('.queue_active .qe_title').text().match(/ Part [2-9]\./) === null) {
				incretime = 3000;
				$("#vidsearching").text('Searching. Please wait...').show();
				if ($('.queue_active > .qe_title').attr('href').indexOf('https://docs.google.com/file/d/') === 0) {
					playermediatype = 'gd';
					playermediaid = $('.queue_active > .qe_title').attr('href').split('https://docs.google.com/file/d/')[1];
				} else if ($('.queue_active > .qe_title').attr('href').indexOf('https://youtube.com/watch?v=') === 0) {
					playermediatype = 'yt';
					playermediaid = $('.queue_active > .qe_title').attr('href').split('https://youtube.com/watch?v=')[1];
				}
				pactive = playermediaid;
				setTimeout(function() {
					videoInfo(playermediatype, playermediaid, $(".queue_active > .qe_title").text());
				}, 1000);
			}
		}
	}, 1000);
});

switchdescrbtn = $('<button id="switchdescr-btn" class="btn btn-sm" />').attr('title', 'Video Info').html('<span class="glyphicon glyphicon-info-sign"></span>').appendTo("#playercontrols").on("click", function() {
	DEFDESCR = !DEFDESCR;
	setOpt(CHANNEL.name + "_defdescr", DEFDESCR);
	if (!DEFDESCR) {
		postInfo();
	} else {
		$("#switchdescr-btn").removeClass('btn-success').addClass('btn-default');
		$("#infowrap").hide();
	}
});

if (!DEFDESCR) {
	postInfo();
} else {
	$("#switchdescr-btn").addClass('btn-default');
}

// showInfo();

HIDEPLAYER = true;
hideplayerbtn = $('<button id="hideplayer-btn" class="btn btn-sm btn-default" title="Hide player" />')
	.html('<span class="glyphicon glyphicon-ban-circle"></span>')
	.appendTo("#playercontrols")
	.on("click", function() {
		HIDEPLAYER = !HIDEPLAYER;
		$(this).hasClass('btn-danger') ? showPlayer() : coverPlayer();
	});

muteplayerbtn = $('<button id="muteplayer-btn" class="btn btn-sm btn-default" title="Mute player" />')
	.append('<span class="glyphicon glyphicon-volume-off" />')
	.appendTo("#playercontrols")
	.on("click", function() {
		if (MUTED) {
			$(this).removeClass('btn-danger').attr('title', 'Mute player');
			unmutePlayer();
			MUTED = false;
			setOpt(CHANNEL.name + "_muted", MUTED);
		} else {
			$(this).addClass('btn-danger').attr('title', 'Unmute player');
			mutePlayer();
			MUTED = true;
			setOpt(CHANNEL.name + "_muted", MUTED);
		}
	});


MUTEBTN = setInterval(function() {
	if (PLAYER) {
		toggleMuteBtn();
	}
}, 100);

fullscreenbtn = $('<button id="fullscreen-btn" class="btn btn-sm btn-default" title="Expand Video and Shrink Chat" />')
	.html('<span class="glyphicon glyphicon-resize-full"></span>')
	.appendTo("#playercontrols")
	.on("click", function() {
		if (!FULLSCREEN) {
			$(this).removeClass('btn-success').attr('title', 'Expand Video and Shrink Chat');
			unfullscreenMode();
			if (!HIDEPLAYER) {
				w = $("#ytapiplayer").css('width');
				h = $("#videowrap").css('height').replace('px', '') - 54;
				coverpl.css({
					'width': w,
					'height': h + 'px',
					'margin-top': '24px'
				});
			}
		} else {
			$(this).addClass('btn-success').attr('title', 'Reset to Normal Sizing');
			fullscreenMode();
			if (!HIDEPLAYER) {
				w = $("#ytapiplayer").css('width');
				h = $("#videowrap").css('height').replace('px', '') - 54;
				coverpl.css({
					'width': w,
					'height': h + 'px',
					'margin-top': '24px'
				});
			}
		}
	});
$("#fullscreenbtn").detach().appendTo("#playercontrols");

chatpanel = $('<div id="chatpanel" class="row" />').insertBefore("#playlistrow");

function showWebm() {
	createTemp('Avatar Input');
	$("body").css('overflow', 'hidden');
	outer.on("hidden.bs.modal", function() {
		outer.remove();
		$("body").css('overflow', 'auto');
		scrollChat();
	});
	$('<input id="chavatarquery" type="text" placeholder="Paste Image Url and Press Enter" maxlength="240" style="margin-top:20px" class="form-control" />').keydown(function(ev) {
		if (ev.keyCode == 13) {
			chavquery = $("#chavatarquery").val().trim();
			if (!chavquery) {
				return;
			}
			$("#chavatarquery").val('');
			$.ajax({
				url: 'https://www.googleapis.com/urlshortener/v1/url?key=AIzaSyBNxNLQxBpPsNY81VICLwXYIgkTLdVqeyg',
				type: 'POST',
				data: '{ longUrl: "' + chavquery +'"}',
				contentType: 'application/json; charset=utf-8',
				dataType: 'json',
				success: function(data) {
					chquery = data.id;
					usl = '';
				},
				error: function(data) {
					console.log(data);
					chquery = chavquery;
					usl = 'Warning: Unable to shorten link. This link will shorten the max length of your chat messages by ' + (chquery.length) + ' characters.';
				},
				complete: function(data) {
					$('.chavatardisplay').length > 0 ? $('.chavatardisplay').attr('style', 'cursor:pointer;max-height:30px;max-width:30px;margin:3px;border:0px solid #000000;') : '';
					$('<button class="close avatarclose" number="'+AVATARARRAY.length+'"style="float:none" aria-hidden="true">Ã—</button>').appendTo("#avatararray").on("click", function() {
						AVATARARRAY.splice(parseInt($(this).attr('number')), 1);
						setOpt(CHANNEL.name + "_avatararray", AVATARARRAY);
						if ($(this).next().attr('src') + '.ava ' === CHAVATAR) {
							CHAVATAR = '';
							setOpt(CHANNEL.name + "_chavatar", CHAVATAR);
						}
						$(this).nextAll('.avatarclose').each(function() {
							$(this).attr('number', $(this).attr('number') - 1);
						});
						$(this).next().remove();
						$(this).remove();
					});
					$('<img class="chavatardisplay" src="'+chquery+'" target="_blank" style="cursor:pointer;max-height:34px;max-width:34px;margin:3px;border:4px solid #000000;" />').appendTo("#avatararray").on("click", function() {
						if ($(this).attr('style') === 'cursor:pointer;max-height:34px;max-width:34px;margin:3px;border:4px solid #000000;') {
							$('.chavatardisplay').attr('style', 'cursor:pointer;max-height:30px;max-width:30px;margin:3px;border:0px solid #000000;');
							CHAVATAR = '';
							setOpt(CHANNEL.name + "_chavatar", CHAVATAR);
						} else {
							$('.chavatardisplay').attr('style', 'cursor:pointer;max-height:30px;max-width:30px;margin:3px;border:0px solid #000000;');
							$(this).attr('style', 'cursor:pointer;max-height:34px;max-width:34px;margin:3px;border:4px solid #000000;');
							CHAVATAR = $(this).attr('src') + '.ava ';
							setOpt(CHANNEL.name + "_chavatar", CHAVATAR);
						}
					}).on("dblclick", function() {
						window.open($(this).attr('src'), '_blank');
					});
					AVATARARRAY.push(chquery);
					setOpt(CHANNEL.name + "_avatararray", AVATARARRAY);
					CHAVATAR = chquery + '.ava ';
					setOpt(CHANNEL.name + "_chavatar", CHAVATAR);
					if (usl === '') {
						$("#avatarnotify").text('Switch or remove avatars. Double-click to view in new tab.');
					} else {
						$("#avatarnotify").text(usl);
					}
				}
			});
		}
	}).appendTo(body);
	$('<br /><span id="avatarnotify" class="text-info"></span>').appendTo(body);
	AVATARARRAY.length > 0 ? $("#avatarnotify").text('Switch or remove avatars. Double-click to view in new tab.') : '';
	body.append('<center id="avatararray" style="margin-top:20px" ></center>');
	if (AVATARARRAY.length > 0) {
		for (var av = 0; av < AVATARARRAY.length; av++) {
			avaclose = AVATARARRAY.indexOf(AVATARARRAY[av]);
			$('<button class="close avatarclose" number="'+av+'"style="float:none" aria-hidden="true">Ã—</button>').appendTo("#avatararray").on("click", function() {
				AVATARARRAY.splice(parseInt($(this).attr('number')), 1);
				setOpt(CHANNEL.name + "_avatararray", AVATARARRAY);
				if ($(this).next().attr('src') + '.ava ' === CHAVATAR) {
					CHAVATAR = '';
					setOpt(CHANNEL.name + "_chavatar", CHAVATAR);
				}
				$(this).nextAll('.avatarclose').each(function() {
					$(this).attr('number', $(this).attr('number') - 1);
				});
				$(this).next().remove();
				$(this).remove();
			});
			$('<img class="chavatardisplay" src="'+AVATARARRAY[av]+'" target="_blank" style="cursor:pointer;max-height:30px;max-width:30px;margin:3px;border:0px solid #000000;" />').appendTo("#avatararray");
			if (AVATARARRAY[av] + '.ava ' === CHAVATAR) {
				avanum = av + av + 2;
				$("#avatararray .chavatardisplay:nth-child("+avanum+")").attr('style', 'cursor:pointer;max-height:34px;max-width:34px;margin:3px;border:4px solid #000000;');
			}
		}
		$('.chavatardisplay').on("click", function() {
			if ($(this).attr('style') === 'cursor:pointer;max-height:34px;max-width:34px;margin:3px;border:4px solid #000000;') {
				$('.chavatardisplay').attr('style', 'cursor:pointer;max-height:30px;max-width:30px;margin:3px;border:0px solid #000000;');
				CHAVATAR = '';
				setOpt(CHANNEL.name + "_chavatar", CHAVATAR);
			} else {
				$('.chavatardisplay').attr('style', 'cursor:pointer;max-height:30px;max-width:30px;margin:3px;border:0px solid #000000;');
				$(this).attr('style', 'cursor:pointer;max-height:34px;max-width:34px;margin:3px;border:4px solid #000000;');
				CHAVATAR = $(this).attr('src') + '.ava ';
				setOpt(CHANNEL.name + "_chavatar", CHAVATAR);
			}
		}).on("dblclick", function() {
			window.open($(this).attr('src'), '_blank');
		});
	}
	setTimeout(function() {
		$("#chavatarquery").focus();
	}, 250);
}

FamilyArray = [
	['fu', '<span style="font-family: Futura,\'Trebuchet MS\',Arial,sans-serif">abc</span>'],
	['pa', '<span style="font-family: Palatino, \'Palatino Linotype\',\'Palatino LT STD\',\'Book Antiqua\',Georgia,serif">abc</span>'],
	['co', '<span style="font-family: \'Courier New\',Courier,\'Lucida Sans Typewriter\',\'Lucida Typewriter\',monospace">abc</span>'],
	['gi', '<span style="font-family: \'Gill Sans\',\'Gill Sans MT\',Calibri,sans-serif">abc</span>'],
	['ga', '<span style="font-family: Garamond,Baskerville,\'Baskerville Old Face\',\'Hoefler Text\',\'Times New Roman\',serif">abc</span>'],
	['ta', '<span style="font-family: Tahoma,Verdana,Segoe,sans-serif">abc</span>'],
	['ar', '<span style="font-family: Arial,\'Helvetica Neue\',Helvetica,sans-serif">abc</span>'],
	['ab', '<span style="font-family: \'Arial Black\',\'Arial Bold\',Gadget,sans-serif">abc</span>'],
	['an', '<span style="font-family: \'Arial Narrow\',Arial,sans-serif">abc</span>'],
	['fr', '<span style="font-family: \'Franklin Gothic Medium\',\'Franklin Gothic\',\'ITC Franklin Gothic\',Arial,sans-serif">abc</span>'],
	['im', '<span style="font-family: Impact,Haettenschweiler,\'Franklin Gothic Bold\',Charcoal,\'Helvetica Inserat\',\'Bitstream Vera Sans Bold\',\'Arial Black\',\'sans serif\'">abc</span>'],
	['lu', '<span style="font-family: \'Lucida Grande\',\'Lucida Sans Unicode\',\'Lucida Sans\',Geneva,Verdana,sans-serif">abc</span>'],
	['ce', '<span style="font-family: \'Century Gothic\',CenturyGothic,AppleGothic,sans-serif">abc</span>'],
	['rc', '<span style="font-family: Rockwell,\'Courier Bold\',Courier,Georgia,Times,\'Times New Roman\',serif">abc</span>'],
	['lb', '<span style="font-family: \'Lucida Bright\',Georgia,serif">abc</span>'],
	['ti', '<span style="font-family: TimesNewRoman,\'Times New Roman\',Times,Baskerville,Georgia,serif">abc</span>'],
	['lc', '<span style="font-family: \'Lucida Console\',\'Lucida Sans Typewriter\',monaco,\'Bitstream Vera Sans Mono\',monospace">abc</span>'],
	['mo', '<span style="font-family: monaco,Consolas,\'Lucida Console\',monospace">abc</span>'],
	['go', '<span style="font-family: \'Goudy Old Style\',Garamond,\'Big Caslon\',\'Times New Roman\',serif">abc</span>'],
	['pe', '<span style="font-family: Perpetua,Baskerville,\'Big Caslon\',\'Palatino Linotype\',Palatino,\'URW Palladio L\',\'Nimbus Roman No9 L\',serif">abc</span>'],
];

function showFonts() {
	$("#userlist").append('<div id="fontspanel" />');
	setPanelProperties("#fontspanel");
	fontsbtnwrap = $('<div id="fontsbtnwrap" />').appendTo("#fontspanel");
	$('<span>â€“â€“â€“â€“â€“â€“â€“â€“â€“â€“â€“â€“â€“â€“â€“</span>').appendTo("#fontspanel");
	familybtnwrap = $('<div id="familybtnwrap" />').appendTo("#fontspanel");
	$('<span>â€“â€“â€“â€“â€“â€“â€“â€“â€“â€“â€“â€“â€“â€“â€“</span>').appendTo("#fontspanel");
	effectbtnwrap = $('<div id="effectbtnwrap" />').appendTo("#fontspanel");
	$('<span id="lastseparator">â€“â€“â€“â€“â€“â€“â€“â€“â€“â€“â€“â€“â€“â€“â€“</span>').appendTo("#fontspanel");
	for (var i in FontsArray) {
		$('<button id="cbtn' + i + '" onclick="insertFont(\'' + i + '\')" />').addClass('btn btn-default')
			.css({
				'background': FontsArray[i][0],
				'border-width': '2px',
				'border-color': 'black'
			}).text(FontsArray[i][2]).appendTo(fontsbtnwrap);
		$('#cbtn' + HIGHFONT).css({
			'border-color': 'white'
		});
	}
	for (var j in FamilyArray) {
		$('<button id="fbtn' + j + '" onclick="insertFamily(\'' + j + '\')" />').addClass('btn btn-default')
			.css({
				'background': 'white',
				'color': 'black',
				'text-transform': 'capitalize',
				'border-width': '2px',
				'border-color': 'black'
			})
			.append(FamilyArray[j][1]).appendTo(familybtnwrap);
		$('#fbtn' + HIGHFAMILY).css({
			'border-color': 'blue'
		});
	}
	$('<button id="ibtn" />').addClass('btn btn-default').css({
			'background': 'white',
			'color': 'black',
			'border-width': '2px',
			'border-color': 'black'
		})
		.append('<span style="font-style:italic">I</span>').appendTo(effectbtnwrap).on("click", function() {
			if (TYPEITALIC === '[i]') {
				TYPEITALIC = '';
				setOpt(CHANNEL.name + "_typeitalic", TYPEITALIC);
				$("#ibtn").css({
					'border-color': 'black'
				})
				$("#chatline").focus();
			} else {
				TYPEITALIC = '[i]';
				setOpt(CHANNEL.name + "_typeitalic", TYPEITALIC);
				$("#ibtn").css({
					'border-color': 'blue'
				})
				$("#chatline").focus();
			}
		});
	TYPEITALIC === '[i]' ? $('#ibtn').css({
		'border-color': 'blue'
	}) : '';
	$('<button id="bbtn" />').addClass('btn btn-default').css({
			'background': 'white',
			'color': 'black',
			'border-width': '2px',
			'border-color': 'black'
		})
		.append('<span style="font-weight:bold">B</span>').appendTo(effectbtnwrap).on("click", function() {
			if (TYPEBOLD === '[b]') {
				TYPEBOLD = '';
				setOpt(CHANNEL.name + "_typebold", TYPEBOLD);
				$("#bbtn").css({
					'border-color': 'black'
				})
				$("#chatline").focus();
			} else {
				TYPEBOLD = '[b]';
				setOpt(CHANNEL.name + "_typebold", TYPEBOLD);
				$("#bbtn").css({
					'border-color': 'blue'
				})
				$("#chatline").focus();
			}
		});
	TYPEBOLD === '[b]' ? $('#bbtn').css({
		'border-color': 'blue'
	}) : '';
	$('<button id="ubtn" />').addClass('btn btn-default').css({
			'background': 'white',
			'color': 'black',
			'border-width': '2px',
			'border-color': 'black'
		})
		.append('<span style="text-decoration:underline">U</span>').appendTo(effectbtnwrap).on("click", function() {
			if (TYPEUNDER === '[u]') {
				TYPEUNDER = '';
				setOpt(CHANNEL.name + "_typeunder", TYPEUNDER);
				$("#ubtn").css({
					'border-color': 'black'
				})
				$("#chatline").focus();
			} else {
				TYPEUNDER = '[u]';
				setOpt(CHANNEL.name + "_typeunder", TYPEUNDER);
				$("#ubtn").css({
					'border-color': 'blue'
				})
				$("#chatline").focus();
			}
		});
	TYPEUNDER === '[u]' ? $('#ubtn').css({
		'border-color': 'blue'
	}) : '';
	$('<button id="clearfont" style="padding: 0px 8px; color: rgb(255, 255, 255); background: black; border-color: white" />').addClass('btn btn-default').text('Clear Font')
		.insertAfter("#lastseparator").click(function() {
			TYPEFONT = '';
			HIGHFONT = '';
			TYPEFAMILY = '';
			HIGHFAMILY = '';
			TYPEITALIC = '';
			TYPEBOLD = '';
			TYPEUNDER = '';
			setOpt(CHANNEL.name + "_typefont", TYPEFONT);
			setOpt(CHANNEL.name + "_typefont", HIGHFONT);
			setOpt(CHANNEL.name + "_typefamily", TYPEFAMILY);
			setOpt(CHANNEL.name + "_highfamily", HIGHFAMILY);
			setOpt(CHANNEL.name + "_typeitalic", TYPEITALIC);
			setOpt(CHANNEL.name + "_typebold", TYPEBOLD);
			setOpt(CHANNEL.name + "_typeunder", TYPEUNDER);
			fontsbtnwrap.children().css({
				'border-color': 'black'
			});
			familybtnwrap.children().css({
				'border-color': 'black'
			});
			effectbtnwrap.children().css({
				'border-color': 'black'
			});
			$("#chatline").focus();
		});
}

function insertFont(i) {
	TYPEFONT = '[' + FontsArray[i][1] + ']';
	setOpt(CHANNEL.name + "_typefont", TYPEFONT);
	fontsbtnwrap.children().css({
		'border-color': 'black'
	});
	$('#cbtn' + i).css({
		'border-color': 'white'
	});
	HIGHFONT = i;
	setOpt(CHANNEL.name + "_highfont", HIGHFONT);
	$("#chatline").focus();
}

function insertFamily(i) {
	TYPEFAMILY = '[' + FamilyArray[i][0] + ']';
	setOpt(CHANNEL.name + "_typefamily", TYPEFAMILY);
	familybtnwrap.children().css({
		'border-color': 'black'
	});
	$('#fbtn' + i).css({
		'border-color': 'blue'
	});
	HIGHFAMILY = i;
	setOpt(CHANNEL.name + "_highfamily", HIGHFAMILY);
	$("#chatline").focus();
}

layoutlist = $('<li id="layoutlist" style="cursor:pointer;" />');
layoutlist.insertAfter("#channelset-link");
layoutbtn = $('<a id="layout-btn" />')
	.html('Layout')
	.appendTo(layoutlist)
	.on("click", function() {
		displayConfigPanel();
	});
$("#playlistmanagerwrap").show();

$("#nav-collapsible > ul").append($('<li id="roomswitch" style="cursor:pointer;"><a id="roomswitchbtn" style="color:rebeccapurple;">YouTube Room</a></li>').click(function() {
	window.open("https://cytu.be/r/ChillYT", "_blank");
}));

$("#roomswitchbtn").hover(function() {
	$(this).attr('style', 'color:mediumpurple;');
}, function() {
	$(this).attr('style', 'color:rebeccapurple;');
});

embedform = $('<div id="embedform" class="col-lg-5 col-md-5" />').appendTo(chatcontrols);
$('<div class="col-lg-12 col-md-12 embedname"><span id="embed-help"><u>Embeds[?]</u></span></div>')
	.appendTo(embedform);
embedwrap = $('<div id="embedwrap" class="col-lg-12 col-md-12" />').appendTo(embedform);
$("#embed-help").on("click", function() {
	txt = 'This option lets you see images or videos directly on the chat, instead of links.\nClick on image or double click on video to open in the new tab.\n\nThis channel supports following types of links. Submit a link that ends in one of these:\nâ–  Images - ';
	(EmbeddingMedia_Images !== "") ? txt += '.jpg / .jpg:large / .jpeg / .JPG / .png / .tiff / .gif\n--OR--\nEnd a link in .pic to automatically force it into a picture. Make it .pic.spl to cover it in a spoiler warning image.': 'none';
	txt += '\nâ–  Videos - ';
	(EmbeddingMedia_Videos !== "") ? txt += '.webm': 'none';
	alert(txt);
});
if (EmbeddingMedia_Images !== "") {
	embedimg = $('<label class="checkbox-inline" />').appendTo(embedwrap);
	cbox = $('<input type="checkbox" id="embed-img" checked>')
		.appendTo(embedimg)
		.on("click", function() {
			if (EMBEDIMG) {
				EMBEDIMG = false
				setOpt(CHANNEL.name + "_embedimg", EMBEDIMG);
				$('img.embedimg, img.image-embed-small').each(function() {
					if ($(this).attr('src').length > 0) {
						$(this).replaceWith($(this).attr('src'));
					}
				});
				$('img.channel-emote').each(function() {
					if ($(this).attr('src').length > 0) {
						$(this).replaceWith('<a href="' + $(this).attr('src') + '" target="_blank">' + $(this).attr('src') + '</a>');
					}
				});
			} else {
				EMBEDIMG = true;
				setOpt(CHANNEL.name + "_embedimg", EMBEDIMG);
			}
			scrollChat();
		});
	cbox.after('img');
	!EMBEDIMG ? cbox.removeAttr('checked') : '';
}
if (EmbeddingMedia_Videos !== "") {
	embedvid = $('<label class="checkbox-inline" />').appendTo(embedwrap);
	cbox = $('<input type="checkbox" id="embed-webm" checked>')
		.appendTo(embedvid)
		.on("click", function() {
			if (EMBEDVID) {
				EMBEDVID = false;
				setOpt(CHANNEL.name + "_embedvid", EMBEDVID);
				$('video.embedvid, video.indvideo').each(function() {
					$(this).replaceWith(this.src);
				});
			} else {
				EMBEDVID = true;
				setOpt(CHANNEL.name + "_embedvid", EMBEDVID);
			}
			scrollChat();
		});
	cbox.after('vid');
	!EMBEDVID ? cbox.removeAttr('checked') : '';
}

function getPlaylistURLs() {
	item = $(".queue_active .qe_title").attr("href");
	item2 = $(".queue_active").next().children("a").attr('href');
	title = $(".queue_active .qe_title").html();
	title2 = $(".queue_active").next().children("a").html();
	createTemp('Current Video');
	$("body").css('overflow', 'hidden');
	outer.on("hidden.bs.modal", function() {
		outer.remove();
		$("body").css('overflow', 'auto');
		scrollChat();
	});
	$(".queue_active").next().children("a").attr('href');
	$('<h6>Now Playing: </h6><a id="link1" href="' + item + '" target="_blank">' + title + '</a><br /><br />').appendTo(body);
	$('<h6>Up Next: </h6><a id="link2" href="' + item2 + '" target="_blank">' + title2 + '</a><br /><br />').appendTo(body);
}

/*pinupbtn = $('<button id="pinup-btn" class="btn btn-sm btn-default" title="Pin playlist to player" />')
	.append('<span class="glyphicon glyphicon-pushpin" />')
	.prependTo("#videocontrols")
	.on("click", function() {
		!PINNED ? pinUp() : unPin();
		PINNED ? $(this).addClass('btn-success') : $(this).removeClass('btn-success');
		PINNED ? $("#videocontrols").removeClass('pull-right').addClass('pull-left') : $("#videocontrols").removeClass('pull-left').addClass('pull-right')
		scrollQueue();
		scrollChat();
	});
*/
advplaylist = $('<button id="advplaylist" class="btn btn-sm btn-default" title="Advanced options" />')
	.append('<span class="glyphicon glyphicon-wrench" />')
	.insertBefore("#getem")
	.on("click", function() {
		toggleDiv(advplcontrols);
		if ($(this).hasClass('btn-default')) {
			$(this).removeClass('btn-default').addClass('btn-success');
		} else {
			$(this).removeClass('btn-success').addClass('btn-default');
		}
	});

function toggleAdvancedPl() {
	CLIENT.rank < 2 ? advplaylist.hide() : advplaylist.show();
	hasPermission("playlistjump") ? playnextbtn.show() : playnextbtn.hide();
	hasPermission("playlistmove") ? bumplastbtn.show() : bumplastbtn.hide();
	hasPermission("playlistdelete") ? deletelastbtn.show() : deletelastbtn.hide();
}

advplcontrol = $('<div id="advplcontrol" class="col-lg-12 col-md-12" />').insertAfter("#playlistmanager");
advplcontrols = $('<div id="advplcontrols" class="btn-group" style="display:none" />').appendTo(advplcontrol);

playnextbtn = $('<button id="playnext-btn" class="btn btn-default">Play next</button>')
	.appendTo(advplcontrols)
	.on("click", function() {
		socket.emit("playNext");
	});

bumplastbtn = $('<button id="bumplast-btn" class="btn btn-default">Bump last</button>')
	.appendTo(advplcontrols)
	.on("click", function() {
		len = $("#queue").children().length;
		uid = $("#queue .queue_entry:nth-child(" + len + ")").data("uid");
		socket.emit("moveMedia", {
			from: uid,
			after: PL_CURRENT
		});
	});

deletelastbtn = $('<button id="deletelast-btn" class="btn btn-default">Delete last</button>')
	.appendTo(advplcontrols)
	.on("click", function() {
		len = $("#queue").children().length;
		uid = $("#queue .queue_entry:nth-child(" + len + ")").data("uid");
		socket.emit("delete", uid);
	});

toggleAdvancedPl();

/*if (USEROPTS.hidevid) {
	$("#chatwrap, #chatline, #chatavewrap").removeClass('col-lg-12 col-md-12').addClass('col-lg-5 col-md-5');
	videowrap = $('<div id="videowrap" class="col-lg-7 col-md-7" />').insertBefore("#chatwrap");
	currenttitle = $('<p id="currenttitle" />').html('Currently Playing: ' + $(".queue_active a").html()).appendTo(videowrap);
	ytapiplayer = $('<div id="ytapiplayer" />').appendTo(videowrap);
	$("#playercontrols").hide();
	$("#chatwrap, #chatavewrap").removeClass().addClass('col-lg-12 col-md-12');
	$("#pinup-btn").prop('disabled', true);
	html = 'According to your user preferences, the video player is hidden. Go to options > playback > uncheck \'remove video\' to see the video again.<br /><br />';
	makeAlert("No Player", html).appendTo(ytapiplayer);
	fitChat(500);
	staybtn = $('<button id="stay-btn" class="btn btn-default btn-sm">Stay In "Chat Only" Mode</button>').appendTo("#ytapiplayer .alert").on("click", function() {
		videowrap.remove();
		$("#chatwrap, #chatavewrap").removeClass().addClass('col-lg-12 col-md-12');
		$("#config-btn, #mode-sel, #pinup-btn").prop('disabled', true);
		fitChat(600);
	});
}*/

if (CLIENT.rank > 1) {
	$('<button id="getem" class="btn btn-sm btn-default" title="Get Current Links"><span class="glyphicon glyphicon-link"></span></button>').insertAfter("#advplaylist")
		.on("click", function() {
			getPlaylistURLs();
		});
}

/*scrollbtn = $('<button id="scroll-btn" class="btn btn-sm btn-default" title="Scroll playlist to current item" />')
	.append('<span class="glyphicon glyphicon-hand-right" />')
	.insertBefore("#voteskip")
	.on("click", function() {
		scrollQueue();
	});*/

unshared = 0;
untouched = 0;
skipped = 0;
numfiles = 0;

jQuery.expr[':'].contains = function(a, i, m) {
	return jQuery(a).text().toUpperCase()
		.indexOf(m[3].toUpperCase()) >= 0;
};

var MOVLIST = false;

$('<button id="mlistbtn" class="btn btn-sm btn-default" title="Check out our Movie List">Movie List</button>').appendTo("#underplaylist")
	.on("click", function() {
		createMovieList();
	});

function nominateMovie(name, list) {
	if (name === '') {
		leng = moviearray.length;
		num = Math.round(Math.random() * leng);
		name = moviearray[num][0];
		if ($('#mlistquery').val()) {
			mtxt = 'Random movie matching "' + $("#mlistquery").val().trim() + '" | "' + $("#ylistquery").val().trim() + '" | "' + $("#glistquery").val().trim() + '" - "' + name + '" was nominated';
		} else {
			mtxt = 'Random movie: ' + name + ' was nominated';
		}
	} else {
		mtxt = name + ' was nominated';
	}
	savevote = name;
	socket.emit("chatMsg", {
		msg: '!nominatemovie ' + name
	});
	$('.trailertext').text(mtxt);
}

function nominateTV(name, list) {
	if (name === '') {
		leng = $(list + '[style="display: block; list-style: none; padding-left: 0px;"] li').length;
		num = Math.round(Math.random() * leng);
		titofit = $(list + '[style="display: block; list-style: none; padding-left: 0px;"] li').eq(num - 1).children('span:nth-child(1)');
		name = titofit.parent().parent().children('span:nth-child(4)').text() + ' ' + titofit.text().split('âœ‡ ')[1];
		if ($('#tvlistquery').val()) {
			tvtxt = 'Random episode matching "' + $("#tvlistquery").val().trim() + '" - "' + name + '" was nominated';
		} else {
			tvtxt = 'Random episode: ' + name + ' was nominated';
		}
	} else {
		tvtxt = name + ' was nominated';
	}
	socket.emit("chatMsg", {
		msg: '!nominatetv ' + name
	});
	$('.trailertext').text(tvtxt);
}

function changeCend(dis) {
	dis.off('click.cend');
	if (DESC) {
		DESC = false;
		$("#desc").on('click.cend', function() {
			changeCend($(this));
		});
		$("#desc").attr('style', 'cursor:pointer;font-weight:normal;text-decoration:none');
		RESET = true;
		$("#moviereset").removeAttr('disabled');
	} else {
		DESC = true;
		$("#asc").on('click.cend', function() {
			changeCend($(this));
		});
		$("#asc").attr('style', 'cursor:pointer;font-weight:normal;text-decoration:none');
		PROPCHECKED = false;
		$('.sortchecks').each(function() {
			if ($(this).prop('checked')) {
				PROPCHECKED = true;
			}
		});
		if (!PROPCHECKED) {
			RESET = false;
			$("#moviereset").attr('disabled', true);
		}
	}
	dis.attr('style', 'cursor:auto;font-weight:900;text-decoration:underline');
	moviearray.reverse();
	listMovies(moviearray, indexone, indextwo);
}

/*
function sortAlpha(mt) {
	if (Movie_Array[mt][3] !== undefined && Movie_Array[mt][3] === 'Recently Added') {
		recentlyadded += '<li style="display: block;"><span><a style="cursor:pointer" class="gmfl">â“˜</a> <a style="cursor:pointer" class="gyt">âœ›</a> <a style="cursor:pointer" class="nmm">âœ‡</a> ' + Movie_Array[mt][0] + ' - <b><i>Recently Added</i></b></span><span class="pull-right">' + Movie_Array[mt][1] + '</span></li>';
	} else {
		if ($('#movielist').html().indexOf('block;"><span><a style="cursor:pointer" class="gmfl">â“˜</a> <a style="cursor:pointer" class="gyt">âœ›</a> <a style="cursor:pointer" class="nmm">âœ‡</a> ' + Movie_Array[mt][0]) > -1) {
			movietext += '<li style="display: block;"><span><a style="cursor:pointer" class="gmfl">â“˜</a> <a style="cursor:pointer" class="gyt">âœ›</a> <a style="cursor:pointer" class="nmm">âœ‡</a> ' + Movie_Array[mt][0] + '</span><span class="pull-right">' + Movie_Array[mt][1] + '</span></li>';
		} else {
			movietext += '<li style="display: none;"><span><a style="cursor:pointer" class="gmfl">â“˜</a> <a style="cursor:pointer" class="gyt">âœ›</a> <a style="cursor:pointer" class="nmm">âœ‡</a> ' + Movie_Array[mt][0] + '</span><span class="pull-right">' + Movie_Array[mt][1] + '</span></li>';
		}
	}
}*/

function changeSort(dis) {
	if (sortid.attr('id') === dis) {
		return;
	}
	RESET = true;
	$("#moviereset").removeAttr('disabled');
	sortid = $("#"+dis);
	$('.sortchecks').prop('checked', false).prop('disabled', false);
	sortid.prop('checked', true).prop('disabled', true);
	if (dis === "sortalpha") {/*
		recentlyadded = '<div style="margin:5px 0px 5px 0px">';
		movietext = '';
		var mt;
		if (!DESC) {
			//$('#movielist').append($('#movielist').children('li').get().reverse());
			for (mt = Movie_Array.length - 1; mt > -1; mt--) {
				sortAlpha(mt);
			}
		} else {
			for (mt = 0; mt < Movie_Array.length; mt++) {
				sortAlpha(mt);
			}
		}
		//str = Movie_Array[mt][0].replace(/'/g, "\\'");
		recentlyadded += '</div>';
		$('#movielist').children().remove();
		$('#movielist').append(recentlyadded + movietext);
		$('.gmfl').click(function() {
			getMovieFromList($(this).parent().text().split('â“˜ âœ› âœ‡ ')[1]);
		});
		$('.gyt').click(function() {
			getYouTube('', $(this).parent().text().split('â“˜ âœ› âœ‡ ')[1] + ' trailer', 'end');
		});
		$('.nmm').click(function() {
			nominateMovie($(this).parent().text().split('â“˜ âœ› âœ‡ ')[1], '#movielist');
		});
		//$('#movielist').children('li').remove();
		//$('#movielist').append(clonedmovie);*/
		moviearray.sort(function(a, b) {
			return a[0].localeCompare(b[0]);
		});
		if (!DESC) {
			moviearray.reverse();
		}
		listMovies(moviearray, indexone, indextwo);
	}
	if (dis === "sortyear") {
		moviearray.sort(function(a, b) {
			parsea = parseInt(a[0].match(/\((\d{4})\)/)[1]);
			parseb = parseInt(b[0].match(/\((\d{4})\)/)[1]);
			if (parsea < parseb || (parsea === parseb && a[0].localeCompare(b[0]) === 1)) {
				return 1;
			}
			if (parsea > parseb || (parsea === parseb && a[0].localeCompare(b[0]) === -1)) {
				return -1;
			}
		});
		if (!DESC) {
			moviearray.reverse();
		}
		listMovies(moviearray, indexone, indextwo);
	}
	if (dis === "sortmpaa") {
		mpaaarray = ["N/A", "NOT RATED", "UNRATED", "TV-Y", "TV-Y7", "TV-G", "G", "PASSED", "APPROVED", "GP", "M/PG", "M", "TV-PG", "PG", "PG-13", "TV-14", "TV-MA", "R", "X", "NC-17"];
		moviearray.sort(function(a, b) {
			if (a[a.length - 1] === 'Recently Added') {
				aindex = a.length - 5;
			} else {
				aindex = a.length - 4;
			}
			if (b[b.length - 1] === 'Recently Added') {
				bindex = b.length - 5;
			} else {
				bindex = b.length - 4;
			}
			for (var mp = 0; mp < mpaaarray.length; mp++) {
				if (a[aindex] === mpaaarray[mp]) {
					ampaaindex = mp;
				}
				if (b[bindex] === mpaaarray[mp]) {
					bmpaaindex = mp;
				}
			}
			if (ampaaindex < bmpaaindex || (ampaaindex === bmpaaindex && a[0].localeCompare(b[0]) === 1)) {
				return 1;
			}
			if (ampaaindex > bmpaaindex || (ampaaindex === bmpaaindex && a[0].localeCompare(b[0]) === -1)) {
				return -1;
			}
			
		});
		if (!DESC) {
			moviearray.reverse();
		}
		listMovies(moviearray, indexone, indextwo);
	}
	if (dis === "sortimdb") {
		moviearray.sort(function(a, b) {
			if (a[a.length - 1] === 'Recently Added') {
				aindex = a.length - 4;
			} else {
				aindex = a.length - 3;
			}
			if (b[b.length - 1] === 'Recently Added') {
				bindex = b.length - 4;
			} else {
				bindex = b.length - 3;
			}
			parsea = parseFloat(a[aindex]);
			parseb = parseFloat(b[bindex]);
			if (parsea < parseb || (parsea === parseb && a[0].localeCompare(b[0]) === 1)) {
				return 1;
			}
			if (parsea > parseb || (parsea === parseb && a[0].localeCompare(b[0]) === -1)) {
				return -1;
			}
		});
		if (!DESC) {
			moviearray.reverse();
		}
		listMovies(moviearray, indexone, indextwo);
	}
	if (dis === "sortrt") {
		moviearray.sort(function(a, b) {
			if (a[a.length - 1] === 'Recently Added') {
				aindex = a.length - 3;
			} else {
				aindex = a.length - 2;
			}
			if (b[b.length - 1] === 'Recently Added') {
				bindex = b.length - 3;
			} else {
				bindex = b.length - 2;
			}
			if (a[aindex] !== 'N/A') {
				parsea = parseInt(a[aindex]);
			} else {
				parsea = 0;
			}
			if (b[bindex] !== 'N/A') {
				parseb = parseInt(b[bindex]);
			} else {
				parseb = 0;
			}
			if (parsea < parseb || (parsea === parseb && a[0].localeCompare(b[0]) === 1)) {
				return 1;
			}
			if (parsea > parseb || (parsea === parseb && a[0].localeCompare(b[0]) === -1)) {
				return -1;
			}
		});
		if (!DESC) {
			moviearray.reverse();
		}
		listMovies(moviearray, indexone, indextwo);
	}
	if (dis === "sortmeta") {
		moviearray.sort(function(a, b) {
			if (a[a.length - 1] === 'Recently Added') {
				aindex = a.length - 2;
			} else {
				aindex = a.length - 1;
			}
			if (b[b.length - 1] === 'Recently Added') {
				bindex = b.length - 2;
			} else {
				bindex = b.length - 1;
			}
			if (a[aindex] !== 'N/A') {
				parsea = parseInt(a[aindex]);
			} else {
				parsea = 0;
			}
			if (b[bindex] !== 'N/A') {
				parseb = parseInt(b[bindex]);
			} else {
				parseb = 0;
			}
			if (parsea < parseb || (parsea === parseb && a[0].localeCompare(b[0]) === 1)) {
				return 1;
			}
			if (parsea > parseb || (parsea === parseb && a[0].localeCompare(b[0]) === -1)) {
				return -1;
			}
		});
		if (!DESC) {
			moviearray.reverse();
		}
		listMovies(moviearray, indexone, indextwo);
	}
}

/*$("#movielist > li > span:first-child").filter(function(index) {
	return $(this).text().match(RegExp(mstr, 'i')) === null || $(this).text().match(RegExp(ystr)) === null || $(this).next().text().match(RegExp(gstr, 'i')) === null;
}).parent().hide();
$("#movielist > li > span:first-child").filter(function(index) {
	return $(this).text().match(RegExp(mstr, 'i')) && $(this).text().match(RegExp(ystr)) && $(this).next().text().match(RegExp(gstr, 'i'));
}).parent().show();*/

function listMovies(moviearray, index1, index2) {
	recentlyadded = '';
	text = '';
	for (var pi = index1; pi < index2; pi++) {
		str = moviearray[pi][0].replace(/'/g, "\\'");
		if (moviearray[pi][7] !== undefined && moviearray[pi][7] === 'Recently Added') {
			recentlyadded += '<tr><td><a style="cursor:pointer" class="gmfl" onclick="getMovieFromList(\'' + str + '\')">â“˜</a> <a style="cursor:pointer" class="gyt" onclick="getYouTube(\'\', \'' + str + ' trailer\', \'end\')">âœ›</a> <a style="cursor:pointer" class="nmm" onclick="nominateMovie(\'' + str + '\', \'#movielist\')">âœ‡</a> ' + moviearray[pi][0] + ' - <b><i>Recently Added</i></b></td><td>' + moviearray[pi][1] + '</td><td>' + moviearray[pi][moviearray[pi].length - 5] + '</td><td>' + moviearray[pi][moviearray[pi].length - 4] + '</td><td>' + moviearray[pi][moviearray[pi].length - 3] + '</td><td>' + moviearray[pi][moviearray[pi].length - 2] + '</td></tr>';
		} else {
			text += '<tr><td><a style="cursor:pointer" class="gmfl" onclick="getMovieFromList(\'' + str + '\')">â“˜</a> <a style="cursor:pointer" class="gyt" onclick="getYouTube(\'\', \'' + str + ' trailer\', \'end\')">âœ›</a> <a style="cursor:pointer" class="nmm" onclick="nominateMovie(\'' + str + '\', \'#movielist\')">âœ‡</a> ' + moviearray[pi][0] + '</td><td>' + moviearray[pi][1] + '</td><td>' + moviearray[pi][moviearray[pi].length - 4] + '</td><td>' + moviearray[pi][moviearray[pi].length - 3] + '</td><td>' + moviearray[pi][moviearray[pi].length - 2] + '</td><td>' + moviearray[pi][moviearray[pi].length - 1] + '</td></tr>';
		}
	}
	$("#movielist").html('<tr><th>Title</th><th>Genre</th><th>MPAA</th><th>IMDb</th><th>RT</th><th>Meta</th></tr>' + recentlyadded + text);
	indextwo = indexone + 20;
}

function filterMovies(mstr, ystr, gstr, info) {
	moviearray = [];
	rafound = 0;
	for (var na = 0; na < Movie_Array.length; na++) {
		if (Movie_Array[na][0].match(RegExp(mstr, 'i')) && Movie_Array[na][0].match(RegExp(ystr)) && Movie_Array[na][1].match(RegExp(gstr, 'i'))) {
			if (Movie_Array[na][7] !== undefined && Movie_Array[na][7] === 'Recently Added') {
				moviearray.splice(rafound, 0, Movie_Array[na]);
				rafound += 1;
			} else {
				moviearray.push(Movie_Array[na]);
			}
		}
	}
	//buttonindex = 2;
	//nbtn = 1;
	indexone = 0;
	indextwo = moviearray.length;
	if (indextwo > 20) {
		indextwo = 20;
	}
	$("#moviepage > li:first").addClass('disabled').children('a').attr('style', 'width:15%;pointer-events:none');
	$("#moviepage > li:first").next().addClass('disabled').children('a').attr('style', 'width:15%;pointer-events:none');
	/*pagelength = Math.ceil(moviearray.length / 20);
	if (pagelength > 7) {
		buttonlength = 7;
	}
	moviepagetext = '<li class="disabled"><a href="javascript:void(0)">First</a></li><li class="disabled"><a href="javascript:void(0)">Â«</a></li>';
	for (var bl = 0; bl < buttonlength; bl++) {
		if (bl === 0) {
			moviepagetext += '<li class="disabled"><a href="javascript:void(0)">' + (bl + 1) + '</a></li>';
		} else {
			moviepagetext += '<li><a href="javascript:void(0)">' + (bl + 1) + '</a></li>';
		}
	}
	moviepagetext += '<li><a href="javascript:void(0)">Â»</a></li><li><a href="javascript:void(0)">Last</a></li>';
	$("#moviepage").html(moviepagetext);*/
	listMovies(moviearray, indexone, indextwo);
	$("#showing").text('Showing ' + (indexone + 1) + '-' + indextwo + ' of ' + moviearray.length).parent().addClass('disabled');
	info.text('Found ' + moviearray.length + ' movies matching "' + $("#mlistquery").val().trim()  + '" | "' + $("#ylistquery").val().trim() + '" | "' + $("#glistquery").val().trim()  + '"');
}

function appendMovieList() {
	body.append('<span><a style="cursor:pointer" onclick="getMovieFromList(\'random\')">â“˜</a> Get Random Info (matching search)</span></br >');
	body.append('<span><a style="cursor:pointer" onclick="getYouTube(\'#movielist\')">âœ›</a> Add Random Trailer (matching search)</span><br />');
	body.append('<span><a style="cursor:pointer" onclick="nominateMovie(\'\', \'#movielist\')">âœ‡</a> Nominate Random Movie (matching search)</span><br />');
	if (CLIENT.name === 'ChillTVBot') {
		body.append('<span><a style="cursor:pointer" onclick="unshareAll(\'#movielist\')">U</a> Unshare All</span><br />');
	}
	body.append('<ul id="marathonlist" style="padding-left: 0;"><button style="padding: 0px 5px; color: rgb(0, 0, 0); border-width: 1px; background-color: inherit; font-weight: 900; border-color: black;" class="marathonexpand">â–¼</button><span> Marathon List</span></ul>');
	for (var mal = 0; mal < Marathon_List.length; mal++) {
		$('#marathonlist').html($('#marathonlist').html() + '<li style="display: none; margin-left: 40px;"><ul class="marathon" style="padding-left: 0;"><button style="padding: 0px 5px; color: rgb(0, 0, 0); border-width: 1px; background-color: inherit; font-weight: 900; border-color: black;" class="marathonexpand">â–¼</button> ' + Marathon_List[mal][0] + '</ul></li>');
		for (var mwl = 1; mwl < Marathon_List[mal].length; mwl++) {
			$('.marathon:last').html($('.marathon:last').html() + '<li style="display: none; margin-left: 40px;">' + Marathon_List[mal][mwl] + '</li>');
		}
	}
	$('.marathonexpand').hover(function() {
		$(this).css({'color': 'grey', 'border-color': 'grey'});
	}, function() {
		$(this).parent().children('li').is(':hidden') ? $(this).css({'color': 'black', 'border-color': 'black'}) : $(this).css({'color': 'white', 'border-color': 'white'});
	}).click(function() {
		if ($(this).parent().children('li').is(':hidden')) {
			$(this).parent().children('li').show();
			$(this).text('â–²').attr('style', 'background-color: inherit;font-weight: 900;padding: 0 6px 0 7px;border-width: 1px;color: white;border-color: white');
		} else if ($(this).parent().children('li').is(':visible')) {
			$(this).parent().children('li').hide();
			$(this).text('â–¼').attr('style', 'background-color: inherit;font-weight: 900;padding: 0 5px 0 5px;border-width: 1px;color: black;border-color: black');
		}
	});
	body.append('<span class="text-info trailertext" /><br />');
	if (CLIENT.name === 'ChillTVBot') {
		body.append('<span id="numofuns" class="text-info">Items Unshared: <span class="unshared">'+unshared+'</span> | Items Untouched: <span class="untouched">'+untouched+'</span> | Files Skipped: <span class="skipped">'+skipped+'</span> | Files Iterated: <span class="numfiles">'+numfiles+'</span></span>');
	}
	DESC = true;
	body.append('<center><div id="sortby" style="margin: 5px 0 5px 0"><div style="width: 15%;display: inline-block;font-weight: 900">Sort: </div><div style="width: 15%;display: inline-block"><a id="desc" style="font-weight:900;text-decoration:underline">Descâ®Ÿ</a> <a id="asc" style="cursor:pointer">Ascâ®</a></div><div id="sortboxes" style="width:70%;display:inline-block"><label class="checkbox-inline sortby"><input type="checkbox" id="sortalpha" class="sortchecks" value="no"> Alphabetical</label><label class="checkbox-inline sortby"><input type="checkbox" class="sortchecks" id="sortyear" value="no"> Year</label><label class="checkbox-inline sortby"><input type="checkbox" id="sortmpaa" class="sortchecks" value="no"> MPAA</label><label class="checkbox-inline sortby"><input type="checkbox" id="sortimdb" class="sortchecks" value="no"> IMDb</label><label class="checkbox-inline sortby"><input type="checkbox" id="sortrt" class="sortchecks" value="no"> RT</label><label class="checkbox-inline sortby"><input type="checkbox" id="sortmeta" class="sortchecks" value="no"> Meta</label><button id="moviereset" class="btn btn-xs btn-default" style="width:20%; margin-left:30px;" disabled>Reset</button></div></div></center>');
	RESET = false;
	$("#asc").on('click.cend', function() {
		changeCend($(this));
	});
	sortid = $("#sortby");
	$('.sortchecks').click(function() {
		changeSort($(this).attr('id'));
	});
	//<li class="disabled"><a class="numberbtn" href="javascript:void(0)">1</a></li><li><a class="numberbtn" href="javascript:void(0)">2</a></li><li><a class="numberbtn" href="javascript:void(0)">3</a></li><li><a class="numberbtn" href="javascript:void(0)">4</a></li><li><a class="numberbtn" href="javascript:void(0)">5</a></li><li><a class="numberbtn" href="javascript:void(0)">6</a></li><li><a class="numberbtn" href="javascript:void(0)">7</a></li>
	body.append('<center><ul id="moviepage" class="pagination" style="width:100%"><li class="disabled"><a href="javascript:void(0)" style="width:15%">First</a></li><li class="disabled"><a href="javascript:void(0)" style="width:15%">Â«</a></li><li class="disabled"><span id="showing" class="text-info" style="width:40%;cursor:auto;color:#93c !important" disabled>Showing 1-20 of 2761</span></li><li><a href="javascript:void(0)" style="width:15%">Â»</a></li><li><a href="javascript:void(0)" style="width:15%">Last</a></li></ul></center>');
	body.append('<table id="movielist" style="list-style:none;padding-left:0" ></table>');
	filterMovies('', '', '', $("#mlinfo"));
	$('#moviepage > li > a').on('click.page', function() {
		$('#moviepage > li').removeClass('disabled').children('a').attr('style', 'width:15%;pointer-events:auto');;
		buttontype = $(this).text();
		if (buttontype === 'First') {
			$(this).parent().addClass('disabled').children('a').attr('style', 'width:15%;pointer-events:none');
			$(this).parent().next().addClass('disabled').children('a').attr('style', 'width:15%;pointer-events:none');
			//$(this).parent().next().next().addClass('disabled').children('a').attr('style', 'pointer-events:none');
			//buttonindex = 2;
			/*nbtn = 1;
			$('.numberbtn').each(function(ind) {
				$(this).text(nbtn + ind);
			});*/
			indexone = 0;
			indextwo = 20;
			$("#showing").text('Showing ' + (indexone + 1) + '-' + indextwo + ' of ' + moviearray.length).parent().addClass('disabled');
			listMovies(moviearray, indexone, indextwo);
		}
		if (buttontype === 'Â«') {
			/*if (nbtn > 1) {
				//buttonindex -= 1;
				nbtn -= 1;
				$('.numberbtn').each(function(ind) {
					$(this).text(nbtn + ind);
				});
			}
			if (nbtn <= 4) {
				$('#moviepage > li').eq(nbtn + 1).addClass('disabled').children('a').attr('style', 'pointer-events:none');
			}*/
			indexone -= 20;
			indextwo -= 20;
			if (indexone === 0) {
				$(this).parent().addClass('disabled').children('a').attr('style', 'width:15%;pointer-events:none');
				$(this).parent().prev().addClass('disabled').children('a').attr('style', 'width:15%;pointer-events:none');
			}
			$("#showing").text('Showing ' + (indexone + 1) + '-' + indextwo + ' of ' + moviearray.length).parent().addClass('disabled');
			listMovies(moviearray, indexone, indextwo);
			
		}
		/*if (buttontype.match(/\d+/)) {
			$(this).parent().addClass('disabled').children('a').attr('style', 'pointer-events:none');
			//buttonindex = $(this).parent().index();
			nbtn += parseInt(buttontype) - nbtn;
			$('.numberbtn').each(function(ind) {
				$(this).text(nbtn + ind);
			});
			indexone = (20 * parseInt(buttontype)) - 20;
			indextwo = indexone + 20;
			if (indextwo >= moviearray.length) {
				indextwo = moviearray.length
				$(this).parent().next().addClass('disabled').children('a').attr('style', 'pointer-events:none');
				$(this).parent().next().next().addClass('disabled').children('a').attr('style', 'pointer-events:none');
			}
			if (indexone === 0 ) {
				$(this).parent().prev().addClass('disabled').children('a').attr('style', 'pointer-events:none');
				$(this).parent().prev().prev().addClass('disabled').children('a').attr('style', 'pointer-events:none');
			}
			listMovies(moviearray, indexone, indextwo);
		}*/
		if (buttontype === 'Â»') {
			/*if (nbtn <= (pagelength - buttonlength)) {
				//buttonindex += 1;
				nbtn += 1;
				$('.numberbtn').each(function(ind) {
					$(this).text(nbtn + ind);
				});
			}
			if (nbtn  <= (pagelength - buttonlength)) {
				$('#moviepage > li').eq((nbtn - pagelength) + 14).addClass('disabled').children('a').attr('style', 'pointer-events:none');
			}*/
			indexone += 20;
			indextwo += 20;
			if (indextwo >= moviearray.length) {
				indextwo = moviearray.length
				$(this).parent().addClass('disabled').children('a').attr('style', 'width:15%;pointer-events:none');
				$(this).parent().next().addClass('disabled').children('a').attr('style', 'width:15%;pointer-events:none');
			}
			$("#showing").text('Showing ' + (indexone + 1) + '-' + indextwo + ' of ' + moviearray.length).parent().addClass('disabled');
			listMovies(moviearray, indexone, indextwo);
		}
		if (buttontype === 'Last') {
			$(this).parent().addClass('disabled').children('a').attr('style', 'width:15%;pointer-events:none');
			$(this).parent().prev().addClass('disabled').children('a').attr('style', 'width:15%;pointer-events:none');
			//$(this).parent().prev().prev().addClass('disabled').children('a').attr('style', 'pointer-events:none');
			//buttonindex = 8;
			/*nbtn = pagelength - buttonlength;
			if (nbtn > 0) {
				$('.numberbtn').each(function(ind) {
					$(this).text(nbtn + 1 + ind);
				});
			}*/
			indexone = moviearray.length - (moviearray.length % 20);
			indextwo = moviearray.length;
			if (indexone === indextwo) {
				indexone -= 20;
			}
			$("#showing").text('Showing ' + (indexone + 1) + '-' + indextwo + ' of ' + moviearray.length).parent().addClass('disabled');
			listMovies(moviearray, indexone, indextwo);
		}
	});
	/*for (var i = 0, i < Movie_Array.length; i++) {
		if (Movie_Array[i][3] !== undefined && Movie_Array[i][3] === 'Recently Added') { //onclick="addShare(\'' + Movie_Array[i][2] + '\', \'' + Movie_Array[i][3] + '\', \'' + Movie_Array[i][4] + '\', \'' + Movie_Array[i][5] + '\', \'' + Movie_Array[i][6] + '\', \'#movielist\', \'' + str + '\')"
			recentlyadded += '<li style="display: block;"><span><a style="cursor:pointer" class="gmfl">â“˜</a> <a style="cursor:pointer" class="gyt">âœ›</a> <a style="cursor:pointer" class="nmm">âœ‡</a> ' + Movie_Array[i][0] + ' - <b><i>Recently Added</i></b></span><span class="pull-right">' + Movie_Array[i][1] + '</span></li>';
			//lastra = '<li style="display: block;"><span><a style="cursor:pointer" class="gmfl">â“˜</a> <a style="cursor:pointer" class="gyt">âœ›</a> <a style="cursor:pointer" class="nmm">âœ‡</a> ' + Movie_Array[i][0] + ' - <b><i>Recently Added</i></b></span><span class="pull-right">' + Movie_Array[i][1] + '</span></li>';
		} else {
			text += '<li style="display: block;"><span><a style="cursor:pointer" class="gmfl">â“˜</a> <a style="cursor:pointer" class="gyt">âœ›</a> <a style="cursor:pointer" class="nmm">âœ‡</a> ' + Movie_Array[i][0] + '</span><span class="pull-right">' + Movie_Array[i][1] + '</span></li>';
		}
	}*/
	//recentlyadded = recentlyadded.replace('style="display: block;"', 'style="display: block;margin: 5px 0 0 0"').replace(lastra, lastra.replace('style="display: block;"', 'style="display: block;margin: 0 0 5px 0"'));
	/*$('.gmfl').click(function() {
		getMovieFromList($(this).parent().text().split('â“˜ âœ› âœ‡ ')[1]);
	});
	$('.gyt').click(function() {
		getYouTube('', $(this).parent().text().split('â“˜ âœ› âœ‡ ')[1] + ' trailer', 'end');
	});
	$('.nmm').click(function() {
		nominateMovie($(this).parent().text().split('â“˜ âœ› âœ‡ ')[1], '#movielist');
	});*/
	//clonedmovie = $('#movielist').children().clone();
	$("#moviereset").click(function() {
		if (RESET) {
			RESET = false;
			$("#moviereset").attr('disabled', true);
			DESC = true;
			$("#asc, #desc").off('click.cend')
			$("#asc").on('click.cend', function() {
				changeCend($(this));
			});
			$("#asc").attr('style', 'cursor:pointer;font-weight:normal;text-decoration:none');
			$("#desc").attr('style', 'cursor:auto;font-weight:900;text-decoration:underline');
			sortid = $("#sortby");
			$('.sortchecks').prop('checked', false).prop('disabled', false);
			$("#mlistquery, #ylistquery, #glistquery").val('');
			filterMovies('', '', '', $("#mlinfo"));
		}
	});
	//num = $("#movielist li[style='display: block;']").length;
	//$("#mlinfo").text(num + ' movies');
	$("#mlistquery, #ylistquery, #glistquery").keyup(function() {
		$("#mlinfo").text('Searching. Please wait...');
		if ($("#mlistquery").val().trim() !== '') {
			mval = $("#mlistquery").val().trim().replace(/\s+/, ' ').replace(/[-[\]{}()*+?.,\\^$|#]/g, '\\$&');
			mvalsplit = mval.split(' ');
			mlistquery = '';
			for (var mv = 0; mv < mvalsplit.length; mv++) {
				mlistquery += '(?=.*' + mvalsplit[mv] + '.*\\(\\d{4}\\).*|.*\\(\\d{4}\\).*' + mvalsplit[mv] + '.*)';
			}
			mlistquery += '.*';
		} else {
			mlistquery = '';
		}
		yval = $("#ylistquery").val().trim()
		if (yval !== '') {
			if (yval.match(/\d{4}(-|â€“)\d{0,4}/)) {
				firstyear = parseInt(yval.match(/(\d{4})(-|â€“)/)[1]);
				if (firstyear < 1900) {
					firstyear = 1900;
				}
				secondyear = yval.match(/(-|â€“)(\d{0,4})/)[2];
				if (secondyear === '' || parseInt(secondyear) > (new Date).getFullYear()) {
					secondyear = (new Date).getFullYear();
				} else {
					secondyear = parseInt(secondyear);
				}
				if (firstyear <= secondyear) {
					yearrange = [];
					for (var yr = firstyear; yr <= secondyear; yr++) {
						if (yr <= secondyear) {
							yearrange.push(yr);
						}
					}
				} else {
					yearrange = [firstyear];
				}
				ylistquery = '\\((' + yearrange.toString().replace(/,/g, '|') + ')\\)';
			} else {
				ylistquery = '\\(\\d*' + yval.replace(/[-[\]{}()*+?.,\\^$|#]/g, '\\$&') + '\\d*\\)';
			}
		} else {
			ylistquery = '';//(?=.*\bunrated\b)(?=.*\bstory\b)
		}
		if ($("#glistquery").val().trim() !== '') {
			gval = $("#glistquery").val().trim().split(/,$/)[0].replace(/\s+/, ' ').replace(/[-[\]{}()*+?.\\^$|#]/g, '\\$&');
			gvalsplit = gval.split(/, | /);
			glistquery = '';
			for (var gv = 0; gv < gvalsplit.length; gv++) {
				glistquery += '(?=.*' + gvalsplit[gv] + ')'
			}
			glistquery += '.*';
		} else {
			glistquery = '';
		}
		//searchStringInArray(mlistquery, ylistquery, glistquery, $("#mlinfo"));
		filterMovies(mlistquery, ylistquery, glistquery, $("#mlinfo"));
	});
}

function createMovieList() {
	createTemp('Nominate a Movie from This List');
	$("body").css('overflow', 'hidden');
	outer.attr('id', 'mlistmodal').children('.modal-dialog.modal-dialog-nonfluid').attr('style', 'max-width: 1000px !important');
	$("#mlistmodal").on("hidden.bs.modal", function() {
		MOVLIST = false;
		$("#mlistmodal").remove();
		$("body").css('overflow', 'auto');
		scrollChat();
	});
	$('<center id="searchinputs" />').appendTo(body);
	$('<input id="mlistquery" class="form-control" style="width:33%;display:inline-block;" type="text" placeholder="Search Title" maxlength="240" />').appendTo($("#searchinputs"));
	$('<input id="ylistquery" class="form-control" style="width:33%;display:inline-block;" type="text" placeholder="Search Year (or range)" maxlength="240" />').appendTo($("#searchinputs"));
	$('<input id="glistquery" class="form-control" style="width:33%;display:inline-block;" type="text" placeholder="Search Genre(s)" maxlength="240" />').appendTo($("#searchinputs"));
	body.append('<span id="mlinfo" class="text-info" /><br />');
	setTimeout(function() {
		$("#mlistquery").focus();
	}, 250);
	MOVLIST = true;
	if (MOVIELOADED) {
		appendMovieList();
	} else {
		$("#mlinfo").text('Loading Movies. Please wait...');
	}
}

function searchStringInArray(mstr, ystr, gstr, info) {
	if (mstr !== '' || ystr !== '' || gstr !== '') {
		$("#movielist > li > span:first-child").filter(function(index) {
			return $(this).text().match(RegExp(mstr, 'i')) === null || $(this).text().match(RegExp(ystr)) === null || $(this).next().text().match(RegExp(gstr, 'i')) === null;
		}).parent().hide();
		$("#movielist > li > span:first-child").filter(function(index) {
			return $(this).text().match(RegExp(mstr, 'i')) && $(this).text().match(RegExp(ystr)) && $(this).next().text().match(RegExp(gstr, 'i'));
		}).parent().show();
		/*
		$("#movielist").find("li > span:first-child:not(:Contains(" + mstr + "))").parent().hide();
		$("#movielist").find("li:not(:Contains(" + ystr + "))").hide();
		$("#movielist").find("li:not(:Contains(" + gstr + "))").hide();
		$("#movielist").find("li:Contains(" + nstr + ")").show();
		*/
		num = $("#movielist li:visible").length;
		info.text('Found ' + num + ' movies matching "' + $("#mlistquery").val().trim()  + '" | "' + $("#ylistquery").val().trim() + '" | "' + $("#glistquery").val().trim()  + '"');
	} else {
		$("#movielist").children().show();
		num = $("#movielist li:visible").length;
		info.text(num + ' movies');
	}
	$(".trailertext").text('');
}

function getMovieFromList(str) {
	injectIMDB();
	setTimeout(function() {
		$("#movie_input").focus();
	}, 250);
	if (str !== undefined) {
		if (str === 'random') {
			stri = moviearray[Math.floor(Math.random() * moviearray.length)][0];
		} else {
			stri = str;
		}
		getMovies(stri)
	}
}

var GOBACKBUTTON = false;

function getMovies(sMovie, pagenum) {
	MContainer.prepend('<center class="text-info"><span>Searching. Please wait...</span></center>');
	if (!sMovie) {
		return
	}
	arr = sMovie.split(' (');
	som = encodeURIComponent(arr[0]);
	if (sMovie.match(/\([0-9][0-9][0-9][0-9]\)/)) {
		matches = sMovie.match(/\(([0-9][0-9][0-9][0-9])\)/);
		matches1 = matches[1];
	} else if (sMovie.match(/\([0-9][0-9][0-9][0-9]â€“/)) {
		matches = sMovie.match(/\(([0-9][0-9][0-9][0-9])â€“/);
		matches1 = matches[1];
	} else {
		matches1 = '';
	}
	if (matches1.length > 0) {
		sUrl = 'https://cors-anywhere.herokuapp.com/http://www.omdbapi.com/?t=' + som + '&y=' + matches1 + '&plot=full&tomatoes=true&totalSeasons=true&apikey=' + omdbkey;
		$.ajax(sUrl, {
			error: function(data) {
				MContainer.find('.text-info').text('Connection Error: Try again later.');
				MContainer.show();
			},
			complete: function(data) {
				oData = $.parseJSON(data.responseText);
				//rurl = 'https://www.rottentomatoes.com/search/?search=' + encodeURIComponent(som);
				if (oData.Title !== undefined) {
					if (GOBACKBUTTON) {
						gobackbutton.prependTo(MContainer);
						$("#gobackbutton").click(function() {
							gobackbutton.remove();
							GOBACKBUTTON = false;
						});
					}
					MContainer.find('.text-info').remove();
					$("#listthem").children().remove();
					$("#listep").children().remove();
					MContainer.show();
					MContainer.children().show();
					url = "http://www.imdb.com/title/" + oData.imdbID;
					url2 = 'http://www.imdb.com/find?s=all&q=' + encodeURIComponent(som + ' ' + matches1);
					MContainer.find('.movieposter').html('<tr><th style="width:101px;"><img class="posterimage" style="cursor:pointer;" height="150" src="'+oData.Poster+'" /></th><th><table style="width:100%;"><tr><th style="float:left;margin-left:10px;"><h3 class="movietitle"></h3></th></tr><tr><th style="float:left;margin-left:10px;"><a style="cursor:pointer" class="addtrailer"></a></th><th style="float:right;margin-right:10px;"><a style="cursor:pointer" class="addmovie"></a></th></tr></table></th></tr>')
					MContainer.find('.posterimage').click(function() {
						window.open(oData.Poster, '_blank');
					});
					MContainer.find('.movietitle').text(oData.Title + ' (' + oData.Year + ')');
					$('.addtrailer').click(function() {
						getYouTube('', oData.Title + ' trailer', 'end');
					}).text('Add Trailer');
					if (oData.Type === 'movie') {
						for (var am = 0; am < Movie_Array.length; am++) {
							try {
							moviechop = Movie_Array[am][0].match(/ \(\d{4}\)(.*)/)[1];
							}
							catch (err) {
								console.log(err + ' at ' + am);
							}
							if (moviechop.length > 0) {
								moviename = Movie_Array[am][0].split(moviechop)[0];
							} else {
								moviename = Movie_Array[am][0];
							}
							if (moviename.toLowerCase() === oData.Title.toLowerCase() + ' (' + oData.Year + ')') {
								$('.addmovie').click(function() {
									nominateMovie(Movie_Array[am][0], '#movielist');
								}).text('Nominate Movie');
								break;
							}
							if (am === Movie_Array.length - 1) {
								$('.addmovie').click(function() {
									window.open("http://goo.gl/forms/5fK5rDjTjD");
								}).text('Request This');
							}
						}
					} else {
						for (var at = 0; at < TV_Array.length; at++) {
							if (TV_Array[at][0].match(/\([0-9][0-9][0-9][0-9]/)) {
								if (TV_Array[at][0].toLowerCase() === oData.Title.toLowerCase() + ' (' + oData.Year + ')') {
									$('.addmovie').click(function() {
										//addShare(TV_Array[at+1][2], TV_Array[at+1][3], TV_Array[at+1][4], TV_Array[at+1][5], TV_Array[at+1][6], '.serieslist', TV_Array[at+1][0]);
										viewSeasons(oData.Title, oData.Year, oData.Poster, oData.totalSeasons);
									}).text('View Episodes');
									break;
								}
							}
							if (at === TV_Array.length - 1) {
								$('.addmovie').click(function() {
									window.open("http://goo.gl/forms/5fK5rDjTjD");
								}).text('Request This');
							}
						}
					}
					MContainer.find('.movieinfo').text(oData.Rated + ' | ' + oData.Runtime + ' | ' + oData.Genre + ' | ' + oData.Released + ' | IMDb Rating: ' + oData.imdbRating + ' from ' + oData.imdbVotes + ' users | Metascore: ' + oData.Metascore);
					MContainer.find('.movieplot').text(oData.Plot);
					MContainer.find('.moviecast').text('Directors: ' + oData.Director + ' | Writers: ' + oData.Writer + ' | Actors: ' + oData.Actors);
					MContainer.find('.movieother').text(oData.Language + ' | ' + oData.Country + ' | ' + oData.Awards);
					MContainer.find('.plink').text('More Info: ');
					MContainer.find('.imdblink').attr({
						'href': url,
						'target': '_blank'
					}).text(url);
					if (oData.Ratings[1] !== undefined && oData.Ratings[1].Source === 'Rotten Tomatoes') {
						tomatorating = oData.Ratings[1].Value;
					} else {
						tomatorating = 'N/A';
					}
					MContainer.find('.rtinfo').text('Tomato Meter: ' + tomatorating + ' ' + oData.tomatoImage + ' | Average Rating: ' + oData.tomatoRating + ' | Reviews Counted: ' + oData.tomatoReviews + ', Fresh: ' + oData.tomatoFresh + ', Rotten: ' + oData.tomatoRotten);
					MContainer.find('.rtplot').text('Critics Consensus: ' + oData.tomatoConsensus);
					MContainer.find('.rtcast').text('Users: ' + oData.tomatoUserMeter + '% liked it, ' + oData.tomatoUserRating + '/5 average rating, ' + oData.tomatoUserReviews + ' reviews');
					MContainer.find('.prtlink').text('More Info: ');
					rurl = oData.tomatoURL;
					MContainer.find('.rtlink').attr({
						'href': rurl,
						'target': '_blank'
					}).text(rurl);
				} else {
					theList(som, pagenum);
				}
			}
		});
	} else {
		theList(som, pagenum);
	}
}

function totalSeasons(stitle, syear) {
	MContainer.find('.text-info').show().text('Searching. Please wait...');
	$.ajax('https://cors-anywhere.herokuapp.com/http://www.omdbapi.com/?t=' + stitle + '&y=' + syear + '&plot=full&tomatoes=true&totalSeasons=true&apikey=' + omdbkey, {
		error: function(data) {
			MContainer.find('.text-info').text('Connection Error: Please refresh or try again later.');
			MContainer.show();
		},
		success: function(data) {
			MContainer.children().hide();
			MContainer.children().text('');
			viewSeasons(data.Title, data.Year, data.Poster, data.totalSeasons);
		}
	});
}

function viewSeasons(stitle, syear, sposter, tseasons) {
	MContainer.children().hide();
	MContainer.children().text('');
	$("#listthem").children().remove();
	$("#listep").children().remove();
	$("#listep").show();
	if (GOBACKBUTTON) {
		gobackbutton.prependTo("#listep");
		$("#gobackbutton").click(function() {
			gobackbutton.remove();
			GOBACKBUTTON = false;
		});
	}
	sstri = stitle.replace(/'/g, "\\'");
	$('<br /><center><table style="width:100%;"><tr><th style="width: 67px"><img style="width: 67px" src="' + sposter + '" /></th><th><table style="width:100%"><tr><th style="float:left;"><a style="margin-left:10px;font-size:20px;cursor:pointer;" onclick="getMovies(\'' + sstri + ' (' + syear + ')\')"> ' + stitle + ' (' + syear + ')</a></th></tr><tr ><th style="float:left;margin-left:10px"><a style="cursor:pointer" onclick="getYouTube(\'\', \'' + sstri + ' trailer\', \'end\')">Add Trailer</a></th><th style="float:right;margin-right:10px"></th></tr></table></th></tr></table></center>').appendTo("#listep");
	$('<br /><br /><div id="beforeall"><div id="addseason"></div></div>').appendTo("#listep");
	seasonslength = parseInt(tseasons);
	seasons = 'Seasons: ';
	for (var sl = 0; sl < seasonslength; sl++) {
		seasonnumber = sl + 1;
		seasons += '<a style="cursor:pointer" onclick="callEps(\'' + stitle + '\', \'' + syear + '\', \'' + seasonnumber + '\')">' + seasonnumber + '</a>  ';
	}
	$("#addseason").html(seasons);
}

function callEps(stitle, syear, season) {
	$("#beforeall").nextAll().remove();
	$.ajax('https://cors-anywhere.herokuapp.com/http://www.omdbapi.com/?t=' + stitle + '&Season=' + season + '&y=' + syear + '&apikey=' + omdbkey, {
		error: function(data) {
			console.log(data);
			MContainer.find('.text-info').text('Connection Error: Please refresh or try again later.');
			MContainer.show();
		},
		success: function(data) {
			epdata = data.Episodes;
			for (var ep = 0; ep < epdata.length; ep++) {
				data.Season.length === 1 ? seasonzero = '0' : seasonzero = '';
				epdata[ep].Episode.length === 1 ? episodezero = '0' : episodezero = '';
				$("#listep").append('<br><br><span style="float:left;">S' + seasonzero + data.Season + 'E' + episodezero + epdata[ep].Episode + ' - ' + epdata[ep].Title + '</span><span class="addorrequest" style="float:right;"><a style="cursor:pointer" onclick="nominateTV(\'' + data.Title.replace(/'/g, "\\'") + ' (' + syear + ') S' + seasonzero + data.Season + 'E' + episodezero + epdata[ep].Episode + ' - ' + epdata[ep].Title.replace(/'/g, "\\'") + '\', \'.serieslist\')">Nominate Episode</a></span><br><span>' + epdata[ep].Released + ' | IMDb Rating: ' + epdata[ep].imdbRating + '</span>');
			}
		},
		
	});
}
/*
function callCheck(deps, ep, stitle, syear, sseason, li, eparray, sspl, ssfo, sposter) {
	SAMESEASON = false;
	$("#beforeall").nextAll().remove();
	LEZAGO = false;
	$.ajax('https://cors-anywhere.herokuapp.com/http://www.omdbapi.com/?t=' + stitle + '&y=' + syear + '&Season=' + sseason + '&Episode=' + ep + '&apikey=' + omdbkey, {
		error: function(data) {
			MContainer.find('.text-info').text('Connection Error: Please refresh or try again later.');
			MContainer.show();
		},
		success: function(data) {
			LEZAGO = true;
		},
		complete: function(data) {
			if (LEZAGO) {
				SAMESEASON = true;
				$("#beforeall").nextAll().remove();
				callEp(deps, ep, stitle, syear, sseason, li, eparray, sspl, ssfo, sposter);
			}
		}
	});
}

function callEp(deps, ep, stitle, syear, sseason, li, eparray, sspl, ssfo, sposter) {
	EPSUCCESS = false;
	if (eparray.indexOf(ep) > -1 && SAMESEASON) {
		$.ajax('https://cors-anywhere.herokuapp.com/http://www.omdbapi.com/?t=' + stitle + '&y=' + syear + '&Season=' + sseason + '&Episode=' + ep + '&apikey=' + omdbkey, {
			error: function(data) {
				console.log(data);
				MContainer.find('.text-info').text('Connection Error: Please refresh or try again later.');
				MContainer.show();
			},
			success: function(data) {
				if (SAMESEASON) {
					etitle = data.Title;
					ereleased = data.Released;
					eseason = data.Season;
					if (parseInt(eseason) < 10) {
						eseason = '0' + eseason;
					}
					eepisode = data.Episode;
					if (parseInt(eepisode) < 10) {
						eepisode = '0' + eepisode;
					}
					eruntime = data.Runtime;
					eplot = data.Plot;
					eposter = data.Poster;
					eimdbrating = data.imdbRating;
					eimdbvotes = data.imdbVotes;
					eimdbid = data.imdbID;
					EPSUCCESS = true;
				}
			},
			complete: function(data) {
				if (SAMESEASON) {
					BREAKFREE = false;
					if (EPSUCCESS) {
						$('<br /><br /><span style="float:left;">S' + eseason + 'E' + eepisode + ' - ' + etitle + '</span><span class="addorrequest" style="float:right;"></span><br /><span>' + eruntime + ' | ' + ereleased + ' | IMDb Rating: ' + eimdbrating + ' from ' + eimdbvotes + ' users</span><br /><span>' + eplot + '</span>').appendTo($("#listep"));
						for (var dir = 0; dir < TV_Array.length; dir++) {
							if (SAMESEASON) {
								if (TV_Array[dir][2] === undefined) {
									if (TV_Array[dir][0].toLowerCase() === stitle.toLowerCase() + ' (' + syear + ')') {
										posish = dir+1;
										for (var ne = posish; ne < TV_Array.length; ne++) {
											if (SAMESEASON) {
												if (TV_Array[ne][0].indexOf('S' + eseason + 'E' + eepisode) === 0) {
													str = TV_Array[ne][0].replace(/'/g, "\\'");
													$('.addorrequest:eq('+li+')').html('<a style="cursor:pointer" onclick="nominateTV(\'' + str + '\', \'.serieslist\')">Nominate Episode</a>');
													BREAKFREE = true;
													break;
												}
												if (TV_Array[ne][2] === undefined) {
													break;
												}
											} else {
												break;
											}
										}
										if (BREAKFREE) {
											break;
										}
									}
								}
								if (dir === TV_Array.length - 1) {
									$('.addorrequest:eq('+li+')').html('<a style="cursor:pointer" >Request This</a>').click(function() {
										window.open("http://goo.gl/forms/5fK5rDjTjD");
									});
								}
							} else {
								break;
							}
						}
						if (parseInt(li) + 1 <= deps && SAMESEASON) {
							eppa = parseInt(ep) + 1;
							lipa = parseInt(li) + 1;
							callEp(deps, eppa.toString(), stitle, syear, sseason, lipa.toString(), eparray, sspl, ssfo, sposter);
						}
					}
				}
			}
		});
	} else if (parseInt(ep) <= parseInt(eparray[eparray.length - 1])) {
		if (parseInt(sseason) < 10) {
			sseason = '0' + sseason;
		}
		if (parseInt(ep) < 10) {
			ep = '0' + ep;
		}
		BREAKFREE = false;
		for (var ske = 0; ske < TV_Array.length; ske++) {
			if (SAMESEASON) {
				if (TV_Array[ske][2] === undefined) {
					if (TV_Array[ske][0].toLowerCase() === stitle.toLowerCase() + ' (' + syear + ')') {
						posish = ske+1;
						for (var nex = posish; nex < TV_Array.length; nex++) {
							if (SAMESEASON) {
								if (TV_Array[nex][0].indexOf('S' + sseason + 'E' + ep) === 0) {
									str = TV_Array[nex][0].replace(/'/g, "\\'");
									$('<br /><br /><span style="float:left;">S' + sseason + 'E' + ep + ' - N/A</span><span class="addorrequest" style="float:right;"></span><br /><span>N/A | N/A | IMDb Rating: N/A</span><br /><span>N/A</span>').appendTo($("#listep"));
									$('.addorrequest:eq('+li+')').html('<a style="cursor:pointer" onclick="nominateTV(\'' + str + '\', \'.serieslist\')">Nominate Episode</a>');
									BREAKFREE = true;
									break;
								}
								if (TV_Array[nex][2] === undefined) {
									break;
								}
							} else {
								break;
							}
						}
						if (BREAKFREE) {
							break;
						}
					}
				}
				if (ske === TV_Array.length - 1) {
					$('.addorrequest:eq('+li+')').html('<a style="cursor:pointer" >Request This</a>').click(function() {
						window.open("http://goo.gl/forms/5fK5rDjTjD");
					});
				}
			} else {
				break;
			}
		}
		if (parseInt(li) + 1 <= deps && SAMESEASON) {
			eppa = parseInt(ep) + 1;
			lipa = parseInt(li) + 1;
			callEp(deps, eppa.toString(), stitle, syear, sseason, lipa.toString(), eparray, sspl, ssfo, sposter);
		}
	}
}
*/
function theList(som, pagenum, goback) {
	MContainer.children().hide();
	MContainer.children().text('');
	MContainer.find('.text-info').show().text('Searching. Please wait...');
	$("#listthem").children().remove();
	$("#listep").children().remove();
	$.ajax('https://cors-anywhere.herokuapp.com/http://www.omdbapi.com/?s=' + som + '&y=&page=' + pagenum + '&apikey=' + omdbkey, {
		error: function(data) {
			MContainer.find('.text-info').text('Connection Error: Please refresh or try again later.');
			MContainer.show();
		},
		success: function(data) {
			MContainer.find('.text-info').remove();
			strsom = som.replace(/'/g, "\\'");
			gobackbutton = $('<button id="gobackbutton" class="btn btn-sm btn-default" style="margin-bottom:10px" onclick="theList(\''+strsom+'\', '+pagenum+')">â‡¦ Back</button><br />');
			GOBACKBUTTON = true;
			thesearchresults = data.Search;
			$('<center><button style="float:left;margin:5px 0 5px 0;" class="btn btn-sm btn-default backbutton"><<</button><span class="text-info trailertext"></span><button style="float:right;margin:5px 0 5px 0;" class="btn btn-sm btn-default forwardbutton">>></button></center>').prependTo($("#listthem"));
			for (var li = 0; li < thesearchresults.length; li++) {
				stri = thesearchresults[li].Title.replace(/'/g, "\\'");
				$("#listthem").append('<table style="width:100%;border-bottom: 1px solid white;border-top: 1px solid white;"><tr><th style="width: 67px"><img style="width: 67px" src="' + thesearchresults[li].Poster + '" /></th><th><table style="width:100%"><tr><th style="float:left;"><a style="margin-left:10px;font-size:20px;cursor:pointer;" onclick="getMovies(\'' + stri + ' (' + thesearchresults[li].Year + ')\')"> ' + thesearchresults[li].Title + ' (' + thesearchresults[li].Year + ')</a></th></tr><tr ><th style="float:left;margin-left:10px"><a style="cursor:pointer" onclick="getYouTube(\'\', \'' + stri + ' trailer\', \'end\')">Add Trailer</a></th><th style="float:right;margin-right:10px" class="addorrequest"></th></tr></table></th></tr></table>');
				if (thesearchresults[li].Type === 'movie') {
					for (var aq = 0; aq < Movie_Array.length; aq++) {
						moviechop = Movie_Array[aq][0].match(/ \([0-9][0-9][0-9][0-9]\)(.*)/)[1];
						if (moviechop.length > 0) {
							moviename = Movie_Array[aq][0].split(moviechop)[0];
						} else {
							moviename = Movie_Array[aq][0];
						}
						if (moviename.toLowerCase() === thesearchresults[li].Title.toLowerCase() + ' (' + thesearchresults[li].Year + ')') {
							str = Movie_Array[aq][0];
							$('.addorrequest:eq('+li+')').html('<a style="cursor:pointer" onclick="nominateMovie(\'' + str + '\', \'#movielist\')">Nominate Movie</a>');
							break;
						}
						if (aq === Movie_Array.length - 1) {
							$('.addorrequest:eq('+li+')').html('<a style="cursor:pointer" >Request This</a>').click(function() {
								window.open("http://goo.gl/forms/5fK5rDjTjD");
							});
						}
					}
				} else {
					for (var dr = 0; dr < TV_Array.length; dr++) {
						if (TV_Array[dr][0].match(/\([0-9][0-9][0-9][0-9]/)) {
							if (TV_Array[dr][0].toLowerCase() === thesearchresults[li].Title.toLowerCase() + ' (' + thesearchresults[li].Year + ')') {
								str = thesearchresults[li].Title.replace(/'/g, "\\'");
								$('.addorrequest:eq('+li+')').html('<a style="cursor:pointer" onclick="totalSeasons(\''+str+'\', \''+thesearchresults[li].Year+'\')">View Episodes</a>');
								break;
							}
						}
						if (dr === TV_Array.length - 1) {
							$('.addorrequest:eq('+li+')').html('<a style="cursor:pointer" >Request This</a>').click(function() {
								window.open("http://goo.gl/forms/5fK5rDjTjD");
							});
						}
					}
				}
			}
			$('<center><button style="float:left;margin:5px 0 5px 0;" class="btn btn-sm btn-default backbutton"><<</button><button style="float:right;margin:5px 0 5px 0;" class="btn btn-sm btn-default forwardbutton">>></button></center>').appendTo($("#listthem"));
			totalresults = data.totalResults;
			totalpages = Math.ceil(totalresults / 10);
			nextpagenum = pagenum + 1;
			if (nextpagenum <= totalpages) {
				$(".forwardbutton").click(function() {
					getMovies(som + ' ()', nextpagenum);
				});
			} else {
				$(".forwardbutton").prop('disabled', true);
			}
			prevpagenum = pagenum - 1;
			if (prevpagenum > 0) {
				$(".backbutton").click(function() {
					getMovies(som + ' ()', prevpagenum);
				});
			} else {
				$(".backbutton").prop('disabled', true);
			}
		}
	});
	$("#listthem").show();	
}

var TVLIST = false;
$('<button id="tvlistbtn" class="btn btn-sm btn-default" title="Check out our TV List">TV List</button>').appendTo("#underplaylist").on("click", function() {
	createTVList();
});

TVKEYWAIT = setTimeout(function(){},1);
function appendTVList() {
	body.append('<span><a style="cursor:pointer" onclick="getMovieFromList()">â“˜</a> Get Info</span></br >');
	body.append('<span><a style="cursor:pointer" onclick="getYouTube(\'.serieslist\')">âœ›</a> Add Trailer</span><br />');
	body.append('<span><a style="cursor:pointer" onclick="nominateTV(\'\', \'.serieslist\')">âœ‡</a> Nominate Episode</span><br />');
	if (CLIENT.name === 'ChillTVBot') {
		body.append('<span><a style="cursor:pointer" onclick="unshareAll(\'.serieslist\')">U</a> Unshare All</span><br />');
	}
	body.append('<span class="text-info trailertext" /><br />');
	if (CLIENT.rank === 'ChillTVBot') {
		body.append('<span id="numofuns" class="text-info">Items Unshared: <span class="unshared">'+unshared+'</span> | Items Untouched: <span class="untouched">'+untouched+'</span> | Files Skipped: <span class="skipped">'+skipped+'</span> | Files Iterated: <span class="numfiles">'+numfiles+'</span></span>');
	}
	body.append('<div id="tvlist" />');
	text = '';
	recentlytv = '';
	RECENT = false;
	for (var tvi = 0; tvi < TV_Array.length; tvi++) {
		str = TV_Array[tvi][0].replace(/'/g, "\\'");
		if (TV_Array[tvi][2] !== undefined && TV_Array[tvi][2] !== 'Recently Added') {
			if (RECENT) {
				recentlytv += '<li style="display: none;padding-left: 60px;"><span><a style="cursor:pointer" onclick="nominateTV(\'' + showname + ' ' + str + '\', \'.serieslist\')">âœ‡</a> ' + TV_Array[tvi][0] + '</span></li>';
			} else {
				text += '<li style="display: none;padding-left: 60px;"><span><a style="cursor:pointer" onclick="nominateTV(\'' + showname + ' ' + str + '\', \'.serieslist\')">âœ‡</a> ' + TV_Array[tvi][0] + '</span></li>';
			}
		} else {
			if (TV_Array[tvi][2] === 'Recently Added') {
				RECENT = true;
				recentlytv += '</ul><ul class="serieslist" style="display: block; list-style: none; padding-left: 0px;"><button style="padding: 0 5px 0 5px;color: black;border-width: 1px;border-color: black;background-color: inherit;font-weight: 900;" class="seriesexpand" >â–¼</button> <a style="cursor:pointer" onclick="getMovieFromList(\'' + str + '\')">â“˜</a> <a style="cursor:pointer" onclick="getYouTube(\'\', \'' + str + ' trailer\', \'end\')">âœ›</a> <span class="seriestitle">' + TV_Array[tvi][0] + ' - <i><b>Recently Added</b></i></span><span class="pull-right">' + TV_Array[tvi][1] + '</span>';
				showname = str;
			} else {
				RECENT = false;
				text += '</ul><ul class="serieslist" style="display: block; list-style: none; padding-left: 0px;"><button style="padding: 0 5px 0 5px;color: black;border-width: 1px;border-color: black;background-color: inherit;font-weight: 900;" class="seriesexpand" >â–¼</button> <a style="cursor:pointer" onclick="getMovieFromList(\'' + str + '\')">â“˜</a> <a style="cursor:pointer" onclick="getYouTube(\'\', \'' + str + ' trailer\', \'end\')">âœ›</a> <span class="seriestitle">' + TV_Array[tvi][0] + '</span><span class="pull-right">' + TV_Array[tvi][1] + '</span>';
				showname = str;
			}
		}
	}
	$("#tvlist").append(recentlytv + text);
	$('.seriesexpand').hover(function() {
		$(this).css({
			'color': 'grey',
			'border-color': 'grey'
		});
	}, function() {
		$(this).parent().children('li').is(':hidden') ? $(this).css({
			'color': 'black',
			'border-color': 'black'
		}) : $(this).css({
			'color': 'white',
			'border-color': 'white'
		});
	}).click(function() {
		if ($(this).parent().children('li').is(':hidden')) {
			$(this).parent().children('li').show();
			$(this).text('â–²').attr('style', 'background-color: inherit;font-weight: 900;padding: 0 5px 0 5px;border-width: 1px;color: white;border-color: white');
		} else if ($(this).parent().children('li').is(':visible')) {
			$(this).parent().children('li').hide();
			$(this).text('â–¼').attr('style', 'background-color: inherit;font-weight: 900;padding: 0 5px 0 5px;border-width: 1px;color: black;border-color: black');
		}
	});
	num = $(".serieslist li").length;
	$("#tvlinfo").text(num + ' episodes');
	$("#tvmlistquery, #tvylistquery, #tvglistquery").keyup(function() {
		clearTimeout(TVKEYWAIT);
		$("#tvlinfo").text('Searching. Please wait...');
		TVKEYWAIT = setTimeout(function() {
			if ($("#tvmlistquery").val().trim() !== '') {
				tvmval = $("#tvmlistquery").val().trim().replace(/\s+/, ' ').replace(/[-[\]{}()*+?.,\\^$|#]/g, '\\$&');
				tvmvalsplit = tvmval.split(' ');
				tvmlistquery = '';
				for (var tvv = 0; tvv < tvmvalsplit.length; tvv++) {
					tvmlistquery += '(?=.*' + tvmvalsplit[tvv] + '.*\\(\\d{4}â€“{0,1}\\d{0,4}\\).*|.*\\(\\d{4}â€“{0,1}\\d{0,4}\\).*' + tvmvalsplit[tvv] + '.*)';
				}
				tvmlistquery += '.*';
			} else {
				tvmlistquery = '';
			}
			if ($("#tvylistquery").val().trim() !== '') {
				tvylistquery = '\\([\\dâ€“]*' + $("#tvylistquery").val().trim().replace(/[-[\]{}()*+?.,\\^$|#]/g, '\\$&').replace(/-/g, 'â€“') + '[\\dâ€“]*\\)';
			} else {
				tvylistquery = '';
			}
			if ($("#tvglistquery").val().trim() !== '') {
				tvgval = $("#tvglistquery").val().trim().split(/,$/)[0].replace(/\s+/, ' ').replace(/[-[\]{}()*+?.\\^$|#]/g, '\\$&');
				tvgvalsplit = tvgval.split(/, | /);
				tvglistquery = '';
				for (var tvgv = 0; tvgv < tvgvalsplit.length; tvgv++) {
					tvglistquery += '(?=.*' + tvgvalsplit[tvgv] + ')'
				}
				tvglistquery += '.*';
			} else {
				tvglistquery = '';
			}
			searchStringInArrayTV(tvmlistquery, tvylistquery, tvglistquery, $("#tvlinfo"));
		}, 500);
	});
}

function createTVList() {
	createTemp('Nominate/Add a TV Series from This List');
	$("body").css('overflow', 'hidden');
	outer.attr('id', 'tvlistmodal').children('.modal-dialog.modal-dialog-nonfluid').attr('style', 'max-width: 800px !important');
	$("#tvlistmodal").on("hidden.bs.modal", function() {
		TVLIST = false;
		$("#tvlistmodal").remove();
		$("body").css('overflow', 'auto');
		scrollChat();
	});
	$('<center id="tvsearchinputs" />').appendTo(body);
	$('<input id="tvmlistquery" class="form-control" style="width:33%;display:inline-block;" type="text" placeholder="Search Title" maxlength="240" />').appendTo($("#tvsearchinputs"));
	$('<input id="tvylistquery" class="form-control" style="width:33%;display:inline-block;" type="text" placeholder="Search Year" maxlength="240" />').appendTo($("#tvsearchinputs"));
	$('<input id="tvglistquery" class="form-control" style="width:33%;display:inline-block;" type="text" placeholder="Search Genre" maxlength="240" />').appendTo($("#tvsearchinputs"));
	body.append('<span id="tvlinfo" class="text-info" /><br />');
	setTimeout(function() {
		$("#tvmlistquery").focus();
	}, 250);
	if (TVLOADED) {
		appendTVList();
	} else {
		$("#tvlinfo").text('Loading Episodes. Please wait...');
	}
	TVLIST = true;
}

function searchStringInArrayTV(mstr, ystr, gstr, info) {
	if (mstr !== '' || ystr !== '' || gstr !== '') {
		/*$('.serieslist > li').filter(function(index) {
			return ($(this).parent().children('.seriestitle').eq(index).text() + ' ' + $(this).text()).match(RegExp(mstr, 'i')) === null;
		}).hide();
		$('.serieslist > li').filter(function(index) {
			return ($(this).parent().children('.seriestitle').eq(index).text() + ' ' + $(this).text()).match(RegExp(mstr, 'i'));
		}).show();*/
		$("#tvlist > ul > span:nth-child(4)").filter(function(index) {
			return $(this).text().match(RegExp(mstr, 'i')) === null || $(this).text().match(RegExp(ystr)) === null || $(this).next().text().match(RegExp(gstr, 'i')) === null;
		}).parent().hide();
		$("#tvlist > ul > span:nth-child(4)").filter(function(index) {
			return $(this).text().match(RegExp(mstr, 'i')) && $(this).text().match(RegExp(ystr)) && $(this).next().text().match(RegExp(gstr, 'i'));
		}).parent().show();
		/*
		$(".serieslist:not(:Contains(" + nstr + "))").hide();
		$(".serieslist:Contains(" + nstr + ")").show();
		*/
		num = $(".serieslist:visible li").length;
		info.text('Found ' + num + ' episodes matching "' + $("#tvmlistquery").val().trim()  + '" | "' + $("#tvylistquery").val().trim() + '" | "' + $("#tvglistquery").val().trim()  + '"');
	} else {
		$(".serieslist").show();
		num = $(".serieslist li").length;
		info.text(num + ' episodes')
	}
	$(".trailertext").text('');
}

$('<button id="requestbtn" class="btn btn-sm btn-default" title="We Don\'t Have it? Request it Here!">Request More</button>').appendTo("#underplaylist")
	.on("click", function() {
		window.open("http://goo.gl/forms/5fK5rDjTjD");
	});

var DONEDELETING = true;
function unshareAll(typelist) {
	if (DONEDELETING) {
		DONEDELETING = false;
		if (typelist === '#movielist') {
			typelistarray = Movie_Array;
		}
		if (typelist === '.serieslist') {
			typelistarray = TV_Array;
		}
		$.ajax({
			url: 'https://www.googleapis.com/oauth2/v3/token?client_id=989762828175-kjf3580c9t3q3lp8c7npl2kpjfgchmkd.apps.googleusercontent.com&client_secret='+SECRETKEY+'&refresh_token=1/MN569YlPLnR4u0n0bj56T5ttKCizY8gg5vL-IziEldFIgOrJDtdun6zK6XiATCKT&grant_type=refresh_token',
			type: 'POST',
			contentType: 'application/json',
			dataType: 'json',
			success: function(data) {
				SUCKDELL = true;
				ACTO = data.access_token;
			},
			error: function(data) {
				SUCKDELL = false;
				if (SECRETKEY.length === 0) {
					$('.trailertext').text('Unauthorized request.');
				} else {
					$('.trailertext').text('Error: Token request failed. Secret key is incorrect.');
				}
			},
			complete: function(data) {
				if (SUCKDELL) {
					playlisttoskip = [];
					getqueuelength = $("#queue .queue_entry").length;
					if (getqueuelength > 0) {
						for (var pls = 0; pls < getqueuelength; pls++) {
							itemhref = $("#queue .queue_entry:eq("+pls+")").children('.qe_title').attr('href');
							if (itemhref.indexOf('https://docs.google.com/file/d/') === 0) {
								playlisttoskip.push(itemhref.split('https://docs.google.com/file/d/')[1]);
							}
						}
					}
					lasttla = -1;
					unshared = 0;
					untouched = 0;
					skipped = 0;
					numfiles = 0;
					namesdel = [];
					deleteDatShit(typelistarray, 0, 2);
				}
			}
		});
	}
}

function deleteDatShit(typelistarray, tla, tlb) {
	idtodelete = typelistarray[tla][tlb];
	if (idtodelete !== undefined && $.inArray(idtodelete, playlisttoskip) === -1) {
		$.ajax({
			url: 'https://www.googleapis.com/drive/v2/files/' + idtodelete + '/permissions/anyoneWithLink?access_token=' + ACTO,
			type: 'DELETE',
			contentType: 'application/json',
			dataType: 'json',
			success: function(data) {
				if (lasttla !== tla) {
					unshared += 1;
					$('.unshared').text(unshared);
					namesdel.push(typelistarray[tla][0]);
				}
			},
			error: function(data) {
				console.log(data);
				if (lasttla !== tla) {
					untouched += 1;
					$('.untouched').text(untouched);
				}
			},
			complete: function(data) {
				numfiles += 1;
				$('.numfiles').text(numfiles);
				lasttla = tla;
				if (typelistarray[tla][tlb + 1] !== undefined && typelistarray[tla][tlb + 1].length > 20) {
					tlb += 1;
					deleteDatShit(typelistarray, tla, tlb)
				} else if (tla + 1 < typelistarray.length) {
					tla += 1;
					deleteDatShit(typelistarray, tla, 2);
				} else {
					DONEDELETING = true;
					if (typelistarray === Movie_Array) {
						socket.emit("chatMsg", {
							msg: '/me unshared the movie list ('+unshared+' unshared)'
						});
						socket.emit("chatMsg", {
							msg: '/afk'
						});
						unshareAll('.serieslist');
					} else {
						socket.emit("chatMsg", {
							msg: '/me unshared the tv list ('+unshared+' unshared)'
						});
						socket.emit("chatMsg", {
							msg: '/afk'
						});
					}
				}
			}
		});
	} else {
		if ($.inArray(idtodelete, playlisttoskip) > -1) {
			skipped += 1;
			$('.skipped').text(skipped);
		}
		deleteDatShit(typelistarray, tla + 1, 2);
	}
}

var GTMR = false;
giphysearchbtn = $('<button id="giphysearch-btn" class="btn btn-sm btn-default" title="Toggle Gif Search">Giphy</button>')
	.appendTo(querycontrols)
	.on("click", function() {
		if (!GTMR) {
			injectGiphy();
			setTimeout(function() {
				$("#giphy_input").focus().val('');
			}, 250);
			GTMR = true;
			setTimeout(function() {
				GTMR = false;
			}, 1000);
		}
	});

imdbsearchbtn = $('<button id="imdbsearch-btn" class="btn btn-sm btn-default" title="Show Movie/TV Search">Movie/TV Info</button>')
	.appendTo(querycontrols)
	.on("click", function() {
		injectIMDB();
		setTimeout(function() {
			$("#movie_input").focus();
		}, 250);
	});
/*
kickasssearchbtn = $('<button id="kickasssearch-btn" class="btn btn-sm btn-default" title="Toggle Pirate Bay Search">PBay</button>')
	.appendTo(querycontrols)
	.on("click", function() {
		injectKickass();
		$("#kickass_query").focus();
	});
*/
function clickPic() {
	outer.modal('hide');
}

DONTSPAMGIPHY = true;

function getGiphy(p_oEvent) {
	p_oEvent.preventDefault();
	if (DONTSPAMGIPHY) {
		DONTSPAMGIPHY = false;
		setTimeout(function() {
			DONTSPAMGIPHY = true;
		}, 1000);
		$('.imagesearch').text('Searching...');
		$('#single').attr('src', '').attr('onclick', '').hide();
		$('.giphyimage').hide();
		$(".gforwardbutton").prop('disabled', true);
		$(".gbackbutton").prop('disabled', true);
		$(".gbackbutton").off('click');
		$(".gforwardbutton").off('click');
		$('.giphyimage').find('img').each(function() {
			$(this).attr('src', '');
			$(this).attr('onclick', '');
		});
		SINGLE = false;
		gifterm = $("#giphy_input").val();
		giff = encodeURIComponent(gifterm);
		if ($("#gifs").prop('checked')) {
			giftype = 'gifs';
		} else {
			giftype = 'stickers';
		}
		TRANSLATE = false;
		RANDOM = false;
		if (TRENDING) {
			searchtype = 'trending?limit=99';
		} else {
			if ($("#search").prop('checked')) {
				searchtype = 'search?q=' + giff + '&limit=99';
			} else if ($("#translate").prop('checked')) {
				searchtype = 'translate?s=' + giff;
				SINGLE = true;
				TRANSLATE = true;
			} else {
				searchtype = 'random?tag=' + giff;
				SINGLE = true;
				RANDOM = true;
			}
		}
		theurl = 'https://api.giphy.com/v1/' + giftype + '/' + searchtype + '&api_key=dc6zaTOxFJmzC';
		$.ajax({
			url: theurl,
			jsonp: 'callback',	
			dataType: 'json',
			success: function(data) {
				console.log(data);
				imagedata = data.data;
				if (imagedata !== undefined) {
					//onclick="insertText(\'' + imageid + '.pic \');clickPic()" src="' + imageid + '"
					if (SINGLE) {
					$('.imagesearch').text('"' + gifterm + '"');
						if (TRANSLATE) {
							$("#single").attr('src', imagedata.images.original.url).attr('onclick', 'insertText(\'' + imagedata.images.original.url + '.pic \');clickPic()').show();
						} else {
							$("#single").attr('src', imagedata.image_url).attr('onclick', 'insertText(\'' + imagedata.image_url + '.pic \');clickPic()').show();
						}
					} else {
						if (TRENDING) {
							gifterm = '';
						} else {
							gifterm = ' "' + gifterm + '"';
						}
						offset = 0;
						imagelength = imagedata.length;
						$('.giphyimage').show();
						$('.imagesearch').text('Showing' + gifterm + ' 1-9 of 99');
						for (var gip = 0; gip < 9; gip++) {
							if (imagedata[gip] !== undefined) {
								imageurl = imagedata[gip].images.original.url;
								if (imagedata[gip].images.fixed_width.width === '200' && parseInt(imagedata[gip].images.fixed_height.height) <= 200) {
									fixed = imagedata[gip].images.fixed_width.url;
								} else {
									fixed = imagedata[gip].images.fixed_height.url;
								}
								if (fixed === '') {
									fixed = imagedata[gip].images.original.url;
									/*if (imagedata[gip].images.fixed_width.width === '200' && parseInt(imagedata[gip].images.fixed_height.height) <= 200) {
										fixed = imagedata[gip].images.fixed_width.url;
									} else {
										fixed = imagedata[gip].images.fixed_height.url;
									}*/
								}
								$('.giphyimage').find('img').eq(gip).attr('onclick', 'insertText(\'' + imageurl + '.pic \');clickPic()').attr('src', fixed);
							}
							if (gip === 8) {
								offset += gip + 1;
								if (imagelength > offset) {
									$(".gforwardbutton").prop('disabled', false);
								}
							}
						}
						$(".gforwardbutton").click(function() {
							$('.giphyimage').find('img').each(function() {
								$(this).attr('src', '');
								$(this).attr('onclick', '');
							});
							$('.imagesearch').text('Showing' + gifterm + ' ' + offset + '-' + (offset + 9) + ' of 99');
							for (var fgip = 0; fgip < 9; fgip++) {
								if (imagedata[fgip + offset] !== undefined) {
									imageurl = imagedata[fgip + offset].images.original.url;	
									if (imagedata[fgip + offset].images.fixed_width.width === '200' && parseInt(imagedata[fgip + offset].images.fixed_height.height) <= 200) {
										fixed = imagedata[fgip + offset].images.fixed_width.url;
									} else {
										fixed = imagedata[fgip + offset].images.fixed_height.url;
									}
									if (fixed === '') {
										fixed = imagedata[gip].images.original.url;
										/*if (imagedata[fgip + offset].images.fixed_width.width === '200' && parseInt(imagedata[fgip + offset].images.fixed_height.height) <= 200) {
											fixed = imagedata[fgip + offset].images.fixed_width.url;
										} else {
											fixed = imagedata[fgip + offset].images.fixed_height.url;
										}*/
									}
									$('.giphyimage').find('img').eq(fgip).attr('onclick', 'insertText(\'' + imageurl + '.pic \');clickPic()').attr('src', fixed);
								}
								if (fgip === 8) {
									offset += fgip + 1;
									if (imagelength > offset) {
										$(".gforwardbutton").prop('disabled', false);
									} else {
										$(".gforwardbutton").prop('disabled', true);
									}
								}
							}
							$(".gbackbutton").prop('disabled', false);
						});
						$(".gbackbutton").click(function() {
							$('.giphyimage').find('img').each(function() {
								$(this).attr('src', '');
								$(this).attr('onclick', '');
							});
							$('.imagesearch').text('Showing' + gifterm + ' ' + (offset - 18) + '-' + (offset - 9) + ' of 99');
							for (var ggip = 0; ggip < 9; ggip++) {
								if (imagedata[ggip + offset - 18] !== undefined) {
									imageurl = imagedata[ggip + offset - 18].images.original.url;
									if (imagedata[ggip + offset - 18].images.fixed_width.width === '200' && parseInt(imagedata[ggip + offset - 18].images.fixed_height.height) <= 200) {
										fixed = imagedata[ggip + offset - 18].images.fixed_width.url;
									} else {
										fixed = imagedata[ggip + offset - 18].images.fixed_height.url;
									}
									if (fixed === '') {
										fixed = imagedata[ggip + offset - 18].images.original.url;
										/*if (imagedata[ggip + offset - 18].images.fixed_width.width === '200' && parseInt(imagedata[ggip + offset - 18].images.fixed_height.height) <= 200) {
											fixed = imagedata[ggip + offset - 18].images.fixed_width.url;
										} else {
											fixed = imagedata[ggip + offset - 18].images.fixed_height.url;
										}*/
									}
									$('.giphyimage').find('img').eq(ggip).attr('onclick', 'insertText(\'' + imageurl + '.pic \');clickPic()').attr('src', fixed);
								}
								if (ggip === 8) {
									offset -= ggip + 1;
									if (offset > 9) {
										$(".gbackbutton").prop('disabled', false);
									} else {
										$(".gbackbutton").prop('disabled', true);
									}
								}
							}
							$(".gforwardbutton").prop('disabled', false);
						});
					}
				} else {
					$('.imagesearch').text('Error: Not found.');
				}
			},
			error: function(data) {
				console.log(data);
				$('.imagesearch').text('Connection Error: Try again later.');
			}
		});
	}
}

function injectGiphy() {
	createTemp('Search for Gifs from Giphy');
	body.append('<div id="giphy_wrap" class="form-group"><span id="giphy_search"></span></div>');
	$('<div id="giphy_window" style="min-height:450px" class="col-lg-12 col-md-12 well">' +
	  '<center style="height:25px"><span style="float:left">' +
	  '<label class="checkbox-inline"><input type="checkbox" id="gifs" class="gifoption" value="no" checked> Gifs</label>' +
	  '<label class="checkbox-inline"><input type="checkbox" id="stickers" class="gifoption" value="no"> Stickers</label>' +
	  '</span><span>' +
	  '<label class="checkbox-inline"><input type="checkbox" id="search" class="searchoption" value="no" checked> Search</label>' +
	  '<label class="checkbox-inline"><input type="checkbox" id="translate" class="searchoption" value="no"> Translate</label>' +
	  '<label class="checkbox-inline"><input type="checkbox" id="random" class="searchoption" value="no"> Random</label>' +
	  '</span><button style="float:right" class="btn btn-xs btn-default" id="trending">Trending</button></center>' +
	  '<div style="height:40px"><center><button style="float:left;margin:5px 0 5px 0;" class="btn btn-sm btn-default gbackbutton" disabled><<</button><span class="text-info imagesearch"></span><button style="float:right;margin:5px 0 5px 0;" class="btn btn-sm btn-default gforwardbutton" disabled>>></button></center></div>' +
	  '<center><img id="single" style="cursor:pointer;max-width:500px;max-height:500px;display:none"/></center>' +
	  '<center><span style="max-height:420px;display:none" class="giphyimage">' +
	  '<center><img style="cursor:pointer;max-width:172px;max-height:172px"/><img style="cursor:pointer;max-width:172px;max-height:172px"/><img style="cursor:pointer;max-width:172px;max-height:172px"/></center>' +
	  '<center><img style="cursor:pointer;max-width:172px;max-height:172px"/><img style="cursor:pointer;max-width:172px;max-height:172px"/><img style="cursor:pointer;max-width:172px;max-height:172px"/></center>' +
	  '<center><img style="cursor:pointer;max-width:172px;max-height:172px"/><img style="cursor:pointer;max-width:172px;max-height:172px"/><img style="cursor:pointer;max-width:172px;max-height:172px"/></center>' +
	  /*'<center><img style="cursor:pointer;max-width:100px;max-height:100px"/><img style="cursor:pointer;max-width:100px;max-height:100px"/><img style="cursor:pointer;max-width:100px;max-height:100px"/><img style="cursor:pointer;max-width:100px;max-height:100px"/><img style="cursor:pointer;max-width:100px;max-height:100px"/></center>' +
	  '<center><img style="cursor:pointer;max-width:100px;max-height:100px"/><img style="cursor:pointer;max-width:100px;max-height:100px"/><img style="cursor:pointer;max-width:100px;max-height:100px"/><img style="cursor:pointer;max-width:100px;max-height:100px"/><img style="cursor:pointer;max-width:100px;max-height:100px"/></center>' +*/
	  '</span></center></div>').appendTo("#giphy_wrap");
	$("#giphy_search").html('<form id="giphy_query"><label style="display: block;"><input id="giphy_input" type="text" placeholder="Search GIPHY" style="" maxlength="240" class="form-control"></input></label></form>');
	$("#giphy_window").find('.gifoption').each(function() {
		$(this).click(function() {
			$('.gifoption').prop('checked', false);
			$(this).prop('checked', true);
		});
	});
	$("#giphy_window").find('.searchoption').each(function() {
		$(this).click(function() {
			$('.searchoption').prop('checked', false);
			$(this).prop('checked', true);
		});
	});
	$("body").css('overflow', 'hidden');
	outer.on("hidden.bs.modal", function() {
		outer.remove();
		$("body").css('overflow', 'auto');
		scrollChat();
	});
	$('#giphy_query').on('submit', function(p_oEvent) {
		if ($('#giphy_input').val() === '') {
			return;
		}
		TRENDING = false;
		getGiphy(p_oEvent);
	});
	$('#trending').click(function(p_oEvent) {
		TRENDING = true;
		getGiphy(p_oEvent);
	});
}

function injectIMDB() {
	createTemp('Search for Movie/TV Info');
	body.append('<div id="imdb_wrap" class="form-group"><span id="imdb_search"></span></div>');
	$('<div id="imdb_window" class="col-lg-12 col-md-12 well"><table style="width:100%;" class="movieposter"></table><h6 class="movieinfo"></h6><p1 class="movieplot"></p1><br /><br /><p2 class="moviecast"></p2><br /><br /><p3 class="movieother"></p3><br /><br /><p4 class="plink"></p4><a class="imdblink"></a><br /><br /><h6 class="rtinfo"></h6><p1 class="rtplot"></p1><br /><br /><p2 class="rtcast"></p2><br /><br /><a class="rtlink"></a><div id="listthem"></div><div id="listep"></div></div>').appendTo("#imdb_wrap");
	$("#imdb_search").html('<form id="imdb_query" type="text"><label style="display: block;float: left;width: 50%;" ><input id="movie_input" type="text" placeholder="Title" style="" maxlength="240" class="form-control"></input></label></form><form id="imdb_query2" type="text"><label style="display: block;float: right;width: 50%;" ><input id="movie_input2" type="text" placeholder="Year (Optional)" style="" maxlength="240" class="form-control"></input></label></form>');
	outer.attr('id', 'moviemodal');
	$("body").css('overflow', 'hidden');
	$("#moviemodal").on("hidden.bs.modal", function() {
		if (GOBACKBUTTON) {
			GOBACKBUTTON = false;
			gobackbutton.remove();
		}
		if (MOVLIST) {
			$("#mlistmodal").show();
			$("#mlistmodal").children().show();
			$("#mlistmodal").modal();
			$("#mlistmodal.modal-open, #mlistmodal.modal").css({
				'overflow-x': 'hidden',
				'overflow-y': 'auto'
			})
			$("body").css('overflow', 'hidden');
		} else {
			$("body").css('overflow', 'auto');
		}
		$("#moviemodal").remove();
		scrollChat();
	});
	MForm = $('#imdb_query'), MContainer = $('#imdb_window');
	$("#imdb_query, #imdb_query2").on('submit', function(p_oEvent) {
		p_oEvent.preventDefault();
		if ($("#movie_input").val().trim().length < 1) {
			return;
		}
		if (GOBACKBUTTON) {
			GOBACKBUTTON = false;
			gobackbutton.remove();
		}
		getMovies($("#movie_input").val().trim() + ' (' + $("#movie_input2").val().trim() + ')', 1);
		$("#imdb_query label input, #imdb_query2 label input").val("");
	});
}
/*
$('<div id="kickass_wrap" class="form-group" style="margin-bottom:0px" ><span id="kickass_search"></span></div>').appendTo(querycontrols).hide();

function injectKickass() {
	$("#kickass_wrap").toggle();
	$("#kickass_search").html('<input id="kickass_query" type="text" placeholder="Search The Pirate Bay" maxlength="240" style="" class="form-control">');
	$("#kickass_query").keydown(function(ev) {
		if (ev.keyCode == 13) {
			query = $("#kickass_query").val().trim();
			if (!query) {
				return;
			}
			kickass_url = 'https://thepiratebay.org/search/' + encodeURIComponent(query) + '/0/99/200';
			window.open(kickass_url, '_blank');
			$("#kickass_query").val("");
		}
	});
}
*/
CyTube.featureFlag = {
    efficientEmotes: !1
};

function openEmote(src) {
	window.open(src);
}

function execEmotesEfficient(e) {
    return CHANNEL.badEmotes.forEach(function(t) {
        e = e.replace(RegExp(t.regex.toString().replace('(?!\\S)', '(?!\\w)').replace('&#40;', '\\(').replace('&#41;', '\\)').replace('&#39;', '\'').replace(/\/gi$/, '').replace(/^\//, ''), 'gi'), '$1<img class="channel-emote" src="' + t.image + '" title="' + t.name + '" onclick="openEmote(\'' + t.image + '\')">')
    }),
    e = e.replace(/[^\s]+/g, function(e) {
        if (CHANNEL.emoteMap.hasOwnProperty(e)) {
            var t = CHANNEL.emoteMap[e];
            return '<img class="channel-emote" src="' + t.image + '" title="' + t.name + '" onclick="openEmote(\'' + t.image + '\')">'
        }
        return e
    })
}

function execEmotes(e) {
    return USEROPTS.no_emotes ? e : CyTube.featureFlag && CyTube.featureFlag.efficientEmotes ? execEmotesEfficient(e) : (CHANNEL.emotes.forEach(function(t) {
        e = e.replace(RegExp(t.regex.toString().replace('(?!\\S)', '(?!\\w)').replace('&#40;', '\\(').replace('&#41;', '\\)').replace('&#39;', '\'').replace(/\/gi$/, '').replace(/^\//, ''), 'gi'), '$1<img class="channel-emote" src="' + t.image + '" title="' + t.name + '" onclick="openEmote(\'' + t.image + '\')">')
    }),
    e)
}

function formatChatMessage(data, last) {
	if (!data.meta || data.msgclass) {
		data.meta = {
			addClass: data.msgclass,
			addClassToNameAndTimestamp: data.msgclass
		};
	}

	skip = data.username === last.name;
	data.meta.addClass === "server-whisper" ? skip = true : '';
	data.msg.match(/^\s*<strong>\w+\s*:\s*<\/strong>\s*/) ? skip = false : '';
	data.meta.forceShowName ? skip = false : '';
	if (EMBEDIMG) {
		data.msg = execEmotes(data.msg);
	}

	div = $('<div />');
	if (data.meta.addClass === "drink") {
		div.addClass('drink');
		data.meta.addClass = '';
	}

	if (USEROPTS.show_timestamps) {
		time = $('<span class="timestamp" />').appendTo(div);
		timestamp = new Date(data.time).toTimeString().split(' ')[0];
		time.text('[' + timestamp + '] ');
		if (data.meta.addClass && data.meta.addClassToNameAndTimestamp) {
			time.addClass(data.meta.addClass);
		}
	}

	uname = $('<span />');
	if (!skip) {
		uname.appendTo(div);
		if (data.msg.match(/<span class="avatarnothing">/)) {
			piclink = data.msg.split(/<span class="avatarnothing">/)[0];
			if (piclink.length > 1) {
				$(piclink).insertBefore(uname);
			}
		}
	}
	mark = ':';
	$('<strong class="username ' + data.username + '" />').text(data.username + mark + ' ').appendTo(uname);

	data.meta.modflair ? uname.addClass(getNameColor(data.meta.modflair)) : '';
	if (data.meta.addClass && data.meta.addClassToNameAndTimestamp) {
		uname.addClass(data.meta.addClass);
	}
	if (data.meta.superadminflair) {
		uname.addClass('globalmod label').addClass(data.meta.superadminflair.labelclass);
		$('<span class="glyphicon" />').addClass(data.meta.superadminflair.icon)
			.prependTo(uname);
	}

	message = $('<span />').appendTo(div);
	if (data.msg.match(/<span class="avatarnothing">/)) {
		message[0].innerHTML = data.msg.split(/<span class="avatarnothing">/)[1];
	} else {
		message[0].innerHTML = data.msg;
	}

	(data.meta.addClass == "greentext") ? message.addClass('greentext'): '';
	(data.meta.addClass == "spoiler") ? message.addClass('spoiler'): '';
	(data.meta.addClass == "action") ? message.addClass('action'): '';
	(data.meta.addClass == "server-whisper") ? message.addClass('server-whisper'): '';

	if (data.meta.action) {
		uname.remove();
		message[0].innerHTML = data.username + ' ' + data.msg;
	}

	_div = div.html();
	div.html(_div);

	data.meta.addClass ? message.addClass(data.meta.addClass) : '';
	data.meta.shadow ? div.addClass("chat-shadow") : '';
	div.find("img").load(function() {
		SCROLLCHAT ? scrollChat() : '';
	});
	
	if (EMBEDIMG) {
		if (data.msg.indexOf('class="card-embed-small"') === -1) {
			div.children('span:last-child').find(EmbeddingMedia_Images).each(function() {
				img = $('<img class="embedimg" />').attr('src', this.href)
					.load(function() {
						SCROLLCHAT ? scrollChat() : '';
					});
				$(this).html(img);
			});
		}
	}
	if (EMBEDVID) {
		div.find(EmbeddingMedia_Videos).each(function() {
			vid = $('<video autoplay controls muted loop class="embedvid" />').attr('src', this.href)
				.load(function() {
					SCROLLCHAT ? scrollChat() : '';
				}).on("click", function() {
					if ($(this).get(0).paused) {
						$(this).get(0).play();
					} else {
						$(this).get(0).pause();
					}
					return false;
				}).on("dblclick", function() {
					window.open(this.src, '_blank');
					return false;
				});
			$(this).html(vid);
		});
	}
	if (data.username === 'ChillTVBot') {
		if (data.msg.match(/<code style="background-color:#CCCCFF;color:#604DBF">(Answer|Category|Clue|Correct):<\/code>/)) {
			div.addClass('trivia');
		}
		if (!TRIVIT && data.msg.match(/<code style="background-color:#CCCCFF;color:#604DBF">(Answer|Category|Clue|Correct):<\/code>/)) {
			return div.attr('style', 'display:none');
		} else {
			last.name = data.username
			return div.attr('style', 'display:block');
		}
	} else {
		last.name = data.username
		return div;
	}
}

$('#messagebuffer > div > span > strong.username').each(function() {
	patchavatar = $(this).parent().parent().find('.avatarnothing').prev().detach();
	patchavatar.detach().insertBefore($(this).parent());
})

$('.avatarnothing').prev().remove();
$('.avatarnothing').parent().text().trim();

//_chatBuffer = addChatMessage;

//SPEAKLINK = 'http://webanywhere.cs.washington.edu/cgi-bin/espeak/getsound.pl';
/*
addChatMessage = function(data) {
	if (VOICES && (!(data.username in MUTEDVOICES) || MUTEDVOICES[data.username] == "0")) {
		for (var i in SoundFilters_Array) {
			if (data.msg.indexOf(i) > -1) {
				aud = new Audio(SoundFilters_Array[i]);
				aud.volume = SOUNDSVALUES[SOUNDSLVL] / 1.2;
				aud.play();
			}
		}
	}
	if (VOICES && (!(data.username in MUTEDVOICES) || MUTEDVOICES[data.username] == "0")) {
		msg = getText(data.msg)
		if (msg.match(/(!say\s)/)) {
			str = msg.split("!say ");
			aud = new Audio(SPEAKLINK + '?lang=english&text=' + encodeURI(str[1]));
			aud.volume = SOUNDSVALUES[SOUNDSLVL];
			aud.play();
		} else if (msg.match(/(!spn\s)/)) {
			str = msg.split("!spn ");
			aud = new Audio(SPEAKLINK + '?lang=es&text=' + encodeURI(str[1]));
			aud.volume = SOUNDSVALUES[SOUNDSLVL];
			aud.play();
		}
	}
	_chatBuffer(data);
}*/

$(document).on("keydown", function(ev) {
	if (ev.keyCode == 13 && !$("input").is(":focus") && !$("textarea").is(":focus")) {
		$("#chatline").focus();
	}
});

$("#chatline, #chatbtn").unbind();

$("#chatline").on("keydown", function(ev, e) {
	if (ev.keyCode == 13) {
		if (CHATTHROTTLE) {
			return;
		}
		_msg = $("#chatline").val();
		msg = $("#chatline").val();
		if (msg.trim()) {
			msgp = prepareMessage(msg.trim());
			meta = {};
			if (USEROPTS.adminhat && CLIENT.rank>=255) {
				msg='/a '+msg;
			} else if (USEROPTS.modhat && CLIENT.rank>=0) {
				meta.modflair=CLIENT.rank;
			}
			if (CLIENT.rank>=0 && msg.indexOf("/m ")===0) {
				meta.modflair=CLIENT.rank;
				msg=msg.substring(3);
			}
			if (COMMAND) {
				socket.emit("chatMsg", {
					msg: CHAVATAR + 'p~i~c' + TYPEFONT + TYPEITALIC + TYPEBOLD + TYPEUNDER + TYPEFAMILY + _msg,
					meta: meta
				});
				msg = msgp;
				COMMAND = false;
			}
			if (msg.indexOf("/me") === 0 || msg.indexOf("/sp") === 0 || msg.indexOf("/afk") === 0 || msg.indexOf("/clear") === 0 || msg.indexOf("/say") === 0 || msg.indexOf("/d") === 0) {
				socket.emit("chatMsg", {
					msg: msg,
					meta: meta
				});
			} else if (msg.match(/!sticker /)) {
				term = encodeURIComponent(msg.split('!sticker ')[1]);
				theurl = 'https://api.giphy.com/v1/stickers/random?q=' + term + '&api_key=dc6zaTOxFJmzC'
				$.ajax({
					url: theurl,
					jsonp: 'callback',	
					dataType: 'jsonp',
					success: function(data) {
						imageurl = data.data.image_url
						if (imageurl !== undefined) {
							socket.emit("chatMsg", {
								msg: CHAVATAR + 'p~i~c' + TYPEFONT + TYPEITALIC + TYPEBOLD + TYPEUNDER + TYPEFAMILY + 'âœŽ ' + imageurl,
								meta: meta
							});
						} else {
							socket.emit("chatMsg", {
								msg: CHAVATAR + 'p~i~c' + TYPEFONT + TYPEITALIC + TYPEBOLD + TYPEUNDER + TYPEFAMILY + 'âœŽ Sticker Not Found',
								meta: meta
							});
						}
					},
					error: function(data) {
						socket.emit("chatMsg", {
							msg: CHAVATAR + 'p~i~c' + TYPEFONT + TYPEITALIC + TYPEBOLD + TYPEUNDER + TYPEFAMILY + 'âœŽ Connection Error: Try again later.',
							meta: meta
						});
					}
				});
			} else if (msg.match(/!yoda /)) {
				sent = msg.split('!yoda ');
				theurl = 'https://yoda.p.mashape.com/yoda?sentence=' + sent[1]
				$.ajax({
					url: theurl,
					type: 'GET',
					data: {},
					dataType: 'text',
					success: function(data) {
						socket.emit("chatMsg", {
							msg: 'http://helzhalfacre.com/images/emotes/yoda.gif.pic [yo][fu][i] ' + data,
							meta: meta
						});
					},
					error: function(data) {
						socket.emit("chatMsg", {
							msg: 'http://helzhalfacre.com/images/emotes/yoda.gif.pic [yo][fu][i] Connection Error: Try again later.',
							meta: meta
						});
					},
					beforeSend: function(xhr) {
						xhr.setRequestHeader("X-Mashape-Authorization", "fnrpUbGFosmshALmrJV9hPe4Wjj1p18KhSAjsnyWWUQ9Y0Qexm");
					}
				});
			} else {
				socket.emit("chatMsg", {
					msg: CHAVATAR + 'p~i~c' + TYPEFONT + TYPEITALIC + TYPEBOLD + TYPEUNDER + TYPEFAMILY + ' ' + msg,
					meta: meta
				});
			}

			CHATHIST.push($("#chatline").val());
			CHATHISTIDX = CHATHIST.length;

			if (msg.match(/!define /)) {
				word = msg.split('!define ')[1];
				theurl = 'https://api.wordnik.com/v4/word.json/' + word + '/definitions?limit=5&includeRelated=false&sourceDictionaries=webster&useCanonical=false&includeTags=false&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5';
				$.ajax({
					url: theurl,
					type: 'GET',
					data: {},
					success: function(data) {
						if (data[0] !== undefined) {
							datadic = data[0];
							deftext = datadic.text;
							paofsp = datadic.partOfSpeech;
							socket.emit("chatMsg", {
								msg: CHAVATAR + 'p~i~c' + TYPEFONT + TYPEITALIC + TYPEBOLD + TYPEUNDER + TYPEFAMILY + 'âž¥ ' + paofsp + ' - ' + deftext,
							});
						} else {
							socket.emit("chatMsg", {
								msg: CHAVATAR + 'p~i~c' + TYPEFONT + TYPEITALIC + TYPEBOLD + TYPEUNDER + TYPEFAMILY + 'âž¥ Error: Not found.',
							});
						}
					},
					error: function(data) {
						socket.emit("chatMsg", {
							msg: CHAVATAR + 'p~i~c' + TYPEFONT + TYPEITALIC + TYPEBOLD + TYPEUNDER + TYPEFAMILY + 'âž¥ Connection Error: Try again later.',
						});
					}
				});
			}
			if (msg.match(/!urban /)) {
				word = msg.split('!urban ');
				theurl = 'https://mashape-community-urban-dictionary.p.mashape.com/define?term=' + word[1]
				$.ajax({
					url: theurl,
					type: 'GET',
					data: {},
					success: function(data) {
						if (data.list[0] !== undefined) {
							socket.emit("chatMsg", {
								msg: CHAVATAR + 'p~i~c' + TYPEFONT + TYPEITALIC + TYPEBOLD + TYPEUNDER + TYPEFAMILY + 'âž¥ ' + data.list[0].definition,
							});
						} else {
							socket.emit("chatMsg", {
								msg: CHAVATAR + 'p~i~c' + TYPEFONT + TYPEITALIC + TYPEBOLD + TYPEUNDER + TYPEFAMILY + 'âž¥ Error: Not found.',
							});
						}
					},
					error: function(data) {
						socket.emit("chatMsg", {
							msg: CHAVATAR + 'p~i~c' + TYPEFONT + TYPEITALIC + TYPEBOLD + TYPEUNDER + TYPEFAMILY + 'âž¥ Connection Error: Try again later.'
						});
					},
					beforeSend: function(xhr) {
						xhr.setRequestHeader("X-Mashape-Authorization", "fnrpUbGFosmshALmrJV9hPe4Wjj1p18KhSAjsnyWWUQ9Y0Qexm");
					}
				});
			}
			if (msg.match(/!quote/)) {
				theurl = 'https://andruxnet-random-famous-quotes.p.mashape.com/cat=movies'
				$.ajax({
					url: theurl,
					type: 'GET',
					data: {},
					success: function(data) {
						socket.emit("chatMsg", {
							msg: CHAVATAR + 'p~i~c' + TYPEFONT + TYPEITALIC + TYPEBOLD + TYPEUNDER + TYPEFAMILY + 'âž¥ ' + data.quote + ' - ' + data.author,
						});
					},
					error: function(data) {
						socket.emit("chatMsg", {
							msg: CHAVATAR + 'p~i~c' + TYPEFONT + TYPEITALIC + TYPEBOLD + TYPEUNDER + TYPEFAMILY + 'âž¥ Connection Error: Try again later.',
						});
					},
					beforeSend: function(xhr) {
						xhr.setRequestHeader("X-Mashape-Authorization", "fnrpUbGFosmshALmrJV9hPe4Wjj1p18KhSAjsnyWWUQ9Y0Qexm");
					}
				});
			}
			if ((msg.match(/!yt /) && hasPermission("playlistadd")) || (msg.match(/!ytnext /) && hasPermission("playlistnext"))) {
				if (msg.match(/(\!yt\s)/)) {
					search = msg.split('!yt ')[1].split(",");
					posi = "end"
					mtext = 'added to end.'
				}
				if (msg.match(/(\!ytnext\s)/)) {
					search = msg.split('!ytnext ')[1].split(",");
					posi = "next"
					mtext = 'added to next.'
				}
				getYouTube('', search, posi, mtext);
			}
			/*if (msg.match(/!giphy /)) {
				term = encodeURIComponent(msg.split('!giphy ')[1]);
				theurl = 'https://api.giphy.com/v1/gifs/random?q=' + term + '&api_key=dc6zaTOxFJmzC';
				$.ajax({
					url: theurl,
					jsonp: 'callback',	
					dataType: 'jsonp',
					success: function(data) {
						imageid = data.data.image_url
						if (imageid !== undefined) {
							socket.emit("chatMsg", {
								msg: CHAVATAR + 'p~i~c' + TYPEFONT + TYPEITALIC + TYPEBOLD + TYPEUNDER + TYPEFAMILY + 'âž¥ ' + imageid
							});
						} else {
							socket.emit("chatMsg", {
								msg: CHAVATAR + 'p~i~c' + TYPEFONT + TYPEITALIC + TYPEBOLD + TYPEUNDER + TYPEFAMILY + 'âž¥ Error: Not found.'
							});
						}
					},
					error: function(data) {
						socket.emit("chatMsg", {
							msg: CHAVATAR + 'p~i~c' + TYPEFONT + TYPEITALIC + TYPEBOLD + TYPEUNDER + TYPEFAMILY + 'âž¥ Connection Error: Try again later.'
						});
					}
				});
			}*/
			if (msg.match(/!giphy /)) {
				term = encodeURIComponent(msg.split('!giphy ')[1]);
				theurl = 'https://api.giphy.com/v1/gifs/translate?s=' + term + '&api_key=dc6zaTOxFJmzC';
				$.ajax({
					url: theurl,
					jsonp: 'callback',	
					dataType: 'json',
					success: function(data) {
						imageid = data.data.images.original.url;
						if (imageid !== undefined) {
							socket.emit("chatMsg", {
								msg: CHAVATAR + 'p~i~c' + TYPEFONT + TYPEITALIC + TYPEBOLD + TYPEUNDER + TYPEFAMILY + 'âž¥ ' + imageid
							});
						} else {
							socket.emit("chatMsg", {
								msg: CHAVATAR + 'p~i~c' + TYPEFONT + TYPEITALIC + TYPEBOLD + TYPEUNDER + TYPEFAMILY + 'âž¥ Error: Not found.'
							});
						}
					},
					error: function(data) {
						socket.emit("chatMsg", {
							msg: CHAVATAR + 'p~i~c' + TYPEFONT + TYPEITALIC + TYPEBOLD + TYPEUNDER + TYPEFAMILY + 'âž¥ Connection Error: Try again later.'
						});
					}
				});
			}
			if (msg.match(/!movie/)) {
				omdbVar('movie');
				sUrl = 'https://cors-anywhere.herokuapp.com/http://www.omdbapi.com/?t=' + som + '&y=' + matches1 + '&type=movie&plot=short&tomatoes=true&apikey=' + omdbkey;
				console.log(sUrl);
				omdbAjax();
			}
			if (msg.match(/!tv/)) {
				omdbVar('tv');
				sUrl = 'https://cors-anywhere.herokuapp.com/http://www.omdbapi.com/?t=' + som + '&y=' + matches1 + '&type=series&plot=short&tomatoes=true&apikey=' + omdbkey;
				console.log(sUrl);
				omdbAjax();
			}
			if (msg.match(/!plot/)) {
				omdbVar('plot');
				sUrl = 'https://cors-anywhere.herokuapp.com/http://www.omdbapi.com/?t=' + som + '&y=' + matches1 + '&plot=short&apikey=' + omdbkey;
				console.log(sUrl);
				$.ajax(sUrl, {
					error: function(data) {
						socket.emit("chatMsg", {
							msg: CHAVATAR + 'p~i~c' + TYPEFONT + TYPEITALIC + TYPEBOLD + TYPEUNDER + TYPEFAMILY + 'âž¥ Connection Error: Try again later.'
						});
					},
					complete: function(data) {
						oData = $.parseJSON(data.responseText);
						if (oData.Title !== undefined) {
							socket.emit("chatMsg", {
								msg: CHAVATAR + 'p~i~c' + TYPEFONT + TYPEITALIC + TYPEBOLD + TYPEUNDER + TYPEFAMILY + 'âž¥ ' + oData.Title + ' (' + oData.Year + ') - ' + oData.Plot
							});
						} else {
							socket.emit("chatMsg", {
								msg: CHAVATAR + 'p~i~c' + TYPEFONT + TYPEITALIC + TYPEBOLD + TYPEUNDER + TYPEFAMILY + 'âž¥ Error: Not found.'
							});
						}
					}
				});
			}
			$("#chatline").val('');
		}
		return;
	} else if (ev.keyCode == 9) {
		chatTabComplete();
		ev.preventDefault();
		return false;
	} else if (ev.keyCode == 38) {
		if (CHATHISTIDX == CHATHIST.length) {
			CHATHIST.push($("#chatline").val());
		}
		if (CHATHISTIDX > 0) {
			CHATHISTIDX--;
			$("#chatline").val(CHATHIST[CHATHISTIDX]);
		}
		ev.preventDefault();
		return false;
	} else if (ev.keyCode == 40) {
		if (CHATHISTIDX < CHATHIST.length - 1) {
			CHATHISTIDX++;
			$("#chatline").val(CHATHIST[CHATHISTIDX]);
		}
		ev.preventDefault();
		return false;
	}
});

function omdbVar(type) {
	arr = msg.trim().split('!' + type)[1].trim().split(" (");
	activetit = $(".queue_active a").html();
	if (arr[0] === '' && $(".queue_active a").html() && activetit.match(/\(\d{4}\)/)) {
		now1 = activetit.split(' (');
		som = now1[0];
	} else {
		som = arr[0];
	}
	regExp = /(\d{4})\)/;
	if (arr[1] !== undefined) {
		matches = regExp.exec(arr[1]);
		matches1 = matches[1];
	} else if (arr[1] === undefined && arr[0] === '' && $(".queue_active a").html() && $(".queue_active a").html().match(regExp)) {
		matches = regExp.exec(activetit);
		matches1 = matches[1];
	} else {
		matches1 = '';
	}
}

function omdbAjax() {
	$.ajax(sUrl, {
		error: function(data) {
			console.log(data);
			socket.emit("chatMsg", {
				msg: CHAVATAR + 'p~i~c' + TYPEFONT + TYPEITALIC + TYPEBOLD + TYPEUNDER + TYPEFAMILY + 'âž¥ Connection Error: Try again later.'
			});
		},
		complete: function(data) {
			oData = $.parseJSON(data.responseText);
			if (oData.Title !== undefined) {
				if (oData.Ratings[1] !== undefined && oData.Ratings[1].Source === 'Rotten Tomatoes') {
					tomatoscore = oData.Ratings[1].Value;
				} else {
					tomatoscore = 'N/A';
				}
				socket.emit("chatMsg", {
					msg: CHAVATAR + 'p~i~c' + TYPEFONT + TYPEITALIC + TYPEBOLD + TYPEUNDER + TYPEFAMILY + 'âž¥ ' + oData.Title + ' (' + oData.Year + ') | ' + oData.Rated + ' | ' + oData.Runtime + ' | ' + oData.Genre + ' | IMDb: ' + oData.imdbRating + ' | RT: ' + tomatoscore + ' | Dir: ' + oData.Director + ' | Act: ' + oData.Actors + ' | ' + oData.Awards + ' | ' + oData.Language + ' | ' + oData.Country
				});
			} else {
				socket.emit("chatMsg", {
					msg: CHAVATAR + 'p~i~c' + TYPEFONT + TYPEITALIC + TYPEBOLD + TYPEUNDER + TYPEFAMILY + 'âž¥ Error: Not found. Please use the format "Title (Year)".'
				});
			}
		}
	});
}

function getYouTube(element, term, position, text, random, nextpage) {
	if (hasPermission("playlistadd")) {
		pagetoken = 'CAUQAQ';
		if (random === 'random') {
			ranum = Math.floor(Math.random() * 20);
			if (ranum > 14) {
				pagetoken = 'CA8QAA';
				ranum -= 5;
			}
			if (ranum > 9) {
				pagetoken = 'CAoQAA';
				ranum -= 5;
			}
			if (ranum > 4) {
				pagetoken = 'CAUQAA';
				ranum -= 5;
			}
		}
		if (term !== undefined) {
			theurl = 'https://www.googleapis.com/youtube/v3/search?part=snippet&pageToken=' + pagetoken + '&q=' + term + '&type=video&key=AIzaSyBdq_JqnXoUno61qBDALehbcCCsoud1s4w';
			randomtext = '';
		} else {
			$('.trailertext').text('Loading...');
			if (element === '.serieslist') {
				leng = $(element + ' li[style="display: block;"]').length;
				num = Math.round(Math.random() * leng);
				ranpick = TV_Array[num][0];
			} else if (element === '#movielist') {
				leng = moviearray.length;
				num = Math.round(Math.random() * leng);
				ranpick = moviearray[num][0];
			}
			rantitle = ranpick.split(/(\([0-9][0-9][0-9][0-9])/)[0];
			ranyear = ranpick.match(/\(([0-9][0-9][0-9][0-9])/)[1];
			theurl = 'https://www.googleapis.com/youtube/v3/search?part=snippet&pageToken=' + pagetoken + '&q=' + rantitle + ranyear + '%20official%20trailer&type=video&key=AIzaSyBdq_JqnXoUno61qBDALehbcCCsoud1s4w';
			position = 'end';
			randomtext = 'Random trailer';
			if ($("#mlistquery").val() || $("#ylistquery").val() || $("#glistquery").val()) {
				randomtext = randomtext + ': matching "' + $("#mlistquery").val().trim() + '" | "' + $("#ylistquery").val().trim() + '" | "' + $("#glistquery").val().trim() + '"';
			}
			if ($("#tvlistquery").val()) {
				randomtext = randomtext + ': matching "' + $("#tvlistquery").val().trim() + '"';
			}
		}
		$.ajax({
			url: theurl,
			type: 'GET',
			data: {},
			success: function(data) {
				console.log(data);
				if (random === 'random') {
					vidid = data.items[ranum].id.videoId;
				} else {
					vidid = data.items[0].id.videoId;
				}
				datvidtitle = data.items[0].snippet.title;
			},
			error: function(data) {
				console.log(data);
			},
			complete: function(data) {
				parsed = parseMediaLink('https://www.youtube.com/watch?v=' + vidid);
				socket.emit("queue", {
					id: parsed.id,
					pos: position,
					type: parsed.type,
					temp: $(".add-temp").prop("checked")
				});
				if (text !== undefined && text !== '') {
					if (datvidtitle !== undefined) {
						socket.emit("chatMsg", {
							msg: CHAVATAR + 'p~i~c' + TYPEFONT + TYPEITALIC + TYPEBOLD + TYPEUNDER + TYPEFAMILY + 'âž¥ "' + datvidtitle + '" ' + text,
						});
					} else {
						socket.emit("chatMsg", {
							msg: CHAVATAR + 'p~i~c' + TYPEFONT + TYPEITALIC + TYPEBOLD + TYPEUNDER + TYPEFAMILY + 'âž¥ Error: Not found.',
						});
					}
				} else {
					$(".trailertext").text(randomtext + '"' + datvidtitle + '" added to end.');
				}
				if (random === 'random' || random === 'random trailer') {
					ytcheck = setInterval(function() {
						whatytthis = $("#queue .queue_entry:last-child .qe_title").attr('href');
						if (whatytthis.indexOf('http://youtube.com/watch?v=') === 0) {
							WAITFORONE = false;
							clearInterval(ytcheck);
						}
					}, 10);
				}
			}
		});
	}
}
/*
if (CLIENT.name === 'Benny91') {
	setTimeout(function() {
		function changeNames(tvIndex, idIndex) {
			if (tvIndex[idIndex] !== undefined && tvIndex[0].split(' - Christmas')[0].split(' - Halloween')[0].indexOf(' - ') > -1) {
				$.ajax({
					url: 'https://www.googleapis.com/oauth2/v3/token?client_id=989762828175-kjf3580c9t3q3lp8c7npl2kpjfgchmkd.apps.googleusercontent.com&client_secret='+SECRETKEY+'&refresh_token=1/MN569YlPLnR4u0n0bj56T5ttKCizY8gg5vL-IziEldFIgOrJDtdun6zK6XiATCKT&grant_type=refresh_token',
					type: 'POST',
					contentType: 'application/json',
					dataType: 'json',
					success: function(data) {
						console.log(data);
						ACTO = data.access_token;
					},
					error: function(data) {
						console.log(data);
					},
					complete: function(data) {
						$.ajax({//GET https://www.googleapis.com/drive/v3/files/0B_F_V9jIQXymbGgxbXdXdDRLTlE?key={YOUR_API_KEY}
							url: 'https://www.googleapis.com/drive/v3/files/' + tvIndex[idIndex] + '?access_token=' + ACTO,
							type: 'GET',
							contentType: 'application/json',
							dataType: 'json',
							success: function(data) {
								console.log(data);
								tvName = data.name;
								fileType = tvName.match(/\..{2,4}$/);
								fileName = tvName.split(/ - /)[0];
							},
							error: function(data) {
								console.log(data);
							},
							complete: function(data) {
								$.ajax({//PATCH https://www.googleapis.com/drive/v3/files/0B_F_V9jIQXymbGgxbXdXdDRLTlE?key={YOUR_API_KEY}
									url: 'https://www.googleapis.com/drive/v2/files/' + tvIndex[idIndex] + '?access_token=' + ACTO,
									type: 'PATCH',
									contentType: 'application/json',
									dataType: 'json',
									data: JSON.stringify({
										"title": fileName + ' - ' + tvIndex[0].split(' - Christmas')[0].split(' - Halloween')[0].split(' - ')[1] + fileType
									}),
									success: function(data) {
										console.log(data);
									},
									error: function(data) {
										console.log(data);
									},
									complete: function(data) {
										if (tvIndex[idIndex + 1] === undefined) {
											tvIn += 1;
											changeNames(TV_Array[tvIn], 2);
										} else {
											changeNames(TV_Array[tvIn], idIndex + 1);
										}
									}
								});
							}
						});
					}
				});
			} else {
				tvIn += 1;
				changeNames(TV_Array[tvIn], 2);
			}
		}
		tvIn = 0;
		changeNames(TV_Array[tvIn], 2);
	}, 10000);
}
*/
var CAREFUL = true
var CHECKITOUT = false;
function addShare(part1, part2, part3, part4, part5, element, name) {
	if (part1 === undefined) {
		WAITFORONE = false;
	}
	if (!CAREFUL) {
		$('.trailertext').text('You\'re adding too fast.');
	}
	if (part1 !== 'undefined' && part1 !== '' && part1 !== undefined && part1 !== 'Recently Added' && part1.length > 20 && CAREFUL && hasPermission("playlistadd")) {
		$('.trailertext').text('Loading...');
		CAREFUL = false;
		$.ajax({
			url: 'https://www.googleapis.com/oauth2/v3/token?client_id=989762828175-kjf3580c9t3q3lp8c7npl2kpjfgchmkd.apps.googleusercontent.com&client_secret='+SECRETKEY+'&refresh_token=1/MN569YlPLnR4u0n0bj56T5ttKCizY8gg5vL-IziEldFIgOrJDtdun6zK6XiATCKT&grant_type=refresh_token',
			type: 'POST',
			contentType: 'application/json',
			dataType: 'json',
			success: function(data) {
				console.log(data);
				ACTO = data.access_token;
			},
			error: function(data) {
				console.log(data);
				if (SECRETKEY.length === 0) {
					$('.trailertext').text('Unauthorized request.');
				} else {
					$('.trailertext').text('Error: Token request failed. Secret key is incorrect.');
					CAREFUL = true;
					CHECKITOUT = false;
				}
			},
			complete: function(data) {
				$.ajax({
					url: 'https://www.googleapis.com/drive/v2/files/' + part1 + '/permissions?access_token=' + ACTO,
					type: 'POST',
					contentType: 'application/json',
					dataType: 'json',
					data: JSON.stringify({
						"role": "reader",
						"type": "anyone",
						"withLink": true
					}),
					success: function(data) {
						console.log(data);
					},
					error: function(data) {
						console.log(data);
						$('.trailertext').text('Error: Permission request failed. Please notify Benny91 of this error.');
						CAREFUL = true;
						CHECKITOUT = false;
					},
					complete: function(data) {
						parsed = parseMediaLink('https://drive.google.com/file/d/' + part1 + '/view?usp=sharing');
						socket.emit("queue", {
							id: parsed.id,
							pos: 'end',
							type: parsed.type,
							temp: $(".add-temp").prop("checked")
						});
						checktimeout = 0;
						deletecheck = setInterval(function() {
							active = $('.queue_active a').attr("href");
							whatbethis = $("#queue").children().last().children('.qe_title').attr('href');
							checktimeout += 10;
							if (checktimeout === 30000) {
								clearInterval(deletecheck);
								CAREFUL = true;
								return;
							}
							if (whatbethis === 'https://docs.google.com/file/d/' + part1 && active !== undefined) {
								clearInterval(deletecheck);
								part2 === undefined ? WAITFORONE = false : '';
								CAREFUL = true;
								CHECKITOUT = false;
								idcheck = active.split('https://docs.google.com/file/d/')[1];
								addShare(part2, part3, part4, part5, 'undefined', element, name);
								if (element === '#movielist' && (part2 === 'undefined' || part2 === 'Recently Added')) {
									if ($('#mlistquery').val() && name === undefined) {
										$('.trailertext').text('Random movie matching "' + $("#mlistquery").val().trim() + '" - "' + titties + '" added to end');
									} else if (!$('#mlistquery').val() && name === undefined) {
										$('.trailertext').text('Random movie: "' + titties + '" added to end');
									} else if (name !== undefined) {
										$('.trailertext').text('"' + name + '" added to end');
									}
								} else if (element === '.serieslist' && (part2 === 'undefined' || part2 === 'Recently Added')) {
									if ($('#tvlistquery').val() && name === undefined) {
										$('.trailertext').text('Random episode matching "' + $("#tvlistquery").val().trim() + '" - "' + titties + '" added to end');
									} else if (!$('#tvlistquery').val() && name === undefined) {
										$('.trailertext').text('Random episode: "' + titties + '" added to end');
									} else if (name !== undefined) {
										$('.trailertext').text('"' + name + '" added to end');
									}
								}
							}
						}, 10);
					}
				});
			}
		});
	}
	if (part1 === '' && CLIENT.rank > -1 && CAREFUL) {
		if (element === "#movielist") {
			leng = $(element + ' li[style="display: block;"]').length;
			num = Math.round(Math.random() * leng);
			titofit = $(element + ' li[style="display: block;"]').eq(num - 1).children('span:nth-child(1)');
			nth = 3
			titties = titofit.text().split('âœ‡ ')[1];
		} else if (element === ".serieslist") {
			leng = $(element + '[style="display: block; list-style: none; padding-left: 0px;"] li').length;
			num = Math.round(Math.random() * leng);
			titofit = $(element + '[style="display: block; list-style: none; padding-left: 0px;"] li').eq(num - 1).children('span:nth-child(1)');
			nth = 1
			titties = titofit.parent().parent().children('span:nth-child(4)').text() + ' ' + titofit.text().split('âœ‡ ')[1];
		}
		ranpick = titofit.children('a:nth-child(' + nth + ')').attr('onclick').split("addShare('")[1].split("')")[0].split("', '");
		addShare(ranpick[0], ranpick[1], ranpick[2], ranpick[3], ranpick[4], element);
	}
}

$("#getplaylist").remove();

function patchWrap() {
	$("#playlistmanagerwrap").show();
}

socket.on("rank", toggleAdvancedPl);
socket.on("login", patchWrap);

setLayout();
scrollQueue();

/*$(document).ready(function() {
	if (!FULLSCREEN) {
		fullscreenMode();
		$("#fullscreen-btn").addClass('btn-success').attr('title', 'Reset to Normal Sizing');
		fixtheirheight2 = setInterval(function() {
			$("#chatwrap").height($("#videowrap").height());
			$("#messagebuffer, #userlist").height($("#videowrap").height() - 92);
			$("#messagebuffer, #userlist").height($("#videowrap").height() - 92) ? clearInterval(fixtheirheight2) : '';
			scrollChat();
		}, 500);
	} else {
		fixtheirheight = setInterval(function() {
			$("#chatwrap").height($("#videowrap").height());
			$("#messagebuffer, #userlist").height($("#videowrap").height() - 92);
			$("#messagebuffer, #userlist").height($("#videowrap").height() - 92) ? clearInterval(fixtheirheight) : '';
			scrollChat();
		}, 500);
	}
});*/

if (FLUID) {
	$(".container").removeClass('container').addClass('container-fluid');
	$("footer .container-fluid").removeClass('container-fluid').addClass('container');
}

$("#togglemotd").remove();
$("<button id='menubtn' class='btn-success' style='display:table;margin:auto' >Minimize</button>").prependTo('#motdwrap');
$("#menubtn").click(function() {
	if (!MOTDYES) {
		/*loopFlicker();
		spiderLoop0();
		spiderLoop1();
		spiderLoop2();
		spiderLoop3();
		spiderLoop4();
		spiderLoop5();*/
		$("#menubtn").text("Minimize").removeClass('btn-default').addClass('btn-success');
		$("#motd").show();
		MOTDYES = true;
		setOpt(CHANNEL.name + "_motdyes", MOTDYES);
	} else {
		$("#menubtn").text("Info").removeClass('btn-success').addClass('btn-default');
		$("#motd").hide();
		MOTDYES = false;
		setOpt(CHANNEL.name + "_motdyes", MOTDYES);
		setOpt(CHANNEL.name + "_updatehash", UPHASH);
	}
});
!MOTDYES ? $("#motd").css("display", "none") && $("#menubtn").text("Info").removeClass('btn-success').addClass('btn-default') : '';

$("#messagebuffer").mouseenter(function() {
	SCROLLCHAT = !0;
}).mouseleave(function() {
	SCROLLCHAT = !0;
});

function fullscreenMode() {
	$("#chatheader > span.label").each(function() {
		labeltext = $(this).text();
		if (SAVETEXTARRAY.length < 5) {
			SAVETEXTARRAY.push(labeltext);
		}
		$(this).text(labeltext.substring(0, 1));
	});
	$("#chatwrap, #chatavewrap").removeClass().addClass('col-lg-3 col-md-3');
	$("#videowrap").removeClass().addClass("col-lg-9 col-md-9");
	changeRatio();
	fitPlayer();
	fitChat("normal");
	$('#userlist').hide();
	$("#userlisttoggle").removeClass('glyphicon-chevron-down').addClass('glyphicon-chevron-right');
	//$('#pinup-btn, #config-btn, #mode-sel').prop('disabled', true);
	$('#embedform').removeClass().addClass('col-lg-3 col-md-3');
	SOUNDSPANEL = false;
	$("#sounds-dropdown").remove();
	$("#db-btn").removeClass('label-success').addClass('label-default');
	FONTPANEL = false;
	$("#fontspanel").remove();
	$("#fonts-btn").removeClass('btn-success').addClass('btn-default');
	scrollChat();
	FULLSCREEN = false;
	setOpt(CHANNEL.name + "_fullscreen", FULLSCREEN);
}

setUserCSS();

function unfullscreenMode() {
	st = 0
	$("#chatheader > span.label").each(function() {
		$(this).text(SAVETEXTARRAY[st]);
		st += 1;
	});
	$("#chatwrap, #chatavewrap").removeClass().addClass('col-lg-5 col-md-5');
	$("#videowrap").removeClass().addClass("col-lg-7 col-md-7");
	changeRatio();
	fitPlayer();
	fitChat("normal");
	$('#userlist').show();
	$("#userlisttoggle").removeClass('glyphicon-chevron-right').addClass('glyphicon-chevron-down');
	$('#pinup-btn, #config-btn, #mode-sel').prop('disabled', false);
	$('#embedform').removeClass().addClass('col-lg-5 col-md-5');
	scrollChat();
	FULLSCREEN = true;
	setOpt(CHANNEL.name + "_fullscreen", FULLSCREEN);
	SOUNDSPANEL ? setPanelProperties($("#sounds-dropdown")) : '';
	FONTPANEL ? setPanelProperties($("#fontspanel")) : '';
}
/*
$("#fullscreenbtn").click(function() {
    var e = document.querySelector("#videowrap .embed-responsive")
      , t = e.requestFullscreen || e.mozRequestFullScreen || e.webkitRequestFullscreen || e.msRequestFullscreen;
    t && t.call(e)
});
*/
/*
$('<button id="fulldisplaybtn" class="btn btn-sm btn-default" title="Under Maintenance">?</button>').appendTo("#playercontrols").click(function() {
    var e = document.querySelector("#main")
      , t = e.requestFullscreen || e.mozRequestFullScreen || e.webkitRequestFullscreen || e.msRequestFullscreen;
    t && t.call(e)
	$("#main").css({"width":"100%"});

	$("#chatwrap").removeClass().addClass('col-lg-1 col-md-1);
	$("#videowrap").removeClass().addClass('col-lg-11 col-md-11);
	$("#chatcontrols").hide()
	$("#messagebuffer").outerHeight($("#videowrap").outerHeight() - $("#chatline").outerHeight())
});
*/

CyTube.ui.changeVideoWidth = function(e) {
	clearInterval(FIXHEIGHT);
    if (/hd/.test(document.body.className))
        throw new Error("ui::changeVideoWidth does not work with the 'hd' layout");
    var t = document.getElementById("videowrap")
      //, a = document.getElementById("leftcontrols")
      //, n = document.getElementById("leftpane")
      , s = document.getElementById("chatwrap")
      //, o = document.getElementById("rightcontrols")
      //, i = document.getElementById("rightpane")
      , r = t.className.match(/col-md-(\d+)/);
    if (!r)
        throw new Error("ui::changeVideoWidth: videowrap is missing bootstrap class!");
    var l = parseInt(r[1], 10) + e;
    if (!(l < 1 || l > 11)) {
        var d = 12 - l;
	if (l === 11) {
		$('#usercount').attr('style', 'display:block');
		$('#db-btn, #modflair').hide();
	} else {
		$('#usercount').attr('style', 'display:initial');
		$('#db-btn, #modflair').show();
	}
        t.className = "col-md-" + l + " col-lg-" + l,
        //o.className = "col-md-" + l + " col-lg-" + l,
        //i.className = "col-md-" + l + " col-lg-" + l,
        s.className = "col-md-" + d + " col-lg-" + d,
	$('#chatwrap').height($('#videowrap').height()),
	scrollChat(),
        //a.className = "col-md-" + d + " col-lg-" + d,
        //n.className = "col-md-" + d + " col-lg-" + d,
        handleVideoResize()
    }
}

$("#resize-video-larger").hover(function() {
	$(this).attr('style', 'color:white;background-color;black');
}, function() {
	$(this).attr('style', 'color:green;background-color;black');
});
$("#resize-video-smaller").hover(function() {
	$(this).attr('style', 'color:white;background-color;black');
}, function() {
	$(this).attr('style', 'color:red;background-color;black');
});

$('<span id="ratio" style="float:right;font-weight:900;padding-right:20px;"></span>').insertBefore($("#currenttitle"));
function changeRatio() {
	chatpart = parseInt($("#chatwrap").attr('class').split('col-md-')[1]);
	vidpart = parseInt($("#videowrap").attr('class').split('col-md-')[1]);
	$("#ratio").text(chatpart + ':' + vidpart);
}
$("#resize-video-larger, #resize-video-smaller").click(function() {
	changeRatio();
});

$('#chatheader').children().each(function() {
	$(this).click(function() {
		clearInterval(FIXHEIGHT);
	});
});

savevote = '';
function optionClick() {
	$("#pollwrap > div.well.active > div.option > button").click(function() {
		savevote = $(this).parent().text().replace($(this).text(), '');
	});
}
optionClick();

socket.on("updatePoll", function(data) {
	userlength = $('.userlist_item').length;
  if (userlength > 2) {
		userlength -= 1;
	}
	if (data.options[data.options.length - 1].indexOf('Other') === 0 && data.counts[data.counts.length - 1] >= userlength / 2) {
		savevote = '';
	}
});

socket.on("newPoll", function(data) {
	dataoptions = data.options;
	$.each(dataoptions, function(o) {
		dataoptions[o] = $("<div>").html(dataoptions[o]).text();
	});
	if ($.inArray(savevote, dataoptions) > -1) {
		socket.emit("vote", {
			option: $.inArray(savevote, dataoptions)
		});
    $("#pollwrap > div.well.active > div.option > button").each(function() {
    	$(this).attr("disabled", "disabled");
    	$(this).parent().addClass("option-selected");
    });
	} else {
		savevote = '';
	}
	optionClick();
});

socket.on("closePoll", function() {
	$("#closepolls").remove();
	$('<button style="float:right" class="btn btn-xs btn-default btn-danger" id="closepolls">Clear Old Polls</button>').insertBefore('.well.muted:first').click(function() {
		$('.well.muted').remove();
		$("#closepolls").remove();
	});
});

if (CLIENT.rank > 2 && CLIENT.name !== "ChillTVBot") {
	$("#pollwrap > div > button.btn.btn-danger.btn-sm.pull-right").attr('disabled', true);
	socket.on("newPoll", function() {
		$("#pollwrap > div > button.btn.btn-danger.btn-sm.pull-right").attr('disabled', true);
	});
	socket.on("updatePoll", function() {
		$("#pollwrap > div > button.btn.btn-danger.btn-sm.pull-right").attr('disabled', true);
	});
}

/*
setTimeout(function() {
if (CLIENT.name === 'Benny91') {
newList = [];
function patchEpisodeNames(i) {
	if (TV_Array[i] === undefined) {
		newHtml = 'TV_Array = [<br/>';
	    	for (var nl = 0; nl< newList.length; nl++) {
			newHtml += newList[nl] + '],<br/>';
		}
		$('#channeloptions > div.modal-dialog > div > div.modal-footer').append('<div/>').html(newHtml + '];');
		console.log(newHtml);
		return;
	}
	if (TV_Array[i][2] === undefined) {
		title = encodeURIComponent(TV_Array[i][0].split(/ \(\d{4}/)[0]);
		if (TV_Array[i][0].match(/\(\d{4}/)) {
			year = encodeURIComponent(TV_Array[i][0].match(/\((\d{4})/)[1]);
		} else {
			year = '';
		}
		newRow = ['[\'' + TV_Array[i][0].replace("'", "\\'") + '\'', ' \'' + TV_Array[i][1] + '\''];
		for (var ID = 2; ID < TV_Array[i].length; ID++) {
			newRow.push(' \'' + TV_Array[i][ID] + '\'');
		}
		newList.push(newRow);
		return patchEpisodeNames(i + 1);
	} else {
		if (TV_Array[i][0].match(/^S\d{2}E\d{2}/)) {
			season = encodeURIComponent(TV_Array[i][0].match(/^S(\d{2})/)[1]);
			episode = encodeURIComponent(TV_Array[i][0].match(/^S\d{2}E(\d{2})/)[1]);
		} else {
			newRow = ['[\'' + TV_Array[i][0].replace("'", "\\'") + '\'', ' \'' + TV_Array[i][1] + '\''];
			for (var ID = 2; ID < TV_Array[i].length; ID++) {
				newRow.push(' \'' + TV_Array[i][ID] + '\'');
			}
			newList.push(newRow);
			return patchEpisodeNames(i + 1);
		}
	}
	$.ajax('https://cors-anywhere.herokuapp.com/http://www.omdbapi.com/?t=' + title + '&y=' + year + '&Season=' + season + '&Episode=' + episode + '&apikey=' + omdbkey, {
		success: function(data) {
			if (TV_Array[i][0].match(/ - Christmas$/)) {
				holiday = ' - Christmas';
			} else if (TV_Array[i][0].match(/ - Halloween$/)) {
				holiday = ' - Halloween';
			} else {
				holiday = '';
			}
			datatitle = data.Title;
			if (datatitle !== undefined) {
				if (TV_Array[i][0].match(/E\d{2}[a-c]/)) {
					letter = TV_Array[i][0].match(/E\d{2}([a-c])/)[1];
					datatitle = datatitle.split('/');
					if (letter === 'a') {
						datatitle = datatitle[0];
					}
					if (letter === 'b') {
						datatitle = datatitle[1];
					}
					if (letter === 'c') {
						datatitle = datatitle[2];
					}
				}
			}
			epName = TV_Array[i][0].split(' - Christmas')[0].split(' - Halloween')[0] + ' - ' + datatitle + holiday;
		},
		error: function(data) {
			console.log('error ' + i);
			epName = TV_Array[i][0];
		},
		complete: function(data) {
			newRow = ['[\'' + epName + '\'', ' \'' + TV_Array[i][1] + '\''];
			for (var ID = 2; ID < TV_Array[i].length; ID++) {
				newRow.push(' \'' + TV_Array[i][ID] + '\'');
			}
			newList.push(newRow);
			return patchEpisodeNames(i + 1);
		}
	});
}
patchEpisodeNames(0);
/*newList = [];
function patchGenres(i) {
	if (Movie_Array[i] === undefined) {
		newHtml = 'Movie_Array = [<br/>';
		for (var nl = 0; nl < newList.length; nl++) {
			newHtml += newList[nl] + '],<br/>';
		}
		$('#channeloptions > div.modal-dialog > div > div.modal-footer').append('<div/>').html(newHtml + '];');
		console.log(newHtml);
		return;
	}
	title = encodeURIComponent(Movie_Array[i][0].split(/ \(\d{4}\)/)[0]);
	if (Movie_Array[i][0].match(/\(\d{4}\)/)) {
		year = encodeURIComponent(Movie_Array[i][0].match(/\((\d{4})\)/)[1]);
	/*} else {
		year = '';
	}
	$.ajax('https://cors-anywhere.herokuapp.com/http://www.omdbapi.com/?t=' + title + '&y=' + year + '&apikey=' + omdbkey, {
		success: function(data) {
			console.log(i);
			newGenre = data.Genre;
		},
		error: function(data) {
			console.log(data);
			console.log(Movie_Array[i][0]);
			newGenre = Movie_Array[i][1];
		},
		complete: function(data) {
			newRow = ['[\'' + Movie_Array[i][0].replace("'", "\\'") + '\'', ' \'' + newGenre + '\''];
			for (var ID = 2; ID < Movie_Array[i].length; ID++) {
				newRow.push(' \'' + Movie_Array[i][ID] + '\'');
			}
			newList.push(newRow);
			patchGenres(i + 1);
		}
	});
}
patchGenres(0);
}
}, 20000);*/

FIXHEIGHT = setInterval(function() {
	if (!FULLSCREEN) {
		fullscreenMode();
		$("#fullscreen-btn").addClass('btn-success').attr('title', 'Reset to Normal Sizing');
		$("#chatwrap").height($("#videowrap").height());
		$("#messagebuffer, #userlist").height($("#videowrap").height() - 92);
		scrollChat();
	} else {
		changeRatio();
		$("#chatwrap").height($("#videowrap").height());
		$("#messagebuffer, #userlist").height($("#videowrap").height() - 92);
		scrollChat();
	}
}, 1000);

setTimeout(function() {
	clearInterval(FIXHEIGHT);
}, 10000);

if (!HIDEPLAYER) {
	setTimeout(function() {
		coverPlayer();
		scrollChat();
	}, 10);
}
/*
if (CLIENT.rank === -1) {
	setTimeout(function() {
		num = Math.round(Math.random() * 9999);
		num < 1000 ? num = '0' + num : '';
		num < 100 ? num = '00' + num : '';
		num < 10 ? num = '000' + num : '';
		socket.emit("login", {
			name: 'guest' + num
		});
	}, 180000);
}
*/

function hideAgain() {
	HIDEAGAIN = setTimeout(function() {
		clearTimeout(HIDEAGAIN);
		$('.queue_active > div.btn-group.pull-left').hide();
		hideAgain();
	}, 99);
}
function clearHide() {
	setTimeout(function() {
		clearTimeout(HIDEAGAIN);
	}, 10000);
}
socket.on("queue", function() {
	$('.queue_active > div.btn-group.pull-left').hide();
	hideAgain();
	clearHide();
});
socket.on("changeMedia", function() {
	$('.queue_active > div.btn-group.pull-left').hide();
	hideAgain();
	clearHide();
});
socket.on("moveVideo", function() {
	$('.queue_active > div.btn-group.pull-left').hide();
	hideAgain();
	clearHide();
});
socket.on("delete", function() {
	$('.queue_active > div.btn-group.pull-left').hide();
	hideAgain();
	clearHide();
});
hideAgain();
clearHide();
/*
if (CLIENT.name === 'Clint') {
	function secondsTimeSpanToHMS(s) {
		s = Math.round(s);
		var h = Math.floor(s/3600);
		s -= h*3600;
		var m = Math.floor(s/60);
		s -= m*60;
		return h+":"+(m < 10 ? '0'+m : m)+":"+(s < 10 ? '0'+s : s);
	}
	
	function createTimer() {
		if ($("#clinttime").length > 0) {
			$("#clinttime").remove();
		}
		//widthNumber = Math.floor($("#ytapiplayer").width() - 20);
	//$("#ytapiplayer").append($('<span id="clinttime" style="font-size: 100px; position: absolute; z-index: 90;">0:00:00</span>'));
		socket.on("mediaUpdate", function(data) {
			$("#clinttime").text(secondsTimeSpanToHMS(data.currentTime));
		});
	}
	if ($('.queue_active > .qe_title').attr('href').indexOf('https://docs.google.com/file/d/') === 0) {
		createTimer();
	}
	socket.on("changeMedia", function() {
		if ($('.queue_active > .qe_title').attr('href').indexOf('https://docs.google.com/file/d/') === 0) {
			createTimer();
		} else {
			$("#clinttime").remove();
		}
	});
}
*/
/*setOpt(CHANNEL.name + "_newmoviearray", []);
function updateListData(i) {
	newmoviearray = getOrDefault(CHANNEL.name + "_newmoviearray");
	movietitle = Movie_Array[i][0].split(/\(\d{4}\)/)[0].trim();
	movieyear = Movie_Array[i][0].match(/\((\d{4})\)/)[1];
	moviecut = Movie_Array[i][0].split(/\(\d{4}\)/)[1];
	$.ajax('https://cors-anywhere.herokuapp.com/http://www.omdbapi.com/?t=' + encodeURIComponent(movietitle) + '&y=' + movieyear + '&apikey=' + omdbkey, {
		error: function(data) {
			console.log('error on ' + i + ': ' + movietitle + ' (' + movieyear + ')');
		},
		success: function(data) {
			if (movietitle === data.Title) {
				realtitle = data.Title;
			} else {
				realtitle = movietitle + '---' + data.Title;
			}
			holidaypatch = '';
			if (Movie_Array[i][1].indexOf('Christmas') > -1) {
				holidaypatch += 'Christmas, ';
			}
			if (Movie_Array[i][1].indexOf('Halloween') > -1) {
				holidaypatch += 'Halloween, ';
			}
			newmoviearray.push([realtitle + ' (' + data.Year + ')' + moviecut, holidaypatch + data.Genre]);
			for (var hm = 2; hm < 7; hm++) {
				if (Movie_Array[i][hm].length > 25) {
					newmoviearray[i].push(Movie_Array[i][hm]);
				} else {
					break;
				}
			}
			newmoviearray[i].push(data.Rated, data.imdbRating);
			for (var dr = 0; dr < data.Ratings.length; dr++) {
				if (data.Ratings[dr].Source === 'Rotten Tomatoes') {
					newmoviearray[i].push(data.Ratings[dr].Value.split('%')[0]);
					break;
				} else if (dr === data.Ratings.length - 1) {
					newmoviearray[i].push('N/A');
				}
			}
			newmoviearray[i].push(data.Metascore);
			if (Movie_Array[i][Movie_Array[i].length - 1] === 'Recently Added') {
				newmoviearray[i].push('Recently Added');
			}
			setOpt(CHANNEL.name + "_newmoviearray", newmoviearray);
			setTimeout(function() {
				updateListData(i+1);
			}, 1000);
		}
	});
}
setTimeout(function() {
	updateListData(0);
}, 15000);
*/
/*
if (CLIENT.name === ',....') {
	setTimeout(function() {
	function findRatings(i) {
		$.ajax('https://cors-anywhere.herokuapp.com/http://www.omdbapi.com/?t=' + Movie_Array[i][0].split(/\(\d{4}\)/)[0].trim() + '&y=' + Movie_Array[0][0].match(/\((\d{4})\)/)[1] + '&apikey=' + omdbkey, {
			error: function(data) {
				console.log('error on ' + i);
			},
			success: function(data) {
				Movie_Array[i].push(data.imdbRating + ' - ' + data.imdbVotes);
			},
			complete: function(data) {
				setTimeout(function() {
					i += 1;
					if (i !== Movie_Array.length) {
						findRatings(i);
					} else {
						newHtml = 'Movie_Array = [<br/>';
						for (var nl = 0; nl < newList.length; nl++) {
							newHtml += newList[nl] + '],<br/>';
						}
						$('#channeloptions > div.modal-dialog > div > div.modal-footer').append('<div/>').html(newHtml + '];');
						console.log(newHtml);
						return;
					}
				}, 1000);
			}
		});
	}
	findRatings(0);
	}, 10000);
}
