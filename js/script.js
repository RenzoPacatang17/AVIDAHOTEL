document.addEventListener("DOMContentLoaded", () => {

    // =========================
    // TOAST SYSTEM
    // =========================
    function showToast(message) {
        const toast = document.getElementById("toast");
        if (!toast) return;

        toast.textContent = message;
        toast.parentElement.classList.add("show");

        setTimeout(() => {
            toast.parentElement.classList.remove("show");
        }, 3000);
    }


    // =========================
    // MENU (PRODUCT PAGE)
    // =========================
    const menuBtn = document.getElementById("menuBtn");
    const menuList = document.getElementById("menuList");

    if (menuBtn && menuList) {
        menuBtn.addEventListener("click", () => {
            menuList.style.display =
                menuList.style.display === "block" ? "none" : "block";
        });

        window.addEventListener("resize", () => {
            if (window.innerWidth > 1024) {
                menuList.style.display = "block";
            } else {
                menuList.style.display = "none";
            }
        });
    }


    // =========================
    // QUANTITY + PRICE SYSTEM
    // =========================
    const valueEl = document.querySelector(".value");
    const plusBtn = document.querySelector(".plus");
    const minusBtn = document.querySelector(".minus");
    const priceEl = document.getElementById("pesos");

    const basePrice = 2000;
    let quantity = 1;

    function updatePrice() {
        if (valueEl) valueEl.textContent = quantity;
        if (priceEl) priceEl.textContent = "₱" + (basePrice * quantity);
    }

    if (plusBtn && minusBtn && valueEl) {

        plusBtn.addEventListener("click", () => {
            quantity++;
            updatePrice();
        });

        minusBtn.addEventListener("click", () => {
            if (quantity > 1) {
                quantity--;
                updatePrice();
            }
        });

        updatePrice();
    }


    // =========================
    // POPUP SYSTEM
    // =========================
    const popup = document.getElementById("popup");
    const popupImg = document.getElementById("popup-img");
    const popupCaption = document.getElementById("popup-caption");
    const closeBtn = document.getElementById("close-btn");


    if (popup && closeBtn) {
        closeBtn.addEventListener("click", () => {
            popup.style.display = "none";
        });

        popup.addEventListener("click", (e) => {
            if (e.target === popup) {
                popup.style.display = "none";
            }
        });
    }


    // =========================
    // GALLERY + ARROWS (FIXED)
    // =========================
    const mainImage = document.querySelector("#large-image img");
    const galleryImages = document.querySelectorAll("#gallery-image img");
    const arrows = document.querySelectorAll(".arrow");

    let currentIndex = 0;

    function updateGallery(index) {
        if (!galleryImages.length) return;

        const selected = galleryImages[index];

        if (mainImage) {
            mainImage.src = selected.src;
            mainImage.alt = selected.alt;
        }

        if (popupImg) popupImg.src = selected.src;
        if (popupCaption) popupCaption.textContent = selected.alt;

        const title = selected.getAttribute("data-title");
        const desc = selected.getAttribute("data-desc");

        const titleEl = document.querySelector(".right h2");
        const descEl = document.querySelector(".right p");

        if (titleEl) titleEl.textContent = title || selected.alt;
        if (descEl) descEl.textContent = desc || "No description available";

        currentIndex = index;
    }

    // CLICK THUMBNAILS
    galleryImages.forEach((img, index) => {
        img.addEventListener("click", () => {
            updateGallery(index);
        });
    });

    // LEFT ARROW
    if (arrows[0]) {
        arrows[0].addEventListener("click", () => {
            currentIndex--;

            if (currentIndex < 0) {
                currentIndex = galleryImages.length - 1;
            }

            updateGallery(currentIndex);
        });
    }

    // RIGHT ARROW
    if (arrows[1]) {
        arrows[1].addEventListener("click", () => {
            currentIndex++;

            if (currentIndex >= galleryImages.length) {
                currentIndex = 0;
            }

            updateGallery(currentIndex);
        });
    }

    // CLICK MAIN IMAGE OPENS POPUP
    if (mainImage && popup && popupImg && popupCaption) {
        mainImage.addEventListener("click", () => {
            popup.style.display = "flex";
            popupImg.src = mainImage.src;
            popupCaption.textContent = mainImage.alt;
        });
    }


    // =========================
    // CHECKOUT BUTTON
    // =========================
    const checkoutBtn = document.getElementById("check-out");

    if (checkoutBtn) {
        checkoutBtn.addEventListener("click", () => {

            showToast("Proceeding to Checkout...");

            const productName =
                document.querySelector(".right h2")?.textContent || "N/A";

            localStorage.setItem("productName", productName);
            localStorage.setItem("quantity", quantity);
            localStorage.setItem("total", basePrice * quantity);

            setTimeout(() => {
                window.location.href = "../checkout.html";
            }, 500);
        });
    }


    // =========================
    // BACK BUTTON (PRODUCT PAGE)
    // =========================
    const backBtn = document.getElementById("back");

    if (backBtn) {
        backBtn.addEventListener("click", () => {
            window.location.href = "../index.html";
        });
    }


    // =========================
    // CHECKOUT PAGE LOAD
    // =========================
    const productEl = document.getElementById("productName");
    const qtyEl = document.getElementById("qty");
    const totalEl = document.getElementById("total");

    if (productEl && qtyEl && totalEl) {

        productEl.textContent = localStorage.getItem("productName") || "N/A";
        qtyEl.textContent = localStorage.getItem("quantity") || "1";
        totalEl.textContent = "₱" + (localStorage.getItem("total") || "0");
    }


    // =========================
    // CHECKOUT PAGE BUTTONS
    // =========================
    const backBtn2 = document.getElementById("backbtn");
    const payBtn = document.getElementById("paybtn");

    if (backBtn2) {
        backBtn2.addEventListener("click", () => {
            window.location.href = "index.html";
        });
    }

    if (payBtn) {
        payBtn.addEventListener("click", () => {

            const product = localStorage.getItem("productName") || "N/A";
            const qty = localStorage.getItem("quantity") || "1";
            const total = localStorage.getItem("total") || "0";

            alert(
                "CHECKOUT SUMMARY\n\n" +
                "Product: " + product + "\n" +
                "Quantity: " + qty + "\n" +
                "Total: ₱" + total
            );
        });
    }

});

