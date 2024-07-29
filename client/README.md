# Quickeo

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
To use this template, follow these steps:

1. Clone the repository to your local machine:
    ```
    git clone https://github.com/your-username/your-repo.git
    ```

2. Navigate to the project directory:
    ```
    cd your-repo
    ```

3. Install the dependencies:
    ```
    npm install
    ```

4. Choose the plugin you want to use for Fast Refresh:

    - If you prefer using Babel, install the `@vitejs/plugin-react`:
      ```
      npm install @vitejs/plugin-react --save-dev
      ```

    - If you prefer using SWC, install the `@vitejs/plugin-react-swc`:
      ```
      npm install @vitejs/plugin-react-swc --save-dev
      ```

5. Configure the plugin in your `vite.config.js` file:

    - For `@vitejs/plugin-react`:
      ```javascript
      import react from '@vitejs/plugin-react';

      export default {
         plugins: [react()],
      };
      ```

    - For `@vitejs/plugin-react-swc`:
      ```javascript
      import react from '@vitejs/plugin-react-swc';

      export default {
         plugins: [react()],
      };
      ```

6. Start the development server:
    ```
    npm run dev
    ```

7. Open your browser and navigate to `http://localhost:3000` to see your React app in action.

Feel free to customize the template and add your own components and styles. Happy coding!

