'use client';

import * as React from 'react';

import { CheckIcon } from '@radix-ui/react-icons';
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';

import { cn } from '../lib/utils';

const RadioGroup: React.FC<
  React.ComponentPropsWithRef<typeof RadioGroupPrimitive.Root>
> = ({ className, ...props }) => {
  return (
    <RadioGroupPrimitive.Root
      className={cn('grid gap-2', className)}
      {...props}
    />
  );
};
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName;

const RadioGroupItem: React.FC<
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>
> = ({ className, ...props }) => {
  return (
    <RadioGroupPrimitive.Item
      className={cn(
        'border-primary text-primary focus-visible:ring-ring aspect-square h-4 w-4 rounded-full border shadow-xs focus:outline-hidden focus-visible:ring-1 disabled:cursor-not-allowed disabled:opacity-50',
        className,
      )}
      {...props}
    >
      <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
        <CheckIcon className="fill-primary h-3.5 w-3.5" />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  );
};
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName;

const RadioGroupItemLabel = (
  props: React.PropsWithChildren<{
    className?: string;
    selected?: boolean;
  }>,
) => {
  return (
    <label
      className={cn(
        props.className,
        'flex cursor-pointer rounded-md' +
          ' border-input items-center space-x-4 border' +
          ' transition-duration-500 focus-within:border-primary p-4 text-sm transition-all',
        {
          [`bg-muted`]: props.selected,
          [`hover:bg-muted`]: !props.selected,
        },
      )}
    >
      {props.children}
    </label>
  );
};
RadioGroupItemLabel.displayName = 'RadioGroupItemLabel';

export { RadioGroup, RadioGroupItem, RadioGroupItemLabel };
