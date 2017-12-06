/***********************************************************************************************************************

-Synchtube Premium Â© 2016-2017 by ZimnyLech

Version:		2.4.3
Release date:		2017-02-05
-License:		Creative Commons CC-BY-NC-SA 4.0		
-License URL:		http://creativecommons.org/licenses/by-nc-sa/4.0/

INSTALLATION:
_____________

1. Log as an admin to your channel, and go to Channel Settings > Admin Settings
2. Paste following URL to "External Javascript": https://dl.dropboxusercontent.com/s/1dyazoq6t7wh808/Premium.js

Installation finished!


API CONTENTS:
_____________

[REGION 1]		INITIAL GLOBAL VARIABLES
[REGION 2]		GLOBAL FUNCTIONS
[REGION 3]		USER INTERFACE
[REGION 4]		USER INTERFACE EVENTS
[REGION 5]		SYNCHTUBE API EXTENSION
[REGION 6]		IMGUR API
[REGION 7]		OEKAKI API
[REGION 8]		CSS AND FINAL LAYOUT

***********************************************************************************************************************/


// Force API reloading if script was already activated to prevent reduplication of the layout elements,
// it prevents also incompability with "Chat Only" default layout option

if (typeof LOADED !== "undefined" || $("body").hasClass('chatOnly')) document.location.reload();


// API activation control

START = new Date().getTime();
var errmsg = 'Synchtube Premium Error! Script was not activated properly, some functions may not work. '
	   + 'If channel player doesn\'t work, refresh the page. '
	   + 'Otherwise, ask channel administrator or disable Premium script access.';
setTimeout(function() {if (typeof LOADED === "undefined") addServerMessage(errmsg)}, 5000);


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/* ---------- [REGION 1] INITIAL GLOBAL VARIABLES ---------- */

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// Get default layout settings for the first-time visitors

_LAYOUT		= USEROPTS.layout;
_USERTHEME	= document.getElementById("usertheme").getAttribute("href");
_COMPACT	= (['fluid', 'synchtube-fluid'].indexOf(_LAYOUT) > -1) ? false : true;
_SINGLECOLUMN	= (_LAYOUT == "hd") ? true : false;
_SYNCH		= (_LAYOUT.indexOf("synchtube") > -1) ? true : false;
_ELEMENTS	= 'header:1|logo:1|motd:1|announcements:1|mainheader:1|videolabels:1|chatlabels:1|maincontrols:1|'
		+ 'playlistbtns:1|playlistmenu:1|playermenu:1|playerbtns:1|mediadbbtns:1|pollemotebtns:1|colorsbtn:1|'
		+ 'chatbtns:1|chatmenus:1|plmeta:1|playlistlabels:1|footer:1';


// Get and set global variables stored in localStorage/cookies, or define default values

BIGPROFILES	= getOrDefault('SP_bigprofiles',	false);
CHATBG		= getOrDefault('SP_chatbg',		'');
CHATFONTSIZE	= getOrDefault('SP_chatfontsize',	100);
CHATMAXSIZE	= getOrDefault('SP_chatmaxsize',	100);
CHATSTYLE	= getOrDefault('SP_chatstyle',		'');
COMPACT		= getOrDefault('SP_compact',		_COMPACT);
CUSTOMPING	= getOrDefault('SP_customping',		false);
CUSTOMPINGFILE	= getOrDefault('SP_custompingfile',	'');
CUSTOMPINGLVL	= getOrDefault('SP_custompinglvl',	1);
EXECCSS		= getOrDefault('SP_execcss',		false);
EXPANDPL	= getOrDefault('SP_expandpl',		false);
FAVLINKS	= getOrDefault('SP_favlinks',		'{"links":[]}');
FULLTITLE	= getOrDefault('SP_fulltitle',		false);
HIDEPLS		= getOrDefault('SP_hidepls',		false);
HIDEPLSBTNS	= getOrDefault('SP_hideplsbtns',	false);
IGNOREAVATARS	= getOrDefault('SP_ignoreavatars',	false);
IGNORECOLORS	= getOrDefault('SP_ignorecolors',	false);
IGNORECSS	= getOrDefault('SP_ignorecss',		false);
IGNOREEMOTES	= getOrDefault('SP_ignoreemotes',	false);
IGNORESERVER	= getOrDefault('SP_ignoreserver',	false);
LARGECHAT	= getOrDefault('SP_largechat',		false);
LARGEPLAYER	= getOrDefault('SP_largeplayer',	false);
MINIATURES	= getOrDefault('SP_miniatures',		false);
MOTDBOTTOM	= getOrDefault('SP_motdbottom',		false);
MSGSEPARATOR	= getOrDefault('SP_msgseparator',	'');
MUTECHAT	= getOrDefault('SP_mutechat',		false);
PLAYERHISTORY	= getOrDefault('SP_playerhistory',	'');
PROGRESSBAR	= getOrDefault('SP_progressbar',	true);
RADIOMODE	= getOrDefault('SP_radiomode',		false);
SCROLLNAVBAR	= getOrDefault('SP_scrollnavbar',	false);
SHORTHANDS	= getOrDefault('SP_shorthands',		'{"codes":[]}');
SHOWIMAGES	= getOrDefault('SP_showimages',		false);
SHOWOEKAKI	= getOrDefault('SP_showoekaki',		false);
SHOWVIDEOS	= getOrDefault('SP_showvideos',		false);
SINGLECOLUMN	= getOrDefault('SP_singlecolumn',	false);
SOUNDSLVL	= getOrDefault('SP_soundslvl',		6);
SYNCH		= getOrDefault('SP_synch',		_SYNCH);
THEATREMODE	= getOrDefault('SP_theatremode',	false);
TICKMODE	= getOrDefault('SP_tickmode',		'utc');
TOOLSENABLED	= getOrDefault('SP_toolsenabled',	false);
ULISTRIGHT	= getOrDefault('SP_ulistright',		_SYNCH);
USERCSS		= getOrDefault('SP_usercss',		'');
USERFONT	= getOrDefault('SP_userfont',		'');
USERPATTERN	= getOrDefault('SP_userpattern',	'');
USERTHEME	= getOrDefault('SP_usertheme',		_USERTHEME);
VISITS		= getOrDefault('SP_visits',		0);


// Get and set Premium Options

AVATARSLIST	= getOrDefault('SP_avatarslist',	false);
CHATHIDESCROLL	= getOrDefault('SP_chathidescroll',	false);
CHATSOUNDS	= getOrDefault('SP_chatsounds',		false);
CHATUSERNAME	= getOrDefault('SP_chatusername',	false);
COLLAPSEMOTD	= getOrDefault('SP_collapsemotd',	false);
COLLAPSEULIST	= getOrDefault('SP_collapseulist',	false);
CUSTOMDBURL	= getOrDefault('SP_customdburl',	'');
CUSTOMFILTERS	= getOrDefault('SP_customfilters',	'synchtube > Synchtube');
CUSTOMHTML	= getOrDefault('SP_customhtml',		'');
ELEMENTS	= getOrDefault('SP_elements',		_ELEMENTS);
EMOTESPERPAGE	= getOrDefault('SP_emotesperpage',	100);
EMOTESPREVPOS	= getOrDefault('SP_emotesprevpos',	'b-left');
EXECDB		= getOrDefault('SP_execdb',		false);
EXECFILTERS	= getOrDefault('SP_execfilters',	false);
EXECHTML	= getOrDefault('SP_exechtml',		false);
GLUELAYOUT	= getOrDefault('SP_gluelayout',		false);
HIDEINDICATOR	= getOrDefault('SP_hideindicator',	false);
HIDEPLAYERURL	= getOrDefault('SP_hideplayerurl',	'');
IGNORECHATMODE	= getOrDefault('SP_ignorechatmode',	3);
IMAGEURLACCEPT	= getOrDefault('SP_imageurlaccept',	false);
PLSNOSCROLL	= getOrDefault('SP_plsnoscroll',	false);
PLSNUMBERS	= getOrDefault('SP_plsnumbers',		false);
PREMIUMNOTMODE	= getOrDefault('SP_premiumnotmode',	3);
TABMODE		= getOrDefault('SP_tabmode',		0);
TRANSPARENTNAV	= getOrDefault('SP_transparentnav',	false);
USERNAMEMARK	= getOrDefault('SP_usernamemark',	':');


// Set session global variables

BRIGHTNESS	= 0;
CHATMSGNUM	= 0;
COMMAND 	= false;
COMMANDSTSTAMPS	= new Array();
HIDDENPLR	= false;
HIDDENVWRAP	= false
LASTPLAYED 	= new Array();
MEDIADBLOAD	= false;
MUTEDVOICES	= new Array();
NOPLAYER	= false;
OEKAKILOAD	= false;
ONLINETIME 	= 0;
PLAYERTEXT	= false;
PREVTIME	= 0;
SPEAKLINK	= 'http://webanywhere.cs.washington.edu/cgi-bin/espeak/getsound.pl';
VERSION		= '2.4.3';
VISIBLETAB	= {"options":1, "commands":1, "tools":1}


// ***** BASIC CUSTOMIZATION ***** //

/* You don't need to change any of these options to make this script working. You can leave it as is. */
/* Some of the options below are undocummented/test options. They will work, if you set them properly. */
/* Absolutely DO NOT DELETE anything below, or the script may not work. */


// Optional channel favicon URL

FaviconURL		= 'https://i.imgur.com/Bzn1Op5.png';

// Channel name on the navbar instead of default server name

ChannelName		= '';

// Channel mini logo (will be resized to 36 px height) on the navbar
// and channel name left padding (depending on logo width, in px; width + 25 for the best effect)

MiniLogoURL		= 'https://i.imgur.com/dD3ymk5.png';
ChannelNamePadding	= 61;

// Optional custom navbar welcome message (default: "Welcome")

WelcomeText		= '';

// Optional Premium announcement

AnnouncementHTML	= '';

// User joining/leaving messages (user can enable/disable it in Premium Options > Advanced)

JoinMessage		= 'joined';
LeaveMessage		= 'disconnected';

// Now playing / playing next messages in Radio Mode

NowPlaying		= 'Now playing';
PlayingNext		= 'Playing next';

// Image URL for hidden player option

DefaultHPURL		= 'https://dl.dropboxusercontent.com/s/3qp3v6ychbswqvm/stop.png';

// Optional custom title caption (default: "Currently Playing:")

CustomTitleCaption	= '';

// Optional additional custom footer (text or HTML)

CustomFooterHTML	= '';

// Answers for "!ask" command

AnswersArray = [
	'definitely yes', 'yes', 'rather yes', '50/50', 'rather no',
	'no', 'definitely no', 'ask again', 'I will not answer'
];

// List of funny facts about users for undocummented "!fact" command

FactsArray = [];

// List of undocummented sound chat "filters" (user has to enable "chat voice commands and sounds" option)
// Syntax: 'chat_filter':'sound_file_URL', (best browsers support: .ogg files)

SoundFiltersArray = {};

// Optional external JavaScript file URL

ExternalScriptURL	= '';

// Imgur client ID for images uploading (leave default ID if you don't have one)

ImgurClientID		= 'a11c2b9fbdd104a';


// ***** END OF BASIC CUSTOMIZATION ***** //


// Allowed links extensions that can be displayed directly on chat by a user

ImageExtensions		= 'a[href*=".jpg"], a[href*=".jpeg"], a[href*=".png"], '
			+ 'a[href*=".tiff"], a[href*=".gif"], a[href*=".svg"]';
MediaExtensions		= 'a[href*=".webm"], a[href*=".mp4"], a[href*=".mp3"], a[href*=".ogg"]';

// List of HTML colors for "Colors" button

ColorsArray = [
	'white', 'papayawhip', 'silver', 'gray', 'black', 'yellow', 'gold', 'orange', 'orangered', 'tomato', 'pink',
	'red', 'crimson', 'deeppink', 'magenta', 'limegreen', 'green', 'olive', 'darkkhaki', 'turquoise', 'aqua',
	'dodgerblue', 'blue', 'midnightblue', 'darkslateblue', 'violet', 'darkviolet', 'purple', 'brown', 'saddlebrown'
];

// Chat text effects

TextFiltersArray = [
	{before:/col:(.*?):/g,	after:'<span style="color:$1" class="chatcolor">'},
	{before:/:@@(.+?)@@:/g,	after:'<span style="border-bottom:dotted 1px" class="txteffect">$1</span>'},
	{before:/:@(.+?)@:/g,	after:'<span style="text-decoration:underline" class="txteffect">$1</span>'},
	{before:/:!(.+?)!:/g,	after:'<span style="font-size:0.8em" class="txteffect">$1</span>'},
	{before:/:\$(.+?)\$:/g,	after:'<span style="font-variant:small-caps" class="txteffect">$1</span>'},
	{before:/:%(.+?)%:/g,	after:'<span style="letter-spacing:2px" class="txteffect">$1</span>'},
	{before:/:#(.+?)#:/g,
	 after:'<span style="font-family:Menlo,Monaco,Consolas,\'Courier New\',monospace" class="txteffect">$1</span>'},
	{before:/:\^(.+?)\^:/g,
	 after:'<span style="outline:1px dashed #98ABB9; outline-offset:-5px; background-color:#556068; '
	 + 'box-shadow:2px 2px 2px #000; padding:5px; border-radius:2px; color:#EEE" class="txteffect">$1</span>'},
	{before:/:\/\/(.+?)\/\/:/g,
	 after:'<marquee behavior="scroll" scrollamount="30" class="txteffect">$1</marquee>'},
	{before:/:\/(.+?)\/:/g,	after:'<marquee behavior="alternate" scrollamount="15" class="txteffect">$1</marquee>'}
];

// Lists for "Unicode Charaters" menu option
// '|' character will make a new line

UnicodeSymbolsArray = [
	'←', '→', '↓', '↑', '↖', '↗', '↘', '↙', '↔', '↕', '⇦', '⇨', '⇩', '⇧', '⇒', '↵', '|',
	'☆', '★', '▲', '▼', '◐', '◒', '♥', '♦', '♠', '♣', '|',
	'○', '●', '⚪', '⚫', '□', '■', '▯', '▮', '░', '█', '|',
	'♪', '♫', '☑', '☒', '✡', '☪', '✝', '☭', '☮', '☯', '♿', '♕', '✉', '☏', '|',
	'©', '®', '™', '☼', '☾', '👍', '👎', '⁕', '✔', '❀', '⛔', '☢', '⚽', '|',
	'≠', '∞', '∆', '∫', '‰', '¥', '€'
];
UnicodeLettersArray = [
	'À', 'à', 'Á', 'á', 'Ā', 'ā', 'Ã', 'ã', 'Å', 'å', 'Ä', 'ä', 'Ą', 'ą', '|', 
	'Ć', 'ć', 'Ĉ', 'ĉ', 'Č', 'č', 'Ç', 'ç', 'Đ', 'đ', 'È', 'è', 'É', 'é', 'Ē', 'ē', 'Ę', 'ę', '|',
	'Ì', 'ì', 'Í', 'í', 'Ī', 'ī', 'I', 'ı', 'Ł', 'ł', 'Ň', 'ň', 'Ń', 'ń', '|',
	'Ò', 'ò', 'Ó', 'ó', 'Ō', 'ō', 'Ô', 'ô', 'Õ', 'õ', 'Ǫ', 'ǫ', 'Ö', 'ö', 'Ř', 'ř', 'Ś', 'ś', 'Š', 'š', '|',
	'Ù', 'ù', 'Ú', 'ú', 'Ū', 'ū', 'Ů', 'ů', 'Ü', 'ü', 'Ų', 'ų', 'Ỳ', 'ỳ', 'Ý', 'ý', '|',
	'Ž', 'ž', 'Ź', 'ź', 'Ż', 'ż', 'Æ', 'æ', 'ẞ', 'ß', 'α', 'β', 'γ', 'δ', 'ω', 'μ', 'π'
];

// Additional layout themes

ThemesArray = [
	['Cosmos',	'https://dl.dropboxusercontent.com/s/w75q2eqcj6p7cz4/cosmos.css'],
	['DarkCells',	'https://dl.dropboxusercontent.com/s/d6esvco1v8iu7ir/darkcells.css'],
	['Vichan',	'https://dl.dropboxusercontent.com/s/wpux079r6kfuk3k/vichan.css'],
	['RedPlus',	'https://dl.dropboxusercontent.com/s/9y42udvkaky59a0/redplus.css'],
	['Postmodern',	'https://dl.dropboxusercontent.com/s/9pp0l6x418mpch4/triangles.css'],
	['Gray',	'https://dl.dropboxusercontent.com/s/5z8d9rsu8hobz55/grey.css'],
	['Jungle',	'https://dl.dropboxusercontent.com/s/h5w9ecz1qu0ns7g/jungle.css'],
	['Winter',	'https://dl.dropboxusercontent.com/s/i50wsa5ghh9oc0s/winter.css'],
	['FreshAir',	'https://dl.dropboxusercontent.com/s/lq14vuztxvjxqz5/freshair.css'],
];

// Background pattern images

BackgroundsArray = [
	['Chequered',	'https://dl.dropboxusercontent.com/s/9su405d9ise5e3v/chequered.png'],
	['Cosmos',	'https://dl.dropboxusercontent.com/s/qimrhicuocjutag/space.jpg'],
	['Damask',	'https://dl.dropboxusercontent.com/s/8cl7edsnhh1ncun/damask.jpg'],
	['Denim',	'https://dl.dropboxusercontent.com/s/li4q7xkxj75ev6v/denim.jpg'],
	['Hibiscus',	'https://dl.dropboxusercontent.com/s/wd6wgisowlrxpfi/hibiscus.jpg'],
	['Tiles',	'https://dl.dropboxusercontent.com/s/wsypfghvl8s39dz/checked.png'],
	['Trangles',	'https://dl.dropboxusercontent.com/s/fptdsrtetoo7zoe/triangles.png'],
	['Zigzag',	'https://dl.dropboxusercontent.com/s/pptzler9mnf6ake/zigzag.jpg'],
];

// Google fonts

FontsArray = [
	'Arimo', 'Bitter', 'Cabin', 'Fira Sans Condensed', 'Inconsolata', 'Muli', 'Merriweather',
	'Noto Sans', 'Play', 'Raleway', 'Signika', 'Slabo 27px', 'Ubuntu'
];

// Buffer frequently used DOM elements

$body		= $("body");
$nav		= $("nav");
$chatwrap	= $("#chatwrap");
$chatheader	= $("#chatheader");
$userlisttoggle	= $("#userlisttoggle");
$userlist	= $("#userlist");
$messagebuffer	= $("#messagebuffer");
$chatline	= $("#chatline");
$videowrap	= $("#videowrap");
$videoheader	= $("#videowrap-header");
$currenttitle	= $("#currenttitle");
$ytapiplayer	= $("#ytapiplayer");
$leftcontrols	= $("#leftcontrols");
$rightcontrols	= $("#rightcontrols");
$leftpane	= $("#leftpane");
$rightpane	= $("#rightpane");
$queue		= $("#queue");
$plmeta		= $("#plmeta");


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/* ---------- [REGION 2] GLOBAL FUNCTIONS ---------- */

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// ***** Helper functions (in alphabetical order) ***** //


// Add private server message to chat

function addServerMessage(html) {
	setTimeout(function() {
		$('<div class="chat-msg- serverinfo" />').appendTo($messagebuffer)
		  .html('<span class="action scriptanswer">☑ ' + html + '</span>');
		if (SCROLLCHAT) scrollChat();
	}, 500);
}

// Check if chat commands are abused

function checkCommandsAbuse() {
	var time = (new Date()).getTime();
	if (COMMANDSTSTAMPS.length > 4) {
		if (time - COMMANDSTSTAMPS[0] < 60000) {
			addServerMessage('Warning: abuse of the random-type commands (5 times per minute allowed)');
			COMMAND = false;
		}
		COMMANDSTSTAMPS.shift();
	}
	COMMANDSTSTAMPS.push(time);
}

// Display favourites links panel

function createFavsPanel() {
 	var html = '';
	var arr = JSON.parse(FAVLINKS)["links"];
	for (i in arr) {
		var id = arr[i]["id"];
		var link = arr[i]["link"];
		html += '<li class="queue_entry fav-' + id + '">'
		     +    '<button class="btn btn-xs btn-default pull-left" title="Click to copy link" '
		     +    'onClick="pasteFav(\'' + link +'\')">Paste link to add</button>'
		     +    '<a target="_blank" href="' + link + '" class="qe_title">' + arr[i]["title"] +'</a>'
		     +    '<button class="btn btn-xs btn-danger pull-right" title="Remove from list" '
		     +    'onClick="removeFav(' + id + ')"><span class="glyphicon glyphicon-trash"></span></button>';
		var parsed = parseMediaLink(link);
		if (parsed["type"] == "yt") {
			html += '<button class="btn btn-default btn-xs pull-right" title="Click to preview" '
			     +  'onclick="previewVideo(\'' + parsed["id"] + '\')">'
			     +    '<i class="glyphicon glyphicon-film"></i> Preview</button>';
		}
		html += '<div class="qe_clear"></div></li>';
	}
	var len = arr.length;
	html += '<li id="freeslots" class="queue_entry centered">' + len + ' item(s) '
	     +    '| ' + (100 - len) + ' free slot(s) available</li>';
	document.getElementById("queue-fav").innerHTML = html;
}

// Display Media Database

function createMediaDatabase() {
	var num = 0;
	var item = 0;
	var count = 0;
	var dbcount = [];
	$("#db-well").html('');
	for (i in MediaDatabase) {
		if (MediaDatabase[i][0] == "") {
			dbcount.push(count);
			count = 0;
			num++;
			var btn = $('<button id="cat-btn' + num + '" onclick="toggleCategory(\'' + num + '\')" />')
			  .addClass('btn btn-default btn-sm centered').appendTo("#db-well")
			  .html(MediaDatabase[i][1]);
			$('<div class="clearfix0" />').appendTo("#db-well");
			var ul = $('<ul id="cat-ul' + num + '" class="videolist" />').appendTo("#db-well").hide();
		} else {
			item++;
			count++;
			var link = MediaDatabase[i][0];

			var html = '<button class="btn btn-xs btn-default pull-left" title="Click to copy link" '
			     +    'onClick="pasteFav(\'' + link +'\')">Paste link to add</button>'
			     +    '<a target="_blank" href="' + link + '" class="qe_title">' + item + ' | '
			     +      MediaDatabase[i][1] +'</a>';
			var parsed = parseMediaLink(link);
			if (parsed["type"] == "yt") {
				html += '<button class="btn btn-default btn-xs pull-right" title="Click to preview" '
				     +  'onclick="previewVideo(\'' + parsed["id"] + '\')">'
				     +    '<i class="glyphicon glyphicon-film"></i> Preview</button>'
				     +  '<div class="clearfix0"></div>';
			}
			$('<li class="queue_entry" />').html(html).appendTo(ul);
		}
	}
	dbcount.push(count);

	var len = dbcount.length;
	for (var i = 1; i < len; i++) {
		$("#cat-btn" + i).html($("#cat-btn" + i).html() + ' [' + dbcount[i] + ']');
	}
}

// Display miniatures on playlist

function createMiniatures() {
	$queue.find("li").each(function() {
		var media = $(this).data("media");
		var link = '';
		if (media.type == "yt") {
			link = 'http://img.youtube.com/vi/' + media.id + '/1.jpg';
		} else if (media.type == "dm") {
			link = 'http://www.dailymotion.com/thumbnail/video/' + media.id;
		}
		if (link != "") {
			if (USEROPTS.qbtn_idontlikechange) {
				$(this).append('<img src="' + link + '" class="miniature" />');
			} else {
				$(this).find(".btn-group").before('<img src="' + link + '" class="miniature" />');
			}
		}
	});
	scrollQueue();
}


// Create new modal window with selected title

function createModal(title) {
	outer = $('<div class="modal fade" />').appendTo($body).modal()
		  .on("hidden.bs.modal", function() {
			$(this).remove();
		  });
	dialog = $('<div class="modal-dialog modal-dialog-nonfluid non-fluid" />').appendTo(outer);
	var html = '<button class="close" data-dismiss="modal" aria-hidden="true">&times;</button>'
		 + '<h3>' + title + '</h3>';
	modal = $('<div class="modal-content" />').appendTo(dialog)
		  .append('<div class="modal-header">' + html + '</div>');
	body = $('<div class="modal-body scrolled" />').appendTo(modal);
	var html = '<button type="button" data-dismiss="modal" class="btn btn-default">Close</button>';
	footer = $('<div class="modal-footer">' + html + '</div>').appendTo(modal);
}


// Enhance emotes displaying

function enhanceEmotes(elem) {
	elem.find("img.channel-emote").each(function() {
		$(this).attr('onClick', 'insertText("' + $(this).attr("title") + ' ")');
	});
}

// Execute chat text effects

function execTextEffects(html) {
	for (i in TextFiltersArray) {
		html = html.replace(TextFiltersArray[i].before, TextFiltersArray[i].after);
	}
	return html;
}

// Fix user CSS after channel options changes

function fixUserCSS() {
	CHANCSS = $("#chancss").length > 0 ? $("#chancss").html() : '';
	CHANEXTERNALCSS = $("#chanexternalcss").length > 0 ? $("#chanexternalcss").attr('href') : '';
	if (IGNORECSS) $("#chanexternalcss, #chancss").remove();
	if ($("#usertheme2").length > 0) $("head").append($("#usertheme2").detach());
	$("head").append($("#hardcss").detach());
	setAdditionalCSS();
}


// Format playlist raw list

function formatRawList() {
	var list = [];
	$queue.find("li").each(function() {
		list.push(formatURL($(this).data("media")));
	});
	return list.join(',');
}

// Get current item position

function getCurPos() {
	if (PLAYER && PLAYER.yt && PLAYER.yt.getCurrentTime) {
		return PLAYER.yt.getCurrentTime();
	} else if (PLAYER && PLAYER.dm && PLAYER.dm.currentTime) {
		return PLAYER.dm.currentTime;
	} else if (PLAYER && PLAYER.vimeo && PLAYER.vimeo.api) {
		PLAYER.vimeo.api('getCurrentTime', function(t) {
			if (PLAYER.vimeo) PLAYER.vimeo.currentTime = parseFloat(t);
		});
		if (PLAYER.vimeo) return PLAYER.vimeo.currentTime;
	} else if (PLAYER && PLAYER.soundcloud && PLAYER.soundcloud.getPosition) {
		PLAYER.soundcloud.getPosition(function(t) {
			if (PLAYER.soundcloud) PLAYER.soundcloud.currentTime = t / 1000;
		});
		if (PLAYER.soundcloud) return PLAYER.soundcloud.currentTime;
	} else if (PLAYER && PLAYER.mediaType.match(/g[dp]/) && PLAYER.player && PLAYER.player.currentTime) {
		return PLAYER.player.currentTime();
	} else {
		return -0.01;
	}
}

// Get media info in Radio Mode

function getQueueInfo() {
	var html = '';
	var item = $(".queue_active");
	html += NowPlaying + ': ' + (item.length > 0 ? item.data("media").title : '---')
	     +  ' [' + (item.length > 0 ? item.data("media").duration : '--:--') + ']<br />';
	var item = $(".queue_active").next();
	html += PlayingNext + ': ' + (item.length > 0 ? item.data("media").title : '---')
	     +  ' [' + (item.length > 0 ? item.data("media").duration : '--:--') + ']<br /><br />'
	     +  $("#usercount").html();
	newplaylist.html(html);
}

// Get variable from channel external JS file URL

function getURLVar(v) {
	var link = CHANNEL.opts.externaljs.split("?");
	if (link.length < 2) return '';
	var vars = link[1].split("&");
	for (var i = 0; i < vars.length; i++) {
		var p = vars[i].split("=");
		if(p[0] == v) return p[1];
		return '';
	}
}

// Handle various options after media change

function handleMediaChange() {
	if ($queue.find(".queue_entry").length > 0) {
		var uid = $(".queue_active").data("media");
		(['yt', 'gd', 'fi'].indexOf(uid.type) > -1) ? $("#pls-4").show() : $("#pls-4").hide();
		var link = formatURL(uid);
		var html = '<a href="' + link + '" target="_blank">' + uid.title + '</a>';
		if (LASTPLAYED.length < 1 || LASTPLAYED[LASTPLAYED.length - 1] != html) {
			LASTPLAYED.push(html);
			var plhist = getOrDefault('SP_playerhistory', '');
			var arr = plhist.length > 0 ? plhist.split("||+||") : [];
			arr.unshift(html);
			if (arr.length > 50) arr = arr.slice(0,50);
			setOpt('SP_playerhistory', arr.join("||+||"));
		}
		if (TABMODE == 2) pageTitle();
	} else {
		$("#pls-4").hide();
		if (TABMODE == 2) pageTitle();
	}

	if (CustomTitleCaption != "") {
		$currenttitle.html($currenttitle.html().replace('Currently Playing:', CustomTitleCaption));
	}

	if ($videoheader.hasClass('pbar')) {
		$videoheader.css('background-size', '0% 100%');
		PREVTIME = 0;
	}

	if (HIDDENPLR) {
		$("#hidden-plr").remove();
		$videoheader.show();
		$("#videowrap .embed-responsive-16by9").show();
		$("#plr-1").removeClass('activated');
		HIDDENPLR = false;
	}

	NOPLAYER ? $("#togglepl-btn").hide() : $("#togglepl-btn").show();

	if ($queue.find(".queue_entry").length > 0 && FAVLINKS.indexOf(link) > -1) {
		$favsbtn.addClass('btn-success');
		$("#addtofav-btn").addClass('btn-success disabled');
	} else if ($queue.find(".queue_entry").length < 1) {
		$("#addtofav-btn").addClass('disabled');
	} else {
		$favsbtn.removeClass('btn-success');
		$("#addtofav-btn").removeClass('btn-success disabled');
	}
}

// Handle elements dependable on user ranks

function handleRank() {
	CLIENT.rank > 2 ? $("#tools-btn, #autoclear-btn").show() : $("#tools-btn, #autoclear-btn").hide();
	hasPermission("chatclear") ? $("#clear-btn").show() : $("#clear-btn").hide();
	hasPermission("leaderctl") ? $("#leader-btn").show() : $("#leader-btn").hide();
	HIDEPLSBTNS ? $queue.addClass('nobuttons') : $queue.removeClass('nobuttons');
}

// Hide chat emotes

function hideEmotes(elem) {
	elem.find("img.channel-emote").each(function() {
		var span = $('<span class="span-emote">').attr('link', $(this).attr('src'))
		  .html($(this).attr('title')).insertAfter($(this));
		$(this).remove();
	});
}

// Insert selected text to chatline

function insertText(str) {
	$chatline.val($chatline.val() + str).focus();
}

// Load external Media Database

function loadDatabase(link) {
	var c = $('<div class="centered" />').html('Loading external Media Database...').appendTo("#db-well");
	setTimeout(function() {
		if (typeof MediaDatabase === "undefined") {
			c.html('Database loading error or invalid link!');
			setTimeout(function() {$("#db-well div").remove()}, 10000);
			return;
		}
	}, 10000);
	$.getScript(link, function() {
		if (typeof MediaDatabase === "undefined") {
			var html = 'Database loading error or invalid link!';
			if (link.indexOf("www.dropbox.com") > -1) {
				html += ' Change "www.dropbox.com" to "dl.dropboxusercontent.com".';
			}
			c.html(html);
			setTimeout(function() {$("#db-well div").remove()}, 20000);
			return;
		}
		$("#db-btn").addClass('jsloaded');
		$("#getdb-btn").show();
		createMediaDatabase();
		MEDIADBLOAD = true;
	});
}

// Show media current time when full-width title bar is enabled

