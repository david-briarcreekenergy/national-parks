// Retrieves data from the National Parks Service API

const apiKey = "IcW7adKobbotMCEGiN62ZXR2JIDVYkX5Dwfsdg0D";

const baseURL = "https://developer.nps.gov/api/v1/parks";

const options = {
  params: {
    api_key: apiKey,
  },
};

const getParks = async ({ start = 0, limit = 20, state = "" } = {}) => {
  return axios.get(
    `${baseURL}?stateCode=${state}&start=${start}&limit=${limit}`,
    options
  );
};

export { getParks };
