window.addEventListener('load', e => {
  e.preventDefault();
  loadCategories();
});

async function loadCategories() {
  try {
    const response = await fetch('https://api.chucknorris.io/jokes/categories');
    if (response.status !== 200) throw new Error('Error!!!');
    const data = await response.text();
    fillCategories(data);
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
  try {
    const href = el.getAttribute('href');
    const response = await fetch(href);
    if (response.status !== 200) throw new Error('Error!!!');
    const data = await response.text();
    fillData(data);
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
