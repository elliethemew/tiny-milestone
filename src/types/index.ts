export type Mood =
    | 'sad'
    | 'bored'
    | 'anxious'
    | 'happy'
    | 'calm'
    | 'surprise';

export interface Activity {
    id: string;
    title: string;
    prompt: string;
    mode: 'mind' | 'move';
    minutes: number[]; // Supported durations: 5, 10, 30, 60
    moods: Mood[]; // Which moods this activity is good for
}

export interface ReflectionLog {
    id: string;
    activityId: string;
    timestamp: number;
    moodBefore: Mood;
    moodAfter?: string; // from "How do you feel now?"
    note?: string; // Optional "Thinking" note if saved
}

export interface AppState {
    history: ReflectionLog[];
    lastCompletedIds: string[]; // Keep last 5 to avoid repeats
}
