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

// -- SELECTS --------------------------------------------- //

let selectsValues = {}

document.querySelectorAll('.select select').forEach(function(e) {
  e.addEventListener("change", function() {
    selectsValues[e.name] = e.value
		if(Object.keys(selectsValues).length === 3) {
			document.querySelector('#result').classList.remove('no-result');
			window.scroll({
				top: document.querySelector('#result').offsetTop, 
				left: 0, 
				behavior: 'smooth' 
			});
			loadItems(selectsValues);
		}
  });
});

// -- Fetch API ------------------------------------------- //

//sun:    no | low | high 
//water:  regularly | daily | rarely
//pets:   true | false


function loadItems(options) {
	fetch(`https://front-br-challenges.web.app/api/v2/green-thumb/?sun=${options.sun}&water=${options.water}&pets=${options.pets}`)
	.then(function (response) {
		return response.json(); // The API call was successful!
	}).then(function (data) {
		let renderList = document.querySelector('#renderList');
		data.forEach(renderPlantsList);
		function renderPlantsList(element) {
			let item = document.createElement('a');
			item.setAttribute('class', element.staff_favorite ? 'item favorite' : 'item');
			renderList.appendChild(item);
			item.innerHTML = item.innerHTML + `
				${element.staff_favorite ? '<span class="flag">✨ Staff favorite</span>': ''}
				<div class="image" aria-hidden="true">
					<img src="${element.url}">
				</div>
				<div class="box">
					<h3 class="title-plant">${element.name}</h3>
					<div class="info">
						<span class="price">$${element.price}</span>
						<div class="symbols">
							<img src="/pet.svg" alt="">
							<img src="/high-sun.svg" alt="">
							<img src="/1-drop.svg" alt="">
						</div>
					</div>
				</div> 
				`;
		}
	}).catch(function (err) {
		console.warn('Something went wrong.', err);
	});
}