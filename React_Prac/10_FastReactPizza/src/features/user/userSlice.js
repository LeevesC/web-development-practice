import { createSlice } from "@reduxjs/toolkit";
import { getAddress } from "../../services/apiGeocoding";

function getPosition() {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}

export async function fetchAddress() {
  // 1) We get the user's geolocation position
  const positionObj = await getPosition();
  const position = {
    latitude: positionObj.coords.latitude,
    longitude: positionObj.coords.longitude,
  };
  // 2) Then we use a reverse geocoding API to get the address of the user
  const addressObj = await getAddress(position.latitude, position.longitude);
  const address = `${addressObj?.locality}, ${addressObj?.city}, ${addressObj?.postcode}, ${addressObj?.countryName}`;
  // 3) Return the position and address, which will be in the payload property
  return { position, address };
}

const initialState = {
  username: "",
  status: "idle",
  address: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateName: (state, action) => {
      state.username = action.payload;
    },
    updateAddress: (state, action) => {
      state.address = action.payload;
    },
  },
});

export const { updateName, updateAddress } = userSlice.actions;
export default userSlice.reducer;
