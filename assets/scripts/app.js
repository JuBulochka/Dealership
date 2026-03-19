(function () {
  const STORAGE_KEYS = {
    cars: 'fresh_cars',
    cart: 'fresh_cart',
    favorites: 'fresh_favorites',
    testDrives: 'fresh_test_drives',
    users: 'fresh_users',
    session: 'fresh_session'
  };

  const seedCars = [
    { id: 1, brand: 'BMW', model: 'X5', year: 2022, mileage: 38000, price: 4590000, color: 'linear-gradient(135deg,#d8e6ff,#88a7d6)', image: 'assets/images/cars/bmwx5.webp', badges: ['Без ДТП', 'Зелёная автотека', 'Один владелец', 'Оригинал ПТС'] },
    { id: 2, brand: 'Kia', model: 'Sportage', year: 2021, mileage: 52000, price: 2390000, color: 'linear-gradient(135deg,#f3f4f6,#aab4c0)', image: 'assets/images/cars/sportage.webp', badges: ['Без ДТП', 'Один владелец', 'Оригинал ПТС', 'Отличное состояние'] },
    { id: 3, brand: 'Toyota', model: 'Camry', year: 2020, mileage: 64000, price: 2790000, color: 'linear-gradient(135deg,#f8fbff,#95b4de)', image: 'assets/images/cars/camry.webp', badges: ['Чистый отчет', 'Зелёная автотека', 'Оригинал ПТС'] },
    { id: 4, brand: 'Audi', model: 'A6', year: 2019, mileage: 71000, price: 3190000, color: 'linear-gradient(135deg,#e8eef7,#91a4bf)', image: 'assets/images/cars/audia6.webp', badges: ['Без ДТП', 'Один владелец', 'Чистый отчет'] },
    { id: 5, brand: 'Hyundai', model: 'Tucson', year: 2023, mileage: 19000, price: 2990000, color: 'linear-gradient(135deg,#eff6ff,#8fb3e5)', image: 'assets/images/cars/tucson.webp', badges: ['Отличное состояние', 'Оригинал ПТС', 'Зелёная автотека'] },
    { id: 6, brand: 'Lada', model: 'Vesta', year: 2022, mileage: 26000, price: 1390000, color: 'linear-gradient(135deg,#f6f7f9,#c4ccd8)', image: 'assets/images/cars/vesta.webp', badges: ['Один владелец', 'Без ДТП'] },
    { id: 7, brand: 'BMW', model: 'X5', year: 2022, mileage: 38000, price: 4590000, color: 'linear-gradient(135deg,#d8e6ff,#88a7d6)', image: 'assets/images/cars/bmwx5.webp', badges: ['Без ДТП', 'Зелёная автотека', 'Один владелец', 'Оригинал ПТС'] },
    { id: 8, brand: 'Kia', model: 'Sportage', year: 2021, mileage: 52000, price: 2390000, color: 'linear-gradient(135deg,#f3f4f6,#aab4c0)', image: 'assets/images/cars/sportage.webp', badges: ['Без ДТП', 'Один владелец', 'Оригинал ПТС', 'Отличное состояние'] },
    { id: 9, brand: 'Toyota', model: 'Camry', year: 2020, mileage: 64000, price: 2790000, color: 'linear-gradient(135deg,#f8fbff,#95b4de)', image: 'assets/images/cars/camry.webp', badges: ['Чистый отчет', 'Зелёная автотека', 'Оригинал ПТС'] },
    { id: 10, brand: 'Audi', model: 'A6', year: 2019, mileage: 71000, price: 3190000, color: 'linear-gradient(135deg,#e8eef7,#91a4bf)', image: 'assets/images/cars/audia6.webp', badges: ['Без ДТП', 'Один владелец', 'Чистый отчет'] },
    { id: 11, brand: 'Hyundai', model: 'Tucson', year: 2023, mileage: 19000, price: 2990000, color: 'linear-gradient(135deg,#eff6ff,#8fb3e5)', image: 'assets/images/cars/tucson.webp', badges: ['Отличное состояние', 'Оригинал ПТС', 'Зелёная автотека'] },
    { id: 12, brand: 'Lada', model: 'Vesta', year: 2022, mileage: 26000, price: 1390000, color: 'linear-gradient(135deg,#f6f7f9,#c4ccd8)', image: 'assets/images/cars/vesta.webp', badges: ['Один владелец', 'Без ДТП'] }
  ];

  function load(key, fallback) {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch (error) {
      return fallback;
    }
  }

  function save(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  function ensureStorage() {
    const cars = load(STORAGE_KEYS.cars, null);
    if (!Array.isArray(cars) || cars.length === 0) {
      save(STORAGE_KEYS.cars, seedCars);
    } else {
      const seedIds = new Set(seedCars.map((item) => item.id));
      const customCars = cars
        .filter((car) => !seedIds.has(car.id))
        .map((car) => ({
          ...car,
          image: car.image || '',
          badges: Array.isArray(car.badges) && car.badges.length
            ? car.badges
            : ['Один владелец', 'Оригинал ПТС']
        }));

      // Seed cars are always synced from code, so edits in seedCars are reflected immediately.
      const synced = [...seedCars.map((car) => ({ ...car })), ...customCars].sort((a, b) => a.id - b.id);
      save(STORAGE_KEYS.cars, synced);
    }

    const cart = load(STORAGE_KEYS.cart, null);
    if (!Array.isArray(cart)) {
      save(STORAGE_KEYS.cart, []);
    }

    const favorites = load(STORAGE_KEYS.favorites, null);
    if (!Array.isArray(favorites)) {
      save(STORAGE_KEYS.favorites, []);
    }

    const testDrives = load(STORAGE_KEYS.testDrives, null);
    if (!Array.isArray(testDrives)) {
      save(STORAGE_KEYS.testDrives, []);
    }

    const users = load(STORAGE_KEYS.users, null);
    if (!Array.isArray(users)) {
      save(STORAGE_KEYS.users, []);
    }
  }

  function getCars() {
    return load(STORAGE_KEYS.cars, []);
  }

  function getCart() {
    return load(STORAGE_KEYS.cart, []);
  }

  function getFavorites() {
    return load(STORAGE_KEYS.favorites, []);
  }

  function getSession() {
    return load(STORAGE_KEYS.session, null);
  }

  function getTestDrives() {
    return load(STORAGE_KEYS.testDrives, []);
  }

  function getUsers() {
    return load(STORAGE_KEYS.users, []);
  }

  function formatPrice(value) {
    return new Intl.NumberFormat('ru-RU').format(value) + ' ₽';
  }

  function updateCartBadge() {
    const badge = document.querySelector('[data-cart-count]');
    if (!badge) {
      return;
    }
    badge.textContent = String(getCart().length);
  }

  let toastTimer = null;

  function getToast() {
    let toast = document.querySelector('.app-toast');
    if (toast) {
      return toast;
    }
    toast = document.createElement('div');
    toast.className = 'app-toast';
    toast.setAttribute('role', 'status');
    toast.setAttribute('aria-live', 'polite');
    document.body.appendChild(toast);
    return toast;
  }

  function showToast(text) {
    const toast = getToast();
    toast.textContent = text;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.classList.remove('show');
    }, 1700);
  }

  function setStatus(text) {
    return text;
  }

  function normalize(value) {
    return String(value || '').trim().toLowerCase();
  }

  function uniqueBrands(cars) {
    return [...new Set(cars.map((car) => car.brand))].sort((a, b) => a.localeCompare(b, 'ru'));
  }

  function uniqueModels(cars, brand) {
    const brandNorm = normalize(brand);
    const filtered = brandNorm
      ? cars.filter((car) => normalize(car.brand) === brandNorm)
      : cars;
    return [...new Set(filtered.map((car) => car.model))].sort((a, b) => a.localeCompare(b, 'ru'));
  }

  function resolveByCaseInsensitive(options, rawValue) {
    const valueNorm = normalize(rawValue);
    if (!valueNorm) {
      return '';
    }
    return options.find((item) => normalize(item) === valueNorm) || '';
  }

  function fillSelect(select, options, placeholder, selectedValue) {
    if (!select) {
      return;
    }
    const selected = resolveByCaseInsensitive(options, selectedValue);
    select.innerHTML = [`<option value="">${placeholder}</option>`]
      .concat(options.map((item) => `<option value="${item}">${item}</option>`))
      .join('');
    select.value = selected;
  }

  function carCardMarkup(car) {
    const favoriteClass = getFavorites().includes(car.id) ? ' active' : '';
    return `
      <article class="car-card">
        <img class="car-thumb" src="${car.image || ''}" alt="${car.brand} ${car.model}" />
        <div class="car-meta">
          <h3>${car.brand} ${car.model}</h3>
          <p>${car.year} · ${new Intl.NumberFormat('ru-RU').format(car.mileage)} км</p>
          <strong>${formatPrice(car.price)}</strong>
        </div>
        <div class="car-actions">
          <a class="btn btn-outline" href="product.html?id=${car.id}">Подробнее</a>
          <button class="btn btn-primary" type="button" data-add-cart="${car.id}">В корзину</button>
          <button class="car-fav-btn${favoriteClass}" type="button" data-favorite="${car.id}" aria-label="В избранное">❤</button>
        </div>
      </article>
    `;
  }

  function carCatalogCardMarkup(car) {
    const monthly = Math.round(car.price / 68);
    const favoriteClass = getFavorites().includes(car.id) ? ' active' : '';
    const badgeClass = (badge) => {
      const norm = normalize(badge);
      if (norm.includes('один владелец')) return 'is-warm';
      if (norm.includes('оригинал птс')) return 'is-lilac';
      if (norm.includes('без дтп') || norm.includes('зелен') || norm.includes('зелё')) return 'is-blue';
      if (norm.includes('чистый')) return 'is-green';
      return 'is-blue';
    };
    const badges = Array.isArray(car.badges) && car.badges.length
      ? car.badges
      : ['Один владелец', 'Оригинал ПТС'];
    return `
      <article class="catalog-car-card">
        <a class="catalog-card-link" href="product.html?id=${car.id}">
          <div class="catalog-photo-wrap">
            <img class="catalog-photo" src="${car.image || ''}" alt="${car.brand} ${car.model}" />
            <button class="catalog-fav${favoriteClass}" type="button" data-favorite="${car.id}" aria-label="В избранное">❤</button>
          </div>
          <div class="catalog-body">
            <div class="catalog-headline">
              <h3>${car.brand} ${car.model}</h3>
              <strong>${car.year}</strong>
            </div>
            <div class="catalog-price">${formatPrice(car.price)}</div>
            <div class="catalog-tags">
              ${badges.map((badge) => `<span class="${badgeClass(badge)}">${badge}</span>`).join('')}
            </div>
            <p class="catalog-specs">${new Intl.NumberFormat('ru-RU').format(car.mileage)} км, 1.5 AMT (150 л.с.), Бензин, Передний</p>
            <div class="catalog-bottom">
              <span>Казань</span>
              <span>От ${formatPrice(monthly)}/мес.</span>
            </div>
          </div>
        </a>
      </article>
    `;
  }

  function bindAddToCart(root) {
    root.querySelectorAll('[data-add-cart]').forEach((button) => {
      button.addEventListener('click', (event) => {
        event.preventDefault();
        event.stopPropagation();
        const carId = Number(button.getAttribute('data-add-cart'));
        const cart = getCart();
        if (!cart.includes(carId)) {
          cart.push(carId);
          save(STORAGE_KEYS.cart, cart);
          showToast('Товар добавлен в корзину');
        }
        updateCartBadge();
      });
    });
  }

  function bindFavoriteButtons(root) {
    root.querySelectorAll('[data-favorite]').forEach((button) => {
      button.addEventListener('click', (event) => {
        event.preventDefault();
        event.stopPropagation();
        const carId = Number(button.getAttribute('data-favorite'));
        if (!carId) {
          return;
        }
        const favorites = getFavorites();
        const exists = favorites.includes(carId);
        const nextFavorites = exists
          ? favorites.filter((id) => id !== carId)
          : [...favorites, carId];
        save(STORAGE_KEYS.favorites, nextFavorites);
        button.classList.toggle('active', !exists);

        document.querySelectorAll(`[data-favorite="${carId}"]`).forEach((item) => {
          item.classList.toggle('active', !exists);
        });
      });
    });
  }

  function initHomePage() {
    const featured = document.querySelector('[data-featured]');
    const brandList = document.querySelector('[data-brand-list]');
    const findForm = document.querySelector('[data-find-form]');
    const newsletterForm = document.querySelector('[data-newsletter-form]');
    const heroCarousel = document.querySelector('[data-hero-carousel]');
    const searchInput = document.querySelector('[data-home-search]');
    const brandSelect = document.querySelector('[data-home-brand]');
    const modelSelect = document.querySelector('[data-home-model]');

    const cars = getCars();
    let heroTimer = null;

    function initHeroCarousel() {
      if (!heroCarousel) {
        return;
      }
      const slides = [...heroCarousel.querySelectorAll('.m-hero-slide')];
      const dots = [...heroCarousel.querySelectorAll('[data-hero-to]')];
      if (slides.length <= 1) {
        return;
      }

      let activeIndex = 0;
      function goTo(index) {
        activeIndex = (index + slides.length) % slides.length;
        slides.forEach((slide, idx) => {
          slide.classList.toggle('is-active', idx === activeIndex);
        });
        dots.forEach((dot, idx) => {
          dot.classList.toggle('active', idx === activeIndex);
        });
      }

      dots.forEach((dot) => {
        dot.addEventListener('click', () => {
          goTo(Number(dot.getAttribute('data-hero-to')) || 0);
        });
      });

      heroTimer = setInterval(() => {
        goTo(activeIndex + 1);
      }, 4200);
    }

    initHeroCarousel();

    function renderFeatured(carsToRender) {
      if (!featured) {
        return;
      }
      const items = carsToRender.slice(0, 5);
      featured.innerHTML = items.length
        ? items.map(carCardMarkup).join('')
        : '<p class="empty">По вашему запросу ничего не найдено.</p>';
      bindAddToCart(featured);
      bindFavoriteButtons(featured);
    }

    renderFeatured(cars);

    if (brandList) {
      const brands = uniqueBrands(cars);
      brandList.innerHTML = brands
        .map((brand) => `<a class="chip" href="catalog.html?brand=${encodeURIComponent(brand)}">${brand}</a>`)
        .join('');
    }

    if (brandSelect && modelSelect) {
      const brands = uniqueBrands(cars);
      fillSelect(brandSelect, brands, 'Марка', '');
      fillSelect(modelSelect, uniqueModels(cars, ''), 'Модель', '');

      brandSelect.addEventListener('change', () => {
        fillSelect(modelSelect, uniqueModels(cars, brandSelect.value), 'Модель', '');
      });
    }

    if (searchInput) {
      searchInput.addEventListener('input', () => {
        const term = normalize(searchInput.value);
        const filtered = cars.filter((car) => {
          const title = `${car.brand} ${car.model}`;
          return !term || normalize(title).includes(term);
        });
        renderFeatured(filtered);
        setStatus(`Найдено: ${filtered.length}`);
      });
    }

    if (findForm) {
      findForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const form = new FormData(findForm);
        const brand = String(form.get('brand') || '').trim();
        const model = String(form.get('model') || '').trim();
        const params = new URLSearchParams();
        if (brand) {
          params.set('brand', brand);
        }
        if (model) {
          params.set('model', model);
        }
        window.location.href = `catalog.html${params.toString() ? `?${params.toString()}` : ''}`;
      });
    }

    if (newsletterForm) {
      newsletterForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const formData = new FormData(newsletterForm);
        const email = String(formData.get('email') || '').trim();
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
          showToast('Введите корректный email');
          return;
        }
        showToast('Подписка оформлена');
        newsletterForm.reset();
      });
    }

    window.addEventListener('beforeunload', () => {
      if (heroTimer) {
        clearInterval(heroTimer);
      }
    });
  }

  function initCatalogPage() {
    const list = document.querySelector('[data-catalog-list]');
    const form = document.querySelector('[data-catalog-filter]');
    const pagination = document.querySelector('[data-catalog-pagination]');
    if (!list || !form || !pagination) {
      return;
    }

    const cars = getCars();
    const url = new URL(window.location.href);
    const brandQuery = url.searchParams.get('brand') || '';
    const modelQuery = url.searchParams.get('model') || '';
    const PAGE_SIZE = 10;
    let currentPage = Math.max(1, Number(url.searchParams.get('page') || 1));

    const brandSelect = form.querySelector('[name="brand"]');
    const modelSelect = form.querySelector('[name="model"]');

    const allBrands = uniqueBrands(cars);
    if (brandSelect) {
      fillSelect(brandSelect, allBrands, 'Все марки', brandQuery);
    }

    if (modelSelect) {
      fillSelect(modelSelect, uniqueModels(cars, brandSelect ? brandSelect.value : ''), 'Все модели', modelQuery);
    }

    function getFilteredCars() {
      const brand = normalize(brandSelect ? brandSelect.value : '');
      const model = normalize(modelSelect ? modelSelect.value : '');

      return getCars().filter((car) => {
        const fitsBrand = !brand || normalize(car.brand) === brand;
        const fitsModel = !model || normalize(car.model) === model;
        return fitsBrand && fitsModel;
      });
    }

    function renderPagination(totalPages) {
      if (totalPages <= 1) {
        pagination.innerHTML = '';
        return;
      }

      const buttons = [];
      for (let page = 1; page <= totalPages; page += 1) {
        buttons.push(`<button class="page-btn${page === currentPage ? ' active' : ''}" type="button" data-page="${page}">${page}</button>`);
      }
      pagination.innerHTML = buttons.join('');

      pagination.querySelectorAll('[data-page]').forEach((button) => {
        button.addEventListener('click', () => {
          currentPage = Number(button.getAttribute('data-page'));
          render();
        });
      });
    }

    function syncUrl() {
      const next = new URL(window.location.href);
      const brand = brandSelect ? brandSelect.value : '';
      const model = modelSelect ? modelSelect.value : '';
      if (brand) {
        next.searchParams.set('brand', brand);
      } else {
        next.searchParams.delete('brand');
      }
      if (model) {
        next.searchParams.set('model', model);
      } else {
        next.searchParams.delete('model');
      }
      if (currentPage > 1) {
        next.searchParams.set('page', String(currentPage));
      } else {
        next.searchParams.delete('page');
      }
      window.history.replaceState(null, '', `${next.pathname}${next.search}`);
    }

    function render() {
      const filteredCars = getFilteredCars();
      const totalPages = Math.max(1, Math.ceil(filteredCars.length / PAGE_SIZE));
      if (currentPage > totalPages) {
        currentPage = totalPages;
      }
      const start = (currentPage - 1) * PAGE_SIZE;
      const pageCars = filteredCars.slice(start, start + PAGE_SIZE);

      list.innerHTML = pageCars.length
        ? pageCars.map(carCatalogCardMarkup).join('')
        : '<p class="empty">По вашему запросу авто не найдено.</p>';
      bindAddToCart(list);
      bindFavoriteButtons(list);
      renderPagination(totalPages);
      syncUrl();
    }

    if (brandSelect && modelSelect) {
      brandSelect.addEventListener('change', () => {
        fillSelect(modelSelect, uniqueModels(getCars(), brandSelect.value), 'Все модели', '');
        currentPage = 1;
        render();
      });

      modelSelect.addEventListener('change', () => {
        currentPage = 1;
        render();
      });
    }

    form.addEventListener('submit', (event) => {
      event.preventDefault();
      currentPage = 1;
      render();
    });

    render();
  }

  function initProductPage() {
    const root = document.querySelector('[data-product-root]');
    if (!root) {
      return;
    }

    const url = new URL(window.location.href);
    const id = Number(url.searchParams.get('id'));
    const car = getCars().find((item) => item.id === id) || getCars()[0];

    if (!car) {
      root.innerHTML = '<p class="empty">Карточка товара недоступна.</p>';
      return;
    }

    const numberFmt = new Intl.NumberFormat('ru-RU');
    const loanMinDown = 0;
    const loanMaxDown = Math.floor(car.price * 0.85);
    const defaultDown = Math.floor(car.price * 0.25);
    const defaultTerm = 60;
    const defaultRate = 14.5;

    root.innerHTML = `
      <article class="p-card">
        <div class="p-top">
          <h1>${car.brand} ${car.model}, ${car.year}</h1>
          <p>${numberFmt.format(car.mileage)} км · Автомат · Бензин</p>
          <div class="p-price">${formatPrice(car.price)}</div>
        </div>

        <div class="p-gallery">
          <img class="p-image" src="${car.image || ''}" alt="${car.brand} ${car.model}" data-main-image />
          <div class="p-thumbs">
            <button type="button" class="p-thumb active" data-thumb="${car.image || ''}"></button>
            <button type="button" class="p-thumb" data-thumb="${car.image || ''}"></button>
            <button type="button" class="p-thumb" data-thumb="${car.image || ''}"></button>
            <button type="button" class="p-thumb" data-thumb="${car.image || ''}"></button>
          </div>
        </div>

        <div class="p-actions">
          <button class="btn btn-primary" type="button" data-add-cart="${car.id}">В корзину</button>
          <button class="btn p-call-btn" type="button" data-product-call>Позвонить</button>
          <button class="btn btn-outline p-fav-btn${getFavorites().includes(car.id) ? ' active' : ''}" type="button" data-favorite="${car.id}">❤ В избранное</button>
          <a class="btn btn-outline" href="catalog.html">В каталог</a>
        </div>

        <section class="p-section">
          <h3>Характеристики</h3>
          <div class="p-specs">
            <div><span>Марка</span><strong>${car.brand}</strong></div>
            <div><span>Модель</span><strong>${car.model}</strong></div>
            <div><span>Год выпуска</span><strong>${car.year}</strong></div>
            <div><span>Пробег</span><strong>${numberFmt.format(car.mileage)} км</strong></div>
            <div><span>Двигатель</span><strong>2.0 л / 249 л.с.</strong></div>
            <div><span>Привод</span><strong>Полный</strong></div>
            <div><span>Коробка</span><strong>Автомат</strong></div>
            <div><span>VIN проверка</span><strong>Пройдена</strong></div>
          </div>
        </section>

        <section class="p-section p-credit">
          <h3>Калькулятор автокредита</h3>
          <div class="p-credit-grid">
            <label>
              <span>Первоначальный взнос</span>
              <input type="range" min="${loanMinDown}" max="${loanMaxDown}" step="50000" value="${defaultDown}" data-loan-down />
              <strong data-loan-down-value>${formatPrice(defaultDown)}</strong>
            </label>
            <label>
              <span>Срок кредита</span>
              <input type="range" min="12" max="84" step="12" value="${defaultTerm}" data-loan-term />
              <strong data-loan-term-value>${defaultTerm} мес.</strong>
            </label>
            <label>
              <span>Ставка</span>
              <input type="range" min="6" max="28" step="0.1" value="${defaultRate}" data-loan-rate />
              <strong data-loan-rate-value>${defaultRate}%</strong>
            </label>
          </div>
          <div class="p-loan-result">
            <div><span>Ежемесячный платеж</span><strong data-loan-monthly>0 ₽</strong></div>
            <div><span>Сумма кредита</span><strong data-loan-body>0 ₽</strong></div>
            <div><span>Переплата</span><strong data-loan-overpay>0 ₽</strong></div>
          </div>
          <button class="btn btn-primary" type="button" data-loan-submit>Отправить заявку</button>
        </section>

        <section class="p-section">
          <h3>Гарантии и условия</h3>
          <ul class="p-list">
            <li>Юридическая чистота и проверка документов</li>
            <li>Полная техническая диагностика перед продажей</li>
            <li>Онлайн-бронирование и дистанционная сделка</li>
          </ul>
        </section>

        <section class="p-section">
          <h3>Доставка в вашем городе</h3>
          <div class="p-delivery">
            <div><span>Срок</span><strong>от 1 до 7 дней</strong></div>
            <div><span>Стоимость</span><strong>от 12 000 ₽</strong></div>
            <button type="button" class="btn btn-outline" data-delivery-btn>Уточнить условия</button>
          </div>
        </section>
      </article>
    `;
    bindAddToCart(root);
    bindFavoriteButtons(root);

    const mainImage = root.querySelector('[data-main-image]');
    root.querySelectorAll('[data-thumb]').forEach((button) => {
      const thumbSrc = button.getAttribute('data-thumb') || '';
      button.style.backgroundImage = `url("${thumbSrc}")`;
      button.style.backgroundSize = 'cover';
      button.style.backgroundPosition = 'center';
      button.addEventListener('click', () => {
        root.querySelectorAll('[data-thumb]').forEach((item) => item.classList.remove('active'));
        button.classList.add('active');
        if (mainImage) {
          mainImage.src = thumbSrc;
        }
      });
    });

    const downInput = root.querySelector('[data-loan-down]');
    const termInput = root.querySelector('[data-loan-term]');
    const rateInput = root.querySelector('[data-loan-rate]');

    const downValue = root.querySelector('[data-loan-down-value]');
    const termValue = root.querySelector('[data-loan-term-value]');
    const rateValue = root.querySelector('[data-loan-rate-value]');
    const monthlyValue = root.querySelector('[data-loan-monthly]');
    const bodyValue = root.querySelector('[data-loan-body]');
    const overpayValue = root.querySelector('[data-loan-overpay]');
    const submitLoan = root.querySelector('[data-loan-submit]');
    const callBtn = root.querySelector('[data-product-call]');
    const deliveryBtn = root.querySelector('[data-delivery-btn]');

    function calcLoan() {
      const down = Number(downInput ? downInput.value : 0);
      const term = Number(termInput ? termInput.value : 12);
      const rate = Number(rateInput ? rateInput.value : 10);

      const body = Math.max(car.price - down, 0);
      const monthlyRate = rate / 12 / 100;
      let monthly = 0;
      if (body > 0 && term > 0) {
        if (monthlyRate === 0) {
          monthly = body / term;
        } else {
          const coefficient = (monthlyRate * Math.pow(1 + monthlyRate, term)) / (Math.pow(1 + monthlyRate, term) - 1);
          monthly = body * coefficient;
        }
      }

      const total = monthly * term;
      const overpay = Math.max(total - body, 0);

      if (downValue) {
        downValue.textContent = formatPrice(down);
      }
      if (termValue) {
        termValue.textContent = `${term} мес.`;
      }
      if (rateValue) {
        rateValue.textContent = `${rate.toFixed(1)}%`;
      }
      if (bodyValue) {
        bodyValue.textContent = formatPrice(Math.round(body));
      }
      if (monthlyValue) {
        monthlyValue.textContent = formatPrice(Math.round(monthly));
      }
      if (overpayValue) {
        overpayValue.textContent = formatPrice(Math.round(overpay));
      }
    }

    [downInput, termInput, rateInput].forEach((control) => {
      if (control) {
        control.addEventListener('input', calcLoan);
      }
    });

    if (submitLoan) {
      submitLoan.addEventListener('click', () => {
        const monthlyText = monthlyValue ? monthlyValue.textContent : '';
        setStatus(`Заявка по кредиту отправлена. Платеж: ${monthlyText}`);
      });
    }

    if (callBtn) {
      callBtn.addEventListener('click', () => {
        setStatus('Запрос на звонок отправлен менеджеру');
      });
    }

    if (deliveryBtn) {
      deliveryBtn.addEventListener('click', () => {
        setStatus('Менеджер свяжется по условиям доставки');
      });
    }

    calcLoan();
  }

  function initCartPage() {
    const root = document.querySelector('[data-cart-root]');
    const totalEl = document.querySelector('[data-cart-total]');
    const clearBtn = document.querySelector('[data-clear-cart]');
    if (!root || !totalEl) {
      return;
    }

    function render() {
      const cars = getCars();
      const cartIds = getCart();
      const items = cartIds
        .map((id) => cars.find((car) => car.id === id))
        .filter(Boolean);

      if (items.length === 0) {
        root.innerHTML = '<p class="empty">Корзина пуста.</p>';
        totalEl.textContent = formatPrice(0);
        updateCartBadge();
        return;
      }

      root.innerHTML = items
        .map(
          (car) => `
          <article class="cart-item">
            <img class="car-thumb" src="${car.image || ''}" alt="${car.brand} ${car.model}" />
            <div>
              <h3>${car.brand} ${car.model}</h3>
              <p>${car.year} · ${new Intl.NumberFormat('ru-RU').format(car.mileage)} км</p>
              <strong>${formatPrice(car.price)}</strong>
            </div>
            <button class="btn btn-outline" type="button" data-remove-cart="${car.id}">Удалить</button>
          </article>
        `
        )
        .join('');

      const total = items.reduce((sum, car) => sum + car.price, 0);
      totalEl.textContent = formatPrice(total);

      root.querySelectorAll('[data-remove-cart]').forEach((button) => {
        button.addEventListener('click', () => {
          const id = Number(button.getAttribute('data-remove-cart'));
          const next = getCart().filter((item) => item !== id);
          save(STORAGE_KEYS.cart, next);
          render();
          setStatus('Позиция удалена из корзины');
        });
      });

      updateCartBadge();
    }

    if (clearBtn) {
      clearBtn.addEventListener('click', () => {
        save(STORAGE_KEYS.cart, []);
        render();
        setStatus('Корзина очищена');
      });
    }

    render();
  }

  function initRegisterPage() {
    const form = document.querySelector('[data-register-form]');
    const greeting = document.querySelector('[data-user-greeting]');
    const title = document.querySelector('[data-auth-title]');
    const message = document.querySelector('[data-auth-message]');
    const submitBtn = document.querySelector('[data-auth-submit]');
    const logoutBtn = document.querySelector('[data-auth-logout]');
    const nameInput = document.querySelector('[data-auth-name]');
    const tabs = [...document.querySelectorAll('[data-auth-mode]')];
    if (!form) {
      return;
    }

    let mode = 'register';

    function setMessage(text, type) {
      if (!message) {
        return;
      }
      message.textContent = text || '';
      message.classList.toggle('is-error', type === 'error');
      message.classList.toggle('is-success', type === 'success');
    }

    function applyMode(nextMode) {
      mode = nextMode;
      tabs.forEach((tab) => tab.classList.toggle('active', tab.getAttribute('data-auth-mode') === mode));
      if (title) {
        title.textContent = mode === 'register' ? 'Регистрация' : 'Авторизация';
      }
      if (submitBtn) {
        submitBtn.textContent = mode === 'register' ? 'Зарегистрироваться' : 'Войти';
      }
      if (nameInput) {
        const showName = mode === 'register';
        nameInput.hidden = !showName;
        nameInput.toggleAttribute('required', showName);
      }
      if (greeting) {
        greeting.textContent = mode === 'register'
          ? 'Создайте аккаунт для покупки и бронирования авто.'
          : 'Войдите в существующий аккаунт.';
      }
      setMessage('', '');
    }

    applyMode('register');

    const session = load(STORAGE_KEYS.session, null);
    if (session) {
      if (greeting) {
        greeting.textContent = `Вы вошли как ${session.name || session.email}`;
      }
      if (logoutBtn) {
        logoutBtn.hidden = false;
      }
    }

    tabs.forEach((tab) => {
      tab.addEventListener('click', () => {
        applyMode(tab.getAttribute('data-auth-mode') || 'register');
      });
    });

    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const data = new FormData(form);
      const name = String(data.get('name') || '').trim();
      const email = String(data.get('email') || '').trim();
      const password = String(data.get('password') || '').trim();
      const users = getUsers();

      if (!email || !password || (mode === 'register' && !name)) {
        setMessage('Заполните обязательные поля', 'error');
        return;
      }

      if (mode === 'register') {
        const exists = users.some((user) => user.email.toLowerCase() === email.toLowerCase());
        if (exists) {
          setMessage('Пользователь с таким email уже существует', 'error');
          return;
        }

        users.push({ id: Date.now(), name, email, password });
        save(STORAGE_KEYS.users, users);
        save(STORAGE_KEYS.session, { name, email });
        form.reset();
        if (greeting) {
          greeting.textContent = `Вы вошли как ${name}`;
        }
        if (logoutBtn) {
          logoutBtn.hidden = false;
        }
        setMessage('Регистрация успешна. Вы авторизованы.', 'success');
        return;
      }

      const found = users.find((user) => user.email.toLowerCase() === email.toLowerCase());
      if (!found || found.password !== password) {
        setMessage('Неверный email или пароль', 'error');
        return;
      }

      save(STORAGE_KEYS.session, { name: found.name, email: found.email });
      form.reset();
      if (greeting) {
        greeting.textContent = `Вы вошли как ${found.name}`;
      }
      if (logoutBtn) {
        logoutBtn.hidden = false;
      }
      setMessage('Вход выполнен успешно.', 'success');
    });

    if (logoutBtn) {
      logoutBtn.addEventListener('click', () => {
        localStorage.removeItem(STORAGE_KEYS.session);
        form.reset();
        logoutBtn.hidden = true;
        if (greeting) {
          greeting.textContent = mode === 'register'
            ? 'Создайте аккаунт для покупки и бронирования авто.'
            : 'Войдите в существующий аккаунт.';
        }
        setMessage('Вы вышли из аккаунта.', 'success');
      });
    }

  }

  function initProfilePage() {
    const root = document.querySelector('[data-profile-root]');
    if (!root) {
      return;
    }

    const pageUrl = new URL(window.location.href);
    const focusTestDrive = pageUrl.searchParams.get('tab') === 'test-drive';

    const session = getSession();
    if (!session || !session.email) {
      root.innerHTML = `
        <section class="profile-card">
          <h1 class="section-title">Личный кабинет</h1>
          <p class="profile-subtitle">Для доступа к кабинету выполните вход.</p>
          <p class="profile-subtitle">После входа вы сможете записаться на тест-драйв и видеть все свои заявки.</p>
          <a class="btn btn-primary" href="register.html">Войти или зарегистрироваться</a>
        </section>
      `;
      return;
    }

    function render() {
      const cars = getCars();
      const favorites = getFavorites();
      const favoriteCars = getCars().filter((car) => favorites.includes(car.id));
      const emailNorm = String(session.email || '').toLowerCase();
      const userDrives = getTestDrives()
        .filter((item) => String(item.userEmail || '').toLowerCase() === emailNorm)
        .sort((a, b) => Number(b.createdAt || 0) - Number(a.createdAt || 0));
      const today = new Date();
      const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;

      root.innerHTML = `
        <section class="profile-card">
          <h1 class="section-title">Личный кабинет</h1>
          <div class="profile-grid">
            <div class="profile-item">
              <span>Имя</span>
              <strong>${session.name || 'Пользователь'}</strong>
            </div>
            <div class="profile-item">
              <span>Email</span>
              <strong>${session.email}</strong>
            </div>
            <div class="profile-item">
              <span>Товаров в корзине</span>
              <strong>${getCart().length}</strong>
            </div>
            <div class="profile-item">
              <span>В избранном</span>
              <strong>${favoriteCars.length}</strong>
            </div>
          </div>
          <div class="profile-actions">
            <a class="btn btn-outline" href="catalog.html">В каталог</a>
            <button class="btn btn-primary" type="button" data-profile-logout>Выйти</button>
          </div>
        </section>

        <section class="profile-card profile-test-drive" data-test-drive-section>
          <h2 class="section-title">Запись на тест-драйв</h2>
          <form class="simple-form profile-testdrive-form" data-test-drive-form>
            <select name="carId" required>
              <option value="">Выберите автомобиль</option>
              ${cars.map((car) => `<option value="${car.id}">${car.brand} ${car.model}, ${car.year}</option>`).join('')}
            </select>
            <div class="profile-testdrive-row">
              <input type="date" name="date" min="${todayStr}" required />
              <input type="time" name="time" required />
            </div>
            <input type="text" name="place" placeholder="Город/салон (например, Казань, Победы 141)" required />
            <textarea name="comment" rows="3" placeholder="Комментарий (необязательно)"></textarea>
            <button class="btn btn-primary" type="submit">Записаться на тест-драйв</button>
          </form>
          <div class="profile-testdrive-list">
            <h3>Мои записи</h3>
            ${
              userDrives.length
                ? userDrives.map((item) => `
                  <article class="profile-drive-item">
                    <div>
                      <strong>${item.carTitle}</strong>
                      <p>${item.date} в ${item.time}</p>
                      <p>${item.place}</p>
                      ${item.comment ? `<p>${item.comment}</p>` : ''}
                    </div>
                    <div class="profile-drive-meta">
                      <span>${item.status || 'Новая'}</span>
                      <button class="btn btn-outline" type="button" data-drive-delete="${item.id}">Отменить</button>
                    </div>
                  </article>
                `).join('')
                : '<p class="empty">Записей на тест-драйв пока нет.</p>'
            }
          </div>
        </section>

        <section class="profile-card profile-favorites">
          <h2 class="section-title">Избранные автомобили</h2>
          ${
            favoriteCars.length
              ? favoriteCars.map((car) => `
                <article class="profile-fav-item">
                  <img src="${car.image || ''}" alt="${car.brand} ${car.model}">
                  <div>
                    <h3>${car.brand} ${car.model}</h3>
                    <p>${car.year} · ${new Intl.NumberFormat('ru-RU').format(car.mileage)} км</p>
                    <strong>${formatPrice(car.price)}</strong>
                  </div>
                  <div class="profile-fav-actions">
                    <a class="btn btn-outline" href="product.html?id=${car.id}">Открыть</a>
                    <button class="car-fav-btn active" type="button" data-favorite="${car.id}" aria-label="Убрать из избранного">❤</button>
                  </div>
                </article>
              `).join('')
              : '<p class="empty">В избранном пока нет автомобилей.</p>'
          }
        </section>
      `;

      const logoutBtn = root.querySelector('[data-profile-logout]');
      if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
          localStorage.removeItem(STORAGE_KEYS.session);
          window.location.href = 'register.html';
        });
      }

      const testDriveForm = root.querySelector('[data-test-drive-form]');
      if (testDriveForm) {
        testDriveForm.addEventListener('submit', (event) => {
          event.preventDefault();
          const form = new FormData(testDriveForm);
          const carId = Number(form.get('carId'));
          const date = String(form.get('date') || '').trim();
          const time = String(form.get('time') || '').trim();
          const place = String(form.get('place') || '').trim();
          const comment = String(form.get('comment') || '').trim();
          const car = getCars().find((item) => item.id === carId);

          if (!car || !date || !time || !place) {
            showToast('Заполните форму полностью');
            return;
          }

          const next = getTestDrives();
          next.push({
            id: Date.now(),
            userEmail: session.email,
            carId: car.id,
            carTitle: `${car.brand} ${car.model}, ${car.year}`,
            date,
            time,
            place,
            comment,
            status: 'Новая',
            createdAt: Date.now()
          });
          save(STORAGE_KEYS.testDrives, next);
          showToast('Запись на тест-драйв создана');
          render();
        });
      }

      root.querySelectorAll('[data-drive-delete]').forEach((button) => {
        button.addEventListener('click', () => {
          const driveId = Number(button.getAttribute('data-drive-delete'));
          const email = String(session.email || '').toLowerCase();
          const next = getTestDrives().filter((item) => {
            const isOwner = String(item.userEmail || '').toLowerCase() === email;
            return !(isOwner && Number(item.id) === driveId);
          });
          save(STORAGE_KEYS.testDrives, next);
          showToast('Запись отменена');
          render();
        });
      });

      bindFavoriteButtons(root);
      root.querySelectorAll('.profile-fav-item [data-favorite]').forEach((button) => {
        button.addEventListener('click', () => {
          setTimeout(render, 0);
        });
      });

      if (focusTestDrive) {
        const section = root.querySelector('[data-test-drive-section]');
        if (section) {
          section.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    }

    render();
  }

  function initAdminPage() {
    const tbody = document.querySelector('[data-admin-body]');
    const form = document.querySelector('[data-admin-form]');
    const resetBtn = document.querySelector('[data-admin-reset]');
    if (!tbody || !form) {
      return;
    }

    const idInput = form.querySelector('[name="id"]');
    const brandInput = form.querySelector('[name="brand"]');
    const modelInput = form.querySelector('[name="model"]');
    const yearInput = form.querySelector('[name="year"]');
    const mileageInput = form.querySelector('[name="mileage"]');
    const priceInput = form.querySelector('[name="price"]');

    function renderTable() {
      const cars = getCars();
      tbody.innerHTML = cars
        .map(
          (car) => `
          <tr>
            <td>${car.id}</td>
            <td>${car.brand}</td>
            <td>${car.model}</td>
            <td>${car.year}</td>
            <td>${new Intl.NumberFormat('ru-RU').format(car.mileage)}</td>
            <td>${new Intl.NumberFormat('ru-RU').format(car.price)}</td>
            <td>
              <button class="btn btn-outline" type="button" data-edit="${car.id}">Ред.</button>
              <button class="btn btn-outline" type="button" data-delete="${car.id}">Удал.</button>
            </td>
          </tr>
        `
        )
        .join('');

      tbody.querySelectorAll('[data-edit]').forEach((button) => {
        button.addEventListener('click', () => {
          const id = Number(button.getAttribute('data-edit'));
          const car = getCars().find((item) => item.id === id);
          if (!car) {
            return;
          }
          idInput.value = String(car.id);
          brandInput.value = car.brand;
          modelInput.value = car.model;
          yearInput.value = String(car.year);
          mileageInput.value = String(car.mileage);
          priceInput.value = String(car.price);
          setStatus(`Редактирование ID ${car.id}`);
        });
      });

      tbody.querySelectorAll('[data-delete]').forEach((button) => {
        button.addEventListener('click', () => {
          const id = Number(button.getAttribute('data-delete'));
          const nextCars = getCars().filter((item) => item.id !== id);
          save(STORAGE_KEYS.cars, nextCars);
          const nextCart = getCart().filter((item) => item !== id);
          save(STORAGE_KEYS.cart, nextCart);
          const nextFavorites = getFavorites().filter((item) => item !== id);
          save(STORAGE_KEYS.favorites, nextFavorites);
          const nextDrives = getTestDrives().filter((item) => Number(item.carId) !== id);
          save(STORAGE_KEYS.testDrives, nextDrives);
          renderTable();
          updateCartBadge();
          setStatus(`Авто ID ${id} удалено`);
        });
      });
    }

    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const id = Number(idInput.value);
      const carDraft = {
        brand: String(brandInput.value || '').trim(),
        model: String(modelInput.value || '').trim(),
        year: Number(yearInput.value),
        mileage: Number(mileageInput.value),
        price: Number(priceInput.value),
        color: 'linear-gradient(135deg,#ecf4ff,#8eaee0)'
      };

      if (!carDraft.brand || !carDraft.model || !carDraft.year || !carDraft.mileage || !carDraft.price) {
        setStatus('Заполните форму автомобиля полностью');
        return;
      }

      const cars = getCars();
      if (id) {
        const idx = cars.findIndex((car) => car.id === id);
        if (idx >= 0) {
          cars[idx] = { ...cars[idx], ...carDraft };
        }
        setStatus(`Авто ID ${id} обновлено`);
      } else {
        const nextId = cars.reduce((max, car) => Math.max(max, car.id), 0) + 1;
        cars.push({ id: nextId, ...carDraft });
        setStatus(`Авто ID ${nextId} добавлено`);
      }

      save(STORAGE_KEYS.cars, cars);
      form.reset();
      idInput.value = '';
      renderTable();
    });

    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        form.reset();
        idInput.value = '';
      });
    }

    renderTable();
  }

  function setupMobileMenu() {
    const toggle = document.querySelector('[data-menu-toggle]');
    const nav = document.querySelector('[data-main-nav]');

    if (!toggle || !nav) {
      return;
    }

    // Inject nav head (logo and close button) if it doesn't exist
    if (!nav.querySelector('.nav-head')) {
      const head = document.createElement('div');
      head.className = 'nav-head';
      head.innerHTML = '<a class="logo" href="index.html"><img src="assets/images/logo.png" alt="ALMOCAR" height="30"></a><button class="menu-close-btn" type="button" data-menu-close>&times;</button>';
      nav.insertBefore(head, nav.firstChild);
    }

    // Inject overlay if it doesn't exist
    let overlay = document.querySelector('[data-menu-overlay]');
    if (!overlay) {
      overlay = document.createElement('div');
      overlay.className = 'sidebar-overlay';
      overlay.setAttribute('data-menu-overlay', '');
      document.body.appendChild(overlay);
    }

    const closeBtn = document.querySelector('[data-menu-close]');

    function openMenu() {
      nav.classList.add('open');
      if (overlay) overlay.classList.add('active');
      document.body.style.overflow = 'hidden'; // preserve scrolling
    }

    function closeMenu() {
      nav.classList.remove('open');
      if (overlay) overlay.classList.remove('active');
      document.body.style.overflow = '';
    }

    toggle.addEventListener('click', openMenu);

    if (closeBtn) {
      closeBtn.addEventListener('click', closeMenu);
    }
    
    if (overlay) {
      overlay.addEventListener('click', closeMenu);
    }
  }

  ensureStorage();
  updateCartBadge();
  setupMobileMenu();

  const page = document.body.getAttribute('data-page');
  if (page === 'home') {
    initHomePage();
  }
  if (page === 'catalog') {
    initCatalogPage();
  }
  if (page === 'product') {
    initProductPage();
  }
  if (page === 'cart') {
    initCartPage();
  }
  if (page === 'register') {
    initRegisterPage();
  }
  if (page === 'profile') {
    initProfilePage();
  }
  if (page === 'admin') {
    initAdminPage();
  }
})();