function mediaClock() {
	var time = (!PLAYER || PLAYER.mediaType === undefined) ? -1 : getCurPos();
	if ($queue.find(".queue_active").length < 1 || time < 0) {
		var pos = "--:--";
		var tot = "--:--";
	} else {
		var pos = formatTime(Math.round(time));
		var tot = formatTime(Math.round($(".queue_active").data("media").seconds));
	}
	$("#mediaclock").html(pos + " |&nbsp;");
	$("#totalclock").html(tot);
}

// Add server info after media change

function nowPlaying() {
	if (PREMIUMNOTMODE < 3 || $queue.find(".queue_entry").length < 1) return;
	var uid = $(".queue_active").data("media");
	var html = NowPlaying + ': ' + uid.title + ' [' + uid.duration + ']';
	if ($favsbtn.hasClass('btn-success')) html += ' <span class="glyphicon glyphicon-thumbs-up"></span>';
	if (!NOPLAYER) addServerMessage(html);
}

// Update user online time

function onlineTime() {
	ONLINETIME++;
}

// Page title

function pageTitle() {
	if (TABMODE == 0) {
		var title = '/r/' + window.location.href.split("/").pop();
	} else if (TABMODE == 1) {
		var title = '[' + CHATMSGNUM + '] chat message(s)';
	} else if (TABMODE == 2) {
		if ($queue.find(".queue_entry").length > 0) {
			var title = $(".queue_active").data("media").title;
		} else {
			var title = '(nothing playing)';
		}
	}
	document.title = title;
	PAGETITLE = title;
}

// Paste link from the favourites list to URL input

function pasteFav(link) {
	if (!$("#showmediaurl").hasClass('active')) document.getElementById("showmediaurl").click();
	$("#mediaurl").val(link);
}

// Chat messages on player (NicoNico style)

function playerText(text, classes) {
	if (!PLAYERTEXT || !$("#ytapiplayer")[0]) return;
	if (text !== null && typeof text === "string" && text.length > 0 && !(/^\$/.test(text))) {
		var size = Math.random() * 18 + 18;
		var ht = Math.floor(Math.random() * (Math.floor($("#ytapiplayer").height() / size)));
		var top = (size * ht) + 'px';
		var line = $('<div class="player-chat ' + classes + '" />').append(text)
		  .css({"visibility":"hidden", "top":top, "font-size":size + "px"});
		$("#player-chat-wrap").append(line);
		line.css("right", (0 - line.width()) + "px");
		var klass = text.length > 120 ? 'marq2' : 'marq';
		line.addClass(klass).css({"visibility":"visible", "right":$("#ytapiplayer").width() + "px"});
		line.find("span").attr('style', 'color:inherit !important');
	}
}

// Media DB help message

function preparingMediaDBHelp() {
	var html = '<strong>Preparing code</strong><br /><br /><code>MediaDatabase = [</code><br />'
		 + '<code>[\'\', \'Category name\'],</code><br />'
		 + '<code>[\'Link to media\', \'Media title\'],</code><br />'
		 + '<code>[\'Link to media\', \'Media title\'],</code><br />'
		 + '<code>[\'\', \'Category name\'],</code><br />'
		 + '<code>[\'Link to media\', \'Media title\'],</code><br />'
		 + '<code>[\'Link to media\', \'Media title\'],</code><br /><code>];</code><br /><br />'
		 + 'Copy sample code above and add your own items, set proper links and titles. '
		 + 'Leaving empty link will create a new category (like in the example above).<br />'
		 + '<span class="text-danger">Warning! Remember to change all apostrophes in titles and names '
		 +   'to <code>\\\'</code>, to avoid conflict with database structure.</span>';
	return html;
}

// Preview YT video from the favourites list

function previewVideo(id) {
	createModal('Preview link');
	var player = $('<iframe id="previewFrame" width="500" height="281" frameborder="0" />').appendTo(body)
	  .attr('src', 'https://www.youtube.com/embed/' + id + '?wmode=transparent&enablejsapi')
	PLAYER.getVolume(function(vol) {
		CURRENTVOL = vol;
	});
	PLAYER.setVolume(0);
	$("#plr-btn").addClass('btn-danger');
	outer.on("hidden.bs.modal", function() {
		PLAYER.setVolume(CURRENTVOL);
		if (CURRENTVOL != 0) $("#plr-btn, #plr-11").removeClass('btn-danger');
		setTimeout(function() {volumeLvl()}, 500);
		outer.remove();
	});
}

// Update progress bar

function progressBar() {
	if (!PLAYER || PLAYER.mediaType === undefined) return;
	var a = 0;
	var b = Math.round(getCurPos());
	if (b != PREVTIME) a = b / PLAYER.mediaLength * 100;
	$videoheader.css('background-size', a + '% 100%');
	PREVTIME = b;
}

// Rebuild playlist miniatures

function rebuildMiniatures() {
	if (!MINIATURES) return;
	$(".miniature").remove();
	createMiniatures();
}

// Hide non-visible playlist again if rebuilded

function rehidePlaylist() {
	if (HIDEPLS) $queue.hide();
	if (HIDEPLSBTNS) setTimeout(function() {
		$queue.addClass('nobuttons');
		scrollQueue();
	}, 1000);
}

// Refresh users avatars list

function refreshAvatarsList() {
	var html = '';
	$userlist.find(".userlist_item span:nth-child(2)").each(function() {
		var img = findUserlistItem($(this).text()).data().profile.image;
		if (img != "") html += '<img src="' + img + '" title="' + $(this).text() + '" />'
	});
	if (html == "") html = '<div>no profile images to display</div>';
	avatarspanel.html(html);
}

// Refresh player

function refreshPlayer() {
	PLAYER.mediaType = "";
	PLAYER.mediaId = "";
	socket.emit("playerReady");
}

// Remove selected link from favourites list

function removeFav(id) {
	$(".fav-" + id).remove();
	var arr = JSON.parse(FAVLINKS)["links"];
	var last = arr.length - 1;
	for (i in arr) {
		if (arr[i]["id"] == id) {
			var oldlink = arr[i]["link"];
			delete arr[i];
			if ($queue.find(".queue_entry").length < 1) {
				$("#favs-btn, #addtofav-btn").removeClass('btn-success');
			} else if (oldlink == formatURL($(".queue_active").data("media"))) {
				$favsbtn.removeClass('btn-success');
				$("#addtofav-btn").removeClass('btn-success disabled');
			}
		}
	}
	var len = arr.length - 1;
	document.getElementById("freeslots").innerHTML = len + ' item(s) | ' + (100 - len) + ' free slot(s) available';
	var _arr = [];
	for (i in arr) {
		var str = '{"id":' + arr[i]["id"] + ', "title":"' + arr[i]["title"] + '", '
			+ '"link":"' + arr[i]["link"] + '"}';
		_arr.push(str);
	}
	setOpt('SP_favlinks', FAVLINKS = '{"links":[' + _arr.join(', ') + ']}');
}

// Scroll chat panel to top

function scrollChatToTop() {
	var ft = FULLTITLE ? $titlerow.offset().top : (LARGEPLAYER ? $videowrap.offset().top : $chatwrap.offset().top);
	if (NOPLAYER) ft = $chatwrap.offset().top;
	var pos = SINGLECOLUMN ? $chatwrap.offset().top : ft;
	var ht = SCROLLNAVBAR ? 0 : $nav.outerHeight();
	window.scrollTo(0, pos - ht - 2);
}

// Set additional (font and background pattern) CSS

function setAdditionalCSS() {
	$("#additionalcss").remove();
	var html = '';
	if (USERFONT != "") {
		html += '@import url("https://fonts.googleapis.com/css?family=' + USERFONT + '");\n'
		     +  'body, #messagebuffer {font-family:"' + USERFONT + '" !important}\n'
	}
	if (USERPATTERN != "") html += 'body {background-image:url("' + USERPATTERN + '") !important}\n';
	if (html != "") $('<style id="additionalcss" type="text/css" />').appendTo("head").html(html);
}

// Set player brightness

function setPlayerBrightness() {
	if (BRIGHTNESS == 0) return;
	$videowrap.find(".embed-responsive-16by9").addClass('relative')
	  .append('<div id="plr-bright" class="maxwidth" />');
	var color = (BRIGHTNESS < 0) ? 0 : 255;
	var opacity = Math.abs(BRIGHTNESS) / 10;
	$("#plr-bright").css('background-color', 'rgba(' + color + ',' + color + ',' + color + ',' + opacity + ')');
}

// Display all users profile images

function showAvatarsPanel() {
	avatarswrap = $('<div id="avatarswrap" class="col-lg-12 col-md-12 leftareas" />').insertAfter($notepadwrap);
	avatarspanel = $('<div id="avatarspanel" class="well" />').appendTo(avatarswrap);
}

// Show images directly on chat

function showImagesOnChat(elem) {
	elem.find(ImageExtensions).each(function() {
		var img = $('<img class="embedimg" title="Click to open in a new tab" />').attr('src', this.href)
		  .load(function() {
			if (SCROLLCHAT) scrollChat();
		  });
  		$(this).html(img);
	});
}

// Show oekaki directly on chat

function showOekakiOnChat(elem) {
	elem.find('a[href$="?oekaki"]').each(function() {
		var img = $('<img class="oekakiimg" title="Click to open in a new tab" />').attr('src', this.href)
		  .load(function() {
			if (SCROLLCHAT) scrollChat();
		  });
  		$(this).html(img);
	});
}

// Show videos directly on chat

function showVideosOnChat(elem) {
	elem.find(MediaExtensions).each(function() {
		var vid = $('<video class="embedvid" />').prop('loop', 'false')
		  .attr('src', this.href).attr('controls', '').load(function() {
			if (SCROLLCHAT) scrollChat();
		  }).on("click", function() {
			($(this).get(0).paused) ? $(this).get(0).play() : $(this).get(0).pause();
			return false;
		  }).on("dblclick", function() {
			window.open($(this).attr('src'), "_blank");
			return false;
		  });
		$(this).html(vid);
	});
}

// Switch between tabs contents in modal

function switchModalTabs(btn, content, modal, tab) {
	$(".gbtn").removeClass('btn-success');
	btn.addClass('btn-success');
	VISIBLETAB[modal] = tab;
	$(".gdiv").hide();
	content.show();
}

// Item time left

function timeLeft() {
	var time = (!PLAYER || PLAYER.mediaType === undefined) ? -1 : getCurPos();
	if ($queue.find(".queue_active").length < 1 || time < 0) {
		var left = "--:--";
	} else {
		var left = formatTime(Math.round($(".queue_active").data("media").seconds - time));
	}
	$("#utc").html('Left: ' + left);
}

// Toggle Media Database category

function toggleCategory(num) {
	$("#db-well > ul").hide();
	$("#cat-btn" + num).toggleClass('opened');
	if ($("#cat-btn" + num).hasClass('opened')) {
		$("#db-well #cat-ul" + num).show();
		$("#db-well > button").removeClass('btn-success');
		$("#cat-btn" + num).addClass('opened');
	} else {
		$("#db-well > button").removeClass('btn-success');
	}
}

// Toggle selected element

function toggleElement(div) {
	$(div).css('display') == "none" ? $(div).show() : $(div).hide();
}

// Toggle various layout elements

function toggleLayoutElements() {
	var arr = ELEMENTS.split("|");
	if (arr.length < _ELEMENTS.split("|").length) {
		// temporary code to mantain compatibility with previous versions
		setOpt('SP_elements', _ELEMENTS);
		document.location.reload();
	}
	var elms = {};
	for (i in arr) {
		var row = arr[i].split(":");
		elms[row[0]] = row[1];
	}
	var ids = {
		"header":"#nav-collapsible > ul > li:not(.layout-menu), #navbar-up, #navbar-unpin, #logoutform",
		"logo":"nav .navbar-brand", "motd":"#motdrow", "announcements":"#announcements",
		"mainheader":"#chatheader, #videowrap-header", "videolabels":"#videowrap-header .label", 
		"chatlabels":"#chatheader .label", "maincontrols":"#controlsrow",
		"playlistbtns":"#plcontrol > button", "playlistmenu":"#plcontrol > div",
		"playermenu":"#videocontrols > div", "playerbtns":"#videocontrols > button", "mediadbbtns":"#db-group",
		"pollemotebtns":"#newpollbtn, #emotelistbtn", "colorsbtn":"#colors-btn",
		"chatbtns":"#chatcontrols > button", "chatmenus":"#chatcontrols > div",
		"plmeta":"#plmeta", "playlistlabels":"#plmeta .label", "footer":"#sitefooter, footer"
	}
	for (i in ids) {
		elms[i] == 0 ? $(ids[i]).addClass('hidden') : $(ids[i]).removeClass('hidden');
	}
	elms["logo"] == 1 ? $(ids["logo"]).addClass('logo') : $(ids["logo"]).removeClass('hidden logo');
}

// Handle user joining

function userJoined(data) {
	if (PREMIUMNOTMODE == 2 || PREMIUMNOTMODE == 4) addServerMessage(data.name + ' ' + JoinMessage);
	if (AVATARSLIST) refreshAvatarsList();
}

// Handle user leaving

function userLeft(data) {
	if (PREMIUMNOTMODE == 2 || PREMIUMNOTMODE == 4) addServerMessage(data.name + ' ' + LeaveMessage);
	if (AVATARSLIST) refreshAvatarsList();
}

// Display UTC time

function UTCTime() {
	var date = new Date;
	var html = 'UTC: ' + date.getUTCHours() + ':'
		 + (date.getUTCMinutes() > 9 ? date.getUTCMinutes() : '0' + date.getUTCMinutes()) + ':'
		 + (date.getUTCSeconds() > 9 ? date.getUTCSeconds() : '0' + date.getUTCSeconds());
	$("#utc").html(html);	
}

// Handle player volume level

function volumeLvl() {
	if (!PLAYER) return;
	PLAYER.getVolume(function(vol) {
		document.getElementById("volume-lvl").innerHTML = Math.round(vol * 100);
		if (vol == 0) {
			$("#plr-11").attr('title', 'Unmute player').addClass('btn-danger');
			$("#plr-btn").addClass('btn-danger');
		} else {
			$("#plr-11").attr('title', 'Mute player').removeClass('btn-danger');
			$("#plr-btn").removeClass('btn-danger');
		}
	});
}


// ***** Layout functions (in order of appearance) ***** //


function compactLayout() {
	$body.addClass('fluid');
	$(".container-fluid").removeClass('container-fluid').addClass('container');
	$("#layout-3").addClass('activated');
	handleVideoResize();
	if (SCROLLCHAT) scrollChat();
}

function fluidLayout() {
	$body.removeClass('fluid');
	$(".container").removeClass('container').addClass('container-fluid');
	$("footer .container-fluid").removeClass('container-fluid').addClass('container');
	$("#layout-3").removeClass('activated');
	handleVideoResize();
	if (SCROLLCHAT) scrollChat();
}

function singleColumn() {
	if (LARGECHAT) document.getElementById("layout-7").click();
	if (LARGEPLAYER) document.getElementById("layout-8").click();
	$("#layout-7, #layout-8, #controlsrow, #playlistrow, #plmode-btn, #togglepl-btn").hide();
	$("#resize-video-smaller, #resize-video-larger").hide();
	$body.addClass('singlecolumn');
	$("#layout-4").addClass('activated');
	var ratio = $(window).width() / $(window).height();
	if (ratio > 1.85) {
		var classes = 'col-lg-8 col-md-8 col-lg-offset-2 col-md-offset-2';
	} else {
		var classes = 'col-lg-10 col-md-10 col-lg-offset-1 col-md-offset-1';
	}
	$("#motdrow > div, #announcements > div, #drinkbar, #titlewrap").removeClass().addClass(classes);
	$("#videowrap, #chatwrap, #leftcontrols, #rightcontrols, #leftpane, #rightpane").removeClass()
	  .addClass(classes);
	$chatwrap.after($leftpane.detach()).after($leftcontrols.detach());
	$videowrap.after($rightpane.detach()).after($rightcontrols.detach());
	if (SYNCH) {
		$("#rightcontrols, #rightpane").addClass('margin-bottom-10');
		if (MOTDBOTTOM) $leftpane.addClass('margin-bottom-10');
	} else {
		$leftcontrols.addClass('margin-bottom-10');
		if (MOTDBOTTOM) $rightpane.addClass('margin-bottom-10');
	}
	if (FULLTITLE) {
		$videowrap.before($titlewrap.detach());
		$titlewrap.removeClass()
		  .addClass('col-lg-10 col-md-10 col-lg-offset-1 col-md-offset-1 margin-bottom-10');
	}
	handleVideoResize();
	if (SCROLLCHAT) scrollChat();
}

function twoColumns() {
	$("#layout-7, #layout-8, #resize-video-smaller, #resize-video-larger").show();
	$("#controlsrow, #playlistrow, #plmode-btn, #togglepl-btn").show();
	if (NOPLAYER) $("#togglepl-btn").hide();
	$body.removeClass('singlecolumn');
	$("#layout-4").removeClass('activated');
	$("#motdrow > div, #drinkbar, #titlewrap").removeClass().addClass('col-lg-12 col-md-12');
	$("#announcements > div").removeClass().addClass('col-md-12');
	$("#videowrap, #rightcontrols, #rightpane").removeClass().addClass("col-lg-7 col-md-7");
	$("#chatwrap, #leftcontrols, #leftpane").removeClass().addClass("col-lg-5 col-md-5");
	$("#leftcontrols, #rightcontrols").removeClass('margin-bottom-10');
	if (!MOTDBOTTOM) $("#leftpane, #rightpane, #playlistrow").removeClass('margin-bottom-10');
	if (FULLTITLE) {
		$titlerow.append($titlewrap.detach());
		$titlewrap.removeClass().addClass('col-lg-12 col-md-12');
	}
	if (SYNCH) {
		$("#controlsrow").append($rightcontrols.detach()).append($leftcontrols.detach());
		$("#playlistrow").append($rightpane.detach()).append($leftpane.detach());
	} else {
		$("#controlsrow").append($leftcontrols.detach()).append($rightcontrols.detach());
		$("#playlistrow").append($leftpane.detach()).append($rightpane.detach());
	}
	handleVideoResize();
	if (SCROLLCHAT) scrollChat();
}

function synchLayout() {
	$("#layout-5").addClass('activated');
	$videowrap.after($chatwrap.detach());
	$leftcontrols.before($rightcontrols.detach());
	$rightpane.after($leftpane.detach());
	if (SINGLECOLUMN) {
		singleColumn();
		$("#leftcontrols").removeClass('margin-bottom-10');
		$("#rightcontrols, #rightpane").addClass('margin-bottom-10');
		if (MOTDBOTTOM) $leftpane.addClass('margin-bottom-10');
	}
	if (SCROLLCHAT) scrollChat();
}

function nonSynchLayout() {
	$("#layout-5").removeClass('activated');
	$videowrap.before($chatwrap.detach());
	$leftcontrols.after($rightcontrols.detach());
	$rightpane.before($leftpane.detach());
	if (SINGLECOLUMN) {
		singleColumn();
		$("#rightcontrols, #rightpane").removeClass('margin-bottom-10');
		if (MOTDBOTTOM) {
			$rightpane.addClass('margin-bottom-10');
		} else {
			$("#leftcontrols").addClass('margin-bottom-10');
			$leftpane.removeClass('margin-bottom-10');
		}
	}
	if (SCROLLCHAT) scrollChat();
}

function bottomMOTD() {
	$("#layout-6").addClass('activated');
	$("#resizewrap").before($("#motdrow").detach()).before($("#announcements").detach());
	$("#playlistrow").addClass('margin-bottom-10');
	if (SINGLECOLUMN && SYNCH) $leftpane.addClass('margin-bottom-10');
}

function topMOTD() {
	$("#layout-6").removeClass('activated');
	$("#drinkbarwrap").before($("#motdrow").detach()).before($("#announcements").detach());
	$("#playlistrow").removeClass('margin-bottom-10');
	SYNCH ? $leftpane.removeClass('margin-bottom-10') : $rightpane.removeClass('margin-bottom-10');
}

function largeChat() {
	HIDDENVWRAP = true;
	if (LARGEPLAYER) document.getElementById("layout-8").click();
	$("#videowrap, #resize-video-smaller, #resize-video-larger, #rightcontrols, #plmode-btn, #togglepl-btn").hide();
	$("#layout-7").addClass('activated');
	var ratio = $(window).width() / $(window).height();
	if (ratio > 1.85) {
		var classes = 'col-lg-8 col-md-8 col-lg-offset-2 col-md-offset-2';
	} else {
		var classes = 'col-lg-10 col-md-10 col-lg-offset-1 col-md-offset-1';
	}
	$("#chatwrap, #leftcontrols").removeClass().addClass(classes);
	collapseChat();
	var ht = $(window).height() - 100;
	if (ht > 500) ht -= 200;
	$("#messagebuffer, #userlist").height(ht);
	handleVideoResize();
	if (SCROLLCHAT) scrollChat();
}

function normalChat() {
	HIDDENVWRAP = false;
	$("#rightcontrols, #resize-video-smaller, #resize-video-larger, #plmode-btn, #togglepl-btn").show();
	NOPLAYER ? $("#togglepl-btn").hide() : $("#videowrap").show();
	$("#layout-7").removeClass('activated');
	var match = document.getElementById("leftpane").className.match(/col-md-(\d+)/);
	var class1 = parseInt(match[1], 10);
	var class2 = 12 - parseInt(match[1], 10);
	$("#chatwrap, #leftcontrols").removeClass().addClass('col-md-' + class1 + ' col-lg-' + class1);
	$videowrap.removeClass().addClass('col-md-' + class2 + ' col-lg-' + class2);
	collapseChat();
	handleVideoResize();
	if (SCROLLCHAT) scrollChat();
}

function largePlayer() {
	if (LARGECHAT) document.getElementById("layout-7").click();
	$("#chatwrap, #resize-video-smaller, #resize-video-larger, #leftcontrols, #plr-4").hide();
	$("#plmode-btn, #togglepl-btn").hide();
	$("#layout-8").addClass('activated');
	var ratio = $(window).width() / $(window).height();
	if (ratio > 1.85) {
		var classes = 'col-lg-8 col-md-8 col-lg-offset-2 col-md-offset-2';
	} else {
		var classes = 'col-lg-10 col-md-10 col-lg-offset-1 col-md-offset-1';
	}
	$("#videowrap, #rightcontrols").removeClass().addClass(classes);
	$("#scroll-to-chat").html('To player ▲');
	handleVideoResize();
	if (SCROLLCHAT) scrollChat();
}

function normalPlayer() {
	$("#chatwrap, #resize-video-smaller, #resize-video-larger, #leftcontrols, #plr-4").show();
	$("#plmode-btn, #togglepl-btn").show();
	if (NOPLAYER) $("#togglepl-btn").hide();
	$("#layout-8").removeClass('activated');
	var match = document.getElementById("leftpane").className.match(/col-md-(\d+)/);
	var class1 = parseInt(match[1], 10);
	var class2 = 12 - parseInt(match[1], 10);
	$chatwrap.removeClass().addClass('col-md-' + class1 + ' col-lg-' + class1);
	$("#videowrap, #rightcontrols").removeClass().addClass('col-md-' + class2 + ' col-lg-' + class2);
	$("#scroll-to-chat").html('To chat ▲');
	collapseChat();
	handleVideoResize();
	if (SCROLLCHAT) scrollChat();
}

function theatreMode() {
	if (LARGECHAT) normalChat();
	if (LARGEPLAYER) normalPlayer();
	if (SINGLECOLUMN) twoColumns();
	if (FULLTITLE) compactTitle();
	$(".poll-menu").remove();
	$("#chatwrap, #videowrap").show();
	$("nav, footer, #motdrow, #announcements, #drinkbarwrap, #chatheader, #userlist").hide();
	$("#videowrap-header, #controlsrow, .leftareas, #rightpane, #sitefooter").hide();
	$body.addClass('theatre-mode');
	$("#messagebuffer").addClass('tmode');
	$("#chatwrap, #videowrap, #pollwrap").addClass(!SYNCH ? 'tmode' : 'tmode2');
	if ($("#expand-chat").hasClass('label-success')) collapseChat();
	closebtn = $('<button id="close-btn" class="btn btn-danger pointer" title="Close Theatre Mode" />')
	  .addClass(!SYNCH ? 'tmode' : 'tmode2').appendTo("body")
	  .append('<span class="glyphicon glyphicon-new-window" />')
	  .on("click", function() {
		closeTheatreMode();
	  });
	setOpt('SP_theatremode', true);
	if (SCROLLCHAT) scrollChat();
	$chatline.focus();
}

function closeTheatreMode() {
	$("#close-btn").remove();
	$("nav, footer, #motdrow, #announcements, #drinkbarwrap, #chatheader, #videowrap-header").show();
	$("#controlsrow, .leftareas, #rightpane, #sitefooter").show();
	$body.removeClass('theatre-mode');
	$("#messagebuffer").removeClass('tmode');
	$("#chatwrap, #videowrap, #pollwrap").removeClass('tmode tmode2');
	if ($userlisttoggle.hasClass('glyphicon-chevron-down')) $userlist.show();
	if (!$("#oekaki-btn").hasClass('btn-success')) $oekakiwrap.hide();
	if (!$("#notepad-btn").hasClass('btn-success')) $notepadwrap.hide();
	if (FULLTITLE) fullWidthTitle();
	if (SINGLECOLUMN) singleColumn();
	if (LARGECHAT) largeChat();
	if (LARGEPLAYER) largePlayer();
	setOpt('SP_theatremode', false);
	handleVideoResize();
	scrollChatToTop();
	scrollQueue();
	if (SCROLLCHAT) {
		setTimeout(function() {
			scrollChat();
			SCROLLCHAT = true;
		}, 500);
	}
	$chatline.focus();
}

function radioMode() {
	HIDDENVWRAP = true;
	$("#player-chat-wrap").find(".marq, .marq2").remove();
	if (LARGECHAT) normalChat();
	if (LARGEPLAYER) normalPlayer();
	if (COMPACT) fluidLayout();
	if (SCROLLNAVBAR) fixedNavbar();
	if (FULLTITLE) {
		$videoheader.detach().prependTo("#videowrap").removeClass('bigtitle');
		$titlerow.remove();
	}
	$body.addClass('radio-mode');
	$videoheader.addClass("radiotitle");
	$("nav, footer, #motdrow, #announcements, #drinkbarwrap, #chatwrap").hide();
	$("#resize-video-smaller, #resize-video-larger, #videowrap .embed-responsive-16by9, #leftcontrols").hide();
	$("#newpollbtn, #oekaki-btn, #notepad-btn, #plcontrol, #plr-1, #plr-2, #plr-3, #plr-4, #plr-5").hide();
	$("#fullscreenbtn, #advopts-btn, #favs-btn, #plmode-btn, #playlistrow, #leftpane, #oekakiwrap").hide();
	$("#notepadwrap, #rightpane, #sitefooter").hide();
	if (NOPLAYER) $("#plr-btn").hide();
	$("#chatwrap, #videowrap, #leftcontrols, #rightcontrols, #rightpane").removeClass()
	  .addClass('col-lg-8 col-md-8 col-lg-offset-2 col-md-offset-2');
	if ($("#expand-chat").hasClass('label-success')) collapseChat();
	radioheader = $('<div id="radioheader" class="col-lg-8 col-md-8 col-lg-offset-2 col-md-offset-2" />')
	  .prependTo("#main").html('You are listening to: /r/' + window.location.href.split("/").pop());
	if (!NOPLAYER) {
		togglevid = $('<button id="togglevid" class="btn btn-default btn-sm" />').html('Player')
		  .prependTo("#videocontrols")
		  .on("click", function() {
			HIDDENVWRAP = !HIDDENVWRAP;
			$("#videowrap .embed-responsive-16by9, #plr-1, #plr-2, #plr-3").toggle();
			if (!NOPLAYER) $("#fullscreenbtn").toggle();
			$(this).toggleClass('btn-success');
	 	 });
	}
	togglepl = $('<button id="togglepl" class="btn btn-default btn-sm" />').html('Playlist')
	  .prependTo("#videocontrols")
	  .on("click", function() {
		$("#advopts-btn, #favs-btn, #playlistrow, #rightpane, #plcontrol").toggle();
		$(this).toggleClass('btn-success');
		scrollQueue();
	  });
	togglechat = $('<button id="togglechat" class="btn btn-default btn-sm" />').html('Chat')
	  .prependTo("#videocontrols")
	  .on("click", function() {
		$("#chatwrap, #leftcontrols").toggle();
		$(this).toggleClass('btn-success');
		scrollChat();
	  });
	newplaylistwrap = $('<div id="newplaylistwrap" class="row" />').insertAfter("#controlsrow");
	newplaylist = $('<div id="newplaylist" class="col-lg-8 col-md-8 col-lg-offset-2 col-md-offset-2" />')
	  .appendTo(newplaylistwrap);
	closebtn = $('<button id="close-btn" class="btn btn-danger pointer tmode" title="Close Radio Mode" />')
	  .appendTo("body").append('<span class="glyphicon glyphicon-new-window" />')
	  .on("click", function() {
		closeRadioMode();
	  });
	GQI = setInterval(function() {getQueueInfo()}, 3000);
	setOpt('SP_radiomode', true);
	getQueueInfo();
}

function closeRadioMode() {
	HIDDENVWRAP = false;
	$("#radioheader, #mediastats, #newplaylistwrap, #togglevid, #togglepl, #togglechat, #close-btn").remove();
	$body.removeClass('radio-mode');
	$videoheader.removeClass("radiotitle");
	if ($("#expand-chat").hasClass('label-success')) $("#expand-chat").removeClass('label-success');
	$("nav, footer, #motdrow, #announcements, #drinkbarwrap, #chatwrap").show();
	$("#resize-video-smaller, #resize-video-larger, #videowrap .embed-responsive-16by9, #leftcontrols").show();
	$("#newpollbtn, #oekaki-btn, #notepad-btn, #plcontrol, #plr-btn, #plr-1, #plr-2, #plr-3").show();
	$("#plr-4, #plr-5, #advopts-btn, #favs-btn, #plmode-btn, #playlistrow, #leftpane, #rightpane").show();
	$("#sitefooter").show();
	if ($("#oekaki-btn").hasClass('btn-success')) $oekakiwrap.show();
	if ($("#notepad-btn").hasClass('btn-success')) $notepadwrap.show();
	var match = document.getElementById("leftpane").className.match(/col-md-(\d+)/);
	var class1 = parseInt(match[1], 10);
	var class2 = 12 - parseInt(match[1], 10);
	$("#chatwrap, #leftcontrols").removeClass().addClass('col-md-' + class1 + ' col-lg-' + class1);
	$("#videowrap, #rightcontrols, #rightpane").removeClass().addClass('col-md-' + class2 + ' col-lg-' + class2);
	if (FULLTITLE) fullWidthTitle();
	if (SCROLLNAVBAR) scrollableNavbar();
	if (SINGLECOLUMN) singleColumn();
	if (COMPACT) compactLayout();
	if (LARGECHAT) largeChat();
	if (LARGEPLAYER) largePlayer();
	setOpt('SP_radiomode', false);
	clearInterval(GQI);
	handleVideoResize();
	scrollChatToTop();
	scrollQueue();
	if (SCROLLCHAT) scrollChat();
	$chatline.focus();
}

function scrollableNavbar() {
	document.getElementById("navbar-unpin")
	  .innerHTML = '<span class="glyphicon glyphicon-pushpin" title="Make navbar fixed"></span>';
	$(".navbar-fixed-top, #mainpage").addClass('snav');
}

function fixedNavbar() {
	document.getElementById("navbar-unpin")
	  .innerHTML = '<span class="glyphicon glyphicon-open" title="Make navbar scrollable"></span>';
	$(".navbar-fixed-top, #mainpage").removeClass('snav');
}

