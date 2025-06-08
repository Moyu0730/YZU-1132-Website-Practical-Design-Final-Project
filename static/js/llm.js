// llm.js
// 顯示訊息並捲動
function appendToTalkBox(text) {
    console.log("Appending text:", text);
    const newLine = `<div>${text}</div>`;
    $("#talkBox").append(newLine);
    let talkBox = $("#talkBox")[0];
    if (talkBox) {
        talkBox.scrollTop = talkBox.scrollHeight;
    } else {
        console.error("talkBox element not found!");
    }
}