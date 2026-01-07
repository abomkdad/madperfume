let branches = [], products = [];

fetch('branches.json').then(r => r.json()).then(b => {
  branches = b;
  const list = document.getElementById('branchesList');
  list.innerHTML = '';
  b.forEach(br => {
    list.innerHTML += `
      <div class="branch-card">
        <h3>${br.nameAr}</h3>
        <p>${br.hoursAr}</p>
        <a href="tel:${br.phone}">📞 اتصال</a> | 
        <a href="https://wa.me/972${br.phone.substring(1)}">💬 واتساب</a>
      </div>`;
  });
});

fetch('products.json').then(r => r.json()).then(p => {
  products = p;
  const box = document.getElementById('products');
  p.forEach(pr => {
    box.innerHTML += `
      <div class="product">
        <img src="${pr.image}" alt="صورة العطر" style="max-width:100px; display:block;">
        <strong>${pr['العطر بالعربي'] || pr.nameAr || ''}</strong><br>
        <p>${pr.description || ''}</p>
        <span>${pr.price || ''}</span><br>
        <a class="green" href="${pr['رابط الشراء العربي'] || '#'}" target="_blank">اطلب الآن</a>
      </div>`;
  });
});

document.getElementById('showProductsBtn').addEventListener('click', () => {
  document.getElementById('productsSection').style.display = 'block';
});

document.getElementById('branchSelect').addEventListener('change', e => {
  const id = e.target.value;
  if (!id) return;
  const b = branches.find(x => x.id == id);
  document.getElementById('branchAction').innerHTML = `
    <div class="branch-box">
      <a class="green" href="https://wa.me/972${b.phone.substring(1)}" target="_blank">
        تواصل مع فرع ${b.nameAr}
      </a>
    </div>`;
  
  // إظهار زر التواصل الثابت
  const sticky = document.getElementById("stickyBtn");
  sticky.href = `https://wa.me/972${b.phone.substring(1)}`;
 
