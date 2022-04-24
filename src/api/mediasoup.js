exports.testChannel = (req, res) => {
  res.json({
    result: true,
    data: new Date().toLocaleString(),
  });
};

exports.getRtp = (req, res) => {
  res.json({
    test: "pass",
  });
};
