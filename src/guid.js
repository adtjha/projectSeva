const guid = () => {
  let t = "",
    l = 4;
  for (let i = 0; i < l; i++) {
    t +=
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".charAt(
        ~~(Math.random() * 62)
      );
  }
  t = "a" + t;
  return t;
};

exports.guid = guid;

exports.verifyGUID = (guid) => {
  var tests = [];

  // test 01 : must be four digit
  tests.push(guid.length === 4);

  // test 02 : must have char. in 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  tests.push(
    guid.split("").every((e) => {
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".indexOf(
        e
      ) !== -1;
    })
  );

  return tests.every((e) => e);
};
