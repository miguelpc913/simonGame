$(document).ready(function(){
  let strictMode = false, countPlayerMax = 0, countComputerMax = 0, countPlayer = 1, 
  countComputer = 0, orderArray = [], playerOrderArray = [];
  const arrayColors= ["red","blue","yellow","green"],
  green = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3'), 
  red = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3'),
  yellow = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3'), 
  blue = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3'),
  arraySounds = [red , blue , yellow , green];
  let order , playerOrder , round = 0;

  $("#reset").hide();

  const reset = function(){
    orderArray = [];
    playerOrderArray = [];
    countComputer = 0;
    countComputerMax = 0;
    countPlayerMax = 0;
    countPlayer = 1;
    round = 0;
  }

  const empty = function (){
    playerOrderArray = [];
    orderArray = [];
    playerOrder ="";
    order = "";
  } 

    //DISABLES BUTTONS FOR PC TURN
   function disabled (){
  $(".tic").prop( "disabled", true );
  }
   //ENABLES BUTTONS FOR USER TURN
   function enable(){
    $(".tic").prop( "disabled", false );
  }
  
  $("#start").click(function(){
    $("#start").hide();
    $("#reset").fadeIn();
    computersMove()
  });

  function playersMove(slot){
    if(countPlayer === countPlayerMax){
      disabled();
      countPlayer = 0;
      let colorClicked = arrayColors[slot];
      playerOrderArray.push(colorClicked);
      playerOrder = playerOrderArray.join(" ");
      console.log(playerOrder);
      compare();
    }else if(countPlayer < countPlayerMax){
      let colorClicked = arrayColors[slot];
      playerOrderArray.push(colorClicked);
      playerOrder = playerOrderArray.join(" ");
    }
}



  $("#strictMode").click(function(){
    $("#reset").hide();
    $("#start").fadeIn();
    reset();
    if($("#onOff").text() === "Off"){
      $("#round").html(round)
      strictMode = true;
      $("#onOff").text("On");
    }else if($("#onOff").text() === "On"){  
      $("#round").html(round)
      strictMode = false;
      $("#onOff").text("Off");
    }
  });

  $("#reset").click(function(){
    $("#reset").hide();
    $("#start").fadeIn();
    reset();
    $("#round").html(round)
  });


  $(".tic").click(function(){
  let numId = $(this).attr('id');
  let ID = $("#" + numId )
  $(ID).css('opacity', '1');
  setTimeout(function () {
    $(ID).css('opacity', '0.5');
    }, 200); 
  arraySounds[numId].play()
  playersMove(numId)
  countPlayer ++;
});
      
  disabled();
  
  function computersMove(){
    disabled();
    countPlayerMax ++;
    countComputerMax ++;
    var counter= setInterval(timer, 1000);
    function timer(){
    if(countComputer >= countComputerMax){
      clearInterval(counter);
      countComputer = 0;  
      enable();
    }else{
    let randomNum= Math.floor(Math.random() * 3);
    let colorTile = $("#" + randomNum);
    let sound = arraySounds[randomNum]
    countComputer ++;
    $(colorTile).css('opacity', '1');
    setTimeout(function () {
    $(colorTile).css('opacity', '0.5');
        }, 400); 
    sound.play();
    let color = arrayColors[randomNum];
    orderArray.push(color)  
    order =orderArray.join(" ");
    }}}    
  
  
  function compare(){
    if(round === 19){
      round ++;
      $("#round").html(round);
      $("#title").html("You are Awesome");
      alert("You Win");
    }
   else if(!strictMode){
       if(order=== playerOrder){
        computersMove();
        round ++;
        $("#round").html(round);
        empty();
       }else if(order !== playerOrder){
        countComputerMax -=1;
        countPlayerMax -=1;
        empty();
        computersMove();   
      }
    }
    else{
    if(order=== playerOrder){
      computersMove();
      round ++;
      $("#round").html(round);
      empty();
    }else{
      alert("you lose!");
      reset();
    }
     
    } 
  }

  });