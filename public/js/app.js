const mainButton = document.querySelector('.btn-1')
const secondButton = document.querySelector('.btn-2')
const search = document.querySelector('input')
const messageOne = document.querySelector('.message-1')
const messageTwo = document.querySelector('.message-2')

mainButton.addEventListener('click', (e) => {
    e.preventDefault()
    const location = search.value
    console.log(location)
    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''

    fetch(`/weather?address=${location}`).then((response) => {
    response.json().then((data) => {
        if (data.error) {
            messageOne.textContent = data.error
        } else {
            messageOne.textContent = data.location
            messageTwo.textContent = data.forecast
        }
    })
})
})

secondButton.addEventListener('click', (e) => {
    e.preventDefault()
    
    if (!navigator.geolocation) {
        messageOne.textContent = 'Browser does not support geolocation'
    }
    
    navigator.geolocation.getCurrentPosition((position) => {
        messageOne.textContent = 'Loading...'
        messageTwo.textContent = ''

        fetch(`/weather?address=${position.coords.longitude},${position.coords.latitude}`).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error
            } else {
                messageOne.textContent = data.location
                messageTwo.textContent = data.forecast
            }
        })
    })
    })
})