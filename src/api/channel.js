const { db } = require("../..");
const { verifyContents } = require("../../helper");

exports.testChannel = (req, res) => {
  res.json({
    result: true,
    data: new Date().toLocaleString(),
  });
};

exports.getChannel = (req, res) => {
  const id = req.body.id;

  const snapshot = id
    ? db.collection("channel").doc(id).get()
    : db.collection("channel").limit(10).get();

  snapshot
    .then((doc) => res.status(200).json({ ...doc.data() }))
    .catch((err) =>
      res.status(400).json({
        success: false,
        message: `Missing/Incorrect Id : ${err}`,
        error_code: 102,
        data: {},
      })
    );
};

exports.postChannel = (req, res) => {
  const channel = req.body;
  verifyContents({ channel })
    .then(() => {
      console.log("Resolved");
      db.collection("channel")
        .add({ ...channel })
        .then((resp) =>
          res.status(200).json({
            success: true,
            message: "Channel created successfully.",
            data: {
              [resp.id]: { ...channel },
            },
          })
        )
        .catch((error) => {
          console.log(`"Rejected 2" : ${error}`);
          res.status(400).json({
            success: false,
            message: `Error creating channel: ${err}`,
            error_code: 101,
            data: {},
          });
        });
    })
    .catch((err) => {
      res.status(400).json({
        success: false,
        message: `Missing/Incorrect Data : ${err}`,
        error_code: 102,
        data: {},
      });
    });
};

exports.deleteChannel = (req, res) => {
  const id = req.body.id;

  const snapshot = db.collection("channel").doc(id).delete();

  snapshot
    .then(() =>
      res.status(200).json({
        success: true,
        message: "Channel deleted successfully",
        error_code: 102,
        data: {},
      })
    )
    .catch((err) =>
      res.status(400).json({
        success: false,
        message: `Missing/Incorrect Id : ${err}`,
        error_code: 102,
        data: {},
      })
    );
};
