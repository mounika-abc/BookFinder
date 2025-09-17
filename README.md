# 📚 Book Finder App

A modern online bookstore-style web application designed for college students to search for books, save favorites, and share book details. The app emphasizes ease of use, visual appeal, and real-world bookstore functionality.

This app is built using React and Tailwind CSS, fetching book data from the Open Library API, and allows users to share books via the Web Share API. Favorites are saved locally so they persist between page reloads.

User Persona: Alex, a college student who wants to quickly search for books, save favorites, and share interesting titles with friends.

## Features

- Search books by title using the Open Library API
- Favorites section to save books for later
- Share books using Web Share API (works on supported browsers)
- Responsive design for desktop and mobile devices
- Clean, modern UI similar to real online bookstores
- Smooth animations for titles and card hover effects
- Works offline for favorites using local storage

## Screenshots

*(Place screenshots in a `screenshots/` folder)*

Search Page – Centered search input with animated title and subtitle

![Search Page](screenshots/search-page.png)

Results Page – Grid layout with book cards, favorites, and share buttons

![Results Page](screenshots/results-page.png)

## Live Demo

You can view and test the application online:  

[🔗 Live Demo on CodeSandbox](https://codesandbox.io/p/sandbox/tz6smy)

## Technologies Used

- React – frontend framework
- Tailwind CSS – styling and layout
- Open Library API – fetch book data
- Web Share API – share functionality
- Local Storage – saving favorites

## Installation and Running the App

To install dependencies and run the app, follow these steps:

1. Clone the repository:  

git clone <your-repo-link>
cd book-finder-app

2.Install all dependencies and start the application (React, Tailwind CSS, etc.):
```bash
npm install
npm start
```
All dependencies are included in package.json, so installing via npm install will automatically include React, Tailwind CSS, and other required packages.

###Usage

--Enter the book name in the search bar on the home page.

--Click Search to see results on the results page.

--Click the star button to add/remove favorites.

--Click the Share button to share book details via supported devices/browsers.

###Folder Structure

```bash

book-finder-app/
├─ public/
├─ src/
│  ├─ App.tsx         # Main app component
│  ├─ index.tsx       # Entry point
│  ├─ index.css       # Tailwind + custom CSS
├─ screenshots/
│  ├─ search-page.png
│  ├─ results-page.png
├─ package.json       # All dependencies listed here
├─ README.md
```


Notes: Favorites are stored in local storage so they persist between reloads. Share functionality uses Web Share API, which may not work on older browsers. The app is fully responsive and works on desktop and mobile devices.

Future Improvements: Add pagination for search results, filtering by author or subject, enhance UI/UX with animations, add user authentication for saving favorites across devices, integrate detailed book information pages with reviews



---

✅ This is **your final, complete README** with the **correct live demo URL** included.  

If you want, I can also **add a “Setup Tailwind CSS” note** in case HR or a reviewer wants to run it from scratch.  

Do you want me to do that?


