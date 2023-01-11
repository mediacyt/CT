/*|  CyTube Collapse State Saver (For playlist and header)
 **|  Written by TheBearJew
 **|  Version: 09/19/2015 3:49 PM
 **|  Source: https://www.googledrive.com/host/0BxcjGm4Av637cUN6aDE1cjQzdGs
 **@preserve
 */
//if (!window[CHANNEL.name])  { window[CHANNEL.name] = window.location.pathname.substring(window.location.pathname.lastIndexOf('/') + 1);} 
if (!window[CHANNEL.name]) window[CHANNEL.name] = {};


// Playlist Collapse State

localStorage[CHANNEL.name + ".no_extended_playlist"] = localStorage[CHANNEL.name + ".no_extended_playlist"] || false;

var localstorage_no_extended_playlist = localStorage[CHANNEL.name + ".no_extended_playlist"] === "true" ? true : false;
var extended_playlist_button_id = "shrinkplaylist";
var extended_playlist_button = $('#' + extended_playlist_button_id);


$('#' + extended_playlist_button_id).on("click", function()
{

    if (extended_playlist_button.length)
    {
        if (extended_playlist_button.hasClass("btn-warning"))
        {
            localstorage_no_extended_playlist = true;
        }
        else
        {
            localstorage_no_extended_playlist = false;
        }

        localStorage[CHANNEL.name + ".no_extended_playlist"] = localstorage_no_extended_playlist;
    }
});




// Motd header Collapse State
localStorage[CHANNEL.name + ".no_header_visible"] = localStorage[CHANNEL.name + ".no_header_visible"] || false;

var localstorage_no_header_visible = localStorage[CHANNEL.name + ".no_header_visible"] === "true" ? true : false;
var header_visible_button_id = "togglemotd";
var header_visible_button = $('#' + header_visible_button_id);

$('#' + header_visible_button_id).on("click", function()
{

    var section = $('#' + "motd");

    if (section.length)
    {
        var visibility_state = section.css("display");

        if (visibility_state.length && visibility_state == "none")
        {
            localstorage_no_header_visible = true;
        }
        else
        {
            localstorage_no_header_visible = false;
        }

        localStorage[CHANNEL.name + ".no_header_visible"] = localstorage_no_header_visible;
    }
});



function refreshCollapseState()
{

    if (localstorage_no_extended_playlist)
    {
        if (extended_playlist_button.length && extended_playlist_button.attr('disabled', false))
        {           
            //extended_playlist_button.click();
            
            if ($("#queue li.queue_entry div.btn-group").is(":visible")) 
            {            	
            	$("#queue").data().shrink = true;
            	$("#queue li.queue_entry div.btn-group").hide();
          	}
          	
            if (extended_playlist_button.hasClass("btn-warning") === false)
            {
                extended_playlist_button.toggleClass("btn-default btn-warning");
            }
            
            localstorage_no_extended_playlist = true;
            localStorage[CHANNEL.name + ".no_header_visible"] = localstorage_no_header_visible;
        }
    }


    if (localstorage_no_header_visible)
    {

        var section = $('#' + "motd");

        if (section.length)
        {
            var visibility_state = section.css("display");

            if (visibility_state.length && visibility_state == "block")
            {
                if (header_visible_button.length && header_visible_button.attr('disabled', false))
                {

                    header_visible_button.click();
                }
            }
        }

    }
}

var is_listening_for_CollapseStateRefresh = false;

if (!is_listening_for_CollapseStateRefresh)
{

    is_listening_for_CollapseStateRefresh = true;

    //"joinChannel"
    //"initChannelCallbacks"
    //"playlist"
    //"setCurrent" 
    socket.on("playlist", function()
    {
    	  setTimeout(function() 
    	  { 
    	  	refreshCollapseState();
    	  }, 3000);
        
    });

    refreshCollapseState();
}
