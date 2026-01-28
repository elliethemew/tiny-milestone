import { useRef, useState } from 'react';
import { toPng } from 'html-to-image';
import type { Activity } from '../types';
import { Button } from './ui/Button';
import { Card } from './ui/Card';
import { Share2, Check, Loader2 } from 'lucide-react';
import { cn } from '../lib/utils'; // Keep this import, it is used below!

interface ActivityCardProps {
    activity: Activity;
    onComplete: () => void;

    userNote?: string; // Optional thinking note
    selectedTime?: number; // The specific time user chose
}

export function ActivityCard({ activity, onComplete, userNote: _userNote, selectedTime }: ActivityCardProps) {
    const cardRef = useRef<HTMLDivElement>(null);
    const [isSharing, setIsSharing] = useState(false);
    // const [includeNote, setIncludeNote] = useState(false); // Reserved for future iteration

    const handleShare = async () => {
        if (cardRef.current === null) {
            return;
        }

        setIsSharing(true);

        try {
            // Temporarily show watermark for capture if needed, or structured differently
            // Ideally we would clone the node or have a hidden 'share view', but for MVP
            // let's just capture the current card.

            const dataUrl = await toPng(cardRef.current, { cacheBust: true, backgroundColor: '#ffffff' });

            // Check for Web Share API
            if (navigator.share) {
                const blob = await (await fetch(dataUrl)).blob();
                const file = new File([blob], 'tiny-milestone.png', { type: blob.type });
                await navigator.share({
                    title: 'My Tiny Milestone',
                    text: `I just did a tiny milestone: ${activity.title}`,
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
        <div className="flex flex-col gap-4 w-full">
            <Card ref={cardRef} className="p-8 flex flex-col items-center text-center gap-6 bg-white relative overflow-hidden">
                {/* Decorative background circle */}
                <div className={cn("absolute -top-20 -right-20 w-40 h-40 rounded-full opacity-10",
                    activity.mode === 'mind' ? 'bg-blue-500' : 'bg-green-500'
                )} />

                <div className="z-10 flex flex-col items-center gap-2">
                    <span className={cn("text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full",
                        activity.mode === 'mind' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'
                    )}>
                        {activity.mode} • {selectedTime || activity.minutes[0]} min
                    </span>
                    <h2 className="text-2xl font-bold text-gray-900 mt-2">{activity.title}</h2>
                </div>

                <p className="text-lg text-gray-600 leading-relaxed max-w-sm z-10">
                    {activity.prompt}
                </p>

                {/* Note is hidden by default in UI, but could be toggled for share view if we had a preview mode. 
            For now, let's keep it simple: The note is NOT shown on the main card to keep it clean, 
            so it won't be in the screenshot unless we explicitly add it. 
            We'll stick to MVP requirement: Note not included by default.
        */}

                {/* Watermark for Share (Visible but subtle, usually you'd want this only on export) */}
                {/* We can make it visible only when a special class is added during capture, 
            but for MVP simplicity, let's add a small footer. */}
                <div className="mt-8 pt-4 border-t border-gray-100 w-full flex justify-center text-xs text-gray-400">
                    tiny milestone
                </div>
            </Card>

            {/* Action Buttons */}
            <div className="w-full flex justify-center">
                <Button variant="outline" onClick={handleShare} disabled={isSharing} className="flex gap-2 w-full justify-center">
                    {isSharing ? <Loader2 className="w-4 h-4 animate-spin" /> : <Share2 className="w-4 h-4" />}
                    Do with a friend?
                </Button>
            </div>

            <Button size="lg" onClick={onComplete} className="w-full flex gap-2 text-lg shadow-md animate-slide-up">
                <Check className="w-5 h-5" /> I did it!
            </Button>
        </div>
    );
}
