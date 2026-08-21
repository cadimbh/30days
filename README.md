# English Dinner Landing Page

Static HTML/CSS/JS landing page prepared for GitHub + Vercel.

## Before publishing

Open `js/config.js` and add:

- `checkoutUrl`: the Cakto checkout created for the English bundle.
- `price`: the exact price shown in that checkout, such as `$9.97`.
- `comparePrice`: optional regular/reference price, such as `$19.97`.

The Meta Pixel is already configured with ID `1559883709101573` and fires PageView, ViewContent and InitiateCheckout.

The PDFs are not stored in this public website folder. Delivery must be configured inside the English Cakto product so buyers receive both PDF files after payment.

## Publishing

Upload the contents of this folder to the root of a new GitHub repository and import that repository into Vercel. No build command or framework is required.

