import * as React from 'react';
import { View, type ViewProps } from 'react-native';
import type { LucideIcon } from 'lucide-react-native';

import { cn } from '~/src/lib/utils';
import { Icon } from '~/src/components/ui/icon';
import { Text, TextClassContext } from '~/src/components/ui/text';

function Alert({
  icon,
  variant,
  children,
  className,
  iconClassName,
  ...props
}: ViewProps &
  React.RefAttributes<View> & {
    icon: LucideIcon,
    iconClassName?: string,
    variant?: 'default' | 'destructive',
  }) {
  return (
    <TextClassContext.Provider
      value={cn(
        'text-sm text-foreground',
        variant === 'destructive' && 'text-destructive',
        className,
      )}>
      <View
        role='alert'
        className={cn(
          'bg-card border-border relative w-full rounded-lg border px-4 pb-2 pt-3.5',
          className,
        )}
        {...props}>
        <View className='absolute left-3.5 top-3 z-50'>
          <Icon
            as={icon}
            className={cn('size-4 z-50', variant === 'destructive' && 'text-destructive', iconClassName)}
          ></Icon>
        </View>
        {children}
      </View>
    </TextClassContext.Provider>
  );
}

function AlertTitle({
  className,
  ...props
}: React.ComponentProps<typeof Text> & React.RefAttributes<Text>) {
  return (
      <Text
        className={cn('mb-1 ml-0.5 min-h-4 pl-6 font-medium leading-none tracking-tight', className)}
        {...props}
    ></Text>
  );
}

function AlertDescription({
  className,
  ...props
}: React.ComponentProps<typeof Text> & React.RefAttributes<Text>) {
  const textClass = React.useContext(TextClassContext);
  return (
    <Text
      className={cn(
        'text-muted-foreground ml-0.5 pb-1.5 pl-6 text-sm leading-relaxed',
        textClass?.includes('text-destructive') && 'text-destructive/90',
        className,
      )}
      {...props}
    ></Text>
  );
}

export { Alert, AlertDescription, AlertTitle };
