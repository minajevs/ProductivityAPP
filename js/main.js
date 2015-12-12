
var currentWeek = moment().week();
$('#curWeek').text(currentWeek);
$( document ).ready(function() {
    $.each(TypeEnum, function(key, value) {
        $('#inputEventType')
            .append($("<option></option>")
                .attr("value",key)
                .text(value));
    });



    $('#add-event-button').click(function() {
        $('#add-event').modal('show');
        $('#btnDelete').hide();
        $('#btnSave').show();
    });
    $(function () {
        $('#datetimepicker1').datetimepicker();
    });

    $(function () {
        $('#datetimepicker2').datetimepicker();
    });

    var x = $( window ).width();
    if (x<=690) {
        $('td:nth-child(2)').addClass("shown");
        $('td:nth-child(3)').hide();
        $('td:nth-child(4)').hide();
        $('td:nth-child(5)').hide();
        $('td:nth-child(6)').hide();
        $('td:nth-child(7)').hide();
        $('td:nth-child(8)').hide();
    } else {
        $('td:nth-child(3)').removeClass('shown');
        $('td:nth-child(3)').show();
        $('td:nth-child(4)').show();
        $('td:nth-child(5)').show();
        $('td:nth-child(6)').show();
        $('td:nth-child(7)').show();
        $('td:nth-child(8)').show();
    }
});

$( window ).resize(function() {
  var x = $( window ).width();
  if (x<=690) {
      $('td:nth-child(2)').addClass("shown");
      $('td:nth-child(3)').hide();
      $('td:nth-child(4)').hide();
      $('td:nth-child(5)').hide();
      $('td:nth-child(6)').hide();
      $('td:nth-child(7)').hide();
      $('td:nth-child(8)').hide();
  } else {
      $('td:nth-child(2)').removeClass("shown");
      $('td:nth-child(3)').show();
      $('td:nth-child(4)').show();
      $('td:nth-child(5)').show();
      $('td:nth-child(6)').show();
      $('td:nth-child(7)').show();
      $('td:nth-child(8)').show();
  }
    Events.draw();
});

function goleft() {
    if ($('.shown').hasClass('monday')) {
        $('.monday').removeClass('shown').hide();
        $('.sunday').addClass('shown').show();
        currentWeek--;
        $('#curWeek').text(currentWeek);
        return 0;
    };
    if ($('.shown').hasClass('tuesday')) {
        $('.tuesday').removeClass('shown').hide();
        $('.monday').addClass('shown').show();
        return 0;
    };
    if ($('.shown').hasClass('wednesday')) {
        $('.wednesday').removeClass('shown').hide();
        $('.tuesday').addClass('shown').show();
        return 0;
    };
    if ($('.shown').hasClass('thursday')) {
        $('.thursday').removeClass('shown').hide();
        $('.wednesday').addClass('shown').show();
        return 0;
    };
    if ($('.shown').hasClass('friday')) {
        $('.friday').removeClass('shown').hide();
        $('.thursday').addClass('shown').show();
        return 0;
    };
    if ($('.shown').hasClass('saturday')) {
        $('.saturday').removeClass('shown').hide();
        $('.friday').addClass('shown').show();
        return 0;
    };
    if ($('.shown').hasClass('sunday')) {
        $('.sunday').removeClass('shown').hide();
        $('.saturday').addClass('shown').show();
        return 0;
    };
};

function goright() {
    if ($('.shown').hasClass('monday')) {
        $('.monday').removeClass('shown').hide();
        $('.tuesday').addClass('shown').show();
        return 0;
    };
    if ($('.shown').hasClass('tuesday')) {
        $('.tuesday').removeClass('shown').hide();
        $('.wednesday').addClass('shown').show();
        return 0;
    };
    if ($('.shown').hasClass('wednesday')) {
        $('.wednesday').removeClass('shown').hide();
        $('.thursday').addClass('shown').show();
        return 0;
    };
    if ($('.shown').hasClass('thursday')) {
        $('.thursday').removeClass('shown').hide();
        $('.friday').addClass('shown').show();
        return 0;
    };
    if ($('.shown').hasClass('friday')) {
        $('.friday').removeClass('shown').hide();
        $('.saturday').addClass('shown').show();
        return 0;
    };
    if ($('.shown').hasClass('saturday')) {
        $('.saturday').removeClass('shown').hide();
        $('.sunday').addClass('shown').show();
        return 0;
    };
    if ($('.shown').hasClass('sunday')) {
        $('.sunday').removeClass('shown').hide();
        $('.monday').addClass('shown').show();
        currentWeek++;
        $('#curWeek').text(currentWeek);
        return 0;
    };
};

$('#goleft').on('click', function () {
    goleft();
});

$('#goright').on('click', function () {
    goright();
});

$('.event').on('click', function () {
    $('#add-event').modal('show');
});

$('#btnSave').on('click', function(){
    Events.guid = lastGuid;
    Events.guid++;
    console.log("---" + Events.guid);
    console.log(Events.guid);
    var name = $('#inputEventName').val();
    var desc = $('#inputEventDesc').val();
    var type = $('#inputEventType').val();
    var start = moment($('#inputEventStartTimePlanned').val());
    var end = moment($('#inputEventEndTimePlanned').val());
    var id = Events.guid;
    console.log("id=" + id);
    Events.add(new Event(name, type, desc, start, end,id));
    Events.draw();

});
