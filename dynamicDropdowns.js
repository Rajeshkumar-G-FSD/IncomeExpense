// Mapping of countries to states and states to cities
const locationData = {
    IN: {
      Salary: ['Bank','others'],
      Saving: ['Chit', 'others'],
    },
    US: {
        Must: ['Shopping', 'Medical'],
      Optional: ['Movies', 'Entertainment'],
    },
  };
  
  // Update state options based on selected country
  function updateStates() {
    const countrySelect = document.getElementById('country');
    const stateSelect = document.getElementById('state');
    const citySelect = document.getElementById('city');
    
    const selectedCountry = countrySelect.value;
    const states = locationData[selectedCountry];
    
    stateSelect.innerHTML = '';
    citySelect.innerHTML = '';
  
    Object.keys(states).forEach(state => {
      const option = document.createElement('option');
      option.value = state;
      option.textContent = state;
      stateSelect.appendChild(option);
    });
    updateCities();
  }
  
  // Update city options based on selected state
  function updateCities() {
    const countrySelect = document.getElementById('country');
    const stateSelect = document.getElementById('state');
    const citySelect = document.getElementById('city');
    
    const selectedCountry = countrySelect.value;
    const selectedState = stateSelect.value;
    const cities = locationData[selectedCountry][selectedState];
    
    citySelect.innerHTML = '';
  
    cities.forEach(city => {
      const option = document.createElement('option');
      option.value = city;
      option.textContent = city;
      citySelect.appendChild(option);
    });
  }
  
  document.getElementById('country').addEventListener('change', updateStates);
  document.getElementById('state').addEventListener('change', updateCities);
  
  // Initial population of states and cities
  updateStates();
  