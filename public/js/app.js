console.log('Client side javascript file is loaded!')

// fetch('http://localhost:3000/weather?address=boston').then((response)=>{
//         response.json().then((data)=>{
//             if(data.error){
//                 console.log(data.error);
//             }else{
//                 console.log(data[0].location);
//                 console.log(data[0].forecast);
//             }
//           })  
// })

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2')


weatherForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    const location = search.value;

    messageOne.textContent = 'Loading...';
    messageTwo.textContent = ''

        fetch('http://localhost:3000/weather?address='+encodeURIComponent(location)).then((response)=>{
        response.json().then((data)=>{
            if(data.error){
                messageOne.textContent  = data.error;
                // console.log(data.error);
            }else{
                messageOne.textContent= data[0].location;
                messageTwo.textContent= data[0].forecast;
                // console.log(data[0].location);
                // console.log(data[0].forecast);
            }
          })  
        })
})