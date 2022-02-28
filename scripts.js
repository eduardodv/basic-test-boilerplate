// -- Scroll To ------------------------------------------- //

function scrollToDiv(e) {
	let targeElement = e.target.getAttribute('data-target');
	window.scroll({
		top: document.querySelector(targeElement).offsetTop, 
		left: 0, 
		behavior: 'smooth' 
	});
}

document.querySelectorAll('.scrollTo').forEach(function(e) {
   e.addEventListener("click", scrollToDiv, false);
  }
);

// -- Fetch API ------------------------------------------- //

fetch('https://front-br-challenges.web.app/api/v2/green-thumb/?sun=high&water=regularly&pets=false')
.then(function (response) {
	// The API call was successful!
	return response.json();
}).then(function (data) {
	// This is the JSON from our response
	console.log(data);
}).catch(function (err) {
	// There was an error
	console.warn('Something went wrong.', err);
});