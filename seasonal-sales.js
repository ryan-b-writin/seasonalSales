var list = [];
var depts = [];
var outputTarget = document.getElementById("outputTarget");
var pulldown = document.getElementById("pulldown");

//function to cycle through depts.id values
var matchDepts = function(){
  var adjustedList = list;
  //check if select value matched dept value
  for (var i=0;i<depts.length;i++) {
    if (pulldown.value === depts[i].season_discount) {

      // match depts[i].id to list[j].category_id
      for (var j=0;j<list.length;j++){
        if (depts[i].id === list[j].category_id){
          
          //change price of list[j] and reprint to the DOM
            var newPrice = (list[j].price * (1 - depts[i].discount)).toFixed(2);
            adjustedList[j].price = newPrice;
            outputTarget.innerHTML = "";
            printProducts(adjustedList);
        }
      }
    }
  }
}

// add event listener on select change
pulldown.addEventListener("change", function(){
  matchDepts();
});

var addDept = function(){
  for (var i=0;i<list.length;i++){
    for (var j=0;j<depts.length;j++){
      if (list[i].category_id === depts[j].id) {
        list[i].dept = depts[j].name;
      }
    }
  }
  printProducts();
}

//print out list array
var printProducts = function(){
  for (var i=0;i<list.length;i++) {
    var current = list[i];
    // build output string
    var productString = ""
    productString += "<section class ='card'>"
    productString += `<h3>${current.name}</h3>`;
    productString += `<h4>${current.price}</h4>`;
    productString += `<h5>${current.dept}</h5>`;
    productString += "</section>"
    //create a card with the info from each object
    outputTarget.innerHTML += productString;
  }
}
// <section class="card"> <h3>Kids' socks!</h3> <h4>Only: $4.99!</h4> <h5>On sale!</h5> </section>

//get products.json
var productListing = function(callBack) {
  var loader = new XMLHttpRequest();

  loader.open("GET", "products.json");
  loader.send();

  loader.addEventListener("load", function() {
    list = JSON.parse(this.responseText).products;
    callBack();
  });
};

//get departments.json
var departments = function() {
  var loader = new XMLHttpRequest();

  loader.open("GET", "depts.json");
  loader.send();

  loader.addEventListener("load", function() {
    depts = JSON.parse(this.responseText).categories;
    productListing(addDept);
  })
}

//call functions

departments();