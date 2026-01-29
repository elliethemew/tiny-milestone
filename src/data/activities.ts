import type { Activity } from '../types';

export const ACTIVITIES: Activity[] = [
    // MIND Activities
    {
        id: 'mind-grounding',
        title: '5-4-3-2-1 Grounding',
        prompt: 'Name 5 things you see, 4 feel, 3 hear, 2 smell, 1 taste.',
        mode: 'mind',
        minutes: [5],
        moods: ['anxious', 'sad', 'bored']
    },
    {
        id: 'mind-brain-dump',
        title: 'Brain Dump',
        prompt: 'Write down everything worrying you right now. Just list them. Don\'t solve them.',
        mode: 'mind',
        minutes: [5, 10],
        moods: ['anxious', 'sad']
    },
    {
        id: 'mind-gratitude',
        title: 'Gratitude Trio',
        prompt: 'Write down 3 tiny things that happened today that weren\'t terrible.',
        mode: 'mind',
        minutes: [5],
        moods: ['sad', 'bored', 'anxious', 'happy', 'calm']
    },
    {
        id: 'mind-visualisation',
        title: 'Visualisation',
        prompt: 'Close your eyes. Imagine your favorite place. Be there for 3 minutes.',
        mode: 'mind',
        minutes: [5],
        moods: ['calm', 'anxious', 'happy']
    },
    {
        id: 'mind-read',
        title: 'One Page Read',
        prompt: 'Read exactly one page of a book you\'ve been meaning to start or finish.',
        mode: 'mind',
        minutes: [10, 30],
        moods: ['bored', 'calm']
    },
    {
        id: 'mind-box-breath',
        title: 'Box Breathing',
        prompt: 'Inhale 4s, hold 4s, exhale 4s, hold 4s. Repeat for 3 minutes.',
        mode: 'mind',
        minutes: [5],
        moods: ['anxious', 'sad']
    },
    {
        id: 'mind-tiny-plan',
        title: 'Tiny Plan',
        prompt: 'Pick one small task you\'ve been putting off. Break it into 3 tiny steps.',
        mode: 'mind',
        minutes: [10],
        moods: ['anxious', 'sad', 'bored']
    },
    {
        id: 'mind-digital-declutter',
        title: 'Digital Declutter',
        prompt: 'Delete 5 screenshots or photos you don\'t need anymore.',
        mode: 'mind',
        minutes: [10],
        moods: ['bored', 'calm']
    },
    {
        id: 'mind-curiosity',
        title: 'Curiosity Dive',
        prompt: 'Look up a topic you know nothing about. Read the first paragraph of Wikipedia.',
        mode: 'mind',
        minutes: [10],
        moods: ['bored']
    },
    {
        id: 'mind-silence',
        title: 'Silence',
        prompt: 'Sit in silence for 2 minutes. No phone, no music. Just wait.',
        mode: 'mind',
        minutes: [5],
        moods: ['anxious', 'sad']
    },
    {
        id: 'mind-journal',
        title: 'Deep Journaling',
        prompt: 'Write continuously for 20 minutes. Don\'t worry about grammar. Just empty your mind.',
        mode: 'mind',
        minutes: [30, 60],
        moods: ['sad', 'anxious']
    },
    {
        id: 'mind-creative',
        title: 'Creative Hour',
        prompt: 'Spend 1 hour on a hobby you love (drawing, coding, knitting). No phone allowed.',
        mode: 'mind',
        minutes: [60],
        moods: ['bored', 'calm', 'happy']
    },
    {
        id: 'mind-podcast',
        title: 'Podcast Walk (Mental)',
        prompt: 'Listen to a chaotic or educational podcast episode (~45m) while sitting or walking.',
        mode: 'mind',
        minutes: [30, 60],
        moods: ['bored', 'anxious']
    },
    {
        id: 'mind-learning',
        title: 'Learn Basics',
        prompt: 'Spend 30 minutes learning the basics of a new language or skill online.',
        mode: 'mind',
        minutes: [30, 60],
        moods: ['bored', 'happy']
    },

    // MOVE Activities
    {
        id: 'move-neck',
        title: 'Neck Release',
        prompt: 'Slowly tilt your head side to side. Hold each side for 15 seconds.',
        mode: 'move',
        minutes: [5],
        moods: ['anxious', 'sad']
    },
    {
        id: 'move-sky',
        title: 'Sky Reach',
        prompt: 'Stand up. Reach for the ceiling as high as you can. Hold for 10s. Repeat 3 times.',
        mode: 'move',
        minutes: [5],
        moods: ['bored', 'sad']
    },
    {
        id: 'move-water',
        title: 'Water Break',
        prompt: 'Go to the kitchen. Pour a glass of water. Drink it slowly.',
        mode: 'move',
        minutes: [5],
        moods: ['sad', 'bored', 'anxious', 'happy', 'calm']
    },
    {
        id: 'move-shake',
        title: 'Song Shake',
        prompt: 'Play one upbeat song. Shake your limbs until it ends.',
        mode: 'move',
        minutes: [5],
        moods: ['sad', 'bored']
    },
    {
        id: 'move-walk',
        title: 'Walk the Block',
        prompt: 'Walk around your block or building once. Leave your phone if you can.',
        mode: 'move',
        minutes: [10, 30],
        moods: ['anxious', 'bored', 'sad']
    },
    {
        id: 'move-legs-up',
        title: 'Legs Up',
        prompt: 'Lie on the floor with legs up the wall. Rest for 5 minutes.',
        mode: 'move',
        minutes: [10],
        moods: ['sad', 'anxious']
    },
    {
        id: 'move-tidy',
        title: 'Quick Tidy',
        prompt: 'Set a timer for 5 minutes. Tidy one flat surface (desk/table).',
        mode: 'move',
        minutes: [10],
        moods: ['anxious', 'bored']
    },
    {
        id: 'move-stretch',
        title: 'Stretch Break',
        prompt: 'Forward fold. Let your arms dangle. Sway slightly.',
        mode: 'move',
        minutes: [5],
        moods: ['bored', 'anxious']
    },
    {
        id: 'move-jacks',
        title: 'Jumping Jacks',
        prompt: 'Do 20 jumping jacks. Get the heart rate up just a tiny bit.',
        mode: 'move',
        minutes: [5],
        moods: ['bored', 'sad']
    },
    {
        id: 'move-eye',
        title: 'Eye Rest',
        prompt: 'Look at something 20 feet away for 20 seconds.',
        mode: 'move',
        minutes: [5],
        moods: ['anxious', 'bored']
    },
    {
        id: 'move-long-walk',
        title: 'Nature Walk',
        prompt: 'Go for a long walk in a park (or nearest green space). No headphones if possible.',
        mode: 'move',
        minutes: [30, 60],
        moods: ['anxious', 'sad', 'bored', 'calm']
    },
    {
        id: 'move-adventure',
        title: 'Mini Adventure',
        prompt: 'Walk to a new coffee shop or bookstore you haven\'t visited before.',
        mode: 'move',
        minutes: [60],
        moods: ['bored', 'happy']
    },
    {
        id: 'move-bike',
        title: 'Bike Ride',
        prompt: 'Take your bike for a spin around the neighborhood or park.',
        mode: 'move',
        minutes: [30, 60],
        moods: ['bored', 'happy', 'anxious']
    },
    {
        id: 'move-yoga',
        title: 'Yoga Flow',
        prompt: 'Do a full yoga flow to stretch your body (follow a video if needed).',
        mode: 'move',
        minutes: [30, 60],
        moods: ['anxious', 'bored', 'calm']
    }
];
