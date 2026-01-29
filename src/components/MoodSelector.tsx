import React from 'react';
import type { Mood } from '../types';
import { Smile, Zap, Cloud, Coffee, Sparkles, Check, Meh } from 'lucide-react';
import { cn } from '../lib/utils';
import { MOOD_STYLES } from '../lib/theme';

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

export function MoodSelector({ onSelect, selectedMood }: MoodSelectorProps) {
    return (
        <div className="grid grid-cols-2 gap-4">
            {moods.map((m) => {
                const isSelected = selectedMood === m.id;
                const style = MOOD_STYLES[m.id];

                return (
                    <button
                        key={m.id}
                        onClick={() => onSelect(m.id)}
                        className={cn(
                            "relative p-6 rounded-[24px] border transition-all duration-300 flex flex-col items-center gap-4 group outline-none",
                            "bg-white", // Solid white base

                            // Base Border: Light Slate (10%)
                            "border-slate-900/10",

                            // Shadows
                            "shadow-[var(--shadow-premium)]",

                            // Interactions (Lift + Deepen Shadow)
                            "hover:-translate-y-[1px] hover:shadow-[var(--shadow-premium-hover)]",
                            "active:scale-[0.99] active:shadow-sm",

                            // Focus State
                            "focus-visible:ring-2 focus-visible:ring-primary-accent focus-visible:ring-offset-2",

                            // Interactions
                            "hover:border-slate-900/15",

                            // RING GLOW
                            isSelected
                                ? cn("ring-2 ring-offset-0", style.ring)
                                : cn("hover:ring-2 hover:ring-offset-0", style.hoverRing)
                        )}
                    >
                        {/* 🎨 TINT LAYER (Absolute Overlay) */}
                        <div className={cn(
                            "absolute inset-0 rounded-[24px] transition-opacity duration-300 pointer-events-none",
                            style.tint,
                            isSelected ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                        )} />

                        {/* Checkmark Badge */}
                        {isSelected && (
                            <div className="absolute top-3 right-3 w-6 h-6 bg-primary-accent rounded-full flex items-center justify-center text-white animate-fade-in shadow-sm z-10">
                                <Check className="w-3.5 h-3.5" strokeWidth={3} />
                            </div>
                        )}

                        {/* Icon Container */}
                        <div className={cn(
                            "p-4 rounded-full transition-colors duration-300 z-10 relative",
                            style.bg,
                            style.text
                        )}>
                            <m.icon className="w-7 h-7" strokeWidth={2} />
                        </div>

                        <span className={cn(
                            "font-medium text-[15px] tracking-wide z-10 relative",
                            isSelected ? "text-primary-DEFAULT font-semibold" : "text-secondary-DEFAULT"
                        )}>
                            {m.label}
                        </span>
                    </button>
                );
            })}
        </div>
    );
}
