const getQRUrl = async (shortCode) => {
  const base = process.env.NEXT_PUBLIC_API_BASE_URL;
  const shortUrl = encodeURIComponent(`${shortCode}`);
  const url = `${base}/${shortUrl}`;
  return url;
};

export { getQRUrl };
