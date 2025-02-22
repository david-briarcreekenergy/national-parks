const getStates = async () => {
  return await fetch("./states.json")
    .then((response) => response.json())
    .catch((error) => console.log(`Error loading states: ${error}`));
};
