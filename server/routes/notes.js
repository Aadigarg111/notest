const express = require('express');
const { v4: uuidv4 } = require('uuid');
const aiProcessor = require('../services/aiProcessor');
const router = express.Router();

// In-memory storage for notes (in production, use a database)
global.notes = global.notes || new Map();

// Get all notes
router.get('/', (req, res) => {
  try {
    const { subject, professor, date } = req.query;
    let notes = Array.from(global.notes.values());

    // Apply filters
    if (subject) {
      notes = notes.filter(note => note.subject?.toLowerCase().includes(subject.toLowerCase()));
    }
    if (professor) {
      notes = notes.filter(note => note.professor?.toLowerCase().includes(professor.toLowerCase()));
    }
    if (date) {
      const filterDate = new Date(date);
      notes = notes.filter(note => {
        const noteDate = new Date(note.createdAt);
        return noteDate.toDateString() === filterDate.toDateString();
      });
    }

    res.json({ notes });
  } catch (error) {
    console.error('Error getting notes:', error);
    res.status(500).json({ error: 'Failed to get notes' });
  }
});

// Get a specific note
router.get('/:id', (req, res) => {
  try {
    const { id } = req.params;
    const note = global.notes.get(id);

    if (!note) {
      return res.status(404).json({ error: 'Note not found' });
    }

    res.json({ note });
  } catch (error) {
    console.error('Error getting note:', error);
    res.status(500).json({ error: 'Failed to get note' });
  }
});

// Create a new note
router.post('/', async (req, res) => {
  try {
    const { title, content, subject, professor, lectureId, sessionId } = req.body;

    if (!title || !content) {
      return res.status(400).json({ error: 'Title and content are required' });
    }

    const noteId = uuidv4();
    const note = {
      id: noteId,
      title,
      content,
      subject,
      professor,
      lectureId,
      sessionId,
      createdAt: new Date(),
      updatedAt: new Date(),
      tags: [],
      keyPoints: [],
      summary: '',
      aiInsights: []
    };

    // Generate AI insights for the note
    try {
      const aiResult = await aiProcessor.processNote(content, subject);
      note.summary = aiResult.summary;
      note.keyPoints = aiResult.keyPoints;
      note.tags = aiResult.tags;
      note.aiInsights = aiResult.insights;
    } catch (aiError) {
      console.warn('AI processing failed, saving note without AI insights:', aiError);
    }

    global.notes.set(noteId, note);

    res.status(201).json({
      success: true,
      message: 'Note created successfully',
      note
    });
  } catch (error) {
    console.error('Error creating note:', error);
    res.status(500).json({ error: 'Failed to create note' });
  }
});

// Update a note
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, subject, professor, tags } = req.body;

    const note = global.notes.get(id);
    if (!note) {
      return res.status(404).json({ error: 'Note not found' });
    }

    // Update note fields
    if (title) note.title = title;
    if (content) note.content = content;
    if (subject) note.subject = subject;
    if (professor) note.professor = professor;
    if (tags) note.tags = tags;
    
    note.updatedAt = new Date();

    // Regenerate AI insights if content changed
    if (content && content !== note.content) {
      try {
        const aiResult = await aiProcessor.processNote(content, subject || note.subject);
        note.summary = aiResult.summary;
        note.keyPoints = aiResult.keyPoints;
        note.aiInsights = aiResult.insights;
      } catch (aiError) {
        console.warn('AI processing failed during update:', aiError);
      }
    }

    global.notes.set(id, note);

    res.json({
      success: true,
      message: 'Note updated successfully',
      note
    });
  } catch (error) {
    console.error('Error updating note:', error);
    res.status(500).json({ error: 'Failed to update note' });
  }
});

