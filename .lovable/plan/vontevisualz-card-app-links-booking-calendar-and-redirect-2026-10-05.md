# VonteVisualz card, app links, booking calendar, and redirect

## What will be built

- Add a dedicated `/card` business-card page matching the existing dark cinematic footer style, with the approved phone, email, canonical website, social links, QR code, and downloadable contact.
- Make the App section mockup and both Coming Soon platform controls open `https://vontevisualz.com` while keeping the Coming Soon wording and avoiding fake store links.
- Upgrade the homepage booking request into a service-aware calendar:
  - choose InkNior, Onyx Blvck, or FastCutEdits;
  - choose one of that business’s approved services;
  - choose a future date with the site’s styled calendar;
  - choose an hourly time from 10:00 AM through 8:00 PM;
  - submit the request to the existing private inbox, still marked as awaiting review rather than confirmed.
- Show service, requested date, and requested time on every booking inbox item.
- Add `/vontevisualz.com` as a permanent redirect to `https://vontevisualz.com`.
- Update the VonteVisualz Empire agent entry so assistants know the canonical website, card page, app destination, and new booking service/date/time fields.

## Data and compatibility

- Add nullable `service` and `preferred_time` fields to the existing private booking table so old requests remain valid.
- Keep direct messages working without requiring service, date, or time.
- Keep existing ownership protections: signed-in visitors can only submit and view their own requests.
- Preserve the current site layout, branding, media, pricing, and external social destinations.

## Verification

- Apply the database migration and regenerate the agent manifest.
- Verify the card page, redirect, app links, booking submission, and inbox display in the running site.
- Check desktop and mobile layouts, links, console/runtime errors, and the final build status.
