document.addEventListener("DOMContentLoaded", function () {
  // ==========================================================================
  // 1. STATİK KATEGORİ FİLTRELEME (16 Orjinal Kart İçin)
  // ==========================================================================
  const filterButtons = document.querySelectorAll(".filter-btn");
  const artItems = document.querySelectorAll(".art-item");

  filterButtons.forEach((button) => {
    button.addEventListener("click", function () {
      filterButtons.forEach((btn) => btn.classList.remove("active"));
      this.classList.add("active");

      const filterValue = this.getAttribute("data-filter");

      artItems.forEach((item) => {
        const itemCategories = item.getAttribute("data-category").split(" ");

        if (filterValue === "all" || itemCategories.includes(filterValue)) {
          item.style.display = "block";
          setTimeout(() => {
            item.style.opacity = "1";
            item.style.transform = "scale(1)";
          }, 50);
        } else {
          item.style.opacity = "0";
          item.style.transform = "scale(0.95)";
          setTimeout(() => {
            item.style.display = "none";
          }, 300);
        }
      });
    });
  });

  // ==========================================================================
  // 2. BİLET / REZERVASYON FORMU YÖNETİMİ
  // ==========================================================================
  const bookingForm = document.getElementById("bookingForm");
  if (bookingForm) {
    bookingForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const name = document.getElementById("userName").value;
      const date = document.getElementById("visitDate").value;
      const count = document.getElementById("visitorCount").value;

      alert(
        `Sayın ${name}, ${date} tarihi için ${count} kişilik ücretsiz galeri giriş biletiniz başarıyla oluşturulmuştur. E-posta adresinizi kontrol ediniz.`,
      );
      bookingForm.reset();
    });
  }

  // ==========================================================================
  // 3. ASENKRON API VE CRUD İŞLEMLERİ (Ödev Alanı Yönetimi)
  // ==========================================================================
  const apiURL = "https://fakestoreapi.com/products?limit=4";
  let apiProductsList = [];
  const imgInput = document.getElementById("apiProductImage");
  const imgPreview = document.getElementById("formImagePreview");

  fetchApiData();

  // API Veri Getirme (Async/Await)
  async function fetchApiData() {
    const container = document.getElementById("apiDataContainer");
    const spinner = document.getElementById("apiLoadingSpinner");
    if (!container) return;

    try {
      if (spinner) spinner.style.display = "block";
      const response = await fetch(apiURL);
      apiProductsList = await response.json();
      renderApiProducts(apiProductsList);
    } catch (error) {
      console.error("API Hatası:", error);
      container.innerHTML = `<p class="text-danger text-center w-100">API bağlantısı kurulamadı.</p>`;
    } finally {
      if (spinner) spinner.style.display = "none";
    }
  }

  // Dinamik DOM Oluşturma
  function renderApiProducts(products) {
    const container = document.getElementById("apiDataContainer");
    if (!container) return;
    container.innerHTML = "";

    if (products.length === 0) {
      container.innerHTML = `<p class="text-muted text-center w-100">Aranan ürün bulunamadı.</p>`;
      return;
    }

    products.forEach((product) => {
      const card = document.createElement("div");
      card.className = "col-sm-6 col-md-4 col-lg-3 mb-4";
      card.innerHTML = `
        <div class="card art-card p-3 border-0 shadow-sm" style="background-color: var(--white-soft); height: 100%;">
          <div class="text-center mb-3" style="height: 180px; overflow: hidden;">
            <img src="${product.image}" alt="${product.title}" class="img-fluid h-100 object-fit-contain">
          </div>
          <h4 class="serif-font fs-5 text-truncate" title="${product.title}">${product.title}</h4>
          <p class="text-muted small">${product.price} $</p>
          <div class="d-flex gap-2 mt-auto">
            <button class="btn-crud btn-edit w-50" data-id="${product.id}">Düzenle</button>
            <button class="btn-crud btn-delete w-50" data-id="${product.id}">Sil</button>
          </div>
        </div>
      `;
      container.appendChild(card);
    });

    attachApiCrudEvents();
  }

  // Veri Ekleme & Güncelleme Formu (POST & PUT)
  const apiProductForm = document.getElementById("apiProductForm");
  if (apiProductForm) {
    apiProductForm.addEventListener("submit", async function (e) {
      e.preventDefault();

      const id = document.getElementById("apiProductId").value;
      const title = document.getElementById("apiProductTitle").value;
      const price = document.getElementById("apiProductPrice").value;
      const image = document.getElementById("apiProductImage").value;

      const productData = { title, price: parseFloat(price), image };

      if (id) {
        // GÜNCELLEME (PUT)
        try {
          await fetch(`https://fakestoreapi.com/products/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(productData),
          });
          const index = apiProductsList.findIndex((p) => p.id == id);
          apiProductsList[index] = {
            ...apiProductsList[index],
            ...productData,
          };
          renderApiProducts(apiProductsList);
          alert("Ürün başarıyla güncellendi!");
          resetApiForm();
        } catch (err) {
          console.error(err);
        }
      } else {
        // EKLEME (POST)
        try {
          const response = await fetch("https://fakestoreapi.com/products", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(productData),
          });
          const newData = await response.json();
          newData.id = Date.now();
          apiProductsList.unshift(newData);
          renderApiProducts(apiProductsList);
          alert("Yeni ürün API listesine eklendi!");
          resetApiForm();
        } catch (err) {
          console.error(err);
        }
      }
    });
  }

  // Dinamik Buton Olayları (Silme ve Düzenleme)
  function attachApiCrudEvents() {
    // SİLME (DELETE)
    document.querySelectorAll(".btn-delete").forEach((btn) => {
      btn.addEventListener("click", async function () {
        const id = parseInt(this.getAttribute("data-id"));
        if (confirm("Bu ürünü silmek istediğinize emin misiniz?")) {
          try {
            await fetch(`https://fakestoreapi.com/products/${id}`, {
              method: "DELETE",
            });
            apiProductsList = apiProductsList.filter((p) => p.id !== id);
            renderApiProducts(apiProductsList);
            alert("Ürün silindi!");
          } catch (err) {
            console.error(err);
          }
        }
      });
    });

    // DÜZENLEME FORMA VERİ ALMA
    document.querySelectorAll(".btn-edit").forEach((btn) => {
      btn.addEventListener("click", function () {
        const id = this.getAttribute("data-id");
        const product = apiProductsList.find((p) => p.id == id);
        if (product) {
          document.getElementById("apiProductId").value = product.id;
          document.getElementById("apiProductTitle").value = product.title;
          document.getElementById("apiProductPrice").value = product.price;
          document.getElementById("apiProductImage").value = product.image;

          if (imgPreview) imgPreview.src = product.image;

          document.getElementById("crudFormTitle").innerText =
            "🎨 Eseri Düzenle";
          document.getElementById("btnText").innerText =
            "Değişiklikleri Kaydet";
          document
            .getElementById("api-management-section")
            .scrollIntoView({ behavior: "smooth" });
        }
      });
    });
  }

  function resetApiForm() {
    if (apiProductForm) apiProductForm.reset();
    document.getElementById("apiProductId").value = "";
    document.getElementById("crudFormTitle").innerText =
      "🎨 Galeri Koleksiyonuna Ekle";
    document.getElementById("btnText").innerText = "Eseri Galeriye Kaydet";
    if (imgPreview)
      imgPreview.src =
        "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?q=80&w=400";
  }

  // URL İnput Değişiminde Canlı Önizleme Dinleyicisi
  if (imgInput && imgPreview) {
    imgInput.addEventListener("input", function () {
      if (this.value.trim() !== "") {
        imgPreview.src = this.value;
      } else {
        imgPreview.src =
          "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?q=80&w=400";
      }
    });
  }

  // ANLIK ARAMA SİSTEMİ
  const apiSearchInput = document.getElementById("apiSearchInput");
  if (apiSearchInput) {
    apiSearchInput.addEventListener("input", function (e) {
      const searchTerm = e.target.value.toLowerCase();
      const filtered = apiProductsList.filter((product) =>
        product.title.toLowerCase().includes(searchTerm),
      );
      renderApiProducts(filtered);
    });
  }
});
