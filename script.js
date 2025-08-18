document.addEventListener('DOMContentLoaded', function () {
  // ====== Navbar shadow on scroll ======
  const nav = document.getElementById('navv');
  const onScroll = () => {
    if (window.scrollY > 10) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  // ====== Close mobile menu when nav link clicked ======
  const checkbox = document.getElementById('check');
  document.querySelectorAll('#navLinks a[href^="#"]').forEach(a => {
    a.addEventListener('click', () => { checkbox.checked = false; });
  });

  // ====== AOS Init (Scroll Animations) ======
  if (window.AOS) {
    AOS.init({
      duration: 900,
      easing: 'ease-out-cubic',
      once: true,
      offset: 30
    });
  }

  // ====== FAQ Accordion ======
  const faqQuestions = document.querySelectorAll('.faq-question');
  const faqItems = document.querySelectorAll('.faq-item'); // <— (FIXED) used by search too

  faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
      const faqItem = question.parentElement;
      const isActive = faqItem.classList.contains('active');

      // Close all
      faqItems.forEach(item => {
        item.classList.remove('active');
        const ans = item.querySelector('.faq-answer');
        if (ans) ans.style.maxHeight = null;
        const q = item.querySelector('.faq-question');
        if (q) q.classList.remove('active');
      });

      // Open clicked
      if (!isActive) {
        faqItem.classList.add('active');
        question.classList.add('active');
        const answer = faqItem.querySelector('.faq-answer');
        if (answer) answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });

  // ====== FAQ Search (FIXED: faqItems reference + show/hide with flex) ======
  const searchInput = document.getElementById('searchInput');
  if (searchInput) {
    searchInput.addEventListener('input', () => {
      const term = searchInput.value.toLowerCase().trim();
      faqItems.forEach(item => {
        const question = item.querySelector('.faq-question')?.textContent.toLowerCase() || '';
        const answer = item.querySelector('.faq-answer-content')?.textContent.toLowerCase() || '';
        if (!term || question.includes(term) || answer.includes(term)) {
          item.style.display = '';
        } else {
          item.style.display = 'none';
        }
      });
    });
  }

  // ====== Smooth anchor scrolling (better easing for some browsers) ======
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const id = this.getAttribute('href');
      if (!id || id === '#') return;
      const target = document.querySelector(id);
      if (!target) return;

      e.preventDefault();
      const y = target.getBoundingClientRect().top + window.scrollY - 90; // nav offset
      window.scrollTo({ top: y, behavior: 'smooth' });
      history.replaceState(null, '', id);
    });
  });
});

    const form = document.getElementById("myForm");
    const nameField = document.getElementById("name");
    const emailField = document.getElementById("email");
    const messageField = document.getElementById("message");

    const nameError = document.getElementById("nameError");
    const emailError = document.getElementById("emailError");
    const messageError = document.getElementById("messageError");
    const formSuccess = document.getElementById("formSuccess");

    form.addEventListener("submit", function(e){
      let isValid = true;
      nameError.textContent = "";
      emailError.textContent = "";
      messageError.textContent = "";
      formSuccess.textContent = "";
      formSuccess.classList.remove("show");

      if(nameField.value.trim() === ""){
        nameError.textContent = "⚠️ Please enter your name.";
        isValid = false;
      }

      const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
      if(emailField.value.trim() === ""){
        emailError.textContent = "⚠️ Please enter your email.";
        isValid = false;
      } else if(!emailField.value.match(emailPattern)){
        emailError.textContent = "⚠️ Please enter a valid email.";
        isValid = false;
      }

      if(messageField.value.trim() === ""){
        messageError.textContent = "⚠️ Please enter your message.";
        isValid = false;
      }

      if(!isValid){
        e.preventDefault();
      } else {
        formSuccess.textContent = "✅ Your message has been sent successfully!";
        formSuccess.classList.add("show");
      }
    });