// Delete a note
router.delete('/:id', (req, res) => {
  try {
    const { id } = req.params;
    const note = global.notes.get(id);

    if (!note) {
      return res.status(404).json({ error: 'Note not found' });
    }

    global.notes.delete(id);

    res.json({
      success: true,
      message: 'Note deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting note:', error);
    res.status(500).json({ error: 'Failed to delete note' });
  }
});

// Generate AI insights for existing note
router.post('/:id/ai-insights', async (req, res) => {
  try {
    const { id } = req.params;
    const note = global.notes.get(id);

    if (!note) {
      return res.status(404).json({ error: 'Note not found' });
    }

    const aiResult = await aiProcessor.processNote(note.content, note.subject);
    
    // Update note with AI insights
    note.summary = aiResult.summary;
    note.keyPoints = aiResult.keyPoints;
    note.tags = aiResult.tags;
    note.aiInsights = aiResult.insights;
    note.updatedAt = new Date();

    global.notes.set(id, note);

    res.json({
      success: true,
      message: 'AI insights generated successfully',
      aiInsights: aiResult
    });
  } catch (error) {
    console.error('Error generating AI insights:', error);
    res.status(500).json({ error: 'Failed to generate AI insights' });
  }
});

// Search notes
router.get('/search/:query', (req, res) => {
  try {
    const { query } = req.params;
    const notes = Array.from(global.notes.values());

    const searchResults = notes.filter(note => {
      const searchText = `${note.title} ${note.content} ${note.subject} ${note.professor}`.toLowerCase();
      return searchText.includes(query.toLowerCase());
    });

    res.json({ 
      query,
      results: searchResults,
      totalResults: searchResults.length
    });
  } catch (error) {
    console.error('Error searching notes:', error);
    res.status(500).json({ error: 'Failed to search notes' });
  }
});

// Export note in different formats
router.get('/:id/export/:format', (req, res) => {
  try {
    const { id, format } = req.params;
    const note = global.notes.get(id);

    if (!note) {
      return res.status(404).json({ error: 'Note not found' });
    }

    let exportData;
    let contentType;
    let filename;

    switch (format.toLowerCase()) {
      case 'json':
        exportData = JSON.stringify(note, null, 2);
        contentType = 'application/json';
        filename = `${note.title.replace(/[^a-z0-9]/gi, '_')}.json`;
        break;
      
      case 'markdown':
        exportData = `# ${note.title}\n\n**Subject:** ${note.subject || 'N/A'}\n**Professor:** ${note.professor || 'N/A'}\n**Date:** ${note.createdAt.toLocaleDateString()}\n\n## Summary\n${note.summary || 'No summary available'}\n\n## Key Points\n${note.keyPoints.map(point => `- ${point}`).join('\n')}\n\n## Content\n${note.content}`;
        contentType = 'text/markdown';
        filename = `${note.title.replace(/[^a-z0-9]/gi, '_')}.md`;
        break;
      
      case 'txt':
        exportData = `Title: ${note.title}\nSubject: ${note.subject || 'N/A'}\nProfessor: ${note.professor || 'N/A'}\nDate: ${note.createdAt.toLocaleDateString()}\n\nSUMMARY:\n${note.summary || 'No summary available'}\n\nKEY POINTS:\n${note.keyPoints.map(point => `- ${point}`).join('\n')}\n\nCONTENT:\n${note.content}`;
        contentType = 'text/plain';
        filename = `${note.title.replace(/[^a-z0-9]/gi, '_')}.txt`;
        break;
      
      default:
        return res.status(400).json({ error: 'Unsupported export format' });
    }

    res.setHeader('Content-Type', contentType);
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    res.send(exportData);
  } catch (error) {
    console.error('Error exporting note:', error);
    res.status(500).json({ error: 'Failed to export note' });
  }
});

// Get note statistics
router.get('/stats/overview', (req, res) => {
  try {
    const notes = Array.from(global.notes.values());
    
    const stats = {
      totalNotes: notes.length,
      subjects: [...new Set(notes.map(n => n.subject).filter(Boolean))],
      professors: [...new Set(notes.map(n => n.professor).filter(Boolean))],
      totalKeyPoints: notes.reduce((sum, note) => sum + note.keyPoints.length, 0),
      averageKeyPoints: notes.length > 0 ? notes.reduce((sum, note) => sum + note.keyPoints.length, 0) / notes.length : 0,
      recentNotes: notes
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 5)
    };

    res.json({ stats });
  } catch (error) {
    console.error('Error getting note statistics:', error);
    res.status(500).json({ error: 'Failed to get note statistics' });
  }
});

module.exports = router; 