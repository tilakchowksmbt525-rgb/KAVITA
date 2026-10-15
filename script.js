
const foods = [
  {
    name: "Crispy Spring Rolls",
    category: "Starters",
    price: 149,
    description: "Crunchy rolls filled with fresh vegetables.",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=700&q=80"
  },
  {
    name: "Paneer Tikka",
    category: "Starters",
    price: 229,
    description: "Smoky paneer with delicious Indian spices.",
    image: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?auto=format&fit=crop&w=700&q=80"
  },
  {
    name: "Margherita Pizza",
    category: "Main Course",
    price: 299,
    description: "Classic pizza with cheese and fresh tomatoes.",
    image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=700&q=80"
  },
  {
    name: "Creamy Pasta",
    category: "Main Course",
    price: 279,
    description: "Creamy pasta tossed in a rich white sauce.",
    image: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=700&q=80"
  },
  {
    name: "Chocolate Cake",
    category: "Desserts",
    price: 159,
    description: "Rich chocolate cake for your sweet cravings.",
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=700&q=80"
  },
  {
    name: "Ice Cream Sundae",
    category: "Desserts",
    price: 129,
    description: "A delightful scoop of creamy ice cream.",
    image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=700&q=80"
  }
];

const foodGrid = document.getElementById("foodGrid");
const filterButtons = document.querySelectorAll(".filter");

function displayFoods(category = "All") {
  const filteredFoods = category === "All"
    ? foods
    : foods.filter(food => food.category === category);

  foodGrid.innerHTML = filteredFoods.map(food => `
    <article class="food-card">
      <img src="${food.image}" alt="${food.name}" loading="lazy">
      <div class="food-info">
        <h3>${food.name}</h3>
        <p>${food.description}</p>
        <div class="food-bottom">
          <span class="price">₹${food.price}</span>
          <span>★ 4.8</span>
        </div>
      </div>
    </article>
  `).join("");
}

displayFoods();

filterButtons.forEach(button => {
  button.addEventListener("click", () => {
    filterButtons.forEach(item => item.classList.remove("active"));
    button.classList.add("active");
    displayFoods(button.dataset.category);
  });
});

// Mobile navigation
const menuBtn = document.getElementById("menuBtn");
const navbar = document.getElementById("navbar");

menuBtn.addEventListener("click", () => {
  const isOpen = navbar.classList.toggle("open");
  menuBtn.textContent = isOpen ? "✕" : "☰";
});

navbar.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    navbar.classList.remove("open");
    menuBtn.textContent = "☰";
  });
});

// Dark and light mode
const themeBtn = document.getElementById("themeBtn");

themeBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");

  themeBtn.textContent = document.body.classList.contains("dark")
    ? "☀️"
    : "🌙";
});

// Reservation form
const bookingDate = document.getElementById("bookingDate");
const today = new Date();
const localToday = [
  today.getFullYear(),
  String(today.getMonth() + 1).padStart(2, "0"),
  String(today.getDate()).padStart(2, "0")
].join("-");

bookingDate.min = localToday;

document.getElementById("bookingForm").addEventListener("submit", event => {
  event.preventDefault();

  const name = document.getElementById("customerName").value.trim();
  const date = bookingDate.value;
  const guests = document.getElementById("guests").value;
  const message = document.getElementById("bookingMessage");

  if (!name || !date || !guests || date < localToday) {
    message.textContent = "Please enter valid reservation details.";
    return;
  }

  message.textContent =
    `Thank you, ${name}! Your table request for ${guests} guest(s) on ${date} has been received in this demo.`;

  event.target.reset();
  bookingDate.min = localToday;
});
