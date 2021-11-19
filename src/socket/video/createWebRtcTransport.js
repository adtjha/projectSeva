const { webRtcTransport_options } = require("../../constant");

const createWebRtcTransport = async (router) => {
  return new Promise(async (resolve, reject) => {
    try {
      let transport = await router.createWebRtcTransport(
        webRtcTransport_options
      );
      console.log(`transport id: ${transport.id}`);

      transport.on("dtlsstatechange", (dtlsState) => {
        if (dtlsState === "closed") {
          transport.close();
        }
      });

      transport.on("close", () => {
        console.log("transport closed");
      });

      resolve(transport);
    } catch (error) {
      reject(error);
    }
  });
};

exports.createWebRtcTransport = createWebRtcTransport;
