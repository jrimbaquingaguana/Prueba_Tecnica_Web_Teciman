export const buildChartData = (records) => {
  if (!Array.isArray(records)) return [];

  return [...records]
    .slice()
    .reverse()
    .map((record, index) => ({
      index: index + 1,
      ph: Number(record.ph),
      ethanol: Number(record.ethanol),
      density: Number(record.density),
      created_at: record.created_at,
    }));
};