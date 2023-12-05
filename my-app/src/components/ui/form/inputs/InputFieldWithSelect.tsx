import React, { forwardRef } from "react";

import { InputField } from "../../..";
import { UnstyledSelect } from "../select/Select";
import type { InputFieldProps } from "./types";

export const InputFieldWithSelect = forwardRef<
  HTMLInputElement,
  InputFieldProps & { selectProps: typeof UnstyledSelect }
>(function EmailField(props, ref) {
  return (
    <InputField
      ref={ref}
      {...props}
      inputIsFullWidth={false}
      addOnClassname="!px-0"
      addOnSuffix={<UnstyledSelect {...props.selectProps} />}
    />
  );
});
