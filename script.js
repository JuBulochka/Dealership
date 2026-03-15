const brandSelect = document.querySelector('#brandSelect');
const modelInput = document.querySelector('#modelInput');
const searchInput = document.querySelector('#searchInput');
const findCarForm = document.querySelector('#findCarForm');
const estimateForm = document.querySelector('#estimateForm');
const estimateBrand = document.querySelector('#estimateBrand');
const estimateModel = document.querySelector('#estimateModel');
const calcPriceBtn = document.querySelector('#calcPriceBtn');
const tradeInBtn = document.querySelector('#tradeInBtn');
const brandItems = [...document.querySelectorAll('.brand-item')];
const iconButtons = [...document.querySelectorAll('.icon-btn')];
const storeButtons = [...document.querySelectorAll('.store')];
const thumbButtons = [...document.querySelectorAll('.thumb')];
const actionLinks = [...document.querySelectorAll('.action-link')];
const newsButtons = [...document.querySelectorAll('.news-item')];
const footerLinks = [...document.querySelectorAll('.footer-link')];
const socialButtons = [...document.querySelectorAll('.social-btn')];
const toast = document.querySelector('#toast');

let toastTimer = null;

function showToast(message) {
  if (!toast) {
    return;
  }

  toast.textContent = message;
  toast.classList.add('show');

  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toast.classList.remove('show');
  }, 1800);
}

function normalize(value) {
  return value.trim().toLowerCase();
}

function applyBrandFilter(query) {
  const term = normalize(query);

  brandItems.forEach((item) => {
    const matches = normalize(item.dataset.brand).includes(term);
    item.classList.toggle('hidden', !matches);
  });
}

function selectBrand(brand) {
  brandItems.forEach((item) => {
    item.classList.toggle('active', item.dataset.brand === brand);
  });

  if (brandSelect) {
    brandSelect.value = brand;
  }

  if (estimateBrand && !estimateBrand.value) {
    estimateBrand.value = brand;
  }
}

if (searchInput) {
  searchInput.addEventListener('input', (event) => {
    applyBrandFilter(event.target.value);
  });
}

brandItems.forEach((item) => {
  item.addEventListener('click', () => {
    const brand = item.dataset.brand;
    selectBrand(brand);
    showToast(`Выбрана марка: ${brand}`);
  });
});

if (brandSelect) {
  brandSelect.addEventListener('change', (event) => {
    const brand = event.target.value;
    if (brand) {
      selectBrand(brand);
    } else {
      brandItems.forEach((item) => item.classList.remove('active'));
    }
  });
}

if (findCarForm) {
  findCarForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const brand = brandSelect?.value?.trim();
    const model = modelInput?.value?.trim();

    if (!brand) {
      showToast('Выберите марку');
      brandSelect?.focus();
      return;
    }

    const query = model ? `${brand} ${model}` : brand;
    showToast(`Поиск: ${query}`);
  });
}

if (calcPriceBtn) {
  calcPriceBtn.addEventListener('click', () => {
    if (!estimateForm?.reportValidity()) {
      return;
    }

    const brand = estimateBrand.value.trim();
    const model = estimateModel.value.trim();
    showToast(`Оценка ${brand} ${model} отправлена`);
  });
}

if (tradeInBtn) {
  tradeInBtn.addEventListener('click', () => {
    const brand = estimateBrand?.value?.trim() || 'вашего авто';
    showToast(`Trade-in заявка для ${brand}`);
  });
}

iconButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const action = button.dataset.action;
    const text = action === 'call' ? 'Открыт звонок в отдел продаж' : 'Добавлено в избранное';
    showToast(text);
  });
});

storeButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const store = button.dataset.store === 'app-store' ? 'App Store' : 'Google Play';
    showToast(`Переход в ${store}`);
  });
});

thumbButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const car = button.dataset.car;
    showToast(`Открыта карточка: ${car}`);
  });
});

actionLinks.forEach((link) => {
  link.addEventListener('click', (event) => {
    event.preventDefault();
    const map = {
      buyout: 'Раздел срочного выкупа открыт',
      listing: 'Раздел размещения открыт',
      'safe-deal': 'Раздел безопасной сделки открыт'
    };
    showToast(map[link.dataset.action] || 'Раздел открыт');
  });
});

newsButtons.forEach((button) => {
  button.addEventListener('click', () => {
    showToast(`Открыто: ${button.textContent.trim()}`);
  });
});

footerLinks.forEach((link) => {
  link.addEventListener('click', (event) => {
    event.preventDefault();
    showToast(`Открыт раздел: ${link.textContent.trim()}`);
  });
});

socialButtons.forEach((button) => {
  button.addEventListener('click', () => {
    showToast('Переход в соцсеть');
  });
});
