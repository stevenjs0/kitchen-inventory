'use client';

import { AlertTriangle } from 'lucide-react';

export interface FieldError {
  name?: string;
  category_id?: string;
  location_id?: string;
  stock_quantity?: string;
  min_stock?: string;
}

export const RequiredMarker = () => (
  <span className="text-destructive ml-0.5">*</span>
);

export function FieldErrorText({
  errors,
  field,
}: {
  errors: FieldError;
  field: keyof FieldError;
}) {
  if (!errors[field]) return null;
  return (
    <p className="text-xs text-destructive mt-1.5 flex items-center gap-1">
      <AlertTriangle className="h-3 w-3" />
      {errors[field]}
    </p>
  );
}
