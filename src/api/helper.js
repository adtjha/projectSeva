exports.verifyContents = ({ channel }) => {
  return new Promise((resolve, reject) => {
    Object.keys(channel).forEach((key) => {
      if (!channel[key]) reject(`${key} missing`);
    });
    console.log(`Nothing missing`);
    resolve(channel);
  });
};
