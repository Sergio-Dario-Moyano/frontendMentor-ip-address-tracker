// referencias HTML
const btnSearch = document.querySelector('#btn__search');
const searchInput = document.querySelector('#search__input');
const ipAddress = document.querySelector('#ipAddress');
const loc = document.querySelector('#location');
const timeZone = document.querySelector('#timeZone');
const isp = document.querySelector('#isp');
const main__map = document.querySelector('#main__map');
let template = document.createElement("article");
template.classList.add('main__params');

const handleBtn = () => {
  const ipResult = searchInput.value;
  console.log(ipResult);

  fetch(`https://geo.ipify.org/api/v2/country?apiKey=at_2MQ1cqoPuUlr9eAQrsipI5VatSRSu&ipAddress=${ipResult}`)

    .then(response => response.json())
    .then(data => {
      console.log(data.ip);
      console.log(data.location.region);
      console.log(data.location.timezone);
      console.log(data.isp);
      template.innerHTML =
        `
          <div class="main__param">
            <p class="main__param__p">IP Address</p>
            <span class="main__param__span" id="ipAddress">${data.ip}</span>
          </div>
          <div class="main__param">
            <p class="main__param__p">Location</p>
            <span class="main__param__span" id="location">${data.location.region}</span>
          </div>
          <div class="main__param">
            <p class="main__param__p">Timezone</p>
            <span class="main__param__span" id="timeZone">${data.location.timezone}</span>
          </div>
          <div class="main__param main__param--noBorder">
            <p class="main__param__p">ISP</p>
            <span class="main__param__span" id="isp">${data.isp}</span>
          </div>
            `
    });
  main__map.append(template);
}

/*Handlers*/
btnSearch.addEventListener("click", handleBtn)
