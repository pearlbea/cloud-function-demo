const admin = require("firebase-admin");
const functions = require("firebase-functions");

admin.initializeApp();

exports.addMessage = functions.https.onRequest((request, response) => {
  const message = request.query.text;
  return admin
    .firestore()
    .collection("messages")
    .add({ message })
    .then(writeResult => {
      return response.json({
        result: `Message id ${writeResult.id} was added.`
      });
    });
});

exports.makeUppercase = functions.firestore
  .document("/messages/{documentId}")
  .onCreate((snap, context) => {
    return doWork().then(() => {
      const message = snap.data().message;
      const uppercase = message.toUpperCase();
      return snap.ref.set({ uppercase }, { merge: true });
    });
  });

function doWork() {
  return new Promise(resolve => setTimeout(resolve, 4000));
}
