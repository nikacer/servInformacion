const NodeGeocoder = require("node-geocoder");

const options = {
  provider: "google",
  apiKey: "AIzaSyBWI8uBXi9BYz7GdZB55tDYeHiV5TlyTVI",
  formatter: null,
};

const geocoder = NodeGeocoder(options);

export const obtenerCoordenadas = async (direccion: string) => {
  try {
    const coordenadas = await geocoder.geocode(direccion);
    if (coordenadas[0].latitude && coordenadas[0].longitude) {
      return {
        lat: coordenadas[0].latitude,
        lng: coordenadas[0].longitude,
      };
    } else {
      throw "Dirección incorrecta";
    }
  } catch (err) {
    return err;
  }
};
