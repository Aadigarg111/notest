const OpenAI = require('openai');

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

class AIProcessor {
  constructor() {
    this.model = 'gpt-4';
    this.maxTokens = 2000;
  }

  // Summarize text content
  async summarizeText(text, subject = null, maxLength = 500) {
    try {
      const prompt = `Summarize the following ${subject ? subject + ' ' : ''}content in a clear, concise manner. Focus on key concepts and important points. Keep the summary under ${maxLength} characters.

Content:
${text}

Summary:`;

      const response = await openai.chat.completions.create({
        model: this.model,
        messages: [
          {
            role: 'system',
            content: 'You are an expert educational assistant that creates clear, concise summaries of academic content. Focus on key concepts and important points.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        max_tokens: this.maxTokens,
        temperature: 0.3
      });

      return response.choices[0].message.content.trim();
    } catch (error) {
      console.error('Error in summarizeText:', error);
      throw new Error('Failed to summarize text');
    }
  }

  // Classify content type
  async classifyContent(text, subject = null) {
    try {
      const prompt = `Classify the following ${subject ? subject + ' ' : ''}content into one of these categories:
- Definition: Explains a concept or term
- Example: Provides an example or case study
- Theory: Presents a theory or framework
- Process: Describes a step-by-step process
- Comparison: Compares different concepts
- Summary: Summarizes previous content
- Question: Asks a question or raises an issue
- Other: Doesn't fit other categories

Content:
${text}

Classification:`;

      const response = await openai.chat.completions.create({
        model: this.model,
        messages: [
          {
            role: 'system',
            content: 'You are an expert at classifying educational content. Respond with only the category name.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        max_tokens: 50,
        temperature: 0.1
      });

      const classification = response.choices[0].message.content.trim();
      
      return {
        type: classification,
        confidence: 0.9, // Mock confidence score
        subject: subject
      };
    } catch (error) {
      console.error('Error in classifyContent:', error);
      throw new Error('Failed to classify content');
    }
  }

  // Extract key concepts
  async extractKeyConcepts(text, subject = null, maxConcepts = 10) {
    try {
      const prompt = `Extract the key concepts and important terms from the following ${subject ? subject + ' ' : ''}content. Return them as a JSON array of strings.

Content:
${text}

Key concepts:`;

      const response = await openai.chat.completions.create({
        model: this.model,
        messages: [
          {
            role: 'system',
            content: 'You are an expert at extracting key concepts from educational content. Return only a JSON array of concept strings.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        max_tokens: this.maxTokens,
        temperature: 0.2
      });

      const conceptsText = response.choices[0].message.content.trim();
      
      // Try to parse as JSON, fallback to simple extraction
      try {
        const concepts = JSON.parse(conceptsText);
        return Array.isArray(concepts) ? concepts.slice(0, maxConcepts) : [];
      } catch {
        // Fallback: extract concepts from text
        const lines = conceptsText.split('\n').filter(line => line.trim());
        return lines.slice(0, maxConcepts);
      }
    } catch (error) {
      console.error('Error in extractKeyConcepts:', error);
      throw new Error('Failed to extract key concepts');
    }
  }

  // Process key point from speech
  async processKeyPoint(transcript, subject = null, context = null) {
    try {
      const prompt = `Analyze this key point from a ${subject ? subject + ' ' : ''}lecture and provide:
1. A concise summary
2. Key concepts mentioned
3. Importance level (high/medium/low)
4. Related topics

Transcript: ${transcript}
${context ? `Context: ${context}` : ''}

Provide the response as JSON with keys: summary, keyConcepts, importance, relatedTopics`;

      const response = await openai.chat.completions.create({
        model: this.model,
        messages: [
          {
            role: 'system',
            content: 'You are an expert at analyzing educational content. Return only valid JSON.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        max_tokens: this.maxTokens,
        temperature: 0.3
      });

      const resultText = response.choices[0].message.content.trim();
      
      try {
        return JSON.parse(resultText);
      } catch {
        // Fallback response
        return {
          summary: transcript,
          keyConcepts: [],
          importance: 'medium',
          relatedTopics: []
        };
      }
    } catch (error) {
      console.error('Error in processKeyPoint:', error);
      throw new Error('Failed to process key point');
    }
  }

  // Process complete note
  async processNote(content, subject = null) {
    try {
      const prompt = `Analyze this ${subject ? subject + ' ' : ''}note content and provide:
1. A comprehensive summary
2. Key points as bullet points
3. Relevant tags
4. AI insights and suggestions

Content:
${content}

Provide the response as JSON with keys: summary, keyPoints, tags, insights`;

      const response = await openai.chat.completions.create({
        model: this.model,
        messages: [
          {
            role: 'system',
            content: 'You are an expert educational assistant. Return only valid JSON.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        max_tokens: this.maxTokens,
        temperature: 0.3
      });

      const resultText = response.choices[0].message.content.trim();
      
      try {
        return JSON.parse(resultText);
      } catch {
        // Fallback response
        return {
          summary: await this.summarizeText(content, subject),
          keyPoints: [],
          tags: [],
          insights: []
        };
      }
    } catch (error) {
      console.error('Error in processNote:', error);
      throw new Error('Failed to process note');
    }
  }

  // Generate study questions
  async generateStudyQuestions(content, subject = null, difficulty = 'medium', count = 5) {
    try {
      const prompt = `Generate ${count} ${difficulty} difficulty study questions based on this ${subject ? subject + ' ' : ''}content. Include a mix of question types (multiple choice, short answer, essay).

Content:
${content}

Provide the response as JSON array with objects containing: question, answer, type, difficulty`;

      const response = await openai.chat.completions.create({
        model: this.model,
        messages: [
          {
            role: 'system',
            content: 'You are an expert at creating educational questions. Return only valid JSON.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        max_tokens: this.maxTokens,
        temperature: 0.4
      });

      const resultText = response.choices[0].message.content.trim();
      
      try {
        return JSON.parse(resultText);
      } catch {
        return [];
      }
    } catch (error) {
      console.error('Error in generateStudyQuestions:', error);
      throw new Error('Failed to generate study questions');
    }
  }

  // Answer questions about content
  async answerQuestion(question, content, subject = null) {
    try {
      const prompt = `Answer the following question based on the provided ${subject ? subject + ' ' : ''}content. Provide a detailed, accurate answer.

Content:
${content}

Question: ${question}

Answer:`;

      const response = await openai.chat.completions.create({
        model: this.model,
        messages: [
          {
            role: 'system',
            content: 'You are an expert educational assistant. Provide accurate, detailed answers based on the given content.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        max_tokens: this.maxTokens,
        temperature: 0.3
      });

      return {
        answer: response.choices[0].message.content.trim(),
        confidence: 0.9,
        sources: [content]
      };
    } catch (error) {
      console.error('Error in answerQuestion:', error);
      throw new Error('Failed to answer question');
    }
  }

  // Generate flashcards
  async generateFlashcards(content, subject = null, count = 10) {
    try {
      const prompt = `Create ${count} flashcards based on this ${subject ? subject + ' ' : ''}content. Each flashcard should have a question on the front and answer on the back.

Content:
${content}

Provide the response as JSON array with objects containing: front, back`;

      const response = await openai.chat.completions.create({
        model: this.model,
        messages: [
          {
            role: 'system',
            content: 'You are an expert at creating educational flashcards. Return only valid JSON.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        max_tokens: this.maxTokens,
        temperature: 0.4
      });

      const resultText = response.choices[0].message.content.trim();
      
      try {
        return JSON.parse(resultText);
      } catch {
        return [];
      }
    } catch (error) {
      console.error('Error in generateFlashcards:', error);
      throw new Error('Failed to generate flashcards');
    }
  }

  // Analyze lecture structure
  async analyzeLectureStructure(transcript, subject = null, professor = null) {
    try {
      const prompt = `Analyze this ${subject ? subject + ' ' : ''}lecture transcript and provide:
1. Main topics covered
2. Time distribution across topics
3. Key insights
4. Suggested note structure

Transcript:
${transcript}

Provide the response as JSON with keys: topics, timeDistribution, keyInsights, suggestedStructure`;

      const response = await openai.chat.completions.create({
        model: this.model,
        messages: [
          {
            role: 'system',
            content: 'You are an expert at analyzing lecture structure. Return only valid JSON.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        max_tokens: this.maxTokens,
        temperature: 0.3
      });

      const resultText = response.choices[0].message.content.trim();
      
      try {
        return JSON.parse(resultText);
      } catch {
        return {
          topics: [],
          timeDistribution: {},
          keyInsights: [],
          suggestedStructure: []
        };
      }
    } catch (error) {
      console.error('Error in analyzeLectureStructure:', error);
      throw new Error('Failed to analyze lecture structure');
    }
  }

  // Generate note template
  async generateNoteTemplate(subject, topic, style = 'structured') {
    try {
      const prompt = `Create a note template for ${topic} in ${subject}. The template should be ${style} style.

Provide the response as JSON with keys: structure, sections, suggestedContent`;

      const response = await openai.chat.completions.create({
        model: this.model,
        messages: [
          {
            role: 'system',
            content: 'You are an expert at creating educational note templates. Return only valid JSON.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        max_tokens: this.maxTokens,
        temperature: 0.4
      });

      const resultText = response.choices[0].message.content.trim();
      
      try {
        return JSON.parse(resultText);
      } catch {
        return {
          structure: [],
          sections: [],
          suggestedContent: ''
        };
      }
    } catch (error) {
      console.error('Error in generateNoteTemplate:', error);
      throw new Error('Failed to generate note template');
    }
  }

  // Improve note quality
  async improveNote(content, subject = null, improvements = []) {
    try {
      const prompt = `Improve this ${subject ? subject + ' ' : ''}note content. Focus on: ${improvements.join(', ') || 'clarity, organization, and completeness'}.

Original content:
${content}

Provide the response as JSON with keys: content, improvements, suggestions`;

      const response = await openai.chat.completions.create({
        model: this.model,
        messages: [
          {
            role: 'system',
            content: 'You are an expert at improving educational notes. Return only valid JSON.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        max_tokens: this.maxTokens,
        temperature: 0.3
      });

      const resultText = response.choices[0].message.content.trim();
      
      try {
        return JSON.parse(resultText);
      } catch {
        return {
          content: content,
          improvements: [],
          suggestions: []
        };
      }
    } catch (error) {
      console.error('Error in improveNote:', error);
      throw new Error('Failed to improve note');
    }
  }
}

module.exports = new AIProcessor(); 