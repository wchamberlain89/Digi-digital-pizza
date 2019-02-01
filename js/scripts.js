function Pizza(size) {
	this.size = size;
	// this.toppings = toppingsArray;
	this.price = this.getPrice();
}

Pizza.prototype.getPrice = function() {
	console.log(this.size);
	if (this.size === 'sm') {
		return 10;
	} else if (this.size === 'md') {
		return 14;
	} else {
		return 16;
	}
}

function Topping(name, price) {
	this.name = name;
	this.price = price;
}

function getMeatToppings () {
	$("#meat-select input:checkbox[name='meat-topping']:checked").each(function(topping){
		console.log($(this).val());
	});
}




$(function(){
	
$("#pizza-form").submit(function(event){
		event.preventDefault();
		var sizeInput = $("input[name='sizes']:checked").val();
		var meatToppings = getMeatToppings();
		var userPizza = new Pizza(sizeInput);
		console.log(userPizza.price); 
	});
});