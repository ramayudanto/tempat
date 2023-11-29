import CryptoJS from "crypto-js";

export function openTimeLogic(openingHours: any) {
  if (!openingHours) return "Unavailable";
  if (openingHours === "24") return "Open 24 Hour";
  const now = new Date();
  const [openStr, closeStr] = openingHours.split("\u2009–\u2009"); // Use unicode characters for the whitespace

  const [openHour, openMinute] = openStr.split(":").map(Number);
  let [closeHour, closeMinute] = closeStr.split(":").map(Number);

  if (closeHour < openHour || (closeHour === openHour && closeMinute < openMinute)) {
    closeHour += 24; // Convert closing time to next day if it's before opening time
  }

  const openTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), openHour, openMinute);
  let closeTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), closeHour, closeMinute);

  // return "Open Now" if current time is between openTime and closeTime;
  if (now >= openTime && now <= closeTime) {
    return "Open Now";
  } else {
    return "Closed";
  }
}

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

export const recentRestaurantHandler = (restaurant: any) => {
  const initialList = JSON.parse(decryptLocalStorage("recentSearchRestaurant") || "[]");
  if (!initialList.some((item: any) => item.gofood_name === restaurant.gofood_name)) {
    const recent = [restaurant, ...initialList];
    localStorage.setItem("recentSearchRestaurant", encryptAES(JSON.stringify(recent)));
  } else {
    const filtered = initialList.filter((item: any) => item.gofood_name !== restaurant.gofood_name);
    const recent = [restaurant, ...filtered];
    localStorage.setItem("recentSearchRestaurant", encryptAES(JSON.stringify(recent)));
  }
};

export function getMultipleRandom(arr: any[], num: number) {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  const reduced = shuffled.slice(0, num);

  return reduced;
}

export const decryptLocalStorage = (key: string) => {
  const encrypted = localStorage.getItem(key);
  const value = CryptoJS.AES.decrypt(String(encrypted), process.env.NEXT_PUBLIC_SECRET!).toString(CryptoJS.enc.Utf8);
  return value;
};
export const decryptAES = (encrypted: string) => {
  return CryptoJS.AES.decrypt(String(encrypted), process.env.NEXT_PUBLIC_SECRET!).toString(CryptoJS.enc.Utf8);
};

export const encryptAES = (key: string) => {
  return CryptoJS.AES.encrypt(key, process.env.NEXT_PUBLIC_SECRET!).toString();
};

export function getRandomElementsFromArray(array: any, count: any) {
  const shuffledArray = array.sort(() => Math.random() - 0.5);
  return shuffledArray.slice(0, count);
}

export function translateToK(number: number) {
  if (number >= 1000 && number < 1000000) {
    const thousands = Math.floor(number / 1000);
    return thousands + "K+";
  }

  // Handle cases where the number is outside the specified range
  return String(number);
}

export function translatePriceRange(number: number) {
  if (!number) return "$";
  const symbols = ["$", "$$", "$$$"];
  return symbols[number - 1];
}

export function translateOpeningHours(data: any) {
  if (!data) return [];
  const daysOfWeek = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];

  const output = daysOfWeek.map((day) => {
    const timeRange = data[day].split(" – ");
    const openTime = timeRange[0];
    const closeTime = timeRange[1];

    return {
      day: day,
      open_time: openTime,
      close_time: closeTime,
    };
  });

  return output;
}

type OpeningHours = {
  [key: string]: string;
};

export function isRestaurantOpen(hours: OpeningHours): string {
  // Get the current date and time
  const now = new Date();

  // Get the current day of the week and the previous day
  const days = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
  const today = days[now.getDay()];
  const yesterday = days[(now.getDay() + 6) % 7];

  // return unavailable if there are no opening hours
  if (!hours[today]) {
    return "Unavailable";
  }

  // If the place is open 24/7, return "Open"
  if (hours[today] === "24") {
    return "Open";
  }

  try {
    // Parse the opening and closing hours for today and yesterday
    const periodsToday = hours[today].split(",").map((period) => parseHours(period.trim()));
    const [openHourYesterday, closeHourYesterday] = parseHours(hours[yesterday]);

    // Create new date objects for the opening and closing times
    const closeYesterday = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1, closeHourYesterday);

    // If the current time is after yesterday's closing time and before today's first opening time, the place is closed
    if (now >= closeYesterday && now < periodsToday[0][0]) {
      return "Closed";
    }

    // Check each period today to see if the current time falls within it
    for (let i = 0; i < periodsToday.length; i++) {
      const [openToday, closeToday] = periodsToday[i];
      if (now >= openToday && now < closeToday) {
        return "Open";
      }
    }

    // If the current time doesn't fall within any of today's periods, the place is closed
    return "Closed";
  } catch (e) {
    return "Unavailable";
  }
}

function parseHours(hoursString: string): any {
  // If the place is open 24/7, return arbitrary opening and closing hours
  if (hoursString === "24") {
    return [new Date(), new Date()];
  }

  // Parse the opening and closing hours from the string
  const [openString, closeString] = hoursString.split("–").map((s) => s.trim());
  const [openHour, openMinute, openPeriod] = openString.split(/[:\s]/);
  const [closeHour, closeMinute, closePeriod] = closeString.split(/[:\s]/);

  // Convert the hours to 24-hour format
  const openHour24 = openPeriod === "PM" && openHour !== "12" ? parseInt(openHour) + 12 : parseInt(openHour);
  const closeHour24 = closePeriod === "PM" && closeHour !== "12" ? parseInt(closeHour) + 12 : parseInt(closeHour);

  // Get the current date and time
  const now = new Date();

  // Create new date objects for the opening and closing times
  const open = new Date(now.getFullYear(), now.getMonth(), now.getDate(), openHour24, parseInt(openMinute));
  let close = new Date(now.getFullYear(), now.getMonth(), now.getDate(), closeHour24, parseInt(closeMinute));

  // If the closing time is "12:00 AM", add a day to it
  if (closeHour24 === 0 && closeMinute === "00") {
    close.setDate(close.getDate() + 1);
  }

  return [open, close];
}

export function getCloseTimeForToday(openingHours: any) {
  // const now = new Date();
  // const currentDay = now.toLocaleDateString("en-US", { weekday: "long" });

  // const todayOpeningHours = openingHours.find((item: any) => item.day === currentDay);

  // if (todayOpeningHours) {
  //   return todayOpeningHours.closeTime;
  // }

  return "Closed today";
}

export function getTodaysOpeningHours(schedule: any) {
  const daysOfWeek = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
  const today = new Date().getDay(); // Get the current day (0 for Sunday, 1 for Monday, etc.)
  const todayName = daysOfWeek[today]; // Get the day name from the array

  return schedule[todayName];
}
