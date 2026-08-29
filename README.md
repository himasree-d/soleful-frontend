# Soleful Store (Frontend)

Soleful is a premium, minimalist sneaker store built with React and Vite. It features a curated UI utilizing a warm color palette (cream, sage, terracotta, ink) and modern typography (Fraunces and DM Sans) to create a high-end shopping experience.

## Features
- **Hover-Cycle Gallery**: Seamlessly cycle through multiple angles of a sneaker by hovering over product cards.
- **Lightbox**: View high-resolution imagery in a full-screen, zoomable modal on product pages.
- **Cart & Checkout**: Real-time cart management with quantity adjustments.
- **Authentication**: JWT-based login and registration.
- **Admin Dashboard**: Manage and review all store orders, complete with item thumbnails and Accept/Reject status controls.
- **Responsive**: Fully responsive design for mobile, tablet, and desktop.

## Tech Stack
- React 18
- Vite
- React Router DOM
- Tailwind CSS v4
- Axios
- Lucide React (Icons)

## Environment Setup
The frontend relies on a separate Laravel API backend. By default, it connects to a production backend. To change this, update `src/api.js`.

## Running Locally

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Open `http://localhost:5173` in your browser.

## Deployment
This project is configured to be deployed easily on [Vercel](https://vercel.com).
The `vercel.json` file is included to ensure that React Router works correctly (preventing 404 errors on page reloads).
