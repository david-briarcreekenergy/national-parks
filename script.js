const parksElement = document.getElementById("parks");

const popUpElement = document.getElementById("pop-up");

const popUpContent = document.getElementById("pop-up-content");

const selectStateElement = document.getElementById("state-select");

let parks = [];

getParks().then((parks) => {
  parks = parks.data.data;
  console.log(parks);
  buildCards(parks);
});

// retrieve the states from the states.json file
getStates().then((states) => {
  //   populate the state select element with the states from the states.json file
  for (let key in states) {
    const option = document.createElement("option");
    option.value = key;
    option.textContent = states[key];
    selectStateElement.appendChild(option);
  }
});

// when the user changes the state select element, retrieve the parks for that state
selectStateElement.addEventListener("change", (event) => {
  //remove any parks already listed
  parksElement.innerHTML = "";

  const state = event.target.value;

  getParks(0, 20, state).then((parks) => {
    // parks = parks.data.data;
    // console.log(parks);
    buildCards(parks.data.data);
  });

  // filtered = parks.filter((park) => {
  //   return park.states.includes(state);
  // });

  // buildCards(filtered);
});

const buildCards = (parks) => {
  for (const park of parks) {
    const card = buildParkCard(park);
    parksElement.appendChild(card);
  }
};

const buildParkCard = (park) => {
  const card = document.createElement("div");
  card.classList.add("card");
  card.innerHTML = `
        <h3>${park.fullName}</h3>
        <img src="${park.images[0].url}" alt="${park.images[0].altText}" />`;

  card.addEventListener("click", () => {
    buildPopUp(park);
    openPopUp();
  });

  return card;
};

const buildPopUp = (park) => {
  document.getElementById("pop-up-info").innerHTML = `
          <h3>${park.fullName}</h3>
          <p>${park.description}</p>
          <p><a target="_blank" href="${park.url}">${park.url}</a></p>
          `;

  document.getElementById("pop-up-img-container").innerHTML = `
          <img src="${park.images[1].url}" alt="${park.images[1].altText}" />`;
};

const openPopUp = () => {
  popUpElement.style.display = "block";
};

const closePopUp = () => {
  popUpElement.style.display = "none";
};
