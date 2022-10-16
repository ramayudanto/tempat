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
  const now = new Date();

  if (now.getHours() < new Date(close).getHours() && now.getMinutes() < new Date(close).getMinutes() && now.getHours() > new Date(open).getHours() && now.getMinutes() > new Date(open).getMinutes()) {
    return "Open now";
  } else {
    return "Closed";
  }
};

export const priceLogic = (priceRange: String) => {
  const array = priceRange.split("/");
  return `Rp${Number(array[0]).toLocaleString("de-DE")} for two`;
};
