const request = obj => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open(obj.method, obj.url, true);
    xhr.send();

    xhr.addEventListener('load', () => {
      if(xhr.status >= 200 && xhr.status < 300) {
        resolve(xhr.responseText);
      } else {
        reject(xhr.statusText);
      }
    });
  });
};

window.addEventListener('load', e => {
  e.preventDefault();
  loadCategories();
});

async function loadCategories() {
  const obj = { method: 'GET', url: 'https://api.chucknorris.io/jokes/categories' };

  try {
    const response = await request(obj);
    fillCategories(response);
  } catch(e) {
    console.log(e);
  }
}

function fillCategories(data) {
  const categoriesEl = document.getElementById('categories');
  const categories = JSON.parse(data);
  categories.forEach(c => categoriesEl.append(buildCategoryLink(c)));
}

function buildCategoryLink(name) {
  const a = document.createElement('a');
  const linkText = document.createTextNode(name);
  a.appendChild(linkText);
  a.title = name;
  a.href = `https://api.chucknorris.io/jokes/random?category=${name}`;
  a.style.marginRight = '15px';
  return a;
}

document.addEventListener('click', e => {
  const el = e.target;
  const tag = el.tagName.toLowerCase();

  if (tag === 'a') {
    e.preventDefault();
    loadData(el);
  }
});

async function loadData(el) {
  const href = el.getAttribute('href');
  const obj = { method: 'GET', url: href };

  try {
    const response = await request(obj);
    fillData(response);
  } catch(e) {
    console.log(e);
  }
}

function fillData(data) {
  const dataEl = document.getElementById('data');
  const obj = JSON.parse(data);
  dataEl.innerHTML = obj.value;
  dataEl.style.display = 'flex';
}
