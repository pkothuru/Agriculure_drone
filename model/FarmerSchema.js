import { Schema, model, models } from "mongoose";

const farmerSchema = new Schema({
  accountRegistered: {
    type: Boolean,
    default: false,
  },
  fullName: String,
  email: String,
  phoneNumber: String,
  gender: String,
  birthday: String,
  farmInfo: {
    name: String,
    city: String,
    country: String,
    zipCode: String,
    plotType: String,
    location: {
      lat: String,
      lng: String,
    },
  },
  cardInfo: {
    cardName: String,
    cardNumber: String,
    cardCVV: String,
    cardEXP: String,
  },
  bookings: [
    {
      paid: {
        type: Boolean,
        default: false,
      },
      farm: String,
      farmLand: String,
      farmType: String,
      flightDetails: {
        startDate: String,
        endDate: String,
        duration: Number,
        pilotID: String,
      },
      selectedDrone: {
        droneID: String,
        brand: String,
        title: String,
        weight: String,
        description: String,
        equipment: String,
        flightSpeed: String,
        imageUrl: String,
        price: Number,
        quality: String,
        service: String,
        cameraSpecs: {
          lens: String,
          operatingRange: String,
          sensor: String,
          shutterSpeed: String,
        },
        flightParams: {
          flightTime: String,
          maxServiceCeiling: String,
          maxSpeed: String,
          windResistance: String,
          flightSpeed: String,
        },
        imageSpecs: {
          imageResolution: String,
          recordingRate: String,
          videoResolution: String,
        },
        thermalSensingSpace: {
          fov: String,
          measuringFreq: String,
          sensoryRange: String,
        },
      },
      cardDetails: {
        cardName: String,
        cardNumber: String,
        cvv: String,
        exp: String,
      },
    },
  ],
});

const Farmers = models.farmer || model("farmer", farmerSchema);

export default Farmers;
