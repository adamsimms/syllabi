# File Formats & Sizing — Reference Sheet

[Index](README.md) · [Run-of-show](run-of-show.md) · [Slides](slide-outline.md) · [Sitemap](sitemap-worksheet.md) · [Checklist](content-checklist.md) · **File formats** · [IG grid](instagram-grid-template.md)

For students trained on large print TIFFs. The one big shift: **print thinks in inches + DPI; the web thinks in pixels only.**

## The print → web shift

| | Print (what they know) | Web (what to teach) |
|---|---|---|
| Unit | inches + **DPI/PPI** (300) | **pixels**, full stop |
| Format | TIFF / PSD (lossless, huge) | JPEG / WebP / PNG (compressed) |
| Color | Adobe RGB / ProPhoto, CMYK | **sRGB** only |
| Bit depth | 16-bit | **8-bit** |
| Goal | maximum data for the printer | smallest file that still looks great |

- **The "72 dpi" myth:** on screen, DPI metadata is ignored. A 2400-pixel-wide image is 2400 px whether tagged 72 or 300 dpi. Only **pixel dimensions** matter.
- **Always convert to sRGB** — Adobe RGB / ProPhoto files look dull in browsers. Photoshop: `Edit → Convert to Profile → sRGB`.

## Image dimensions (longest edge)

| Use | Longest edge | Why |
|---|---|---|
| Full-bleed hero / full-screen | **2400–2560 px** | Covers most laptops + retina crispness |
| Standard in-page image | 1600–2000 px | Sharp without bloat |
| Grid / thumbnail | 600–1000 px | Small slots don't need more |
| Practical ceiling | ~2560–3000 px | Beyond this is wasted bytes on nearly all screens |

- **2400 px is a great default** for full-bleed — no need to chase 2500/2560; the difference is imperceptible. Pick one number and be consistent.
- **Why so big for a small slot? Retina.** High-density displays pack ~2× the pixels, so an image shown in a 1000 px column should be ~2000 px to look crisp.
- **File-size targets:** under ~300–500 KB per image (heroes up to ~800 KB–1 MB). Page weight is the real budget.

## Image formats

| Format | Use for | Notes |
|---|---|---|
| **JPEG** | Photographs | Quality **70–80** ≈ indistinguishable from 100. The default. |
| **WebP** | Photos *and* graphics | ~25–35% smaller than JPEG; supports transparency + animation. **Best default in 2026.** |
| **AVIF** | Photos | Even smaller/better than WebP; broadly supported now. Cutting edge. |
| **PNG** | Logos, text, line art, **transparency** | Lossless; **not** for photos (huge). |
| **SVG** | Icons, logos, diagrams | Vector — infinitely scalable, tiny. Not for photos. |
| **TIFF / PSD** | ❌ never on the web | Keep as archive/print source only. |
| **GIF** | ❌ avoid for motion | Use MP4/WebM or animated WebP instead. |
| **HEIC** (iPhone) | Convert first | Inconsistent browser support → export to JPEG/WebP. |

## Export workflow (you already have the TIFF)

```
Keep your TIFF/PSD as the archival source, then export a WEB copy:
1. Flatten
2. Convert to Profile → sRGB
3. Image Size → set longest edge (e.g. 2400 px), 8-bit
4. Export As → JPEG (q ~75) or WebP
5. Name it: lastname_project-title_01.jpg   (lowercase, hyphens, no spaces)
```

**Let the platform help:** most builders auto-generate responsive sizes. Upload one good ~2400 px sRGB image and let the builder downscale — **do not upload the 200 MB TIFF.** (Behaviour varies by platform — see "How Cargo handles images & video" below.)

## How Cargo handles images & video

