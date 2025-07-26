const player1name = localStorage.getItem('player1');
const player2name = localStorage.getItem('player2');
const category = localStorage.getItem('category');
categorybuttons=document.querySelectorAll(".category-btn1");
document.getElementById('player1name').innerText = player1name;
document.getElementById('player2name').innerText = player2name;
const topiccategory=document.querySelector("#category");
topiccategory.innerText = `CATEGORY: ${category.toUpperCase()}`;
for(let i=0;i<categorybuttons.length;i++){
    if (categorybuttons[i].innerText===category){
        categorybuttons[i].classList.add("selected");
    }
}
let categories=[];
categories.push(category);
let questions=[];
let easy=[];
let medium=[];
let hard=[];
let winnername="";
let choosencategory=categories[categories.length-1];
API_KEY="https://the-trivia-api.com/api/questions?limit=50";
async function getquestions(){
    while (easy.length<2 || medium.length<2 || hard.length<2){
        let response=await fetch(API_KEY);
        let data=await response.json();
        console.log(data);
        for (let i=0;i<data.length;i++){
            if (data[i].difficulty=="easy" && easy.length<2 && data[i].category===choosencategory && !easy.includes(data[i])){
                easy.push(data[i]);
            }
            else if (data[i].difficulty=="medium" && medium.length<2 && data[i].category===choosencategory && !medium.includes(data[i])){
                medium.push(data[i]);
            }
            else if (data[i].difficulty=="hard" && hard.length<2 && data[i].category===choosencategory && !hard.includes(data[i])){
                hard.push(data[i]);
            }
            if (easy.length==2 && medium.length==2 && hard.length==2){
                break;
            }
         }
        console.log(easy);
        console.log(medium);
        console.log(hard);
        }
        questions=[...easy,...medium,...hard];
        console.log(questions);
}

