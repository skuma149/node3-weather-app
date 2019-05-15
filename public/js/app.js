console.log("Client side js is loading")




const formElement = document.querySelector('form')
const inputLocation = formElement.querySelector('input')
let errMsgElem = document.querySelector('#error-msg')
let forecastElem = document.querySelector('#forecast')
let locationElem = document.querySelector("#location")

formElement.addEventListener('submit',(e)=>{
e.preventDefault()

fetch('/weather?address='+inputLocation.value).then((response)=>{
    errMsgElem.textContent='',forecastElem.textContent='',locationElem.textContent='';
    response.json().then((data)=>{
            if(data.error){
                return errMsgElem.textContent = data.error
            }
            console.log(data)
            forecastElem.textContent = data.forecast
            locationElem.textContent = data.location

    })
})
})