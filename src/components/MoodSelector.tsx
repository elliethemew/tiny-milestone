import React from 'react';
import type { Mood } from '../types';
import { Smile, Zap, Cloud, Coffee, Sparkles, Check, Meh } from 'lucide-react';
import { cn } from '../lib/utils';

interface MoodSelectorProps {
    onSelect: (mood: Mood) => void;
    selectedMood?: Mood | null;
}

const moods: { id: Mood; label: string; icon: React.ElementType }[] = [
    { id: 'happy', label: 'Happy', icon: Smile },
    { id: 'sad', label: 'Sad', icon: Cloud }, // Using Cloud for sad/gloom
    { id: 'anxious', label: 'Anxious', icon: Zap },
    { id: 'calm', label: 'Calm', icon: Coffee }, // Coffee/Tea for calm
    { id: 'bored', label: 'Bored', icon: Meh },
    { id: 'surprise', label: 'Surprise Me', icon: Sparkles },
];

const moodStyles = {
    happy: {
        border: 'border-yellow-400',
        ring: 'ring-yellow-200',
        text: 'text-yellow-700',
        bg: 'bg-yellow-50',
        hoverBorder: 'hover:border-yellow-400',
        hoverBg: 'hover:bg-yellow-50',
    },
    sad: {
        border: 'border-blue-400',
        ring: 'ring-blue-200',
        text: 'text-blue-700',
        bg: 'bg-blue-50',
        hoverBorder: 'hover:border-blue-400',
        hoverBg: 'hover:bg-blue-50',
    },
    anxious: {
        border: 'border-amber-400',
        ring: 'ring-amber-200',
        text: 'text-amber-700',
        bg: 'bg-amber-50',
        hoverBorder: 'hover:border-amber-400',
        hoverBg: 'hover:bg-amber-50',
    },
    calm: {
        border: 'border-emerald-400',
        ring: 'ring-emerald-200',
        text: 'text-emerald-700',
        bg: 'bg-emerald-50',
        hoverBorder: 'hover:border-emerald-400',
        hoverBg: 'hover:bg-emerald-50',
    },
    bored: {
        border: 'border-gray-400',
        ring: 'ring-gray-200',
        text: 'text-gray-700',
        bg: 'bg-gray-50',
        hoverBorder: 'hover:border-gray-400',
        hoverBg: 'hover:bg-gray-50',
    },
    surprise: {
        border: 'border-indigo-400',
        ring: 'ring-indigo-200',
        text: 'text-indigo-700',
        bg: 'bg-indigo-50',
        hoverBorder: 'hover:border-indigo-400',
        hoverBg: 'hover:bg-indigo-50',
    },
};

export function MoodSelector({ onSelect, selectedMood }: MoodSelectorProps) {
    return (
        <div className="grid grid-cols-2 gap-4">
            {moods.map((m) => {
                const isSelected = selectedMood === m.id;
                const style = moodStyles[m.id];

                return (
                    <button
                        key={m.id}
                        onClick={() => onSelect(m.id)}
                        className={cn(
                            "relative p-6 rounded-[24px] border transition-all duration-200 flex flex-col items-center gap-4 group focus:outline-none focus:ring-4 focus:ring-opacity-50", // Increased padding to p-6, gap-4

                            // Micro-interactions
                            "hover:-translate-y-1 hover:shadow-md active:scale-[0.98]",

                            // Focus State (Accessibility)
                            isSelected ? style.ring : "focus:ring-primary-accent/20",

                            // Selection & Hover State
                            isSelected
                                ? cn("border-2 bg-white shadow-md", style.border) // Mood-specific border
                                : cn("border-border bg-surface shadow-sm", style.hoverBorder, style.hoverBg) // Default: Soft border + Mood Hover Effect
                        )}
                    >
                        {/* Checkmark Badge (Teal or Mood Color? User said check can stay teal or match mood. Let's match mood for fun, or teal for consistency? User said 'check badge can stay teal'. Sticking to teal for CTA consistency) */}
                        {isSelected && (
                            <div className="absolute top-3 right-3 w-6 h-6 bg-primary-accent rounded-full flex items-center justify-center text-white animate-fade-in shadow-sm">
                                <Check className="w-3.5 h-3.5" strokeWidth={3} />
                            </div>
                        )}

                        {/* Icon Container - Consistent Circles */}
                        <div className={cn(
                            "p-4 rounded-full transition-colors duration-300", // rounded-full for circles
                            style.bg,
                            style.text
                        )}>
                            <m.icon className="w-7 h-7" strokeWidth={2} /> {/* Slightly larger icons */}
                        </div>

                        <span className={cn(
                            "font-semibold text-sm tracking-wide",
                            isSelected ? "text-primary-DEFAULT" : "text-secondary-DEFAULT"
                        )}>
                            {m.label}
                        </span>
                    </button>
                );
            })}
        </div>
    );
}
