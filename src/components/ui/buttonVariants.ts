import { cva, type VariantProps } from 'class-variance-authority';

export const buttonVariants = cva(
    'inline-flex items-center justify-center whitespace-nowrap rounded-xl text-sm font-bold ring-offset-white transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pet-orange focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 transform hover:-translate-y-0.5 active:translate-y-0',
    {
        variants: {
            variant: {
                primary: 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg hover:shadow-xl hover:from-orange-600',
                destructive: 'bg-red-500 text-white hover:bg-red-600/90',
                outline: 'border-2 border-pet-orange text-pet-orange hover:bg-pet-orange hover:text-white',
                secondary: 'bg-pet-teal text-white hover:bg-pet-teal/90',
                ghost: 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white',
            },
            size: {
                sm: 'h-9 px-3',
                md: 'h-10 px-4 py-2',
                lg: 'h-11 px-8 text-base',
            },
        },
        defaultVariants: {
            variant: 'primary',
            size: 'md',
        },
    }
);

export type ButtonVariant = VariantProps<typeof buttonVariants>['variant'];
export type ButtonSize = VariantProps<typeof buttonVariants>['size'];