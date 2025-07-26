// let API="https://the-trivia-api.com/v2/questions?limit=";
// async function getquestions(){
//     let data=await fetch(API);
//     let response=await data.json();
//     console.log(response);
// }
// getquestions();

const promise_request=fetch("https://the-trivia-api.com/v2/questions?")
promise_request.then(function(response){
    return response.json()
})
.then(function(data){
    for (let i=0; i<data.length; i++){
        if (data[i].category=="music"){
            console.log(data[i])
        }
    }
    // console.log(data)
})
.catch(function(error){
    console.log(error)
})

