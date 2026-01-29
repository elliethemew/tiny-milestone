// src/lib/theme.ts

// Centralized Theme Configuration for Moods and Modes
// This separates the "Look & Feel" from the application logic.

export const MOOD_STYLES = {
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
} as const;

export const MODE_STYLES = {
    mind: {
        base: "border-border bg-white hover:border-blue-300 hover:bg-blue-50",
        selected: "border-blue-400 bg-white shadow-md ring-4 ring-blue-100",
        icon: {
            base: "bg-slate-100 text-slate-400 group-hover:bg-blue-100 group-hover:text-blue-500",
            selected: "bg-blue-100 text-blue-600"
        },
        badgeColor: "bg-blue-500"
    },
    move: {
        base: "border-border bg-white hover:border-emerald-300 hover:bg-emerald-50",
        selected: "border-emerald-400 bg-white shadow-md ring-4 ring-emerald-100",
        icon: {
            base: "bg-slate-100 text-slate-400 group-hover:bg-emerald-100 group-hover:text-emerald-500",
            selected: "bg-emerald-100 text-emerald-600"
        },
        badgeColor: "bg-emerald-500"
    }
} as const;
