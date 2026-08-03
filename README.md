# Personal page

A single-page personal site for GitHub Pages. No build step, no dependencies —
open `index.html` in a browser and it works.

## Files

```
.
├── index.html              page skeleton (rarely needs editing)
├── css/
│   └── style.css           all styling; tokens at the top control the look
├── js/
│   ├── config.js           ← ALL YOUR CONTENT LIVES HERE
│   └── main.js             builds the page from config.js
└── assets/
    ├── img/                photos (profile picture goes here)
    └── pdf/                preprints, CV, posters
```

## Adding content

Open `js/config.js`. Everything is in one object, split into numbered blocks:

| Block | What it controls |
|---|---|
| 1. profile | Name, tagline, photo, tab title |
| 2. sections | Which sections exist, their header labels, and their order |
| 3. home | Intro paragraphs, buttons, quick facts |
| 4. publications | Papers and their link buttons |
| 5. experience | Industry roles |
| 6. education | Degrees |
| 7. contact | Contact rows |
| 8. footer | Footer line |

Two rules: every item ends with a comma except the last one in a list, and text
goes inside quotes.

### Profile photo

1. Put your image in `assets/img/` (square, around 800×800, works best).
2. In `config.js`, set `profile.photo` to `"assets/img/your-file.jpg"`.

### Adding a publication with a PrePrint button

1. Put the PDF in `assets/pdf/`.
2. Add an entry to the `publications` list:

```js
{
  year: "2026",
  title: "Your paper title",
  authors: "M. Sabella, A. Coauthor",
  venue: "Conference or journal name",
  links: [
    { label: "PrePrint", url: "assets/pdf/your-paper.pdf" },
    { label: "Code",     url: "https://github.com/you/repo" }
  ]
}
```

The **first** link in the list is drawn as a filled button, so keep `PrePrint`
first if you want it to be the prominent one. Any number of extra buttons
(DOI, Slides, Poster, Video) can follow. An external URL works in place of a
local file.

### Hiding a section

In `sections`, set `enabled: false`. The header link disappears along with it.

### Renaming a header link

Change the `label` in `sections`. Leave `id` alone — it is what the link
scrolls to.

## Changing the look

Open `css/style.css` and edit the tokens in the `:root` block at the top:
colours, fonts, header height, page width. Dark theme values are in the
`[data-theme="dark"]` block right below.

Fonts are loaded from Google Fonts in `index.html`. To swap them, change the
`<link>` there and the `--font-*` tokens.

## Publishing

1. Push these files to the root of your `username.github.io` repository.
2. In the repository: **Settings → Pages → Source → Deploy from a branch**,
   branch `main`, folder `/ (root)`.
3. The site appears at `https://username.github.io` within a few minutes.

Leave the **Custom domain** field empty unless you own a domain.
