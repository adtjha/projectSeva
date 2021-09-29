export const guid = () => {
  let t = "",
    l = 4;
  for (let i = 0; i < l; i++) {
    t +=
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".charAt(
        ~~(Math.random() * 62)
      );
  }
  return t;
};
