let branches = [], products = [];

fetch('branches.json')
  .then(r => r.json())
  .then(b => {
    branches = b;
    const s = document.getElementById('branchSelect');
    s.innerHTML = '<option value="">-- اختر الفرع --</option>';
    b.forEach(br => {
      s.innerHTML += `<option value="${br.id}">${br.nameAr}</option>`;
    });
  });

fetch('products.json')
  .then(r => r.json())
  .then(p => {
    products = p;
    const box = document.getElementById('products');
    p.forEach(pr => {
      box.innerHTML += `
        <div class="product">
          <strong>${pr['العطر بالعربي'] || pr.nameAr || ''}</strong><br>
          <span>${pr.price || ''}</span><br>
          <a class="green" href="${pr['رابط الشراء العربي'] || '#'}" target="_blank">
            اطلب الآن
          </a>
        </div>
      `;
    });
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
    </div>
  `;
});
