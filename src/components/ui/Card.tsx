import * as React from 'react';
import { cn } from '../../lib/utils';

const Card = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cn(
            "rounded-[24px] border border-slate-900/10 bg-white text-card-foreground shadow-[var(--shadow-premium)] ring-1 ring-inset ring-white/50", // Premium Surface
            className
        )}
        {...props}
    />
));
Card.displayName = "Card";

export { Card };
