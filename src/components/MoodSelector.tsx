import React from 'react';
import type { Mood } from '../types';
import { Smile, Meh, Zap, Cloud, Coffee, Sparkles } from 'lucide-react';

interface MoodSelectorProps {
    onSelect: (mood: Mood) => void;
}

const moods: { id: Mood; label: string; icon: React.ReactNode; color: string }[] = [
    { id: 'sad', label: 'Sad', icon: <Cloud className="w-5 h-5" />, color: 'bg-blue-100 text-blue-700 hover:bg-blue-200' },
    { id: 'bored', label: 'Bored', icon: <Coffee className="w-5 h-5" />, color: 'bg-gray-100 text-gray-700 hover:bg-gray-200' },
    { id: 'anxious', label: 'Anxious', icon: <Zap className="w-5 h-5" />, color: 'bg-amber-100 text-amber-700 hover:bg-amber-200' },
    { id: 'happy', label: 'Happy', icon: <Smile className="w-5 h-5" />, color: 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200' },
    { id: 'calm', label: 'Calm', icon: <Meh className="w-5 h-5" />, color: 'bg-green-100 text-green-700 hover:bg-green-200' },
    { id: 'surprise', label: 'Surprise Me', icon: <Sparkles className="w-5 h-5" />, color: 'bg-purple-100 text-purple-700 hover:bg-purple-200' },
];

export function MoodSelector({ onSelect }: MoodSelectorProps) {
    return (
        <div className="grid grid-cols-2 gap-3">
            {moods.map((mood) => (
                <button
                    key={mood.id}
                    onClick={() => onSelect(mood.id)}
                    className={`
            relative flex flex-col items-center justify-center p-6 rounded-3xl transition-all duration-200
            hover:scale-[1.02] active:scale-95
            ${mood.color}
          `}
                >
                    <div className="mb-2">{mood.icon}</div>
                    <span className="font-medium text-sm">{mood.label}</span>
                </button>
            ))}
        </div>
    );
}
