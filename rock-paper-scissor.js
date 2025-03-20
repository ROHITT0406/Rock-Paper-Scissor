document.body.addEventListener('keydown',(event)=>{
      
  if (event.key === 'r'){
    playgames('Rock');
  }
  else if(event.key === 'p'){
    playgames('Paper');
  }
  else if(event.key ==='s'){
    playgames('scissor');
  }
  else if(event.key === 'a'){
    autoPlay();
  }


  
})
document.querySelector('.js-rock-button').addEventListener('click', ()=>{
  playgames('Rock');
});
 document.querySelector('.js-paper-button').addEventListener('click', ()=>{
  playgames('Paper');
});
document.querySelector('.js-scissor-button').addEventListener('click', ()=>{
  playgames('scissor');
});


document.querySelector('.auto-play-button').addEventListener('click',()=>{
  autoPlay();
  });
document.querySelector('.js-reset-button').addEventListener('click',()=>{
  document.querySelector('.js-confirm').innerHTML=`Are you sure want to reset the score? <button class="yes-confirm">Yes</button> <button class="no-confirm">No</button>`
  
  document.querySelector('.yes-confirm').addEventListener('click',()=>{
    score.wins =0;
    score.losses=0;
    score.ties=0;
    localStorage.removeItem('score');
    updateScoreElement();
    document.querySelector('.js-confirm').innerHTML='';
  })
  document.querySelector('.no-confirm').addEventListener('click',()=>{
    document.querySelector('.js-confirm').innerHTML='';
  });
});
let score=JSON.parse(localStorage.getItem('score')) || {
  wins:0,
  losses:0,
  ties:0
      };
updateScoreElement();

let isAuto = false;
let intervalId;

function autoPlay(){
  
  if (!isAuto){
      intervalId = setInterval(() => {
      const playerMove = pickcomputermove();
      playgames(playerMove);        
      }, 1000);
  isAuto = true;
  document.querySelector('.auto-play-button').innerHTML='Stop it';
  } else {
      clearInterval(intervalId);
      isAuto= false;
      document.querySelector('.auto-play-button').innerHTML='Autoplay';
  }
 
}

function playgames(playerMove) {
const computermove = pickcomputermove();
let result = "";
if (playerMove === "scissor") {
  if (computermove === "Rock") {
  result = "You Lose";
  } else if (computermove === "Paper") {
  result = "You Win";
  } else {
  result = "Tie";
  }

} else if (playerMove === "Paper") {

  if (computermove === "Rock") {
  result = "You Win";
  } else if (computermove === "Paper") {
  result = "Tie";
  } else {
  result = "You Lose";
  }
  
} else if( playerMove ==='Rock') {
  
  if (computermove === "Rock") {
  result =  "Tie";
  } else if (computermove === "Paper") {
  result = "You Lose";
  } else {
  result = "You Win";
  }

}
if (result ==='You Win'){
  score.wins+=1;
}else if(result ==='You Lose'){
  score.losses+=1
}else if (result ==='Tie'){
  score.ties+=1
}

localStorage.setItem('score',JSON.stringify(score));
updateScoreElement();
document.querySelector('.js-result').innerHTML = result;
document.querySelector('.js-moves').innerHTML = `You <img src="images/${playerMove}-emoji.png" class="moves-icon">
<img src="images/${computermove}-emoji.png" class="moves-icon"> Computer
`;
}
function pickcomputermove() {
let computermove = "";
const randomnumber = Math.random();
if (randomnumber >= 0 && randomnumber < 1 / 3) {
  computermove = "Rock";
} else if (randomnumber > 1 / 3 && randomnumber < 2 / 3) {
  computermove = "Paper";
} else {
  computermove = "scissor";
}
return computermove;
}
function updateScoreElement(){
document.querySelector('.js-score').innerHTML = ` wins: ${score.wins} ,Losses: ${score.losses},Tie: ${score.ties}`;
}
function variable(){
return ;
}