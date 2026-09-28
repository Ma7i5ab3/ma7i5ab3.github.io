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

  // A typo in config.js (a missing comma, an unclosed quote) stops the
  // browser from reading it, so CONFIG never exists. Say so on the page
  // instead of leaving it blank; the console shows the exact line.
  if (typeof CONFIG === "undefined") {
    document.getElementById("main").innerHTML = `
      <section class="section section--home">
        <div class="wrap">
          <h2 class="section-title">js/config.js could not be read</h2>
          <p>It probably contains a typo, such as a missing comma between two items.
             Open the browser console to see the line number.</p>
        </div>
      </section>`;
    return;
  }

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
   * Icons used by the "icon" field in CONFIG, drawn inline so they follow
   * the text colour in both themes. Each entry is [viewBox width, path].
   * Paths from Font Awesome Free 6.7.2 by @fontawesome — https://fontawesome.com
   * License: CC BY 4.0 — https://fontawesome.com/license/free
   */
  const ICONS = {
    email: [512, "M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48L48 64zM0 176L0 384c0 35.3 28.7 64 64 64l384 0c35.3 0 64-28.7 64-64l0-208L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z"],
    linkedin: [448, "M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z"],
    github: [496, "M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"],
    scholar: [512, "M390.9 298.5c0 0 0 .1 .1 .1c9.2 19.4 14.4 41.1 14.4 64C405.3 445.1 338.5 512 256 512s-149.3-66.9-149.3-149.3c0-22.9 5.2-44.6 14.4-64h0c1.7-3.6 3.6-7.2 5.6-10.7c4.4-7.6 9.4-14.7 15-21.3c27.4-32.6 68.5-53.3 114.4-53.3c33.6 0 64.6 11.1 89.6 29.9c9.1 6.9 17.4 14.7 24.8 23.5c5.6 6.6 10.6 13.8 15 21.3c2 3.4 3.8 7 5.5 10.5zm26.4-18.8c-30.1-58.4-91-98.4-161.3-98.4s-131.2 40-161.3 98.4L0 202.7 256 0 512 202.7l-94.7 77.1z"]
  };

  /** Inline SVG for one of the ICONS above ("" if the name is unknown). */
  function icon(name) {
    const def = ICONS[name];
    return def
      ? `<svg class="icon" viewBox="0 0 ${def[0]} 512" aria-hidden="true" focusable="false"><path fill="currentColor" d="${def[1]}"/></svg>`
      : "";
  }

  /**
   * Opens PDFs and external pages in a new tab, so the visitor does not lose
   * their place on your page. Mail links are left alone: they open the mail
   * app, and a new tab would stay behind empty.
   */
  const newTab = (url) => url.startsWith("mailto:") ? "" : ' target="_blank" rel="noopener"';

  /**
   * Builds one link button.
   * @param {object} link   - { label, url, icon? } from CONFIG
   * @param {boolean} solid - true for the filled style
   */
  function button(link, solid) {
    const style = solid ? "btn btn--solid" : "btn";
    // With an icon the button shows just the icon; the label becomes its
    // tooltip and the name read out by screen readers.
    if (ICONS[link.icon]) {
      return `<a class="${style} btn--icon" href="${link.url}"${newTab(link.url)}
                 aria-label="${link.label}" title="${link.label}">${icon(link.icon)}</a>`;
    }
    return `<a class="${style}" href="${link.url}"${newTab(link.url)}>
              ${link.label}${ARROW}
            </a>`;
  }

  /**
   * Builds a row of link buttons. The first one is drawn filled so it stands
   * out; links with an empty url are skipped instead of pointing nowhere.
   */
  function buttonRow(links, className) {
    const usable = (links || []).filter((l) => l.url);
    return usable.length
      ? `<div class="${className}">${join(usable, (l, i) => button(l, i === 0))}</div>`
      : "";
  }

  /** Organisation logo on the right of an experience or education entry. */
  function orgLogo(item) {
    return item.logo
      ? `<img class="org-logo" src="${item.logo}" alt="${item.org} logo" loading="lazy">`
      : "";
  }

  /** Small outlined labels (project tech, course level and hours). */
  function tagList(tags) {
    return tags && tags.length
      ? `<ul class="tags">${join(tags, (t) => `<li class="tag">${t}</li>`)}</ul>`
      : "";
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
   * Standard shell shared by every section: title, then content.
   * `wash` alternates the background so sections read as separate blocks;
   * it is decided by the section's position (see renderSections).
   */
  function section(id, title, inner, wash) {
    return `
      <section class="section ${wash ? "section--wash" : ""}" id="${id}">
        <div class="wrap reveal">
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

    /* --- HOME: intro and portrait side by side, bio blocks below --- */
    home(label) {
      const p = CONFIG.profile;
      const h = CONFIG.home;

      // Each bio block becomes a card with a numbered heading; the one
      // marked highlight: true is drawn inverted so it stands out.
      // Regular blocks share one row (at most 3 across).
      const blocks = h.bio || [];
      const cols = Math.min(3, blocks.filter((b) => !b.highlight).length) || 1;
      const bio = blocks.length
        ? `<div class="bio-grid" style="--bio-cols:${cols}">${join(blocks, (block, i) => `
             <article class="bio-block${block.highlight ? " bio-block--highlight" : ""}">
               <p class="bio-label">
                 <span class="bio-num">${String(i + 1).padStart(2, "0")}</span>${block.title}
               </p>
               <div class="bio-text">${join(block.text, (para) => `<p>${para}</p>`)}</div>
             </article>`)}</div>`
        : "";

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
                ${p.tagline ? `<p class="home-tagline">${p.tagline}</p>` : ""}
                <h1 class="home-name">${p.name}</h1>
                ${p.status ? `<p class="home-status">${p.status}</p>` : ""}
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
            ${bio}
          </div>
        </section>`;
    },

    /* --- PUBLICATIONS: one row per paper, with its link buttons --- */
    publications(label, wash) {
      const rows = join(CONFIG.publications, (pub) => `
          <li class="pub">
            <div class="pub-year">${pub.year}</div>
            <div class="pub-body">
              <h3 class="pub-title">${pub.title}</h3>
              <p class="pub-authors">${highlightMe(pub.authors)}</p>
              ${pub.venue ? `<p class="pub-venue">${pub.venue}</p>` : ""}
              ${pub.note ? `<span class="pub-note">${pub.note}</span>` : ""}
              ${pub.abstract ? `
                <details class="pub-abstract">
                  <summary>Abstract</summary>
                  <p>${pub.abstract}</p>
                </details>` : ""}
              ${buttonRow(pub.links, "pub-links")}
            </div>
          </li>`);

      return section("publications", "Publications",
        `<ul class="pub-list">${rows}</ul>`, wash);
    },

    /* --- PROJECTS: a grid of small cards --- */
    projects(label, wash) {
      const cards = join(CONFIG.projects, (proj) => `
          <li class="project">
            <h3 class="project-title">${proj.title}</h3>
            ${proj.logo
              ? `<img class="project-logo" src="${proj.logo}" alt="${proj.title} logo" loading="lazy">` : ""}
            <p class="project-desc">${proj.description}</p>
            ${tagList(proj.tags)}
            ${buttonRow(proj.links, "project-links")}
          </li>`);

      return section("projects", "Projects",
        `<ul class="project-grid">${cards}</ul>`, wash);
    },

    /* --- TEACHING: one compact row per course, level and hours as tags --- */
    teaching(label, wash) {
      const rows = join(CONFIG.teaching, (item) => {
        const org = [item.role, item.org].filter(Boolean).join(" · ");
        const tags = [item.level, item.hours ? `${item.hours} h` : ""].filter(Boolean);

        return `
          <li class="teach">
            <div class="teach-period">${item.period}</div>
            <div>
              <div class="teach-head">
                <h3 class="teach-course">${item.course}</h3>
                ${org ? `<span class="teach-org">${org}</span>` : ""}
              </div>
              ${item.points && item.points.length
                ? `<p class="teach-points">${item.points.join(" · ")}</p>` : ""}
              ${buttonRow(item.links, "record-links")}
            </div>
            ${tagList(tags)}
          </li>`;
      });

      return section("teaching", "Teaching",
        `<ul class="teach-list">${rows}</ul>`, wash);
    },

    /* --- INDUSTRY EXPERIENCE: period on the left, details on the right --- */
    experience(label, wash) {
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
            ${orgLogo(job)}
          </li>`;
      });

      return section("experience", "Industry Experience",
        `<ul class="record-list">${rows}</ul>`, wash);
    },

    /* --- EDUCATION: same layout as experience, shorter content --- */
    education(label, wash) {
      const rows = join(CONFIG.education, (item) => `
        <li class="record">
          <div class="record-period">${item.period}</div>
          <div>
            <h3 class="record-role">${item.degree}</h3>
            <p class="record-org">${item.org}</p>
            ${item.detail ? `<p class="record-detail">${item.detail}</p>` : ""}
          </div>
          ${orgLogo(item)}
        </li>`);

      return section("education", "Education",
        `<ul class="record-list">${rows}</ul>`, wash);
    },

    /* --- CONTACT: a list of large, clickable rows --- */
    contact(label, wash) {
      const c = CONFIG.contact;
      const rows = join(c.links, (l) => `
        <li>
          <a class="contact-row" href="${l.url}"${newTab(l.url)}>
            <span class="contact-label">${icon(l.icon)}${l.label}</span>
            ${l.value ? `<span class="contact-value">${l.value}</span>` : ""}
          </a>
        </li>`);

      return section("contact", "Contact",
        `${c.intro ? `<p class="contact-intro">${c.intro}</p>` : ""}
         <ul class="contact-list">${rows}</ul>`, wash);
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
    // Skip gracefully if an unknown id ends up in CONFIG.sections.
    const known = activeSections.filter((s) => BUILDERS[s.id]);
    // Every other section gets the grey background, whatever the order.
    $("#main").innerHTML = join(known, (s, i) => BUILDERS[s.id](s.label, i % 2 === 1));
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

  /**
   * Collapses the header links into the menu button whenever they do not
   * fit on one line. Measured instead of using a fixed screen width,
   * because the space needed grows with every section you add.
   */
  function setupNavFit() {
    const header = $(".header");
    const inner = $(".header-inner");

    const fit = () => {
      // Measuring briefly shows the full row of links; transitions are off
      // meanwhile, otherwise the dropdown panel would flash as it fades out.
      header.classList.add("is-measuring");
      header.classList.remove("is-compact");
      header.classList.toggle("is-compact", inner.scrollWidth > inner.clientWidth);
      void header.offsetWidth;   // apply the result before transitions return
      header.classList.remove("is-measuring");
    };

    fit();
    window.addEventListener("resize", fit);
    // Web fonts arrive after the first render and change the text width.
    if (document.fonts) document.fonts.ready.then(fit);
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
  setupNavFit();
  setupMenu();
  setupTheme();

})();