Verified against [Cargo 3 docs](https://docs.cargo.site/images) + [support guide](https://support.cargocollective.com/Image-formatting-guide):

- **Accepted image uploads:** JPEG, PNG, GIF, SVG. **WebP and AVIF are NOT accepted** on Cargo.
- **Accepted video uploads:** MP4, MOV, WebM up to 25 MB inline; up to 250 MB via the File Library.
- **Limits:** 25 MB per image (Cargo 3); max **4096 px** in any direction (larger is scaled down).
- **What Cargo generates:** a standard + a **2× hi-res (retina)** version; the **original** is used for Lightbox/Fullscreen zoom.
- **Compression:** Cargo does **not** aggressively recompress — **compress before uploading.**
- **What it serves:** your uploaded format, resized. **No documented WebP/AVIF conversion**, so modern formats give no automatic benefit on Cargo.

**Recommended export for Cargo:** sRGB **JPEG**, **~2400 px** longest edge, quality **~75**, well under 25 MB. Use PNG only for transparency/graphics. Teach WebP/AVIF as general web knowledge, but note Cargo won't accept them.

## Platform image handling — quick comparison

Same files behave differently depending on the builder (verified 2026):

| | **Cargo** | **Squarespace 7.1** | **Webflow** |
|---|---|---|---|
| Accepts | JPEG, PNG, GIF, SVG | JPG, PNG, GIF, WebP | JPG, PNG, SVG, WebP, GIF |
| Auto WebP? | ❌ serves as uploaded | ✅ auto-converts JPEG/PNG → WebP | ❌ (manual convert tool) |
| AVIF? | ❌ | ❌ (not supported) | ✅ *manual* convert in Assets panel |
| Responsive variants | standard + 2× retina | up to 7 variants (`srcset`) | up to 7 variants (`srcset`), inline only |
| Resizes your source? | scales to default width | ❌ largest variant = your upload | up to 3200 px, no bigger |
| Upload limit | 25 MB / 4096 px | 20 MB | **4 MB** |
| **Best upload** | sRGB JPEG ~2400 px, pre-compressed | sRGB JPEG/PNG, cap source ~1920 px | optimize first, ≤3200 px, then convert to WebP/AVIF |

**The lesson for students:** the platform decides how much it helps. **Squarespace** does the most automatically (WebP + resizing variants). **Webflow** gives the most control (WebP *and* AVIF) but demands small, pre-optimized files (4 MB cap). **Cargo** does the least format work — so on Cargo, *you* are responsible for compressing a good JPEG. In all three, **cap your source dimensions and compress before uploading** — that's the biggest lever regardless of platform.

## Saving WebP & AVIF

- **WebP — native in Photoshop** (since v23.2, 2022): `File → Save a Copy…` or **Export As** → pick **WebP**. No plugin.
- **AVIF — no native Photoshop export** (as of 2026). Use **[Squoosh.app](https://squoosh.app)** (free, browser-based, by Google): drag in an image, choose AVIF/WebP, compare quality vs. file size live, download. Great teaching tool.
- **Easiest path for most students:** export a good JPEG/WebP and let the site platform auto-serve AVIF/WebP. Hand-exporting AVIF is only for total control.

## Video

The rule flips: **compress reasonably, then host on Vimeo/YouTube and embed** — don't self-host big files.

| Setting | Recommendation |
|---|---|
| Container / codec | **MP4 / H.264** (universal); WebM (VP9/AV1) as a modern alt |
| Resolution | **1080p (1920×1080)** sweet spot; 720p for small embeds; 4K rarely needed, very heavy |
| Frame rate | Keep source (24–30 fps typical) |
| Audio | AAC |
| Bitrate | On Vimeo/YouTube, upload a **high-quality export** and let them transcode to adaptive streaming |

**Two paths:**

1. **Main works / anything longer than a few seconds → embed from a host.**
   - **Vimeo** — artist-friendly: clean player, no ads/recommendations, password + privacy, and you can **replace the file without changing the link**. Best for portfolios.
   - **YouTube** — reach, search/SEO, free.
   - Benefits: adaptive streaming, zero bandwidth cost to your site, no load-time hit.
2. **Short ambient/background loops → a small self-hosted MP4/WebM.**
   - Keep it short (a few seconds–30 s) and small (a few MB).
   - Set `muted loop autoplay playsinline`. Always prefer this over a GIF.

**Always:** add **captions/subtitles** (many watch muted), pick a strong **poster/still frame**, and preserve native aspect ratio (16:9 typical, 9:16 for social).
