import { toast } from "react-toastify";
import { createShortUrl, updateUrlToCustom } from "../services/url.service";

const createCustomShortUrl = async (options) => {
  const { longUrl, customCode } = options;
  if (!longUrl) {
    toast.error("Long URL is required.");
    return;
  }
  const result = await createShortUrl({ longUrl });

  if (customCode && result?.data?.shortUrl?.shortCode) {
    try {
      const customResult = await updateUrlToCustom(
        result.data.shortUrl.shortCode,
        customCode
      );
      return customResult;
    } catch (error) {
      toast.error("Failed to set custom code, using auto-generated code.");
      console.error("Custom URL update error:", error);
      return result;
    }
  }

  return result;
};

export { createCustomShortUrl };