//YEARLY INTEREST

document.querySelector("button").addEventListener("click", function() {
    let principal = parseFloat(document.getElementById("principal").value);
    let years = parseFloat(document.getElementById("years").value);
    let rate = 0.05;

    if (isNaN(principal) || isNaN(years)) {
        document.getElementById("result").innerHTML = "Please enter valid values.";
        return;
    }

    // Compound interest formula
    let total = principal * Math.pow((1 + rate), years);
    let interest = total - principal;

    document.getElementById("result").innerHTML =
        `Interest: ${interest.toFixed(2)} <br> Total Amount: ${total.toFixed(2)}`;
});

//MONTHLY INTEREST

document.querySelector("button").addEventListener("click", function () {
    let P = parseFloat(document.getElementById("principal").value);
    let t = parseInt(document.getElementById("years").value);
    let r = 0.15;

    let totalInterest = P * r * t;
    let totalPayment = P + totalInterest;
    let yearlyPayment = totalPayment / t;
    let monthlyPayment = totalPayment / (t * 12);

    document.getElementById("result").innerHTML = `
        <p>Total Interest: ${totalInterest.toFixed(2)}</p>
        <p>Total Payment: ${totalPayment.toFixed(2)}</p>
        <p>Yearly Payment: ${yearlyPayment.toFixed(2)}</p>
        <p>Monthly Payment: ${monthlyPayment.toFixed(2)}</p>
    `;
});

// USD TO PESO CONVERSION 

document.getElementById("convertBtn").addEventListener("click", function () {
  let usd = document.getElementById("usd").value;

  if (!usd || usd <= 0) {
    alert("Please enter a valid amount");
    return;
  }

  let rate = 56;
  let php = usd * rate;

  // ✅ Peso sign BEFORE number + comma + decimals
  let formattedPHP = new Intl.NumberFormat('en-PH', {
    style: 'currency',
    currency: 'PHP'
  }).format(php);

  document.getElementById("result").innerText =
    usd + " USD = " + formattedPHP;
});

