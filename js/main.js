// let elForm = document.querySelector('.js-form');
// let elText = document.querySelector('.js-text');
// let elInp1 = document.querySelector('.js-inp1');
// let elInp2 = document.querySelector('.js-inp2');
// let elInp3 = document.querySelector('.js-inp3');
// let elSpan = document.querySelector('.js-span');

// let newArray = ['bir', 'ikki', 'uch', "to'rt", 'besh'];

// elText.textContent = newArray;

// elForm.addEventListener('submit', function (evt) {
// 	evt.preventDefault();
// 	newArray.splice(elInp1.value, elInp2.value, elInp3.value);
// 	elSpan.textContent = newArray;
// });

const elForm = document.querySelector('.js-form');
const elInp = document.querySelector('.js-inp');
const elList = document.querySelector('.js-list');
let elStr1 = document.querySelector('.js-str1');
let elStr2 = document.querySelector('.js-str2');
let elStr3 = document.querySelector('.js-str3');

const newArray = [];

let viewEl = (arr, app) => {
	app.innerHTML = '';

	arr.forEach((item) => {
		let newItem = document.createElement('li');
		let newInp = document.createElement('input');
		let newSpan = document.createElement('span');
		let newBtn = document.createElement('button');

		newItem.setAttribute('class', 'd-flex align-items-center mb-2');
		newInp.type = 'checkbox';
		newInp.setAttribute('class', 'form-check-input me-3 js-check');
		newSpan.textContent = item.text;
		newBtn.textContent = 'DELETE';
		newBtn.setAttribute('class', 'btn btn-danger ms-auto js-btn');

		newInp.dataset.arrId = item.id;
		newBtn.dataset.arrId = item.id;

		newItem.appendChild(newInp);
		newItem.appendChild(newSpan);
		newItem.appendChild(newBtn);
		app.appendChild(newItem);

		if (item.isComplated) {
			newSpan.setAttribute('class', 'text-decoration-line-through');
			newInp.checked = true;
		}
	});
};

elForm.addEventListener('submit', function (evt) {
	evt.preventDefault();

	newArray.push({
		id: newArray.length + 1,
		text: elInp.value,
		isComplated: false,
	});

	elStr1.textContent = newArray.length;

	elInp.value = '';

	let unComplated = newArray.filter((el) => !el.isComplated);
	elStr3.textContent = unComplated.length;
	viewEl(newArray, elList);
});

elList.addEventListener('click', function (evt) {
	if (evt.target.matches('.js-btn')) {
		let arrId = evt.target.dataset.arrId;

		let findind = newArray.findIndex((el) => el.id == arrId);

		newArray.splice(findind, 1);

		elStr1.textContent = newArray.length;

		let Complated = newArray.filter((el) => el.isComplated);
		elStr2.textContent = Complated.length;

		let unComplated = newArray.filter((el) => !el.isComplated);
		elStr3.textContent = unComplated.length;
		viewEl(newArray, elList);
	}

	if (evt.target.matches('.js-check')) {
		let arrId = +evt.target.dataset.arrId;

		let findEl = newArray.find((el) => el.id === arrId);
		findEl.isComplated = !findEl.isComplated;

		let Complated = newArray.filter((el) => el.isComplated);
		elStr2.textContent = Complated.length;

		let unComplated = newArray.filter((el) => !el.isComplated);
		elStr3.textContent = unComplated.length;
		viewEl(newArray, elList);
	}
});
