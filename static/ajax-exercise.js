'use strict';

// PART 1: SHOW A FORTUNE

function showFortune(evt) {
  // TODO: get the fortune and show it in the #fortune-text div
  fetch('/fortune')
    .then((response) => response.text())
    .then((serverData) => {
      console.log('')
      document.querySelector('#fortune-text').innerHTML = serverData
    })
}
  
document.querySelector('#get-fortune-button').addEventListener('click', showFortune);


// PART 2: SHOW WEATHER

function showWeather(evt) {
  evt.preventDefault();

  const zipcode = document.querySelector('#zipcode-field').value;
  const url = `/weather.json?zipcode=${zipcode}`;
  // TODO: request weather with that URL and show the forecast in #weather-info
  // we're returning a json object (like a dictionary in Python)
  // based on the zipcode number entered by the user, we're taking that entry and sending it back to the server 
  // then based on what we get back, we want to display the DEFAULT_WEATHER key ('forecast')  and also the value of that key 
    
  fetch(url)
      .then((response) => response.json())
      .then((serverData) => {
        //we only want the key/property at 'forecast' and we do not want temp
        console.log(serverData['forecast'])
        document.querySelector('#weather-info').innerHTML = serverData['forecast']
      })
  }

document.querySelector('#weather-form').addEventListener('submit', showWeather);
// PART 3: ORDER MELONS
  // TODO: show the result message after your form
  // TODO: if the result code is ERROR, make it show up in red (see our CSS!)

function updateMelons(results) {
  console.log('updateMelons has been hit')
  if (results.code === 'OK') {
    document.querySelector('#order-status').classList.remove('order-error');
    document.querySelector('#order-status').innerHTML = `<p>${results.msg}</p>`;
  } else {
    document.querySelector('#order-status').classList.add('order-error');
    document.querySelector('#order-status').innerHTML = `<p><b>${results.msg}</b></p>`;
  }
  }

function orderMelons(evt) {
  evt.preventDefault();
  console.log('orderMelons')
  const formInputs = {
    melon_type: document.querySelector('#melon-type-field').value,
    qty: document.querySelector('#qty-field').value,
  };
  console.log(formInputs)
  fetch('/order-melons.json', {
    method: 'POST',
    body: JSON.stringify(formInputs),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then(updateMelons);
  }
    
document.querySelector('#order-form').addEventListener('submit', orderMelons);