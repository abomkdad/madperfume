fetch('data/branches.json')
  .then(r=>r.json())
  .then(branches=>{
    renderAllBranches(branches);
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition(pos=>{
        const lat=pos.coords.latitude;
        const lng=pos.coords.longitude;
        branches.forEach(b=>{
          if(b.lat && b.lng){
            b.distance = Math.sqrt((lat-b.lat)**2 + (lng-b.lng)**2);
          } else {
            b.distance = 9999;
          }
        });
        branches.sort((a,b)=>a.distance-b.distance);
        renderNearest(branches[0]);
        renderAllBranches(branches, branches[0].id);
      });
    }
  });

function renderNearest(b){
  const box=document.getElementById('nearestResult');
  box.innerHTML = `
    <div class="branch-card nearest-branch">
      <h3>${b.nameAr}</h3>
      <a class="green-btn" href="https://wa.me/972${b.phone.substring(1)}" target="_blank">
        🟢 تواصل مع الفرع القريب إليك
      </a>
    </div>`;
}

function renderAllBranches(branches, nearestId=null){
  const list=document.getElementById('branchesList');
  list.innerHTML='';
  branches.forEach(b=>{
    list.innerHTML += `
      <div class="branch-card ${b.id===nearestId?'nearest-branch':''}">
        <h4>${b.nameAr}</h4>
        <p>${b.hoursAr}</p>
        <a href="tel:${b.phone}">📞 اتصال</a> |
        <a href="https://wa.me/972${b.phone.substring(1)}">💬 واتساب</a> |
        <a href="${b.directLink}" target="_blank">🚗 Waze</a>
      </div>`;
  });
}
