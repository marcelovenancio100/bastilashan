window.addEventListener('load', e => {
  e.preventDefault();
  axios('https://api.chucknorris.io/jokes/categories').then(response => fillCategories(response.data));
});

function fillCategories(data) {
  const categoriesEl = document.getElementById('categories');
  data.forEach(c => categoriesEl.append(buildCategoryLink(c)));
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
    const href = el.getAttribute('href');
    axios(href).then(response => fillData(response.data));
  }
});

function fillData(data) {
  const dataEl = document.getElementById('data');
  dataEl.innerHTML = data.value;
  dataEl.style.display = 'flex';
}
