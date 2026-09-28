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
    name: "Mattia Sabella",              // shown large in the Home section
    shortName: "M. Sabella",               // shown small in the header
    tagline: "",                        // small line above your name; "" hides it
    status: "Currently: PhD Student @ Politecnico di Milano",

    // Your photo. Drop the file in assets/img/ and put its name here.
    // Square images (e.g. 800x800) look best.
    photo: "assets/img/mattia_sabella_profile.svg",
    photoAlt: "Portrait of Mattia Sabella",
    photoCaption: "Milan, 2026",

    // Used for the browser tab and for search engines.
    pageTitle: "Mattia Sabella — Personal Page",
    pageDescription: "Personal page of Mattia Sabella: research, publications and industry experience."
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
    { id: "projects",    label: "Projects",            enabled: true },
    { id: "teaching",    label: "Teaching",            enabled: true },
    { id: "experience",  label: "Industry Experience", enabled: true },
    { id: "education",   label: "Education",           enabled: true },
    { id: "contact",     label: "Contact",             enabled: true }
  ],

  /* --------------------------------------------------------------------
     3. HOME — intro next to your photo, bio blocks below it
     ------------------------------------------------------------------ */
  home: {
    // The bio is split into blocks, each with a small heading. "text" holds
    // one or more paragraphs. The block with highlight: true is drawn
    // inverted so it stands out — use it for the thing you most want read.
    bio: [
      {
        title: "Bio",
        text: [
          "Tech lover since I can remember, sitting in front of a 90s desktop computer 'cracking' games without even knowing what that meant when I was just 5: that was my very first escape from reality.",
          "Accessing an OS and the Internet has always fed my purest form of curiosity, learning, and freedom.",
          "Growing up, I genuinely formed the personal intention of giving back to society through contributions to the field of Computer Science. In particular, when I learned about the actual formalization and replication of a brain's learning mechanism, I was incredibly fascinated, utterly amazed.",          
          "Since then, I've dedicated my time and future efforts in CS research!",
          "Currently, my field of expertise centers on Data-Centric AI: a paradigm where Machine Learning doesn't depend only on model and architectural design, but just as much, if not more, on the preparation and quality of the data being fed into it."
        ]
      },
      {
        title: "Research idea",
        highlight: true,
        text: [
          "The most advanced Machine Learning approaches rely on the idea that low quality data should be cleaned, repaired, and fixed through proper iterative pipelines before the learning or inferential process even begins. What if, instead, we could directly guide the learning or inferential steps through data signals and quality estimation alone? This could reshape how we define machine learning pipelines, making them more efficient, reliable, and explainable!"
          ]
      }
    ],

    // Small buttons under your name. With an "icon" (email, linkedin,
    // github, scholar) the button shows just the icon; without one, the label.
    actions: [
      { label: "Email",    url: "mailto:mattia.sabella@polimi.it",             icon: "email" },
      { label: "LinkedIn", url: "https://www.linkedin.com/in/mattia-sabella",  icon: "linkedin" },
      { label: "GitHub",   url: "https://github.com/Ma7i5ab3",                 icon: "github" },
      { label: "Scholar",  url: "https://scholar.google.com/citations?user=EFL_FeoAAAAJ&hl=it&oi=ao", icon: "scholar" },
      { label: "CV",       url: "assets/pdf/cv.pdf" }
    ],

    // Optional quick facts shown as a small list. Set to [] to hide.
    facts: [
      { key: "Field",    value: "Data-Centric AI, Machine Learning" },
      { key: "Based in", value: "Milan, Italy" },
      { key: "Open to",  value: "Collaborations, Visiting Periods, Internships" }
    ]
  },

  /* --------------------------------------------------------------------
     4. PUBLICATIONS

     "links" draws the buttons under each paper. The FIRST link is drawn
     filled (the prominent one), the rest are outlined — so keep PrePrint
     first if you want it to stand out.

     For a PrePrint PDF: put the file in assets/pdf/ and use the path,
     e.g. "assets/pdf/my-paper.pdf". An external URL works too.

     "abstract" is shown behind a small "Abstract" toggle under the venue.
     Leave it empty ("") to hide the toggle.
     ------------------------------------------------------------------ */

  // Your own name as it appears in author lists. It gets highlighted
  // automatically so readers can spot you at a glance.
  highlightAuthor: "M. Sabella",

  publications: [
    {
      year: "2026",
      title: "Safety-Aware Aggregation for Federated Fine-Tuning of LLMs",
      authors: "M. Sabella, L. Lei, C. Cappiello",
      venue: "3rd International Workshop on AI-for-Good: AI for a Better Society (AI4Good 2026) @ International Conference on Web Information Systems Engineering (WISE 2026)",
      note: "Oral presentation",        // optional, remove the line to hide
      abstract: "The rapid democratization of Large Language Models (LLMs) has amplified a dual-use dilemma: the same capabilities that let these models advance legitimate science also let them generate unsafe content in domains such as biosecurity and chemistry. At the same time, the demand for privacy-preserving training has driven the adoption of Federated Learning (FL), in which a central server aggregates client updates but never sees the raw local data. This privacy guarantee disables the dominant safety paradigm: server-side inspection and filtering of training data becomes impossible, so a client fine-tuning on hazardous data can silently raise the hazardous capability of the global model. Our key observation is that, although the server cannot select data, it can still act on a standardized risk signal that each client computes locally and shares without ever exposing and dropping raw samples. The goal of this work is therefore to relocate safety enforcement from the data space into the aggregation space, using this risk signal to properly weight the incoming updates. Building on a Parameter-Efficient Fine-Tuning (PEFT) approach, we evaluate a spectrum of aggregation strategies, including a novel Federated Risk-Aware Projection (RAP-FL). Across three client data distributions, we quantify the trade-off between suppressing hazardous knowledge (WMDP) and preserving general-domain utility (MMLU), and find that RAP-FL gives the most favorable safety-utility balance among the strategies we tested.",
      links: [
        { label: "PrePrint", url: "assets/WISE%202026/_WISE__FedSafe.pdf" },
        { label: "Code",     url: "https://github.com/Ma7i5ab3/FederatedLearning-SafetyforLLMs" },
      ]
    },
    {
      year: "2026",
      title: "QuAIL: Quality-Aware Inertial Learning for Robust Training under Data Corruption",
      authors: "M. Sabella, A. Archetti, P. Pinoli, M. Matteucci, C. Cappiello",
      note: "ArXiv",
      abstract: "Tabular machine learning systems are frequently trained on data affected by non-uniform corruption, including noisy measurements, missing entries, and feature-specific biases. In practice, these defects are often documented only through column-level reliability indicators rather than instance-wise quality annotations, limiting the applicability of many robustness and cleaning techniques. We present QuAIL, a quality-informed training mechanism that incorporates feature reliability priors directly into the learning process. QuAIL augments existing models with a learnable feature-modulation layer whose updates are selectively constrained by a quality-dependent proximal regularizer, thereby inducing controlled adaptation across features of varying trustworthiness. This stabilizes optimization under structured corruption without explicit data repair or sample-level reweighting. Empirical evaluation across 50 classification and regression datasets demonstrates that QuAIL consistently improves average performance over neural baselines under both random and value-dependent corruption, with especially robust behavior in low-data and systematically biased settings. These results suggest that incorporating feature reliability information directly into optimization dynamics is a practical and effective approach for resilient tabular learning.",
      links: [
        { label: "PrePrint", url: "https://arxiv.org/pdf/2602.03686" },
        { label: "Code",     url: "https://github.com/Ma7i5ab3/QuAIL/tree/quail" },
      ]
    },
    {
      year: "2026",
      title: "Learning from Quality, Not for It: Conditioning Models on Explicit Data Quality",
      authors: "M. Sabella",
      venue: "PhD Workshop @ Conference on Very Large Data Bases (VLDB 2026)",
      note: "Oral & Poster Presentation",
      abstract: "The rise of Data-Centric AI has established that the quality of the data a model consumes is as decisive as the choice of model itself, refocusing research onto the systematic engineering of data quality as a primary driver of performance. Yet the dominant response to this reasoning has been to treat quality as a precondition: something diagnosed and repaired through preparation pipelines before any learning takes place, or at best inferred implicitly from a model's own training dynamics. This work questions whether explicit, measurable quality information can instead become a first class entry to the learning process itself, so that a model is conditioned to trust reliable data and discount unreliable data as it learns. We pursue this idea across three connected fronts: designing models that consume quality metadata directly within their optimization; bringing quality awareness into Federated Learning, where data are decentralized, heterogeneous, and unevenly curated and where no preparation methodology yet exists; and finally clarifying how quality informed learning relates to classical preparation: whether it replaces, complements, or still depends on it. Early results suggest that learning directly from quality is not only feasible but often cheaper and more robust than repairing data first, opening a path toward treating data quality as something a model can reason with rather than a problem to be solved before learning begins.",
      links: [
        { label: "Print", url: "https://vldb.org/2026/Workshops/VLDB-Workshops-2026/PhD/PhD26_13.pdf" },
        { label: "Poster",   url: "assets/PhD%20Workshop%20(VLDB%202026)/poster.png" }
      ]
    },
    {
      year: "2025",
      title: "Eco-Friendly AI: a framework for Data Centric Green Federated Learning",
      authors: "M. Sabella, M. Vitali",
      venue: "2nd Workshop on Green-Aware Artificial Intelligence @ European Conference on Artificial Intelligence (ECAI 2025)",
      note: "Oral Presentation",
      abstract: "The environmental cost of deep learning is increasingly significant, prompting a shift from performance-driven ``Red AI'' to sustainability-focused ``Green AI''. In this paper, we propose a data-centric framework for environmentally sustainable Federated Learning (FL), focused on optimising data quality and node selection to minimise carbon emissions without compromising model performance. Central to our approach is an interactive FL Configuration Selection System, which, given dataset and infrastructure characteristics, assists researchers in configuring greener FL training workflows. Our system integrates data quality metrics and carbon footprint estimates to select environmentally optimal nodes and applies intelligent data reduction through three strategies: Node Selection, Minimal Smart Reduction, and Smart Reduction. We demonstrate the effectiveness of our tool in the context of time series classification, offering a practical solution for sustainable FL research.",
      links: [
        { label: "Print", url: "https://ceur-ws.org/Vol-4165/paper7.pdf" },
        { label: "Code", url: "https://github.com/POLIMIGreenISE/ecoFL"}
      ]
    }
  ],

  /* --------------------------------------------------------------------
     5. PROJECTS

     Drawn as a grid of small cards. Keep "description" to one or two
     sentences. "logo", "tags" and "links" are optional; the logo sits
     centred above the description (files in assets/img/logos/).
     ------------------------------------------------------------------ */
  projects: [
    {
      title: "",
      logo: "assets/img/logos/better.png",
      description: "European initiative building a federated, privacy-preserving infrastructure for health data analytics, based on the Personal Health Train paradigm. My focus is integrating genomic and phenotypic data from paediatric intellectual disability cohorts to reclassify variants of unknown significance (VUS) through federated, cross-institutional analysis.",
      tags: ["Data Quality", "Federated Learning", "Genomics", "Data Science"],
      links: [
        { label: "Link", url: "https://www.better-health-project.eu" }
      ]
    },
    {
      title: "",
      logo: "assets/img/logos/unica.png",
      description: "EU4Health-funded project extending the European Cancer Imaging Initiative (EUCAIM) through a federated network of oncological imaging data for breast, lung and prostate cancer. Using federated learning, hospitals across Europe can train and validate AI models without sharing sensitive patient data, in full compliance with GDPR.",
      tags: ["Data Quality", "Federated Learning", "Cancer"],
      links: [
        { label: "Link", url: "https://www.unica-project.eu" }
      ]
    },
  ],

  /* --------------------------------------------------------------------
     6. TEACHING

     One compact row per course. "level" and "hours" become small tags on
     the right; "points" are joined into a single line. "points" and
     "links" are optional: remove the lines to hide them.
     ------------------------------------------------------------------ */
  teaching: [
    {
      period: "2026 — 2027",
      course: "Data and Information Quality",
      role: "Teaching Assistant",
      org: "Politecnico di Milano",
      level: "MSc",
      hours: 20,
      points: [
        "Practice on writing data cleaning algorithm with Python libraries",
        "Exercise sessions & Project Development"
      ]
    },
    {
      period: "2026 — 2027",
      course: "Pandas & Data Manipulation",
      role: "Professor",
      org: "Albert School",
      level: "MSc",
      hours: 25,
      points: [
        "Theory & Practice on writing data management pipelines with Python libraries",
        "Theory, Exercise sessions, Project Development & Exams evaluation"
      ]
    },
    {
      period: "2025 — 2026",
      course: "Tecnologie Digitali",
      role: "Teaching Assistant",
      org: "Politecnico di Milano",
      level: "BSc",
      hours: 20,
      points: [
        "Practice on design and query of SQL Relation Databases",
        "Exercise sessions"
      ]
    },
    {
      period: "2025 — 2026",
      course: "Fondamenti di Informatica",
      role: "Tutor",
      org: "Politecnico di Milano",
      level: "BSc",
      hours: 16,
      points: [
        "Practice on writing data managment algorithms and programming basics in Python",
        "Exercise sessions"
      ]
    },
    {
      period: "2025 — 2026",
      course: "Information Systems",
      role: "Teaching Assistant",
      org: "Politecnico di Milano",
      level: "BSc",
      hours: 10,
      points: [
        "Practice on development and design of information systems (Archimate)",
        "Exercise sessions"
      ]
    }
  ],

  /* --------------------------------------------------------------------
     7. INDUSTRY EXPERIENCE

     "logo" (optional) is drawn on the right of each entry, in grey; it
     takes its colour on hover. Put the file in assets/img/logos/.
     ------------------------------------------------------------------ */
  experience: [
    {
      period: "Jan 2024 — May 2025",
      role: "Junior Data Science Consultant",
      org: "Accenture",
      place: "Milan, Italy",
      logo: "assets/img/logos/accenture.svg",
      // A <strong> title at the start of a point is shown on its own line.
      points: [
        "<strong>AI Virtual Assistant for Banking Operations</strong> Built a generative-AI chatbot to streamline client management for an Italian banking group. At its core, a multi-agent system pairs a Retrieval-Augmented Generation (RAG) pipeline, which extracts insights from a knowledge base of client financial statements, with an SQL agent that turns natural-language questions into Azure SQL queries. The result: higher employee productivity and operational efficiency, and wider adoption of generative-AI tools in the banking sector.",
        "<strong>Automated Data Extraction for Loan Approval</strong> Replaced slow, manual extraction of customer data in the loan deliberation process with an AI-powered Named Entity Recognition (NER) pipeline. It reads multiple document formats and extracts over 100 distinct entities, reaching 97% accuracy on the monthly volume of applications and speeding up loan approvals.",
        "<strong>Evaluation of Large Language Model Applications</strong> Ran tests and compared evaluation metrics to assess LLMs across translation, summarization, arithmetic reasoning, text-to-SQL, Named Entity Recognition and fairness. Turned the results into data-driven insights that guided the Data Science team's choice of models."
      ]
    }
  ],

  /* --------------------------------------------------------------------
     8. EDUCATION — "logo" works as in Industry Experience
     ------------------------------------------------------------------ */
  education: [
    {
      period: "2025 — present",
      degree: "PhD in Computer Science",
      org: "Politecnico di Milano",
      logo: "assets/img/logos/polimi.svg",
    },
    {
      period: "2020 — 2023",
      degree: "MSc in Computer Science and Engineering",
      org: "Politecnico di Milano",
      logo: "assets/img/logos/polimi.svg",
    },
    {
      period: "2016 — 2019",
      degree: "BSc in Computer Engineering",
      org: "Università degli Studi di Catania",
      logo: "assets/img/logos/unict.svg",
    }
  ],

  /* --------------------------------------------------------------------
     9. CONTACT
     ------------------------------------------------------------------ */
  contact: {
    intro: "The fastest way to reach me is email. I read everything!",
    links: [
      { label: "Email",    icon: "email",    url: "mailto:mattia.sabella@polimi.it" },
      { label: "GitHub",   icon: "github",   url: "https://github.com/Ma7i5ab3" },
      { label: "LinkedIn", icon: "linkedin", url: "https://www.linkedin.com/in/mattia-sabella" },
      { label: "Scholar",  icon: "scholar",  url: "https://scholar.google.com/citations?user=EFL_FeoAAAAJ&hl=it&oi=ao" }
    ]
  },

  /* --------------------------------------------------------------------
     10. FOOTER
     ------------------------------------------------------------------ */
  footer: "© 2026 Mattia Sabella · Built with plain HTML, CSS and JavaScript."

};
