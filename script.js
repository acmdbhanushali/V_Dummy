document.addEventListener('DOMContentLoaded', () => {

  // ==================== STICKY HEADER TRANSITION ====================
  const header = document.getElementById('main-header');
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });


  // ==================== RESPONSIVE OVERLAY MENU ====================
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileOverlay = document.getElementById('mobile-overlay');
  const hamburgerIcon = document.getElementById('hamburger-icon');
  let isMenuOpen = false;

  mobileMenuBtn.addEventListener('click', () => {
    isMenuOpen = !isMenuOpen;
    if (isMenuOpen) {
      mobileOverlay.classList.add('active');
      hamburgerIcon.setAttribute('d', 'M6 18L18 6M6 6l12 12');
      document.body.style.overflow = 'hidden';
    } else {
      closeMobileMenu();
    }
  });

  const closeMobileMenu = () => {
    mobileOverlay.classList.remove('active');
    hamburgerIcon.setAttribute('d', 'M4 6h16M4 12h16m-7 6h7');
    document.body.style.overflow = '';
    isMenuOpen = false;
  };

  // Close overlay on any internal link selection
  document.querySelectorAll('.mobile-nav-link').forEach(link => {
    link.addEventListener('click', closeMobileMenu);
  });


  // ==================== INTERSECTION OBSERVER FOR SCROLL REVEAL ====================
  const revealElements = document.querySelectorAll('.reveal');
  
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const delay = entry.target.getAttribute('data-delay') || 0;
        setTimeout(() => {
          entry.target.classList.add('active');
        }, delay);
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15
  });

  revealElements.forEach(el => {
    revealObserver.observe(el);
  });


  // ==================== DYNAMIC GRAPHIC METRIC COUNT-UP ====================
  const statBoxes = document.querySelectorAll('.stat-number');
  let counterStarted = false;

  const animateCounters = () => {
    statBoxes.forEach(box => {
      const target = parseInt(box.getAttribute('data-target'), 10);
      let count = 0;
      const duration = 60; // total animation frame cycles
      const increment = target / duration;

      const updateCount = () => {
        count += increment;
        if (count >= target) {
          box.innerText = target.toLocaleString() + (target === 18 ? "" : "+");
        } else {
          box.innerText = Math.round(count).toLocaleString() + "+";
          requestAnimationFrame(updateCount);
        }
      };
      updateCount();
    });
  };

  // Observe statistics block to trigger numbers on enter
  const impactSection = document.getElementById('impact');
  if (impactSection) {
    const impactObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !counterStarted) {
          animateCounters();
          counterStarted = true;
        }
      });
    }, { threshold: 0.25 });
    impactObserver.observe(impactSection);
  }


  // ==================== PRODUCT ARCHIVE STORY SYSTEM ====================
  const productData = {
    'ghee': {
      tag: 'Sacred Dairy Craft',
      title: 'Bilona Ghee',
      paragraphs: [
        'Our Bilona Ghee represents a traditional standard of pure food. Created using raw, unpasteurized A2 milk sourced from grazing indigenous cows, it is slowly heated over natural cow dung embers in earthenware.',
        'The rich curd is then hand-churned in traditional clay pots during the auspicious early morning hours. This gentle process ensures important fat-soluble vitamins, enzymes, and natural aromas are fully preserved.',
        'Each small batch is individually strained, hand-poured into glass containers, and documented to trace its origin farm. It provides a clean, nutrient-dense choice for daily wellness.'
      ]
    },
    'foods': {
      tag: 'Heirloom Nutrition',
      title: 'Traditional Foods',
      paragraphs: [
        'Our traditional foods include heirloom varieties of grains, lentils, and ground spices that have been saved from commercial alteration.',
        'We partner directly with farmers who practice zero-chemical dryland farming. The harvest is dried under natural sunlight, cleaned manually by hand-sifting, and ground using heavy, slow-moving stone mills that maintain cool temperatures to preserve vital oils.',
        'These selections contain zero additives, zero fillers, and zero synthetic preservatives—bringing clean, nourishing food straight to your table.'
      ]
    },
    'khakhra': {
      tag: 'Rural Culinary Art',
      title: 'Artisanal Khakhra',
      paragraphs: [
        'Our crisp Khakhras are handmade by a group of women craftswomen in dry region villages, providing them with safe, independent livelihoods.',
        'Using organic stone-ground whole wheat, cold-pressed oils, and local spices, they hand-knead the dough, roll each thin piece, and press them gently over warm terracotta pans.',
        'This patient process gives each crisp its characteristic toasted aroma and thin, crunchy texture. They represent a healthy, slow-crafted alternative to industrial, high-temperature processed wheat crisps.'
      ]
    },
    'cow-based': {
      tag: 'Purifying Elements',
      title: 'Cow-Based Purity',
      paragraphs: [
        'Our range of cow-based options is made to clean and clear the home environment, following principles of traditional Indian lifestyle balance.',
        'This includes natural dhoop incense logs made without synthetic chemical binders or artificial fragrances. We blend sun-dried cow dung with natural resin wood powders, high-grade organic ghee, and local medicinal herbs.',
        'When lit, they produce a clean, purifying scent that creates an authentic, tranquil atmosphere.'
      ]
    },
    'lifestyle': {
      tag: 'Ancient Sanctuary Elements',
      title: 'Natural Lifestyle',
      paragraphs: [
        'Our collection features kitchenware and home textiles designed for high utility and simple longevity.',
        'This includes traditional heavy brass plates, water pitchers hand-hammered from raw copper, and kitchen linens woven from organic cotton fibers.',
        'These elements are produced using gentle plant-based dyes. Each purchase supports local metal casting and handloom families, ensuring their timeless skills are passed down to future generations.'
      ]
    }
  };

  const modal = document.getElementById('product-modal');
  const modalTag = document.getElementById('modal-tag');
  const modalTitle = document.getElementById('modal-title');
  const modalContent = document.getElementById('modal-content');

  window.openProductModal = (key) => {
    const item = productData[key];
    if (!item) return;

    modalTag.innerText = item.tag;
    modalTitle.innerText = item.title;
    modalContent.innerHTML = item.paragraphs.map(p => `<p>${p}</p>`).join('');

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  window.closeProductModal = () => {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  };

  // Close modal when clicking background mask
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeProductModal();
  });


  // ==================== LIGHTBOX SYSTEM ====================
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxTitle = document.getElementById('lightbox-title');
  const lightboxDesc = document.getElementById('lightbox-desc');

  window.openLightbox = (src, title, desc) => {
    lightboxImg.src = src;
    lightboxTitle.innerText = title;
    lightboxDesc.innerText = desc;
    
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  window.closeLightbox = () => {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  };


  // ==================== INTERACTIVE VALUE TAB GRAPHIC ====================
  const tabEntries = [
    {
      tag: "01. Dimension of Value",
      title: "Patience & Dedicated Time",
      desc: "Our products are created with dedicated time. For example, churning 1 liter of true Vedic Bilona Ghee requires 30 kilograms of premium A2 milk, slow-simmered over open cow dung embers for over 18 hours, and then hand-churned in traditional pots. Quick-churned mass alternatives take less than 15 minutes to produce. This difference represents a real investment in patient, unhurried care."
    },
    {
      tag: "02. Dimension of Value",
      title: "True Village Craftsmanship",
      desc: "Every item we offer features the distinct character of the artisan's hand. Our weavers, potters, and farmers do not run automatic assembly lines. Instead, they apply skilled techniques that require physical effort and attention. This preserves unique detail in every single batch."
    },
    {
      tag: "03. Dimension of Value",
      title: "Vedic Traditional Methods",
      desc: "We follow historical preparation instructions exactly, avoiding modern shortcuts. This includes cold oil pressing in wooden mills and herb grinding using traditional stone pestles. This gentle method keeps vital nutrients intact without the high friction heat of modern machinery."
    },
    {
      tag: "04. Dimension of Value",
      title: "Fair Artisan Livelihoods",
      desc: "We practice fair compensation. Instead of squeezing regional margins to meet low prices, we pay our rural artisan families up to three times the typical commercial wholesale rates. This helps stabilize local village economies and makes heritage craftsmanship a sustainable profession."
    },
    {
      tag: "05. Dimension of Value",
      title: "Uncompromised Quality",
      desc: "We source only pure raw materials without chemical preservatives or artificial elements. Each batch is carefully verified, using quality packaging to maintain natural freshness from our rural farms to your modern home."
    }
  ];

  const tabButtons = document.querySelectorAll('.tab-btn');
  const valTag = document.getElementById('tab-tag');
  const valTitle = document.getElementById('tab-title');
  const valDesc = document.getElementById('tab-description');
  const contentWrapper = document.getElementById('tab-content');

  window.switchTab = (index) => {
    // Reset all tab active states
    tabButtons.forEach(btn => btn.classList.remove('active'));
    
    // Set clicked tab as active
    tabButtons[index].classList.add('active');

    // Soft content switch animation transition
    contentWrapper.style.opacity = '0';
    contentWrapper.style.transform = 'translateY(10px)';
    contentWrapper.style.transition = 'opacity 0.2s ease, transform 0.2s ease';

    setTimeout(() => {
      valTag.innerText = tabEntries[index].tag;
      valTitle.innerText = tabEntries[index].title;
      valDesc.innerText = tabEntries[index].desc;
      
      contentWrapper.style.opacity = '1';
      contentWrapper.style.transform = 'translateY(0)';
    }, 200);
  };

});