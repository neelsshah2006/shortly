import API from "../provider/api.provider";

const getProfile = async () => {
  const data = await API.get("/user/profile");
  return data.user;
};

const updateProfile = async (profileData) => {
  const data = await API.patch("/user/update-profile", profileData);
  return data.user;
};

const changePassword = async (passwordData) => {
  const data = await API.patch("/user/change-password", passwordData);
  return data.user;
};

const getUserUrls = async () => {
  const data = await API.get("/user/get-links");
  return data.links;
};

export { getProfile, updateProfile, changePassword, getUserUrls };
