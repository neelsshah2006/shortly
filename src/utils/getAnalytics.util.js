const getAnalytics = (clicks) => {
  const totalClicks = clicks.length;
  const clicksByContinent = clicksByField(clicks, "continent");
  const clicksByCountry = clicksByField(clicks, "country");
  const clicksByState = clicksByField(clicks, "state");
  const clicksByCity = clicksByField(clicks, "city");
  const clicksByDevice = clicksByField(clicks, "device");
  const clicksByBrowser = clicksByField(clicks, "browser");
  const clicksByOs = clicksByField(clicks, "os");
  const clicksByTime = clicksByTimeRange(clicks);

  return {
    totalClicks,
    clicksByContinent,
    clicksByCountry,
    clicksByState,
    clicksByCity,
    clicksByDevice,
    clicksByBrowser,
    clicksByOs,
    clicksByTime,
  };
};

const clicksByField = (clicks, fieldName) => {
  const fieldClicks = {};

  clicks.forEach((click) => {
    let field = click[fieldName];
    if (!field || typeof field !== "string") {
      field = "Unknown";
    }
    field = field.trim();
    fieldClicks[field] = (fieldClicks[field] || 0) + 1;
  });

  return fieldClicks;
};

const clicksByTimeRange = (clicks) => {
  const clicksByTime = {};
  clicks.forEach((click) => {
    const date = new Date(click.createdAt);
    const hour = date.getHours();
    if (!clicksByTime[hour]) {
      clicksByTime[hour] = 0;
    }
    clicksByTime[hour]++;
  });
  return clicksByTime;
};

export { getAnalytics };
