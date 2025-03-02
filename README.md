# 🌐 Webdows – A Web-Based Windows Reproduction

"Embrace the challenge, evolve with your apps!"

## 🚀 About the Project

Webdows is a personal challenge and a technical project aimed at recreating the Windows experience in a web environment. The goal is to allow users to add their own applications, fostering creativity and self-improvement.

**Webdows: A Creative Journey in Web Development**
Webdows is an innovative project aimed at recreating the Windows experience in a web environment. This initiative invites developers and designers to explore the possibilities of web technology while enhancing their skills. Join us in building a modular, interactive platform that allows users to add their own applications, fostering creativity and collaboration. Embrace the challenge, learn, and contribute to a project that pushes the boundaries of what’s possible in web development!

## 🎯 Features

- ✅ Modular application structure allowing easy addition of new apps
- ✅ Drag-and-drop window management with resizing capabilities
- ✅ Taskbar integration for easy access to open applications
- ✅ Customizable desktop environment

## 🛠️ Technologies Used

- React with Vite 🚀
- TypeScript for better code structure
- CSS for animations and styling

## 📂 Code Structure

The project is modular and optimized:

- **App.css**: Contains global styles for the application, ensuring a consistent look and feel across all components.
- **App.tsx**: The main entry point of the application, responsible for rendering the root component and setting up the application context.
- **assets/**: Directory for static assets such as images and icons used throughout the application to enhance the user interface.
- **components/**: Contains all reusable React components that make up the user interface:
  - **Container.tsx**: Manages the main layout, integrating the Desktop and Taskbar components.
  - **Desktop.tsx**: Represents the desktop area where applications can be launched.
  - **Taskbar.tsx**: Displays the taskbar for managing open applications.
  - **Window.tsx**: Handles window behavior, including dragging and resizing.
  - **WindowsContext.tsx**: Provides context for managing window states and interactions.
  - **apps/**: Contains individual applications like Notepad, each with its own structure.
    - **notepad/**: Directory for the Notepad application.
      - **Notepad.tsx**: The main component for the Notepad application.
      - **notepad.css**: Styles specific to the Notepad application.
- **context/**: Houses context providers that manage global state, allowing components to access shared data without prop drilling:
  - **WindowsContext.ts**: Defines the context for managing window states and interactions.
- **hooks/**: Contains custom hooks that encapsulate reusable logic:
  - **useWindowsContext.ts**: A custom hook for accessing the Windows context.
- **index.css**: Additional global styles that complement App.css, providing further customization for the application.
- **main.tsx**: The entry point of the React application, where the ReactDOM renders the App component and initializes the application.
- **types/**: Contains TypeScript type definitions that ensure type safety and improve code quality throughout the project:
  - **WindowsContextProps.ts**: Type definitions for the Windows context.
- **utils/**: Utility functions that provide common functionality, such as data manipulation and helper methods used across different components:
  - **desktopUtils.ts**: Utility functions related to desktop management.
  - **taskbarUtils.ts**: Utility functions related to taskbar management.
  - **windowUtils.ts**: Utility functions related to window management.
- **vite-env.d.ts**: Type definitions for Vite environment variables, ensuring that TypeScript recognizes Vite-specific features.

## 📦 Installation & Running the Project

```bash
git clone https://github.com/TonGitHub/Webdows.git
cd Webdows
npm install
npm run dev
```

## 🔥 The Biggest Challenge

Starting this project was daunting due to the complexity of replicating a full operating system experience. However, diving into the logic and structure has been an exciting challenge.

## 💭 Message to Developers

➡️ Don’t fear big projects—just start!
➡️ Embrace the challenge and evolve with your creations.

## 🎯 Want to improve Webdows?

Feel free to fork the repo and submit a Pull Request with your improvements! 🚀
