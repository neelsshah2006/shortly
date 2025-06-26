const getAccountAge = (createdAt) => {
  const now = new Date();
  const created = new Date(createdAt);
  const diffMs = now - created;

  const seconds = Math.floor(diffMs / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const years = Math.floor(days / 365);

  return { years, days };
};

export { getAccountAge };
