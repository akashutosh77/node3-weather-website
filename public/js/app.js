//#region commentSection
// console.log('client side java script file is loaded')
// fetch('http://puzzle.mead.io/puzzle').then((res) => {
//     res.json().then((data) => {
//         console.log(data);
//     })
// })



// const geoCode = (address) => {
//     const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1IjoiYXNodXRvc2hrdW1hciIsImEiOiJja2YzZ201c2kwMTRkMnVwOHozMHFna3d1In0.RpnNiq9S2eww9-Onfwn9mg&limit=1';
//     fetch(url).then((res) => {
//         res.json().then((data) => {
//             if (data.features.length === 0) {
//                 return console.log('Location is not found')
//             } else {
//                 const url1 = 'http://api.weatherstack.com/current?access_key=2217d7dd21d11d24513d42f858a7f07f&query=' + encodeURIComponent(data.features[0].center[1]) + ',' + encodeURIComponent(data.features[0].center[0]) + '&units=f ';
//                 fetch(url1).then((res) => {
//                     res.json().then((data) => {
//                         if (data.error) {
//                             return console.log('unable to find the location');
//                         } else {
//                             console.log({ forecast: data.current.weather_descriptions[0], location: data.location.name, address: address });
//                         }
//                     })

//                 }).catch(() => {
//                     console.log('Unable to connect to weather service');
//                 })
//             }
//         })

//     }).catch(() => {
//         console.log('Unable to connect to location services')
//     })
// }
//#endregion
console.log('client side javascript file is loaded');

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value
    messageOne.textContent = 'Loading.......'
    messageTwo.textContent = ''
    fetch('http://localhost:3000/weather?address=' + location).then((res) => {
        res.json().then((data) => {
            if (data.error) {
                console.log(data.error)
                messageOne.textContent = data.error;
            } else {
                messageOne.textContent = data.location;
                messageTwo.textContent = data.forecast;
            }
        })
    })
})