var day_count = 0;

function getTimeStamp() {
    // console.log("getTimeStamp() Called");

    let date = new Date();
    let year = date.getFullYear();
    let month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    let day = String(date.getDate()).padStart(2, '0');
    let hours = String(date.getHours()).padStart(2, '0');
    let minutes = String(date.getMinutes()).padStart(2, '0');
    let seconds = String(date.getSeconds()).padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

function get_day_count(){
    // console.log("get_daycount() Called");
    // console.log("day_count", day_count);

    return day_count;
}

function init_calendar(){
    // console.log("init_calendar() Called");

    let calendar_canvas = document.getElementById("calendar");
    if (!calendar_canvas) {
        console.error("There doesn't exist Calendar");
        return;
    }

    day_count = 0;
    add_day();
}

function add_day(){
    // console.log("add_day() Called");

    day_count += 1;

    let calendar_canvas = document.getElementById("calendar");

    if( !calendar_canvas ){
        console.warn("There doesn't exist Calendar");
        return;
    }

    let day = document.createElement("div");

    if( day_count != 1 ){
        let br = document.createElement("br");
        calendar_canvas.prepend(br);
    }

    day.innerHTML += `
        <p style="font-family: 'Playfair Display', Times, serif; text-align: center; font-size: 40px; color: #666;">Day ${day_count}</p>
        <hr style="border: none; border-top: 1px dashed;">
        <div style="padding-top: 10px; padding-left: 20px;"></div>`;
    day.id = "day-" + day_count;
    calendar_canvas.prepend(day);
}

function add_message( event_text ){
    // console.log("add_event() Called");

    day_id = day_count > 0 ? "day-" + day_count : "day-1";
    let day = document.getElementById(day_id);

    if( !day ){
        console.warn("There doesn't exist Day Container");
        return;
    }

    let events_container = day.querySelector("div");
    
    if( !events_container ){
        events_container = document.createElement("div");
        events_container.className = "padding-top: 10px;";
        day.appendChild(events_container);
    }
    
    let event = document.createElement("div");
    event.innerHTML = `
        <div>
            <div class="calendar-message text--white">${event_text}</div>
            <div class="footer-text">${getTimeStamp().toString()} Message Sent</div>
        </div>
    `;
    events_container.prepend(event);
}
