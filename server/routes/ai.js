const express = require('express');
const aiProcessor = require('../services/aiProcessor');
const router = express.Router();

// Summarize text content
router.post('/summarize', async (req, res) => {
  try {
    const { text, subject, maxLength } = req.body;

    if (!text) {
      return res.status(400).json({ error: 'Text content is required' });
    }

    const summary = await aiProcessor.summarizeText(text, subject, maxLength);
    
    res.json({
      success: true,
      summary,
      originalLength: text.length,
      summaryLength: summary.length,
      compressionRatio: ((text.length - summary.length) / text.length * 100).toFixed(1)
    });
  } catch (error) {
    console.error('Error summarizing text:', error);
    res.status(500).json({ error: 'Failed to summarize text' });
  }
});

// Classify content type
router.post('/classify', async (req, res) => {
  try {
    const { text, subject } = req.body;

    if (!text) {
      return res.status(400).json({ error: 'Text content is required' });
    }

    const classification = await aiProcessor.classifyContent(text, subject);
    
    res.json({
      success: true,
      classification,
      confidence: classification.confidence
    });
  } catch (error) {
    console.error('Error classifying content:', error);
    res.status(500).json({ error: 'Failed to classify content' });
  }
});

// Extract key concepts
router.post('/extract', async (req, res) => {
  try {
    const { text, subject, maxConcepts } = req.body;

    if (!text) {
      return res.status(400).json({ error: 'Text content is required' });
    }

    const concepts = await aiProcessor.extractKeyConcepts(text, subject, maxConcepts);
    
    res.json({
      success: true,
      concepts,
      totalConcepts: concepts.length
    });
  } catch (error) {
    console.error('Error extracting concepts:', error);
    res.status(500).json({ error: 'Failed to extract concepts' });
  }
});

// Process key point from speech
router.post('/key-point', async (req, res) => {
  try {
    const { transcript, subject, context } = req.body;

    if (!transcript) {
      return res.status(400).json({ error: 'Transcript is required' });
    }

    const result = await aiProcessor.processKeyPoint(transcript, subject, context);
    
    res.json({
      success: true,
      summary: result.summary,
      keyConcepts: result.keyConcepts,
      importance: result.importance,
      relatedTopics: result.relatedTopics
    });
  } catch (error) {
    console.error('Error processing key point:', error);
    res.status(500).json({ error: 'Failed to process key point' });
  }
});

// Generate study questions
router.post('/study-questions', async (req, res) => {
  try {
    const { content, subject, difficulty, count } = req.body;

    if (!content) {
      return res.status(400).json({ error: 'Content is required' });
    }

    const questions = await aiProcessor.generateStudyQuestions(content, subject, difficulty, count);
    
    res.json({
      success: true,
      questions,
      totalQuestions: questions.length,
      difficulty: difficulty || 'medium'
    });
  } catch (error) {
    console.error('Error generating study questions:', error);
    res.status(500).json({ error: 'Failed to generate study questions' });
  }
});

// Answer questions about content
router.post('/qa', async (req, res) => {
  try {
    const { question, content, subject } = req.body;

    if (!question || !content) {
      return res.status(400).json({ error: 'Question and content are required' });
    }

    const answer = await aiProcessor.answerQuestion(question, content, subject);
    
    res.json({
      success: true,
      question,
      answer: answer.answer,
      confidence: answer.confidence,
      sources: answer.sources
    });
  } catch (error) {
    console.error('Error answering question:', error);
    res.status(500).json({ error: 'Failed to answer question' });
  }
});

// Generate flashcards
router.post('/flashcards', async (req, res) => {
  try {
    const { content, subject, count } = req.body;

    if (!content) {
      return res.status(400).json({ error: 'Content is required' });
    }

    const flashcards = await aiProcessor.generateFlashcards(content, subject, count);
    
    res.json({
      success: true,
      flashcards,
      totalCards: flashcards.length
    });
  } catch (error) {
    console.error('Error generating flashcards:', error);
    res.status(500).json({ error: 'Failed to generate flashcards' });
  }
});

// Analyze lecture structure
router.post('/analyze-lecture', async (req, res) => {
  try {
    const { transcript, subject, professor } = req.body;

    if (!transcript) {
      return res.status(400).json({ error: 'Transcript is required' });
    }

    const analysis = await aiProcessor.analyzeLectureStructure(transcript, subject, professor);
    
    res.json({
      success: true,
      analysis: {
        topics: analysis.topics,
        timeDistribution: analysis.timeDistribution,
        keyInsights: analysis.keyInsights,
        suggestedStructure: analysis.suggestedStructure
      }
    });
  } catch (error) {
    console.error('Error analyzing lecture:', error);
    res.status(500).json({ error: 'Failed to analyze lecture' });
  }
});

// Generate note template
router.post('/note-template', async (req, res) => {
  try {
    const { subject, topic, style } = req.body;

    if (!subject || !topic) {
      return res.status(400).json({ error: 'Subject and topic are required' });
    }

    const template = await aiProcessor.generateNoteTemplate(subject, topic, style);
    
    res.json({
      success: true,
      template: {
        structure: template.structure,
        sections: template.sections,
        suggestedContent: template.suggestedContent
      }
    });
  } catch (error) {
    console.error('Error generating note template:', error);
    res.status(500).json({ error: 'Failed to generate note template' });
  }
});

// Improve note quality
router.post('/improve-note', async (req, res) => {
  try {
    const { content, subject, improvements } = req.body;

    if (!content) {
      return res.status(400).json({ error: 'Content is required' });
    }

    const improvedNote = await aiProcessor.improveNote(content, subject, improvements);
    
    res.json({
      success: true,
      originalContent: content,
      improvedContent: improvedNote.content,
      improvements: improvedNote.improvements,
      suggestions: improvedNote.suggestions
    });
  } catch (error) {
    console.error('Error improving note:', error);
    res.status(500).json({ error: 'Failed to improve note' });
  }
});

// Get AI processing statistics
router.get('/stats', (req, res) => {
  try {
    // This would typically come from a database
    const stats = {
      totalProcessed: 0,
      averageProcessingTime: 0,
      successRate: 0,
      popularSubjects: [],
      processingHistory: []
    };

    res.json({ stats });
  } catch (error) {
    console.error('Error getting AI stats:', error);
    res.status(500).json({ error: 'Failed to get AI statistics' });
  }
});

module.exports = router; 