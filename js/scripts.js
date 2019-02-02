function Cart() {
	this.id = 0;
	this.pizzas = [];
}

Cart.prototype.assignId = function(pizza) {
	this.id += 1;
	pizza.id = this.id;
}

Cart.prototype.addPizza = function(pizza) {
	this.assignId(pizza);
	this.pizzas.push(pizza);
}

Cart.prototype.calculateTotal = function() {
	var newTotal = 0
	for (var i = 0; i < this.pizzas.length; i++) {
		newTotal += this.pizzas[i].price; 
	}
	return newTotal;
}


function Pizza(size, sauce, meats, veggies) {
	this.size = size;
	this.sauce = sauce;
	this.meats = meats;
	this.veggies = veggies;
	this.price = this.getPrice();
}

Pizza.prototype.getPrice = function() {
	if (this.size === 'sm') {
		return 10.00 + (this.meats.length * 1.25) + (this.veggies.length * 1.00);
	} else if (this.size === 'md') {
		return 14 + (this.meats.length * 1.50) + (this.veggies.length * 1.25);
	} else {
		return 16 + (this.meats.length * 1.75) + (this.veggies.length * 1.50);
	}
}

Pizza.prototype.createPizzaHTML = function() {
	console.log(this.id);

	var html = '<div class="cart-pizza"><button class="btn pizza" data-toggle="collapse" data-target="#pizza' + this.id+ '">Pizza</button> \
	<div class="collapse" id="pizza' + this.id + '"> \
	<div> \
	<p>Size : <span class="size">' + this.size + '</span></p> \
	<p>Sauce : <span class="sauce">' + this.sauce + '</span></p> \
	<p>Meat : </p> \
	<ul>'
	
	for (var i = 0; i < this.meats.length; i++) {
		html += "<li>" + this.meats[i]; + "</li>";
	}

	html += '</ul> \
	<p>Veggies : </p> \
	<ul> '

	for (var i = 0; i < this.veggies.length; i++) {
		html += "<li>" + this.veggies[i]; + "</li>";
	}

	html += '</ul> \
			</div> \
		</div></div>'

	$("#pizza-container").append(html);
}

function Topping(name, price) {
	this.name = name;
	this.price = price;
}

function getMeatToppings () {
	var toppings = [];
	$("#meat-select input:checkbox[name='meat-topping']:checked").each(function(topping){
		toppings.push($(this).val());
	});
	return toppings;
}

function getVeggieToppings () {
	var toppings = [];
	$("#veggie-select input:checkbox[name='veggie-topping']:checked").each(function(topping){
		toppings.push($(this).val());
	});
	return toppings;
}


function refreshPizza () { 
	var sizeInput = $("input[name='sizes']:checked").val();
	var meatToppings = getMeatToppings();
	var veggieToppings = getVeggieToppings();
	var sauce = $('input[name="sauce"]:checked').val();
	var userPizza = new Pizza(sizeInput, sauce, meatToppings, veggieToppings);
	return userPizza;
}

function showPrice (pizza) {
	$("#price").text("$" + pizza.toFixed(2));
}

function showTotal (cart) {
	$("#total").text("$" + cart.toFixed(2));	
}

$(function(){
	var userCart = new Cart();
	var userPizza = refreshPizza();
	showPrice(userPizza.price);
	
	$("#pizza-form").submit(function(event){
		event.preventDefault();
		userCart.addPizza(userPizza);
		userPizza.createPizzaHTML();
		showTotal(userCart.calculateTotal());
	});

	$("#pizza-form").change(function(){
		userPizza = refreshPizza();
		showPrice(userPizza.price);
	});

	$(".pizza").mousedown(function(event){
		event.preventDefault();
	});
});