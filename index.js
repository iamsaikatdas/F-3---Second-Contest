const show_details = document.querySelector("#show-details");
const addressNotFound = document.querySelector(".address-notfound");

// let addressInput = document.getElementById("addressInput").value;
const addressInputBtn = document.querySelector("#btn");

// console.log(addressInput);

const API_KEY = "e3b6f5f7ea5c40098c497fd59f8457bf";
addressInputBtn.addEventListener("click", () => {
  let addressInput = document.getElementById("addressInput").value;
  const address = addressInput;

  fetch(
    `https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(
      address
    )}&apiKey=${API_KEY}`
  )
    .then((resp) => resp.json())
    .then((geocodingResult) => {
      console.log(geocodingResult);
      // if (geocodingResult.features[0].length !== 0) {
      if (geocodingResult?.features[0]?.properties !== undefined) {
        show_details.style.display = "block";

        let data = geocodingResult?.features[0]?.properties;

        show_details.innerHTML = `
      <h1 style="width: 35%; margin: 30px auto">Your result</h1>
      <div class="adr">
        <div class="adr-details show-adr-details">
          <p>Name of the Zone : ${data.timezone.name}</p>
          <div style="display: flex">
            <p style="margin-right: 30px">Lat: ${data.lat}</p>
            <p>Long: ${data.lon}</p>
          </div>
          <p>Offset STD: ${data.timezone.offset_STD}</p>
          <p>Offset DST: ${data.timezone.offset_DST}</p>
          <p>Offset DST Seconds: ${data.timezone.offset_DST_seconds}</p>
          <p>Country: ${data.country}</p>
          <p>Postcode: ${data.postcode}</p>
          <p>City: ${data.city}</p>
        </div>
      </div>
      
      `;
      } else {
        addressNotFound.classList.add("address-found");
        show_details.style.display = "none";
      }
    });
});

// address-found
