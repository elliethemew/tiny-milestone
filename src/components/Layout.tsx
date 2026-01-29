import React from 'react';
import { cn } from '../lib/utils';

interface LayoutProps {
    children: React.ReactNode;
    className?: string;
    showHeader?: boolean;
}

export function Layout({ children, className, showHeader = true }: LayoutProps) {
    return (
        <div className="min-h-screen flex flex-col items-center justify-start p-4 md:p-8 font-sans">
            <div className={cn("w-full max-w-md flex flex-col gap-6", className)}>
                {showHeader && (
                    <header className="py-4 flex justify-center">
                        <h1 className="text-xl font-serif font-medium tracking-tight text-primary-accent flex items-center gap-2">
                            <span className="text-2xl">🌱</span> Tiny Milestone
                        </h1>
                    </header>
                )}
                <main className="flex-1 w-full animate-fade-in">
                    {children}
                </main>
            </div>
        </div>
    );
}
