import React from 'react';
import { Input, Select as BaseSelect, Textarea } from '../../components/base';
import type { FieldSpec } from '../config/entities';

interface Props<TCreate, TUpdate> {
  fields: FieldSpec<TCreate, TUpdate>[];
  values: Record<string, any>;
  onChange: (key: string, value: any) => void;
}

export function FieldForm<TCreate, TUpdate>({ fields, values, onChange }: Props<TCreate, TUpdate>) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {fields.map((f) => {
        const v = values[f.key as string] ?? '';
        switch (f.kind) {
          case 'textarea':
            return (
              <Textarea key={String(f.key)} name={String(f.key)} label={f.label} value={v} onChange={(val) => onChange(f.key as string, val)} />
            );
          case 'select':
            return (
              <BaseSelect
                key={String(f.key)}
                name={String(f.key)}
                label={f.label}
                options={(f.options ?? []).map(o => ({ label: o.label, value: String(o.value) }))}
                value={String(v)}
                onChange={(val) => onChange(f.key as string, val)}
              />
            );
          case 'number':
            return (
              <Input key={String(f.key)} name={String(f.key)} label={f.label} type="number" value={String(v)} onChange={(val) => onChange(f.key as string, Number(val))} />
            );
          default:
            return (
              <Input key={String(f.key)} name={String(f.key)} label={f.label} value={String(v)} onChange={(val) => onChange(f.key as string, val)} />
            );
        }
      })}
    </div>
  );
}

