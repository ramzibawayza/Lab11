'use strict';
function Item(title, src) {
    this.title = title;
    this.src = src;
    this.clickCtr = 0;
    this.shownCtr = 0;
    Item.all.push(this);
  }
  
  Item.roundCtr = 0;
  Item.roundLimit = 25;
  
  Item.all = [];
  
  Item.container = document.getElementById('item-container');
  Item.leftImage = document.getElementById('leftimage');
  Item.middleImage = document.getElementById('middleimage');
  Item.rightImage = document.getElementById('rightimage');
  
  Item.leftTitle = document.getElementById('lefttitle');
  Item.middleTitle = document.getElementById('middletitle');
  Item.rightTitle = document.getElementById('righttitle');
  
  Item.leftObject = null;
  Item.middleObject = null;
  Item.rightObject = null;
  
  new Item('bag', 'images/bag.jpg');
  new Item('banana', 'images/banana.jpg');
  new Item('bathroom', 'images/bathroom.jpg');
  new Item('boots', 'images/boots.jpg');
  new Item('breakfast', 'images/breakfast.jpg');
  new Item('bubblegum', 'images/bubblegum.jpg');
  new Item('chair', 'images/chair.jpg');
  new Item('cthulhu', 'images/cthulhu.jpg');
  new Item('dog-duck', 'images/dog-duck.jpg');
  new Item('dragon', 'images/dragon.jpg');
  new Item('pen', 'images/pen.jpg');
  new Item('pet-sweep', 'images/pet-sweep.jpg');
  new Item('scissors', 'images/scissors.jpg');
  new Item('shark', 'images/shark.jpg');
  new Item('sweep', 'images/sweep.png');
  new Item('tauntaun', 'images/tauntaun.jpg');
  new Item('unicorn', 'images/unicorn.jpg');
  new Item('usb', 'images/usb.gif');
  new Item('water-can', 'images/water-can.jpg');
  new Item('wine-glass', 'images/wine-glass.jpg');
  function renderItems() {
  
    var forbidden = [Item.leftObject, Item.middleObject, Item.rightObject ];
  
    do {
  
      Item.leftObject = getRandomGoat();
  
    } while (forbidden.includes(Item.leftObject))
  
    forbidden.push(Item.leftObject);
  
    do {
  
      Item.middleObject = getRandomGoat();
  
    } while (forbidden.includes(Item.middleObject))
  
    forbidden.push(Item.middleObject);
    do {
  
      Item.rightObject = getRandomGoat();
  
    } while(forbidden.includes(Item.rightObject));
  
    
    
    Item.leftObject.shownCtr++;
    Item.middleObject.shownCtr++;
    Item.rightObject.shownCtr++;
  
    var leftImageElement = Item.leftImage;
    var middleImageElement = Item.middleImage;
    var rightItemImageElement = Item.rightImage;
  
    leftImageElement.setAttribute('src', Item.leftObject.src);
    leftImageElement.setAttribute('alt', Item.leftObject.title);
    middleImageElement.setAttribute('src', Item.middleObject.src);
    middleImageElement.setAttribute('alt', Item.middleObject.title);
    rightItemImageElement.setAttribute('src', Item.rightObject.src);
    rightItemImageElement.setAttribute('alt', Item.rightObject.title);
  
    Item.leftTitle.textContent = Item.leftObject.title;
    Item.middleTitle.textContent = Item.middleObject.title;
    Item.rightTitle.textContent = Item.rightObject.title;
  }
  
  function getRandomGoat() {
    var index = Math.floor(Math.random() * Item.all.length);
    return Item.all[index];
  }
  
  // not using this, just showing the better way vs. ceil
  function randomInRange(min, max) {
    var range = max - min + 1; // add one since we will be flooring
    var rand = Math.floor(Math.random() * range) + min
    return rand;
  }
  function tableTotal() {

    var tableBody = document.getElementById('Table');
  
  
    tableBody.innerHTML = '';
    
    
    for (var i = 0; i < Item.all.length; i++) {
      var item = Item.all[i];
      
      var row = addElement('tr', tableBody);
      addElement('td', row, item.title);
      addElement('td', row, '' + item.clickCtr + ' times');
      addElement('td', row, '' + item.shownCtr + ' times');
    }

  }
  
  function addElement(tag, container, text) {
    var element = document.createElement(tag);
    container.appendChild(element);
    if(text) {
      element.textContent = text;
    }
    return element;
  }
  
  function clickHand(event) {
  
    var clickedId = event.target.id;
    var itemClicked;
  
    if(clickedId === 'leftimage') {
      itemClicked = Item.leftObject;
    } else if (clickedId === 'middleimage') {
      itemClicked = Item.middleObject;
    }else if (clickedId === 'rightimage') {
      itemClicked = Item.rightObject;
    }
     else {
      console.log('Um, what was clicked on???', clickedId);
    }
  
    if(itemClicked) {
      itemClicked.clickCtr++;
      Item.roundCtr++;
  
      tableTotal();
  
      if(Item.roundCtr === Item.roundLimit) {
        randercharts();

        alert('No more clicking for you!');
  
        Item.container.removeEventListener('click', clickHand);
  
      } else {
  
        renderItems();
      }
    }
  }
  function randercharts(){
    var ItemArray =[];
    var ClickArray=[];
    var ShownArry=[];
    for (let i = 0; i < Item.all.length; i++) {
      var ItemInstent = Item.all[i];
      ItemArray.push(ItemInstent.title + ' Vote');
      ItemArray.push(ItemInstent.title + ' Shown');
      ClickArray.push(ItemInstent.clickCtr);
      ShownArry.push(ItemInstent.shownCtr);

    }

    var ctx = document.getElementById('Chart').getContext('2d');
    var chart = new Chart(ctx, {
      type:'bar',

      data:{
      labels: ['bag','banana','bathroom','boots','breakfast','bubblegum','chair','cthulhu','dog-duck ',
      'dragon','pen','pet-sweep','scissors','shark','sweep','tauntaun','unicorn','usb','water-can','wine-glass'],
      datasets: [
        {
            label: 'Item Votes',
            backgroundColor: 'orangered',
            borderColor: 'blue',
            data: ClickArray,
        }
      ,
      {
        label: 'Item Shown',
        backgroundColor: 'black',
        borderColor: 'blue',
        data: ShownArry,
      }
      ],
      
      options:{}
    
      }
    });
  }

  
  
  Item.container.addEventListener('click', clickHand);
  
  tableTotal();
  
  renderItems();







