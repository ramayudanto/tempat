export const ratingCounter = (rating: any) => {
  let finalRating: number = 0;
  rating.forEach((rate: any) => {
    finalRating += rate.rate;
  });
  return Number(finalRating / rating.length).toFixed(1);
};

export const openTimeLogic = (open: any, close: any) => {
  //   const openHours = `${new Date(open).getHours()}${new Date(open).getMinutes()}`
  //   const closeHours = `${new Date(close).getHours()}${new Date(open).getMinutes()}`
  const openTime = new Date(open);
  const closeTime = new Date(close);
  const nowHour = new Date().getHours();
  const nowMin = new Date().getMinutes();
  const nowISOFormat = new Date(`1970-01-01T${String(nowHour).length === 1 ? `0${nowHour}` : nowHour}:${nowMin}:00.000Z`);

  if (nowISOFormat > openTime && nowISOFormat < closeTime) {
    return "Open now";
  } else {
    return "Closed";
  }
};

export const priceLogic = (priceRange: String) => {
  // const array = priceRange.split("/");
  // return `Rp${Number(array[0]).toLocaleString("de-DE")} for two`;
  return `Rp${priceRange} for two`;
};

export const truncate = (str: String, n: number) => {
  return str?.length > n ? str.substr(0, n - 1) + ".." : str;
};

export const featureLogic = (feature: String) => {
  const splitString = feature.split(/(?=[A-Z])/);
  // splitString.forEach((item: any) => {
  //   item.charAt(0).toUpperCase() + item.slice(1);
  // });
  let name: String = "";
  for (let i = 0; i < splitString.length; i++) {
    // console.log(splitString[i]);
    name += splitString[i];
    name += " ";
  }
  return name;
};
