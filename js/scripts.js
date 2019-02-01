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




$(function(){
	
$("#pizza-form").submit(function(event){
		event.preventDefault();
		var sizeInput = $("input[name='sizes']:checked").val();
		var meatToppings = getMeatToppings();
		var veggieToppings = getVeggieToppings();
		var userPizza = new Pizza(sizeInput, meatToppings, veggieToppings);
		console.log(userPizza.price); 
	});
});