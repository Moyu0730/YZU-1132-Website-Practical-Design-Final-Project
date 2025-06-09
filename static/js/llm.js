// llm.js
// 顯示訊息並將最新內容置於最上方
function appendToTalkBox(text) {
    console.log("Prepending text:", text);
    const newLine = `<div>${text}</div>`;
    $("#talkBox").prepend(newLine);
}