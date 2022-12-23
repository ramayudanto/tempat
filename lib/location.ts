export const getCoordinate = () => {
  const coordinates: any[] = [];
  navigator.geolocation.getCurrentPosition(
    (position: any) => {
      const crd = position.coords;
      const loc = [crd.latitude.toString(), crd.longitude.toString()];
      coordinates.push(loc[0]);
      coordinates.push(loc[1]);
    },
    (error: any) => {
      console.log(error);
    },
    {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    }
  );
  return coordinates;
};
