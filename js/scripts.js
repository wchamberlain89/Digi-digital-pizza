$(function(){
	// $("#pizza-submit").submit(function(event){
	// 	var sizeInput = $("input[name='sizes']").val(); 
	// 	console.log(sizeInput);
	// 	event.preventDefault();
	// });
	$("#pizza-form").submit(function(event){
		event.preventDefault();
		console.log("Hello from submit")
	})
});