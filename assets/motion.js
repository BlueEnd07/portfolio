/* Loop videos (<video class="loop" data-src="…">) only load and play while on screen.
   With reduced-motion turned on, they stay paused and show controls instead. */
(function(){
  const vids = [...document.querySelectorAll('video.loop')];
  if(!vids.length) return;
  const calm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  vids.forEach(v=>{ v.muted = true; v.loop = true; v.playsInline = true; if(calm) v.controls = true; });
  const load = v=>{ if(!v.src && v.dataset.src){ v.src = v.dataset.src; } };
  if(!('IntersectionObserver' in window)){ vids.forEach(v=>{ load(v); if(!calm) v.play().catch(()=>{}); }); return; }
  const io = new IntersectionObserver(entries=>{
    entries.forEach(e=>{
      const v = e.target;
      if(e.isIntersecting){ load(v); if(!calm) v.play().catch(()=>{}); }
      else if(!v.paused){ v.pause(); }
    });
  },{rootMargin:'200px 0px'});
  vids.forEach(v=>io.observe(v));
})();
