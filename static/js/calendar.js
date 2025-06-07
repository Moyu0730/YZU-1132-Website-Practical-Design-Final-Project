function getTimeStamp() {
    let date = new Date();
    let hours = String(date.getHours()).padStart(2, '0');
    let minutes = String(date.getMinutes()).padStart(2, '0');
    let seconds = String(date.getSeconds()).padStart(2, '0');
    return `${hours}:${minutes}:${seconds} `;
}

function getDay(){
    let current_date = document.getElementById("calendar-date");
    let parts = current_date.textContent.split(" ");
    day_count = parseInt(parts[parts.length - 1]);
    console.log("Current day count: " + day_count);
}

function setDay(){
    let current_date = document.getElementById("calendar-date");
    if (!current_date) {
        console.error("Calendar date element not found.");
        return;
    }
    let parts = current_date.textContent.split(" ");
    parts[parts.length - 1] = day_count.toString();
    current_date.textContent = parts.join(" ");
    console.log("Updated day count: " + day_count);
}

function init_calendar(){

    let calendar_canvas = document.getElementById("calendar-canvas");
    if (!calendar_canvas) {
        console.error("Calendar canvas not found.");
        return;
    }

    day_count = 0;
    add_day();
}

function add_day(){

    let calendar_canvas = document.getElementById("calendar-canvas");
    if (!calendar_canvas) {
        console.error("Calendar canvas not found.");
        return;
    }

    let day = document.createElement("div");
    day_count += 1;

    // 取得今天日期
    let today = new Date();
    let dateStr = `${today.getFullYear()}-${String(today.getMonth()+1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;

    day.className = "day";
    day.innerHTML = `Day ${day_count} (${dateStr})<br><div class='events'></div>`;
    day.id = "day-" + day_count;
    calendar_canvas.appendChild(day);
    setDay();
}

function add_event(event_text){
    let time = new Date();
    day_id= day_count > 0 ? "day-" + day_count : "day-1";
    let day = document.getElementById(day_id);
    if (!day) {
        console.error("Day not found: " + day_id);
        return;
    }
    let events_container = day.querySelector('.events');
    if (!events_container) {
        events_container = document.createElement("div");
        events_container.className = "events";
        day.appendChild(events_container);
    }
    let event = document.createElement("div");
    event.className = "event";
    event.innerText = getTimeStamp().toString() + event_text;
    events_container.appendChild(event);
}
