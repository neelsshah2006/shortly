const getMilliseconds = (filterTime) => {
  const num = parseInt(filterTime);
  const unit = filterTime.slice(-1);

  switch (unit) {
    case "h":
      return num * 60 * 60 * 1000;
    case "d":
      return num * 24 * 60 * 60 * 1000;
    case "y":
      return num * 365 * 24 * 60 * 60 * 1000;
    default:
      return 0;
  }
};

export { getMilliseconds };
