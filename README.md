# Inventory Management System

This project is an inventory management application built with React, Firebase, and Material-UI. It allows users to add, remove, and search for items in their inventory.

## Features

- Add new items to the inventory.
- Remove items from the inventory.
- Search and filter items in the inventory.

## Demo

Check out the deployed version of the project [here](https://inventory-management-r1dyit4dq-mustafa-tareks-projects.vercel.app).

## Installation

To run this project locally, follow these steps:

1. **Clone the repository:**

   ```sh
   git clone https://github.com/your-username/inventory-management.git
   cd inventory-management
   ```

2. **Install dependencies:**

   ```sh
   npm install
   ```

3. **Set up Firebase:**

   Create a Firebase project and add your Firebase configuration to a file named `firebase.js` in the `src` directory. Your `firebase.js` should look like this:

   ```js
   // src/firebase.js
   import { initializeApp } from "firebase/app";
   import { getFirestore } from "firebase/firestore";

   const firebaseConfig = {
     apiKey: "YOUR_API_KEY",
     authDomain: "YOUR_AUTH_DOMAIN",
     projectId: "YOUR_PROJECT_ID",
     storageBucket: "YOUR_STORAGE_BUCKET",
     messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
     appId: "YOUR_APP_ID",
   };

   const app = initializeApp(firebaseConfig);
   const firestore = getFirestore(app);

   export { firestore };
   ```

4. **Run the application:**

   ```sh
   npm run dev
   ```

   The application will be available at `http://localhost:3000`.

## Usage

- **Add Item:** Click on the "Add New Item" button, enter the item name in the modal, and click "Add".
- **Remove Item:** Click the "Remove" button next to the item you want to remove.
- **Search Items:** Use the search bar to filter items by name.

## Technologies Used

- React
- Firebase Firestore
- Material-UI
