# VoiceAssist – Smart Voice Assistant (Frontend)

[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

Modern, beautiful, and extensible web app for interacting with a voice assistant through real-time speech transcription and command execution.

---

## 🚀 Features

- **Voice Command Execution**: Speak your command and watch it happen instantly.
- **Real-Time Transcription**: See your speech transcribed in real time.
- **Interactive Dashboard**: Get instant feedback and results from your assistant.
- **Smart Actions**: Perform actions like translations, file opening, note-taking, and more.
- **Responsive UI**: Built with Tailwind CSS and shadcn-ui for a clean, modern look.
- **Customizable**: Easily extend or tweak the UI/UX to your liking.

---

## 🖥️ Project Structure

```
voice_os_fe/
├── public/
├── src/
│   ├── components/         # Reusable UI components (e.g., Button, Sidebar, Carousel, etc.)
│   ├── pages/              # Main app pages (Landing, Dashboard, NotFound, etc.)
│   ├── index.css           # Tailwind and custom styles
│   ├── App.tsx             # Main app routes and providers
│   └── vite-env.d.ts
├── index.html              # App entry HTML, meta tags, and external scripts
├── tailwind.config.ts      # Tailwind CSS configuration
├── vite.config.ts          # Vite build configuration
├── postcss.config.js       # PostCSS config for Tailwind
├── eslint.config.js        # ESLint configuration
└── README.md
```

---

## ✨ Demo

**Landing Page Preview:**

> Your Smart Assistant at Your Command  
> Experience the next generation of voice assistants. Speak your command. Get instant results.

---

## ⚡ Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) & [npm](https://www.npmjs.com/)  
  (Recommended: Install via [nvm](https://github.com/nvm-sh/nvm#installing-and-updating))

### Quickstart

```sh
# 1. Clone the repository
git clone https://github.com/VarunChopra11/voice_os_fe.git

# 2. Go to the project directory
cd voice_os_fe

# 3. Install dependencies
npm install

# 4. Start the development server
npm run dev
```

The app should now be running at [http://localhost:8080](http://localhost:8080)

---

## 🔧 Editing the Code

You can:

- **Use Lovable:**  
  Visit your [Lovable Project Dashboard](https://lovable.dev/projects/89d68eb9-d1f9-44b7-bd1b-6128b837039e) and prompt for changes.  
  Changes made via Lovable are automatically committed here.
- **Use your IDE locally:**  
  Clone, edit, and push. Changes sync with Lovable.
- **Edit in GitHub:**  
  Navigate and click the pencil icon on any file.
- **Use GitHub Codespaces:**  
  Click "Code" > "Codespaces" > "New codespace" to launch a live dev environment in your browser.

---

## 🛠️ Technologies Used

- [Vite](https://vitejs.dev/) – Lightning-fast frontend tooling
- [React](https://react.dev/) – UI library
- [TypeScript](https://www.typescriptlang.org/) – Typed JavaScript
- [shadcn-ui](https://ui.shadcn.com/) – Modern accessible React components
- [Tailwind CSS](https://tailwindcss.com/) – Utility-first styling
- [Radix UI](https://www.radix-ui.com/) – Unstyled accessible component primitives

---

## 🌍 Deployment

- **With Lovable:**  
  Open your [Lovable Project](https://lovable.dev/projects/89d68eb9-d1f9-44b7-bd1b-6128b837039e) and click Share → Publish.
- **Custom Domain:**  
  Go to Project > Settings > Domains in Lovable, and click "Connect Domain".  
  [Read the guide](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)

---

## 📝 Environment & Configuration

- No custom environment variables are required for basic setup.
- To connect to a backend voice assistant API, configure the `/execute` endpoint as needed.

---

## 🤝 Contributing

1. Fork the repo
2. Create your feature branch: `git checkout -b feat/your-feature`
3. Commit your changes: `git commit -am 'Add new feature'`
4. Push to the branch: `git push origin feat/your-feature`
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License.

---

## 🙋 FAQ

### How does it work?
- Click the microphone button, speak your command, and get instant results (transcription, translation, note-taking, and more) shown in the dashboard.

### Can I use my own backend?
- Yes! The frontend fetches from `/execute`, so you can point it to any compatible backend.

### Want to extend or style?
- All UI is component-based and styled with Tailwind/shadcn-ui—customize freely!

---

## 📫 Contact

For issues or suggestions, open an [issue](https://github.com/VarunChopra11/voice_os_fe/issues) or reach out via GitHub.

---

> _Built with ❤️ by [VarunChopra11](https://github.com/VarunChopra11)_