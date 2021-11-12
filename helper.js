exports.verifyContents = ({ channel }) => {
  if (channel) {
    return new Promise((resolve, reject) => {
      Object.keys(channel).forEach((key) => {
        if (!channel[key]) reject(`${key} missing`);
      });
      resolve(channel);
    });
  }
};
