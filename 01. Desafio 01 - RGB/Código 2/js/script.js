window.addEventListener('load',  start);

var red = null; 
var blue = null;
var green = null;
var redValue = null;
var blueValue = null;
var greenValue = null;
var preview = null;

function start(){
    red = document.querySelector('#red');
    blue = document.querySelector('#blue');
    green = document.querySelector('#green');
    redValue = document.querySelector('#red-value');
    blueValue = document.querySelector('#blue-value');
    greenValue = document.querySelector('#green-value');
    preview = document.querySelector('#preview');
    activateInput ();
    colorDefault();
    setBackgroundColor();
}

function colorDefault() {
    red.value = 0;
    green.value = 0;
    blue.value = 0;
    redValue.value = 0;
    greenValue.value = 0
    blueValue.value = 0;
}

function activateInput () {
    function getValueRed (event){
        redValue.value = event.target.value; //é só uma atribuição de um valor através de uma propriedade.
        setBackgroundColor ();
    }
    
    function getValueBlue (event){
        blueValue.value = event.target.value;
        setBackgroundColor ();
    }

    function getValueGreen (event){
        greenValue.value = event.target.value;
        setBackgroundColor ();
    }
    red.addEventListener('change', getValueRed);
    blue.addEventListener('change', getValueBlue);
    green.addEventListener('change', getValueGreen);
}

function setBackgroundColor (){
    var rgb = 'rgb(' + redValue.value + ',' + greenValue.value + ',' + blueValue.value + ')';
    preview.style.backgroundColor = rgb;
}