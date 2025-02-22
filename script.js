const parksElement = document.getElementById("parks");

const popUpElement = document.getElementById("pop-up");

const popUpContent = document.getElementById("pop-up-content");

const selectStateElement = document.getElementById("state-select");

// used to set the start parameter for the getParks function
let start = 0;

// used to set the limit parameter for the getParks function
const limit = 20;

// let parks = [];

// when the user changes the state select element, retrieve the parks for that state
selectStateElement.addEventListener("change", (event) => {
  selectStateElement.blur();

  //remove any parks already listed
  parksElement.innerHTML = "";

  hidePaginationButtons();

  const state = event.target.value;

  getParks({ state: state }).then((parks) => {
    buildCards(parks.data.data);
    showPaginationButtons();
    disablePrevButton();
    disableNextButton(parks.data.data.length);
  });
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
          `;

  document.getElementById("pop-up-img-container").innerHTML = `
          <img src="${park.images[1].url}" alt="${park.images[1].altText}" />`;

  document.getElementById("park-url").href = park.url;
};

const openPopUp = () => {
  popUpElement.style.display = "block";
};

const closePopUp = () => {
  popUpElement.style.display = "none";
};

const getNextParks = () => {
  start += 20;
  parksElement.innerHTML = "";
  hidePaginationButtons();
  getParks({ start: start }).then((parks) => {
    buildCards(parks.data.data);
    showPaginationButtons();
    disablePrevButton();
    disableNextButton(parks.data.data.length);
  });
};

const getPrevParks = () => {
  if (start > 0) {
    start -= 20;
    parksElement.innerHTML = "";
    hidePaginationButtons();
    getParks({ start: start }).then((parks) => {
      buildCards(parks.data.data);
      showPaginationButtons();
      disablePrevButton();
      disableNextButton(parks.data.data.length);
    });
  }
};

const disablePrevButton = () => {
  const el = document.getElementById("previous");
  el.disabled = start === 0;
};

const disableNextButton = (parksLength) => {
  const el = document.getElementById("next");
  el.disabled = parksLength < limit;
};

const hidePaginationButtons = () => {
  const el = document.getElementById("pagination");
  el.style.display = "none";
};

const showPaginationButtons = () => {
  const el = document.getElementById("pagination");
  el.style.display = "block";
};

// hide the pagination initially until the parks are loaded
hidePaginationButtons();

//  retrieve the states from the states.json file
//  populate the state select element with the states from the states.json file
getStates().then((states) => {
  for (let key in states) {
    const option = document.createElement("option");
    option.value = key;
    option.textContent = states[key];
    selectStateElement.appendChild(option);
  }
});

//  retrieve the parks from the parksApi.js file
//  populate the parks element with the parks from the parksApi.js file
getParks().then((parks) => {
  buildCards(parks.data.data);
  showPaginationButtons();
  disablePrevButton();
  disableNextButton(parks.data.data.length);
});