function expandChat() {
	$("#expand-chat").addClass('label-success');
	var ht = $(window).height() - $chatheader.outerHeight() - $chatline.outerHeight();
	if (!SCROLLNAVBAR) ht -= $nav.outerHeight();
	if (FULLTITLE && !SINGLECOLUMN) ht -= ($chatwrap.offset().top - $titlerow.offset().top);
	$("#messagebuffer, #userlist").height(ht - 6);
	scrollChatToTop();
}

function collapseChat() {
	$("#expand-chat").removeClass('label-success');
	var ht = $ytapiplayer.height();
	if (NOPLAYER || LARGECHAT || $("#togglepl-btn").hasClass('btn-warning')) ht = $(window).height() - 300;
	$("#messagebuffer, #userlist").height(ht);
	handleVideoResize();
	$(window).unbind('resize.expandchat');
}

function userlistRight() {
	$("#chat-f6").addClass('activated');
	$userlist.addClass('pull-right');
	$body.addClass('synchtube');
}

function userlistLeft() {
	$("#chat-f6").removeClass('activated');
	$userlist.removeClass('pull-right');
	$body.removeClass('synchtube');
}

function fullWidthTitle() {
	$titlerow = $('<div id="titlerow" class="row" />').insertBefore("#main");
	$titlewrap = $('<div id="titlewrap" class="col-lg-12 col-md-12" />').appendTo($titlerow)
	  .html($videoheader.detach().addClass('bigtitle'));
	$("#plr-5").addClass('activated');
	if (SINGLECOLUMN) {
		$videowrap.before($titlewrap.detach());
		$titlewrap.removeClass()
		  .addClass('col-lg-10 col-md-10 col-lg-offset-1 col-md-offset-1 margin-bottom-10');
	}
	var html = '<span id="totalclock" class="pull-right">--:--</span>'
		 + '<span id="mediaclock" class="pull-right">--:-- |&nbsp;</span>';
	$mediastats = $('<p id="mediastats" />').prependTo($videowrap).html('&nbsp;' + html);
	MEDIACLOCK = setInterval(function() {mediaClock()}, 1000);
	mediaClock();
}

function compactTitle() {
	$videoheader.detach().prependTo("#videowrap").removeClass('bigtitle');
	$("#plr-5").removeClass('activated');
	$("#titlerow, #titlewrap, #mediastats").remove();
	clearInterval(MEDIACLOCK);
}

function hideProgressBar() {
	$("#plr-6").addClass('activated');
	clearInterval(PBAR);
	$videoheader.removeClass('pbar').css('background-size', '0% 100%');
}

