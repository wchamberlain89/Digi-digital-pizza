function Cart() {
	this.pizzas = [];
}

Cart.prototype.addPizza = function(pizza) {
	this.pizzas.push(pizza);
}

Cart.prototype.calculateTotal = function() {
	var newTotal = 0
	for (var i = 0; i < this.pizzas.length; i++) {
		newTotal += this.pizzas[i].price; 
	}
	return newTotal;
}


function Pizza(size, meats, veggies) {
	this.size = size;
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
		var userPizza = new Pizza(sizeInput, meatToppings, veggieToppings);
		return userPizza;
}


function showPrice (pizza) {
	$("#price").text("$" + pizza.toFixed(2));
}

function showTotal (cart) {
	$("#total").text("$" + cart)	
}

$(function(){
	var userCart = new Cart();
	var userPizza = refreshPizza();
	showPrice(userPizza.price);
	
$("#pizza-form").submit(function(event){
		event.preventDefault();
		userCart.addPizza(userPizza);
		showTotal(userCart.calculateTotal());
	});

	$("#pizza-form").change(function(event){
		userPizza = refreshPizza();
		showPrice(userPizza.price);
	});
});