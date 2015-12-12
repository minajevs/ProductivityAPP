function Event(name, type, description, startTimePlanned, endTimePlanned, startTimeActual, endTimeActual){
    this.name = name;
    this.description = description;
    this.type = type;
    this.startTimePlanned = startTimePlanned;
    this.endTimePlanned = endTimePlanned;
    //this.startTimeActual = startTimeActual;
    //this.endTimeActual = endTimeActual;
}

Event.prototype.draw = function(){
    //TODO: Отрисовка блока ивента (подвязка на фронтэнд)

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

    add: function(event){
        this.list.push(event);
    },
    save: function(){ //save to localStorage
        window.localStorage.setItem('events', JSON.stringify(this));
    },
    load: function(){ //load from localStorage
        var loadedEvents = JSON.parse(window.localStorage.getItem('events')); //get load obj from cookies
        if(loadedEvents != null){
            $.extend(true,this,loadedEvents); //Deep-merge load into Event obj
        }
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
    count: function(){
        return this.list.length;
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
}


/*
 * getTablePosition(int _x, int _y)
 * Returns position of Element(x,y) using input col and row
 */

function getTablePosition(hour, mins, weekDay)
{
    //var timeObj = moment();
    //var hour = 13;
    if((hour < 8) &&(hour > 20)) {
        // TODO:there must be a specific situation for this
        return 0;
    } else {
        hour = hour - 8+1;
    }
    //var mins = 59; //timeObj.minutes();
    //var weekDay = 1;//timeObj.weekday();

    var defHeight =  $('#calendar tr:eq('+ hour +') td:eq('+ weekDay + ')').height();
    var defWidth = $('#calendar tr:eq('+ hour +') td:eq('+ weekDay + ')').width();
    var maxRow = $('#calendar tr').length;
    console.log("hour=" + hour + " mins" + mins + " weekday" + weekDay + " height" + defHeight + "width" + defWidth + "countRow" + maxRow);
    var pos = $('#calendar tr:eq('+ hour +') td:eq('+ (weekDay) + ')').position();
    var offY = $('#calendar tr:eq('+ hour +') td:eq('+ (weekDay) + ')').css('padding-bottom');
    var offX = $('#calendar tr:eq('+ hour +') td:eq('+ (weekDay) + ')').css('padding-right');
    console.log("x=" + offX + " y=" + offY);
    var x = pos.left + 2;// - 8;
    var y = pos.top + 2 + (((defHeight/60) * mins));
    var ret_arr =[x, y];
//        alert("LEFT:" + x + " TOP" + y);
//        alert($('#tabler tr:eq('+ _x +') td:eq('+ _y + ')').html());
    return ret_arr;
}




