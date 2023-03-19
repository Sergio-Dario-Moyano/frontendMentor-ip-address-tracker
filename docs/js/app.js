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

//Expresión regular que permite validar las Ip
let regularExpresion = RegExp(
  /^(?:(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])(\.(?!$)|$)){4}$/
)

const handleValidateIp = () => {
  if (regularExpresion.test(searchInput.value)) {
    template.innerHTML = ''
    template.classList.remove('error__style')
    handleApi(searchInput.value)
  } else {
    handleError()
    searchInput.focus()
    return;
  }
}

const handleError = () => {
  template.classList.add('main__params', 'error__style');
  template.innerHTML = "Error, ingresa una IP valida";
  main__map.appendChild(template)
}

const handleApi = (ip) => {

  fetch(`https://geo.ipify.org/api/v2/country?apiKey=at_2MQ1cqoPuUlr9eAQrsipI5VatSRSu&ipAddress=${ip}`)

    .then(response => response.json())
    .then(data => {
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
  main__map.appendChild(template);
}

/*Handlers*/
btnSearch.addEventListener("click", handleValidateIp)
