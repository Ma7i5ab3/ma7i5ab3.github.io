/* ============================================================================
   MAIN — builds the page from CONFIG (js/config.js) and wires up the
   interactions. You should not need to edit this file to change content.

   What happens, in order:
     1. Read CONFIG.
     2. Build the header links and the page sections.
     3. Turn on: scroll spy, mobile menu, theme toggle, scroll reveal.
   ========================================================================= */

(function () {
  "use strict";

  /* ---------- helpers ---------------------------------------------------- */

  /** Shorthand for document.querySelector. */
  const $ = (selector) => document.querySelector(selector);

  /**
   * Joins a list of strings into one block of HTML.
   * Used everywhere below to turn arrays from CONFIG into markup.
   */
  const join = (items, buildOne) => items.map(buildOne).join("");

  /** Small arrow appended to buttons. */
  const ARROW = '<span class="btn-arrow" aria-hidden="true">&rarr;</span>';

  /**
   * Builds one link button.
   * @param {object} link   - { label, url } from CONFIG
   * @param {boolean} solid - true for the filled style
   */
  function button(link, solid) {
    const style = solid ? "btn btn--solid" : "btn";
    // target="_blank" opens PDFs and external pages in a new tab, so the
    // visitor does not lose their place on your page.
    return `<a class="${style}" href="${link.url}" target="_blank" rel="noopener">
              ${link.label}${ARROW}
            </a>`;
  }

  /**
   * Wraps your own name in <strong> inside an author list, so readers can
   * find you quickly. The name to match comes from CONFIG.highlightAuthor.
   */
  function highlightMe(authors) {
    const me = CONFIG.highlightAuthor;
    if (!me) return authors;
    return authors.split(me).join(`<strong>${me}</strong>`);
  }

  /**
   * Standard shell shared by every section: eyebrow label, title, content.
   * `wash` alternates the background so sections read as separate blocks.
   */
  function section(id, label, title, inner, wash) {
    return `
      <section class="section ${wash ? "section--wash" : ""}" id="${id}">
        <div class="wrap reveal">
          <p class="eyebrow">${label}</p>
          <h2 class="section-title">${title}</h2>
          ${inner}
        </div>
      </section>`;
  }


  /* ---------- section builders ------------------------------------------
     Each function returns the HTML for one section. They are looked up by
     the section id defined in CONFIG.sections.
     -------------------------------------------------------------------- */

  const BUILDERS = {

    /* --- HOME: intro text plus your portrait --- */
    home(label) {
      const p = CONFIG.profile;
      const h = CONFIG.home;

      const bio = join(h.bio, (para) => `<p>${para}</p>`);

      const actions = h.actions.length
        ? `<div class="home-actions">${join(h.actions, (a) => button(a, false))}</div>`
        : "";

      const facts = h.facts.length
        ? `<ul class="home-facts">${join(h.facts, (f) => `
             <li><span class="fact-key">${f.key}</span>
                 <span class="fact-value">${f.value}</span></li>`)}</ul>`
        : "";

      return `
        <section class="section section--home" id="home">
          <div class="wrap reveal">
            <div class="home-grid">

              <div class="home-intro">
                <p class="home-tagline">${p.tagline}</p>
                <h1 class="home-name">${p.name}</h1>
                ${p.status ? `<p class="home-status">${p.status}</p>` : ""}
                <div class="home-bio">${bio}</div>
                ${actions}
                ${facts}
              </div>

              <div class="home-portrait">
                <figure style="margin:0">
                  <div class="portrait">
                    <img src="${p.photo}" alt="${p.photoAlt}" width="800" height="800">
                  </div>
                  <figcaption class="portrait-caption">
                    <span>${p.photoCaption || ""}</span>
                    <span aria-hidden="true">hover</span>
                  </figcaption>
                </figure>
              </div>

            </div>
          </div>
        </section>`;
    },

    /* --- PUBLICATIONS: one row per paper, with its link buttons --- */
    publications(label) {
      const rows = join(CONFIG.publications, (pub) => {
        // The first link is drawn filled so it stands out (usually PrePrint).
        const links = pub.links && pub.links.length
          ? `<div class="pub-links">
               ${join(pub.links, (l, i) => button(l, i === 0))}
             </div>`
          : "";

        return `
          <li class="pub">
            <div class="pub-year">${pub.year}</div>
            <div class="pub-body">
              <h3 class="pub-title">${pub.title}</h3>
              <p class="pub-authors">${highlightMe(pub.authors)}</p>
              <p class="pub-venue">${pub.venue}</p>
              ${pub.note ? `<span class="pub-note">${pub.note}</span>` : ""}
              ${links}
            </div>
          </li>`;
      });

      return section("publications", label, "Publications",
        `<ul class="pub-list">${rows}</ul>`, true);
    },

    /* --- INDUSTRY EXPERIENCE: period on the left, details on the right --- */
    experience(label) {
      const rows = join(CONFIG.experience, (job) => {
        const place = job.place ? ` · ${job.place}` : "";
        const points = job.points && job.points.length
          ? `<ul class="record-points">${join(job.points, (pt) => `<li>${pt}</li>`)}</ul>`
          : "";

        return `
          <li class="record">
            <div class="record-period">${job.period}</div>
            <div>
              <h3 class="record-role">${job.role}</h3>
              <p class="record-org">${job.org}${place}</p>
              ${points}
            </div>
          </li>`;
      });

      return section("experience", label, "Industry Experience",
        `<ul class="record-list">${rows}</ul>`, false);
    },

    /* --- EDUCATION: same layout as experience, shorter content --- */
    education(label) {
      const rows = join(CONFIG.education, (item) => `
        <li class="record">
          <div class="record-period">${item.period}</div>
          <div>
            <h3 class="record-role">${item.degree}</h3>
            <p class="record-org">${item.org}</p>
            ${item.detail ? `<p class="record-detail">${item.detail}</p>` : ""}
          </div>
        </li>`);

      return section("education", label, "Education",
        `<ul class="record-list">${rows}</ul>`, true);
    },

    /* --- CONTACT: a list of large, clickable rows --- */
    contact(label) {
      const c = CONFIG.contact;
      const rows = join(c.links, (l) => `
        <li>
          <a class="contact-row" href="${l.url}" target="_blank" rel="noopener">
            <span class="contact-label">${l.label}</span>
            <span class="contact-value">${l.value}</span>
          </a>
        </li>`);

      return section("contact", label, "Contact",
        `${c.intro ? `<p class="contact-intro">${c.intro}</p>` : ""}
         <ul class="contact-list">${rows}</ul>`, false);
    }
  };


  /* ---------- build the page --------------------------------------------- */

  // Only the sections marked enabled: true are used, in the order listed.
  const activeSections = CONFIG.sections.filter((s) => s.enabled);

  /** Header links, one per active section. */
  function renderNav() {
    $("#nav-list").innerHTML = join(activeSections, (s) =>
      `<li><a class="nav-link" href="#${s.id}" data-target="${s.id}">${s.label}</a></li>`
    );
    $("#brand-name").textContent = CONFIG.profile.shortName;
  }

  /** Page body, one block per active section. */
  function renderSections() {
    $("#main").innerHTML = join(activeSections, (s) => {
      const build = BUILDERS[s.id];
      // Skip gracefully if an unknown id ends up in CONFIG.sections.
      return build ? build(s.label) : "";
    });
  }

  /** Title, description and footer text. */
  function renderMeta() {
    document.title = CONFIG.profile.pageTitle;
    const desc = document.querySelector('meta[name="description"]');
    if (desc) desc.setAttribute("content", CONFIG.profile.pageDescription);
    $("#footer-text").innerHTML = CONFIG.footer;
  }


  /* ---------- interactions ----------------------------------------------- */

  /**
   * Scroll spy: highlights the header link of whichever section is currently
   * on screen. Uses IntersectionObserver, which is far cheaper than listening
   * to every scroll event.
   */
  function setupScrollSpy() {
    const links = document.querySelectorAll(".nav-link");
    const sections = document.querySelectorAll(".section");

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        links.forEach((link) => {
          link.classList.toggle("is-active", link.dataset.target === entry.target.id);
        });
      });
    }, {
      // Trigger when a section crosses the upper third of the viewport.
      rootMargin: "-25% 0px -65% 0px"
    });

    sections.forEach((s) => observer.observe(s));
  }

  /**
   * Scroll reveal: fades blocks in the first time they come into view.
   * Elements opt in with the .reveal class (see renderers above).
   */
  function setupReveal() {
    const items = document.querySelectorAll(".reveal");

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        obs.unobserve(entry.target);   // animate once, then stop watching
      });
    }, { threshold: 0.08 });

    items.forEach((el) => observer.observe(el));
  }

  /** Mobile menu open/close, including closing after a link is tapped. */
  function setupMenu() {
    const toggle = $("#menu-toggle");
    const list = $("#nav-list");

    const close = () => {
      list.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-label", "Open menu");
    };

    toggle.addEventListener("click", () => {
      const isOpen = list.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(isOpen));
      toggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
    });

    list.addEventListener("click", (e) => {
      if (e.target.closest(".nav-link")) close();
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") close();
    });
  }

  /**
   * Light / dark toggle.
   * The choice is saved so it survives a page reload. Saving is wrapped in
   * try/catch because some embedded previews block storage — if it fails the
   * toggle still works for the current visit.
   */
  function setupTheme() {
    const root = document.documentElement;
    const button = $("#theme-toggle");
    const label = $("#theme-label");

    const read = () => {
      try { return localStorage.getItem("theme"); } catch (e) { return null; }
    };
    const write = (value) => {
      try { localStorage.setItem("theme", value); } catch (e) { /* ignore */ }
    };

    const apply = (theme) => {
      root.setAttribute("data-theme", theme);
      // The button always names the theme you would switch TO.
      label.textContent = theme === "dark" ? "Light" : "Dark";
    };

    // Saved choice wins; otherwise follow the operating system setting.
    const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    apply(read() || (systemPrefersDark ? "dark" : "light"));

    button.addEventListener("click", () => {
      const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
      apply(next);
      write(next);
    });
  }


  /* ---------- start ------------------------------------------------------ */

  renderMeta();
  renderNav();
  renderSections();
  setupScrollSpy();
  setupReveal();
  setupMenu();
  setupTheme();

})();
