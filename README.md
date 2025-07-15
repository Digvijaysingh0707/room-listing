# Hotel Room Listing UI

A modern, high-performance hotel room listing web app built with React and Vite. This project features a beautiful, responsive UI for browsing hotel rooms and their variants, with smooth infinite scroll and virtualization for large datasets.

## Features

- **Virtualized Infinite Scroll:** Efficiently renders thousands of rooms using `react-window` for smooth performance.
- **Modern, Responsive UI:** Clean card layouts, image/video carousels, and horizontal variant cards inspired by premium travel apps.
- **Room & Variant Grouping:** Each room displays all its available variants (e.g., Room Only, Breakfast, Half Board) as horizontally scrollable cards.
- **Image & Video Support:** Rooms can display both images and videos, with videos prioritized and autoplayed when visible.
- **Error Boundary:** Friendly error handling with a custom error card and reload option.
- **Customizable & Modular:** Well-structured components for easy extension and theming.

## Getting Started

### Prerequisites
- Node.js (v16+ recommended)
- npm or yarn

### Installation
```bash
npm install
# or
yarn install
```

### Running the App
```bash
npm run dev
# or
yarn dev
```
Visit [http://localhost:5173](http://localhost:5173) in your browser.

### Building for Production
```bash
npm run build
# or
yarn build
```

## Folder Structure
```
src/
  components/
    RoomList.jsx         # Virtualized, infinite-scrolling room list
    RoomContainer.jsx    # Room card with carousel and info
    RoomCarousel.jsx     # Image/video carousel for each room
    VariantList.jsx      # Horizontal row of variant cards
    VariantCard.jsx      # Individual variant card (Room Only, Breakfast, etc.)
    Loader/              # Loader components
    ErrorBoundary.jsx    # Error boundary with custom UI
  data/
    data.json          # Large sample data for rooms/variants
  App.jsx
  main.jsx
```