function showProgressBar() {
	$videoheader.addClass('pbar');
	$("#plr-6").removeClass('activated');
	PBAR = setInterval(function() {progressBar()}, 2000);
	progressBar();
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/* ---------- [REGION 3] USER INTERFACE ---------- */

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// Add temporary videowrap if user has enabled "Remove the video player" option or "Remove Video" mode

if (!$("#videowrap")[0]) {
	NOPLAYER = true;
	$("#chatwrap, #chatline").removeClass('col-lg-12 col-md-12').addClass('col-lg-5 col-md-5');
	$videowrap = $('<div id="videowrap" class="col-lg-7 col-md-7" />').insertAfter("#chatwrap");
	var title = PL_CURRENT > -1 ? $(".queue_active").data("media").title : 'nothing playing';
	$videoheader = $('<p id="videowrap-header" />').appendTo($videowrap);
	$('<span class="glyphicon glyphicon-minus pointer" id="resize-video-smaller" />')
	  .attr('title', 'Make the video smaller').appendTo($videoheader);
	$('<span class="glyphicon glyphicon-plus pointer" id="resize-video-larger" />')
	  .attr('title', 'Make the video larger').appendTo($videoheader);
	$currenttitle = $('<span id="currenttitle" />').appendTo($videoheader).html('Currently Playing: ' + title);
	playerwrap = $('<div id="playerwrap" class="embed-responsive embed-responsive-16by9" />')
	  .appendTo($videowrap);
	$ytapiplayer = $('<iframe id="ytapiplayer" class="embed-responsive-item" frameborder="0" />')
	  .attr({title:'YouTube video player', allowfullscreen:'1'}).appendTo(playerwrap);
	var html = '<div id="noplayer-alert" class="alert alert-danger">'
		 +   '<button class="close pull-right">Ã—</button><strong>No Player</strong><br />'
		 +   'According to your global User Preferences, video player is removed. '
		 +   'Select a button below, to continue hiding player or show player in this session.<br /><br />'
		 +   '</div>';
	$('<div class="col-md-12" />').appendTo(playerwrap).html(html);
	staybtn = $('<button id="stay-btn" class="btn btn-default btn-sm btn-danger" />')
	  .appendTo("#noplayer-alert").html('Stay in "Remove player" mode')
	  .on("click", function() {
		document.getElementById("plr-4").click();
	});
	videobtn = $('<button id="video-btn" class="btn btn-default btn-sm btn-success pull-right" />')
	  .appendTo("#noplayer-alert").html('Load video player')
	  .on("click", function() {
		NOPLAYER = false;
		$("#noplayer-alert").remove();
		refreshPlayer();
	});
}


// Undo possible HD layout

if (_SINGLECOLUMN) undoHDLayout();


// Body class if enabled glued layout

if (GLUELAYOUT) $body.addClass('glued');


// Navbar class if enabled transparency

if (TRANSPARENTNAV) $nav.addClass('transparent');


// Navbar brand

//var name = (ChannelName == "") ? '/r/' + window.location.href.split('/').pop() : ChannelName;
//$(".navbar-brand").html(name);


// Navbar extended "Layout" dropdown menu

var html = '<li><a id="layout-1">Premium Options</a></li>'
	 + '<li><a id="layout-2" class="opt"><span class="glyphicon glyphicon-ok"></span>Theme & User CSS</a></li>'
	 + '<li class="divider"></li>'
	 + '<li><a id="layout-3" class="opt"><span class="glyphicon glyphicon-ok"></span>Compact Layout</a></li>'
	 + '<li><a id="layout-4" class="opt"><span class="glyphicon glyphicon-ok"></span>Single Column Layout</a></li>'
	 + '<li><a id="layout-5" class="opt"><span class="glyphicon glyphicon-ok"></span>Old Synchtube Layout</a></li>'
	 + '<li><a id="layout-6" class="opt"><span class="glyphicon glyphicon-ok"></span>'
	 +   'Channel MOTD on Bottom</a></li>'
	 + '<li class="divider"></li>'
	 + '<li><a id="layout-7" class="opt"><span class="glyphicon glyphicon-ok"></span>Large Chat, No Player</a></li>'
	 + '<li><a id="layout-8" class="opt"><span class="glyphicon glyphicon-ok"></span>Large Player, No Chat</a></li>'
	 + '<li class="divider"></li>'
	 + '<li><a id="layout-9"><span class="glyphicon glyphicon-th-list"></span>Theatre Mode</a></li>'
	 + '<li><a id="layout-10"><span class="glyphicon glyphicon-headphones"></span>Radio Mode</a></li>';
$layoutmenu = $('#nav-collapsible a[onclick*="chatOnly"]').parent().parent().addClass('noclose').html(html)
  .parent().find("> a").prepend('<span class="glyphicon glyphicon-cog nav-cog layout-cog" />');
$layoutmenu.parent().addClass('layout-menu');


// Navbar handling icons

$('<div id="navbar-up" class="pull-right pointer navbar-text" />').appendTo("#nav-collapsible")
  .html('<span class="glyphicon glyphicon-chevron-up" title="Collapse navigation bar"></span>');
$('<div id="navbar-unpin" class="pull-right pointer navbar-text" />').appendTo("#nav-collapsible")
  .html('<span class="glyphicon glyphicon-open" title="Make navbar scrollable"></span>');


// Optional custom navbar welcome text

if (WelcomeText != "" && CLIENT.rank > 0) $("#welcome").html($("#welcome").html().replace(/Welcome/, WelcomeText));


// Collpse MOTD on start if enabled option

if (COLLAPSEMOTD) $("#togglemotd").trigger("click");


// Optional Premium announcement

if (AnnouncementHTML != "") makeAlert('Channel Administrator Message', AnnouncementHTML).appendTo("#announcements");


// Full-width title if enabled

if (FULLTITLE) fullWidthTitle();


// Chatwrap class if disabled "New Messages Below" notification

if (HIDEINDICATOR) $chatwrap.addClass('noindicator');


// Chat header labels

$("#modflair").detach().prependTo($chatheader);
$('<span id="scroll-top" class="label label-default pull-right pointer scroll-label" />')
  .insertBefore($userlisttoggle).attr('title', 'Scroll chat panel to top').html('Top â–´');
$('<span id="scroll-to-pl" class="label label-default pull-right pointer scroll-label" />')
  .insertBefore($userlisttoggle).attr('title', 'Scroll to playlist').html('Pl ▼');
$('<span id="expand-chat" class="label label-default pull-right pointer scroll-label" />')
  .insertBefore($userlisttoggle).attr('title', 'Toggle chat expanding')
  .html('<span class="glyphicon glyphicon-resize-vertical"></span>');


// Collapse userlist on start if enabled option

if (COLLAPSEULIST) $("#usercount").trigger("click");


// Userlist and chat class if enabled autohiding scroll

if (CHATHIDESCROLL) $("#userlist, #messagebuffer").addClass('autoscroll');


// Better search query placeholder

$("#library_query").attr('placeholder', 'Search query (leave empty to display all channel library)');


// Default uncheck "Add as temporary" checkbox for users with permission

if (hasPermission("settemp")) $(".add-temp").prop('checked', false);


// Optional Media Database button and panel

if (typeof MediaDatabase !== "undefined" || getURLVar("db") != "" || (EXECDB && CUSTOMDBURL != "")) {
	dbgroup = $('<div id="db-group" class="btn-group pull-right" />').appendTo("#addfromurl .checkbox");
	$('<button id="db-btn" class="btn btn-sm btn-default" title="Toggle Media Database">Media Database</button>')
	  .appendTo(dbgroup)
	  .on("click", function() {
		if (!MEDIADBLOAD) {
			if (!$(this).hasClass('jsloaded') && EXECDB && CUSTOMDBURL != "") {
				loadDatabase(CUSTOMDBURL);
			} else if (!$(this).hasClass('jsloaded') && getURLVar("db") != "") {
				loadDatabase(getURLVar("db"));
			} else {
				$("#getdb-btn").show();
				createMediaDatabase();
				MEDIADBLOAD = true;
			}
		}
		$(this).toggleClass('btn-success');
		toggleElement("#db-well");
	  });
	$('<button id="dbreload-btn" class="btn btn-sm btn-default" />').appendTo(dbgroup)
	  .attr('title', 'Clear/reload data (if channel seems overloaded)')
	  .append('<span class="glyphicon glyphicon-refresh" />')
	  .on("click", function() {
		$("#db-btn").removeClass('btn-success');
		$("#db-well").hide().html('');
		MEDIADBLOAD = false;
	  });
	$('<button id="getdb-btn" class="btn btn-sm btn-default" />').appendTo(dbgroup)
	  .attr('title', 'Retrieve database code').append('<span class="glyphicon glyphicon-list-alt" />')
	  .on("click", function() {
		createModal('Media Database Code');
		var html = 'MediaDatabase = [\n';
			for (i in MediaDatabase) {
				title = MediaDatabase[i][1].replace(/'/g, '\\\'');
				html += '[\'' + MediaDatabase[i][0] + '\', \'' + title + '\']\n';
			}
		html += '];';
		var data = $('<textarea rows="10" class="form-control" />').val(html).appendTo(body);
	  });
	if (typeof MediaDatabase === "undefined") $("#getdb-btn").hide();
    	$('<div id="db-wrap" class="row" />').appendTo("#addfromurl");
    	$('<div id="db-well" class="col-lg-12 col-md-12" />').appendTo("#db-wrap").hide();
}


// Playlist options dropdown menu

var html = '<button id="plsbtn" class="btn btn-sm btn-default dropdown-toggle" data-toggle="dropdown" '
	 + 'title="Playlist controls"><span class="glyphicon glyphicon-cog"></span>▼ </button>'
	 + '<ul id="pls-menu" class="dropdown-menu dropdown-menu-right">'
	 +   '<li><a id="pls-1"><span class="glyphicon glyphicon-cog nav-cog layout-cog"></span>'
	 +     'Global Playback Options</a></li>'
	 +   '<li class="divider"></li>'
	 +   '<li><a id="pls-2">Contributors List</a></li>'
	 +   '<li><a id="pls-3">List of Last Played</a></li>'
	 +   '<li><a id="pls-4">Download Current Item</a></li>'
	 +   '<li class="divider"></li>'
	 +   '<li><a id="pls-5" class="opt"><span class="glyphicon glyphicon-ok"></span>Show Miniatures</a></li>'
	 +   '<li><a id="pls-6" class="opt"><span class="glyphicon glyphicon-ok"></span>Hide Buttons</a></li></ul>';
$('<div id="plsbtn-outer" class="btn-group" />').appendTo("#plcontrol").html(html);

if (MINIATURES) {
	createMiniatures();
	$("#pls-5").addClass('activated');
	var len = $queue.find("li").length;
	if (len > 500) setTimeout(function() {rebuildMiniatures()}, 7500);
	if (len > 1000) setTimeout(function() {rebuildMiniatures()}, 15000);
	scrollQueue();
}
if (HIDEPLSBTNS) {
	$queue.addClass('nobuttons');
	$("#pls-6").toggleClass('activated');
}


// Player options dropup menu

var html = '<button id="plr-btn" class="btn btn-sm btn-default dropdown-toggle" data-toggle="dropdown" '
	 + 'title="Player controls"><span class="glyphicon glyphicon-cog"></span> ▲´</button>'
	 + '<ul id="plr-menu" class="dropdown-menu dropdown-menu-right noclose">'
	 +   '<li><a id="plr-1" class="opt"><span class="glyphicon glyphicon-ok"></span>Hide Player Until Next</a></li>'
	 +   '<li><a id="plr-2" class="opt"><span class="glyphicon glyphicon-ok"></span>'
	 +     'Mirror Player Horizontally</a></li>'
	 +   '<li><a id="plr-3" class="opt"><span class="glyphicon glyphicon-ok"></span>'
	 +     'Mirror Player Vertically</a></li>'
	 +   '<li class="rpl"><a id="plr-4" class="opt"><span class="glyphicon glyphicon-ok"></span>'
	 +     'Remove Player</a></li>'
	 +   '<li class="divider"></li>'
	 +   '<li><a id="plr-5" class="opt"><span class="glyphicon glyphicon-ok"></span>Full-width Title Bar</a></li>'
	 +   '<li><a id="plr-6" class="opt"><span class="glyphicon glyphicon-ok"></span>Hide Progress Bar</a></li>'
	 +   '<li class="divider"></li>'
	 +   '<li class="btngr-padding"><div class="btn-group">'
	 +     '<button id="plr-7" class="btn btn-sm btn-default" title="Brightness down">'
	 +       '<span class="glyphicon glyphicon-minus"></span></button>'
	 +     '<button id="plr-8" class="btn btn-sm btn-default" title="Reset brightness">'
	 +       '<span class="glyphicon glyphicon-refresh"></span> light: <span id="light-level">0%</span>'
	 +     '<button id="plr-9" class="btn btn-sm btn-default" title="Brightness up">'
	 +       '<span class="glyphicon glyphicon-plus"></span></button></div></li>'
	 +   '<li class="divider"></li>'
	 +   '<li class="volume btngr-padding"><div class="btn-group">'
	 +     '<button id="plr-10" class="btn btn-sm btn-default" title="Volume down">'
	 +       '<span class="glyphicon glyphicon-minus"></span></button>'
	 +     '<button id="plr-11" class="btn btn-sm btn-default" title="Mute player">'
	 +       '<span class="glyphicon glyphicon-volume-up"></span> '
	 +       'volume: <span id="volume-lvl">100</span>%</button>'
	 +     '<button id="plr-12" class="btn btn-sm btn-default" title="Volume up">'
	 +       '<span class="glyphicon glyphicon-plus"></span></button></div></li></ul>';
$('<div id="plrbtn-outer" class="btn-group dropup" />').prependTo("#videocontrols").html(html);

if (!USEROPTS.wmode_transparent) {
	$("#plrbtn-outer").removeClass('dropup');
	document.getElementById("plr-btn").innerHTML = '<span class="glyphicon glyphicon-cog"></span> ▼';	
}
if (FULLTITLE) $("#plr-5").addClass('activated');
PROGRESSBAR ? showProgressBar() : $("#plr-6").addClass('activated');


// Advanced options button

$advoptsbtn = $('<button id="advopts-btn" class="btn btn-sm btn-default" title="Advanced options" />')
  .html('<span class="glyphicon glyphicon-flash"></span>').insertBefore("#mediarefresh");


// Favourite Premium links button

$favsbtn = $('<button id="favs-btn" class="btn btn-sm btn-default" title="Add and manage Premium favourites" />')
  .html('<span class="glyphicon glyphicon-thumbs-up"></span>').insertBefore("#mediarefresh");


// Chat colors button and menu

var html = '<button id="colors-btn" type="button" class="btn btn-sm btn-default dropdown-toggle" '
	 +   'data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Colors ○</button>'
	 + '<ul id="colors-wrap" class="dropdown-menu centered"></ul>';
$colorsmenu = $('<div id="colors-menu" class="btn-group dropup" />').appendTo("#leftcontrols").html(html);

if (ColorsArray.length < 1) {
	$colorsmenu.hide();
} else if (ColorsArray.length > 50) {
	$colorsmenu.addClass('widecm');
}

for (i in ColorsArray) {
	var j = ColorsArray.length > 50 ? 8 : 5;
	if (i % j == 0) var colgroup = $('<li class="btn-group btn-colors" />').appendTo("#colors-wrap");
	$('<button class="btn btn-default btn-sm cbtn" onclick="insertText(\'col:' + ColorsArray[i] + ':\')" />')
	  .css('background-color', ColorsArray[i]).html('').appendTo(colgroup);
}


// Chat control buttons group

var html = '<button id="notepad-btn" class="btn btn-sm btn-default btn-chatctrl" title="Notepad">'
	 +   '<span class="glyphicon glyphicon-pencil"></span></button>'
	 + '<button id="sounds-btn" class="btn btn-sm btn-default btn-chatctrl" title="Mute chat sounds">'
	 +   '<span class="glyphicon glyphicon-volume-down"></span></button>'
	 + '<div id="chatfunc-outer" class="dropup btn-group">'
	 +   '<button id="chatfunc-btn" class="btn btn-sm btn-default btn-chatctrl dropdown-toggle" '
	 +   'data-toggle="dropdown" title="Chat functions"><span class="glyphicon glyphicon-wrench"></span>▲´</button>'
	 +   '<ul id="chatfunc-menu" class="dropdown-menu dropdown-menu-right"></ul>'
	 + '</div><div id="chatopts-outer" class="dropup btn-group">'
	 +   '<button id="chatopts-btn" class="btn btn-sm btn-default btn-chatctrl dropdown-toggle" '
	 +   'data-toggle="dropdown" title="Chat options"><span class="glyphicon glyphicon-cog"></span>▲´</button>'
	 +   '<ul id="chatopts-menu" class="dropdown-menu dropdown-menu-right noclose"></ul></div>';
$chatcontrols = $('<div id="chatcontrols" class="btn-group pull-right" />').appendTo("#leftcontrols").html(html);

if (!CHATSOUNDS) $("#sounds-btn").hide();
if (MUTECHAT) $("#sounds-btn").addClass('btn-danger').attr('title', 'Unmute chat sounds');


// Chat functions dropdown menu

var html = '<li><a id="chat-f1"><span class="glyphicon glyphicon-cog nav-cog layout-cog"></span>'
	 +   'Global Chat Options</a></li>'
	 + '<li class="divider"></li>'
	 + '<li><a id="chat-f2" class="opt"><span class="glyphicon glyphicon-ok"></span>Handy Emotes List</a></li>'
	 + '<li><a id="chat-f3" class="opt"><span class="glyphicon glyphicon-ok"></span>Unicode Characters</a></li>'
	 + '<li class="divider"></li>'
	 + '<li><a id="chat-f4">Premium Commands List</a></li>'
	 + '<li><a id="chat-f5">My Messages List</a></li>'
	 + '<li class="divider"></li>'
	 + '<li><a id="chat-f6" class="opt"><span class="glyphicon glyphicon-ok"></span>'
	 +   'Userlist on Right</a></li>'
	 + '<li><a id="chat-f7" class="opt"><span class="glyphicon glyphicon-ok"></span>Big User Profiles</a></li>'
	 + '<li class="divider"></li>'
	 + '<li><a id="chat-f8" class="opt"><span class="glyphicon glyphicon-ok"></span>Custom Ping Sound</a></li>'
	 + '<li><a id="chat-f9">Clear Chat Window</a></li>'
	 + '<li class="divider"></li>';
document.getElementById("chatfunc-menu").innerHTML = html;

if (BIGPROFILES) {
	$userlist.addClass('bigp');
	$("#chat-f7").toggleClass('activated');
}
if (CUSTOMPING && CUSTOMPINGFILE != "") {
	$("#chat-f8").addClass('activated');
	CHATSOUND = new Audio(CUSTOMPINGFILE);
}
CHATSOUND.volume = CUSTOMPINGLVL;


// Chat options dropdown menu

var html = '<li><a id="chat-1" class="opt"><span class="glyphicon glyphicon-ok"></span>Convert Links to Images</a></li>'
	 + '<li><a id="chat-2" class="opt"><span class="glyphicon glyphicon-ok"></span>Convert Links to Media</a></li>'
	 + '<li class="divider"></li>'
	 + '<li><a id="chat-3" class="opt"><span class="glyphicon glyphicon-ok"></span>Matrix Style Chat</a></li>'
	 + '<li><a id="chat-4" class="opt"><span class="glyphicon glyphicon-ok"></span>White Background Chat</a></li>'
	 + '<li class="divider"></li>'
	 + '<li><a id="chat-5" class="opt"><span class="glyphicon glyphicon-ok"></span>Separate Chat Messages</a></li>'
	 + '<li><a id="chat-6" class="opt"><span class="glyphicon glyphicon-ok"></span>Bubbled Chat Messages</a></li>'
	 + '<li class="divider"></li>'
	 + '<li><a id="chat-7" class="opt"><span class="glyphicon glyphicon-ok"></span>'
	 +   'Ignore Avatars & Name Colors</a></li>'
	 + '<li><a id="chat-8" class="opt"><span class="glyphicon glyphicon-ok"></span>'
	 +   'Ignore Premium Notifications</a></li>'
	 + '<li><a id="chat-9" class="opt"><span class="glyphicon glyphicon-ok"></span>Ignore Chat Colors</a></li>'
	 + '<li><a id="chat-10" class="opt"><span class="glyphicon glyphicon-ok"></span>Ignore Emotes</a></li>'
	 + '<li class="divider"></li>'
	 + '<li class="btngr-padding"><div class="btn-group">'
	 +   '<button id="chat-11" class="btn btn-sm btn-default" title="Decrease font size">'
	 +     '<span class="glyphicon glyphicon-minus"></span></button>'
	 +   '<button id="chat-12" class="btn btn-sm btn-default" title="Reset font size">'
	 +     '<span class="glyphicon glyphicon-refresh"></span> font size: '
	 +     '<span id="chat-font-size">100</span>%</button>'
	 +   '<button id="chat-13" class="btn btn-sm btn-default" title="Increase font size">'
	 +     '<span class="glyphicon glyphicon-plus"></span></button></div></li>';
document.getElementById("chatopts-menu").innerHTML = html;

if (SHOWIMAGES) $("#chat-1").addClass('activated');
if (SHOWVIDEOS) $("#chat-2").addClass('activated');
if (CHATSTYLE == "matrix") {
	$("#chat-3").addClass('activated');
	$("#userlist, #messagebuffer, #chatline").addClass('matrix');
}
if (CHATBG == "white") {
	$("#chat-4").addClass('activated');
	$("#userlist, #messagebuffer, #chatline, .pm-buffer, .pm-input").addClass('whitebg');
}
if (MSGSEPARATOR == "lines") {
	$("#chat-5").addClass('activated');
	$messagebuffer.addClass('lines');
} else if (MSGSEPARATOR == "bubbles") {
	$("#chat-6").addClass('activated');
	$messagebuffer.addClass('bubbles');
}
if (IGNOREAVATARS) {
	$("#chat-7").addClass('activated');
	$messagebuffer.addClass('noavatars');
}
if (IGNORESERVER) {
	$("#chat-8").addClass('activated');
	$messagebuffer.addClass('ignoreserver');
}
if (IGNORECHATMODE == 2) {
	$("#chat-9").html('<span class="glyphicon glyphicon-ok"></span> Ignore Text Effects');
} else if (IGNORECHATMODE == 3) {
	$("#chat-9").html('<span class="glyphicon glyphicon-ok"></span> Ignore Colors & Effects');
}
if (IGNORECOLORS) {
	$("#chat-9").addClass('activated');
	if (IGNORECHATMODE != 1) $messagebuffer.addClass('noeffects');
	if (IGNORECHATMODE != 2) $messagebuffer.addClass('nocolors');
}
if (IGNOREEMOTES) {
	$("#chat-10").addClass('activated');
	$messagebuffer.addClass('noemotes');
}
if (CHATFONTSIZE != 100) {
	$messagebuffer.css('font-size', CHATFONTSIZE + '%');
	document.getElementById("chat-font-size").innerHTML = Math.round(CHATFONTSIZE);
}


// Playlist labels

var html = LARGEPLAYER ? 'To player' : 'To chat ';
$('<span id="scroll-to-chat" class="label label-default pull-right pointer scroll-label" title="Scroll to chat" />')
  .appendTo($plmeta).html(html);
$('<span id="hide-playlist" class="label label-default pull-right pointer scroll-label" title="Hide playlist" />')
  .appendTo($plmeta).html('<span class="glyphicon glyphicon-ban-circle"></span>');
$('<span id="expand-playlist" class="label label-default pull-right pointer scroll-label" />').appendTo($plmeta)
  .attr('title', 'Expand playlist').html('<span class="glyphicon glyphicon-resize-vertical"></span>');
$('<span id="scroll-to-current" class="label label-default pull-right pointer scroll-label" />').appendTo($plmeta)
  .attr('title', 'Scroll playlist to current item').html('<span class="glyphicon glyphicon-arrow-up"></span>');

if (HIDEPLS) {
	$("#hide-playlist").addClass('label-danger').attr('title', 'Show playlist');
	$queue.hide();
}
if (EXPANDPL) {
	$("#expand-playlist").addClass('label-success');
	$queue.addClass('expanded');
}


// Playlist classes if enabled scroll hiding and numbering

if (PLSNOSCROLL) $queue.addClass('noscroll');
if (PLSNUMBERS) $queue.addClass('numbered');


// Custom HTML area

if (EXECHTML && CUSTOMHTML != "") {
	$customhtmlwrap =  $('<div id="customhtmlwrap" class="col-lg-12 col-md-12 leftareas" />').html(CUSTOMHTML)
	  .insertBefore("#playlistmanagerwrap");
	if (THEATREMODE) $customhtmlwrap.hide();
}


// Notepad panel

var html = '<div id="notepad-well" class="well form-horizontal">'
	 +   '<textarea id="note-area" class="form-control" rows="12" '
	 +     'placeholder="Personal notepad: write your notes here" />'
	 +   '<div id="notesavewrap" class="text-center">'
	 +     '<button id="notesave-btn" class="btn btn-sm btn-default">Save Notes</button></div></div>';
$notepadwrap = $('<div id="notepadwrap" class="col-lg-12 col-md-12 wells leftareas" />')
  .insertBefore("#playlistmanagerwrap").html(html).hide();

$("#note-area").val(getOrDefault('SP_notes', ''));


// Avatars panel if enabled

if (AVATARSLIST) {
	showAvatarsPanel();
	refreshAvatarsList();
	if (THEATREMODE) $("#avatarswrap").hide();
}


// Favourite Premium links control panel

var html = '<div class="vertical-spacer"></div><div class="centered">'
	 +   '<button id="addtofav-btn" class="btn btn-default" title="Add to your Premium favourite links">'
	 +     '<span class="glyphicon glyphicon-thumbs-up"></span> Add to favourite links</button></div>'
	 + '<ul id="queue-fav" class="videolist col-lg-12 col-md-12"></ul>';
$('<div id="favscontrol" class="col-lg-12 col-md-12 pl" />').insertAfter("#queuefail").html(html).hide();


// Advanced options control panel

var html = '<div class="well"><div class="btn-group">'
	 +   '<button id="tools-btn" class="btn btn-sm btn-default" title="Premium Admin Tools">Tools</button>'
	 +   '<button id="clear-btn" class="btn btn-sm btn-default" title="Clear chat">/clear</button>'
	 +   '<button id="autoclear-btn" class="btn btn-sm btn-default" title="Toggle Autoclear function '
	 +   '(automatically deletes chat flood)">Autoclear</button>'
	 +   '<button id="antiafk-btn" class="btn btn-sm btn-default" title="Toggle Anti-AFK function '
	 +   '(prevents you from AFK status)">AntiAFK</button>'
	 +   '<button id="afk-btn" class="btn btn-sm btn-default" title="Toggle AFK status">/afk</button>'
	 + '</div><div class="btn-group pull-right">'
	 +   '<button id="plrtext-btn" class="btn btn-sm btn-default" title="Chat messages on player (NicoNico style)">'
	 +     '<span class="glyphicon glyphicon-font"></span>'
	 +   '<button id="plmode-btn" class="btn btn-sm btn-default" title="Playlist mode">'
	 +     '<span class="glyphicon glyphicon-th-list"></span> PL mode'
	 +   '<button id="togglepl-btn" class="btn btn-sm btn-default" title="Toggle player">'
	 +     '<span class="glyphicon glyphicon-transfer"></span> Player'
	 +   '</button><div id="qualitybtn-outer" class="btn-group">'
	 +     '<button id="quality-btn" class="btn btn-sm btn-default dropdown-toggle" '
	 +     'data-toggle="dropdown" title="Video quality"><span class="glyphicon glyphicon-film"></span> '
	 +     '</button><ul id="quality-menu" class="dropdown-menu dropdown-menu-right">'
	 +	 '<li><a id="quality-1" class="opt" val="auto"><span class="glyphicon glyphicon-ok"></span> Auto</a>'
	 +	 '</li><li><a id="quality-2" class="opt" val="240">'
	 +	   '<span class="glyphicon glyphicon-ok"></span> 240 px</a>'
	 +	 '</li><li><a id="quality-3" class="opt" val="360">'
	 +	   '<span class="glyphicon glyphicon-ok"></span> 360 px</a>'
	 +	 '</li><li><a id="quality-4" class="opt" val="480">'
	 +	   '<span class="glyphicon glyphicon-ok"></span> 480 px'
	 +	   '<span class="glyphicon glyphicon-sd-video icon-right"></span></a>'
	 +	 '</li><li><a id="quality-5" class="opt" val="720">'
	 +	   '<span class="glyphicon glyphicon-ok"></span> 720 px'
	 +	   '<span class="glyphicon glyphicon-hd-video icon-right"></span></a>'
	 +	 '</li><li><a id="quality-6" class="opt" val="1080">'
	 +	   '<span class="glyphicon glyphicon-ok"></span> 1080 px'
	 +	   '<span class="glyphicon glyphicon-hd-video icon-right"></span></a>'
	 +	 '</li><li><a id="quality-7" class="opt" val="best">'
	 +	   '<span class="glyphicon glyphicon-ok"></span> Highest</a></li></ul></div>'
	 +   '<button id="leader-btn" class="btn btn-sm btn-default" title="Give yourself a Leader status '
	 +     'and control media time"><span class="glyphicon glyphicon-star-empty"></span></button></div>'
	 + '<div class="clearfix5"></div>'
	 + '<button id="utc" class="btn btn-sm btn-default pull-right" title="Toggle between UTC and time left">'
	 + '</button><div class="btn-group">'
	 +   '<button id="hideafk-btn" class="btn btn-sm btn-default" title="Hide AFK users on userlist">'
	 +     '<span class="glyphicon glyphicon-eye-close"></span> Hide AFK'
	 +   '<button id="hidetstamps-btn" class="btn btn-sm btn-default" title="Hide chat timestamps">'
	 +     '<span class="glyphicon glyphicon-time"></span> Hide TS'
	 +   '<button id="noautoscroll-btn" class="btn btn-sm btn-default" title="Disable chat autoscroll">'
	 +     '<span class="glyphicon glyphicon-chevron-down"></span> No Scroll'
	 +   '</button><button id="public-btn" class="btn btn-sm btn-default" '
	 +     'title="Show list of public channels"><span class="glyphicon glyphicon-globe"></span> Channels</button>'
	 + '</div></div>';
$('<div id="advoptswrap" class="col-lg-12 col-md-12" />').insertAfter("#queuefail").html(html).hide();

$("#quality-btn").html($("#quality-btn").html() + USEROPTS.default_quality + ' ');
$("#quality-menu").find("a[val=" + USEROPTS.default_quality + "]").addClass('activated');
if (!USEROPTS.show_timestamps) $("#hidetstamps-btn").addClass('btn-warning');


// Synchtube Premium footer

var html = '<br />Mediasync, Copyright - 2017 Mediaman · '

$(".credit").html($(".credit").html() + html);


// Optional additional custom footer

if (CustomFooterHTML != '') $(".credit").html($(".credit").html() + '<br />' + CustomFooterHTML);


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/* ---------- [REGION 4] USER INTERFACE EVENTS ---------- */

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// Reload channel after global "Options" save

$("#useroptions .modal-footer button:nth-child(1)").on("click", function() {
	document.location.reload();
});


// Navbar mode icons events

$("#navbar-up").on("click", function() {
	$nav.hide();
	$('<div id="navbar-collapsed" class="centered maxwidth" />').appendTo("body");
	$('<div class="pointer" title="Expand navigation bar" />').appendTo($("#navbar-collapsed"))
	  .html('<span class="glyphicon glyphicon-chevron-down"></span>')
	  .on("click", function() {
		$("#navbar-collapsed").remove();
		$nav.show();
	  });
});

$("#navbar-unpin").on("click", function() {
	SCROLLNAVBAR ? fixedNavbar() : scrollableNavbar();
	setOpt('SP_scrollnavbar', SCROLLNAVBAR = !SCROLLNAVBAR);
});


// Layout dropdown menu events

$("#layout-1").on("click", function() {
	$layoutmenu.parent().removeClass('open');
	createModal('Premium Options');

	group = $('<div class="group-modal btn-group" />').appendTo(body);
	content1 = $('<div id="_c1" class="gdiv" />').appendTo(body);
	content2 = $('<div id="_c2" class="gdiv" />').appendTo(body);
	content3 = $('<div id="_c3" class="gdiv" />').appendTo(body);
	content4 = $('<div id="_c4" class="gdiv" />').appendTo(body);
	content5 = $('<div id="_c5" class="gdiv" />').appendTo(body);
	content6 = $('<div id="_c6" class="gdiv" />').appendTo(body);
	btn1 = $('<button id="_b1" class="btn btn-sm btn-default gbtn">Quick opts</button>').appendTo(group)
	  .on("click", function() {
		switchModalTabs($(this), content1, "options", 1);
	  });
	btn2 = $('<button id="_b2" class="btn btn-sm btn-default gbtn">Advanced</button>').appendTo(group)
	  .on("click", function() {
		switchModalTabs($(this), content2, "options", 2);
	  });
	btn3 = $('<button id="_b3" class="btn btn-sm btn-default gbtn">Elements</button>').appendTo(group)
	  .on("click", function() {
		switchModalTabs($(this), content3, "options", 3);
	  });
	btn4 = $('<button id="_b4" class="btn btn-sm btn-default gbtn">Filters</button>').appendTo(group)
	  .on("click", function() {
		switchModalTabs($(this), content4, "options", 4);
	  });
	btn5 = $('<button id="_b5" class="btn btn-sm btn-default gbtn">Media DB</button>').appendTo(group)
	  .on("click", function() {
		switchModalTabs($(this), content5, "options", 5);
	  });
	btn6 = $('<button id="_b6" class="btn btn-sm btn-default gbtn">HTML</button>').appendTo(group)
	  .on("click", function() {
		switchModalTabs($(this), content6, "options", 6);
	  });

	$(".gdiv").hide();
	$("#_c" + VISIBLETAB["options"]).show();
	$("#_b" + VISIBLETAB["options"]).addClass('btn-success');

	var html = '';
	var labels = [
		['Navigation bar', 'transparentnav', 'Transparent navigation bar (opaque on mouseover)'],
		['MOTD', 'collapsemotd', 'Collapse MOTD on load'],
		['Userlist', 'collapseulist', 'Collapse userlist on load'],
		['Userlist & Chat', 'chathidescroll', 'Autohide scrollbars'],
		['Chat', 'chatusername', 'Show username before every message'],
		['', 'hideindicator', 'Don\'t display "New Messages Below" alert'],
		['', 'chatsounds', 'Enable chat voice commands and sounds'],
		['', 'avatarslist', 'Display all users profile images below chat'],
		['Playlist', 'plsnumbers', 'Numbered playlist items'],
		['', 'plsnoscroll', 'Hide playlist scrollbar (better channel reaction time for long playlists)'],
	];
	for (i in labels) {
		html += '<div class="form-group"><label class="control-label col-sm-5">' + labels[i][0] + '</label>'
		     +    '<div class="col-sm-7 config-col"><label class="checkbox-inline">'
		     +      '<input id="' + labels[i][1] + '" type="checkbox" /><span> ' + labels[i][2] + '</span>'
		     +    '</label></div></div>';
	}
	content1.html('<form class="form-horizontal">' + html + '</form>');

	var html = '<form class="form-horizontal"><div class="form-group">'
		 +   '<label class="control-label col-sm-5">Browser\'s tab title</label>'
		 +   '<div class="col-sm-7 config-col">'
		 +   '<select id="tabmode" class="form-control">'
		 +     '<option value="0">channel ID</option>'
		 +     '<option value="1">number of chat messages</option>'
		 +     '<option value="2">current media title</option></select>'
		 +   '</div>'
		 + '</div><div class="form-group">'
		 +   '<label class="control-label col-sm-5">Glue layout elements to the edge of screen</label>'
		 +   '<div class="col-sm-7 config-col"><label class="checkbox-inline">'
		 +   '<input id="gluelayout" type="checkbox"><span> Enable</span>'
		 +   '</label></div>'
		 + '</div><div class="form-group">'
	      	 +   '<label class="control-label col-sm-5">Character(s) after username in chat messages</label>'
	      	 +   '<div class="col-sm-7 config-col">'
	      	 +   '<input id="usernamemark" class="form-control" type="text" maxlength="3" />'
		 +   '</div>'
	      	 + '</div><div class="form-group">'
		 +   '<label class="control-label col-sm-5">Maximum number of visible chat messages</label>'
		 +   '<div class="col-sm-7 config-col">'
		 +   '<select id="chatmaxsize" class="form-control"><option value="50">50</option>'
		 +     '<option value="100">100</option><option value="200">200</option>'
		 +     '<option value="500">500</option></select>'
		 +   '</div>'
		 + '</div><div class="form-group">'
		 +   '<label class="control-label col-sm-5">Emotes per page in Handy Emotes List</label>'
		 +   '<div class="col-sm-7 config-col">'
		 +   '<select id="emotesperpage" class="form-control"><option value="25">25</option>'
		 +     '<option value="50">50</option><option value="100">100</option>'
		 +     '<option value="200">200</option><option value="500">500</option></select>'
		 +   '</div>'
		 + '</div><div class="form-group">'
		 +   '<label class="control-label col-sm-5">Emotes tab completion preview position</label>'
		 +   '<div class="col-sm-7 config-col">'
		 +   '<select id="emotesprevpos" class="form-control">'
		 +     '<option value="no-preview">don\'t show preview</option>'
		 +     '<option value="b-left">bottom left</option>'
		 +     '<option value="b-right">bottom right</option>'
		 +     '<option value="t-right">top right</option></select>'
		 +   '</div>'
		 + '</div><div class="form-group">'
		 +   '<label class="control-label col-sm-5">Mode of additional Premium Notifications</label>'
		 +   '<div class="col-sm-7 config-col">'
		 +   '<select id="premiumnotmode" class="form-control"><option value="1">don\'t show neither</option>'
		 +     '<option value="2">show only "user join/leave"</option>'
		 +     '<option value="3">show only "now playing"</option>'
		 +     '<option value="4">show both</option></select>'
		 +   '</div>'
		 + '</div><div class="form-group">'
		 +   '<label class="control-label col-sm-5">Mode of "Ignore" chat text menu option</label>'
		 +   '<div class="col-sm-7 config-col">'
		 +   '<select id="ignorechatmode" class="form-control"><option value="1">ignore only colors</option>'
		 +     '<option value="2">ignore only text effects</option>'
		 +     '<option value="3">ignore both colors and effects</option></select>'
		 +   '</div>'
		 + '</div><div class="form-group">'
	      	 +   '<label class="control-label col-sm-5">Custom player hiding image</label>'
	      	 +   '<div class="col-sm-7 config-col">'
	      	 +   '<input id="hideplayerurl" class="form-control" type="text" placeholder="Paste image URL '
		 +     'and enable below" />'
		 +   '</div>'
	      	 + '</div><div class="form-group">'
		 +   '<label class="control-label col-sm-5"></label>'
		 +   '<div class="col-sm-7 config-col"><label class="checkbox-inline">'
		 +   '<input id="imageurlaccept" type="checkbox"><span> Enable custom image'
		 +   '</span></label></div></div></form>';
	content2.html(html);

	var html = 'Enable to display or disable to hide various channel elements.<br />'
		 + '<form class="form-horizontal"><br />';
	var labels = [
		['Navigation bar', '<span class="glyphicon glyphicon-asterisk text-danger"></span> '
		  + 'All elements (including elements listed below; "Layout" menu is visible always)'],
		['', 'Channel logo (if available)'],
		['MOTD', '<span class="glyphicon glyphicon-asterisk text-danger"></span> All elements'],
		['Announcements', '<span class="glyphicon glyphicon-asterisk text-danger"></span> All elements'],
		['Video and chat headers', '<span class="glyphicon glyphicon-asterisk text-danger"></span> '
		  + 'All elements (including elements listed below)'],
		['', 'Video header labels'],
		['', 'Chat header labels'],
		['Video and chat controls', '<span class="glyphicon glyphicon-asterisk text-danger"></span> '
		  + 'All elements (including elements listed below)'],
		['', 'Playlist control buttons'],
		['', 'Playlist control menu'],
		['', 'Player control menu'],
		['', 'Player control buttons'],
		['', 'Media Database buttons (if available)'],
		['', 'New poll and emote list buttons'],
		['', 'Colors button'],
		['', 'Additional panels buttons'],
		['', 'Chat control menus'],
		['Playlist footer', '<span class="glyphicon glyphicon-asterisk text-danger"></span> '
		  + 'All elements (including elements listed below)'],
		['', 'Playlist footer labels'],
		['Footer', 'All elements']
	];
	var j = 0;
	for (i in labels) {
		j++;
		html += '<div class="form-group"><label class="control-label col-sm-5">' + labels[i][0] + '</label>'
		     +    '<div class="col-sm-7 config-col"><label class="checkbox-inline">'
		     +      '<input id="elms_' + j + '" type="checkbox" /><span> ' + labels[i][1] + '</span>'
		     +    '</label></div></div>';
	}
	content3.html(html + '</form>');

	var html = 'Define your own chat filters. Use text or simplified regular expressions.<br />'
		 + '<span class="text-danger">Warning! Don\'t use pattern\'s external slashes and modifiers. '
		 + 'All filters will be case sensitive. Use <code>&nbsp;>&nbsp;</code> (with spaces) to separate '
		 + 'original and replacing pattern. Be careful what strings or expressions you filter, custom filters '
		 + 'may affect links and cause wrong URLs displaying. New line = new filter. </span><br /><br />'
		 + '<form class="form-horizontal"><div class="col-sm-12 config-col">'
	      	 +   '<textarea id="filters-area" class="form-control" type="textarea" rows="10" '
		 +   'placeholder="Enter your chat filters here" />'
		 +   '<label class="checkbox-inline"><input id="exec-filters" type="checkbox"><span> '
		 +     'Execute custom filters</span></label></div></form>'
		 + '<div class="clearfix5"></div><hr /><strong>Simple examples of regular expressions filters</strong>'
		 + '<br /><br /><table class="commands-tbl maxwidth">'
		 +   '<tr><td><code>abc > bcd</code> - replaces string <i>abc</i> with <i>bcd</i></td></tr>'
		 +   '<tr><td><code>abc >&nbsp;</code> - deletes string <i>abc</i> '
		 +   '(technically replaces it with empty string)</td></tr>'
		 +   '<tr><td><code>(abc|def|ghi) > xyz</code> - replaces any of <i>abc, def, ghi</i> strings '
		 +   'with <i>xyz</i>; <b>()</b> means group of characters inside, <b>|</b> means '
		 +   'alternatives</td></tr>'
		 +   '<tr><td><code>(a|b)(c|d) > xyz</code> - replaces any strings combinations '
		 +     '<i>a</i> or <i>b</i> and <i>c</i> or <i>d</i> '
		 +   '(<i>ac, ad, bc, bd</i>, but not <i>ab, cd</i> etc.)</td></tr>'
		 +   '<tr><td><code>(A|a)(B|b)(C|c) > xyz</code> - replaces any small and capital letters '
		 +   'combinations of <i>abc</i> string (<i>Abc, aBc, aBC</i> etc.)</td></tr>'
		 +   '<tr><td><code>\\bcat\\b > dog</code> - replaces only whole word <i>cat</i> with <i>dog</i>, '
		 +   'but not longer words containing this string (<i>cats, category, bobcat</i> etc.); '
		 +   '<b>\\b</b> means start or end of the single word</td></tr>'
		 +   '<tr><td><code>A(.+?)a > "A$1a"</code> - adds quotation marks to any string between capital '
		 +   'letter <i>A</i> and a small letter <i>a</i> (<i>Asia, America, Africa</i> etc.); '
		 +   '<b>(.+?)</b> means group of anything between, <b>$1</b> in replacing pattern means '
		 +   '"display content of the first group in the filter"</td></tr></table>'
		 + '<br /><strong>Using special characters</strong><br /><br />'
		 + '<p class="text-danger">Characters such as <code>\\ ^ $ . | ? * + ( ) [ {</code> are regular '
		 + 'expressions characters with special meanings (read regex manuals for more info). To use it '
		 + 'literally in filters, you have to add backslash before. So if you want to filter a dot sign '
		 +   '<code>.</code>, use <code>\\.</code> (this applies only in "before" part, in replacing '
		 + 'pattern of the filter you should use single characters).</p>';
	content4.html(html);

	var html = '<form class="form-horizontal">'
		 +   'You can create your own Media Database. It will appear in the "Add video" panel.'
		 +   '<p class="text-danger">Toggling custom Media Database or changing file URL requires channel '
		 +   'reload to take effect.</p>'
		 +   '<div class="form-group"><label class="control-label col-sm-5">Custom Media Database</label>'
		 +     '<div class="col-sm-7 config-col"><label class="checkbox-inline">'
		 +       '<input id="exec-db" type="checkbox"><span> Enable Database (it will override channel Media '
		 +       'Database if available)</span></label></div>'
	      	 +   '</div><div class="form-group"><label class="control-label col-sm-5">'
		 +     'Media Database URL</label><div class="col-sm-7 config-col">'
	      	 +       '<input id="customdburl" class="form-control" type="text" '
		 +       'placeholder="Custom Media Database file URL" /></div></div></form>'
		 + '<div class="clearfix5"></div><hr />' + preparingMediaDBHelp()
		 + '<br />Save prepared code as .js file, upload it to your web hosting '
		 + '(Dropbox, Google Drive, your own server, etc.) and paste link into the field above.';
	content5.html(html);

	var html = '<form class="form-horizontal"><p class="text-danger">'
		 +   'Adding, removing or toggling HTML code requires channel reload to take effect.'
		 + '</p><div class="form-group">'
		 +   '<label class="control-label col-sm-5">Custom HTML in empty area (polls area)</label>'
		 +   '<div class="col-sm-7 config-col"><label class="checkbox-inline">'
		 +     '<input id="exec-html" type="checkbox"><span> Execute custom HTML</span></label></div>'
		 +   '<div class="col-sm-12 config-col">'
		 +   '<textarea id="customhtml" class="form-control" type="textarea" rows="10" '
		 +   'placeholder="Paste your HTML code here" /></div></div></form>'
		 + '<div class="clearfix5"></div><hr /><b>Simple examples of regular expressions filters:</b>'
	content6.html(html);

	if (TRANSPARENTNAV) $("#transparentnav").prop('checked', true);
	if (COLLAPSEMOTD) $("#collapsemotd").prop('checked', true);
	if (COLLAPSEULIST) $("#collapseulist").prop('checked', true);
	if (CHATHIDESCROLL) $("#chathidescroll").prop('checked', true);
	if (CHATUSERNAME) $("#chatusername").prop('checked', true);
	if (HIDEINDICATOR) $("#hideindicator").prop('checked', true);
	if (CHATSOUNDS) $("#chatsounds").prop('checked', true);
	if (AVATARSLIST) $("#avatarslist").prop('checked', true);
	if (PLSNUMBERS) $("#plsnumbers").prop('checked', true);
	if (PLSNOSCROLL) $("#plsnoscroll").prop('checked', true);

	$("#tabmode").val(TABMODE);
	if (GLUELAYOUT) $("#gluelayout").prop('checked', true);
	$("#usernamemark").val(USERNAMEMARK);
	$("#chatmaxsize").val(CHATMAXSIZE);
	$("#emotesperpage").val(EMOTESPERPAGE);
	$("#emotesprevpos").val(EMOTESPREVPOS);
	$("#premiumnotmode").val(PREMIUMNOTMODE);
	$("#ignorechatmode").val(IGNORECHATMODE);
	$("#hideplayerurl").val(HIDEPLAYERURL);
	if (IMAGEURLACCEPT) $("#imageurlaccept").prop('checked', true);

	var arr = ELEMENTS.split("|");
	var j = 0;
	for (i in arr) {
		j++;
		var row = arr[i].split(":");
		if (row[1] == 1) $("#elms_" + j).prop('checked', true);
	}

	$("#filters-area").val(CUSTOMFILTERS);
	if (EXECFILTERS) $("#exec-filters").prop('checked', true);

	if (EXECHTML) $("#exec-html").prop('checked', true);
	if (CUSTOMHTML != "") $("#customhtml").val(CUSTOMHTML);

	if (EXECDB) $("#exec-db").prop('checked', true);
	if (CUSTOMDBURL != "") $("#customdburl").val(CUSTOMDBURL);

	$('<button class="btn btn-primary">Save Changes</button>').prependTo(footer)
	  .on("click", function() {
		TRANSPARENTNAV = $("#transparentnav").prop('checked');
		TRANSPARENTNAV ? $nav.addClass('transparent') : $nav.removeClass('transparent');
		COLLAPSEMOTD = $("#collapsemotd").prop('checked');
		COLLAPSEULIST = $("#collapseulist").prop('checked');
		CHATHIDESCROLL = $("#chathidescroll").prop('checked');
		if (CHATHIDESCROLL) {
			$("#userlist, #messagebuffer").addClass('autoscroll');
		} else {
			$("#userlist, #messagebuffer").removeClass('autoscroll');
		}
		CHATUSERNAME = $("#chatusername").prop('checked');
		HIDEINDICATOR = $("#hideindicator").prop('checked');
		if (HIDEINDICATOR) {
			$chatwrap.addClass('noindicator');
		} else {
			if (!$("#noautoscroll-btn").hasClass('btn-warning')) $chatwrap.removeClass('noindicator');
		}
		CHATSOUNDS = $("#chatsounds").prop('checked');
		CHATSOUNDS ? $("#sounds-btn").show() : $("#sounds-btn").hide();
		$("#avatarswrap").remove();
		AVATARSLIST = $("#avatarslist").prop('checked');
		if (AVATARSLIST) {
			showAvatarsPanel();
			refreshAvatarsList();
		}
		PLSNUMBERS = $("#plsnumbers").prop('checked');
		PLSNUMBERS ? $queue.addClass('numbered') : $queue.removeClass('numbered');
		PLSNOSCROLL = $("#plsnoscroll").prop('checked');
		PLSNOSCROLL ? $queue.addClass('noscroll') : $queue.removeClass('noscroll');

		TABMODE = $("#tabmode").val();
		pageTitle();
		GLUELAYOUT = $("#gluelayout").prop('checked');
		GLUELAYOUT ? $body.addClass('glued') : $body.removeClass('glued');
		handleVideoResize();
		USERNAMEMARK = $("#usernamemark").val();
		EMOTESPERPAGE = $("#emotesperpage").val();
		CHATMAXSIZE = $("#chatmaxsize").val();
		EMOTESPREVPOS = $("#emotesprevpos").val();
		$("#emote-view").removeClass().addClass(EMOTESPREVPOS);
		PREMIUMNOTMODE = $("#premiumnotmode").val();
		IGNORECHATMODE = $("#ignorechatmode").val();
		if (IGNORECHATMODE == 1) {
			var txt = 'Ignore Chat Colors';
		} else if (IGNORECHATMODE == 2) {
			var txt = 'Ignore Text Effects';
		} else if (IGNORECHATMODE == 3) {
			var txt = 'Ignore Colors & Effects';
		}
		$("#chat-9").html('<span class="glyphicon glyphicon-ok"></span> ' + txt);
		if ($("#chat-9").hasClass('activated')) {
			$messagebuffer.removeClass('nocolors noeffects');
			if (IGNORECHATMODE != 1) $messagebuffer.addClass('noeffects');
			if (IGNORECHATMODE != 2) $messagebuffer.addClass('nocolors');
		}
		HIDEPLAYERURL = $("#hideplayerurl").val();
		IMAGEURLACCEPT = $("#imageurlaccept").prop('checked');

		var arr = ELEMENTS.split("|");
		var arr2 = [];
		var j = 0;
		for (i in arr) {
			j++;
			var row = arr[i].split(":");
			$("#elms_" + j).prop('checked') ? row[1] = 1 : row[1] = 0;
			arr2.push(row.join(":"));
		}
		ELEMENTS = arr2.join("|");
		toggleLayoutElements();

		CUSTOMFILTERS = $("#filters-area").val();
		EXECFILTERS = $("#exec-filters").prop('checked');

		EXECHTML = $("#exec-html").prop('checked');
		CUSTOMHTML = $("#customhtml").val();

		EXECDB = $("#exec-db").prop('checked');
		CUSTOMDBURL = $("#customdburl").val();

		setOpt('SP_transparentnav', TRANSPARENTNAV);
		setOpt('SP_collapsemotd', COLLAPSEMOTD);
		setOpt('SP_collapseulist', COLLAPSEULIST);
		setOpt('SP_chathidescroll', CHATHIDESCROLL);
		setOpt('SP_chatusername', CHATUSERNAME);
		setOpt('SP_hideindicator', HIDEINDICATOR);
		setOpt('SP_chatsounds', CHATSOUNDS);
		setOpt('SP_avatarslist', AVATARSLIST);
		setOpt('SP_plsnumbers', PLSNUMBERS);
		setOpt('SP_plsnoscroll', PLSNOSCROLL);
		setOpt('SP_tabmode', TABMODE);
		setOpt('SP_gluelayout', GLUELAYOUT);
		setOpt('SP_usernamemark', USERNAMEMARK);
		setOpt('SP_chatmaxsize', CHATMAXSIZE);
		setOpt('SP_emotesperpage', EMOTESPERPAGE);
		setOpt('SP_emotesprevpos', EMOTESPREVPOS);
		setOpt('SP_premiumnotmode', PREMIUMNOTMODE);
		setOpt('SP_ignorechatmode', IGNORECHATMODE);
		setOpt('SP_hideplayerurl', HIDEPLAYERURL);
		setOpt('SP_imageurlaccept', IMAGEURLACCEPT);
		setOpt('SP_elements', ELEMENTS);
		setOpt('SP_customfilters', CUSTOMFILTERS);
		setOpt('SP_execfilters', EXECFILTERS);
		setOpt('SP_execdb', EXECDB);
		setOpt('SP_customdburl', CUSTOMDBURL);
		setOpt('SP_exechtml', EXECHTML);
		setOpt('SP_customhtml', CUSTOMHTML);
		outer.modal('hide');
	  });
});

$("#layout-2").on("click", function() {
	$layoutmenu.parent().removeClass('open');
	createModal('Theme & User CSS');

	var html = '<form class="form-horizontal"><div class="form-group">'
		 +   '<label class="control-label col-sm-5">Theme</label>'
		 +   '<div class="col-sm-7 config-col"><select id="theme-sel" class="form-control"></select></div>'
		 + '</div><div class="form-group">'
		 +   '<label class="control-label col-sm-5">Channel CSS</label>'
		 +   '<div class="col-sm-7 config-col"><label class="checkbox-inline">'
		 +   '<input id="ignore-css" type="checkbox"><span> Ignore Channel CSS</span></label><br />'
		 +   '(Sometimes selected theme may be in conflict with custom channel CSS.)</div>'
		 + '</div><div class="form-group">'
		 +   '<label class="control-label col-sm-5">User CSS</label>'
		 +   '<div class="col-sm-7 config-col"><label class="checkbox-inline">'
		 +   '<input id="exec-css" type="checkbox"><span> Execute User CSS Code</span></label></div>'
		 + '</div></form>';
	body.append(html);
	if (IGNORECSS) $("#ignore-css").prop('checked', true);
	if (EXECCSS) $("#exec-css").prop('checked', true);

	var html = '<option value="" class="theme-header" disabled> :: Default Synchtube Themes ::</option>'
		 + '<option value="/css/themes/light.css"># Light</option>'
		 + '<option value="/css/themes/bootstrap-theme.min.css"># Bootstrap</option>'
		 + '<option value="/css/themes/slate.css"># Slate</option>'
		 + '<option value="/css/themes/cyborg.css"># Cyborg</option>'
		 + '<option value="/css/themes/modern.css"># Modern</option>';
	if (ThemesArray.length > 0) {
		html += '<option value="" class="theme-header" disabled> :: Synchtube Premium Themes ::</option>';
		for (i in ThemesArray) {
			html += '<option value="' + ThemesArray[i][1] + '"># ' + ThemesArray[i][0] + '</option>';
		}
	}
	$("#theme-sel").html(html).val(USERTHEME)
	  .on("change", function() {
		USERTHEME = $(this).val();
		if (USERTHEME.indexOf('/css/themes') < 0) {
			$("#usertheme").attr('href', '/css/themes/slate.css');
			if ($("#usertheme2").length < 1) {
				$('<link id="usertheme2" rel="stylesheet" type="text/css" />')
				  .appendTo("head").attr('href', USERTHEME);
			} else {
				$("#usertheme2").attr('href', USERTHEME);
			}
		} else {
			$("#usertheme").attr("id", "usertheme_old");
			$('<link id="usertheme" rel="stylesheet" type="text/css" />').insertAfter("#usertheme_old")
			  .attr({'href':USERTHEME, 'onload':'$("#usertheme_old").remove()'});
			$("#usertheme2").remove();
		}
		if ($("#usercss").length > 0) $("head").append($("#usercss").detach());
		setAdditionalCSS();
		if (['/css/themes/light.css', '/css/themes/bootstrap-theme.min.css'].indexOf(USERTHEME) > -1) {
			$body.addClass('bright').removeClass('modern');
		} else if (USERTHEME == '/css/themes/modern.css') {
			$body.addClass('modern').removeClass('bright');
		} else {
			$body.removeClass('bright modern');
		}
		setOpt('SP_usertheme', USERTHEME);
		setTimeout(function() {handleVideoResize()}, 1500);
	  });

	$("#ignore-css").on("click", function() {
		IGNORECSS = !IGNORECSS;
		if (!IGNORECSS) {
			if (CHANCSS != "") {
				$('<style id="chancss" type="text/css">' + CHANCSS + '</style>').appendTo("head");
			}
			if (CHANEXTERNALCSS != "") {
				$('<link id="chanexternalcss" href="' + CHANEXTERNALCSS + '" rel="stylesheet">')
				  .appendTo("head");
			}
			if ($("#usertheme2").length > 0) $("head").append($("#usertheme2").detach());
			$("head").append($("#hardcss").detach());
			if ($("#usercss").length > 0) $("head").append($("#usercss").detach());
		} else {
			CHANCSS = $("#chancss").length > 0 ? $("#chancss").html() : '';
			CHANEXTERNALCSS = $("#chanexternalcss").length > 0 ? $("#chanexternalcss").attr('href') : '';
			$("#chanexternalcss, #chancss").remove();
		}
		setOpt('SP_ignorecss', IGNORECSS);
		setTimeout(function() {handleVideoResize()}, 500);
	});

	$("#exec-css").on("click", function() {
		EXECCSS = !EXECCSS;
		if (!EXECCSS) {
			$("#usercss").remove();
		} else {
			if (USERCSS != "") {
				$("head").append('<style id="usercss" type="text/css">' + USERCSS + '</style>');
			}
		}
		$("#layout-2").toggleClass('activated');
		setOpt('SP_execcss', EXECCSS);
		setTimeout(function() {handleVideoResize()}, 500);
	});

	var text = 'Paste your CSS code here, click "Save Code Changes" and enable "Execute CSS Code" option above';
	cssarea = $('<textarea id="css-area" class="form-control" rows="10" />').attr('placeholder', text)
	  .val(USERCSS).appendTo(body);
	csssavewrap = $('<div id="csssavewrap" />').appendTo(body);
	csssavebtn = $('<button id="csssave-btn" class="btn btn-primary pull-right">Save Code Changes</button>')
	  .appendTo(csssavewrap)
	  .on("click", function() {
		USERCSS = cssarea.val();
		if (EXECCSS && USERCSS != "") {
			if ($("#usercss").length < 1) $("head").append('<style id="usercss" type="text/css" />');
			$("#usercss").html(USERCSS);
		} else {
			$("#usercss").remove();
		}
		setOpt('SP_usercss', USERCSS);
	  });

	var html = '<div class="form-group"><label class="control-label col-sm-5">Background pattern</label>'
		 + '<div class="col-sm-7 config-col"><select id="pattern-sel" class="form-control"></select></div>'
		 + '</div><div class="form-group"><label class="control-label col-sm-5">Google font</label>'
		 + '<div class="col-sm-7 config-col"><select id="font-sel" class="form-control"></select></div></div>';
	body.append('<div class="clearfix5" />')
	  .append('<form class="form-horizontal margin-top-15">' + html + '</form>');

	var html = '<option value="">none (or default theme background)</option>';
	if (BackgroundsArray.length > 0) {
		for (i in BackgroundsArray) {
			html += '<option value="' + BackgroundsArray[i][1] + '"># '
			     +  BackgroundsArray[i][0] + '</option>';
		}
	}

	$("#pattern-sel").html(html).val(USERPATTERN)
	  .on("change", function() {
		USERPATTERN = $(this).val();
		setAdditionalCSS();
		setOpt('SP_userpattern', USERPATTERN);
	  });

	var html = '<option value="">none (or default theme font)</option>';
	for (i in FontsArray) {
		html += '<option value="' + FontsArray[i] + '"># ' + FontsArray[i] + '</option>';
	}

	$("#font-sel").html(html).val(USERFONT)
	  .on("change", function() {
		USERFONT = $(this).val();
		setAdditionalCSS();
		setOpt('SP_userfont', USERFONT);
	  });
});

$("#layout-3").on("click", function() {
	COMPACT ? fluidLayout() : compactLayout();
	setOpt('SP_compact', COMPACT = !COMPACT);
	if ($("#expand-chat").hasClass('label-success')) expandChat();
});


$("#layout-4").on("click", function() {
	SINGLECOLUMN ? twoColumns() : singleColumn();
	setOpt('SP_singlecolumn', SINGLECOLUMN = !SINGLECOLUMN);
	if ($("#expand-chat").hasClass('label-success')) expandChat();
});

$("#layout-5").on("click", function() {
	SYNCH ? nonSynchLayout() : synchLayout();
	setOpt('SP_synch', SYNCH = !SYNCH);
});

$("#layout-6").on("click", function() {
	MOTDBOTTOM ? topMOTD() : bottomMOTD();
	setOpt('SP_motdbottom', MOTDBOTTOM = !MOTDBOTTOM);
});

$("#layout-7").on("click", function() {
	$layoutmenu.parent().removeClass('open');
	LARGECHAT ? normalChat() : largeChat();
	setOpt('SP_largechat', LARGECHAT = !LARGECHAT);
	scrollChatToTop();
});

$("#layout-8").on("click", function() {
	$layoutmenu.parent().removeClass('open');
	LARGEPLAYER ? normalPlayer() : largePlayer();
	setOpt('SP_largeplayer', LARGEPLAYER = !LARGEPLAYER);
	scrollChatToTop();
});

$("#layout-9").on("click", function() {
	theatreMode();
});

$("#layout-10").on("click", function() {
	radioMode();
});


// Chat header labels events

$("#expand-chat").on("click", function() {
	if ($(this).hasClass('label-success')) {
		collapseChat();
	} else {
		expandChat();
		$(window).bind('resize.expandchat', function(e) {
			expandChat();
		});
	}
	if (SCROLLCHAT) scrollChat();
});

$("#scroll-to-pl").on("click", function() {
	window.scrollTo(0, $queue.offset().top);
});

$("#scroll-top, #scroll-to-chat").on("click", function() {
	scrollChatToTop();
});


// Playlist options dropdown menu events

$("#pls-1").on("click", function() {
	showUserOptions();
	$("#useroptions .nav-tabs li:nth-child(2) a").trigger("click");
});

$("#pls-2").on("click", function() {
	createModal('Contributors List');

	var list = {};
	$queue.find("li").each(function() {
		var item = $(this).attr('title');
		var user = item.split('by: ')[1];
		user in list ? list[user]++ : list[user] = 1;
	});
	var list2 = [];
	for (key in list) {
		list2.push([key, list[key]]);
	}
	list2.sort(function(a,b) {return a[1] - b[1]});
	list2.reverse();
	var list3 = [];
	for (i in list2) {
		list3.push('<tr><td>' + (i * 1 + 1) + '. </td><td>' + list2[i].join('</td><td> ') + '</td></tr>');
	}
	var html = '<strong>Number of playlist items:</strong><br /><br />'
		 + '<table id="contributors-list">' + list3.join("") + '</table><br />';
	body.append(html);
});

$("#pls-3").on("click", function() {
	createModal('Last Played');
	body.append('<strong>List of items played in current session</strong> (from latest):<br /><br />');
	ul = $('<ol class="olmodal" />').appendTo(body);
	var len = LASTPLAYED.length - 1;
	for (var i = len; i >= 0; i--) {
		ul.append('<li>' + LASTPLAYED[i] + '</li>');
	}
	body.append('<br /><strong>Your history</strong> (last 50):<br /><br />');
	ul = $('<ol class="olmodal" />').appendTo(body);
	var arr = PLAYERHISTORY.length > 0 ? PLAYERHISTORY.split("||+||") : [];
	var len = arr.length;
	for (var i = 0; i < len; i++) {
		ul.append('<li>' + arr[i] + '</li>');
	}
});

$("#pls-4").on("click", function() {
	if ($queue.find(".queue_entry").length < 1) return;
	var uid = $(".queue_active").data("media");
	var arr = {
		'yt':	'http://youtube.com/watch?v=',
		'gd':	'https://docs.google.com/file/d/',
		'fi':	'',
	}
	var link = arr[uid.type] + '' + uid.id;
	if (uid.type == "yt") {
		createModal('Redirecting to KeepVid.com');
		$('<a href="http://keepvid.com/?url=' + link + '" target="_blank" />').appendTo(body)
		  .html('Click here to download on KeepVid.com');
	} else if (uid.type == "gd") {
		createModal('Redirecting to Google Drive');
		$('<a href="' + link + '" target="_blank" />').appendTo(body)
		  .html('Click here to download on Google Drive');
	} else if (uid.type == "fi") {
		createModal('Redirecting to link');
		$('<a href="' + link + '" target="_blank" />').appendTo(body)
		  .html('Click here to download raw file');
	}
});

$("#pls-5").on("click", function() {
	$(this).toggleClass('activated');
	MINIATURES ? $(".miniature").remove() : createMiniatures();
	setOpt('SP_miniatures', MINIATURES = !MINIATURES);
	scrollQueue();
});

$("#pls-6").on("click", function() {
	$(this).toggleClass('activated');
	if (HIDEPLSBTNS) {
		if (hasPermission("playlistjump") || hasPermission("settemp") || hasPermission("playlistdelete")) {
			if (USEROPTS.qbtn_hide) {
				var str = 'Warning! You have disabled playlist buttons globally.\n'
					+ 'You can change it in your user preferences on the top navigation bar\n'
					+ '("Options" > "Playback").'
				alert(str);
			}
			$queue.removeClass('nobuttons');
		} else {
			alert('You have no permissions to display playlist buttons on this channel.');
		}
	} else {
		$queue.addClass('nobuttons');
	}
	setOpt('SP_hideplsbtns', HIDEPLSBTNS = !HIDEPLSBTNS);
	scrollQueue();
});


// Player options dropdown menu events

$("#plr-1").on("click", function() {
	if (HIDDENPLR) {
		$("#hidden-plr").remove();
	} else {
		$videowrap.find(".embed-responsive-16by9").append('<div id="hidden-plr" class="maxwidth" />');
		if (HIDEPLAYERURL != "" && IMAGEURLACCEPT) {
			$("#hidden-plr").css('background-image', 'url("' + HIDEPLAYERURL + '")');
		} else {
			$("#hidden-plr").css('background-image', 'url("' + DefaultHPURL + '")');
		}
	}
	$videowrap.find(".embed-responsive-16by9").toggleClass('relative');
	$(this).toggleClass('activated');
	HIDDENPLR = !HIDDENPLR;
});

$("#plr-2").on("click", function() {
	if (!$(this).hasClass('activated')) $("#plr-3").removeClass('activated');
	$videowrap.find(".embed-responsive-16by9").toggleClass('mX').removeClass('mY');
	$(this).toggleClass('activated');
});

$("#plr-3").on("click", function() {
	if (!$(this).hasClass('activated')) $("#plr-2").removeClass('activated');
	$videowrap.find(".embed-responsive-16by9").toggleClass('mY').removeClass('mX');
	$(this).toggleClass('activated');
});

$("#plr-4").on("click", function() {
	if ($(this).hasClass('activated')) {
		NOPLAYER = false;
		$("#titlerow, #videowrap, #plcontrol, #videocontrols > button, #plr-menu > li:not(.rpl)").show();
		$("#fullscreenbtn, #togglepl-btn").show();
		if (SINGLECOLUMN || LARGECHAT || LARGEPLAYER) setTimeout(function() {$("#togglepl-btn").hide()}, 500);
		if ($favsbtn.hasClass('active')) $("#favscontrol").show();
		var tmp = $('<div class="embed-responsive embed-responsive-16by9" />').appendTo($videowrap);
		$ytapiplayer = $('<iframe id="ytapiplayer" class="embed-responsive-item" frameborder="0" />')
		  .attr({title:'YouTube video player', allowfullscreen:'1'}).appendTo(tmp);
		refreshPlayer();
		if (!$("#expand-chat").hasClass('label-success')) handleVideoResize();
		if (PLAYERTEXT) {
			$videowrap.find(".embed-responsive-16by9").prepend('<div id="player-chat-wrap" />');
		}
	} else {
		NOPLAYER = true;
		$videowrap.find(".embed-responsive-16by9").remove();
		$("#titlerow, #videowrap, #plcontrol, #videocontrols > button, #plr-menu > li:not(.rpl)").hide();
		$("#fullscreenbtn, #favscontrol, #togglepl-btn").hide();
	}
	$("#plr-8").trigger("click");
	$(this).toggleClass('activated');
});

$("#plr-5").on("click", function() {
	FULLTITLE ? compactTitle() : fullWidthTitle();
	setOpt('SP_fulltitle', FULLTITLE = !FULLTITLE);
	if ($("#expand-chat").hasClass('label-success')) expandChat();
});

$("#plr-6").on("click", function() {
	PROGRESSBAR ? hideProgressBar() : showProgressBar();
	setOpt('SP_progressbar', PROGRESSBAR = !PROGRESSBAR);
});

$("#plr-7").on("click", function() {
	if (!PLAYER) return;
	BRIGHTNESS--;
	$("#plr-bright").remove();
	$("#plr-9").removeClass('disabled');
	$videowrap.find(".embed-responsive-16by9").removeClass('relative');
	if (BRIGHTNESS < -8) $(this).addClass('disabled');
	var plus = BRIGHTNESS > 0 ? '+' : '';
	$("#light-level").html(plus + '' + BRIGHTNESS * 10 + '%');
	setPlayerBrightness();
});

$("#plr-8").on("click", function() {
	BRIGHTNESS = 0
	$("#plr-bright").remove();
	$("#plr-7, #plr-9").removeClass('disabled');
	$videowrap.find(".embed-responsive-16by9").removeClass('relative');
	$("#light-level").html('0%');
});

$("#plr-9").on("click", function() {
	if (!PLAYER) return;
	BRIGHTNESS++;
	$("#plr-bright").remove();
	$("#plr-7").removeClass('disabled');
	$videowrap.find(".embed-responsive-16by9").removeClass('relative');
	if (BRIGHTNESS > 8) $(this).addClass('disabled');
	var plus = BRIGHTNESS > 0 ? '+' : '';
	$("#light-level").html(plus + '' + BRIGHTNESS * 10 + '%');
	setPlayerBrightness();
});

$("#plr-10").on("click", function() {
	if (!PLAYER) return;
	PLAYER.getVolume(function(vol) {
		vol = Math.ceil(Math.round((vol - 0.04) * 100) / 4) * 0.04;
		if (vol <= 0) {
			vol = 0;
			$("#plr-11").attr('title', 'Unmute player').addClass('btn-danger');
			$("#plr-btn").addClass('btn-danger');
		}
		CURRENTVOL = vol;
		PLAYER.setVolume(vol);
		document.getElementById("volume-lvl").innerHTML = Math.round(vol * 100);
	});
});

$("#plr-11").on("click", function() {
	if (!PLAYER) return;
	if ($(this).hasClass('btn-danger')) {
		$(this).attr('title', 'Mute player');
		if (CURRENTVOL > 0) $("#plr-btn").removeClass('btn-danger');
		$("#plr-10").removeClass('disabled');
		document.getElementById("volume-lvl").innerHTML = Math.round(CURRENTVOL * 100);
		PLAYER.setVolume(CURRENTVOL);
	} else {
		PLAYER.getVolume(function(vol) {
			CURRENTVOL = vol;
		});
		$(this).attr('title', 'Unmute player');
		$("#plr-btn").addClass('btn-danger');
		$("#plr-10").addClass('disabled');
		document.getElementById("volume-lvl").innerHTML = '0';
		PLAYER.setVolume(0);
	}
	$(this).toggleClass('btn-danger');
});

$("#plr-12").on("click", function() {
	if (!PLAYER) return;
	PLAYER.getVolume(function(vol) {
		vol = Math.floor(Math.round((vol + 0.04) * 100) / 4) * 0.04;
		if (vol > 1) vol = 1;
		$("#plr-11").attr('title', 'Mute player').removeClass('btn-danger');
		$("#plr-btn").removeClass('btn-danger');
		$("#plr-10").removeClass('disabled');
		CURRENTVOL = vol;
		PLAYER.setVolume(vol);
		document.getElementById("volume-lvl").innerHTML = Math.round(vol * 100);
	});
});


// Save note button events

$("#notesave-btn").on("click", function() {
	setOpt('SP_notes', $("#note-area").val());
});


// Add to favourites button events

$("#addtofav-btn").on("click", function() {
	if ($queue.find(".queue_entry").length < 1) return;
	$(this).addClass('disabled');
	var uid = $(".queue_active").data("media");
	var link = formatURL(uid);
	var arr = JSON.parse(FAVLINKS)["links"];
	var len = arr.length;
	if (len >= 100) {
		var html = '<strong>Warning: full list</strong><br />You have reached maximum limit (100) '
			 + 'of favourites links. Delete other items to add new.<br />'
			 + '<button id="close-msg" class="btn btn-primary">Close</button>';
		$('<div class="alert alert-warning" />').insertBefore("#queue-fav").html(html);
		$("#close-msg").on("click", function() {
			$(this).parent().remove();
		});
		return;
	}
	var newid = 1;
	if (len > 0) newid = arr[len - 1]["id"] + 1;
	var html = '<button class="btn btn-xs btn-default pull-left" title="Click to paste link" '
		 + 'onClick="pasteFav(\'' + link +'\')">Copy link to add</button>'
		 + '<a target="_blank" href="' + link + '" class="qe_title">' + uid.title +'</a>'
		 + '<button class="btn btn-xs btn-danger pull-right" title="Remove from list" '
		 + 'onClick="removeFav(' + newid + ')"><span class="glyphicon glyphicon-trash"></span></button>';
	if (uid.type == "yt") {
		html += '<button class="btn btn-default btn-xs pull-right" title="Click to preview" '
		     +  'onclick="previewVideo(\'' + uid.id + '\')">'
		     +    '<i class="glyphicon glyphicon-film"></i> Preview</button>';
	}
	html += '<div class="qe_clear"></div>';
	$('<li class="queue_entry fav-' + newid + '" />').html(html).insertBefore("#freeslots");
	document.getElementById("freeslots")
	  .innerHTML = (len + 1) + ' item(s) | ' + (99 - len) + ' free slot(s) available'
	$favsbtn.addClass('btn-success');
	$(this).addClass('btn-success');
	var str = FAVLINKS.slice(0, -2);
	if (len > 0) str += ', ';
	title = uid.title.replace(/"/g, '\\"');
	str += '{"id":' + newid + ', "title":"' + title + '", "link":"' + link + '"}]}';
	FAVLINKS = str;
	setOpt('SP_favlinks', FAVLINKS);
});


// Favourites button events

$("#favs-btn").on("click", function() {
	toggleElement("#favscontrol");
	$(this).toggleClass('active');
	$(this).hasClass('active') ? createFavsPanel() : document.getElementById("queue-fav").innerHTML = '';
});


// Advanced options buttons events

$("#advopts-btn").on("click", function() {
	toggleElement("#advoptswrap");
	if ($(this).hasClass('active')) {
		(TICKMODE == "utc") ? clearInterval(UTCCLOCK) : clearInterval(LEFTCLOCK);
	} else {
		$("#togglepl-btn").show();
		if (NOPLAYER || SINGLECOLUMN || LARGEPLAYER || LARGECHAT) $("#togglepl-btn").hide();
		if (TICKMODE == "utc") {
			UTCCLOCK = setInterval(function() {UTCTime()}, 1000);
			UTCTime();
		} else {
			$("#utc").addClass('timeleft');
			LEFTCLOCK = setInterval(function() {timeLeft()}, 1000);
			timeLeft();
		}
	}
	CLIENT.leader ? $("#leader-btn").addClass('btn-warning') : $("#leader-btn").removeClass('btn-warning');
	$(this).toggleClass('active');
});

$("#tools-btn").on("click", function() {
	if (!TOOLSENABLED) setOpt('SP_toolsenabled', TOOLSENABLED = true);
	createModal('Premium Admin Tools');

	group = $('<div class="group-modal btn-group" />').appendTo(body);
	content1 = $('<div id="_c1" class="gdiv" />').appendTo(body);
	content2 = $('<div id="_c2" class="gdiv" />').appendTo(body);
	content3 = $('<div id="_c3" class="gdiv" />').appendTo(body);
	content4 = $('<div id="_c4" class="gdiv" />').appendTo(body);
	content5 = $('<div id="_c4" class="gdiv" />').appendTo(body);
	btn1 = $('<button id="_b1" class="btn btn-sm btn-default gbtn">Chat Messages</button>').appendTo(group)
	  .on("click", function() {
		switchModalTabs($(this), content1, "tools", 1);
	  });
	btn2 = $('<button id="_b2" class="btn btn-sm btn-default gbtn">CSS Tips</button>').appendTo(group)
	  .on("click", function() {
		switchModalTabs($(this), content2, "tools", 2);
	  });
	btn3 = $('<button id="_b3" class="btn btn-sm btn-default gbtn">MOTD Tabs</button>').appendTo(group)
	  .on("click", function() {
		switchModalTabs($(this), content3, "tools", 3);
	  });
	btn4 = $('<button id="_b4" class="btn btn-sm btn-default gbtn">Media DB</button>').appendTo(group)
	  .on("click", function() {
		switchModalTabs($(this), content4, "tools", 4);
	  });
	btn5 = $('<button id="_b5" class="btn btn-sm btn-default gbtn">Customization</button>').appendTo(group)
	  .on("click", function() {
		switchModalTabs($(this), content5, "tools", 5);
	  });

	$(".gdiv").hide();
	$("#_c" + VISIBLETAB["tools"]).show();
	$("#_b" + VISIBLETAB["tools"]).addClass('btn-success');

	html = '<strong>Chat text colors for all users without Premium</strong><br /><br />'
	     + '<div id="colors-check" class="centered"></div><br /><br />'
	     + '<strong>Chat text effects for all users without Premium</strong><br /><br />'
	     + '<div id="effects-check" class="centered"></div><br /><br />';
	content1.html(html);

	if (!hasPermission("filteredit")) {
		var html = 'Filter editing is blocked on this channel.<br />'
			 + 'Change permissions if you want to check colors status or install colors.';
		$("#colors-check").html('<p class="text-danger">' + html +'</p>');
		var html = 'Filter editing is blocked on this channel.<br />'
			 + 'Change permissions if you want to check effects status or install effects.';
		$("#effects-check").html('<p class="text-danger">' + html +'</p>');
	}
	var callback = function (data) {
		socket.listeners("chatFilters").splice(socket.listeners("chatFilters").indexOf(callback));
		if (JSON.stringify(data).indexOf('col:(.*?):') < 0) {
			$("#colors-check").html('');
			$('<button class="btn btn-primary btn-sm">Install chat text colors</button>')
			  .appendTo("#colors-check")
			  .on("click", function() {
				socket.emit("addFilter", {
					name:'chat colors (premium)', source:'col:(.*?):', flags:'g',
					replace:'<span style="color:\\1" class="chatcolor">', active:true
				});
				$("#colors-check").html('<p class="text-danger">Colors installed.</p>');
			  });
		} else {
			var html = 'Chat text colors are already visible for all users.';
			$("#colors-check").html('<p class="text-danger">' + html +'</p>');
		}

		var count = 0;
		if (JSON.stringify(data).indexOf(':@@(.+?)@@:') > -1) count++;
		if (JSON.stringify(data).indexOf(':@(.+?)@:') > -1) count++;
		if (JSON.stringify(data).indexOf(':!(.+?)!:') > -1) count++;
		if (JSON.stringify(data).indexOf(':\\\\$(.+?)\\\\$:') > -1) count++;
		if (JSON.stringify(data).indexOf(':%(.+?)%:') > -1) count++;
		if (JSON.stringify(data).indexOf(':#(.+?)#:') > -1) count++;
		if (JSON.stringify(data).indexOf(':\\\\^(.+?)\\\\^:') > -1) count++;

		if (count < 1) {
			$("#effects-check").html('');
			$('<button class="btn btn-primary btn-sm">Install chat text effects</button>')
			  .appendTo("#effects-check")
			  .on("click", function() {
				socket.emit("addFilter", {
					name:'dots-underlined text (premium)', source:':@@(.+?)@@:', flags:'g',
					replace:'<span style="border-bottom:dotted 1px" class="txteffect">\\1</span>',
					active:true
				});
				socket.emit("addFilter", {
					name:'underlined text (premium)', source:':@(.+?)@:', flags:'g',
					replace:'<span style="text-decoration:underline" class="txteffect">\\1</span>',
					active:true
				});
				socket.emit("addFilter", {
					name:'smaller text (premium)', source:':!(.+?)!:', flags:'g',
					replace:'<span style="font-size:0.8em" class="txteffect">\\1</span>',
					active:true
				});
				socket.emit("addFilter", {
					name:'small-caps text (premium)', source:':\\$(.+?)\\$:', flags:'g',
					replace:'<span style="font-variant:small-caps" class="txteffect">\\1</span>',
					active:true
				});
				socket.emit("addFilter", {
					name:'letter-spaced text (premium)', source:':%(.+?)%:', flags:'g',
					replace:'<span style="letter-spacing:2px" class="txteffect">\\1</span>',
					active:true
				});
				socket.emit("addFilter", {
					name:'monospaced text (premium)', source:':#(.+?)#:', flags:'g',
					replace:'<span style="font-family:Menlo,Monaco,Consolas,'
					 + '\'Courier New\',monospace" class="txteffect">\\1</span>',
					active:true
				});
				socket.emit("addFilter", {
					name:'stitched text (premium)', source:':\\^(.+?)\\^:', flags:'g',
					replace:'<span style="outline:1px dashed #98ABB9; outline-offset:-5px; '
					 + 'background-color:#556068; box-shadow:2px 2px 2px #000; padding:5px; '
					 + 'border-radius:2px; color:#EEE" class="txteffect">\\1</span>',
					active:true
				});
				socket.emit("addFilter", {
					name:'fast flowing text (premium)', source:':\\/\\/(.+?)\\/\\/:', flags:'g',
					replace:'<marquee behavior="scroll" scrollamount="30" class="txteffect">'
					 + '\\1</marquee>',
					active:true
				});
				socket.emit("addFilter", {
					name:'bouncing text (premium)', source:':\\/(.+?)\\/:', flags:'g',
					replace:'<marquee behavior="alternate" scrollamount="15" class="txteffect">'
					 + '\\1</marquee>',
					active:true
				});
				$("#effects-check").html('<p class="text-danger">Effects installed.</p>');
			  });
		} else if (count < 7) {
			var html = 'Chat text effects are partially or not properly installed on this channel.<br />'
				 + 'Go to Chat Filters and delete all premium text effects '
				 + 'to prepare proper installation.';
			$("#effects-check").html('<p class="text-danger">' + html +'</p>');
		} else {
			var html = 'Chat text effects are already visible for all users.';
			$("#effects-check").html('<p class="text-danger">' + html +'</p>');
		}

	};
	socket.on("chatFilters", callback);
	socket.emit("requestChatFilters");

	html = '<strong>Custom navbar channel name for all users without Premium</strong><br /><br />'
	     + '1. Copy code below and change <i>(name of your channel)</i> to proper name.<br />'
	     + '2. Paste code to your channel internal CSS or external CSS file.<br /><br />'
	     + '<code>.navbar-brand {font-size:0pt}</code><br />'
	     + '<code>.navbar-brand:before {content:"(name of your channel)"; font-size:14pt}</code><br /><br />'
	     + 'If channel name is not visible properly, try to change first line of above code to:<br /><br />'
	     + '<code>.navbar-brand {font-size:0pt !important; width:auto !important}</code><br /><br /><br />'
	     + '<strong>Username color on chat</strong><br /><br />'
	     + '1. Copy code below and change <i>(user name)</i> to proper user name, '
	     + 'and <i>(CSS color)</i> to proper CSS color, repeat it for all selected users.<br />'
	     + '2. Paste code to your channel internal CSS or external CSS file.<br /><br />'
	     + '<code>div.chat-msg-(user name) .username {color:(CSS color)}</code><br /><br /><br />'
	     + '<strong>Username avatar on chat</strong><br /><br />'
	     + '1. Copy code below and change <i>(user name)</i> to proper user name, '
	     + 'and <i>(avatar URL)</i> to proper image URL, repeat it for all selected users.<br />'
	     + '2. Paste code to your channel internal CSS or external CSS file.<br /><br />'
	     + '<code>.chat-msg-(user name) .username:before {</code><br />'
	     + '<code>background:url("(avatar URL)"); background-size:cover;</code><br />'
	     + '<code>height:30px; width:30px; margin-right:4px;</code><br />'
	     + '<code>content:""; display:inline-block; vertical-align:middle;</code><br /><code>}</code><br />';
	content2.html(html);

	html = '<strong>MOTD Tabs Application</strong><br /><br />'
	     + 'You can turn your channel MOTD into a simple homepage with subpages.<br /><br />'
	     + '1. Copy code from the textarea below.<br />'
	     + '2. Change menu tabs names, add more tabs or delete existed tabs if unnecessary.<br />'
	     + '3. Change HTML content of your tabs.<br />'
	     + '4. Set (or leave default) additional CSS (borders of HTML content, background, colors etc.) '
	     + 'according to your wishes in: <code>motd-tabs</code> - styles of menu links to subpages, '
	     +   '<code>motd-tabs-wrap</code> - subpages HTML container.<br />'
	     + '5. Set, as above, CSS application size or leave default values (400px height and 800px max-width, '
	     + 'you can also set <i>max-width</i> in percents - 100% will make content full-width).<br />'
	     + '6. Paste prepared HTML code into channel MOTD editor.<br /><br />'
	     + '<textarea class="form-control" rows="12">'
	     +   '<div>\n<ul id="motd-tabs" class="nav nav-pills" style="text-align:center; max-width:800px; '
	     +   'margin:0px auto 5px">\n'
	     +   '\t<!-- Below you can set menu links to subpages -->\n\n'
	     +   '\t<li class="active"><a href="#1a" data-toggle="tab">Home</a></li>\n';
	for (i = 2; i <=10; i++) {
		html += '\t<li><a href="#' + i + 'a" data-toggle="tab">Tab #' + i + '</a></li>\n';
	}
	html += '\n</ul>\n<div id="motd-tabs-wrap" style="border:solid 2px #333; border-radius:8px; height:400px; '
	     +    'max-width:800px; margin:0 auto; overflow:auto; padding:10px">\n'
	     +  '\t<div id="motd-tabs-content" class="tab-content clearfix0">\n'
	     +  '\t<!-- Below you can set subpages HTML content -->\n\n'
	     +  '<div class="tab-pane active" id="1a">\n\tHTML content of Home tab.\n</div>\n';
	for (i = 2; i <=10; i++) {
		html += '<div class="tab-pane" id="' + i + 'a">\n\tHTML content of Tab #' + i + '.\n</div>\n';
	}
	html += '\n\t</div>\n</div>\n</div></textarea>';
	content3.html(html);

	html = '<strong>Media Database</strong><br /><br />'
	     + 'You can create custom channel Media Database. It will appear in the "Add video" panel.<br /><br />'
	     + preparingMediaDBHelp()
	     + '<br /><br /><strong>Installing database</strong><br /><br />You can do it in two ways.<br /><br />'
	     + 'A. External file (recommended): save prepared code as .js file and upload it to your web hosting '
	     + '(Dropbox, Google Drive, your own server, etc.). Next, add <code>db</code> parameter to your '
	     + 'current Premium script location, with database file URL as a value, like this:<br />'
	     +   '<code>https://dl.dropboxusercontent.com/s/1dyazoq6t7wh808/Premium.js?db=URL</code><br />'
	     + 'Paste prepared link, as in the example above, to External Javascript channel option.<br /><br />'
	     + 'B. Internal code (not recommended if database is large - it will significantly increase '
	     + 'Premium file size): add database code to your Premium file, but before [REGION 3] '
	     + '(not at the end of file - database will not load).';
	content4.html(html);

	html = '<strong>Synchtube Premium customization</strong><br /><br />'
	     + 'It is possible to customize on your channel some basic Premium options.<br /><br />'
	     + '1. Open code file and go to <code>BASIC CUSTOMIZATION</code> section.<br />'
	     + '2. Change selected variables according to your wishes.<br />'
	     + '3. Save .js file to your web hosting (Dropbox, Google Drive, your own server, etc.).<br />'
	     + '4. Paste your own file link to External Javascript channel option.';
	content5.html(html);
});

$("#clear-btn").on("click", function() {
	if (confirm('Are you sure to clear the chat window for all users?')) socket.emit("chatMsg", {msg:'/clear'});
});

$("#autoclear-btn").on("click", function() {
	if ($(this).hasClass('btn-danger')) {
		$(this).html('Autoclear');
		clearInterval(CLEARING);
	} else {
		$(this).html('Autoclear is ON!');
		CLEARING = setInterval(function() {socket.emit("chatMsg", {msg:'/clear'})}, 250);
	}
	$(this).toggleClass('btn-danger');
});

$("#antiafk-btn").on("click", function() {
	if ($(this).hasClass('btn-warning')) {
		clearInterval(ANTIAFK);
	} else {
		ANTIAFK = setInterval(function() {
			if (findUserlistItem(CLIENT.name).data().afk) socket.emit("chatMsg", {msg:'/afk'});
		}, 2000);
	}
	$(this).toggleClass('btn-warning');
});

$("#plrtext-btn").on("click", function() {
	if (!PLAYERTEXT) {
		$videowrap.find(".embed-responsive-16by9").prepend('<div id="player-chat-wrap" />');
	} else {
		$("#player-chat-wrap").remove();
	}
	$(this).toggleClass('btn-warning');
	PLAYERTEXT = !PLAYERTEXT;
});

$("#afk-btn").on("click", function() {
	socket.emit("chatMsg", {msg:'/afk'});
});

$("#plmode-btn").on("click", function() {
	var queuewrap = $queue.parent();
	if ($(this).hasClass('btn-warning')) {
		if ($("#navbar-collapsed").length < 1) $nav.show();
		$("footer, #navbar-collapsed, #motdrow, #announcements, #drinkbarwrap, #chatwrap").show();
		$("#leftcontrols > button, #leftcontrols > div, #leftpane-inner, #sitefooter").show();
		$("#resize-video-smaller, #resize-video-larger, #togglepl-btn").show();
		handleRank();
		$chatwrap.after(queuewrap.detach());
		!SYNCH ? $videowrap.before($chatwrap.detach()) : $videowrap.after($chatwrap.detach());
		if (SCROLLNAVBAR) scrollableNavbar();
		$("#mainpage").removeClass('plmode');
		queuewrap.removeClass().addClass('col-md-12 col-lg-12');
		scrollChatToTop();
	} else {
		$("nav, footer, #navbar-collapsed, #motdrow, #announcements, #drinkbarwrap, #chatwrap").hide();
		$("#leftcontrols > button, #leftcontrols > div, #leftpane-inner, #sitefooter").hide();
		$("#resize-video-smaller, #resize-video-larger, #clear-btn, #autoclear-btn, #togglepl-btn").hide();
		queuewrap.after($chatwrap.detach());
		!SYNCH ? $videowrap.before(queuewrap.detach()) : $videowrap.after(queuewrap.detach());
		if (SCROLLNAVBAR) fixedNavbar();
		$("#mainpage").addClass('plmode');
		var match = document.getElementById("rightpane").className.match(/col-md-(\d+)/);
		var classe1 = 12 - parseInt(match[1], 10);
		queuewrap.removeClass().addClass('col-md-' + classe1 + ' col-lg-' + classe1);
		window.scrollTo(0, 0);
	}
	$(this).toggleClass('btn-warning');
	if (SCROLLCHAT) scrollChat();
	scrollQueue();
});

$("#togglepl-btn").on("click", function() {
	if ($(this).hasClass('btn-warning')) {
		HIDDENVWRAP = false;
		$("#layout-4, #layout-7, #layout-8, #layout-9, #layout-10, #videowrap, #plr-4, #plmode-btn").show();
		$chatwrap.removeClass().addClass('col-lg-5 col-md-5');
		if (!$("#expand-chat").hasClass('label-success')) handleVideoResize();
		if (PLAYER) PLAYER.setVolume(CURRENTVOL);
		var match = document.getElementById("leftcontrols").className.match(/col-md-(\d+)/);
		var classe = parseInt(match[1], 10);
		$chatwrap.removeClass().addClass('col-md-' + classe + ' col-lg-' + classe);
	} else {
		HIDDENVWRAP = true;
		$("#layout-4, #layout-7, #layout-8, #layout-9, #layout-10, #videowrap, #plr-4, #plmode-btn").hide();
		$chatwrap.removeClass().addClass('col-lg-12 col-md-12');
		if (PLAYER) {
			PLAYER.getVolume(function(vol) {
				CURRENTVOL = vol;
			});
			PLAYER.setVolume(0);
		}
	}
	setTimeout(function() {volumeLvl()}, 500);
	$(this).toggleClass('btn-warning');
	if (SCROLLCHAT) scrollChat();
});

$("#quality-menu").find("a").on("click", function() {
	$("#quality-menu").find(".opt").removeClass('activated');
	$(this).addClass('activated');
	refreshPlayer();
	USEROPTS.default_quality = $(this).attr('val');
	var text = USEROPTS.default_quality;
	if (text == "best") text = 'highest';
	$("#quality-btn").html('<span class="glyphicon glyphicon-film"></span> ' + text + ' ');
});

$("#leader-btn").on("click", function() {
	if (CLIENT.leader) {
		socket.emit("assignLeader", {name:''});
		$(this).removeClass('btn-warning');
	} else {
		socket.emit("assignLeader", {name:CLIENT.name});
		$(this).addClass('btn-warning');
	}
});

$("#hideafk-btn").on("click", function() {
	$(this).hasClass('btn-warning') ? $userlist.removeClass('idleafk') : $userlist.addClass('idleafk');
	$(this).toggleClass('btn-warning');
});

$("#hidetstamps-btn").on("click", function() {
	if ($(this).hasClass('btn-warning')) {
		$messagebuffer.removeClass('notstamps');
		if (!USEROPTS.show_timestamps) {
			var str = 'Warning! You have disabled chat timestamps globally.\n'
				+ 'You can change it in your user preferences on the top navigation bar\n'
				+ '("Options" > "Chat").'
			alert(str);
		}
	} else {
		$messagebuffer.addClass('notstamps');
	}
	$(this).toggleClass('btn-warning');
});

$("#noautoscroll-btn").on("click", function() {
	if ($(this).hasClass('btn-warning')) {
		if (!HIDEINDICATOR) $chatwrap.removeClass('noindicator');
	} else {
		$chatwrap.addClass('noindicator');
	}
	$(this).toggleClass('btn-warning');
});

$("#public-btn").on("click", function() {
	$("#channel-list").remove();
	if ($(this).hasClass('btn-warning')) {
		$(this).removeClass('btn-warning');
	} else {
		$.get('/', function(data) {
			var html = $(data).find("table");
			if (html) {
				$('<div id="channel-list" />').appendTo("#advoptswrap > div").html(html)
				  .append('<div class="clearfix5" />');
			}
		});
		$(this).addClass('btn-warning');
	}
});

$("#utc").on("click", function() {
	if (!$(this).hasClass('timeleft')) {
		clearInterval(UTCCLOCK);
		TICKMODE = 'left';
		setOpt('SP_tickmode', TICKMODE);
		LEFTCLOCK = setInterval(function() {timeLeft()}, 1000);
		timeLeft();
	} else {
		clearInterval(LEFTCLOCK);
		TICKMODE = 'utc';
		setOpt('SP_tickmode', TICKMODE);
		UTCCLOCK = setInterval(function() {UTCTime()}, 1000);
		UTCTime();
	}
	$(this).toggleClass('timeleft');
});


// Notepad button events

$("#notepad-btn").on("click", function() {
	toggleElement($notepadwrap);
	$(this).toggleClass('btn-success');
});


// Chat sounds button events

$("#sounds-btn").on("click", function() {
	createModal('Chat Sounds Panel');

	var html = '<p class="text-danger">Use following commands to hear chat voice synthetizer (if unmuted):<br />'
		 + '<code>/speak</code> for english language, <code>/mow</code> for polish language.</p><br />'
	body.append(html);

	muteallbtn = $('<button id="muteall-btn" class="btn btn-primary btn-default">Mute all sounds</button>')
	  .appendTo(body)
	  .on("click", function() {
		if (MUTECHAT) {
			$(this).html('Mute all sounds').removeClass('btn-danger');
			$("#sounds-btn").removeClass('btn-danger').attr('title', 'Mute chat sounds');
		} else {
			$(this).html('Unmute all sounds').addClass('btn-danger');
			$("#sounds-btn").addClass('btn-danger').attr('title', 'Unmute chat sounds');
		}
		setOpt('SP_mutechat', MUTECHAT = !MUTECHAT);
	  });
	if (MUTECHAT) muteallbtn.html('Unmute all sounds').addClass('btn-danger');

	body.append('<br /><br /><strong>Chat sounds level:</strong><br /><br />');
	lvlgroup = $('<div id="lvlgroup" class="btn-group"></div>').appendTo(body);
	for (var i = 1; i <= 10; i++) {
		var btn = $('<button class="btn btn-primary btn-default" id="lvlvol' + i + '" level="' + i + '" />')
		  .addClass('btn-sm').html(i + '0%').appendTo(lvlgroup)
		  .on("click", function() {
			$("#lvlvol" + SOUNDSLVL).removeClass('btn-success');
			$(this).addClass('btn-success');
			setOpt('SP_soundslvl', SOUNDSLVL = $(this).attr('level'));
		  });
	}
	$("#lvlvol" + SOUNDSLVL).addClass('btn-success');

	body.append('<br /><br /><strong>Select users to mute:</strong><br /><br />');
	mutegroup = $('<div id="mutegroup" class="btn-group-vertical"></div>').appendTo(body);
	$(".userlist_item").each(function() {
		var user = $(this).find("span:nth-child(2)").html();
		var btn = $('<button class="btn btn-primary btn-default btn-sm" name="' + user + '" />')
		  .appendTo(mutegroup).html(user)
		  .on("click", function() {
			var name = $(this).attr('name');
			if (name in MUTEDVOICES && MUTEDVOICES[name] == "1") {
				$(this).removeClass('btn-danger');
				MUTEDVOICES[name] = 0;
			} else {
				$(this).addClass('btn-danger');
				MUTEDVOICES[name] = 1;
			}
	 	  });
		if (user in MUTEDVOICES && MUTEDVOICES[user] == "1") btn.addClass('btn-danger');
	});
});


// Chat functions dropdown menu events

$("#chat-f1").on("click", function() {
	showUserOptions();
	$("#useroptions .nav-tabs li:nth-child(3) a").trigger("click");
});

$("#chat-f2").on("click", function() {
	$("#chatpanel").remove();
	if (!$(this).hasClass('activated')) {
		if ($("#chat-f3").hasClass('activated')) $("#chat-f3").toggleClass('activated');
		if (!$chatheader.hasClass('darkened')) {
			$("#chatheader, #messagebuffer, #userlist").addClass('darkened');
		}
		if (!$chatwrap.hasClass('related')) $chatwrap.addClass('related');

		chatpanel = $('<div id="chatpanel" class="modal-content scrolled" />').appendTo("#chatwrap")
		  .on("mouseleave", function() {
			$chatline.focus();
			$("#emotes-container").hide();
			$("#chatheader, #messagebuffer, #userlist").removeClass('darkened');
		  })
		  .on("mouseenter", function() {
			$("#emotes-container").show();
			$("#chatheader, #messagebuffer, #userlist").addClass('darkened');
		  });
		cpheader = $('<div id="cpheader" />').appendTo(chatpanel);
		$('<button id="closechatpanel" class="btn btn-default pull-right" />').html('Close')
		  .appendTo(cpheader)
		  .on("click", function() {
			$chatline.focus();
			$("#chatpanel").remove();
			$("#chat-f2").removeClass('activated');
			$("#chatheader, #messagebuffer, #userlist").removeClass('darkened');
		  });
		var len = CHANNEL.emotes.length;
		paneltitle = $('<div id="paneltitle" />').html('This channel has <b>' + len + '</b> emote(s).')
		  .appendTo(cpheader);
		emotesbtngroup = $('<div id="emotespages" class="btn-group">').appendTo(cpheader);
		emotesgroup = $('<div id="emotesgroup" />').appendTo(chatpanel);

		if (len < 1) {
			emotesgroup.append('<span>No emotes available on this channel.</span>');
		} else if (len <= EMOTESPERPAGE) {
			var emotescontainer = $('<div id="emotes-container" />').appendTo(emotesgroup);
			for (i in CHANNEL.emotes) {
				$('<img onclick="insertText(\'' + CHANNEL.emotes[i].name + ' \')" />')
			 	  .attr({'src':CHANNEL.emotes[i].image, 'title':CHANNEL.emotes[i].name})
			  	  .appendTo(emotescontainer);
			}
		} else {
			var arr = [];
			var gr = Math.ceil(CHANNEL.emotes.length / EMOTESPERPAGE);
			var html = '';
			for (var i = 0; i < len; i++) {
				html += '<img src="' + CHANNEL.emotes[i].image + '" '
				     +    'onclick="insertText(\'' + CHANNEL.emotes[i].name + ' \')" '
				     +    'title="' + CHANNEL.emotes[i].name + '" />';
				if (i % EMOTESPERPAGE == EMOTESPERPAGE - 1) {
					arr.push(html);
					html = '';
				}
			}
			if (len % EMOTESPERPAGE != 0) arr.push(html);
			var emotesbtnwrap = $('<div id="emotesbtnwrap" />').appendTo(emotesgroup);
			for (var i = 0; i < gr; i++) {
				var btn = $('<button class="btn btn-sm btn-default emotesbtn" group="' + i + '" />')
				  .appendTo(emotesbtngroup).html(i + 1)
				  .on("click", function() {
					$(".emotesbtn").removeClass('active');
					$(this).addClass('active');
					emotescontainer.html(arr[$(this).attr('group')]);
			  	});
			}
			$("#emotespages button:nth-child(1)").addClass('active');
			var emotescontainer = $('<div id="emotes-container">' + arr[0] + '</div>')
			  .appendTo(emotesgroup);
		}
	} else {
		$("#chatheader, #messagebuffer, #userlist").removeClass('darkened');
		$chatwrap.removeClass('related');
	}
	$(this).toggleClass('activated');
});

$("#chat-f3").on("click", function() {
	$("#chatpanel").remove();
	if (!$(this).hasClass('activated')) {
		if ($("#chat-f2").hasClass('activated')) $("#chat-f2").toggleClass('activated');
		if (!$chatheader.hasClass('darkened')) {
			$("#chatheader, #messagebuffer, #userlist").addClass('darkened');
		}
		if (!$chatwrap.hasClass('related')) $chatwrap.addClass('related');

		chatpanel = $('<div id="chatpanel" class="modal-content scrolled" />').appendTo("#chatwrap")
		  .on("mouseleave", function() {
			$chatline.focus();
			$("#emotes-container").hide();
			$("#chatheader, #messagebuffer, #userlist").removeClass('darkened');
		  })
		  .on("mouseenter", function() {
			$("#emotes-container").show();
			$("#chatheader, #messagebuffer, #userlist").addClass('darkened');
		  });
		cpheader = $('<div id="cpheader" />').appendTo(chatpanel);
		$('<button id="closechatpanel" class="btn btn-default pull-right" />').html('Close')
		  .appendTo(cpheader)
		  .on("click", function() {
			$chatline.focus();
			$("#chatpanel").remove();
			$("#chat-f3").removeClass('activated');
			$("#chatheader, #messagebuffer, #userlist").removeClass('darkened');
		  });
		paneltitle = $('<div id="paneltitle" />').html('Unicode characters').appendTo(cpheader);
		emotesbtngroup = $('<div id="emotespages" class="btn-group">').appendTo(cpheader);
		for (i = 0; i < 2; i++) {
			var text = i == 0 ? 'Symbols' : 'Letters';
			var btn = $('<button class="btn btn-sm btn-default emotesbtn" group="' + i + '" />')
			  .appendTo(emotesbtngroup).html(text)
			  .on("click", function() {
				$(".emotesbtn").removeClass('active');
				$(this).addClass('active');
				$("#unicodeform").find("table").hide();
				$(this).attr('group') == 0 ? $("#symb-tbl").show() : $("#lett-tbl").show();
			  });
		}
		emotesgroup = $('<div id="emotesgroup" />').appendTo(chatpanel);
		emotesbtnwrap = $('<div id="emotesbtnwrap" />').appendTo(emotesgroup);
		emotescontainer = $('<div id="emotes-container" />').appendTo(emotesgroup);
		unicodeform = $('<div id="unicodeform" />').appendTo(emotescontainer);

		var len = UnicodeSymbolsArray.length;
		var html = '<table id="symb-tbl"><tr>';
		for (var i = 0; i < len; i++) {
			if (UnicodeSymbolsArray[i] != "|") {
				html += '<td onclick="insertText(\'' + UnicodeSymbolsArray[i] + '\')">'
				     + UnicodeSymbolsArray[i] + '</td>';
			} else {
				html += '</tr><tr>';
			}
		}
		html += '</table><table id="lett-tbl"><tr>';
		var len = UnicodeLettersArray.length;
		for (var i = 0; i < len; i++) {
			if (UnicodeLettersArray[i] != "|") {
				html += '<td onclick="insertText(\'' + UnicodeLettersArray[i] + '\')">'
				     + UnicodeLettersArray[i] + '</td>';
			} else {
				html += '</tr><tr>';
			}
		}
		html += '</table>';
		unicodeform.html(html);
		$("#emotespages button:nth-child(1)").addClass('active');
		$("#lett-tbl").hide();
	} else {
		$("#chatheader, #messagebuffer, #userlist").removeClass('darkened');
		$chatwrap.removeClass('related');
	}
	$(this).toggleClass('activated');
});

$("#chat-f4").on("click", function() {
	createModal('Premium Commands List');

	group = $('<div class="group-modal btn-group" />').appendTo(body);
	content1 = $('<div id="_c1" class="gdiv" />').appendTo(body);
	content2 = $('<div id="_c2" class="gdiv" />').appendTo(body);
	content3 = $('<div id="_c3" class="gdiv" />').appendTo(body);
	content4 = $('<div id="_c4" class="gdiv" />').appendTo(body);
	btn1 = $('<button id="_b1" class="btn btn-sm btn-default gbtn">Functions</button>').appendTo(group)
	  .on("click", function() {
		switchModalTabs($(this), content1, "commands", 1);
	  });
	btn2 = $('<button id="_b2" class="btn btn-sm btn-default gbtn">Text effects</button>').appendTo(group)
	  .on("click", function() {
		switchModalTabs($(this), content2, "commands", 2);
	  });
	btn3 = $('<button id="_b3" class="btn btn-sm btn-default gbtn">Shorthands</button>').appendTo(group)
	  .on("click", function() {
		switchModalTabs($(this), content3, "commands", 3);
	  });
	btn4 = $('<button id="_b4" class="btn btn-sm btn-default gbtn">Keyboard</button>').appendTo(group)
	  .on("click", function() {
		switchModalTabs($(this), content4, "commands", 4);
	  });

	$(".gdiv").hide();
	$("#_c" + VISIBLETAB["commands"]).show();
	$("#_b" + VISIBLETAB["commands"]).addClass('btn-success');

	var html = '';
	if (CHANNEL.opts.chat_antiflood && CHANNEL.opts.chat_antiflood_params.burst < 2) {
		html += '<p class="text-danger">Warning! Non-playlist commands cannot be executed on this channel - '
		     +  'chat antiflood is enabled. "# of messages allowed before throttling" option in '
		     +  'Chat Settings must be above 1 to run those commands. Ask channel administrator.</p><br />';
	}
	html += '<table class="commands-tbl">'
	     +    '<tr><td><code>!pick</code></td><td>choose a random option from a list separated by commas<br />'
	     +    '(e.g. <i>!pick japan,korea,china</i>)</td></tr>'
	     +    '<tr><td><code>!ask</code></td><td>ask yes-no type question<br />'
	     +    '(e.g. <i>!ask Am I stupid?</i>)</td></tr>'
	     +    '<tr><td><code>!dice</code></td><td>roll a dice</td></tr>'
	     +    '<tr><td><code>!roll</code></td><td>roll a 6-digit number</td></tr>'
	     +    '<tr><td><code>!time</code></td><td>display current local time</td></tr>'
	     +    '<tr><td><code>!now</code></td><td>display current media title</td></tr>'
	     +    '<tr><td><code>!stat</code></td><td>display current session user chat statistics</td></tr>'
	     +    '<tr><td><code>!calc</code></td><td>do a math operation<br />'
	     +    '(all JavaScript math functions and constants allowed, e.g. <i>!calc sin(PI / 2)</i>)</td></tr>'
	     +    '<tr><td></td><td><br /><b>Playlist commands</b> (for users with permissions):<br /><br />'
	     +    '</td></tr><tr><td><code>!add</code></td><td>add a link to the end of playlist<br />'
	     +    '(e.g. <i>!add https://www.youtube.com/watch?v=9bZkp7q19f0</i>)</td></tr>'
	     +    '<tr><td><code>!skip</code></td><td>voteskip current item</td></tr>'
	     +    '<tr><td><code>!next</code></td><td>play next item</td></tr>'
	     +    '<tr><td><code>!bump</code></td><td>bump last item on the playlist to next</td></tr>'
	     +    '<tr><td><code>!movernd</code></td><td>move random item to random position on the playlist</td></tr>'
	     +    '<tr><td><code>!drop</code></td><td>drop first item to the end of playlist</td></tr>'
	     +    '<tr><td><code>!deletelast</code></td><td>delete last item</td></tr></table>';
	content1.html(html);

	var html = '<table class="commands-tbl">'
		 +   '<tr><td></td><td><b>Default Synchtube chat text effects:</b><br /><br /></td></tr>'
		 +   '<tr><td><code>*</code> ...... <code>*</code></td><td>bold text</td></tr>'
		 +   '<tr><td><code>_</code> ...... <code>_</code></td><td>italic text</td></tr>'
		 +   '<tr><td><code>~~</code> ...... <code>~~</code></td><td>striked text</td></tr>'
		 +   '<tr><td></td><td><br /><b>Premium chat text effects:</b><br /><br /></td></tr>'
		 +   '<tr><td><code>:@</code> ...... <code>@:</code></td><td>underlined text</td></tr>'
		 +   '<tr><td><code>:@@</code> ...... <code>@@:</code></td><td>dots-underlined text</td></tr>'
		 +   '<tr><td><code>:!</code> ...... <code>!:</code></td><td>smaller text</td></tr>'
		 +   '<tr><td><code>:$</code> ...... <code>$:</code></td><td>small-caps text</td></tr>'
		 +   '<tr><td><code>:%</code> ...... <code>%:</code></td><td>letter-spaced text</td></tr>'
		 +   '<tr><td><code>:#</code> ...... <code>#:</code></td><td>monospaced text</td></tr>'
		 +   '<tr><td><code>:^</code> ...... <code>^:</code></td><td>stitched text</td></tr>'
		 +   '</tr></table>';
	content2.html(html);

	var html = 'Use chatline shortcuts instead of defined long texts or code sequences.<br /><br />'
		 + '<table id="sctbl" class="commands-tbl maxwidth"></table><br /><div class="centered">'
		 +   '<button id="saveshortcuts-btn" class="btn btn-primary">Save Changes</button></div>';
	content3.html(html);

	var arr = JSON.parse(SHORTHANDS)["codes"];
	for (var i = 0; i < 10 ; i++) {
		var html = '<td><code>//' + i + '</code></td><td>'
			 +   '<input id="shortcut' + i + '" class="form-control maxwidth" type="text" maxlength="240">'
			 + '</td>';
		$("<tr />").html(html).appendTo("#sctbl");
		$("#shortcut" + i).val(arr[i]);
	}

	$("#saveshortcuts-btn").on("click", function() {
		$(this).addClass('btn-success');
		var arr = [];
		for (var i = 0; i < 10 ; i++) {
			arr[i] = $("#shortcut" + i).val().replace(/"/g, '\\"');
		}
		setOpt('SP_shorthands', SHORTHANDS = '{"codes":["' + arr.join('","') + '"]}');
		setTimeout(function() {$("#saveshortcuts-btn").removeClass('btn-success')}, 500);
	});

	var html = '';
	var rows = [
		["1", "Theatre Mode"], ["2", "Radio Mode"], ["3", "Premium Options modal window"],
		["4", "Theme & User CSS modal window"], ["5", "Large Chat, No Player"], ["6", "Large Player, No Chat"],
		["7", "Toggle chat expanding"], ["8", "Hide/show playlist"], ["9", "Mute player"],
		["0", "Close Theatre/Radio Mode"], ["Q", "Volume level up"], ["A", "Volume level down"],
		["T", "Scroll chat panel to top"], ["N", "Toggle chat messages on player (NicoNico style)"],
		["I", "Toggle converting chat links to images"], ["F", "Add current item to your Premium favourites"],
	];
	for (i in rows) {
		html += '<tr><td><code>LeftAlt + ' + rows[i][0] + '</code></td><td>' + rows[i][1] + '</td></tr>';
	}
	content4.html('<table class="commands-tbl">' + html + '</table>');
});

$("#chat-f5").on("click", function() {
	createModal('My Messages List');
	ol = $('<ol class="olmodal" />').appendTo(body);
	var html = '';
	for (var i in CHATHIST) {
		html += '<li>' + CHATHIST[i] + '</li>';
	}
	ol.html(html);
});

$("#chat-f6").on("click", function() {
	ULISTRIGHT ? userlistLeft() : userlistRight();
	setOpt('SP_ulistright', ULISTRIGHT = !ULISTRIGHT);
});

$("#chat-f7").on("click", function() {
	$(this).toggleClass('activated');
	$userlist.toggleClass('bigp');
	setOpt('SP_bigprofiles', BIGPROFILES = !BIGPROFILES);
});

$("#chat-f8").on("click", function() {
	createModal('Custom Ping Sound');

	var html = '<form class="form-horizontal"><div class="form-group">'
		 +   '<label class="control-label col-sm-4">Execute</label>'
		 +   '<div class="col-sm-8 config-col"><label class="checkbox-inline">'
		 +     '<input id="custom-ping" type="checkbox"><span> Enable Custom Ping Sound</span></label>';
	if (USEROPTS.boop == "never") {
		html += '<br /><br /><p class="text-danger">Warning: notification sound on new messages is now '
		     +  'globally disabled. You can change it in your user preferences on the top navigation bar '
		     +  '("Options" > "Chat").</p>';
	}
	html += '</div></div><div class="form-group">'
	     +    '<label class="control-label col-sm-4">Sound file URL</label>'
	     +    '<div class="col-sm-8 config-col">'
	     +      '<input id="custom-ping-file" class="form-control" type="text" /><br />'
	     +      '<p class="text-info">Recommended using *.ogg or *.wav files. *.mp3 files may be sometimes '
	     +      'not audible in some browsers.</p></div>'
	     +  '</div><div class="form-group">'
	     +    '<label class="control-label col-sm-4">Ping Volume</label>'
	     +    '<div class="col-sm-8 config-col"><div class="btn-group">'
	     +      '<button id="ping-down" class="btn btn-sm btn-default" title="Ping volume down" type="button">'
	     +        '<span class="glyphicon glyphicon-minus"></span></button>'
	     +      '<button id="ping-mute" class="btn btn-sm btn-default" title="Mute ping sound" type="button">'
	     +        '<span class="glyphicon glyphicon-refresh"></span> volume level: '
	     +        '<span id="ping-volume-level">100</span>%</button>'
	     +      '<button id="ping-up" class="btn btn-sm btn-default" title="Ping volume up" type="button">'
	     +        '<span class="glyphicon glyphicon-plus"></span></button></div></div>'
	     +  '</div><div class="form-group">'
	     +    '<label class="control-label col-sm-4">Play ping file</label>'
	     +    '<div class="col-sm-8 config-col">'
	     +      '<button id="ping-play" class="btn btn-sm btn-default" title="Play ping file" type="button">'
	     +        '<span class="glyphicon glyphicon-play"></span></button></div></div></form>';
	body.html(html);

	$('<button class="btn btn-primary">Save Changes</button>').prependTo(footer)
	  .on("click", function() {
		CUSTOMPING = $("#custom-ping").prop('checked');
		CUSTOMPINGFILE = $("#custom-ping-file").val();
		CHATSOUND = new Audio((CUSTOMPING && CUSTOMPINGFILE != "") ? CUSTOMPINGFILE : '/boop.wav');
		CHATSOUND.volume = CUSTOMPINGLVL;
		$("#chat-f8").removeClass('activated');
		if (CUSTOMPING && CUSTOMPINGFILE != "") $("#chat-f8").addClass('activated');
		setOpt('SP_customping', CUSTOMPING);
		setOpt('SP_custompingfile', CUSTOMPINGFILE);
		setOpt('SP_custompinglvl', CUSTOMPINGLVL);
		outer.modal('hide');
	  });

	$("#ping-down").on("click", function() {
		CUSTOMPINGLVL = Math.ceil(Math.round((CUSTOMPINGLVL - 0.05) * 100) / 5) * 0.05;
		if (CUSTOMPINGLVL <= 0) {
			CUSTOMPINGLVL = 0;
			$("#ping-mute").attr('title', 'Unmute ping sound').addClass('btn-danger');
		}
		CHATSOUND.volume = CUSTOMPINGLVL;
		document.getElementById("ping-volume-level").innerHTML = Math.round(CUSTOMPINGLVL * 100);
	});
	$("#ping-mute").on("click", function() {
		if (!$(this).hasClass('btn-danger')) {
			CUSTOMPINGLVL = 0;
			CHATSOUND.volume = 0;
			$("#ping-down").addClass('disabled');
			$(this).attr('title', 'Unmute ping sound');
		} else {
			CUSTOMPINGLVL = getOrDefault('SP_custompinglvl', 1);
			CHATSOUND.volume = CUSTOMPINGLVL;
			$("#ping-down").removeClass('disabled');
			$(this).attr('title', 'Mute ping sound');
		}
		$(this).toggleClass('btn-danger');
		document.getElementById("ping-volume-level").innerHTML = Math.round(CUSTOMPINGLVL * 100);
	});
	$("#ping-up").on("click", function() {
		CUSTOMPINGLVL = Math.floor(Math.round((CUSTOMPINGLVL + 0.05) * 100) / 5) * 0.05;
		if (CUSTOMPINGLVL > 1) CUSTOMPINGLVL = 1;
		CHATSOUND.volume = CUSTOMPINGLVL;
		$("#ping-down").removeClass('disabled');
		$("#ping-mute").attr('title', 'Mute ping sound').removeClass('btn-danger');
		document.getElementById("ping-volume-level").innerHTML = Math.round(CUSTOMPINGLVL * 100);
	});
	$("#ping-play").on("click", function() {
		CHATSOUND.play();
	});

	if (CUSTOMPING) $("#custom-ping").prop('checked', true);
	$("#custom-ping-file").val(CUSTOMPINGFILE);
	document.getElementById("ping-volume-level").innerHTML = Math.round(CUSTOMPINGLVL * 100);
	if (CUSTOMPINGLVL == 0) $("#ping-mute").addClass('btn-danger');
});

$("#chat-f9").on("click", function() {
	if (confirm('Do you really want to clear current content of your chat window?')) {
		$messagebuffer.html('');
		SCROLLCHAT = true;
	}
});


// Chat options dropdown menu click events

$("#chat-1").on("click", function() {
	$(this).toggleClass('activated');
	if (SHOWIMAGES) {
		$messagebuffer.find(ImageExtensions).each(function() {
  			$(this).html(this.href);
		});
		if (SHOWOEKAKI) showOekakiOnChat($messagebuffer);
		$("#oekaki-checkbox").show();
	} else {
		showImagesOnChat($messagebuffer);
		$("#oekaki-checkbox").hide();
	}
	setOpt('SP_showimages', SHOWIMAGES = !SHOWIMAGES);
	if (SCROLLCHAT) scrollChat();
});

$("#chat-2").on("click", function() {
	$(this).toggleClass('activated');
	if (SHOWVIDEOS) {
		$messagebuffer.find(MediaExtensions).each(function() {
  			$(this).html(this.href);
		});
	} else {
		showVideosOnChat($messagebuffer);
	}
	setOpt('SP_showvideos', SHOWVIDEOS = !SHOWVIDEOS);
	if (SCROLLCHAT) scrollChat();
});

$("#chat-3").on("click", function() {
	if ($(this).hasClass('activated')) {
		$("#userlist, #messagebuffer, #chatline").removeClass('matrix');
		CHATSTYLE = '';
	} else {
		$("#userlist, #messagebuffer, #chatline").addClass('matrix');
		CHATSTYLE = 'matrix';
	}
	$(this).toggleClass('activated');
	setOpt('SP_chatstyle', CHATSTYLE);
	if (SCROLLCHAT) scrollChat();
});

$("#chat-4").on("click", function() {
	if ($(this).hasClass('activated')) {
		$("#userlist, #messagebuffer, #chatline, .pm-buffer, .pm-input").removeClass('whitebg');
		CHATBG = '';
	} else {
		$("#userlist, #messagebuffer, #chatline, .pm-buffer, .pm-input").addClass('whitebg');	
		CHATBG = 'white';
	}
	$(this).toggleClass('activated');
	setOpt('SP_chatbg', CHATBG);
});

$("#chat-5").on("click", function() {
	if ($(this).hasClass('activated')) {
		$messagebuffer.removeClass('lines');
		MSGSEPARATOR = '';
	} else {
		$messagebuffer.addClass('lines').removeClass('bubbles');
		$("#chat-6").removeClass('activated');
		MSGSEPARATOR = 'lines';
		if (SCROLLCHAT) scrollChat();
	}
	$(this).toggleClass('activated');
	setOpt('SP_msgseparator', MSGSEPARATOR);
});

$("#chat-6").on("click", function() {
	if ($(this).hasClass('activated')) {
		$messagebuffer.removeClass('bubbles');
		MSGSEPARATOR = '';
	} else {
		$messagebuffer.addClass('bubbles').removeClass('lines');
		$("#chat-5").removeClass('activated');
		MSGSEPARATOR = 'bubbles';
		if (SCROLLCHAT) scrollChat();
	}
	$(this).toggleClass('activated');
	setOpt('SP_msgseparator', MSGSEPARATOR);
});

$("#chat-7").on("click", function() {
	$messagebuffer.toggleClass('noavatars');
	$(this).toggleClass('activated');
	setOpt('SP_ignoreavatars', IGNOREAVATARS = !IGNOREAVATARS);
	if (SCROLLCHAT) scrollChat();
});

$("#chat-8").on("click", function() {
	$messagebuffer.toggleClass('ignoreserver');
	$(this).toggleClass('activated');
	setOpt('SP_ignoreserver', IGNORESERVER = !IGNORESERVER);
	if (SCROLLCHAT) scrollChat();
});


$("#chat-9").on("click", function() {
	if (!$(this).hasClass('activated')) {
		if (IGNORECHATMODE != 1) $messagebuffer.addClass('noeffects');
		if (IGNORECHATMODE != 2) $messagebuffer.addClass('nocolors');
	} else {
		$messagebuffer.removeClass('nocolors noeffects');
	}
	$(this).toggleClass('activated');
	setOpt('SP_ignorecolors', IGNORECOLORS = !IGNORECOLORS);
	if (SCROLLCHAT) scrollChat();
});

$("#chat-10").on("click", function() {
	if (USEROPTS.no_emotes) {
		var str = 'Warning! You have disabled chat emotes globally.\n'
			+ 'You can change it in your user preferences on the top navigation bar\n'
			+ '("Options" > "Chat").'
		alert(str);
		return;
	}
	if (IGNOREEMOTES) {
		$messagebuffer.find("span.span-emote").each(function() {
			var title = $(this).html();
			var img = $('<img class="channel-emote" />').insertBefore($(this))
			  .attr({src:$(this).attr('link'), title:title})
			  .on("click", function() {
				insertText(title + ' ');
			  }).load(function() {
				if (SCROLLCHAT) scrollChat();
			  });
			$(this).remove();
		});
	} else {
		hideEmotes($messagebuffer);
	}
	$messagebuffer.toggleClass('noemotes');
	$(this).toggleClass('activated');
	setOpt('SP_ignoreemotes', IGNOREEMOTES = !IGNOREEMOTES);
	if (SCROLLCHAT) scrollChat();
});

$("#chat-11").on("click", function() {
	CHATFONTSIZE *= 0.95;
	document.getElementById("chat-font-size").innerHTML = Math.round(CHATFONTSIZE);
	$messagebuffer.css('font-size', CHATFONTSIZE + '%');
	setOpt('SP_chatfontsize', CHATFONTSIZE);
});

$("#chat-12").on("click", function() {
	CHATFONTSIZE = 100;
	document.getElementById("chat-font-size").innerHTML = '100';
	$messagebuffer.css('font-size', '100%');
	setOpt('SP_chatfontsize', 100);
	if (SCROLLCHAT) scrollChat();
});

$("#chat-13").on("click", function() {
	CHATFONTSIZE /= 0.95;
	document.getElementById("chat-font-size").innerHTML = Math.round(CHATFONTSIZE);
	$messagebuffer.css('font-size', CHATFONTSIZE + '%');
	setOpt('SP_chatfontsize', CHATFONTSIZE);
	if (SCROLLCHAT) scrollChat();
});


// Playlist labels events

$("#scroll-to-current").on("click", function() {
	if (EXPANDPL) {
		var pos = $(".queue_active").offset().top;
		var mp = $("#mainpage").css('padding-top').replace('px', '') * 1;
		if (!SCROLLNAVBAR) mp -= 8;
		window.scrollTo(0, pos - mp);
	} else {
		scrollQueue();
	}
	$(this).addClass('label-success');
	setTimeout(function() {$("#scroll-to-current").removeClass('label-success')}, 1000);
});

$("#expand-playlist").on("click", function() {
	$(this).attr('title', EXPANDPL ? 'Expand playlist' : 'Collapse playlist').toggleClass('label-success');
	$queue.toggleClass('expanded');
	setOpt('SP_expandpl', EXPANDPL = !EXPANDPL);
	scrollQueue();
});

$("#hide-playlist").on("click", function() {
	toggleElement("#queue");
	$(this).attr('title', HIDEPLS ? 'Hide playlist' : 'Show playlist').toggleClass('label-danger');
	setOpt('SP_hidepls', HIDEPLS = !HIDEPLS);
	scrollQueue();
});


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/* ---------- [REGION 5] ORIGINAL SYNCHTUBE API EXTENSION ---------- */

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// Improved implementation of emotes tab completion
// Expanded functions from default Synchtube "tabcomplete.js" and "util.js" files

CyTube.tabCompleteMethods['Longest unique match'] = function(input, position, options, context) {
	var lower = input.toLowerCase();
	var start;
	var incomplete = '';
	for (start = position - 1; start >= 0; start--) {
		if (/\s/.test(lower[start])) break;
		incomplete = lower[start] + incomplete;
	}
	start++;

	if (!incomplete.length) {
		return {
			text:input, emote:'', newPosition:position
		};
    	}

	var matches = options.filter(function (option) {
		return option.toLowerCase().indexOf(incomplete) === 0;
	});

	var completed;
	var isFullMatch = false;
	if (matches.length === 0) {
		return {
			text:input, emote:'', newPosition:position
		};
	} else if (matches.length === 1) {
		completed = matches[0];
		isFullMatch = true;
	} else {
		var currentPrefix = null;
		for (var i = 0; i < matches.length - 1; i++) {
			var first = matches[i];
			var second = matches[i+1];
			var nextPrefix = '';
			for (var j = 0; (currentPrefix === null || j < currentPrefix.length)
			  && j < first.length && j < second.length; j++) {
				if (first[j].toLowerCase() === second[j].toLowerCase()) {
					nextPrefix += first[j];
				} else {
					break;
				}
			}
			if (currentPrefix === null || nextPrefix.length < currentPrefix.length) {
				currentPrefix = nextPrefix;
			}
		}
		completed = currentPrefix;
	}

	var space = isFullMatch ? ' ' : '';
	return {
		text:input.substring(0, start) + completed + space + input.substring(position),
		emote:completed, newPosition:start + completed.length + space.length
	};
};

CyTube.tabCompleteMethods['Cycle options'] = function(input, position, options, context) {
	if (typeof context.start !== 'undefined') {
		var currentCompletion = input.substring(context.start, position - 1);
		if (currentCompletion === context.matches[context.tabIndex]) {
			context.tabIndex = (context.tabIndex + 1) % context.matches.length;
			var completed = context.matches[context.tabIndex];
			return {
				text:input.substring(0, context.start) + completed + ' ' + input.substring(position),
				emote:completed,
				newPosition:context.start + completed.length + 1
			};
		} else {
			delete context.matches;
			delete context.tabIndex;
			delete context.start;
		}
	}

	var lower = input.toLowerCase();
	var start;
	var incomplete = '';
	for (start = position - 1; start >= 0; start--) {
		if (/\s/.test(lower[start])) break;
		incomplete = lower[start] + incomplete;
	}
	start++;

	if (!incomplete.length) {
		return {
			text:input, emote:'', newPosition:position
		};
	}

	var matches = options.filter(function (option) {
		return option.toLowerCase().indexOf(incomplete) === 0;
	}).sort(function (a, b) {
		return a.toLowerCase() > b.toLowerCase();
	});

	if (matches.length === 0) {
		return {
			text:input, emote:'', newPosition:position
		};
	}

	context.start = start;
	context.matches = matches;
	context.tabIndex = 0;
	return {
		text:input.substring(0, start) + matches[0] + ' ' + input.substring(position),
		emote: matches[0], newPosition: start + matches[0].length + 1
	};
};

function chatTabComplete() {
	var chatline = document.getElementById("chatline");
	var currentText = chatline.value;
	var currentPosition = chatline.selectionEnd;
	if (typeof currentPosition !== 'number' || !chatline.setSelectionRange) return;
	var firstWord = !/\s/.test(currentText.trim());
	var options = [];
	var userlistElems = document.getElementById("userlist").children;
	for (var i = 0; i < userlistElems.length; i++) {
		var username = userlistElems[i].children[1].textContent;
		if (firstWord) username += ':';
		options.push(username);
	}

	CHANNEL.emotes.forEach(function (emote) {
		options.push(emote.name);
	});

	var method = USEROPTS.chat_tab_method;
	var result = CyTube.tabCompleteMethods[method](
		currentText, currentPosition, options, CyTube.chatTabCompleteData.context
	);

	chatline.value = result.text;
	if (result.emote != "") {
		var url = '';
		for (var i in CHANNEL.emotes) {
			if (CHANNEL.emotes[i]["name"] == result.emote) {
				url = CHANNEL.emotes[i]["image"];
				break;
			}
		}
		if (url != "") {
			$("#emote-view").remove();
			var eview = $('<div id="emote-view" title="Click to close" />').appendTo($chatwrap)
			  .addClass(EMOTESPREVPOS).append('<img src="' + url + '" />')
			  .on("click", function() {
				$(this).remove();
				$chatline.focus();
			  });
		} else {
			$("#emote-view").remove();
		}
	} else {
		$("#emote-view").remove();
	}
	chatline.setSelectionRange(result.newPosition, result.newPosition);
}


// Format chat message adaptation
// Expanded function from default Synchtube "util.js" file

function formatChatMessage(data, last) {
	if (!data.meta || data.msgclass) {
		data.meta = {addClass:data.msgclass, addClassToNameAndTimestamp:data.msgclass};
	}
	var skip = data.username === last.name;
	if (CHATUSERNAME) skip = false;
	if (data.meta.addClass === "server-whisper") skip = true;
	if (data.msg.match(/^\s*<strong>\w+\s*:\s*<\/strong>\s*/)) skip = false;
	if (data.meta.forceShowName) skip = false;

	data.msg = stripImages(data.msg);
	data.msg = execEmotes(data.msg);

	last.name = data.username;
	var div = $('<div />');
	if (data.meta.addClass === "drink") {
		div.addClass('drink');
		data.meta.addClass = '';
	}

	if (USEROPTS.show_timestamps) {
		var time = $("<span/>").addClass("timestamp").appendTo(div);
		var timestamp = new Date(data.time).toTimeString().split(' ')[0];
		time.text('[' + timestamp + '] ');
		if (data.meta.addClass && data.meta.addClassToNameAndTimestamp) time.addClass(data.meta.addClass);
	}

	var name = $('<span />');
	if (!skip) name.appendTo(div);
	$("<strong/>").addClass('username').text(data.username + USERNAMEMARK + ' ').appendTo(name);
	if (data.meta.modflair) name.addClass(getNameColor(data.meta.modflair));
	if (data.meta.addClass && data.meta.addClassToNameAndTimestamp) name.addClass(data.meta.addClass);
	if (data.meta.superadminflair) {
		name.addClass("label").addClass(data.meta.superadminflair.labelclass);
		$('<span class="glyphicon" />').addClass(data.meta.superadminflair.icon).prependTo(name)
		  .css("margin-right", "3px");
	}

	if (EXECFILTERS) {
		var arr = CUSTOMFILTERS.split("\n");
		for (i in arr) {
			if (arr[i] != "") {
				var fil = arr[i].split(" > ");
				if (fil[0] != "") data.msg = data.msg.replace(RegExp(fil[0].trim(), "g"), fil[1]);
			}
		}
	}

	if (data.meta.action) {
		name.remove();
		data.msg = data.username + ' ' + data.msg;
	}
	data.msg = execTextEffects(data.msg);

	if (CHATSOUNDS && !MUTECHAT && (!(data.username in MUTEDVOICES) || MUTEDVOICES[data.username] == "0")) {
		for (i in SoundFiltersArray) {
			if (data.msg.indexOf(i) > -1) {
				var aud = new Audio(SoundFiltersArray[i]);
				aud.volume = SOUNDSLVL / 10;
				aud.play();
				$("#sounds-btn").addClass('btn-success');
				setTimeout(function() {$("#sounds-btn").removeClass('btn-success')}, 1000);
			}	
		}
	}
	if (data.msg.indexOf('/mow ') == 0) {
		if (CHATSOUNDS && !MUTECHAT && (!(data.username in MUTEDVOICES) || MUTEDVOICES[data.username] == "0")) {
			var str = data.msg.split('/mow ');
			var aud = new Audio(SPEAKLINK + '?lang=polish&text=' + encodeURI(str[1]));
			aud.volume = SOUNDSLVL / 10;
			aud.play();
			$("#sounds-btn").addClass('btn-success');
			setTimeout(function() {$("#sounds-btn").removeClass('btn-success')}, 1000);
		}
		data.msg = data.msg.replace('/mow ', '');
	} else if (data.msg.indexOf('/speak ') == 0) {
		if (CHATSOUNDS && !MUTECHAT && (!(data.username in MUTEDVOICES) || MUTEDVOICES[data.username] == "0")) {
			var str = data.msg.split('/speak ');
			var aud = new Audio(SPEAKLINK + '?lang=english&text=' + encodeURI(str[1]));
			aud.volume = SOUNDSLVL / 10;
			aud.play();
			$("#sounds-btn").addClass('btn-success');
			setTimeout(function() {$("#sounds-btn").removeClass('btn-success')}, 1000);
		}
		data.msg = data.msg.replace('/speak ', '');
	}

	var message = $('<span />').appendTo(div);
	message[0].innerHTML = data.msg;

	if (data.meta.addClass) message.addClass(data.meta.addClass);
	if (data.meta.shadow) div.addClass("chat-shadow");
	if (data.msg.indexOf('● ') == 0) message.addClass("action scriptanswer");

	if (SHOWIMAGES) {
		showImagesOnChat(message);
	} else if (SHOWOEKAKI) {
		showOekakiOnChat(message);
	}
	if (SHOWVIDEOS) showVideosOnChat(message);
	IGNOREEMOTES ? hideEmotes(message) : enhanceEmotes(message);

	if (PLAYERTEXT && !NOPLAYER && !HIDDENVWRAP) {
		if (!data.meta['addClass']) data.meta['addClass'] = '';
		playerText(message[0].innerHTML, data.meta.addClass);
	}

	CHATMSGNUM++;
	if (TABMODE == 1) pageTitle();
	return div;
}


// Chat commands answers

function prepareMessage(msg) {
	if (msg.indexOf('!') == 0) {
		COMMAND = true;
		if (msg.indexOf('!pick ') == 0) {

			var arr = msg.split('!pick ')[1].split(',');
			msg = arr[Math.round(Math.random() * (arr.length - 1))];

		} else if (msg.indexOf('!ask ') == 0) {

			msg = AnswersArray[Math.round(Math.random() * (AnswersArray.length - 1))];

		} else if (msg.indexOf('!dice') == 0) {

			checkCommandsAbuse();
			if (COMMAND) msg = Math.floor(Math.random() * 6) + 1;

		} else if (msg.indexOf('!roll') == 0) {

			checkCommandsAbuse();
			if (COMMAND) {
				var str = '';
				for (i = 0; i < 6; i++) {
					str += Math.floor(Math.random() * 10);
				}
				msg = str;
			}

		} else if (msg.indexOf('!time') == 0) {

			var h = new Date().getHours();
			if (h < 10) h = '0' + h;
			var m = new Date().getMinutes();
			if (m < 10) m = '0' + m;
			msg = 'Current local time: ' + h + ':' + m;

		} else if (msg.indexOf('!now') == 0) {

			var len = $queue.find(".queue_entry").length;
			var title = len > 0 ? $(".queue_active").data("media").title : 'nothing playing';
			msg = NowPlaying + ': ' + title;

		} else if (msg.indexOf('!stat') == 0) {

			var num = CHATHIST.length;
			var len = 0, rnd = 0, avg = 0;
			for (var i in CHATHIST) {
				len += CHATHIST[i].length;
			}
			var h = Math.floor(ONLINETIME / 60);
			var m = ONLINETIME - h * 60;
			if (m < 10) m = '0' + m;
			msg = 'online: ' + h + 'h:' + m + 'm, messages: ' + num + ', '
				+ 'characters: ' + len;
			if (num > 0) {
				var rnd = Math.round(Math.random() * (CHATHIST.length - 1));
				var avg = Math.round(len / num * 10) / 10;
				msg += ' (' + avg + ' per message), ' + 'random message: ' + CHATHIST[rnd];
			}

		} else if (msg.indexOf('!calc ') == 0) {

			try {
			  var regex = /(?:[a-z$_][a-z0-9$_]*)|(?:[;={}\[\]"'!&<>^\\?:])/ig,
			  isLegit = true;
			  msg = msg.split('!calc ')[1].replace(regex, function(f) {
				if (Math.hasOwnProperty(f)) return 'Math.' + f;
        			else isLegit = false;
			  });
			  if (!isLegit) throw new Error('not a math formula');
			  msg = eval(msg);
			}
			catch(err) {
			  msg = 'Error: ' + err.message;
			}

		} else if (msg.indexOf('!add ') == 0) {

			if (hasPermission("playlistadd")) {
				var parsed = parseMediaLink(msg.split('!add ')[1]);
				if (parsed["id"] === null) {
					addServerMessage('Error: invalid link');
				} else {
					socket.emit("queue", {id:parsed["id"], pos:"end", type:parsed["type"]});
				}
			} else {
				addServerMessage('Warning! You have no permission to add links');
			}
			COMMAND = false;

		} else if (msg.indexOf('!skip') == 0) {

			if (hasPermission("voteskip")) {
				$("#voteskip").attr("disabled", true);
				socket.emit("voteskip");
				if ($queue.find(".queue_entry").length > 0) {
					addServerMessage('item voteskipped');
				} else {
					addServerMessage('Warning! Playlist is empty');
				}
			} else {
				addServerMessage('Warning! You have no permission to voteskip');
			}
			COMMAND = false;

		} else if (msg.indexOf('!next') == 0) {

			if (hasPermission("playlistjump")) {
				if ($queue.find(".queue_entry").length > 0) {
					socket.emit("playNext");
				} else {
					addServerMessage('Warning! Playlist is empty');
				}
			} else {
				addServerMessage('Warning! You have no permission to playing next item');
			}
			COMMAND = false;

		} else if (msg.indexOf('!bump') == 0) {

			if (hasPermission("playlistmove")) {
				if ($queue.find(".queue_entry").length > 0) {
					var last = $queue.children().length;
					var uid = $queue.find(".queue_entry:nth-child(" + last + ")").data("uid");
					socket.emit("moveMedia", {from:uid, after:PL_CURRENT});
					addServerMessage('last item bumped to next');
				} else {
					addServerMessage('Warning! Playlist is empty');
				}
			} else {
				addServerMessage('Warning! You have no permission to move playlist items');
			}
			COMMAND = false;

		} else if(msg.indexOf('!movernd') == 0) {

			if (hasPermission("playlistmove")) {
				var len = $queue.find(".queue_entry").length;
				if (len > 0) {
					var r1 = Math.floor(Math.random() * len) + 1;
					var r2 = Math.floor(Math.random() * len) + 1;
					var b = $queue.find(".queue_entry:nth-child(" + r1 + ")").data("uid");
					var a = $queue.find(".queue_entry:nth-child(" + r2 + ")").data("uid");
					socket.emit("moveMedia", {from:b, after:a});
					addServerMessage('random item moved to random position');
				} else {
					addServerMessage('Warning! Playlist is empty');
				}
			} else {
				addServerMessage('Warning! You have no permission to move playlist items');
			}
			COMMAND = false;

		} else if(msg.indexOf('!drop') == 0) {

			if (hasPermission("playlistmove")) {
				var len = $queue.find(".queue_entry").length;
				if (len > 0) {
					var b = $queue.find(".queue_entry:nth-child(1)").data("uid");
					var a = $queue.find(".queue_entry:nth-child(" + len + ")").data("uid");
					socket.emit("moveMedia", {from:b, after:a});
					addServerMessage('first item moved to the end of playlist');
				} else {
					addServerMessage('Warning! Playlist is empty');
				}
			} else {
				addServerMessage('Warning! You have no permission to move playlist items');
			}
			COMMAND = false;

		} else if(msg.indexOf('!deletelast') == 0) {

			if (hasPermission("playlistdelete")) {
				var len = $queue.find(".queue_entry").length;
				if (len > 0) {
					var a = $queue.find(".queue_entry:nth-child(" + len + ")").data("uid");
					socket.emit("delete", a);
					addServerMessage('last item deleted from playlist');
				} else {
					addServerMessage('Warning! Playlist is empty');
				}
			} else {
				addServerMessage('Warning! You have no permission to delete playlist items');
			}
			COMMAND = false;

		} else if (msg.indexOf('!fact') == 0 && FactsArray.length > 0) {

			checkCommandsAbuse();
			if (COMMAND) {
				if (typeof UsersArray === "undefined") UsersArray = [];
				$(".userlist_item span:nth-child(2)").each(function() {
					UsersArray.push($(this).html());
				});
				var a = Math.round(Math.random() * (UsersArray.length - 1));
				var b = Math.round(Math.random() * (FactsArray.length - 1));
				msg = UsersArray[a] + ' ' + FactsArray[b];
			}

		} else {
			COMMAND = false;
		}
	}
	return msg;
}


// Chat autoscroll adaptation
// Expanded function from default Synchtube "util.js" file

function scrollChat() {
	if ($("#noautoscroll-btn").hasClass('btn-warning')) {
		return;
	} else {
    		scrollAndIgnoreEvent($("#messagebuffer").prop("scrollHeight"));
   		$("#newmessages-indicator").remove();
	}
}


// Handle messages sending

function sendMessage() {
	if (CHATTHROTTLE) return;
	var msg = $chatline.val();
	var arr = JSON.parse(SHORTHANDS)["codes"];
	for (var i in arr) {
		if (arr[i] != "") msg = msg.replace(RegExp('//' + i, "g"), arr[i]);
	}
	var _msg = msg;
	if (msg.trim()) {
		msg = prepareMessage(msg.trim());
		if (COMMAND) {
			var meta = {};
			if (USEROPTS.adminhat && CLIENT.rank >= 255) {
				_msg = '/a ' + _msg;
			} else if (USEROPTS.modhat && CLIENT.rank >= Rank.Moderator) {
				meta.modflair = CLIENT.rank;
			}
			if (CLIENT.rank >= 2 && _msg.indexOf('/m ') === 0) {
				meta.modflair = CLIENT.rank;
				_msg = _msg.substring(3);
			}
			socket.emit("chatMsg", {msg:_msg, meta:meta});
			msg = '● ' + msg;
		}
		if (COMMAND && CHANNEL.opts.chat_antiflood && CHANNEL.opts.chat_antiflood_params.burst < 2) {
			var html = 'Warning! This command cannot be executed - chat antiflood option is enabled. '
				 + '"# of messages allowed before throttling" option in Chat Settings '
				 + 'must be above 1 to run this command. Ask channel administrator.'
			addServerMessage(html);
		} else {
			var meta = {};
			if (USEROPTS.adminhat && CLIENT.rank >= 255) {
				msg = '/a ' + msg;
			} else if (USEROPTS.modhat && CLIENT.rank >= Rank.Moderator) {
				meta.modflair = CLIENT.rank;
			}
			if (CLIENT.rank >= 2 && msg.indexOf('/m ') === 0) {
				meta.modflair = CLIENT.rank;
				msg = msg.substring(3);
			}
			socket.emit("chatMsg", {msg:msg, meta:meta});
		}
		COMMAND = false;
		$chatline.val('');
		$("#emote-view").remove();
		CHATHIST.push(_msg);
		CHATHISTIDX = CHATHIST.length;
	}
	return;
}


// Chatline and chat button events adaptation
// Expanded from default Synchtube "ui.js" file

$("#chatline, #chatbtn").unbind();

$chatline.on("keydown", function(ev) {
	if (ev.keyCode == 13) {
		sendMessage();
	} else if (ev.keyCode == 9) {
          try {
		chatTabComplete();
	  } catch (error) {
		console.error(error);
	  }
		ev.preventDefault();
		return false;
	} else if (ev.keyCode == 38) {
		if (CHATHISTIDX == CHATHIST.length) CHATHIST.push($chatline.val());
		if(CHATHISTIDX > 0) {
			CHATHISTIDX--;
			$chatline.val(CHATHIST[CHATHISTIDX]);
		}
		ev.preventDefault();
		return false;
	} else if (ev.keyCode == 40) {
		if (CHATHISTIDX < CHATHIST.length - 1) {
			CHATHISTIDX++;
			$chatline.val(CHATHIST[CHATHISTIDX]);
		}
		ev.preventDefault();
		return false;
	}
});

$("#chatbtn").on("click", function() {
	sendMessage();
});


// Resize video adaptation
// Expanded from default Synchtube "ui.js" file

$("#resize-video-larger").addClass('label label-default').unbind()
  .on("click", function() {
    try {
	CyTube.ui.changeVideoWidth(1);
	if ($("#expand-chat").hasClass('label-success')) expandChat();
    } catch (error) {
	console.error(error);
    }
});

$("#resize-video-smaller").addClass('label label-default').unbind()
  .on("click", function() {
    try {
	CyTube.ui.changeVideoWidth(-1);
	if ($("#expand-chat").hasClass('label-success')) expandChat();
    } catch (error) {
	console.error(error);
    }
});


// Remove chat message from player

$('#main').on('transitionend', '#player-chat-wrap .player-chat', function() {
	$(this).remove();
});


// Improved retrieve playlist links
// Expanded from default Synchtube "ui.js" file

$("#getplaylist").unbind()
  .on("click", function() {
	createModal('Playlist URLs');
	$(".modal-dialog-nonfluid").removeClass('modal-dialog-nonfluid non-fluid');
	var data = $('<textarea rows="10" class="form-control" />').val(formatRawList()).appendTo(body);

	var rlist = $('<button class="btn btn-default btn-success pull-left glinks">Raw Links</button>')
	  .appendTo(footer)
	  .on("click", function() {
		data.val(formatRawList());
		$(".glinks").removeClass('btn-success');
		$(this).addClass('btn-success');
	  });
	var tlist = $('<button class="btn btn-default pull-left glinks">Plain Text</button>').appendTo(footer)
	  .on("click", function() {
		var list = [];
		var i = 0;
		$queue.find("li").each(function() {
			i++;
			var item = $(this).data("media");
			list.push(i + '. ' + formatURL(item) + ' :: ' + item.title + ' [' + item.duration + ']');
		});
		data.val(list.join('\n'));
		$(".glinks").removeClass('btn-success');
		$(this).addClass('btn-success');
	  });
	var hlist = $('<button class="btn btn-default pull-left glinks">HTML Code</button>').appendTo(footer)
	  .on("click", function() {
		var list = [];
		$queue.find("li").each(function() {
			var item = $(this).data("media");
			var link = formatURL(item);
			var str = ' [' + item.duration + '] - <a href="' + link + '" target="_blank">'
				+ link + '</a>';
			list.push('<li>' + item.title + '' + str + '</li>');
		});
		data.val('<ol>\n' + list.join('\n') + '\n</ol>');
		$(".glinks").removeClass('btn-success');
		$(this).addClass('btn-success');
	  });
	var olist = $('<button class="btn btn-default pull-left glinks">Ordered List</button>').appendTo(footer)
	  .on("click", function() {
		var list = [];
		$queue.find("li").each(function() {
			var item = $(this).data("media");
			list.push(item.title + ' â—â— ' + formatURL(item) + ' â—â— [' + item.duration + ']');
			list.sort();
		});
		data.val(list.join('\n'));
		$(".glinks").removeClass('btn-success');
		$(this).addClass('btn-success');
	  });
	var dlist = $('<button class="btn btn-default pull-left glinks">Array Format</button>').appendTo(footer)
	  .on("click", function() {
		var list = [];
		$queue.find("li").each(function() {
			var item = $(this).data("media");
			var re1 = new RegExp('\\\\', 'g');
			var re2 = new RegExp('\'', 'g');
			var title = item.title.replace(re1, '\\\\').replace(re2, '\\\'');
			list.push('[\'' + formatURL(item) + '\', \'' + title + '\'],');
		});
		data.val(list.join('\n'));
		$(".glinks").removeClass('btn-success');
		$(this).addClass('btn-success');
	  });
});


// Keyboard shortcuts - LeftAlt + key

$(document).on('keydown', function(e) {
	if (e.altKey && !e.ctrlKey) {
		if (String.fromCharCode(e.which) === "1") {
			if ($("#close-btn").length > 0) document.getElementById("close-btn").click();
			document.getElementById("layout-9").click();
		} else if (String.fromCharCode(e.which) === "2") {
			if ($("#close-btn").length > 0) document.getElementById("close-btn").click();
			document.getElementById("layout-10").click();
		} else if (String.fromCharCode(e.which) === "3") {
			document.getElementById("layout-1").click();
		} else if (String.fromCharCode(e.which) === "4") {
			document.getElementById("layout-2").click();
		} else if (String.fromCharCode(e.which) === "5") {
			document.getElementById("layout-7").click();
		} else if (String.fromCharCode(e.which) === "6") {
			document.getElementById("layout-8").click();
		} else if (String.fromCharCode(e.which) === "7") {
			document.getElementById("expand-chat").click();
		} else if (String.fromCharCode(e.which) === "8") {
			document.getElementById("hide-playlist").click();
		} else if (String.fromCharCode(e.which) === "9") {
			document.getElementById("plr-11").click();
		} else if (String.fromCharCode(e.which) === "0") {
			document.getElementById("close-btn").click();
		} else if (String.fromCharCode(e.which) === "Q") {
			document.getElementById("plr-12").click();
		} else if (String.fromCharCode(e.which) === "A") {
			document.getElementById("plr-10").click();
		} else if (String.fromCharCode(e.which) === "T") {
			scrollChatToTop();
		} else if (String.fromCharCode(e.which) === "N") {
			document.getElementById("plrtext-btn").click();
		} else if (String.fromCharCode(e.which) === "I") {
			document.getElementById("chat-1").click();
		} else if (String.fromCharCode(e.which) === "F") {
			if (!$("#favs-btn").hasClass('btn-success')) {
				document.getElementById("favs-btn").click();
				document.getElementById("addtofav-btn").click();
			}
		} else if (String.fromCharCode(e.which) === "R") {
			var uname = CLIENT.name != "" ? CLIENT.name : 'Anonymous';
			createModal('Hello, ' + uname);
			var div = $('<div class="centered" />').appendTo(body);
			$('<button class="btn btn-default">Set random Premium theme</button>').appendTo(div)
			  .on("click", function() {
				$("#usertheme").attr('href', '/css/themes/slate.css');
				$("#usertheme2").remove();
				USERTHEME = ThemesArray[Math.floor(Math.random() * ThemesArray.length)][1];
				$('<link id="usertheme2" rel="stylesheet" type="text/css" />')
				  .insertAfter("#usertheme").attr('href', USERTHEME);
				outer.on("hidden.bs.modal", function() {
					outer.remove();
					handleVideoResize();
					setOpt('SP_usertheme', USERTHEME);
				});
			  });
		}
		e.preventDefault();
	}
});


// Not closing selected dropdown menus ('noclose' class) after clicking an option

$(document).on('click' + '.bs.dropdown.data-api', '.dropdown-menu.noclose > li', function (e) {
	e.stopPropagation();
})


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/* ---------- [REGION 6] IMGUR API ---------- */

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// API functions
// Adapted from Synchtube API, 2014 by JAlB

IMGUR_fileset = new Array();
IMGUR_load = new Array();
IMGUR_progress = new Array();

function API_IMGUR_fileset(f) {
	IMGUR_fileset[IMGUR_fileset.length] = f;
}

function API_IMGUR_load(f) {
	IMGUR_load[IMGUR_load.length] = f;
}

function API_IMGUR_progress(f) {
	IMGUR_progress[IMGUR_progress.length] = f;
}

function API_IMGUR_upload(file) {
	if (!file || !file.type.match(/image.*/)) return;
	var d = new FormData();
	d.append("image", file)
	d.append("key", "6528448c258cff474ca9701c5bab6927");
	var xhr = new XMLHttpRequest();
	xhr.open("POST", "https://api.imgur.com/3/image");
	xhr.setRequestHeader('Authorization', 'Client-ID ' + ImgurClientID);
	xhr.onload = function() {
		var len = IMGUR_load.length;
		var res = JSON.parse(xhr.responseText).data.link;
		for (var i = 0; i < len; i++) {
			IMGUR_load[i](res);
		}
	}
	xhr.onerror = function(){
		alert('An error occurred during upload: ' + xhr.status);
		imageli.show();
		$("#oeup").show();
		upalert.remove();
	};
	xhr.upload.onprogress = function(ev) {
		var len = IMGUR_progress.length;
		for (var i = 0; i < len; i++) {
			IMGUR_progress[i](ev);
		}
	};
	xhr.send(d);
}

function API_IMGUR_uploading(file) {
	if (file.type.match(/image.*/)) {
		var len = IMGUR_fileset.length;
		for (var i = 0; i < len; i++) {
			IMGUR_fileset[i]();
		}
		API_IMGUR_upload(file);
	} else {
		alert('Only image files are allowed.');
		imageli.show();
		$("#oeup").show();
		upalert.remove();
	}
}

API_IMGUR_load(function(res) {
	insertText(res + ' ');
	imageli.show();
	$("#oeup").show();
	upalert.remove();
});

API_IMGUR_fileset(function(){
	upalert.html('File uploading...');
});

API_IMGUR_progress(function(ev) {
	if (ev.lengthComputable) {
		var prog = Math.floor((ev.loaded / ev.total) * 100);
		upalert.html('File upload: ' + prog + '%');
		if (prog == 100) upalert.html('File uploaded,<br />wait for the link');
	}
});


// API HTML elements

imageli = $('<li id="chat-f10" class="opt"><a>Upload to Imgur</a></li>').appendTo("#chatfunc-menu")
  .on("click", function() {
	uploadinput.click();
  });

uploadwell = $('<div id="uploadwell" class="well">').appendTo("#leftpane-inner");

uploadinput = document.createElement("input");
uploadinput.id = "fileinput";
uploadinput.type = "file";
document.getElementById("uploadwell").appendChild(uploadinput);

uploadbtn = $('<button id="upload-btn" class="btn btn-sm btn-default">Upload image</button>').appendTo(uploadwell)
  .on("click", function() {
	uploadinput.click();
});


// Uploading files

uploadinput.onchange = function() {
	imageli.hide();
	$("#oeup").hide();
	upalert = $('<div id="upalert" class="profile-box text-center upalert">File upload: 0%</div>')
	  .appendTo("#chatwrap");
	var margin1 = ($chatwrap.height() - upalert.height()) / 2;
	var margin2 = ($chatwrap.width() - upalert.width()) / 2;
	upalert.css('top', margin1).css('left', margin2);
	API_IMGUR_uploading(this.files[0]);
}



////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/* ---------- [REGION 7] OEKAKI API ---------- */

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// API functions
// drawingboard.js v0.4.6 - https://github.com/Leimi/drawingboard.js

// Copyright (c) 2015 Emmanuel Pelletier [Licensed MIT]

OETSTAMP = 0;

function uploadOekaki(pic) {
	upalert = $('<div id="upalert" class="profile-box text-center upalert">Oekaki drawing upload...</div>')
	  .appendTo("#chatwrap");
	var margin1 = ($chatwrap.height() - upalert.height()) / 2;
	var margin2 = ($chatwrap.width() - upalert.width()) / 2;
	upalert.css('top', margin1).css('left', margin2);
	$("#oeup, #chat-f10").hide();

	$.ajax({url:'https://api.imgur.com/3/image',
		type:'post',
		headers:{Authorization:'Client-ID ' + ImgurClientID},
		data:{image:pic.replace(/^data:image\/[a-z]+;base64,/,''), type:'base64'},
		dataType:'json',
		success:function(json) {
			socket.emit("chatMsg", {msg:json.data.link + '?oekaki'});
			upalert.remove();
			$("#oeup, #chat-f10").show();
		},
		error:function(json) {
			alert('Error! Try again.');
			upalert.remove();
			$("#oeup, #chat-f10").show();
		}
	});
}

function oekaki() {
	$.getScript("https://dl.dropboxusercontent.com/s/sbuj4e1z3dh87z1/oekaki.js", function() {
		$("#spoekaki").html('');
		$('<link id="oekakicss" rel="stylesheet" type="text/css" />').appendTo("head")
		  .attr('href', 'https://dl.dropboxusercontent.com/s/syendmytcl4rgzt/oekaki.css');

		var spoekaki = new DrawingBoard.Board('spoekaki', {
			controls:['Color', 'DrawingMode', 'Size', 'Navigation'],
			webStorage:"local",
			droppable:true,
			controlsPosition:"bottom center"
		});
		DrawingBoard.Control.Upload = DrawingBoard.Control.extend({
			name:'Upload',
			initialize:function() {
				$('<button id="oeup" />').attr('title', 'Send to chat')
				  .html('Send <i class="glyphicon glyphicon-export"></i>')
				  .appendTo(this.$el);
				this.$el.on('click', '#oeup', $.proxy(function(e) {
					e.preventDefault();
					var time = (new Date()).getTime();
					if ((time - OETSTAMP) > 30000) {
						OETSTAMP = time;
						uploadOekaki(this.board.getImg());
					} else {
						alert('Warning! You can send 1 picture every 30 seconds.');
					}
				}, this));
			}
		});
		spoekaki.addControl('Upload');

		$("#spoekaki .drawing-board-controls")
		  .after('<div id="oekaki-checkbox" class="centered" />');
		var html = '<label class="checkbox-inline"><input id="show-oekaki" type="checkbox"><span> '
			 + 'Show drawings directly on chat</span></label>';
		$("#oekaki-checkbox").html(html);
		$("#show-oekaki").on("click", function() {
			if (SHOWOEKAKI) {
				$messagebuffer.find('a[href$="?oekaki"]').each(function() {
  					$(this).html(this.href);
				});
			} else {
				showOekakiOnChat($messagebuffer);
			}
			setOpt('SP_showoekaki', SHOWOEKAKI = !SHOWOEKAKI);
			if (SCROLLCHAT) scrollChat();
		});
		if (SHOWOEKAKI) $("#show-oekaki").prop('checked', true);
		if (SHOWIMAGES) $("#oekaki-checkbox").hide();
		OEKAKILOAD = true;
	});
}


// API HTML elements

$oekakiwrap = $('<div id="oekakiwrap" class="col-lg-12 col-md-12 wells leftareas" />')
  .insertBefore("#notepadwrap").append('<div id="oekaki-well" class="well form-horizontal" />').hide();
$('<div id="spoekaki" class="centered" />').appendTo("#oekaki-well").html('Loading drawing board...');
$('<button id="oekaki-btn" class="btn btn-sm btn-default btn-chatctrl" title="Oekaki - drawing board" />')
  .prependTo($chatcontrols).html('<span class="glyphicon glyphicon-picture"></span>')
  .on("click", function() {
	toggleElement($oekakiwrap);
	$(this).toggleClass('btn-success');
	if (!OEKAKILOAD) oekaki();
  });


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/* ---------- [REGION 8] CSS AND FINAL LAYOUT ---------- */

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// Add Synchtube Premium UI CSS

var css = '.bigtitle {\n'
	+ '  border-bottom-width:1px !important; border-bottom-left-radius:5px !important;\n'
	+ '  border-bottom-right-radius:5px !important; padding:5px; font-size:120%; text-align:center;\n'
	+ '}\n'
	+ '.btn-chatctrl {margin-right:0px !important}\n'
	+ '.btn-colors {margin-left:0px !important}\n'
	+ '.btngr-padding {padding-left:20px}\n'
	+ '.centered {text-align:center !important}\n'
	+ '.channel-emote {cursor:pointer}\n'
	+ '.clearfix0 {clear:both; margin-bottom:0px}\n'
	+ '.clearfix5 {clear:both; margin-bottom:5px}\n'
	+ '.commands-tbl td {max-width:400px; padding-right:20px}\n'
	+ '.commands-tbl tr:not(:first-child) td {padding-top:10px}\n'
	+ '.darkened {opacity:0.4 !important}\n'
	+ '.dropdown-menu .glyphicon-ok, nav .dropdown-menu .glyphicon {margin-right:8px}\n'
	+ '.dropdown-menu li {cursor:pointer}\n'
	+ '.embedimg, .oekakiimg {border-radius:10px; margin-bottom:6px !important}\n'
	+ '.embedimg, .oekakiimg, .embedvid \n'
	+ '  {max-width:200px; max-height:200px; margin-top:6px !important}\n'
	+ '.oekakiimg {border:solid 2px #000}\n'
	+ '.embedvid {border-radius:6px}\n'
	+ '.group-modal {margin-bottom:20px}\n'
	+ '.icon-right {margin-left:8px}\n'
	+ '.margin-bottom-10 {margin-bottom:10px}\n'
	+ '.margin-top-15 {margin-top:15px}\n'
	+ '.maxwidth {width:100% !important}\n'
	+ '.miniature {max-width:120px; max-height:90px}\n'
	+ '.nav-cog {margin-right:8px}\n'
	+ '.pbar {\n'
	+ '  background-image:linear-gradient(to right,#555,#555) !important; background-size:0% 100%;\n'
	+ '  background-position:0px center !important; background-repeat:no-repeat !important;\n'
	+ '}\n'
	+ 'body.bright .pbar {background-image:linear-gradient(to right,#DDD,#DDD) !important}\n'
	+ '.player-chat {\n'
	+   'color:#FFF ;font-size:2em; position:absolute; z-index:1; cursor:default; white-space:nowrap;\n'
	+   'opacity:0.75; letter-spacing:4px; user-select:none; pointer-events:none; padding:0 8px;\n'
	+   'text-shadow:0 -1px #000, 1px 0 #000, 0 1px #000, -1px 0 #000; background-color:rgba(0,0,0,0.5);\n'
	+   'border-radius:6px;\n'
	+ '}\n'
	+ '.player-chat.greentext {color:#789922}\n'
	+ '.player-chat.marq {transition:right 8s linear, left 8s linear}\n'
	+ '.player-chat.marq2 {transition:right 14s linear, left 14s linear}\n'
	+ '.player-chat.shout {color:#F00}\n'
	+ '.navbar-fixed-top.snav {position:inherit !important; margin-bottom:8px !important}\n'
	+ '.olmodal li {margin-bottom:5px}\n'
	+ '.radiotitle {\n'
	+ '  border-style:solid !important; border-width:6px !important; border-radius:5px !important;\n'
	+ '  padding:10px !important; font-size:150% !important;\n'
	+ '}\n'
	+ '.scrolled {max-height:calc(100vh - 250px); overflow-y:auto}\n'
	+ '.server-msg-reconnect:after {content:" to: /r/' + document.URL.split('/r/')[1] + '"}\n'
	+ '.widecm {min-width:260px}\n'
	+ 'select {cursor:pointer}\n'
	+ '#navbar-up, #navbar-unpin {margin-left:10px; margin-right:5px}\n'
	+ '@media (max-width:768px) {\n'
	+ '  #navbar-up, #navbar-unpin {margin-left:0px; margin-right:15px}\n'
	+ '}\n'
	+ '#navbar-collapsed {position:fixed; top:0px; left:0px; padding-top:0px}\n'
	+ '#navbar-collapsed div {\n'
	+ '  width:60px; margin:0 auto; border:solid 3px #CCC; padding:4px; background-color:#333;\n'
	+ '  border-style:none solid solid; border-bottom-left-radius:8px; border-bottom-right-radius:8px\n'
	+ '}\n'
	+ 'body.bright #navbar-collapsed div {border-color:#666; background-color:#DDD}\n'
	+ '#usernamemark {max-width:50px; font-weight:bold}\n'
	+ '#chatmaxsize, #emotesperpage {max-width:120px}\n'
	+ '#customhtml {margin-top:8px}\n'
	+ '#csssavewrap, #notesavewrap {padding-top:5px}\n'
	+ '#titlerow {margin-bottom:10px}\n'
	+ '#mediastats {margin:0 0 1px; padding-left:1px; padding-right:1px}\n'
	+ '#player-chat-wrap img {max-width:60px; max-height:60px}\n'
	+ '#player-chat-wrap img.oekakiimg {max-width:100px; max-height:100px}\n'
	+ '#chatpanel {\n'
	+ '  position:absolute; top:0px; left:15%; width:70%; max-height:65%; border-width:6px; padding:10px;\n'
	+ '}\n'
	+ '#cpheader {margin-bottom:10px}\n'
	+ '#emotespages {margin-top:10px}\n'
	+ '#emotes-container img {margin:5px; max-height:35px; cursor:pointer}\n'
	+ '#unicodeform table {font-family:Menlo,Monaco,Consolas,"Courier New",monospace}\n'
	+ '#unicodeform td {text-align:center; width:30px; height:30px; cursor:pointer}\n'
	+ '#upalert {padding:10px; position:absolute; width:150px; max-width:150px; border-width:4px}\n'
	+ '#plr-menu {min-width:215px}\n'
	+ '#plr-menu .glyphicon-refresh, #ping-reset .glyphicon-refresh {margin-right:5px}\n'
	+ '#contributors-list td:nth-child(1) {padding-right:15px}\n'
	+ '#contributors-list td:nth-child(3) {text-align:right; padding-left:50px}\n'
	+ '#db-well {margin-top:10px}\n'
	+ '#db-well > button {display:block; width:40%; margin:0 auto}\n'
	+ '#advoptswrap {margin-bottom:5px}\n'
	+ '#utc {padding-top:5px}\n'
	+ '#channel-list {max-height:400px; margin-top:5px; overflow:auto}\n'
	+ '#favscontrol, #addtofav-btn {margin-bottom:5px}\n'
	+ '#queue-fav {padding-left:0px; padding-right:0px; margin-bottom:10px}\n'
	+ '#queue-fav button.pull-left, #db-well button.pull-left {margin-right:4px}\n'
	+ '#previewFrame {margin:0 auto; display:block}\n'
	+ '#freeslots {font-size:100%}\n'
	+ '#chatopts-menu .btn {margin-right:0px}\n'
	+ '#chatopts-menu .glyphicon-refresh, #plr-menu .glyphicon-volume-up {margin-right:5px}\n'
	+ '#queue img {margin-top:5px; margin-right:5px}\n'
	+ '#plmeta .label {margin-left:2px}\n'
	+ '#scroll-to-chat {margin-right:15px}\n'
	+ '#oekaki-well, #notepad-well, #avatarspanel, #customhtmlwrap {margin-top:10px; margin-bottom:10px}\n'
	+ '#spoekaki {margin:0 auto; max-width:400px}\n'
	+ '#spoekaki canvas {height:235px}\n'
	+ '#spoekaki .drawing-board-control-navigation button {color:#000}\n'
	+ '#oeup {font-size:10pt; color:#000}\n'
	+ '#avatarspanel {padding-bottom:9px; text-align:center}\n'
	+ '#avatarspanel div {margin-bottom:9px}\n'
	+ '#avatarspanel img {margin:0 5px 10px; border-radius:10px; max-width:50px; max-height:50px}\n'
	+ '#playlistmanagerwrap {margin-top:0px}\n'
	+ '#uploadwell {display:none !important}\n'
	+ '#spc {width:10px; height:10px; display:none}\n'
	+ '#close-btn \n'
	+ '  {position:fixed; top:0px; z-index:1001; border:solid 4px #FFF; border-radius:8px; opacity:0.6}\n'
	+ '#close-btn:hover {opacity:1}\n'
	+ '#close-btn.tmode {right:0px}\n'
	+ '#close-btn.tmode2 {left:0px}\n'
	+ 'body.bright #close-btn {border:solid 4px #333}\n'
	+ 'body.modern.radio-mode #videowrap-header {height:auto}\n'
	+ '#radioheader {\n'
	+ '  font-family:Menlo,Monaco,Consolas,\'Courier New\',monospace; font-size:150%; margin-bottom:15px;\n'
	+ '}\n'
	+ '#newplaylist {margin-top:15px}\n';
$("link[href='/css/video-js.css']").after('<style id="premiumcss" type="text/css">' + css + '</style>');


// Set theme

if (USERTHEME.indexOf('/css/themes') < 0) {
	$("#usertheme").attr('href', '/css/themes/slate.css');
	$('<link id="usertheme2" rel="stylesheet" type="text/css" href="' + USERTHEME + '" />').appendTo("head");
} else {
	$("#usertheme").attr("id", "usertheme_old");
	$('<link id="usertheme" rel="stylesheet" type="text/css" />').insertAfter("#usertheme_old")
	  .attr({'href':USERTHEME, 'onload':'$("#usertheme_old").remove()'});
}


// Add UI CSS for events, it cannot be override by channel CSS

var css = '.autoscroll {overflow-y:auto !important}\n'
	+ '.cbtn {background-image:none !important; margin-right:0px !important}\n'
	+ '.expanded {max-height:100000px !important}\n'
	+ '.hidden {display:none !important}\n'
	+ '.mX {\n'
	+ '  -webkit-transform:scaleX(-1); -moz-transform:scaleX(-1); transform:scaleX(-1);\n'
	+ '  -ms-transform:scaleX(-1); -o-transform:scaleX(-1);\n'
	+ '}\n'
	+ '.mY {\n'
	+ '  -webkit-transform:scaleY(-1); -moz-transform:scaleY(-1); transform:scaleY(-1);\n'
	+ '  -ms-transform:scaleY(-1); -o-transform:scaleY(-1);\n'
	+ '}\n'
	+ '.noscroll {overflow:hidden !important}\n'
	+ '.numbered {\n'
	+   'list-style:decimal !important; padding-left:45px !important;\n'
	+   'border-style:solid solid none !important; border-width:1px !important;\n'
	+ '}\n'
	+ 'body.bright .numbered {border-color:#AAA !important}\n'
	+ '.opt:not(.activated) .glyphicon-ok {display:none !important}\n'
	+ '.related {position:related !important}\n'
	+ 'body.glued #motdrow > div, body.glued #announcements > div, body.glued #drinkbar, body.glued #titlewrap \n'
	+ '  {padding-left:0px !important; padding-right:0px !important}\n'
	+ 'body.glued #chatwrap, body.glued #videowrap, body.glued #leftcontrols, body.glued #rightcontrols \n'
	+ '  {padding-left:0px !important; padding-right:0px !important}\n'
	+ 'body.glued #leftpane-inner > div, body.glued #rightpane-inner > div \n'
	+ '  {padding-left:0px !important; padding-right:0px !important}\n'
	+ 'body.singlecolumn #titlerow {display:none !important}\n'
	+ 'nav.transparent {opacity:0.3 !important}\n'
	+ 'nav.transparent:hover {opacity:1 !important}\n'
	+ '#mainpage.plmode {padding-top:15px !important}\n'
	+ '#mainpage.snav {padding-top:0px !important}\n'
	+ '#userlist.bigp .profile-box {\n'
	+ '  max-width:320px !important; max-height:450px !important; border-radius:10px !important;\n'
	+ '  border-width:4px !important; padding:10px !important; text-align:center !important;\n'
	+ '}\n'
	+ '#userlist.bigp .profile-image {\n'
	+ '  max-width:160px !important; max-height:160px !important; display:block !important\n'
	+ '  box-shadow:0px 0px 8px #FFF !important; margin-left:auto !important; margin-right:auto !important;\n'
	+ '  margin-bottom:6px !important;\n'
	+ '}\n'
	+ '#userlist.bigp .profile-box strong {\n'
	+ '  display:block !important; margin-left:auto !important; margin-right:auto !important\n'
	+ '  font-size:160% !important; padding-bottom:2px !important; border-bottom:dotted 1px #FFF !important;\n'
	+ '}\n'
	+ '#userlist.bigp .profile-box p {text-align:left !important}\n'
	+ '#userlist.matrix {font-family:Menlo,Monaco,Consolas,"Courier New",monospace !important}\n'
	+ '#userlist.whitebg, #messagebuffer.whitebg, #chatline.whitebg, .pm-buffer.whitebg, .pm-input.whitebg \n'
	+ '  {background-color:#FFF !important; background-image:none !important; color:#000 !important}\n'
	+ '#userlist.idleafk .userlist_afk {display:none !important}\n'
	+ '#chatwrap.noindicator #newmessages-indicator {display:none !important}\n'
	+ '#messagebuffer.matrix, #messagebuffer.matrix .action, #chatline.matrix \n'
	+ '  {font-family:Menlo,Monaco,Consolas,"Courier New",monospace !important; color:#32CD32 !important}\n'
	+ '#messagebuffer.matrix .server-whisper {color:limegreen !important}\n'
	+ '#messagebuffer.whitebg a, .pm-buffer.whitebg a {color:#337ab7 !important}\n'
	+ '#messagebuffer.whitebg .nick-hover, #messagebuffer.whitebg .nick-highlight \n'
	+ '  {background-color:#E9E9E9 !important; background-image:none !important; color:#000 !important}\n'
	+ '#messagebuffer.matrix.whitebg, #messagebuffer.matrix.whitebg .action, #chatline.whitebg.matrix \n'
	+ '  {color:#32CD32 !important; background-image:none !important}\n'
	+ '#messagebuffer.matrix.whitebg .nick-hover, #messagebuffer.matrix.whitebg .nick-highlight \n'
	+ '  {color:#32CD32 !important; background-image:none !important}\n'
	+ '#messagebuffer.lines div[class*="chat-msg"]:not(.drink) \n'
	+ '  {border-bottom:dotted 2px #666 !important; padding-top:4px !important; padding-bottom:4px !important}\n'
	+ '#messagebuffer.bubbles div[class*="chat-msg"]:not(.drink) {\n'
	+ '  margin:5px !important; padding:5px !important; border:solid 2px #AAA !important;\n'
	+ '  border-radius:15px !important;\n'
	+ '}\n'
	+ '#messagebuffer.bubbles .timestamp {display:block !important; float:right !important}\n'
	+ '#messagebuffer.noavatars strong.username {color:inherit !important}\n'
	+ '#messagebuffer.noavatars span[class^="userlist"] {color:inherit !important}\n'
	+ '#messagebuffer.noavatars strong.username:before {all:inherit !important}\n'
	+ '#messagebuffer.ignoreserver .serverinfo {display:none !important}\n'
	+ '#messagebuffer.nocolors .chatcolor {all:inherit !important}\n'
	+ '#messagebuffer.noeffects .txteffect, #messagebuffer.noeffects strong:not(.username)\n'
	+ '  {all:inherit !important}\n'
	+ '#messagebuffer.noeffects em, #messagebuffer.noeffects s {all:inherit !important}\n'
	+ '#messagebuffer.noemotes img:not(.embedimg):not(.oekakiimg) {display:none !important}\n'
	+ '#messagebuffer.notstamps .timestamp {display:none !important}\n'
	+ '#emote-view {\n'
	+ '  position:absolute !important; margin-top:2px !important; padding:2px !important;\n'
	+ '  min-width:20px !important; background-color:#000 !important; border:solid 2px #FFF !important;\n'
	+ '  border-radius:4px !important; z-index:1000 !important;\n'
	+ '}\n'
	+ 'body.bright #emote-view {background-color:#FFF !important; border:solid 2px #000 !important}\n'
	+ '#emote-view.no-preview {display:none !important}\n'
	+ 'body.theatre-mode #emote-view.b-left {display:none !important}\n'
	+ '#emote-view.b-right {right:15px !important}\n'
	+ '#emote-view.t-right {bottom:3px !important; right:15px !important}\n'
	+ 'body.glued #emote-view.b-right {right:0px !important}\n'
	+ 'body.glued #emote-view.t-right, body.theatre-mode #emote-view.t-right {right:0px !important}\n'
	+ '#emote-view img {max-width:100px; max-height:100px}\n'
	+ '#hidden-plr {\n'
	+ '  height:100% !important; position:absolute !important; left:0px !important; top:0px !important;\n'
	+ '  background-color:#FFF !important; background-repeat:no-repeat !important;\n'
	+ '  background-position:center center !important; background-image:url("' + DefaultHPURL + '") !important;\n'
	+ '}\n'
	+ '#plr-bright\n'
	+ '  {height:100% !important; position:absolute !important; left:0px !important; top:0px !important}\n'
	+ '#queue.nobuttons .btn-group {display:none !important}\n'
	+ '#chatwrap.tmode, #chatwrap.tmode2 {\n'
	+ '  position:fixed !important; width:370px !important; height:100% !important;\n'
	+ '  top:0px !important; padding:0px !important; z-index:1000 !important;\n'
	+ '}\n'
	+ '#chatwrap.tmode, #videowrap.tmode2 {left:0px !important}\n'
	+ '#chatwrap.tmode2, #videowrap.tmode {right:0px !important}\n'
	+ '#messagebuffer.tmode {height:calc(100% - 40px) !important}\n'
	+ '#videowrap.tmode,  #videowrap.tmode2 {\n'
	+ '  position:fixed !important; width:calc(100% - 370px) !important; height:100% !important;\n'
	+ '  top:0px !important; padding:0px !important; z-index:1000 !important;}\n'
	+ '#videowrap.tmode .embed-responsive, #videowrap.tmode2 .embed-responsive {\n'
	+   'width:100% !important; height:100% !important; top:0px !important;\n'
	+ '}\n'
	+ '@media (max-width:750px) {\n'
	+ '  #chatwrap.tmode, #chatwrap.tmode2 {width:270px !important}\n'
	+ '  #videowrap.tmode, #videowrap.tmode2 {width:calc(100% - 270px) !important}\n'
	+ '}\n'
	+ '#pollwrap.tmode div.active:not(.dismissed), #pollwrap.tmode2 div.active:not(.dismissed) {\n'
	+ '  position:fixed !important; top:10px !important; z-index:10000 !important; min-width:300px !important;\n'
	+ '}\n'
	+ '#pollwrap.tmode div.active:not(.dismissed) {left:400px !important}\n'
	+ '#pollwrap.tmode2 div.active:not(.dismissed) {left:50px !important}\n'
	+ '#pollwrap.tmode div.dismissed, #pollwrap.tmode div.muted {display:none !important}\n'
	+ '#pollwrap.tmode2 div.dismissed, #pollwrap.tmode2 div.muted {display:none !important}\n';
if (MiniLogoURL != "") {
	if ((typeof ChannelNamePadding !== "number") || ChannelNamePadding < 16) ChannelNamePadding = 61;
	css += 'nav .navbar-brand.logo {\n'
	    +  '  background-image:url("' + MiniLogoURL + '") !important; background-repeat:no-repeat !important;\n'
	    +  '  background-position:15px center !important; background-size:auto 36px !important;\n'
	    +  '  padding-left:' + ChannelNamePadding + 'px !important;\n'
	    +  '}\n';
}
var name = (ChannelName == "") ? '/r/' + window.location.href.split('/').pop() : ChannelName;
css += '.navbar-brand {font-size:0pt !important}\n'
    +  '.navbar-brand:before {content:"' + name + '" !important; font-size:14pt !important}\n';
$("head").append('<style id="hardcss" type="text/css">' + css + '</style>');


// Set optional User CSS

if (EXECCSS && USERCSS != "") {
	$("#layout-2").addClass('activated');
	$("head").append('<style id="usercss" type="text/css">' + USERCSS + '</style>');
}
if (IGNORECSS) {
	CHANCSS = $("#chancss").length > 0 ? $("#chancss").html() : '';
	CHANEXTERNALCSS = $("#chanexternalcss").length > 0 ? $("#chanexternalcss").attr('href') : '';
	$("#chanexternalcss, #chancss").remove();
}
setAdditionalCSS();


// Set additional classes and execute necessary functions

if (['/css/themes/light.css', '/css/themes/bootstrap-theme.min.css'].indexOf(USERTHEME) > -1) {
	$body.addClass('bright');
} else if (USERTHEME == '/css/themes/modern.css') {
	$body.addClass('modern');
}
if (_SYNCH) $body.removeClass('synchtube');
setTimeout(function() {
	handleVideoResize();
	if ($("#expand-chat").hasClass('label-success')) expandChat();
}, 2000);


// Set final user layout

if (_SYNCH) {
	$userlist.css('float', '');
	$userlisttoggle.removeClass("glyphicon-chevron-left pull-right").addClass("glyphicon-chevron-right pull-left");
}
COMPACT ? compactLayout() : fluidLayout();
SINGLECOLUMN ? singleColumn() : twoColumns();
SYNCH ? synchLayout() : nonSynchLayout();
if (MOTDBOTTOM) bottomMOTD();
if (LARGECHAT) largeChat();
if (LARGEPLAYER) largePlayer();
if (THEATREMODE) theatreMode();
if (RADIOMODE) radioMode();
if (SCROLLNAVBAR) scrollableNavbar();
if (ULISTRIGHT) userlistRight();
toggleLayoutElements();


// Format old chat messages

$messagebuffer.find("div").each(function() {
	if ($(this).children().length > 0) {
		var message = $(this).children().last();
		if (message.html().indexOf('● ') > -1) {
			message.addClass('action scriptanswer');
		}
		if (EXECFILTERS) {
			var arr = CUSTOMFILTERS.split("\n");
			for (i in arr) {
				if (arr[i] != "") {
					var fil = arr[i].split(" > ");
					if (fil[0] != "") {
						var re = RegExp(fil[0].trim(), "g")
						message.html(message.html().replace(re, fil[1]));
					}
				}
			}
		}
		message.html(execTextEffects(message.html()));
		if (SHOWIMAGES) {
			showImagesOnChat(message);
		} else if (SHOWOEKAKI) {
			showOekakiOnChat(message);
		}
		if (SHOWVIDEOS) showVideosOnChat(message);
		IGNOREEMOTES ? hideEmotes(message) : enhanceEmotes(message);
	}
});
if (USERNAMEMARK != ":") {
	$messagebuffer.find(".username").each(function() {
		$(this).html($(this).html().slice(0, -2) + USERNAMEMARK + ' ');
	});
}


// Initialize sockets

socket.on("addUser", userJoined);
socket.on("changeMedia", handleMediaChange);
socket.on("changeMedia", nowPlaying);
socket.on("channelCSSJS", fixUserCSS);
socket.on("channelOpts", pageTitle);
socket.on("rank", handleRank);
socket.on("queue", rebuildMiniatures);
socket.on("userLeave", userLeft);
socket.on("setPlaylistLocked", rehidePlaylist);


// Execute final functions

pageTitle();
volumeLvl();
handleRank();
scrollChat();
scrollQueue();
$chatline.focus();
handleMediaChange();
setTimeout(function() {nowPlaying()}, 1500);
setTimeout(function() {scrollChat()}, 2000);


// Set intervals of live functions

setInterval(function() {volumeLvl()}, 2000);
setInterval(function() {onlineTime()}, 60000);


// Update number of user visits

VISITS++;
setOpt('SP_visits', VISITS);


// Optional favicon

if (FaviconURL != "") {
	$('<link id="chanfavicon" type="image/x-icon" rel="shortcut icon" />').appendTo("head")
	  .attr('href', FaviconURL);
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// If script is succesfully loaded

LOADED = true;
var time = Math.round(new Date().getTime() - START) / 1000;
addServerMessage('Mediasync Advanced v. ' + VERSION + ' activated (in ' + time + ' s.)');


// Admin message

if (!TOOLSENABLED && CLIENT.rank > 2) {
	addServerMessage('You have now access to Premium Admin Tools.');
	var html = 'Open "Advanced options" panel [<span class="glyphicon glyphicon-flash"></span> '
		 + 'button below player] and select "Tools".';
	addServerMessage(html);
	addServerMessage('Message above won\'t show again after entering "Tools".');
}


// Optional additional external script

if (ExternalScriptURL != "") $.getScript(ExternalScriptURL);


/* End of Synchtube Premium API */


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
