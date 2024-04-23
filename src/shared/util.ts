const HOST =
  process.env.NODE_ENV === "production"
    ? "https://wemade-wookiya1364s-projects.vercel.app/"
    : "http://localhost:3000";

const groupByKeys = <T extends Record<string, any>>(
  json: T[]
): Record<keyof T, T[keyof T][]> | boolean => {
  if(json === undefined) return false;

  return json.reduce((acc, curr) => {
    (Object.keys(curr) as Array<keyof T>).forEach((key) => {
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(curr[key]);
    });
    return acc;
  }, {} as Record<keyof T, T[keyof T][]>);
};

export { HOST, groupByKeys };
