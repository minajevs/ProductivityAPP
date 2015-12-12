var week_event_names  = [], week_event_count = [], week_events = [],
    week_event_percentage = [], all_week_events = [],
    event_background = [], active_color;

var ctx_pieChart = $("#pieChart").get(0).getContext("2d");
var ctx_barChart = $("#barChart").get(0).getContext("2d");

function evenetstat_init(){
    var current_week = moment().week();
    week_events = Events.weekStats(current_week);
    for(var i = 0; i != week_events.length; i++){
        week_event_names[i] = week_events[i].name;
        week_event_count[i] = week_events[i].count;
    }
    all_week_events = Events.count();

    for(var i = 0; i != week_events.length; i++){
        week_event_percentage[i] = week_events[i].count ;
    }

    for(var i = 0; i != week_events.length; i++) {
        if(week_events[i].name === 'Work') active_color = 'rgba(241, 196, 15, 1)';
        else if (week_events[i].name === 'Studies') active_color = 'rgba(142, 68, 173, 1)';
        else if (week_events[i].name === 'Social') active_color = 'rgba(22, 245, 99, 1)';
        else if (week_events[i].name === 'Health') active_color = 'rgba(41, 128, 185, 1)';
        else if (week_events[i].name === 'Chill') active_color = 'rgba(44, 62, 80, 1)';
        event_background[i] = active_color;
    }
}

var pie_data = {
    labels: week_event_names,
    datasets: [
        {
            data: week_event_percentage,
            backgroundColor:  event_background,
        }],

};


var ds;
var colors = [];
function dataset_create(){
    ds = [];
    colors = {
        Work:   'rgba(241, 196, 15, 1)',
        Studies:'rgba(142, 68, 173, 1)',
        Social: 'rgba(22, 245, 99, 1)',
        Health: 'rgba(41, 128, 185, 1)',
        Chill:  'rgba(192, 57, 43, 1)',
    };
    for(var type in TypeEnum){
        ds.push({
            label: type.toString(),
            backgroundColor: colors[type.toString()],
            data: [
                Events.countOfTypeAtDay(type,  1),
                Events.countOfTypeAtDay(type,  2),
                Events.countOfTypeAtDay(type,  3),
                Events.countOfTypeAtDay(type,  4),
                Events.countOfTypeAtDay(type,  5),
                Events.countOfTypeAtDay(type,  6),
                Events.countOfTypeAtDay(type,  7),
            ]
        });
    }
}

evenetstat_init();
var pie_chart = new Chart(ctx_pieChart, {
    type: 'pie',
    data: pie_data,
});


dataset_create();
window.myBar = new Chart(ctx_barChart, {
    type: 'bar',
    data: {
        labels: ["Monday", "Tuesday", "Wednsday", "Thursday", "Friday", "Saturday", "Sunday"],
        datasets: ds
    },
    options: {
        tooltips: {
            mode: 'label'
        },
        scales: {
            xAxes: [{
                stacked: true,
            }],
            yAxes: [{
                stacked: true
            }]
        }
    }
});

