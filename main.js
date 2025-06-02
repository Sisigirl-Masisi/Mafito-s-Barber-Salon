// Menu Scroll Functionality
function scrollToBooking() {
  const bookingSection = document.getElementById("booking");
  bookingSection.scrollIntoView({ behavior: "smooth" });
}

// Hero Background Image Slider
const hero = document.querySelector(".hero");

const images = [
  'img/Home-page.jpg',
  // Add more images here if needed
];

let current = 0;

function changeBackground() {
  hero.style.backgroundImage = `url(${images[current]})`;
  current = (current + 1) % images.length;
}

changeBackground(); // Show first image
setInterval(changeBackground, 3000); // Change every 3 seconds

// Wait until HTML is fully loaded
document.addEventListener("DOMContentLoaded", () => {
  // Filter service cards by category (used if you have filtering)
  const filterButtons = document.querySelectorAll(".filter-btn");
  const serviceCards = document.querySelectorAll(".service-card");

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const filter = button.getAttribute("data-filter");

      serviceCards.forEach((card) => {
        const category = card.getAttribute("data-category");

        if (filter === "all") {
          card.style.display = "block";
        } else {
          card.style.display = category.includes(filter) ? "block" : "none";
        }
      });
    });
  });

  // ✅ Fetch services from backend and populate the booking dropdown
  const serviceSelect = document.getElementById('service');
  if (serviceSelect) {
    fetch('http://localhost:5000/api/services')
      .then(res => res.json())
      .then(services => {
        services.forEach(service => {
          const option = document.createElement('option');
          option.value = service.id;
          option.textContent = `${service.name} - R${service.price}`;
          serviceSelect.appendChild(option);
        });
      })
      .catch(error => console.error("Failed to load services:", error));
  }
});

//Handle form submission
const bookingForm = document.getElementById('bookingForm');
if (bookingForm) {
  bookingForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const data = {
      name: document.getElementById('name').value,
      phone: document.getElementById('phone').value,
      service_id: parseInt(document.getElementById('service').value),
      date_time: document.getElementById('date_time').value,
    };

    fetch('http://localhost:5000/api/book', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(response => {
      alert(response.message || 'Booking saved! Redirecting...');
      window.open("https://mafitosbarbersalon.setmore.com", "_blank");
    })
    .catch(err => {
      alert('Error saving booking. Try again.');
      console.error(err);
    });
  });
}
     