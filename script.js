const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.site-nav');

function closeMenu() {
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'Открыть меню');
  navigation.classList.remove('is-open');
}

menuButton.addEventListener('click', () => {
  const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!isOpen));
  menuButton.setAttribute('aria-label', isOpen ? 'Открыть меню' : 'Закрыть меню');
  navigation.classList.toggle('is-open', !isOpen);
});

navigation.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', closeMenu);
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') {
    closeMenu();
    menuButton.focus();
  }
});

document.querySelectorAll('.detail-toggle').forEach((button) => {
  button.addEventListener('click', () => {
    const detail = document.getElementById(button.getAttribute('aria-controls'));
    const isOpen = button.getAttribute('aria-expanded') === 'true';
    button.setAttribute('aria-expanded', String(!isOpen));
    button.querySelector('[aria-hidden]').textContent = isOpen ? '+' : '−';
    detail.hidden = isOpen;
  });
});

const demoForm = document.getElementById('demo-form');
const scentChoice = document.getElementById('scent-choice');
const formStatus = document.getElementById('form-status');

demoForm.addEventListener('submit', (event) => {
  event.preventDefault();
  if (!scentChoice.value) {
    formStatus.textContent = 'Сначала выбери один из трёх ароматов.';
    scentChoice.focus();
    return;
  }
  formStatus.textContent = `${scentChoice.value} — твой выбранный образ. Это демонстрация: данные никуда не отправлены и не сохранены.`;
});

/* AURA worlds — smooth crossfade */
(() => {
 const city=document.getElementById('aura-city'),nature=document.getElementById('aura-nature');
 const back=document.getElementById('aura-back'),img=document.getElementById('aura-nature-image');
 const mobile=document.getElementById('aura-nature-mobile'),name=document.getElementById('aura-nature-name');
 if(!city||!nature||!back)return;
 const mossCard=document.getElementById('moss-card'),mossTrigger=document.getElementById('moss-flip-trigger'),mossClose=document.getElementById('moss-flip-close');
 function resetMossCard(){nature.classList.remove('moss-photo-active');mossCard.classList.remove('flipped','turning');mossCard.hidden=true;mossTrigger.setAttribute('aria-expanded','false');}
 mossTrigger.addEventListener('click',()=>{mossCard.classList.add('flipped','turning');mossTrigger.setAttribute('aria-expanded','true');if(window.matchMedia('(min-width:701px)').matches){setTimeout(()=>{if(mossCard.classList.contains('flipped'))nature.classList.add('moss-photo-active');},425);}});
 mossClose.addEventListener('click',()=>{mossCard.classList.remove('flipped','turning');mossTrigger.setAttribute('aria-expanded','false');setTimeout(()=>nature.classList.remove('moss-photo-active'),420);mossTrigger.focus({preventScroll:true});});
 const scenes={
 original:['ORIGINAL web.png','ORIGINALmobil.png','Осенний лес вокруг флакона ORIGINAL'],
 silt:['SILT web.png','SILT mobil.png','Зимняя река вокруг флакона SILT'],
 veil:['VEIL web.png','VEIL mobil.png','Гималайская река вокруг флакона VEIL'],
 moss:['MOSS web.png','MOSS mobil.png','Влажные джунгли вокруг флакона MOSS']
 };
 let lastButton=null,busy=false;
 const reduced=window.matchMedia('(prefers-reduced-motion: reduce)');
 const duration=()=>reduced.matches?0:1150;
 const videos=[...document.querySelectorAll('.aura-city-video')];
 const mossVideos=[...document.querySelectorAll('.aura-moss-video')];
 const siltVideos=[...document.querySelectorAll('.aura-silt-video')];
 const extraVideos=[...document.querySelectorAll('.aura-extra-video')];
 function stopExtras(){extraVideos.forEach(v=>{v.pause();v.currentTime=0;});}
 function startExtras(key){if(reduced.matches)return;extraVideos.filter(v=>v.classList.contains('aura-extra-'+key)&&getComputedStyle(v).display!=='none').forEach(v=>{v.currentTime=0;v.play().catch(()=>{});});}
 function stopSilt(){siltVideos.forEach(v=>{v.pause();v.currentTime=0;});}
 function startSilt(){if(reduced.matches)return;siltVideos.forEach(v=>{if(getComputedStyle(v).display!=='none'){v.currentTime=0;v.play().catch(()=>{});}});}
 function stopMoss(){mossVideos.forEach(v=>{v.pause();v.currentTime=0;});}
 function startMoss(){if(reduced.matches)return; mossVideos.forEach(v=>{if(getComputedStyle(v).display!=='none'){v.currentTime=0;v.play().catch(()=>{});}});}
 nature.classList.add('aura-faded');
 function pauseVideo(){videos.forEach(v=>v.pause());}
 function playVideo(){videos.forEach(v=>{if(getComputedStyle(v).display!=='none')v.play().catch(()=>{});});}
 document.querySelectorAll('[data-world]').forEach(button=>button.addEventListener('click',()=>{
   if(busy||!nature.hidden)return;
   const key=button.dataset.world,scene=scenes[key];if(!scene)return;
   busy=true;resetMossCard();lastButton=button;stopMoss();stopSilt();stopExtras();nature.classList.toggle('aura-show-moss',key==='moss');nature.classList.toggle('aura-show-silt',key==='silt');nature.classList.toggle('aura-show-original',key==='original');nature.classList.toggle('aura-show-veil',key==='veil');img.src=scene[0];mobile.srcset=scene[1];img.alt=scene[2];name.textContent=key.toUpperCase();
   nature.hidden=false;nature.classList.add('aura-faded');if(key==='moss')mossCard.hidden=false; if(key==='moss')startMoss();if(key==='silt')startSilt();if(key==='original'||key==='veil')startExtras(key);
   requestAnimationFrame(()=>requestAnimationFrame(()=>{nature.classList.remove('aura-faded');city.classList.add('aura-faded');}));
   setTimeout(()=>{city.hidden=true;pauseVideo();busy=false;back.focus();},duration());
 }));
 back.addEventListener('click',()=>{
   if(busy||nature.hidden)return;
   busy=true;resetMossCard();city.hidden=false;city.classList.add('aura-faded');playVideo();
   requestAnimationFrame(()=>requestAnimationFrame(()=>{city.classList.remove('aura-faded');nature.classList.add('aura-faded');}));
   setTimeout(()=>{nature.hidden=true;stopMoss();stopSilt();stopExtras();nature.classList.remove('aura-show-moss','aura-show-silt','aura-show-original','aura-show-veil');busy=false;if(lastButton)lastButton.focus();},duration());
 });
 document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!nature.hidden&&!busy)back.click();});
})();
