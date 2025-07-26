const player1=document.querySelector("#player1");
const player2=document.querySelector("#player2");
const categorybuttons=document.querySelectorAll(".category-b");
const start_button=document.querySelector("#start-b");
const customheading=document.querySelector(".heading1");
const categoryall=document.querySelectorAll(".category");
// let player1name="";
// let  player2name="";
let  category=[];

document.addEventListener("DOMContentLoaded",()=>{
    player1.addEventListener("input",()=>{
        player1name=player1.value;
    })
    player2.addEventListener("input",()=>{
        player2name=player2.value;
    })
    startquiz()
    categorybuttons.forEach((button)=>{
        button.addEventListener("click",()=>{
        let category1=button.innerText;
        if (!(category.includes(category1))){
            category.push(category1);
            localStorage.setItem("player1",player1name);
            localStorage.setItem("player2",player2name);
            localStorage.setItem("category",category[category.length-1]);
            window.location.href='Gamepage/index.html';
            
        }
        else{
            alert("Category already selected");
        }
        })
    })
});
function startquiz(){
    const ltik = new URLSearchParams(window.location.search).get('ltik')
    console.log("LTI Key:", ltik);
    localStorage.setItem('ltik', ltik);
    player1name=localStorage.getItem('player1');
    player2name=localStorage.getItem('player2');
    start_button.addEventListener("click",()=>{
        console.log(player1name);
        console.log(player2name);
        if (player1name===player2name){
            alert("Please enter different name not the same person name")
        }
        else if (player1name=="" || player2name==""){
            alert("Please fill all the fields");
        }
        else{
            customheading.style.visibility="visible";
            categoryall.forEach((category)=>{
                category.style.visibility="visible";
            });
            categorybuttons.forEach((button)=>{
                button.style.visibility="visible";
            });
            start_button.style.display="none";
        }
       
    })
}







