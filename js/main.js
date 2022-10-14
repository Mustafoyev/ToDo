const elForm = document.querySelector('.js-form');
const elInp = document.querySelector('.js-inp');
const elList = document.querySelector('.js-list');
let elStr1 = document.querySelector('.js-str1');
let elStr2 = document.querySelector('.js-str2');
let elStr3 = document.querySelector('.js-str3');
let elBtns = document.querySelector('.js-btns');
let elDark = document.querySelector('.js-dark-btn');
let addFragment = document.createDocumentFragment();

let parsetArray = JSON.parse(window.localStorage.getItem('array'));

const newArray = parsetArray || [];

let viewEl = (arr, app) => {
	elStr1.textContent = newArray.length;
	elStr2.textContent = newArray.filter((el) => el.isComplated).length;
	elStr3.textContent = newArray.filter((el) => !el.isComplated).length;
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
		addFragment.appendChild(newItem);

		if (item.isComplated) {
			newSpan.setAttribute('class', 'text-decoration-line-through');
			newInp.checked = true;
		}
	});
	app.appendChild(addFragment);
};

viewEl(newArray, elList);

elForm.addEventListener('submit', function (evt) {
	evt.preventDefault();

	newArray.push({
		id: newArray.length ? newArray[newArray.length - 1].id + 1 : 1,
		text: elInp.value,
		isComplated: false,
	});

	elInp.value = '';

	viewEl(newArray, elList);
	window.localStorage.setItem('array', JSON.stringify(newArray));
});

elList.addEventListener('click', function (evt) {
	if (evt.target.matches('.js-btn')) {
		let arrId = evt.target.dataset.arrId;

		let findind = newArray.findIndex((el) => el.id == arrId);

		newArray.splice(findind, 1);

		viewEl(newArray, elList);
		window.localStorage.setItem('array', JSON.stringify(newArray));
	}

	if (evt.target.matches('.js-check')) {
		let arrId = +evt.target.dataset.arrId;

		let findEl = newArray.find((el) => el.id === arrId);
		findEl.isComplated = !findEl.isComplated;

		viewEl(newArray, elList);
		window.localStorage.setItem('array', JSON.stringify(newArray));
	}
});

elBtns.addEventListener('click', function (evt) {
	if (evt.target.matches('.js-all')) {
		viewEl(newArray, elList);
	}

	if (evt.target.matches('.js-comp')) {
		let comp = newArray.filter((el) => el.isComplated);
		viewEl(comp, elList);
	}

	if (evt.target.matches('.js-uncomp')) {
		let uncomp = newArray.filter((el) => !el.isComplated);
		viewEl(uncomp, elList);
	}

	if (evt.target.matches('.js-del-all')) {
		window.localStorage.removeItem('array');
		window.location.reload();
		viewEl(newArray, elList);
	}
});

let theme = false;

elDark.addEventListener('click', function () {
	theme = !theme;
	window.localStorage.setItem('theme', theme ? 'dark' : 'light');
	darker();
});

function darker() {
	if (window.localStorage.getItem('theme') == 'dark') {
		document.body.classList.add('dark');
	} else {
		document.body.classList.remove('dark');
	}
}

darker();
