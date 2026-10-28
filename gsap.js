document.addEventListener("DOMContentLoaded", () => {
  // Register GSAP Plugins
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

  // ==========================================
  // 1. NAVIGATION DRAWER OVERLAY & SMOOTH NAVIGATION
  // ==========================================
  const menuBtn = document.getElementById("menuBtn");
  const closeDrawer = document.getElementById("closeDrawer");
  const navDrawer = document.getElementById("navDrawer");
  const drawerPanel = document.getElementById("drawerPanel");
  const drawerBackdrop = document.getElementById("drawerBackdrop");
  const drawerLinks = document.querySelectorAll(".drawer-link");

  function openMenu() {
    navDrawer.classList.remove("pointer-events-none", "opacity-0");
    navDrawer.classList.add("opacity-100");
    drawerPanel.classList.remove("translate-x-full");
  }

  function closeMenu() {
    drawerPanel.classList.add("translate-x-full");
    navDrawer.classList.remove("opacity-100");
    navDrawer.classList.add("opacity-0", "pointer-events-none");
  }

  menuBtn.addEventListener("click", openMenu);
  closeDrawer.addEventListener("click", closeMenu);
  drawerBackdrop.addEventListener("click", closeMenu);

  drawerLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const targetId = link.getAttribute("href");
      closeMenu();
      gsap.to(window, {
        duration: 1,
        scrollTo: { y: targetId, offsetY: 20 },
        ease: "power3.inOut",
      });
    });
  });

  // ==========================================
  // 2. LIVE TERMINAL TICKER DYNAMIC UPDATES
  // ==========================================
  const uptimeCounter = document.getElementById("uptimeCounter");
  const activeNodes = document.getElementById("activeNodes");
  const memLoad = document.getElementById("memLoad");
  const terminalLiveText = document.getElementById("terminalLiveText");

  const commands = [
    "pinging asia-east-1 clusters...",
    "optimizing C++ graph memory...",
    "IDAI Kernel status: OPERATIONAL",
    "listening for incoming dispatches...",
    "evaluating Sicilia Defence line...",
  ];
  let cmdIndex = 0;

  setInterval(() => {
    const load = (32 + Math.random() * 5).toFixed(1);
    memLoad.textContent = `${load}%`;

    cmdIndex = (cmdIndex + 1) % commands.length;
    terminalLiveText.textContent = commands[cmdIndex];
  }, 3500);

  // ==========================================
  // 3. GSAP BENTO GRID HOVER ANIMATIONS
  // ==========================================
  const bentoCards = document.querySelectorAll(".bento-card");
  bentoCards.forEach((card) => {
    card.addEventListener("mouseenter", () => {
      gsap.to(card, { scale: 1.02, duration: 0.3, ease: "power2.out" });
    });
    card.addEventListener("mouseleave", () => {
      gsap.to(card, { scale: 1.0, duration: 0.3, ease: "power2.out" });
    });
  });

  // ==========================================
  // 4. GSAP SCROLLTRIGGER PROGRESS BARS
  // ==========================================
  const progressFills = document.querySelectorAll(".progress-bar-fill");

  ScrollTrigger.create({
    trigger: "#progressBarsContainer",
    start: "top 80%",
    onEnter: () => {
      progressFills.forEach((fill) => {
        const targetWidth = fill.getAttribute("data-target");
        gsap.to(fill, {
          width: targetWidth,
          duration: 1.5,
          ease: "power3.out",
        });
      });
    },
  });

  // ==========================================
  // 5. CONTACT FORM FORMBOLD API INTEGRATION
  // ==========================================
  const contactForm = document.getElementById("contactForm");
  const submitBtn = document.getElementById("submitBtn");
  const formStatus = document.getElementById("formStatus");

  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const originalBtnText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = `<i class="fa-solid fa-spinner animate-spin"></i> Processing Transmission...`;

    const formData = new FormData(contactForm);

    try {
      const response = await fetch("https://formbold.com/s/oJb4B", {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });

      if (response.ok) {
        formStatus.classList.remove("hidden", "bg-red-500/20", "text-red-300");
        formStatus.classList.add(
          "bg-teal-500/20",
          "text-teal-accent",
          "border",
          "border-teal-accent/30",
        );
        formStatus.innerHTML = `<i class="fa-solid fa-circle-check mr-2"></i> Transmission successfully dispatched to Rayaan Tasnim!`;
        contactForm.reset();
      } else {
        throw new Error("Server returned an error status.");
      }
    } catch (err) {
      formStatus.classList.remove(
        "hidden",
        "bg-teal-500/20",
        "text-teal-accent",
      );
      formStatus.classList.add(
        "bg-red-500/20",
        "text-red-300",
        "border",
        "border-red-500/30",
      );
      formStatus.innerHTML = `<i class="fa-solid fa-triangle-exclamation mr-2"></i> Transmission failed. Please try again or email directly to rayaantasnim@gmail.com.`;
    } finally {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalBtnText;
    }
  });

  // ==========================================
  // 6. GEOMETRIC BACK TO TOP GSAP SCROLL
  // ==========================================
  const backToTopBtn = document.getElementById("backToTopBtn");
  backToTopBtn.addEventListener("click", () => {
    gsap.to(window, {
      scrollTo: 0,
      duration: 1.2,
      ease: "power3.inOut",
    });
  });
});
