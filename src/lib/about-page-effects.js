/**
 * about-page-effects.js
 * 1. Counter animation (0 → final) on scroll
 * 2. Journey sticky fix
 * 3. Advisors / Awards / Media — seamless infinite auto-scroll marquee + drag
 *    Media also gets prev/next arrow buttons positioned OUTSIDE the card area
 */

// ─── 1. COUNTER ANIMATION ─────────────────────────────────────────────────────
function animateCounters() {
  const counters = document.querySelectorAll(".wp-about .elementor-counter-number");
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      if (el.dataset.animated) return;
      const target = parseFloat(el.dataset.toValue || el.textContent.replace(/,/g, ""));
      const duration = 2000;
      const start = performance.now();
      function update(now) {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.round(eased * target).toLocaleString();
        if (progress < 1) requestAnimationFrame(update);
        else { el.textContent = target.toLocaleString(); el.dataset.animated = "true"; }
      }
      if (!el.dataset.toValue) { el.dataset.toValue = el.textContent.replace(/,/g, ""); el.textContent = "0"; }
      requestAnimationFrame(update);
      observer.unobserve(el);
    });
  }, { threshold: 0.3 });
  counters.forEach((el) => {
    if (!el.dataset.toValue) { el.dataset.toValue = el.textContent.replace(/,/g, ""); el.textContent = "0"; }
    observer.observe(el);
  });
}

// ─── 2. JOURNEY STICKY ────────────────────────────────────────────────────────
function fixJourneySticky() {
  const wrapper = document.querySelector(".wp-about");
  if (!wrapper) return;
  const journeySection = document.querySelector(".wp-about [data-id='54cdb72']");
  if (!journeySection) return;
  const stickyPanel = journeySection.querySelector(":scope > .e-con-inner > .e-con:first-child");
  if (!stickyPanel) return;

  // Clear overflow on all ancestors so sticky works
  let node = stickyPanel.parentElement;
  while (node && node !== document.body) {
    const cs = window.getComputedStyle(node);
    if (["hidden","auto","scroll"].some(v => [cs.overflow,cs.overflowX,cs.overflowY].includes(v))) {
      node.style.setProperty("overflow", "visible", "important");
    }
    if (node === wrapper) break;
    node = node.parentElement;
  }
  wrapper.style.setProperty("overflow-x", "clip", "important");

  // Left panel = stretches full height, contains the sticky heading
  stickyPanel.style.setProperty("position", "relative", "important");
  stickyPanel.style.setProperty("overflow", "visible", "important");

  // Inner heading container = sticky element
  const headingContainer = stickyPanel.querySelector("[data-id='f432fe0']");
  if (headingContainer) {
    headingContainer.style.setProperty("position", "sticky", "important");
    headingContainer.style.setProperty("top", "calc(50vh - 80px)", "important");
  }

  // Parent flex must stretch left panel to full timeline height
  const conInner = journeySection.querySelector(":scope > .e-con-inner");
  if (conInner) {
    conInner.style.setProperty("align-items", "stretch", "important");
  }
}

// ─── HELPERS ──────────────────────────────────────────────────────────────────
function findHeadingByText(container, keyword) {
  const els = container.querySelectorAll("h1,h2,h3,h4,h5,h6,.elementor-heading-title");
  for (const el of els) if (el.textContent.trim().toLowerCase().includes(keyword)) return el;
  return null;
}

function getSectionForHeading(heading) {
  let node = heading;
  while (node.parentElement) {
    const parent = node.parentElement;
    if (parent.hasAttribute("data-elementor-id") || parent.classList.contains("wp-about") || parent.classList.contains("elementor")) return node;
    node = parent;
  }
  return null;
}

function findCardRow(section) {
  let best = null, bestCount = 2;
  section.querySelectorAll(".e-con-inner,.elementor-container,.swiper-wrapper").forEach((c) => {
    if (c.children.length > bestCount) { bestCount = c.children.length; best = c; }
  });
  return best;
}

