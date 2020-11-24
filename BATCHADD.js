/*!
 **|  CyTube Batch Add
 **|  Written by TheBearJew
 **|  Last Updated: 6/10/2015 10:05PM
 **@preserve
 */
(function() {

    var minrank = Math.min(CHANNEL.perms.oplaylistnext, CHANNEL.perms.playlistnext);
    if (!$("#batchaddplaylist").length && CLIENT.rank >= minrank) {

        createBatchAddModal();
        createBatchAddModal = null;

        $("<button>").prop("id", "batchaddplaylist").attr("title", "Batch Add").addClass("btn btn-sm btn-default").append($("<span>").addClass("glyphicon glyphicon-plus-sign")).insertAfter($("#showmediaurl")).on("click", function() {
            $("#BatchAdd").modal('show');
        });
    }

    function createBatchAddModal() {
        createModal({
            wrap_id: "BatchAdd",
            body_id: "BatchAddBody",
            title: 'Batch Add',
            titleIsMarkup: false,
            footer: false
        }).prependTo("#motdrow");

        var html = '<form class="form-horizontal" role="form"  onsubmit="return false">' +

            '<div class="form-group">' +
            '<label class="control-label col-sm-2" for="batch_add_case_insensitive">Temp:</label>' +
            '<div class="col-sm-10">' +
            '<div class="checkbox">' +
            '<label><input type="checkbox" id="batch_add_as_temporary" checked>Add as temporary</label>' +
            '</div>' +
            '</div>' +
            '</div>' +

            '<div class="form-group">' +
            '<label class="control-label col-sm-2" for="batch_add_delimeter">Delimeter:</label>' +
            '<div class="col-sm-10">' +
            '<select class="form-control" id="batch_add_delimeter">' +
            '<option value="newline">New Line</option>' +
            '<option value=",">Comma</option>' +
            '</select>' +
            '</div>' +
            '</div>' +

            '<div class="form-group">' +
            '<label class="control-label col-sm-2" for="batch_add_urls">Media Urls:</label>' +
            '<div class="col-sm-10">' +
            '<textarea rows="5" class="form-control" style="resize:vertical;" id="batch_add_urls"></textarea>' +
            '</div>' +
            '</div>' +

            '<div class="form-group">' +
            '<div class="col-sm-offset-2 col-sm-10">' +
            '<button class="btn btn-default pull-right" Style="margin-left: 5px;" data-dismiss="modal">Cancel</button>' +
            '<button class="btn btn-default pull-right" Style="margin-left: 5px;" id="batch_add_next">Next</button>' +
            '<button class="btn btn-default pull-right" id="batch_add_atend">At End</button>' +
            '</div>' +
            '</div>' +
            '</form>';

        $("#BatchAddBody").html(html);

        $('#batch_add_as_temporary').change(function() {
            var isChecked = $(this).is(":checked");
            $("#addfromurl .add-temp").prop('checked', isChecked);
        });

        $("#BatchAdd").on("show.bs.modal", function() {
            var is_temporary_checked = $("#addfromurl .add-temp").is(':checked');

            $("#batch_add_as_temporary").prop('checked', is_temporary_checked);
        });

        $("#BatchAdd").on("hidden.bs.modal", function() {
            // clear text area on close
            $("textarea#batch_add_urls").val("");
        });


        $("#batch_add_next").on("click", function() {
            batch_add(false);
        });

        $("#batch_add_atend").on("click", function() {
            batch_add(true);
        });

        function batch_add(atend) {
            var urls = $("textarea#batch_add_urls").val();

            if (!($.trim(urls))) {
                $("#BatchAdd").modal('hide');
                return;
            }

            var delimeter = $("#batch_add_delimeter").val();

            var url_list = null;

            if (delimeter === "newline") {
                url_list = urls.match(/[^\r\n]+/g);
            } else {
                url_list = urls.split(delimeter);
            }

            var link_count = url_list.length;
            var confirm_prompt = confirm("Are you sure you want to add " +
                link_count + " media links to the playlist?");
            
            if (!confirm_prompt)
            {
                return;
            }
            
            var command = "next";
            
            var current_media_li = $('#queue li.queue_active');
            var current_media_value = current_media_li.get(0);
            
            if ( typeof current_media_value === "undefined")
            {
                atend = true;
            }
            
            if (atend) 
            {
                command = "end";
                url_list = url_list.reverse();
            }
            
            f = function() {
                $('#mediaurl').val(url_list.pop());
                queue(command, "url");

                if (url_list.length !== 0) {
                    setTimeout(function() {
                        f();
                    }, 1500);
                }
            };

            f();

            $("#BatchAdd").modal('hide');
        }
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
