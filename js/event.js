function Event(name, type, description, startTimePlanned, endTimePlanned, guid){
    this.name = name;
    this.description = description;
    this.type = type;
    this.startTimePlanned = startTimePlanned;
    this.endTimePlanned = endTimePlanned;
    this.guid = guid;
    //this.startTimeActual = startTimeActual;
    //this.endTimeActual = endTimeActual;
}

function handler(e) {
    return function() {
        $('#inputEventName').val(e.name);
        $('#inputEventDesc').val(e.description);
        $('#inputEventType').val(e.type);
        $('#inputEventStartTimePlanned').val(e.startTimePlanned);
        $('#inputEventEndTimePlanned').val(e.endTimePlanned);
        $('#add-event').modal('show');
        $('#btnDelete').on('click', function() {
            Events.delete(e.guid);
        }).show();
        $('#btnSave').hide();
    };
}

Event.prototype.draw = function(){
    if($('#'+this.guid).length == 0){
        var res = new getTablePosition(this.startTimePlanned.format('H'),this.startTimePlanned.minutes(), this.startTimePlanned.format('e'), this.endTimePlanned.format('H'), this.endTimePlanned.format('m')) ;
        if(Array.isArray(res)) {
            $("body").append(
                "<div id=\'" + this.guid + "\' class=\'event " + this.type + "\'>" +
                "<p>" +  this.startTimePlanned.format('HH:mm') + "-" + this.endTimePlanned.format('HH:mm') + "</p>"+
                "<p>" + this.name + "</p>"+
                "<p class=\"desc\">" + this.description + "</p>"+
                "</div>");
            console.log(this.guid);
            lastGuid = this.guid;
            $('#'+this.guid+'').css({left: res[0] ,top: res[1]})
                .css('width', $('.monday').css('width'))
                .css('height', res[2])
                .css({position: "absolute"});
        }
        $('#'+this.guid).on('click', handler(this));

    } else {
        var res = new getTablePosition(this.startTimePlanned.format('H'),this.startTimePlanned.minutes(), this.startTimePlanned.format('e'), this.endTimePlanned.format('H'), this.endTimePlanned.format('m')) ;
        $('#'+this.guid+'').css({left: res[0] ,top: res[1]})
            .css('width', $('.monday').css('width'))
            .css('height', res[2]);
    }
}

Event.prototype.edit = function(){
    //TODO: Изменение ивента (посути тоже подвзка на фронтэнд)
}

var TypeEnum = {
    Work: 'Work',
    Studies: 'Studies',
    Social: 'Social',
    Health: 'Health',
    Chill: 'Chill',
}

var Events = {
    list: [], //Массив всех ивентов
    guid: 0,



    add: function(event){
        this.list.push(event);
        Events.save();
    },
    save: function(){ //save to localStorage
        window.localStorage.setItem('events', JSON.stringify(Events.list));
        window.localStorage.setItem('guid', JSON.stringify(lastGuid + 1));
        console.log("last-guid:" + lastGuid);
        //window.localStorage.setItem('guid', JSON.stringify(Events.guid+1));
    },
    delData: function(){

        window.localStorage.removeItem('events');
        window.localStorage.removeItem('guid');

    },
    load: function(){ //load from localStorage
        var loadedEvents = JSON.parse(window.localStorage.getItem('events')); //get load obj from cookies
        if(loadedEvents != null){
            Events.list = [];
            loadedEvents.forEach(function(e){
                Events.add(new Event(e.name, e.type, e.description, moment(e.startTimePlanned), moment(e.endTimePlanned), e.guid));
                lastGuid = e.guid;
            });
            //this.guid = loadedEvents.guid;
        }
        if(window.localStorage.getItem('guid') != null){
            this.guid = parseInt(window.localStorage.getItem('guid'));
            lastGuid = this.guid;
            console.log('LOG');
        }
        Events.draw();

    },
    draw: function(){
        this.list.forEach(function(element) {
            element.draw();
        });
    },
    weekStats: function(week){ ///TODO
        var types = [];
        function TypeResult(name, count){
            this.name = name;
            this.count = count;
        }
        for(var t in TypeEnum){
            types.push(new TypeResult(t.toString(), 0));
        }
        this.list.forEach(function(element){
            if(element.startTimePlanned.week() == week){
                types.forEach(function(typeel){
                    console.log(element.type.toString());
                    if(element.type.toString() == typeel.name){
                        typeel.count++;
                    }
                })
            }
        });
        return types;
    },
    dayStats: function (day) {///TODO
        var types = [];
        function TypeResult(name, count){
            this.name = name;
            this.count = count;
        }
        for(var t in TypeEnum){
            types.push(new TypeResult(t.toString(), 0));
        }
        this.list.forEach(function(element){
            if(element.startTimePlanned.weekday() == day){
                types.forEach(function(typeel){
                    console.log(element.type.toString());
                    if(element.type.toString() == typeel.name){
                        typeel.count++;
                    }
                })
            }
        });
        return types;
    },
    countOfType: function(type) {
        var count = 0;
        this.list.forEach(function(element){
            if(type == element.type){
                count++;
            }
        });
        return count;
    },
    countOfTypeAtDay: function(type, day) {
        var count = 0;
        this.list.forEach(function(element){
            if(element.startTimePlanned.weekday() == day){
                if(type == element.type){
                    count++;
                }
            }
        });
        return count;
    },
    count: function(){
        return this.list.length;
    },
    delete: function(guid){
        if (guid > -1) {
            this.list.splice(guid-Events.guid, 1);
            $('#'+ guid).remove();
            Events.save();
            console.log('l');
            console.log("Events-Guid:" + Events.guid);
            console.log(Events.list);

        }
    }
}


/*
 * getTablePosition(int _x, int _y)
 * Returns position of Element(x,y) using input col and row
 */

function getTablePosition(hour, mins, weekDay, destHour, destMin)
{
    if((hour < 8) || (hour > 20)) {
        // TODO:there must be a specific situation for this
        return 0;
    } else {

        var lenH =  destHour - hour;
        //var lenM = (destMin - mins)/ 60;
        hour = hour - 8+1;
    }

    if($('#calendar').length == 0){
        return 0;
    }
    var defHeight =  $('#calendar tr:eq('+ hour +') td:eq('+ weekDay + ')').height();
    //var defWidth = $('#calendar tr:eq('+ hour +') td:eq('+ weekDay + ')').width();
    //var maxRow = $('#calendar tr').length;

    var pos = $('#calendar tr:eq('+ hour +') td:eq('+ (weekDay) + ')').position();
    var table_pos =  $('#calendar').offset();
    var offY = $('#calendar tr:eq('+ hour +') td:eq('+ (weekDay) + ')').css('padding-bottom');
    var offX = $('#calendar tr:eq('+ hour +') td:eq('+ (weekDay) + ')').css('padding-right');

    var x = pos.left + table_pos.left - 14;// - 8;
    var y = pos.top + table_pos.top + (((defHeight/60) * mins));//(parseInt(offY)/2);
    var height = (37 * lenH);

    var ret_arr =[x, y, height];
    return ret_arr;
}

Events.load();
Events.draw();
