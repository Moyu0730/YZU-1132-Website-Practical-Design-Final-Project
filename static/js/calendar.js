let day_count = 1;

function init_calendar(){

    var calendar_canvas = document.getElementById("calendar-canvas");
    if (!calendar_canvas) {
        console.error("Calendar canvas not found.");
        return;
    }
}

function add_day(){

    var calendar_canvas = document.getElementById("calendar-canvas");
    if (!calendar_canvas) {
        console.error("Calendar canvas not found.");
        return;
    }

    var day = document.createElement("div");
    day.className = "day";
    day.innerHTML = "New Day";
    day.id = "day-" + day_count;
    calendar_canvas.appendChild(day);

}

function add_event(day_id, event_text){
    var day = document.getElementById(day_id);
    if (!day) {
        console.error("Day not found: " + day_id);
        return;
    }
    var events_container = day.querySelector('.events');
    if (!events_container) {
        events_container = document.createElement("div");
        events_container.className = "events";
        day.appendChild(events_container);
    }
    var event = document.createElement("div");
    event.className = "event";
    event.innerText = event_text;
    events_container.appendChild(event);

}
