# Lokesh Rawat — Portfolio

Portfolio of Lokesh Rawat, a 3D artist in Hyderabad. It covers 2 years of in-house product animation and renders at Keus, plus personal work with Gaussian splatting, Unreal Engine and AI.

**Live site:** https://blueend07.github.io/portfolio/

## What's on the site

| Section | What it shows |
| --- | --- |
| **Work** | The Keus case study (consoles, wireless, spaces) and personal projects: JungleCat, Blender Pills, Pixel-Art Game House, Stylized Car Animation |
| **Lab** | Gaussian splats you can explore in 3D (Night Ride, Keus Office, Zoro Plush), plus the hidden "NSFC" page of AI experiments |
| **Renders** | Personal render studies. Each one opens its own project page |
| **About / Contact** | A short bio and how to get in touch |

## How it's built

It's a plain static site: HTML, CSS and a little JavaScript, with no framework and no build step. GitHub Pages serves it straight from the `main` branch.

```
index.html                  homepage (Work, Lab, Renders, About, Contact)
projects/
  keus.html                 Keus case study (consoles · wireless · spaces)
  splats.html               all Gaussian splats on one page
  night-ride-splat.html     Night Ride behind the scenes
  not-safe-for-creatives.html   AI experiments (NSFC)
  <id>.html                 one page per render / ArtStation project
assets/
  case.css                  shared styles for project pages
  motion.js                 lazy-loads and plays looping videos
  lightbox.js               click-to-zoom for images
  work/   lab/   nsfc/   artstation/   images and videos
```

## Viewing it locally

Open `index.html` in a browser. You don't need a server.

## Adding things

Most homepage content comes from short lists at the bottom of `index.html`.

- **A personal render:** add a line to `RENDERS`, e.g. `{img:"assets/artstation/ID_0.jpg", title:"Name"}`, and create a matching `projects/ID.html`.
- **A Lab card:** add a line to `LAB`. A card with `link:` is fully clickable and opens that page.
- **A new splat:** publish it in SuperSplat. The scene page is `https://superspl.at/scene/XXXX` and the embed is `https://superspl.at/s?id=XXXX`. Copy one of the sections in `projects/splats.html`, change the id, and save a poster image in `assets/lab/`.
- **Looping video:** use `<video class="loop" data-src="clip.mp4" poster="clip.jpg" muted loop playsinline preload="none">`. `motion.js` loads it only when it scrolls into view.

### Preparing media

Keep files small so the site stays fast:

```bash
# video: no audio, 1280 wide (720 for portrait), web-friendly
ffmpeg -i in.mp4 -an -vf scale=1280:-2 -c:v libx264 -crf 26 -preset slow -pix_fmt yuv420p -movflags +faststart out.mp4
# poster frame
ffmpeg -ss 2 -i out.mp4 -frames:v 1 -q:v 3 out.jpg
# image
magick in.png -resize 1600x -strip -quality 84 out.jpg
```

## Publishing

Push to `main`. GitHub Pages redeploys in about a minute. Browsers can keep an old copy for up to 10 minutes, so use **Ctrl + Shift + R** to see changes right away.

---

© 2026 Lokesh Rawat. All artwork is my own unless marked otherwise. The AI experiments are on the NSFC page.
