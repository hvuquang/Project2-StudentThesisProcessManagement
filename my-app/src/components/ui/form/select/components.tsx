"use client";

import type { GroupBase, InputProps, OptionProps } from "react-select";
import { components as reactSelectComponents } from "react-select";

import { cn } from "@ttbs/lib/cn";

import { Check } from "../../icons";

export const InputComponent = <
  Option,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>
>({
  inputClassName,
  ...props
}: InputProps<Option, IsMulti, Group>) => {
  return (
    <reactSelectComponents.Input
      // disables our default form focus hightlight on the react-select input element
      inputClassName={cn(
        "focus:ring-0 focus:ring-offset-0 dark:!text-darkgray-900 !text-emphasis",
        inputClassName
      )}
      {...props}
    />
  );
};

type ExtendedOption = {
  value: string | number;
  label: string;
};

export const OptionComponent = <
  Option,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>
>({
  ...props
}: OptionProps<Option, IsMulti, Group>) => {
  return (
    // This gets styled in the select classNames prop now - handles overrides with styles vs className here doesnt
    <reactSelectComponents.Option {...props}>
      <div className="flex">
        <span className="mr-auto" data-testid={`select-option-${(props as unknown as ExtendedOption).value}`}>
          {props.label || <>&nbsp;</>}
        </span>
        {props.isSelected && <Check className="ml-2 h-4 w-4" />}
      </div>
    </reactSelectComponents.Option>
  );
};

// We need to override this component if we need a icon - we can't simpily override styles
type IconLeadingProps = {
  icon: React.ReactNode;
  children?: React.ReactNode;
} & React.ComponentProps<typeof reactSelectComponents.Control>;

export const IconLeading = ({ icon, children, ...props }: IconLeadingProps) => {
  return (
    <reactSelectComponents.Control {...props}>
      {icon}
      {children}
    </reactSelectComponents.Control>
  );
};
