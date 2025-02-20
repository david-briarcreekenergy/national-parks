const getStates = async () => {
  return await fetch("./states.json")
    .then((response) => response.json())
    .catch((error) => console.log(`Error loading states: ${error}`));
};

// retrieve the states from the states.json file
getStates().then((states) => {
  //   populate the state select element with the states from the states.json file
  for (let key in states) {
    const option = document.createElement("option");
    option.value = key;
    option.textContent = states[key];
    document.getElementById("state-select").appendChild(option);
  }
});

const selectStateElement = document.getElementById("state-select");

const parksElement = document.getElementById("parks").appendChild(card);

selectStateElement.addEventListener("change", (event) => {
  const state = event.target.value;

  //remove any parks already listed
  parksElement.innerHTML = "";

  //use the state variable to fetch the state parks from the national park service API
  getParksByState(state).then((parkData) => {
    console.log(parkData.data.data);
    // populate the parks select element with the parks from the national park service API
    for (const park of parkData.data.data) {
      const card = document.createElement("div");
      card.classList.add("card");
      card.innerHTML = `
        <h3>${park.fullName}</h3>`;
      parksElement.appendChild(card);
    }
  });
});
