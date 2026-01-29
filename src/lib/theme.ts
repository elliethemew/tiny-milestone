// src/lib/theme.ts

// Centralized Theme Configuration for Moods and Modes
// This separates the "Look & Feel" from the application logic.

export const MOOD_STYLES = {
    happy: {
        border: 'border-yellow-400',
        ring: 'ring-yellow-400/40', // Stronger selection
        hoverRing: 'hover:ring-yellow-400/15', // Airy hover
        text: 'text-yellow-700',
        bg: 'bg-yellow-50',
        tint: 'bg-yellow-500/5',
        hoverBorder: 'hover:border-yellow-400',
        hoverBg: 'hover:bg-yellow-50',
    },
    sad: {
        border: 'border-blue-400',
        ring: 'ring-blue-400/40',
        hoverRing: 'hover:ring-blue-400/15',
        text: 'text-blue-700',
        bg: 'bg-blue-50',
        tint: 'bg-blue-500/5',
        hoverBorder: 'hover:border-blue-400',
        hoverBg: 'hover:bg-blue-50',
    },
    anxious: {
        border: 'border-amber-400',
        ring: 'ring-amber-400/40',
        hoverRing: 'hover:ring-amber-400/15',
        text: 'text-amber-700',
        bg: 'bg-amber-50',
        tint: 'bg-amber-500/5',
        hoverBorder: 'hover:border-amber-400',
        hoverBg: 'hover:bg-amber-50',
    },
    calm: {
        border: 'border-emerald-400',
        ring: 'ring-emerald-400/40',
        hoverRing: 'hover:ring-emerald-400/15',
        text: 'text-emerald-700',
        bg: 'bg-emerald-50',
        tint: 'bg-emerald-500/5',
        hoverBorder: 'hover:border-emerald-400',
        hoverBg: 'hover:bg-emerald-50',
    },
    bored: {
        border: 'border-gray-400',
        ring: 'ring-gray-400/40',
        hoverRing: 'hover:ring-gray-400/15',
        text: 'text-gray-700',
        bg: 'bg-gray-50',
        tint: 'bg-gray-500/5',
        hoverBorder: 'hover:border-gray-400',
        hoverBg: 'hover:bg-gray-50',
    },
    surprise: {
        border: 'border-indigo-400',
        ring: 'ring-indigo-400/40',
        hoverRing: 'hover:ring-indigo-400/15',
        text: 'text-indigo-700',
        bg: 'bg-indigo-50',
        tint: 'bg-indigo-500/5',
        hoverBorder: 'hover:border-indigo-400',
        hoverBg: 'hover:bg-indigo-50',
    },
} as const;

export const MODE_STYLES = {
    mind: {
        base: "border-slate-900/10 bg-white hover:border-slate-300 hover:shadow-sm",
        selected: "border-primary-accent/20 bg-teal-50 shadow-sm ring-2 ring-primary-accent/20",
        icon: {
            base: "bg-slate-100 text-slate-400 group-hover:bg-blue-50 group-hover:text-blue-500",
            selected: "bg-blue-100/50 text-blue-600"
        },
        badgeColor: "bg-primary-accent"
    },
    move: {
        base: "border-slate-900/10 bg-white hover:border-slate-300 hover:shadow-sm",
        selected: "border-primary-accent/20 bg-teal-50 shadow-sm ring-2 ring-primary-accent/20",
        icon: {
            base: "bg-slate-100 text-slate-400 group-hover:bg-emerald-50 group-hover:text-emerald-500",
            selected: "bg-emerald-100/50 text-emerald-600"
        },
        badgeColor: "bg-primary-accent"
    }
} as const;
