window.addEventListener("load", () => {
  localIp()
})

// referencias HTML
const btnSearch = document.querySelector('#btn__search'); //boton de cambio de coordenadas
const searchInput = document.querySelector('#search__input'); //input de cambio de coordenadas
// Elementos que muestran datos traidos de la API
const ipAddress = document.querySelector('#ipAddress');
const loc = document.querySelector('#location');
const timeZone = document.querySelector('#timeZone');
const isp = document.querySelector('#isp');
//Donde se despliegan los datos obtenidos de la API
const main__map = document.querySelector('#main__map');
//Template que muestra dichos datos
let template = document.createElement("article");
template.classList.add('main__params');

let map; //Variable global para el manejo de mapas.

const localIp = async () => {
  const URL = 'https://api.ipify.org?format=json';
  try {
    const respuesta = await fetch(URL);
    if (respuesta.ok) {
      const jsonRespuesta = await respuesta.json();
      handleValidateIp(jsonRespuesta.ip)
    }
  } catch (error) {
    console.log(error);
  }
}

const handleValidateIp = (ip) => {
  //Expresión regular que permite validar las Ip
  let regularExpresion = RegExp(
    /^(?:(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])(\.(?!$)|$)){4}$/
  )

  if (regularExpresion.test(ip)) {
    template.innerHTML = '';
    template.classList.remove('error__style');
    newRequest(ip)
  } else {
    handleError()
    searchInput.focus()
    return;
  }
}

//Agregando mapa funcional desde una librería externa.
const generateMap = (lat, long) => {
  map = L.map('map').setView([lat, long], 13);
  let marker = L.marker([lat, long]).addTo(map);
  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  }).addTo(map);
}

//Manejo de error personalizado (básico)
const handleError = () => {
  template.classList.add('main__params', 'error__style');
  template.innerHTML = "Error, ingresa una IP válida";
  main__map.appendChild(template)
}

//captura de IP ingresada manualmente
const sendNewIp = () => {
  let res = document.querySelector('#search__input').value;
  handleValidateIp(res)
}

const templateConstructor = (data) => {
      template.innerHTML =
        `
      <div class="main__param">
      <p class="main__param__p">IP Address</p>
      <span class="main__param__span" id="ipAddress">${data.ip}</span>
      </div>
      <div class="main__param">
      <p class="main__param__p">Location</p>
      <span class="main__param__span" id="location">${data.city || "no data to show"}, ${data.country_name || "no data to show"}</span>
      </div>
      <div class="main__param">
      <p class="main__param__p">Timezone</p>
      <span class="main__param__span" id="timeZone">${data.time_zone.offset || "no data to show"}</span>
      </div>
      <div class="main__param main__param--noBorder">
      <p class="main__param__p">ISP</p>
      <span class="main__param__span" id="isp">${data.asn.name || "no data to show"}</span>
      </div>
      `
      generateMap(data.latitude, data.longitude);
  main__map.appendChild(template);
}

const newRequest = async(ip) => {
  const apiKey = 'e355c25ae5392fd7693c532e77917a23c810f807831197b24003ccd8';
  const URL = `https://api.ipdata.co/${ip}?api-key=${apiKey}`;

  if (map != undefined) {
    map = map.remove()
  }

  try {
    const response = await fetch(URL);
    if(response.ok) {
      const respuesta = await response.json()
      templateConstructor(respuesta);
    }
  } catch(error) {
    console.log(error);
  }
}

// /*Handlers*/
document.getElementById('btn__search').addEventListener("click", sendNewIp)