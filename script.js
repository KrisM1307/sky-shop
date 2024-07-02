const items = [{
        title: "Кольцо с самолётом",
        description: "Украсит ваш образ!",
        price: 30,
        img: "./img/ring.jpeg",
    },
    {
        title: "Брошь самолёт",
        description: "Отличное дополнение к наряду!",
        price: 28,
        img: "./img/brooch.jpeg",
    },
    {
        title: "Коврик для йоги",
        description: "Сделает ваши занятия более комфортными!",
        price: 32,
        img: "./img/mat.jpeg",
    },
    {
        title: "Брелок «Remove before flight»",
        description: "Для любителей путешествий!",
        price: 14,
        img: "./img/keychain.jpeg",
    },
    {
        title: "Кружка-хамелеон",
        description: "Для приятного чаепития",
        price: 21,
        img: "./img/cup.jpeg",
    },
    {
        title: "Скретч-карта мира",
        description: "Теперь вы можете отмечать все свои путешествия!",
        price: 43,
        img: "./img/map.jpeg",
    },
    {
        title: "Обложка для паспорта",
        description: "Обложка на ваш паспорт из натуральной кожи",
        price: 18,
        img: "./img/cover.jpeg",
    },
    {
        title: "Чехол для чемодана",
        description: "Защитит ваш багаж и позовлит узнать его из тысячи!",
        price: 27,
        img: "./img/case.jpeg",
    },
    {
        title: "Модель самолёта",
        description: "На память о вашем незабываемом путешествии!",
        price: 48,
        img: "./img/plane.jpeg",
    },
    {
        title: "Чемодан",
        description: "Небольшой чемодан позволит взять в ручную кладь всё самое необходимое",
        price: 64,
        img: "./img/luggage.jpeg",
    },
    {
        title: "Подушка для путешествий",
        description: "Ваш полёт пройдет с комфортом!",
        price: 25,
        img: "./img/pillow.jpeg",
    },
    {
        title: "Флеш-карта",
        description: "Для хранения ваших фото или для работы",
        price: 51,
        img: "./img/flashcard.jpeg",
    },
];

const itemsContainer = document.querySelector("#shop-items");
const itemTemplate = document.querySelector("#item-template");
const nothingFound = document.querySelector("#nothing-found");

function createShopItem(shopItem) {
    const { title, description, img, price } = shopItem;

    const item = itemTemplate.content.cloneNode(true);

    item.querySelector("h1").textContent = title;
    item.querySelector("p").textContent = description;
    item.querySelector("img").src = img;
    item.querySelector(".price").textContent = `${price} BYN`;

    return item;
}

let currentItems = [...items];

function renderItems(arr) {
    nothingFound.textContent = "";

    itemsContainer.innerHTML = "";

    arr.forEach((item) => {
        itemsContainer.append(createShopItem(item));
    });

    if (!arr.length) {
        nothingFound.textContent = "Ничего не найдено";
    }
};

function sortByAlphabet(a, b) {
    if (a.title > b.title && a.description > b.description) {
        return 1;
    }

    if (a.title < b.title && a.description < b.description) {
        return -1;
    }

    return 0;
}

renderItems(currentItems.sort((a, b) => sortByAlphabet(a, b)));

const sortControl = document.querySelector("#sort");

sortControl.addEventListener("change", (event) => {
    const selectedOption = event.target.value;

    switch (selectedOption) {
        case "expensive":
            {
                currentItems.sort((a, b) => b.price - a.price);
                break;
            }
        case "cheap":
            {
                currentItems.sort((a, b) => a.price - b.price);
                break;
            }
        case "alphabet":
            {
                currentItems.sort((a, b) => sortByAlphabet(a, b));
                break;
            }
    }

    renderItems(currentItems);
});

const searchInput = document.querySelector("#search-input");
const searchButton = document.querySelector("#search-btn");

function applySearch() {
    const searchString = searchInput.value.trim().toLowerCase();

    currentItems = items.filter(function(el) {
        return el.title.toLowerCase().includes(searchString) || el.description.toLowerCase().includes(searchString)
    });

    currentItems.sort((a, b) => sortByAlphabet(a, b));

    sortControl.selectedIndex = 0;

    renderItems(currentItems);
};

searchButton.addEventListener("click", applySearch);
searchInput.addEventListener("search", applySearch);

const schedule = document.querySelector(".schedule");

function showSchedule() {
    const currentTime = prompt("Который час?");

    if (currentTime >= 10 && currentTime <= 22) {
        alert("Наш магазин открыт!")
    } else {
        alert("Магазин закрыт :( Приходите за покупками завтра!")
    }
};

schedule.addEventListener("click", showSchedule);