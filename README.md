# 🎨 IndiArt — AI-Powered Marketplace Assistant for Local Artisans

> **Bridging India's traditional artisans with the digital marketplace — through voice, story, and AI.**

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Cloud%20Run-4285F4?style=flat-square&logo=google-cloud)](https://indiart-marketing-assistant-648000377780.us-west1.run.app/)
[![Hackathon](https://img.shields.io/badge/Google%20Cloud-Gen%20AI%20Exchange%20Hackathon-orange?style=flat-square&logo=google-cloud)](https://cloud.google.com/)
[![Deployed on](https://img.shields.io/badge/Hosting-Google%20Cloud%20Run-blue?style=flat-square&logo=google-cloud)](https://cloud.google.com/run)
[![AI](https://img.shields.io/badge/AI-Gemini%202.5%20Flash%20%2B%20Veo%202.0-green?style=flat-square&logo=google)](https://ai.google.dev/)
[![Built with React](https://img.shields.io/badge/Frontend-React%20%2B%20TypeScript-61DAFB?style=flat-square&logo=react)](https://react.dev/)

---

## 📖 Overview

**IndiArt** is an AI-powered digital assistant built for local Indian artisans who create beautiful, culturally rich work — but lack the digital literacy or marketing know-how to reach modern audiences.

Where platforms like Amazon, Flipkart, and Instagram demand polished copy and digital savviness, IndiArt lets artisans simply **speak** about their craft. The AI takes care of the rest: transforming a humble spoken description into emotionally compelling product stories, multilingual social media posts, video scripts, and market trend insights.

Built for the **Google Cloud Gen AI Exchange Hackathon** by **Hasitha Vitta**.

> *"Give artisans a voice, visibility, and viability in the online marketplace."*

---

## ✨ Features

| Feature | Description |
|---|---|
| 🎙️ **Voice-to-Story Conversion** | Artisan speaks a product description; AI transcribes and generates rich marketing narratives |
| ✍️ **AI Content Creation** | Generates social media posts, product descriptions, blog drafts, video scripts, SEO keywords, and email newsletters |
| 🌐 **Multilingual Support** | Auto-translates all content into multiple Indian regional languages |
| 📊 **Plain-Language Analysis** | Before vs. After insights explained in simple words — e.g., *"More people are noticing your work"* |
| 📈 **Trend-Craft Fusion** | AI suggests modern usage ideas and trending design adaptations to align heritage crafts with current consumer demand |
| 🔊 **Text-to-Speech Feedback** | AI reads generated content aloud for artisans who prefer listening over reading |
| 🖼️ **Image + Description Input** | Upload a product image alongside a description for richer, multimodal AI generation |
| 📋 **One-Click Copy** | Instantly copy any generated content to clipboard for direct use |

---

## 🏗️ Architecture

```
┌─────────────┐     ┌──────────────────────────────┐     ┌────────────────────────┐
│  User Layer │────▶│  Frontend Layer               │────▶│  AI Models             │
│  (Artisan)  │     │  React + TypeScript           │     │  Gemini 2.5 Flash      │
└─────────────┘     │  Tailwind CSS                 │     │  Veo 2.0               │
                    │                               │     │  Google Gemini API     │
                    │  Browser APIs:                │     └────────────────────────┘
                    │  ├─ Web Speech (Recognition)  │
                    │  ├─ Web Speech (Synthesis)    │              │
                    │  ├─ File API (Image Upload)   │              ▼
                    │  └─ Clipboard API             │         ┌──────────┐
                    └──────────────────────────────┘         │  Output  │
                                                             │ (Copy /  │
                                                             │  Listen) │
                                                             └──────────┘
```

### User Flow (7-Step Process)

```
1. Artisan Provides Description (voice or text)
        ↓
2. AI Converts Speech to Text
        ↓
3. AI Generates Marketing Content
        ↓
4. Artisan Chooses Language
        ↓
5. AI Suggests Market Trends
        ↓
6. AI Provides Plain-Language Analysis
        ↓
7. Artisan Posts Content to Social Media
```

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Frontend Framework** | React + TypeScript |
| **Styling** | Tailwind CSS |
| **Text & Image AI** | Gemini 2.5 Flash (`gemini-2.5-flash`) |
| **Video Generation** | Veo 2.0 (`veo-2.0-generate-001`) |
| **Multilingual Translation** | Google Gemini API |
| **Voice Input** | Web Speech API — `SpeechRecognition` |
| **Voice Output** | Web Speech API — `SpeechSynthesis` |
| **Image Handling** | File API (client-side upload & preview) |
| **Clipboard** | Clipboard API |
| **Hosting** | Google Cloud Run (us-west1) |

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18+
- A [Google Gemini API key](https://ai.google.dev/) (for Gemini 2.5 Flash + Veo 2.0)
- [Docker](https://www.docker.com/) (optional, for containerized runs)

### Local Development

```bash
# 1. Clone the repository
git clone https://github.com/your-org/indiart-marketing-assistant.git
cd indiart-marketing-assistant

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env
# → Add your GEMINI_API_KEY to .env

# 4. Start the development server
npm run dev
```

The app will be available at `http://localhost:5173`.

### Running with Docker

```bash
docker build -t indiart-marketing-assistant .
docker run -p 8080:8080 --env-file .env indiart-marketing-assistant
```

---

## ⚙️ Environment Variables

```env
# Required
GEMINI_API_KEY=your_google_gemini_api_key_here

# Optional
PORT=8080
VITE_APP_ENV=development
```

> ⚠️ **Never commit your `.env` file.** It is already listed in `.gitignore`.

---

## 🌐 Deployment

This project is hosted on **Google Cloud Run** as a containerized application.

### Deploy to Cloud Run

```bash
# Authenticate
gcloud auth login
gcloud config set project YOUR_PROJECT_ID

# Build and push image
gcloud builds submit --tag gcr.io/YOUR_PROJECT_ID/indiart-marketing-assistant

# Deploy
gcloud run deploy indiart-marketing-assistant \
  --image gcr.io/YOUR_PROJECT_ID/indiart-marketing-assistant \
  --platform managed \
  --region us-west1 \
  --allow-unauthenticated \
  --set-env-vars GEMINI_API_KEY=your_key_here
```

---

## 💰 Cost

The entire prototype runs within **Google Cloud's free tier**:

| Service | Cost |
|---|---|
| Gemini 2.5 Flash + Veo 2.0 + Translation | ✅ Free tier / credits |
| Google Cloud Run | ✅ Free tier |
| React + TypeScript + Tailwind | ✅ Open source |
| **Total Prototype Cost** | **~$0** |

> Scaling costs apply only once adoption grows beyond free tier limits.

---

## 📁 Project Structure

```
indiart-marketing-assistant/
├── public/                   # Static assets
├── src/
│   ├── components/           # UI components (VoiceInput, ContentCard, etc.)
│   ├── pages/                # Route-level views
│   ├── services/
│   │   ├── gemini.ts         # Gemini 2.5 Flash API integration
│   │   ├── veo.ts            # Veo 2.0 video generation
│   │   └── translation.ts    # Multilingual support via Gemini API
│   ├── hooks/                # Custom React hooks (useSpeech, useClipboard)
│   └── utils/                # Prompt templates & content formatters
├── Dockerfile
├── .env.example
├── tailwind.config.ts
├── tsconfig.json
└── README.md
```

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m 'feat: describe your change'`
4. Push: `git push origin feature/your-feature`
5. Open a Pull Request

Please follow [Conventional Commits](https://www.conventionalcommits.org/) for commit messages.

---

## 🗺️ Roadmap

- [ ] User authentication and saved content history
- [ ] Direct export to Instagram, WhatsApp Business, Etsy
- [ ] Offline / low-bandwidth mode for rural artisans
- [ ] Analytics dashboard (reach, engagement insights)
- [ ] Support for more Indian regional languages
- [ ] Mobile app (Android-first for accessibility)

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

📄 [Full Prototype Documentation](https://docs.google.com/document/d/16fA6nVwLqEvQGrsnAeydUvIcOgv7ri0ipBTffnN72Rs/edit?usp=sharing)

---

## 🙏 Acknowledgements

- [Google Cloud](https://cloud.google.com) for Gen AI APIs and Cloud Run hosting
- [Google DeepMind](https://deepmind.google) for Gemini 2.5 Flash and Veo 2.0
- India's artisan communities — the inspiration behind every line of this project ✨

---

<p align="center">
  Built with ❤️ for India's artisans at the <strong>Google Cloud Gen AI Exchange Hackathon</strong>
</p>
