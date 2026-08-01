/* ============================================================================
   CONFIG — THIS IS THE ONLY FILE YOU NEED TO EDIT

   Everything on the page comes from the object below. Add, remove or reorder
   items and the page updates itself. You never touch index.html or main.js.

   Two rules that keep things from breaking:
     1. Every item ends with a comma, except the last one in a list.
     2. Text goes inside quotes. If your text contains a quote character,
        write it as \" so it does not close the string early.

   You can use simple HTML inside text fields (<strong>, <em>, <a href="...">).
   ========================================================================= */

const CONFIG = {

  /* --------------------------------------------------------------------
     1. PROFILE — name, tagline, photo, browser tab title
     ------------------------------------------------------------------ */
  profile: {
    name: "Marco Sabella",              // shown large in the Home section
    shortName: "Sabella",               // shown small in the header
    tagline: "PhD Candidate · Machine Learning Systems",
    status: "Currently: Research Intern @ Example Lab, Berlin",

    // Your photo. Drop the file in assets/img/ and put its name here.
    // Square images (e.g. 800x800) look best.
    photo: "assets/img/profile.svg",
    photoAlt: "Portrait of Marco Sabella",
    photoCaption: "Berlin, 2026",

    // Used for the browser tab and for search engines.
    pageTitle: "Marco Sabella — Personal Page",
    pageDescription: "Personal page of Marco Sabella: research, publications and industry experience."
  },

  /* --------------------------------------------------------------------
     2. SECTIONS — controls the header links AND the page order

     - Reorder the lines to reorder the page.
     - Set enabled: false to hide a section completely.
     - "label" is the text in the header. "id" must stay as it is.
     ------------------------------------------------------------------ */
  sections: [
    { id: "home",        label: "Home",                enabled: true },
    { id: "publications", label: "Publications",       enabled: true },
    { id: "experience",  label: "Industry Experience", enabled: true },
    { id: "education",   label: "Education",           enabled: true },
    { id: "contact",     label: "Contact",             enabled: true }
  ],

  /* --------------------------------------------------------------------
     3. HOME — the paragraphs next to your photo
     ------------------------------------------------------------------ */
  home: {
    // Each string is one paragraph. Add or remove lines freely.
    bio: [
      "I work on the systems side of machine learning: how large models are trained, served and kept efficient once they leave the lab.",
      "My current research looks at scheduling and memory pressure in distributed training, with a focus on making results reproducible across hardware generations.",
      "Before the PhD I spent four years building data infrastructure in industry, which is still where most of my questions come from."
    ],

    // Small buttons under the bio. Remove any you do not need.
    actions: [
      { label: "Email",   url: "mailto:you@example.com" },
      { label: "CV",      url: "assets/pdf/cv.pdf" },
      { label: "Scholar", url: "https://scholar.google.com/" },
      { label: "GitHub",  url: "https://github.com/sabella" }
    ],

    // Optional quick facts shown as a small list. Set to [] to hide.
    facts: [
      { key: "Field",    value: "Distributed training, ML systems" },
      { key: "Based in", value: "Berlin, Germany" },
      { key: "Open to",  value: "Collaborations, internships" }
    ]
  },

  /* --------------------------------------------------------------------
     4. PUBLICATIONS

     "links" draws the buttons under each paper. The FIRST link is drawn
     filled (the prominent one), the rest are outlined — so keep PrePrint
     first if you want it to stand out.

     For a PrePrint PDF: put the file in assets/pdf/ and use the path,
     e.g. "assets/pdf/my-paper.pdf". An external URL works too.
     ------------------------------------------------------------------ */

  // Your own name as it appears in author lists. It gets bolded
  // automatically so readers can spot you at a glance.
  highlightAuthor: "M. Sabella",

  publications: [
    {
      year: "2026",
      title: "Memory-Aware Scheduling for Large-Scale Distributed Training",
      authors: "M. Sabella, A. Rossi, K. Nakamura",
      venue: "International Conference on Machine Learning (ICML)",
      note: "Oral presentation",        // optional, remove the line to hide
      links: [
        { label: "PrePrint", url: "assets/pdf/preprint-2026-scheduling.pdf" },
        { label: "Code",     url: "https://github.com/sabella/scheduling" },
        { label: "DOI",      url: "https://doi.org/10.0000/example" }
      ]
    },
    {
      year: "2025",
      title: "Reproducibility Across Hardware Generations in Deep Learning Pipelines",
      authors: "M. Sabella, L. Bianchi",
      venue: "Conference on Neural Information Processing Systems (NeurIPS)",
      links: [
        { label: "PrePrint", url: "assets/pdf/preprint-2025-reproducibility.pdf" },
        { label: "Poster",   url: "assets/pdf/poster-2025.pdf" }
      ]
    },
    {
      year: "2024",
      title: "A Practical Survey of Data Pipeline Failures in Production ML",
      authors: "L. Bianchi, M. Sabella, T. Weber",
      venue: "ACM Transactions on Data Science",
      links: [
        { label: "PrePrint", url: "assets/pdf/preprint-2024-survey.pdf" }
      ]
    }
  ],

  /* --------------------------------------------------------------------
     5. INDUSTRY EXPERIENCE
     ------------------------------------------------------------------ */
  experience: [
    {
      period: "2025 — present",
      role: "Research Intern",
      org: "Example Lab",
      place: "Berlin, Germany",
      points: [
        "Built a profiling harness that cut debugging time for failed training runs from days to hours.",
        "Contributed scheduling changes now used across three internal training clusters."
      ]
    },
    {
      period: "2021 — 2024",
      role: "Data Infrastructure Engineer",
      org: "Northline Systems",
      place: "Milan, Italy",
      points: [
        "Owned the ingestion layer moving roughly 2 TB per day into the analytics warehouse.",
        "Led the migration from batch ETL to streaming, reducing data freshness lag from 6 hours to 4 minutes.",
        "Mentored two junior engineers through their first year."
      ]
    },
    {
      period: "2020 — 2021",
      role: "Software Engineer",
      org: "Kerne Analytics",
      place: "Remote",
      points: [
        "Shipped the internal query tool used daily by the analytics and finance teams."
      ]
    }
  ],

  /* --------------------------------------------------------------------
     6. EDUCATION
     ------------------------------------------------------------------ */
  education: [
    {
      period: "2024 — present",
      degree: "PhD in Computer Science",
      org: "Technische Universität Berlin",
      detail: "Thesis: efficiency and reproducibility in distributed training."
    },
    {
      period: "2018 — 2020",
      degree: "MSc in Computer Science and Engineering",
      org: "Politecnico di Milano",
      detail: "Graduated with honours."
    },
    {
      period: "2015 — 2018",
      degree: "BSc in Computer Engineering",
      org: "Università di Bologna",
      detail: ""
    }
  ],

  /* --------------------------------------------------------------------
     7. CONTACT
     ------------------------------------------------------------------ */
  contact: {
    intro: "The fastest way to reach me is email. I read everything, and I answer most of it.",
    links: [
      { label: "Email",    value: "you@example.com",        url: "mailto:you@example.com" },
      { label: "GitHub",   value: "github.com/sabella",     url: "https://github.com/sabella" },
      { label: "LinkedIn", value: "linkedin.com/in/sabella", url: "https://linkedin.com/in/sabella" },
      { label: "Scholar",  value: "Google Scholar",         url: "https://scholar.google.com/" }
    ]
  },

  /* --------------------------------------------------------------------
     8. FOOTER
     ------------------------------------------------------------------ */
  footer: "© 2026 Marco Sabella · Built with plain HTML, CSS and JavaScript."

};
