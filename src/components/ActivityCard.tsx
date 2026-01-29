import { useRef, useState } from 'react';
import { toPng } from 'html-to-image';
import type { Activity, Mood } from '../types';
import { Button } from './ui/Button';
import { Card } from './ui/Card';
import { Share2, Check, Loader2, RefreshCcw } from 'lucide-react';
import { cn } from '../lib/utils'; // Keep this import, it is used below!

interface ActivityCardProps {
    activity: Activity;
    onComplete: () => void;
    onReroll: () => void;
    rerollsLeft: number;
    userNote?: string; // Optional thinking note
    selectedTime?: number; // The specific time user chose
    selectedMood?: Mood | null;
}

const MOOD_GLOW_MAP: Record<string, string> = {
    happy: 'from-orange-200 to-yellow-100',
    sad: 'from-indigo-200 to-blue-100',
    anxious: 'from-amber-200 to-orange-100',
    bored: 'from-slate-200 to-gray-100',
    surprise: 'from-violet-200 to-fuchsia-100',
    calm: 'from-emerald-200 to-teal-100',

    // Fallback logic
    mind: 'from-blue-200 to-sky-100',
    move: 'from-emerald-200 to-green-100'
};

export function ActivityCard({ activity, onComplete, onReroll, rerollsLeft, userNote: _userNote, selectedTime, selectedMood }: ActivityCardProps) {
    const cardRef = useRef<HTMLDivElement>(null);
    const [isSharing, setIsSharing] = useState(false);

    // Get glow color based on mood, fallback to mode
    const glowGradient = (selectedMood && MOOD_GLOW_MAP[selectedMood]) || (activity.mode === 'mind' ? 'from-blue-200 to-sky-100' : 'from-emerald-200 to-green-100');

    // Simple Noise SVG Data URI (Adjusted for visibility: Coarser grain, higher opacity)
    const noiseBg = `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.5'/%3E%3C/svg%3E")`;

    const MOOD_BRUSH_COLORS: Record<string, string> = {
        happy: 'bg-amber-200',
        sad: 'bg-blue-200',
        anxious: 'bg-orange-200',
        calm: 'bg-emerald-200',
        bored: 'bg-slate-200',
        surprise: 'bg-violet-200',
    };

    const brushColor = selectedMood ? MOOD_BRUSH_COLORS[selectedMood] : (activity.mode === 'mind' ? 'bg-blue-200' : 'bg-emerald-200');
    const isMind = activity.mode === 'mind';

    const handleShare = async () => {
        if (cardRef.current === null) {
            return;
        }

        setIsSharing(true);

        try {
            // Temporarily show watermark for capture if needed, or structured differently
            // Ideally we would clone the node or have a hidden 'share view', but for MVP
            // let's just capture the current card.

            const dataUrl = await toPng(cardRef.current, { cacheBust: true, backgroundColor: 'transparent' });

            // Check for Web Share API
            if (navigator.share) {
                const blob = await (await fetch(dataUrl)).blob();
                const file = new File([blob], 'tiny-milestone.png', { type: blob.type });
                await navigator.share({
                    title: 'My Tiny Milestone',
                    text: `Made in Lo’s Workspace: ${activity.title}`,
                    files: [file],
                });
            } else {
                // Fallback to download
                const link = document.createElement('a');
                link.download = 'tiny-milestone.png';
                link.href = dataUrl;
                link.click();
            }
        } catch (err) {
            console.error('oops, something went wrong!', err);
        } finally {
            setIsSharing(false);
        }
    };

    return (
        <div className="flex flex-col gap-8 w-full"> {/* Increased gap to 8 (32px) */}
            <div className="relative w-full group/card">
                <Card ref={cardRef} className="p-8 flex flex-col items-center text-center gap-6 bg-white/96 relative overflow-hidden shadow-[var(--shadow-premium)] hover:shadow-xl hover:-translate-y-1 border-slate-900/5 transition-all duration-500 ease-out backdrop-blur-sm">

                    {/* 1. Paper Grain Overlay (Static, ~6% opacity) */}
                    <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.12] mix-blend-multiply" style={{ backgroundImage: noiseBg }}></div>

                    {/* Logic Split: Mind (Brush) vs Move (Standard Glow) */}
                    {isMind ? (
                        /* Mind: Mood-Colored Brush on LEFT Corner (Updated: Left side + High Opacity) */
                        /* 
                           IMPLEMENTATION NOTE: 
                           We use 'bg-blend-screen' to colorize the black-on-white 'brush.png' to the specific mood color (e.g., bg-orange-200).
                           We then use 'mix-blend-multiply' to knock out the white background, leaving only the colored brush shape visible on the card.
                           'background-size: 100% 100%' is critical to ensure the image covers the background color completely, preventing solid colored boxes.
                        */
                        <div
                            className={cn(
                                "absolute -top-[50px] -left-[50px] w-[350px] h-[350px] pointer-events-none z-0 mix-blend-multiply bg-blend-screen opacity-80",
                                brushColor
                            )}
                            style={{
                                backgroundImage: "url('/brush.png')",
                                backgroundSize: "100% 100%",
                                backgroundRepeat: "no-repeat",
                                // transform: "scaleX(-1)" // Removed flip for left side natural orientation
                            }}
                        />
                    ) : (
                        /* Move: Standard Mood Glow (Palette) on Right Corner */
                        <div className={cn("absolute -top-24 -right-24 w-64 h-64 rounded-full blur-3xl opacity-30 pointer-events-none z-0 transition-colors duration-500 bg-gradient-to-br", glowGradient)} />
                    )}

                    {/* 3. Bottom Gradient/Glow (Subtle anchoring) */}
                    <div className={cn("absolute -bottom-10 inset-x-0 h-32 blur-3xl opacity-10 pointer-events-none z-0 transition-colors duration-500 bg-gradient-to-t", glowGradient)} />


                    <div className="z-10 flex flex-col items-center gap-4 relative">
                        <span className={cn("text-[11px] font-bold uppercase tracking-widest px-3 py-1 rounded-full border border-opacity-20 backdrop-blur-md",
                            activity.mode === 'mind'
                                ? 'bg-blue-50/80 text-blue-600 border-blue-200'
                                : 'bg-emerald-50/80 text-emerald-600 border-emerald-200'
                        )}>
                            {activity.mode} • {selectedTime || activity.minutes[0]} min
                        </span>
                        <h2 className="text-[28px] font-serif font-medium text-slate-800 leading-tight tracking-tight">{activity.title}</h2>
                    </div>

                    <p className="text-lg text-slate-500 font-normal leading-relaxed max-w-sm z-10 relative">
                        {activity.prompt}
                    </p>

                    {/* Watermark for Share */}
                    {/* Watermark for Share */}
                    <div className="mt-8 pt-6 border-t border-slate-900/[0.03] w-full flex justify-center items-center gap-2 text-[10px] text-slate-400 font-medium z-10">
                        Made in Lo’s Workspace
                    </div>
                </Card>

                {/* Floating Retry Button - Outside Card, Overlapping Corner */}
                {rerollsLeft > 0 && (
                    <button
                        onClick={onReroll}
                        className="absolute -top-3 -right-3 p-3 rounded-full bg-white border border-slate-100 shadow-lg text-slate-400 hover:text-primary-accent hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-300 z-30 flex items-center justify-center opacity-0 group-hover/card:opacity-100 focus:opacity-100"
                        title="Try another"
                        aria-label="Try another activity"
                    >
                        <RefreshCcw className="w-4 h-4" />
                    </button>
                )}
            </div>

            {/* Action Buttons Stack */}
            <div className="flex flex-col gap-3 w-full px-2">
                {/* 1. Primary: I did it */}
                <Button size="lg" onClick={onComplete} className="w-full flex gap-2 text-base font-semibold shadow-lg shadow-primary-accent/20 hover:shadow-primary-accent/30 hover:-translate-y-0.5 transition-all mb-2">
                    <Check className="w-5 h-5" /> I did it!
                </Button>

                {/* 2. Secondary: Share */}

                {/* 3. Tertiary: Share */}
                <Button variant="soft" onClick={handleShare} disabled={isSharing} className="w-full flex gap-2 text-slate-500 hover:text-slate-700 h-12 border-transparent bg-transparent shadow-none hover:bg-white/50 hover:shadow-sm">
                    {isSharing ? <Loader2 className="w-4 h-4 animate-spin" /> : <Share2 className="w-4 h-4" />}
                    Share card
                </Button>
            </div>
        </div>
    );
}