/*

document.addEventListener("DOMContentLoaded", () => {

   //MENU BUTTON

const menuBtn = document.getElementById('menuBtn');
const menuList = document.getElementById('menuList');

menuBtn.addEventListener('click', function() {
    if(menuList.style.display === 'block') {
        menuList.style.display = 'none';
    }
    else {
        menuList.style.display = 'block';
    }
});

window.addEventListener("resize", function () {

    if (window.innerWidth > 1024) {
        menuList.style.display = "block";
    } else {
        menuList.style.display = "none";
    }

});
 
    // =========================
    // IMAGE GALLERY + POPUP
    // =========================
    const mainImage = document.querySelector("#large-image img");
    const popup = document.getElementById("popup");
    const popupImg = document.getElementById("popup-img");
    const popupCaption = document.getElementById("popup-caption");
    const closeBtn = document.getElementById("close-btn");
    const galleryImages = document.querySelectorAll("#gallery-image img");
    const arrows = document.querySelectorAll(".arrow");

    let currentIndex = 0;

    function updateImage(index) {
        if (!galleryImages.length) return;

        const selected = galleryImages[index];
        if (!selected) return;

        // Main image
        if (mainImage) {
            mainImage.src = selected.src;
            mainImage.alt = selected.alt || "";
        }

        // Popup image
        if (popupImg) popupImg.src = selected.src;
        if (popupCaption) popupCaption.textContent = selected.alt || "";

        // Title & description (IMPORTANT FIX)
        const titleEl = document.querySelector(".right h2");
        const descEl = document.querySelector(".right p");

        const title = selected.getAttribute("data-title");
        const desc = selected.getAttribute("data-desc");

        if (titleEl) {
            titleEl.textContent = title || selected.alt || "No Title";
        }

        if (descEl) {
            descEl.textContent = desc || "No Description Available";
        }
    }


    // Open popup
    if (mainImage && popup && popupImg && popupCaption) {
        mainImage.addEventListener("click", () => {
            popup.style.display = "flex";
            popupImg.src = mainImage.src;
            popupCaption.textContent = mainImage.alt;
        });
    }

    // Close popup
    if (popup && closeBtn) {
        closeBtn.addEventListener("click", () => {
            popup.style.display = "none";
        });

        popup.addEventListener("click", (e) => {
            if (e.target === popup) {
                popup.style.display = "none";
            }
        });
    }


    // Gallery click
    galleryImages.forEach((img, index) => {
        img.addEventListener("click", () => {
            currentIndex = index;
            updateImage(currentIndex);
        });
    });


    // Arrow navigation
    if (arrows.length >= 2) {
        arrows[0].addEventListener("click", () => {
            currentIndex =
                (currentIndex - 1 + galleryImages.length) % galleryImages.length;
            updateImage(currentIndex);
        });

        arrows[1].addEventListener("click", () => {
            currentIndex =
                (currentIndex + 1) % galleryImages.length;
            updateImage(currentIndex);
        });
    }


    // =========================
    // PRICE + QUANTITY SYSTEM
    // =========================
    const priceEl = document.getElementById("pesos");
    const valueEl = document.querySelector(".value");
    const plusBtn = document.querySelector(".plus");
    const minusBtn = document.querySelector(".minus");

    const basePrice = 2000;
    let quantity = 1;

    function updatePrice() {
        if (!priceEl || !valueEl) return;

        valueEl.textContent = quantity;
        priceEl.textContent = "₱" + (basePrice * quantity);
    }

    if (plusBtn) {
        plusBtn.addEventListener("click", () => {
            quantity++;
            updatePrice();
        });
    }

    if (minusBtn) {
        minusBtn.addEventListener("click", () => {
            quantity = Math.max(1, quantity - 1);
            updatePrice();
        });
    }

    updatePrice();


    // =========================
    // CHECKOUT + LOCAL STORAGE
    // =========================
    const checkoutBtn = document.getElementById("check-out");

    if (checkoutBtn) {
        checkoutBtn.addEventListener("click", () => {

            const productName =
                document.querySelector(".right h2")?.textContent ||
                "N/A";

            const quantityValue =
                document.querySelector(".value")?.textContent || "1";

            const totalRaw =
                document.getElementById("pesos")?.textContent || "₱0";

            const total =
                parseInt(totalRaw.replace(/[₱,]/g, "")) || 0;

            localStorage.setItem("productName", productName);
            localStorage.setItem("quantity", quantityValue);
            localStorage.setItem("total", total);

            window.location.href = "../checkout.html";
        });
    }


    // =========================
    // LOAD CHECKOUT DATA
    // =========================
    const productEl = document.getElementById("productName");
    const qtyEl = document.getElementById("qty");
    const totalEl = document.getElementById("total");

    if (productEl && qtyEl && totalEl) {
        productEl.textContent = localStorage.getItem("productName") || "N/A";
        qtyEl.textContent = localStorage.getItem("quantity") || "1";
        totalEl.textContent = "₱" + (localStorage.getItem("total") || "0");
    }


    // =========================
    // BACK HOME BUTTON
    // =========================
    const backHomeBtn = document.getElementById("back");

    if (backHomeBtn) {
        backHomeBtn.addEventListener("click", () => {
            window.location.href = "../index.html";
        });
    }

});

document.getElementById("backbtn").addEventListener("click", function() {
    window.location.href = "index.html";
});

document.getElementById("paybtn").addEventListener("click", function() {
    // Get values from the page
    let product = document.getElementById("productName").textContent;
    let quantity = document.getElementById("qty").textContent;
    let total = document.getElementById("total").textContent;

    // Show alert with the same details
    alert(
        "CHECKOUT SUMMARY\n\n" +
        "Product: " + product + "\n" +
        "Quantity: " + quantity + "\n" +
        "Total Price: ₱ " + total
    );

        function showToast(message) {
        const toast = document.getElementById('toast');
        toast.textContent = message;
        toast.parentElement.classList.add('show');

        setTimeout(() => {
            toast.parentElement.classList.remove('show');
        }, 3000);
    }

    document.addEventListener('DOMContentLoaded', () => {
        document.getElementById('check-out').addEventListener('click', () => {
            showToast('Proceed to Check Out');
        });
    });
});

*/