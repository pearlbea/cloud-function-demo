// Initialize Firebase
var config = {
  apiKey: "xxx",
  authDomain: "cloud-function-demo-2c9f3.firebaseapp.com",
  databaseURL: "https://cloud-function-demo-2c9f3.firebaseio.com",
  projectId: "cloud-function-demo-2c9f3",
  storageBucket: "cloud-function-demo-2c9f3.appspot.com",
  messagingSenderId: "113186434363"
};
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
