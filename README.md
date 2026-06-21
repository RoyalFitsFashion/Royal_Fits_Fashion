# Royal Fits — Luxury African Fashion

A static website for Royal Fits, a custom tailoring business based in Akatsi, Ghana.

## Structure

```
.
├── index.html      Main site (home, about, services, gallery, booking, shop, cart, reviews, contact)
├── admin.html      Simple admin page to clear stored reviews/cart data
├── style.css       All styling
├── script.js       Site logic: nav toggle, fade-in animations, gallery slider,
│                   WhatsApp booking, shopping cart, and reviews (all via localStorage)
└── README.md
```

## How it works

- **Booking** and **checkout** open WhatsApp (`wa.me`) with a pre-filled message — no backend required.
- **Cart** and **Reviews** are stored in the visitor's browser via `localStorage`. This means data is local to each device/browser and is not shared between visitors or synced anywhere. For a real shared cart/review system you'd need a backend (e.g. Firebase, Supabase, or a small API).
- **admin.html** lets you wipe locally stored reviews/cart data from whichever browser you open it in. It does not affect other visitors' data, since storage is per-browser.

## Publishing on GitHub Pages

1. Create a new GitHub repository (e.g. `royal-fits`).
2. Upload these files to the **root** of the repository (or to a `/docs` folder — see step 4).
3. Commit and push.
4. In the repo, go to **Settings → Pages**.
5. Under "Build and deployment", set **Source** to "Deploy from a branch".
6. Choose the branch (usually `main`) and the folder (`/ (root)`).
7. Save. GitHub will give you a URL like:
   `https://<your-username>.github.io/royal-fits/`
8. Wait 1–2 minutes for the first deploy, then visit the URL.

## Before going live — replace placeholders

- Swap all `https://via.placeholder.com/...` image URLs in `index.html` for real photos of your work.
- Update the WhatsApp number in `script.js` (`WHATSAPP_NUMBER`) if it changes.
- Update contact details in the Contact section of `index.html`.

## Notes on `admin.html`

This page is not protected by any login — anyone who finds the URL can use it. Since it only clears *their own browser's* local data, the risk is limited, but if you want a real admin panel with authentication later, that requires a backend.
