/*!
 **|  CyTube Advanced Playlist Delete
 **|  Written by TheBearJew
 **|  Last Updated: 6/10/2015 9:43AM
 **@preserve
 */
(function() {

    var minrank = Math.min(CHANNEL.perms.playlistdelete, CHANNEL.perms.oplaylistdelete);
    if (!$("#AdvancedDeleteGroup").length && CLIENT.rank >= minrank) {
         
        var deleteButtonHTML =
            '<div class="btn-group" id="AdvancedDeleteGroup"> ' +
            '<button class="btn btn-default btn-sm dropdown-toggle" type="button" ' +
            '        href="javascript:void(0)"' +
            '        title="Advanced Playlist Delete Options"' +
            '        data-toggle="dropdown" aria-expanded="false">' +
            '<span class="glyphicon glyphicon-trash"></span>' +
            '<span class="caret"></span></button>' +

            '<ul class="dropdown-menu columns" role="menu">' +
            '<li><a href="javascript:void(0)" id="deleteaddon_clearall">Clear the Playlist</a></li>' +
            '<li><a href="javascript:void(0)" id="deleteaddon_beforecurrent">Clear Playlist Items (Before Current)</a></li>' +
            '<li><a href="javascript:void(0)" id="deleteaddon_aftercurrent">Clear Playlist Items (After Current)</a></li>' +
            '<li><a href="javascript:void(0)" id="deleteaddon_clearbykeyword">Clear by Keyword</a></li>' +
            '</ul>' +

            '</div>';

        $(deleteButtonHTML).insertAfter($("#clearplaylist"));

        createDeleteByKeywordModal();
        createDeleteByKeywordModal = null;

        // Hide old clear all button since this 
        // script duplicates that function
        $("#clearplaylist").addClass('hidden');

        $("#deleteaddon_clearbykeyword").on("click", function() {

            $("#DeleteByKeyword").modal('show');
        });

        $("#deleteaddon_beforecurrent").on("click", function() {

            var mylist = $('#queue li.queue_active').prevAll();
            var delete_count = mylist.length;

            var confirm_prompt = confirm("Are you sure you want to remove the " +
                delete_count + " items listed before the currently playing media from the playlist?");

            if (delete_count && confirm_prompt) {
                $.each(mylist, function(idx, itm) {
                    socket.emit("delete", $(itm).data("uid"));
                });
            }
        });

        $("#deleteaddon_aftercurrent").on("click", function() {

            var mylist = $('#queue li.queue_active').nextAll();
            var delete_count = mylist.length;

            var confirm_prompt = confirm("Are you sure you want to remove the " +
                delete_count + " items listed after the currently playing media from the playlist?");

            if (delete_count && confirm_prompt) {
                $.each(mylist, function(idx, itm) {
                    socket.emit("delete", $(itm).data("uid"));
                });
            }
        });

        $("#deleteaddon_clearall").on("click", function() {

            var delete_confirm = confirm("Are you sure you want to clear the playlist?");

            if (delete_confirm) {
                socket.emit("clearPlaylist");
            }
        });

    }

    function createDeleteByKeywordModal() {
        createModal({
            wrap_id: "DeleteByKeyword",
            body_id: "DeleteByKeywordBody",
            title: 'Delete By Keyword',
            titleIsMarkup: false,
            footer: false
        }).prependTo("#motdrow");

        var html = '<form class="form-horizontal" role="form"  onsubmit="return false">' +

            '<div class="form-group">' +
            '<label class="control-label col-sm-2" for="delete_modal_case_insensitive">Case:</label>' +
            '<div class="col-sm-10">' +
            '<div class="checkbox">' +
            '<label><input type="checkbox" id="delete_modal_case_insensitive" checked>Ignore Case</label>' +
            '</div>' +
            '</div>' +
            '</div>' +

            '<div class="form-group">' +
            '<label class="control-label col-sm-2" for="delete_modal_include">Matching Items:</label>' +
            '<div class="col-sm-10">' +
            '<label class="radio-inline"><input type="radio" name="delete_modal_include"  checked value="include">Delete</label>' +
            '<label class="radio-inline"><input type="radio" name="delete_modal_include" value="exclude">Keep</label>' +
            '</div>' +
            '</div>' +

            '<div class="form-group">' +
            '<label class="control-label col-sm-2" for="delete_modal_keywords">Title Search Words:</label>' +
            '<div class="col-sm-10">' +
            '<input type="text" class="form-control" id="delete_modal_keywords" placeholder="Enter search term">' +
            '</div>' +
            '</div>' +

            '<div class="form-group">' +
            '<div class="col-sm-offset-2 col-sm-10">' +
            '<button class="btn btn-default pull-right" Style="margin-left: 5px;" data-dismiss="modal">Cancel</button>' +
            '<button class="btn btn-default pull-right" id="delete_modal_submit">Submit</button>' +
            '</div>' +
            '</div>' +
            '</form>';

        $("#DeleteByKeywordBody").html(html);

        $("#DeleteByKeyword").on("hidden.bs.modal", function() {

            // Set modal form inputs to default values on close
            $("#delete_modal_case_insensitive").prop('checked', true);
            $('input:radio[name=delete_modal_include]').val(['include']);
            $("#delete_modal_keywords").val("");
        });

        $("#delete_modal_submit").on("click", function() {

            var include = $('input[name=delete_modal_include]:checked').val();
            var is_case_sensitive = $("#delete_modal_case_insensitive").is(':checked');
            var keywords = $("#delete_modal_keywords").val();

            if (!($.trim(keywords))) {
                $("#DeleteByKeyword").modal('hide');
                return;
            }

            var flags = is_case_sensitive === true ? "i" : null;
            var negate = include == "include" ? false : true;
            var target = generateDeletionRegex(keywords, flags);

            var mylist = $('#queue');
            var listitems = mylist.children('li').get();

            $.each(listitems, function(idx, itm) {
                var item = $(itm);

                var title = item.find('.qe_title').text();

                if (negate) {
                    if (!target.test(title)) {
                        socket.emit("delete", item.data("uid"));
                    }
                } else {
                    if (target.test(title)) {
                        socket.emit("delete", item.data("uid"));
                    }
                }
            });

            $("#DeleteByKeyword").modal('hide');
        });

        //$("#MovieList").find(".modal-footer").css({
        //    "border-top": "1px solid #C7C7C7",
        //    background: "url(http://i.imgur.com/sPSDPpM.png) repeat"
        //})
    }

    function generateDeletionRegex(target, flags) {

        if (typeof flags === 'undefined' || flags === null) {
            return new RegExp(target);
        }

        return new RegExp(target, flags);
    }

    function createModal(data) {
        var title = data.title || "Empty Modal";
        var title_m = !!data.titleIsMarkup;
        var wrap = $("<div/>").addClass("modal fade").attr("tabindex", "-1");
        var dialog = $("<div/>").addClass("modal-dialog").appendTo(wrap);
        var content = $("<div/>").addClass("modal-content").appendTo(dialog);
        var head = $("<div/>").addClass("modal-header").appendTo(content);
        var body = $("<div/>").addClass("modal-body").appendTo(content);
        var foot = $("<div/>").addClass("modal-footer");
        $("<button/>").addClass("close").attr("data-dismiss", "modal").attr("data-hidden", "true").html("&times;").appendTo(head);
        $("<button/>").addClass("btn btn-default").attr("data-dismiss", "modal").prop("type", "button").html("Close").appendTo(foot);
        if (title_m) {
            $("<h4/>").addClass("modal-title").html(title).appendTo(head)
        } else {
            $("<h4/>").addClass("modal-title").text(title).appendTo(head)
        }
        if (data.wrap_id) {
            wrap.prop("id", data.wrap_id)
        }
        if (data.body_id) {
            body.prop("id", data.body_id)
        }
        if (data.footer) {
            foot.appendTo(content)
        }
        if (data.destroy) {
            wrap.on("hidden.bs.modal", function() {
                wrap.remove()
            })
        }
        if (data.attach) {
            wrap.appendTo(data.attach)
        }
        return wrap
    }

})();
