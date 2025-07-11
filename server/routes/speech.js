const express = require('express');
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const speechProcessor = require('../services/speechProcessor');
const router = express.Router();

// Configure multer for audio file uploads
const storage = multer.memoryStorage();
const upload = multer({ 
  storage: storage,
  limits: {
    fileSize: 50 * 1024 * 1024, // 50MB limit
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('audio/')) {
      cb(null, true);
    } else {
      cb(new Error('Only audio files are allowed'), false);
    }
  }
});

// Start a new recording session
router.post('/start', async (req, res) => {
  try {
    const { lectureId, subject, professor } = req.body;
    
    if (!lectureId) {
      return res.status(400).json({ error: 'Lecture ID is required' });
    }

    const sessionId = uuidv4();
    const session = {
      id: sessionId,
      lectureId,
      subject,
      professor,
      startTime: new Date(),
      status: 'active',
      transcript: [],
      keyPoints: []
    };

    // Store session in memory (in production, use Redis or database)
    global.activeSessions = global.activeSessions || new Map();
    global.activeSessions.set(sessionId, session);

    res.json({
      sessionId,
      message: 'Recording session started',
      session
    });
  } catch (error) {
    console.error('Error starting recording session:', error);
    res.status(500).json({ error: 'Failed to start recording session' });
  }
});

// Process audio chunk (for real-time processing)
router.post('/process', upload.single('audio'), async (req, res) => {
  try {
    const { sessionId, timestamp } = req.body;
    const audioBuffer = req.file?.buffer;

    if (!sessionId || !audioBuffer) {
      return res.status(400).json({ error: 'Session ID and audio data are required' });
    }

    // Get session
    const session = global.activeSessions?.get(sessionId);
    if (!session) {
      return res.status(404).json({ error: 'Session not found' });
    }

    // Process the audio chunk
    const result = await speechProcessor.processChunk(audioBuffer);
    
    // Add to session transcript
    session.transcript.push({
      text: result.transcript,
      confidence: result.confidence,
      timestamp: timestamp || new Date(),
      isKeyPoint: result.isKeyPoint
    });

    // If it's a key point, add to key points
    if (result.isKeyPoint) {
      session.keyPoints.push({
        text: result.transcript,
        timestamp: timestamp || new Date(),
        confidence: result.confidence
      });
    }

    res.json({
      success: true,
      transcript: result.transcript,
      confidence: result.confidence,
      isKeyPoint: result.isKeyPoint,
      sessionStatus: session.status
    });
  } catch (error) {
    console.error('Error processing audio chunk:', error);
    res.status(500).json({ error: 'Failed to process audio chunk' });
  }
});

// End recording session
router.post('/end', async (req, res) => {
  try {
    const { sessionId } = req.body;

    if (!sessionId) {
      return res.status(400).json({ error: 'Session ID is required' });
    }

    const session = global.activeSessions?.get(sessionId);
    if (!session) {
      return res.status(404).json({ error: 'Session not found' });
    }

    // Update session status
    session.status = 'completed';
    session.endTime = new Date();
    session.duration = session.endTime - session.startTime;

    // Generate final summary
    const fullTranscript = session.transcript.map(t => t.text).join(' ');
    const summary = await speechProcessor.generateSummary(fullTranscript, session.subject);

    const finalSession = {
      ...session,
      summary,
      totalKeyPoints: session.keyPoints.length,
      averageConfidence: session.transcript.reduce((acc, t) => acc + t.confidence, 0) / session.transcript.length
    };

    res.json({
      success: true,
      message: 'Recording session ended',
      session: finalSession
    });
  } catch (error) {
    console.error('Error ending recording session:', error);
    res.status(500).json({ error: 'Failed to end recording session' });
  }
});

// Get session status
router.get('/session/:sessionId', (req, res) => {
  try {
    const { sessionId } = req.params;
    const session = global.activeSessions?.get(sessionId);

    if (!session) {
      return res.status(404).json({ error: 'Session not found' });
    }

    res.json({ session });
  } catch (error) {
    console.error('Error getting session status:', error);
    res.status(500).json({ error: 'Failed to get session status' });
  }
});

// Get all active sessions
router.get('/sessions', (req, res) => {
  try {
    const sessions = Array.from(global.activeSessions?.values() || []);
    res.json({ sessions });
  } catch (error) {
    console.error('Error getting sessions:', error);
    res.status(500).json({ error: 'Failed to get sessions' });
  }
});

// Upload and process audio file
router.post('/upload', upload.single('audio'), async (req, res) => {
  try {
    const { subject, professor } = req.body;
    const audioFile = req.file;

    if (!audioFile) {
      return res.status(400).json({ error: 'Audio file is required' });
    }

    // Process the uploaded audio file
    const result = await speechProcessor.processAudioFile(audioFile.buffer);
    
    res.json({
      success: true,
      transcript: result.transcript,
      summary: result.summary,
      keyPoints: result.keyPoints,
      confidence: result.confidence
    });
  } catch (error) {
    console.error('Error processing uploaded audio:', error);
    res.status(500).json({ error: 'Failed to process audio file' });
  }
});

module.exports = router; 