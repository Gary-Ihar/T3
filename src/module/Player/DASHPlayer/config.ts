//https://cdn.dashjs.org/latest/jsdoc/module-Settings.html
export const config = {
  streaming: {
    abr: {
      maxBitrate: { audio: 500, video: 3000 },
      minBitrate: { audio: 64, video: 500 },
      initialBitrate: { video: 1000 },
    },
  },
};
