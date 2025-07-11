# 🎓 AI-Powered Smart Notes: Revolutionizing Classroom Learning

## 📌 Problem with Traditional Note-Taking

Students often struggle between:
- Actively listening to the professor vs. furiously scribbling notes
- Using transcription apps that capture everything, including irrelevant or off-topic discussion
- Losing focus because they're trying to multitask between understanding and writing

## 💡 Our Solution: Context-Aware AI Note-Taking Website

Imagine walking into a classroom, opening our website, and just listening—because our AI is doing the rest.

### ✅ What the AI Does

- **Listens Live**: The AI activates as soon as a lecture starts
- **Understands Context**: Uses natural language understanding (NLU) to identify when the professor is explaining important concepts, definitions, examples, or key points
- **Filters Noise**: Intelligently ignores off-topic discussions, student interruptions, or small talk
- **Summarizes Smartly**: Instead of dumping raw transcriptions, the AI generates concise, structured notes—like bullet points, topic headers, and diagrams (if needed)
- **Highlights Key Concepts**: Identifies keywords, subject-specific terms, and even references to slides or textbooks
- **Real-Time Updates**: Notes evolve as the lecture progresses—so users can review, bookmark, or even ask the AI for clarification

## 🎯 Why It Matters

- Students can focus fully on understanding the lecture
- Ensures consistent and high-quality notes for every class
- Supports students with learning difficulties, language barriers, or accessibility needs
- Works for remote classes, study groups, or revision later

## 🧠 How It's Different from Plain Transcription Apps

| Feature | Transcription App | Our AI Notes Website |
|---------|------------------|---------------------|
| Captures speech | ✅ | ✅ |
| Understands context | ❌ | ✅ |
| Filters irrelevant content | ❌ | ✅ |
| Summarizes key points | ❌ | ✅ |
| Helps you study better | ❌ | ✅ |

## 🔧 What Powers the AI

- **Speech-to-Text API** (like Whisper, Google, or AssemblyAI)
- **Contextual NLP Models** to classify lecture segments
- **Summarization Algorithms** (e.g., GPT, Pegasus)
- **Semantic Filtering** to discard noise
- **Optional**: Visual slide/audio sync, handwriting OCR, and multi-language support

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- API keys for OpenAI and AssemblyAI

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd ai-smart-notes
```

2. Install dependencies:
```bash
npm run install-all
```

3. Set up environment variables:
```bash
cp .env.example .env
```
Edit `.env` with your API keys:
```
OPENAI_API_KEY=your_openai_key
ASSEMBLYAI_API_KEY=your_assemblyai_key
```

4. Start the development server:
```bash
npm run dev
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## 🏗️ Project Structure

```
ai-smart-notes/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── hooks/         # Custom React hooks
│   │   ├── services/      # API services
│   │   └── styles/        # CSS styles
├── server/                 # Node.js backend
│   ├── routes/            # API routes
│   ├── services/          # AI and processing services
│   ├── middleware/        # Express middleware
│   └── utils/             # Utility functions
├── shared/                 # Shared types and utilities
└── docs/                  # Documentation
```

## 🎨 Features

### Core Features
- **Real-time Speech Recognition**: Live audio capture and transcription
- **Smart Context Understanding**: AI-powered content classification
- **Intelligent Summarization**: Automatic note generation and structuring
- **Noise Filtering**: Removes irrelevant content and interruptions
- **Live Note Updates**: Real-time note generation and updates
- **Export Options**: PDF, Markdown, and text export capabilities

### Advanced Features
- **Multi-language Support**: Support for various languages
- **Slide Synchronization**: Link notes to presentation slides
- **Collaborative Notes**: Share and collaborate on notes
- **Study Mode**: AI-powered study assistance and Q&A
- **Accessibility**: Screen reader support and keyboard navigation

## 🔧 Technology Stack

### Frontend
- **React 18** with TypeScript
- **Socket.io Client** for real-time communication
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **React Query** for state management

### Backend
- **Node.js** with Express
- **Socket.io** for real-time features
- **OpenAI API** for text processing and summarization
- **AssemblyAI** for speech recognition
- **Multer** for file uploads

### AI/ML
- **OpenAI GPT-4** for content understanding and summarization
- **AssemblyAI** for high-quality speech-to-text
- **Custom NLP models** for context classification

## 📝 API Documentation

### Endpoints

#### Speech Processing
- `POST /api/speech/start` - Start a new recording session
- `POST /api/speech/process` - Process audio chunk
- `POST /api/speech/end` - End recording session

#### Notes Management
- `GET /api/notes` - Get all notes
- `GET /api/notes/:id` - Get specific note
- `POST /api/notes` - Create new note
- `PUT /api/notes/:id` - Update note
- `DELETE /api/notes/:id` - Delete note

#### AI Processing
- `POST /api/ai/summarize` - Summarize text content
- `POST /api/ai/classify` - Classify content type
- `POST /api/ai/extract` - Extract key concepts

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- OpenAI for providing the GPT API
- AssemblyAI for speech recognition capabilities
- The React and Node.js communities for excellent tooling
- All contributors and beta testers

## 📞 Support

If you have any questions or need support, please:
- Open an issue on GitHub
- Contact us at support@ai-smart-notes.com
- Join our Discord community

---

**Built with ❤️ for students everywhere** #   n o t e s t  
 