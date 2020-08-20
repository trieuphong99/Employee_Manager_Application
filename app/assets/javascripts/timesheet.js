$(function() {
  $(".monthpicker").datepicker({
    dateFormat: "mm-yy"
  }).on("change", function(event){
    window.location = "/timesheets?month=" + event.currentTarget.value;
  });
  $(".monthpicker-2").datepicker({
    dateFormat: "mm-yy"
  }).on("change", function(event){
    window.location = window.location.pathname + "?month=" + event.currentTarget.value;
  });

  $(".report-tool").on("change", function() {
    callAjaxGetRoom();
  });

  if (!_.isEmpty($(".report-tool").val())) {
    // callAjaxGetRoom();
  }

  function callAjaxGetRoom() {
    $(".report-room").find("option").remove().end()
      .append("<option value=''>Please select</option>").val("");
    var actionURL = "/timesheets/get_rooms";
    $.ajax({
      url: actionURL,
      method: "GET",
      dataType: "json",
      data: {type_id: $(".report-tool").val()},
      success: function(response) {
        if (!_.isEmpty(response.rooms)) {
          $.each(response.rooms, function(index, room) {
            $(".report-room").append($("<option></option>").attr("value", room.room_id).text(room.name));
          });
        }
      }
    });
  }

  $(".body-timesheet-list").on("click", ".timesheet-row", function() {
    var timesheetId = $(this).data("timesheet-id");
    window.location = "/timesheets/" + timesheetId;
  });

  $(".report-room").on("change", function() {
    $(".report-room-name").val($(".report-room option:selected").html());
  });

  if ($(".profile-detail-page").length > 0) {
    var heights = $(".provider-room-detail").map(function() {
      return $(this).height();
    }).get();
    var maxHeight = Math.max.apply(null, heights);
    $(".provider-room-detail").css("height", maxHeight);
  }
});
