const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');
require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

// Middleware
app.use(helmet());
app.use(compression());
app.use(cors({
  origin: process.env.CLIENT_URL || "http://localhost:3000",
  credentials: true
}));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Import routes
const speechRoutes = require('./routes/speech');
const notesRoutes = require('./routes/notes');
const aiRoutes = require('./routes/ai');

// API Routes
app.use('/api/speech', speechRoutes);
app.use('/api/notes', notesRoutes);
app.use('/api/ai', aiRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});

// Socket.io connection handling
io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);

  // Join a lecture room
  socket.on('join-lecture', (lectureId) => {
    socket.join(lectureId);
    console.log(`Client ${socket.id} joined lecture ${lectureId}`);
  });

  // Handle real-time speech processing
  socket.on('speech-chunk', async (data) => {
    try {
      const { lectureId, audioChunk, timestamp } = data;
      
      // Process the audio chunk
      const processedData = await require('./services/speechProcessor').processChunk(audioChunk);
      
      // Emit processed results to all clients in the lecture room
      io.to(lectureId).emit('speech-processed', {
        transcript: processedData.transcript,
        confidence: processedData.confidence,
        timestamp: timestamp,
        isKeyPoint: processedData.isKeyPoint
      });

      // If it's a key point, trigger AI processing
      if (processedData.isKeyPoint) {
        const aiResult = await require('./services/aiProcessor').processKeyPoint(processedData.transcript);
        io.to(lectureId).emit('ai-insight', {
          summary: aiResult.summary,
          keyConcepts: aiResult.keyConcepts,
          timestamp: timestamp
        });
      }
    } catch (error) {
      console.error('Error processing speech chunk:', error);
      socket.emit('error', { message: 'Error processing speech' });
    }
  });

  // Handle note updates
  socket.on('note-update', (data) => {
    const { lectureId, noteData } = data;
    io.to(lectureId).emit('note-updated', noteData);
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

// Serve static files in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
  
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
  });
}

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    error: 'Something went wrong!',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`🚀 AI Smart Notes Server running on port ${PORT}`);
  console.log(`📡 Socket.io server ready for real-time connections`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
});

module.exports = { app, io }; 