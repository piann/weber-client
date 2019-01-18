const vh = window.innerHeight*0.01;

window.addEventListener('resize', ()=>{
   
    document.documentElement.style.setProperty('--vh', `${vh}px`);
})