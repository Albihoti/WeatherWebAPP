
const weatherForm = document.querySelector('form')

const search = document.querySelector('input')

const firstParagrahp = document.querySelector('#firstParagraph')
const secondParagraph = document.querySelector('#secondParagraph')
firstParagrahp.textContent = '';
const headingTemp = document.querySelector("#temperature")

weatherForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    const location = search.value
     firstParagrahp.textContent='Loading....';
     secondParagraph.textContent='';
     headingTemp.textContent ='';
    
    fetch(`http://localhost:3000/weather?address=${location}`).then((response)=>{
        response.json().then((data)=>{
            if(data.error){
                firstParagrahp.textContent = data.error;
            }
            else{
               firstParagrahp.textContent = data.location;
               secondParagraph.textContent = "It's " +data.forecast.weatherDesc+" throughout the day. Currently it's "+data.forecast.temp+" degress outside."
               headingTemp.textContent=data.forecast.temp 
            
            }
        })
    })
})