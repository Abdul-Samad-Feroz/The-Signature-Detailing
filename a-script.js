// small entrance animations
    document.addEventListener('DOMContentLoaded', function(){
      // heading animation
      setTimeout(()=>{ document.getElementById('h1part1').classList.add('in-view'); },120);
      setTimeout(()=>{ document.getElementById('h1part2').classList.add('in-view'); },280);
      setTimeout(()=>{ document.getElementById('h1part3').classList.add('in-view'); },500);

      // reveal features when they scroll into view
      const items = document.querySelectorAll('.feature-item');
      const observer = new IntersectionObserver((entries)=>{
        entries.forEach(entry => {
          if(entry.isIntersecting){
            entry.target.classList.add('in-view');
            // unobserve to keep it lightweight
            observer.unobserve(entry.target);
          }
        });
      },{ threshold: 0.15 });
      items.forEach(i=>observer.observe(i));

      // small parallax on image when mouse moves
      const img = document.querySelector('.image-card img');
      const card = document.querySelector('.image-card');
      card.addEventListener('mousemove', (e)=>{
        const r = card.getBoundingClientRect();
        const x = (e.clientX - r.left)/r.width - 0.5;
        const y = (e.clientY - r.top)/r.height - 0.5;
        img.style.transform = `translate(${x*6}px, ${y*6}px) scale(1.01)`;
      });
      card.addEventListener('mouseleave', ()=>{ img.style.transform = 'translateY(0) scale(1)'; });
    });