let question=document.querySelector("#question");
let answersButtons=document.querySelector("#answer-buttons");
let nextbutton=document.querySelector("#next-btn");
let player1score=document.querySelector("#player1score");
let player2score=document.querySelector("#player2score");
let skipbtn=document.querySelector("#skip-btn");
let endbtn=document.querySelector("#end-btn");
let choosecategories=document.querySelector("#choosecategory");
let player1turn=document.querySelector("#player1turn");
let player2turn=document.querySelector("#player2turn");
let bodypage=document.querySelector(".container-fluid");
let body=document.querySelector("body");
player1turn.classList.add("active");
let currentQuestionIndex=0;
let scoreofplayer1=0;
let scoreofplayer2=0;
async function startQuiz() {
    questions=[];
    easy=[];
    medium=[];
    hard=[];
    currentQuestionIndex=0;
    if (categories.length==0){
        scoreofplayer1=0;
        scoreofplayer2=0;
    }  
    nextbutton.innerHTML="Next";
    await getquestions();
    showquestions();
    console.log(questions);
}
function showquestions(){
        resetstate();
        let currentquestion=questions[currentQuestionIndex].question;
        console.log(currentquestion);
        let questionno=currentQuestionIndex+1;
        question.innerHTML=questionno+"."+currentquestion;
        let answers=questions[currentQuestionIndex].incorrectAnswers;
        let correctanswer=questions[currentQuestionIndex].correctAnswer;
        answers.push(correctanswer);
        console.log(answers);
        answers.sort();
        answers=new Set(answers);
        answers=Array.from(answers);
        console.log(questions[currentQuestionIndex].correctAnswer);
        player1turn.classList.add("active");
        player2turn.classList.add("active");
        if (currentQuestionIndex%2==0){
            player2turn.classList.remove("active");
            player1turn.classList.add("active");
        }
        else{
            player1turn.classList.remove("active");
            player2turn.classList.add("active");

        }
        for (let j=0;j<answers.length;j++){
            const button=document.createElement("button");
            button.innerHTML=answers[j];
            button.classList.add("btn1");
            button.classList.add("col-12","col-lg-5","m-2")
            answersButtons.appendChild(button);
            button.addEventListener("click",selectanswer);
        }
}
function resetstate(){
    nextbutton.style.display="none";
    skipbtn.style.display="block";
    while (answersButtons.firstChild){
        answersButtons.removeChild(answersButtons.firstChild);
    }

}
function selectanswer(e){
    let selctbutton=e.target;
    let correctanswer=questions[currentQuestionIndex].correctAnswer;
    let selectedanswer=selctbutton.innerHTML;
    console.log(selectedanswer);
    console.log(correctanswer);
    if (correctanswer===selectedanswer){
        if (currentQuestionIndex%2==0){
            if (questions[currentQuestionIndex].difficulty==="easy"){
                scoreofplayer1+=10;
            }
            else if (questions[currentQuestionIndex].difficulty==="medium"){
                scoreofplayer1+=15;
            }
            else if (questions[currentQuestionIndex].difficulty==="hard"){
                scoreofplayer1+=20;
            }
        }
        else{
            if (questions[currentQuestionIndex].difficulty==="easy"){
                scoreofplayer2+=10;
            }
            else if (questions[currentQuestionIndex].difficulty==="medium"){
                scoreofplayer2+=15;
            }
            else if (questions[currentQuestionIndex].difficulty==="hard"){
                scoreofplayer2+=20;
            }
        }
        selctbutton.classList.add("correct");
    }
    else{
        selctbutton.classList.add("incorrect");
    }
    for (let k=0;k<answersButtons.children.length;k++){
        if (answersButtons.children[k].innerHTML===correctanswer){
            answersButtons.children[k].classList.add("correct");
        }
        answersButtons.children[k].disabled = true;
    }
    nextbutton.style.display="block";
    skipbtn.style.display="none";
    player1score.innerHTML=scoreofplayer1;
    player2score.innerHTML=scoreofplayer2;
    
    console.log(scoreofplayer1);
    console.log(scoreofplayer2);
}
function rechoosecategory(){
    endbtn.style.display="none";
    choosecategories.style.display="block";
    choosecategories.addEventListener("click",()=>{
        choosecategories.style.display="none";
        endbtn.style.display="none";
        if (categories.length==10){
            showscore();
        }
        else{
            categorybuttons.forEach((button)=>{
            button.removeEventListener("click",handlecategory);
            button.addEventListener("click",handlecategory);
            });
        }
    });
}
function showresult(){
    let result=document.createElement("div");
    result.classList.add("result");
    bodypage.style.display="none";
    if (winnername=="Tie"){
        result.innerHTML=`<h1><b>A tie! What a great way to finish—two champions, one amazing game!<b></h1>`;
    }
    else{
        result.innerHTML=`<h1><b>~Well done, ${winnername}! You have claimed victory with brilliance and skill!"<b></h1>`;
    }
    body.style.backgroundImage="url('gamepagegift.jpg')";
    body.style.backgroundSize="cover";
    body.style.backgroundRepeat="no-repeat";
    body.appendChild(result);
    result.classList.add("col-10")
    startagain=document.createElement("button");
    startagain.innerHTML="Start Again";
    startagain.classList.add("startagain","col-4","col-sm-2");
    body.appendChild(startagain);
    startagain.addEventListener("click",()=>{
        body.removeChild(result);
        body.removeChild(startagain);
        bodypage.style.display="block";
        body.style.backgroundImage="none";
        choosecategories.style.display="none";
        player1score.innerHTML=0;
        player2score.innerHTML=0;
        scoreofplayer1=0;
        scoreofplayer2=0;
        categories=[];
        categorybuttons.forEach((button)=>{
            button.classList.remove("selected");
        });
        rechoosecategory();
    })

}
function showscore(){
    if (scoreofplayer1>scoreofplayer2){
        winnername=player1name;
        showresult()
    }
    else if (scoreofplayer1==scoreofplayer2) {
        
        winnername="Tie";
        showresult();

    }
    else{
        winnername=player2name;
        showresult();
    }
    resetstate();
    skipbtn.style.display="none";
    endbtn.style.display="none";
    nextbutton.style.display="none";
    choosecategories.style.display="block";   
}
function choosecategory(){
    categorybuttons.forEach((button)=>{
        button.disabled=false;
    })
    nextbutton.style.display="none";
    skipbtn.style.display="none";
    endbtn.style.display="block";
    choosecategories.style.display="block";
    choosecategories.addEventListener("click",()=>{
        choosecategories.style.display="none";
        endbtn.style.display="none";
        if (categories.length==10){
            showscore();
        }
        else{
            categorybuttons.forEach((button)=>{
            button.removeEventListener("click",handlecategory);
            button.addEventListener("click",handlecategory);
            
            });
        }
    });
}
endbtn.addEventListener("click",()=>{
    showscore();
})
function handlecategory(e){
    categorybuttons.forEach((button)=>{
        button.disabled=true;
    })
        let topicchoosenbtn=e.target;
        let topichoosen=e.target.innerText;
        if (!categories.includes(topichoosen)){
            if (categories.length<10){
                categories.push(topichoosen);
                choosencategory=topichoosen;                
                topicchoosenbtn.classList.add("selected");
                topiccategory.innerHTML = `CATEGORY: ${topichoosen.toUpperCase()}`;
                startQuiz();
            }
            else{
                console.log("Category limit reached");
            }
        }
        else{
            alert("Category already selected");
        }
}
function handlenextbutton(){
    currentQuestionIndex=currentQuestionIndex+1;
    if (currentQuestionIndex<6){
        showquestions();
    }
    else{
        choosecategory();
    }
}
skipbtn.addEventListener("click",()=>{
    currentQuestionIndex=currentQuestionIndex+1;
    if (currentQuestionIndex<6){
        showquestions();
    }
    else{
        choosecategory();
    }

});
nextbutton.addEventListener("click",()=>{
    if (currentQuestionIndex<6){
        handlenextbutton();
    }
    else{
        choosecategory();
    }
})
startQuiz();