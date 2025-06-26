import API from "../provider/api.provider";

const createShortUrl = async (urlData) => {
  const data = await API.post("/url/shorten", urlData);
  return data.shortUrl;
};

const deleteUrl = async (shortCode) => {
  const data = await API.delete(`/url/delete?shortCode=${shortCode}`);
  return data.deletedUrl;
};

const updateUrlToCustom = async (existingCode, customCode) => {
  const data = await API.patch("/url/custom-url", {
    existingCode,
    customCode,
  });
  return data.shortUrl;
};

const getUrlStats = async (shortCode) => {
  return await API.get(`/url/stats?shortCode=${shortCode}`);
};

export { createShortUrl, deleteUrl, updateUrlToCustom, getUrlStats };
