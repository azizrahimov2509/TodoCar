const carForm = document.getElementById('carForm');
const carList = document.getElementById('carList');


let cars = [];


function loadCars() {
    const carsJSON = localStorage.getItem('cars');
    if (carsJSON) {
        cars = JSON.parse(carsJSON);
        renderCars();
    }
}



function saveCars() {
    localStorage.setItem('cars', JSON.stringify(cars));
}



function addMachine(name, price, speed, imgLink, color) {
    cars.push({ name, price, speed, imgLink, color });
    saveCars();
    renderCars();
}


function renderCars() {
    carList.innerHTML = '';
    cars.forEach((machine, index) => {
        const machineItem = document.createElement('div');
        machineItem.classList.add('machine-item');
        machineItem.innerHTML = `
            <div class="machine-info">
                <h3>${machine.name}</h3>
                <p>Price: $${machine.price}</p>
                <p>Speed: ${machine.speed}km/h</p>
                <img src="${machine.imgLink}" alt="${machine.name}">
                <p>Color:  ${machine.color}<span style="background-color: ${machine.color}; width: 20px; height: 20px; display: inline-block; margin-left: 5px;"></span></p>
            </div>
            <button class="delete-btn" onclick="deleteMachine(${index})">Delete</button>
        `;
        carList.appendChild(machineItem);
    });
}



function deleteMachine(index) {
    cars.splice(index, 1);
    saveCars();
    renderCars();
}



carForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = e.target.elements.name.value;
    const price = parseFloat(e.target.elements.price.value);
    const speed = e.target.elements.speed.value;
    const imgLink = e.target.elements.imgLink.value;
    const color = e.target.elements.color.value;
    addMachine(name, price, speed, imgLink, color);
    carForm.reset();
});


loadCars();