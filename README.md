# Image Editor

A browser-based image editor built with HTML, CSS, and JavaScript using the Canvas API.

## Features

- Upload any image and edit it in real-time
- 9 adjustable filters with sliders
- 18 preset filters
- Download edited image as PNG
- Reset all filters to default
- Mobile responsive with tab UI

## Filters

| Filter | Range | Default |
|---|---|---|
| Brightness | 0 - 200% | 100% |
| Contrast | 0 - 200% | 100% |
| Saturation | 0 - 200% | 100% |
| Hue Rotation | 0 - 360deg | 0deg |
| Blur | 0 - 20px | 0px |
| Grayscale | 0 - 100% | 0% |
| Sepia | 0 - 100% | 0% |
| Opacity | 0 - 100% | 100% |
| Invert | 0 - 100% | 0% |

## Presets

drama, vintage, oldSchool, noir, dreamy, cyberpunk, sunset, arctic, horror, softGlow, golden, neon, forest, ocean, faded, thermal, moonlight, pastel

## How to Use

1. Click **Choose Image** to upload an image
2. Adjust sliders to apply filters
3. Click a preset to apply a preset filter
4. Click **Reset** to reset all filters
5. Click **Download** to save the edited image as PNG

## Tech Stack

- HTML
- CSS
- JavaScript
- Canvas API

## Project Structure
├── index.html

├── style.css

├── theme.css

└── script.js

## Performance

- `requestAnimationFrame` used to optimize canvas rendering on mobile
- Image resized to max `1000x1000` on upload to improve performance
