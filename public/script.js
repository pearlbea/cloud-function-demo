var config = require("config.js");

firebase.initializeApp(config);
const db = firebase.firestore();

(() => {
  const log = document.querySelector("#log");

  function onClick() {
    let input = document.querySelector("input");
    fetch(
      `https://us-central1-cloud-function-demo-2c9f3.cloudfunctions.net/addMessage?text=${
        input.value
      }`,
      {
        mode: "no-cors"
      }
    ).then(res => {
      input.value = "";
    });
  }

  function sub() {
    db.collection("messages").onSnapshot(function(query) {
      clearLog();
      for (const doc of query.docs) {
        const data = doc.data();
        appendLog(`${data.message} => ${data.uppercase || "pending"}`);
      }
    });
  }

  function appendLog(text) {
    const div = document.createElement("div");
    div.innerText = text;
    log.appendChild(div);
  }

  function clearLog() {
    log.innerHTML = "";
  }

  let button = document.querySelector("button");
  button.addEventListener("click", onClick);

  sub();
})();
