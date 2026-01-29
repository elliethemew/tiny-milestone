import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';
import { Loader2 } from 'lucide-react';

const buttonVariants = cva(
    "inline-flex items-center justify-center rounded-2xl text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-accent focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background active:scale-95 transition-transform duration-100",
    {
        variants: {
            variant: {
                default: "bg-primary-accent text-white hover:bg-primary-hover shadow-sm",
                secondary: "bg-white text-primary border border-gray-200 hover:bg-gray-50 shadow-sm",
                soft: "bg-white/90 text-primary-DEFAULT border border-slate-900/10 shadow-sm hover:bg-white hover:shadow-md hover:ring-2 hover:ring-primary-accent/10 transition-all duration-300",
                ghost: "hover:bg-gray-100 text-primary-DEFAULT",
                outline: "border border-input hover:bg-accent hover:text-accent-foreground",
            },
            size: {
                default: "h-12 px-6 py-3 rounded-2xl",
                sm: "h-10 px-4 rounded-xl",
                lg: "h-14 px-8 text-base rounded-[24px]", // Approx 24px
                icon: "h-11 w-11 rounded-full", // 44px+ touch target
            },
            fullWidth: {
                true: "w-full",
            }
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    }
);

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
    isLoading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, size, fullWidth, isLoading, children, ...props }, ref) => {
        return (
            <button
                className={cn(buttonVariants({ variant, size, fullWidth, className }))}
                ref={ref}
                disabled={isLoading || props.disabled}
                {...props}
            >
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {children}
            </button>
        );
    }
);
Button.displayName = "Button";

export { Button, buttonVariants };
