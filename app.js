(() => {
  const buttons = Array.from(document.querySelectorAll('[data-lang]'));
  const blocks = Array.from(document.querySelectorAll('[data-content-lang]'));
  const html = document.documentElement;

  const i18n = {
    ua: {
      htmlLang: 'uk',
      title: 'Віталій Ліницький — CV',
      nav_experience: 'Досвід',
      nav_education: 'Освіта',
      nav_skills: 'Навички',
      download_pdf: 'Завантажити PDF',
      name_ua: 'Віталій Ліницький',
      title_ua: 'Lead Designer / Product & Visual Designer',
      summary_ua: 'Досвід у продуктовому, технічному та візуальному дизайні. Візуалізація виробів, корпуси, інструкції, супровідна графіка та motion.',
      cta_view: 'Переглянути досвід',
      cta_open: 'Відкрити PDF',
      note: 'Версія для сайту: чиста типографіка, адаптивна верстка, перемикач мов.',
      about_h: 'Про мене',
      exp_h: 'Досвід роботи',
      edu_h: 'Освіта',
      skills_h: 'Навички',
      exp_teacher_h: 'Координатор викладачів графічного дизайну',
      exp_radio_h: 'Звукорежисер та ведучий прямого ефіру, Радіо «Лідер»',
      to_top: 'Вгору'
    },
    en: {
      htmlLang: 'en',
      title: 'Vitalii Linitskyi — CV',
      nav_experience: 'Experience',
      nav_education: 'Education',
      nav_skills: 'Skills',
      download_pdf: 'Download PDF',
      name_ua: 'Vitalii Linitskyi',
      title_ua: 'Lead Designer / Product & Visual Designer',
      summary_ua: 'Experience in product, technical, and visual design. Product visualization, enclosures, manuals, supporting graphics, and motion.',
      cta_view: 'View experience',
      cta_open: 'Open PDF',
      note: 'Website version: clean typography, responsive layout, language switch.',
      about_h: 'About',
      exp_h: 'Work Experience',
      edu_h: 'Education',
      skills_h: 'Skills',
      exp_teacher_h: 'Graphic Design Instructor Coordinator',
      exp_radio_h: 'Sound Engineer & Live Host, Radio “Lider”',
      to_top: 'Back to top'
    }
  };

  function applyTexts(lang){
    const dict = i18n[lang];
    if(!dict) return;

    html.setAttribute('lang', dict.htmlLang);
    document.title = dict.title;

    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if(dict[key]) el.textContent = dict[key];
    });
  }

  function setLang(lang){
    // blocks
    blocks.forEach(b => {
      const isMatch = b.getAttribute('data-content-lang') === lang;
      b.toggleAttribute('hidden', !isMatch);
    });

    // buttons
    buttons.forEach(btn => {
      const pressed = btn.getAttribute('data-lang') === lang;
      btn.setAttribute('aria-pressed', pressed ? 'true' : 'false');
    });

    // copy
    applyTexts(lang);


    // pdf links
    const pdfHref = (lang === 'en') ? 'assets/Linitsky_CV_eng.pdf' : 'assets/Linitsky_CV.pdf';
    document.querySelectorAll('.pdf-link').forEach(a => a.setAttribute('href', pdfHref));
    const dl = document.querySelector('.pdf-download');
    if (dl) dl.setAttribute('download', (lang === 'en') ? 'Linitsky_CV_eng.pdf' : 'Linitsky_CV.pdf');


    // persist
    try { localStorage.setItem('cv_lang', lang); } catch(_) {}
    // url hint
    const url = new URL(window.location.href);
    url.searchParams.set('lang', lang);
    window.history.replaceState({}, '', url);
  }

  function init(){
    const yearEl = document.getElementById('year');
    if(yearEl) yearEl.textContent = new Date().getFullYear();

    const urlLang = new URL(window.location.href).searchParams.get('lang');
    let saved = 'ua';
    try { saved = localStorage.getItem('cv_lang') || 'ua'; } catch(_) {}

    const initial = (urlLang === 'en' || urlLang === 'ua') ? urlLang : saved;
    setLang(initial);

    buttons.forEach(btn => {
      btn.addEventListener('click', () => setLang(btn.getAttribute('data-lang')));
    });
  }

  document.addEventListener('DOMContentLoaded', init);
})();