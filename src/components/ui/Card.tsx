import * as React from 'react';
import { cn } from '../../lib/utils';

const Card = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cn(
            "rounded-[24px] border border-border bg-surface text-card-foreground shadow-sm", // Rounded 24px, subtle shadow
            className
        )}
        {...props}
    />
));
Card.displayName = "Card";

export { Card };
