const from = document.querySelector('#email');
const text = document.querySelector('#feedback');
const submit = document.querySelector('form');
const loading = document.querySelector('#loading');

submit.addEventListener('submit',(event)=>{
    event.preventDefault();
    if(from.value==='')
    {
        alert('please provide with the email id');
    }
    else if(text.value==='')
    {
        alert('please provide with the feedback');
    }
    else{

        loading.textContent = 'Sending...';

       fetch('/mail?from='+from.value+'&text='+text.value).then((response)=>{
           response.json().then((json)=>{
               if(json.accepted.length>0 && json.rejected.length===0)
               {
                   loading.textContent='';
                   alert("Your Feedback is successfully sent to the developer community. Thank you for you feedback.");
                   from.value = '';
                   text.value = '';
               }
           });
       });

    }

});

