# Frontend Developer Assignment

Guidelines:

* You may use Javascript or Typescript for implementing the solution. You may use any framework of your choice, like NextJS or ReactJS.  
* Your UI should be demoable.  
* The focus should be on creating a good UI and practicing robust, scalable, and readable code.  
* **Use of AI** or any kind of **plagiarism** is **STRICTLY PROHIBITED,** if detected by our systems, your Application will be rejected automatically.  
* The requirements are divided into two sections:  
* **Mandatory Section**: You must complete **ALL** mandatory requirements to qualify.  
* **Bonus Section**: Attempt the bonus requirements **only after completing the mandatory section**. Bonus features will earn you extra points and provide an edge over other candidates.

## **Assignment: Build a "Pokedex Lite" Web App**

### **Goal**

Create a simple web application that allows users to:

* **List** Pokémon fetched from a public API (e.g., [PokéAPI](https://pokeapi.co/)).  
* Note \- You can refer to its docs here- [Poke Docs](https://pokeapi.co/docs/v2)  
* **Search** for Pokémon by name.  
* **Filter** Pokémon by type.  
* **Paginate** through the list of Pokémon.  
* **Mark favorites** and persist them.  
* **View** a Pokémon’s details in a separate view or modal.  
* Ensure the UI is **fully responsive** (mobile, tablet, desktop).

---

## **Required Features**

1. **Data Fetching**  
   * Use the [PokéAPI](https://pokeapi.co/) to retrieve a list of Pokémon.  
   * Handle loading and error states gracefully (e.g., show a loading spinner or an error message).  
2. **Listing & Basic UI**  
   * Display Pokémon in a grid or list with the Pokémon’s **name** and **image**.  
   * Must be **responsive** (works well on mobile, tablet, and desktop).  
3. **Search**  
   * Provide a text input for searching Pokémon by name.  
   * Filter the displayed Pokémon as the user types.  
4. **Filtering by Type**  
   * Provide a way to filter Pokémon by their types (e.g., Fire, Water, Grass).  
   * Only display the Pokémon that match the selected type(s).  
5. **Pagination**  
   * Instead of fetching all Pokémon at once, implement pagination (or infinite scrolling).  
   * Include buttons or a mechanism to go to next/previous pages or load more results.  
6. **Favorites**  
   * Allow users to "favorite" certain Pokémon.  
   * Persist these favorites in **local storage** so they remain after a page refresh.  
7. **Detail View**  
   * When a user selects a Pokémon, show a detail view or modal that includes additional data (e.g., stats like HP, attack, abilities).  
   * Allow the user to close the detail view and return to the main list.  
8. **Build & Deployment**  
   * Provide instructions for running the project locally (commands to install dependencies, start the dev server, etc.).  
   * A simple build process is sufficient; a production build or deployment to a service (GitHub Pages, Netlify, Vercel) is optional but welcome.

---

## **Bonus (Optional)**

* **User Authentication (OAuth)**  
  Implement a simple login flow using an OAuth provider (e.g., Google, GitHub). This could be just a separate branch or a minimal proof-of-concept.  
* **Animations**  
  Add subtle animations or transitions when hovering over Pokémon, switching pages, or opening/closing the detail view.  
* **Server-Side Rendering (SSR)**  
  Experiment with a framework that supports SSR (e.g., Next.js) to render pages on the server for faster initial loads and better SEO.

---

## **Deliverables**

1. **Source Code**: A GitHub repository (or any VCS) with the complete codebase.  
2. **Hosted Web URL**: A Hosted website url. You can use free hosting services like vercel.  
3. **README Documentation**:  
   * Instructions for installing dependencies and running the app.  
   * Explanation of technologies/libraries used and why.  
   * Any challenges faced and how they were solved.

## **Submission**

1. Submit your assignment on the Google Form \- [https://forms.gle/PhCxpVxp2TKZwv448](https://forms.gle/PhCxpVxp2TKZwv448)  
2. Remember to keep your github repository Public either from the beginning or after the Assignment deadline.