import { useCallback } from 'react';
import type { Activity, Mood } from '../types';
import { ACTIVITIES } from '../data/activities';
import { useLocalStorage } from './useLocalStorage';

export function useActivitySuggestion() {
    const [completedIds, setCompletedIds] = useLocalStorage<string[]>('tiny-milestone-completed', []);

    const getRandomActivity = useCallback((
        mood: Mood,
        mode: 'mind' | 'move',
        minutes: number
    ): Activity | null => {

        // Filter by Mode
        let valid = ACTIVITIES.filter(a => a.mode === mode);

        // Filter by Mood (unless "surprise")
        if (mood !== 'surprise') {
            valid = valid.filter(a => a.moods.includes(mood));
        }

        // STRICT Time Filtering Strategy:
        // 1. Try to find activities that match the exact duration requested.
        // 2. If none, find activities that are SHORTER (because you can always do a 5m task in 60m).
        // 3. User specifically asked "Make sure the time user chose would be consistent with the result".
        //    So if they pick 60m, we should prioritize 60m tasks.

        // First, try exact match or close to it (e.g. if 60, find 60 or 30).
        const exactMatches = valid.filter(a => a.minutes.includes(minutes));

        let pool = exactMatches;

        // If no exact matches, look for shorter ones only if needed, 
        // BUT since we added 60m activities, we should find matches.
        // If user picks 30m, and we only have 5m tasks, that's okay, but better to match relative size.
        if (pool.length === 0) {
            // Fallback: Anything that fits within the time frame
            pool = valid.filter(a => a.minutes.some(m => m <= minutes));
        }

        // Filter out recently completed (last 5)
        const nonRepeated = pool.filter(a => !completedIds.includes(a.id));

        // If we filtered out everything due to history, reset to pool
        const finalPool = nonRepeated.length > 0 ? nonRepeated : pool;

        if (finalPool.length === 0) return null;

        const randomIndex = Math.floor(Math.random() * finalPool.length);
        return finalPool[randomIndex];
    }, [completedIds]);

    const markCompleted = useCallback((id: string) => {
        setCompletedIds(prev => {
            const newHistory = [id, ...prev];
            return newHistory.slice(0, 5); // Keep only last 5
        });
    }, [setCompletedIds]);

    return { getRandomActivity, markCompleted };
}
