/* Click any .zoom image to view it full size. Arrow keys / Esc work too. */
(function(){
  const items = [...document.querySelectorAll('.zoom img')];
  if(!items.length) return;
  const lb = document.createElement('div');
  lb.className = 'lb';
  lb.setAttribute('role','dialog');
  lb.setAttribute('aria-modal','true');
  lb.innerHTML = '<img alt=""><button class="x" aria-label="Close">✕</button>'
    + '<button class="prev" aria-label="Previous">←</button><button class="next" aria-label="Next">→</button>'
    + '<span class="count"></span>';
  document.body.appendChild(lb);
  const big = lb.querySelector('img'), count = lb.querySelector('.count');
  let i = 0, opener = null;

  function show(n){
    i = (n + items.length) % items.length;
    big.src = items[i].currentSrc || items[i].src;
    big.alt = items[i].alt;
    count.textContent = (i+1) + ' / ' + items.length;
  }
  function open(n){ opener = document.activeElement; show(n); lb.classList.add('open'); lb.querySelector('.x').focus(); }
  function close(){ lb.classList.remove('open'); if(opener) opener.focus(); }

  items.forEach((img,n)=>{
    const wrap = img.closest('.zoom');
    wrap.tabIndex = 0;
    wrap.setAttribute('role','button');
    wrap.setAttribute('aria-label','View larger: ' + img.alt);
    wrap.addEventListener('click',()=>open(n));
    wrap.addEventListener('keydown',e=>{ if(e.key==='Enter'||e.key===' '){ e.preventDefault(); open(n);} });
  });
  lb.querySelector('.x').onclick = close;
  lb.querySelector('.prev').onclick = e=>{ e.stopPropagation(); show(i-1); };
  lb.querySelector('.next').onclick = e=>{ e.stopPropagation(); show(i+1); };
  lb.addEventListener('click',e=>{ if(e.target===lb) close(); });
  document.addEventListener('keydown',e=>{
    if(!lb.classList.contains('open')) return;
    if(e.key==='Escape') close();
    if(e.key==='ArrowLeft') show(i-1);
    if(e.key==='ArrowRight') show(i+1);
  });
})();