// ─── 3. MARQUEE (Advisors, Awards, Media all use this) ───────────────────────
function makeMarquee(el, cardWidth, gap, speed) {
  if (el.dataset.marquee) return;
  el.dataset.marquee = "true";

  Object.assign(el.style, {
    display:       "flex",
    flexDirection: "row",
    flexWrap:      "nowrap",
    overflowX:     "scroll",
    overflowY:     "visible",
    gap:           gap + "px",
    width:         "100%",
    cursor:        "grab",
    scrollbarWidth:"none",
    paddingBottom: "6px",
  });
  el.style.setProperty("overflow-x", "scroll", "important");
  el.style.setProperty("flex-wrap",  "nowrap",  "important");

  function styleCard(card) {
    card.style.setProperty("flex",       "0 0 " + cardWidth + "px", "important");
    card.style.setProperty("width",      cardWidth + "px",           "important");
    card.style.setProperty("min-width",  cardWidth + "px",           "important");
    card.style.setProperty("max-width",  cardWidth + "px",           "important");
    card.style.setProperty("--width",    cardWidth + "px");
    card.style.setProperty("visibility", "visible",                  "important");
    card.style.setProperty("opacity",    "1",                        "important");
  }

  Array.from(el.children).forEach(styleCard);

  // Clone for seamless loop
  Array.from(el.children).forEach((child) => {
    const clone = child.cloneNode(true);
    clone.setAttribute("aria-hidden", "true");
    styleCard(clone);
    el.appendChild(clone);
  });

  let paused = false, isDragging = false, dragStartX = 0, dragScrollLeft = 0;

  el.addEventListener("mouseenter", () => { paused = true; });
  el.addEventListener("mouseleave", () => { if (!isDragging) paused = false; });
  el.addEventListener("mousedown",  (e) => {
    isDragging = true; paused = true;
    dragStartX = e.pageX - el.offsetLeft; dragScrollLeft = el.scrollLeft;
    el.style.cursor = "grabbing";
  });
  window.addEventListener("mousemove", (e) => {
    if (!isDragging) return; e.preventDefault();
    el.scrollLeft = dragScrollLeft - (e.pageX - el.offsetLeft - dragStartX) * 1.5;
  });
  window.addEventListener("mouseup", () => {
    if (!isDragging) return; isDragging = false; paused = false; el.style.cursor = "grab";
  });

  let tStartX = 0, tScrollLeft = 0;
  el.addEventListener("touchstart", (e) => { paused = true; tStartX = e.touches[0].pageX; tScrollLeft = el.scrollLeft; }, { passive: true });
  el.addEventListener("touchmove",  (e) => { el.scrollLeft = tScrollLeft + (tStartX - e.touches[0].pageX); }, { passive: true });
  el.addEventListener("touchend",   () => { setTimeout(() => { paused = false; }, 1500); }, { passive: true });

  (function step() {
    if (!paused) {
      el.scrollLeft += speed;
      const half = el.scrollWidth / 2;
      if (el.scrollLeft >= half) el.scrollLeft -= half;
    }
    requestAnimationFrame(step);
  })();
}

// ─── 4. MEDIA — marquee + outside arrow buttons ───────────────────────────────
const MEDIA_CARD_WIDTH = 380;
const MEDIA_CARD_GAP   = 24;
const MEDIA_VISIBLE    = 3;

