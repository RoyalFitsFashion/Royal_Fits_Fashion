/* ===========================
   Royal Fits — site script.js
   =========================== */

const WHATSAPP_NUMBER = "233555427237"; // international format, no leading +

/* ---------- Mobile nav toggle ---------- */
document.addEventListener("DOMContentLoaded", () => {
    const toggle = document.getElementById("menu-toggle");
    const nav = document.getElementById("nav");

    if (toggle && nav) {
        toggle.addEventListener("click", () => {
            nav.classList.toggle("show");
        });

        // Close mobile menu after a nav link is tapped
        nav.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", () => nav.classList.remove("show"));
        });
    }

    setupFadeIn();
    setupSlider();
    setupBookingForm();
    renderCart();
    renderReviews();
});

/* ---------- Fade-in on scroll ---------- */
function setupFadeIn() {
    const fadeEls = document.querySelectorAll(".fade-in");
    if (!fadeEls.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
            }
        });
    }, { threshold: 0.15 });

    fadeEls.forEach(el => observer.observe(el));
}

/* ---------- Gallery slider ---------- */
function setupSlider() {
    const slides = document.querySelectorAll(".slide");
    const prevBtn = document.querySelector(".prev");
    const nextBtn = document.querySelector(".next");
    if (!slides.length) return;

    let current = 0;

    function showSlide(index) {
        slides.forEach(s => s.classList.remove("active"));
        current = (index + slides.length) % slides.length;
        slides[current].classList.add("active");
    }

    if (prevBtn) prevBtn.addEventListener("click", () => showSlide(current - 1));
    if (nextBtn) nextBtn.addEventListener("click", () => showSlide(current + 1));

    // Auto-advance every 5 seconds
    setInterval(() => showSlide(current + 1), 5000);
}

/* ---------- Booking form -> WhatsApp ---------- */
function setupBookingForm() {
    const form = document.getElementById("bookingForm");
    if (!form) return;

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const name = document.getElementById("name").value.trim();
        const phone = document.getElementById("phone").value.trim();
        const date = document.getElementById("date").value;
        const details = document.getElementById("details").value.trim();

        if (!name || !phone || !date || !details) {
            alert("Please fill in all fields.");
            return;
        }

        const message =
            `New Booking Request%0A` +
            `Name: ${encodeURIComponent(name)}%0A` +
            `Phone: ${encodeURIComponent(phone)}%0A` +
            `Preferred Date: ${encodeURIComponent(date)}%0A` +
            `Details: ${encodeURIComponent(details)}`;

        const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;
        window.open(url, "_blank");

        form.reset();
    });
}

/* ---------- Cart (localStorage) ---------- */
function getCart() {
    return JSON.parse(localStorage.getItem("cart") || "[]");
}

function saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
}

function addToCart(name, price) {
    const cart = getCart();
    cart.push({ name, price });
    saveCart(cart);
    renderCart();
    alert(`${name} added to cart.`);
}

function removeFromCart(index) {
    const cart = getCart();
    cart.splice(index, 1);
    saveCart(cart);
    renderCart();
}

function renderCart() {
    const itemsEl = document.getElementById("cart-items");
    const totalEl = document.getElementById("cart-total");
    if (!itemsEl || !totalEl) return;

    const cart = getCart();

    if (cart.length === 0) {
        itemsEl.innerHTML = "<p>Your cart is empty.</p>";
        totalEl.textContent = "";
        return;
    }

    let total = 0;
    itemsEl.innerHTML = cart.map((item, i) => {
        total += item.price;
        return `
            <div class="card" style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px;">
                <span>${escapeHTML(item.name)} — GHS ${item.price}</span>
                <button onclick="removeFromCart(${i})">Remove</button>
            </div>
        `;
    }).join("");

    totalEl.textContent = `Total: GHS ${total}`;
}

function checkout() {
    const cart = getCart();
    if (cart.length === 0) {
        alert("Your cart is empty.");
        return;
    }

    const total = cart.reduce((sum, item) => sum + item.price, 0);
    const itemList = cart.map(item => `${item.name} (GHS ${item.price})`).join(", ");

    const message =
        `New Order%0A` +
        `Items: ${encodeURIComponent(itemList)}%0A` +
        `Total: GHS ${total}`;

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;
    window.open(url, "_blank");
}

/* ---------- Reviews (localStorage) ---------- */
function getReviews() {
    return JSON.parse(localStorage.getItem("reviews") || "[]");
}

function saveReviews(reviews) {
    localStorage.setItem("reviews", JSON.stringify(reviews));
}

function submitReview() {
    const nameEl = document.getElementById("review-name");
    const textEl = document.getElementById("review-text");
    if (!nameEl || !textEl) return;

    const name = nameEl.value.trim();
    const text = textEl.value.trim();

    if (!name || !text) {
        alert("Please enter your name and review.");
        return;
    }

    const reviews = getReviews();
    reviews.push({ name, text, date: new Date().toLocaleDateString() });
    saveReviews(reviews);

    nameEl.value = "";
    textEl.value = "";

    renderReviews();
}

function renderReviews() {
    const listEl = document.getElementById("review-list");
    if (!listEl) return;

    const reviews = getReviews();

    if (reviews.length === 0) {
        listEl.innerHTML = "<p>No reviews yet. Be the first to leave one!</p>";
        return;
    }

    listEl.innerHTML = reviews.slice().reverse().map(r => `
        <div class="card" style="text-align:left; margin-top:15px;">
            <strong>${escapeHTML(r.name)}</strong>
            <span style="color:#aaa; font-size:0.85em;"> — ${escapeHTML(r.date || "")}</span>
            <p style="margin-top:8px;">${escapeHTML(r.text)}</p>
        </div>
    `).join("");
}

/* ---------- Utility ---------- */
function escapeHTML(str) {
    const div = document.createElement("div");
    div.textContent = str;
    return div.innerHTML;
}
