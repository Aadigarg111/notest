import React, { useEffect, useState } from 'react';
import api from '../services/api';

interface Note {
  id: string;
  title: string;
  content: string;
  subject?: string;
  professor?: string;
  createdAt?: string;
}

const NotesPage: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    api.get('/api/notes')
      .then(res => {
        setNotes(res.data.notes || []);
        setLoading(false);
      })
      .catch(err => {
        setError('Failed to fetch notes');
        setLoading(false);
      });
  }, []);

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Smart Notes</h1>
      <div className="card">
        {loading && <p className="text-gray-300">Loading notes...</p>}
        {error && <p className="text-red-400">{error}</p>}
        {!loading && !error && notes.length === 0 && (
          <p className="text-gray-300">No notes found.</p>
        )}
        {!loading && !error && notes.length > 0 && (
          <ul className="divide-y divide-dark-700">
            {notes.map(note => (
              <li key={note.id} className="py-4">
                <div className="font-semibold text-lg text-primary-400">{note.title}</div>
                <div className="text-gray-300 text-sm mb-1">{note.subject} {note.professor && `| ${note.professor}`}</div>
                <div className="text-gray-400 text-xs mb-2">{note.createdAt && new Date(note.createdAt).toLocaleString()}</div>
                <div className="text-gray-200 whitespace-pre-line">{note.content}</div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default NotesPage; 