function buildMediaSlider(section) {
  if (section.dataset.mediaSlider) return;
  section.dataset.mediaSlider = "true";

  // Unlock Swiper inline locks
  section.querySelectorAll(".swiper-wrapper").forEach((sw) => {
    sw.style.setProperty("transform",  "none", "important");
    sw.style.setProperty("transition", "none", "important");
    sw.querySelectorAll(".swiper-slide").forEach((s) => {
      s.style.setProperty("visibility", "visible", "important");
      s.style.setProperty("opacity",    "1",       "important");
      s.style.removeProperty("display");
    });
  });
  section.querySelectorAll(".elementor-swiper-button,.swiper-button-prev,.swiper-button-next,.ekit-swiper-arrow")
    .forEach((b) => b.style.setProperty("display","none","important"));

  const cardRow = findCardRow(section);
  if (!cardRow) return;

  const origCards = Array.from(cardRow.children);
  const totalCards = origCards.length;
  const maxIndex = Math.max(0, totalCards - MEDIA_VISIBLE);

  // Apply marquee to cardRow (this handles auto-scroll + drag)
  makeMarquee(cardRow, MEDIA_CARD_WIDTH, MEDIA_CARD_GAP, 0.55);

  // ── Wrap in a layout container: [prevBtn] [overflow:hidden track] [nextBtn] ──
  const outerWrap = document.createElement("div");
  outerWrap.style.cssText = `
    display: flex;
    align-items: center;
    gap: 12px;
    width: 100%;
    position: relative;
  `;

  const clipBox = document.createElement("div");
  clipBox.style.cssText = `
    flex: 1;
    overflow: hidden;
    min-width: 0;
  `;

  cardRow.parentElement.insertBefore(outerWrap, cardRow);
  outerWrap.appendChild(clipBox);
  clipBox.appendChild(cardRow);

  // Arrow button factory
  function makeArrow(dir) {
    const btn = document.createElement("button");
    btn.setAttribute("aria-label", dir === "prev" ? "Previous" : "Next");
    btn.innerHTML = dir === "prev"
      ? `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>`
      : `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>`;
    btn.style.cssText = `
      flex: 0 0 auto;
      width: 44px;
      height: 44px;
      border-radius: 50%;
      background: #ffffff;
      border: 1.5px solid #e5e7eb;
      box-shadow: 0 2px 10px rgba(0,0,0,0.13);
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #374151;
      transition: background 0.2s, box-shadow 0.2s, opacity 0.2s;
      padding: 0;
      flex-shrink: 0;
    `;
    btn.addEventListener("mouseenter", () => { btn.style.background = "#f9fafb"; btn.style.boxShadow = "0 4px 14px rgba(0,0,0,0.18)"; });
    btn.addEventListener("mouseleave", () => { btn.style.background = "#ffffff"; btn.style.boxShadow = "0 2px 10px rgba(0,0,0,0.13)"; });
    return btn;
  }

  const prevBtn = makeArrow("prev");
  const nextBtn = makeArrow("next");

  // Insert arrows OUTSIDE clipBox
  outerWrap.insertBefore(prevBtn, clipBox);
  outerWrap.appendChild(nextBtn);

  // Manual prev/next (pauses auto-scroll for 2s after click)
  let manualIndex = 0;
  function updateArrows() {
    prevBtn.style.opacity      = manualIndex <= 0        ? "0.35" : "1";
    nextBtn.style.opacity      = manualIndex >= maxIndex ? "0.35" : "1";
    prevBtn.style.pointerEvents = manualIndex <= 0        ? "none" : "auto";
    nextBtn.style.pointerEvents = manualIndex >= maxIndex ? "none" : "auto";
  }

  // Access the marquee's paused flag via a shared ref on the element
  prevBtn.addEventListener("click", () => {
    if (manualIndex <= 0) return;
    manualIndex--;
    cardRow.scrollTo({ left: manualIndex * (MEDIA_CARD_WIDTH + MEDIA_CARD_GAP), behavior: "smooth" });
    cardRow.dataset.pausedUntil = Date.now() + 2000;
    updateArrows();
  });
  nextBtn.addEventListener("click", () => {
    if (manualIndex >= maxIndex) return;
    manualIndex++;
    cardRow.scrollTo({ left: manualIndex * (MEDIA_CARD_WIDTH + MEDIA_CARD_GAP), behavior: "smooth" });
    cardRow.dataset.pausedUntil = Date.now() + 2000;
    updateArrows();
  });

  updateArrows();
}

// ─── 5. ORCHESTRATE ───────────────────────────────────────────────────────────
function fixHorizontalSections() {
  const wrapper = document.querySelector(".wp-about");
  if (!wrapper) return;

  // Advisors — 280px cards
  const advisorsH = findHeadingByText(wrapper, "strategic advisors");
  if (advisorsH) {
    const sec = getSectionForHeading(advisorsH);
    if (sec) { const row = findCardRow(sec); if (row && !row.dataset.marquee) makeMarquee(row, 280, 20, 0.6); }
  }

  // Awards — 340px cards
  const awardsH = findHeadingByText(wrapper, "awards");
  if (awardsH) {
    const sec = getSectionForHeading(awardsH);
    if (sec) { const row = findCardRow(sec); if (row && !row.dataset.marquee) makeMarquee(row, 340, 20, 0.5); }
  }

  // Media — 380px cards + arrows
  const mediaH = findHeadingByText(wrapper, "media");
  if (mediaH) {
    const sec = getSectionForHeading(mediaH);
    if (sec) buildMediaSlider(sec);
  }
}

// ─── 6. FIX COUNTER VALUES ────────────────────────────────────────────────────
function fixCounterValues() {
  // Countries Served should show 15+
  const counters = document.querySelectorAll(".wp-about .elementor-counter");
  counters.forEach((counter) => {
    const title = counter.querySelector(".elementor-counter-title");
    if (title && title.textContent.trim().toLowerCase().includes("countries")) {
      const num = counter.querySelector(".elementor-counter-number");
      if (num) {
        num.dataset.toValue = "15";
        num.textContent = "0";
      }
    }
  });
}

// ─── INIT ─────────────────────────────────────────────────────────────────────
function initAll() {
  fixCounterValues();
  animateCounters();
  fixJourneySticky();
  fixHorizontalSections();
}

if (typeof window !== "undefined") {
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", initAll);
  else initAll();
}

export { animateCounters, fixJourneySticky, fixHorizontalSections, fixCounterValues, initAll };