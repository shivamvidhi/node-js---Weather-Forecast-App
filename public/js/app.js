console.log('This is client side java script file');


const weatherForm = document.querySelector('form');
const searchAddress = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');
var weatherInfo = '';


// console.log(weatherForm);
weatherForm.addEventListener('submit',(event)=>{

    event.preventDefault();
    
    const location = searchAddress.value;
    if(location==='')
    {
        alert('Please provide the location');
    }
    else
    {
        messageOne.textContent = 'Loading...';
        fetch('http://localhost:3000/weather?address='+location ).then((response)=>{
            response.json().then((data)=>{
                if(data.error)
                {
                    console.log('Unable to find weather of given address. Try another search');
                    weatherInfo = 'Unable to find weather of given address. Try another search';
                    messageOne.textContent = weatherInfo;
                    messageTwo.textContent = '';
                }
                else{
                    console.log(data.Weather.location);
                    console.log(data.Weather.current);
                    console.log('Weather outside is '+data.Weather.current.weather_descriptions[0]+'. And temperature is '+data.Weather.current.temperature+ ' Degree Celcius. Humididty is '+data.Weather.current.humidity+'. And precipitation is '+data.Weather.current.precip);
                    weatherInfo = 'Weather outside is '+data.Weather.current.weather_descriptions[0]+'. And temperature is '+data.Weather.current.temperature+ ' Degree Celcius. Humidity is '+data.Weather.current.humidity+'. And precipitation is '+data.Weather.current.precip+'.';
                    messageOne.textContent = data.Weather.location.region + ', '+data.Weather.location.country;
                    messageTwo.textContent = weatherInfo;
                }
                
            });
        });
    }
    
    
    
});