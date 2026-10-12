# Copper Barbeque Website

A responsive restaurant website with a searchable menu, vegetarian and
non-vegetarian filters, a downloadable menu PDF, a restaurant video,
and table and celebration requests through WhatsApp.

Built with HTML, CSS and JavaScript. No application framework, package
installation or build step is required.

## Run locally in VS Code

1. Clone or download this repository.
2. Open the repository folder in VS Code.
3. Open index.html in your browser.

Keep the folder structure intact so images, scripts, the PDF and video load.
After editing a file in VS Code, save it and refresh the browser.

## Features

- 110 dishes across 15 menu categories
- Search by dish or category name
- Vegetarian and non-vegetarian filters
- Downloadable menu PDF
- Restaurant video in a dialog
- Table and celebration request forms
- Phone, WhatsApp, Instagram and directions links
- Responsive layouts and keyboard-accessible controls

## How booking works

The form validates the supplied details and opens WhatsApp with a prepared
message. The visitor must press Send in WhatsApp to deliver the request.

This website does not store reservations, check live availability, collect
payments or automatically confirm bookings. Restaurant staff handle those
steps directly.

## Files and customization

| File or folder | Purpose |
| --- | --- |
| index.html | Page content, navigation and asset links |
| redesign.css | Styling and responsive layouts |
| redesign.js | Menu filters, booking forms, navigation and video controls |
| menu-data.js | Dish names, categories and prices |
| assets/brand/ | Logo and decorative background |
| assets/food/ | Food images |
| assets/restaurant/ | Restaurant photos |
| assets/vendor/lucide.min.js | Bundled third-party icon library |
| output/menu/ | Downloadable menu PDF |
| output/instagram/ | Restaurant video |

To update dishes or prices, edit menu-data.js. Updating that file does not
update the PDF: replace the PDF separately with a matching revised version.

Contact details appear in index.html and redesign.js. Booking fees and
request wording are defined in redesign.js.

Before adapting the website for another business, update the branding,
contact links, location, menu, booking terms, photographs, PDF and video.

## Checks

JavaScript syntax checks passed locally on 12 October 2026:

    node --check redesign.js
    node --check menu-data.js

For a browser check, verify menu search and filters, PDF download, video
playback, both booking tabs and the layout on a narrow screen.
Syntax checks alone do not verify browser behaviour.

## Project scope

This repository contains the website's runtime files. Media-generation
scripts and editing tools from the original working folder are not included.

## Third-party notices

The bundled Lucide v1.8.0 icon library retains its original license header.
Its license notices are provided in [assets/vendor/LICENSE](assets/vendor/LICENSE).
These notices apply to the icon library.

## Author

[Shaikh Umar Faruk](https://github.com/Shaikhumarfaruk)
