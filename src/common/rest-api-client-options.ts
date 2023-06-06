export const restAPIClientOptions = {
  baseUrl: process.env.KINTONE_BASE_URL || "",
  username: process.env.KINTONE_USERNAME || "cybozu",
  password: process.env.KINTONE_PASSWORD || "cybozu",
  httpsProxy: process.env.HTTPS_PROXY ?? process.env.https_proxy,
};
