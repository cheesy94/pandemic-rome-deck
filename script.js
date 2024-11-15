const ciudades = [
  {name:"Roma", colors:["orange","black","green","white","blue"], harbor:true},
  {name:"Carnuntum", colors:["green","blue"], harbor:false},
  {name:"Chersonesus", colors:["blue"], harbor:true},
  {name:"Gesoriacum", colors:["orange"], harbor:true},
  {name:"Mogontiacum", colors:["orange","black"], harbor:false},
  {name:"Philippopolis", colors:["green","white"], harbor:false},
  {name:"Tyras", colors:["white"], harbor:true},
  {name:"Aquileia", colors:["white","blue"], harbor:true},
  {name:"Athenae", colors:["black","white"], harbor:true},
  {name:"Brundisium", colors:["green"], harbor:true},
  {name:"Burdigala", colors:["orange","black"], harbor:true},
  {name:"Caesaraugusta", colors:["black"], harbor:false},
  {name:"Carthago", colors:["black"], harbor:true},
  {name:"Cesarea", colors:["black"], harbor:true},
  {name:"Constantinopolis", colors:["black","white","blue"], harbor:true},
  {name:"Corduba", colors:["black","white"], harbor:false},
  {name:"Eburacum", colors:["orange"], harbor:false},
  {name:"Genua", colors:["orange","white"], harbor:true},
  {name:"Iuvavum", colors:["green"], harbor:false},
  {name:"Londinium", colors:["orange"], harbor:true},
  {name:"Lugdunum", colors:["black","green"], harbor:false},
  {name:"Lutetia", colors:["orange","green"], harbor:false},
  {name:"Mediolanum", colors:["green"], harbor:false},
  {name:"Narbo", colors:["orange","white"], harbor:true},
  {name:"Narona", colors:["white"], harbor:true},
  {name:"Nova Carthago", colors:["white"], harbor:true},
  {name:"Patrae", colors:["green","white"], harbor:true},
  {name:"Ravenna", colors:["white"], harbor:true},
  {name:"Sinope", colors:["blue"], harbor:true},
  {name:"Syracusae", colors:["black"], harbor:true},
  {name:"Tingi", colors:["black"], harbor:true},
]
let barbarianDeck = new Array();
let barbarianDiscard = new Array();

function getDeck(ciudades) {
  let deck = new Array();

  for(let i = 0; i < ciudades.length; i++) {
    let currentCity = ciudades[i];
    for(let x = 0; x < currentCity["colors"].length; x++) {
      let currentColor = currentCity["colors"][x];
      let card = {city: currentCity["name"], color: currentColor};
      deck.push(card);
    }
  }

  return deck;
}

function shuffle(deck) {
  // for 1000 turns
  // switch the values of two random cards
  for (let i = 0; i < 1000; i++) {
    let location1 = Math.floor((Math.random() * deck.length));
    let location2 = Math.floor((Math.random() * deck.length));
    let tmp = deck[location1];

    deck[location1] = deck[location2];
    deck[location2] = tmp;
  }

  renderDeck();
}

function drawCard(place) {
  if (barbarianDeck.length > 0) {
    if (place===1) barbarianDiscard.push(barbarianDeck.shift());
    if (place===-1) barbarianDiscard.push(barbarianDeck.pop());
  }
	
  renderDeck();
}

function intensify() {
  shuffle(barbarianDiscard);
  barbarianDeck = barbarianDiscard.concat(barbarianDeck);
  barbarianDiscard = [];
  
  renderDeck();
}

function renderDeck() {
  document.getElementById('deck').innerHTML = '';
  let counter = document.createElement("div");
  counter.innerHTML = barbarianDeck.length;
  counter.classList.add('counter');
  document.getElementById("deck").appendChild(counter);
  
  document.getElementById('discard').innerHTML = '';
  for(var i = 0; i < barbarianDiscard.length; i++) {
    let card = document.createElement("div");

    card.innerHTML = barbarianDiscard[i].city;
    card.style.backgroundColor = barbarianDiscard[i].color;
    if (barbarianDiscard[i].color==="black" || barbarianDiscard[i].color==="blue") card.style.color = "white";
    card.classList.add('card');
    document.getElementById("discard").appendChild(card);
  }
}

function load() {
  const cities = [...ciudades];
  barbarianDiscard = getDeck([cities.shift()])
  shuffle(barbarianDiscard);
  barbarianDeck = getDeck(cities.splice(0,6));
  shuffle(barbarianDeck);
  let barbarianTemp = new Array();
  barbarianTemp = getDeck(cities);
  shuffle(barbarianTemp)
  barbarianDeck = barbarianDeck.concat(barbarianTemp)
  //barbarianDiscard = getDeck();
  renderDeck();
}

window.addEventListener('load', load);
