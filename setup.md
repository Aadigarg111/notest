# 🚀 AI Smart Notes - Setup Guide

## Prerequisites

Before you begin, make sure you have the following installed:
- **Node.js** (v16 or higher)
- **npm** or **yarn**
- **Git**

## 🛠️ Installation Steps

### 1. Clone the Repository
```bash
git clone <your-repo-url>
cd ai-smart-notes
```

### 2. Install Dependencies
```bash
# Install backend dependencies
npm install

# Install frontend dependencies
cd client
npm install
cd ..
```

### 3. Environment Configuration

Create a `.env` file in the root directory:
```bash
cp env.example .env
```

Edit the `.env` file with your API keys:
```env
# Server Configuration
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:3000

# OpenAI API Configuration
OPENAI_API_KEY=your_openai_api_key_here

# AssemblyAI API Configuration
ASSEMBLYAI_API_KEY=your_assemblyai_api_key_here
```

### 4. Get API Keys

#### OpenAI API Key
1. Go to [OpenAI Platform](https://platform.openai.com/)
2. Sign up or log in
3. Navigate to API Keys section
4. Create a new API key
5. Copy the key and paste it in your `.env` file

#### AssemblyAI API Key
1. Go to [AssemblyAI](https://www.assemblyai.com/)
2. Sign up for a free account
3. Navigate to your API key section
4. Copy the API key and paste it in your `.env` file

## 🚀 Running the Application

### Development Mode
```bash
# Start both backend and frontend
npm run dev
```

This will start:
- **Backend**: http://localhost:5000
- **Frontend**: http://localhost:3000

### Production Mode
```bash
# Build the frontend
npm run build

# Start the production server
npm start
```

## 📁 Project Structure

```
ai-smart-notes/
├── client/                 # React frontend
│   ├── public/            # Static files
│   ├── src/               # Source code
│   │   ├── components/    # React components
│   │   ├── pages/         # Page components
│   │   ├── hooks/         # Custom React hooks
│   │   ├── services/      # API services
│   │   └── styles/        # CSS styles
│   └── package.json       # Frontend dependencies
├── server/                 # Node.js backend
│   ├── routes/            # API routes
│   ├── services/          # AI and processing services
│   ├── middleware/        # Express middleware
│   └── utils/             # Utility functions
├── package.json           # Backend dependencies
├── README.md              # Project documentation
└── setup.md              # This setup guide
```

## 🎯 Features Overview

### ✅ Implemented Features
- **Modern Dark UI**: Beautiful, responsive design with dark theme
- **Real-time Speech Processing**: Live audio capture and transcription
- **AI-Powered Insights**: Smart summarization and key point extraction
- **Note Management**: Create, edit, and organize notes
- **Study Assistance**: Generate flashcards and practice questions
- **Export Options**: PDF, Markdown, and text export

### 🔄 In Development
- **Live Lecture Recording**: Real-time audio processing
- **Collaborative Notes**: Share and collaborate on notes
- **Advanced AI Features**: More sophisticated content analysis
- **Mobile App**: Native mobile application

## 🧪 Testing the Application

### 1. Health Check
Visit `http://localhost:5000/api/health` to verify the backend is running.

### 2. Frontend
Open `http://localhost:3000` in your browser to see the application.

### 3. API Endpoints
Test the API endpoints using tools like Postman or curl:

```bash
# Health check
curl http://localhost:5000/api/health

# Get notes
curl http://localhost:5000/api/notes

# Create a note
curl -X POST http://localhost:5000/api/notes \
  -H "Content-Type: application/json" \
  -d '{"title":"Test Note","content":"This is a test note","subject":"Computer Science"}'
```

## 🔧 Configuration Options

### Backend Configuration
- `PORT`: Server port (default: 5000)
- `NODE_ENV`: Environment (development/production)
- `CLIENT_URL`: Frontend URL for CORS

### AI Configuration
- `OPENAI_API_KEY`: OpenAI API key for text processing
- `ASSEMBLYAI_API_KEY`: AssemblyAI API key for speech recognition

### File Upload Configuration
- `MAX_FILE_SIZE`: Maximum file size for uploads (default: 50MB)
- `UPLOAD_PATH`: Directory for file uploads

## 🐛 Troubleshooting

### Common Issues

#### 1. Port Already in Use
```bash
# Find process using port 5000
lsof -i :5000

# Kill the process
kill -9 <PID>
```

#### 2. API Key Issues
- Ensure your API keys are correctly set in the `.env` file
- Verify the keys are valid and have sufficient credits
- Check the console for specific error messages

#### 3. CORS Issues
- Ensure `CLIENT_URL` is set correctly in your `.env` file
- Check that the frontend is running on the expected port

#### 4. Module Not Found Errors
```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install

cd client
rm -rf node_modules package-lock.json
npm install
```

### Debug Mode
Enable debug logging by setting:
```env
LOG_LEVEL=debug
```

## 📚 API Documentation

### Speech Processing
- `POST /api/speech/start` - Start recording session
- `POST /api/speech/process` - Process audio chunk
- `POST /api/speech/end` - End recording session

### Notes Management
- `GET /api/notes` - Get all notes
- `POST /api/notes` - Create new note
- `PUT /api/notes/:id` - Update note
- `DELETE /api/notes/:id` - Delete note

### AI Processing
- `POST /api/ai/summarize` - Summarize text
- `POST /api/ai/classify` - Classify content
- `POST /api/ai/extract` - Extract key concepts

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📞 Support

If you encounter any issues:
1. Check the troubleshooting section above
2. Review the console logs for error messages
3. Open an issue on GitHub with detailed information
4. Contact the development team

## 🎉 Success!

You've successfully set up the AI Smart Notes application! 

**Next Steps:**
1. Explore the application interface
2. Test the speech recognition features
3. Create your first AI-powered notes
4. Customize the application for your needs

Happy learning! 🎓✨ 