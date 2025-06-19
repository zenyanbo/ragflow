import { Input, InputProps } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { forwardRef } from 'react';

const NumberInput = forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    return (
      <Input
        type="number"
        className={cn(
          'appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none',
          className,
        )}
        {...props}
        ref={ref}
      />
    );
  },
);

NumberInput.displayName = 'NumberInput';

export { NumberInput };