import React, { useMemo, useState } from 'react';
import { Button } from '@chakra-ui/react';
import { useCrudResource } from '../hooks/useCrudResource';
import type { EntityConfig } from '../config/entities';
import { DataTable } from './DataTable';
import { FieldForm } from './FieldForm';

interface Props<TRow, TCreate, TUpdate> {
  config: EntityConfig<TRow, TCreate, TUpdate>;
}

export function CrudPage<TRow extends Record<string, any>, TCreate extends Record<string, any>, TUpdate extends Record<string, any>>({ config }: Props<TRow, TCreate, TUpdate>) {
  const { listQuery, create, update, remove, isCreating, isUpdating, isRemoving } = useCrudResource<TRow, TCreate, TUpdate>({ basePath: config.basePath, idKey: config.idKey });
  const rows = (listQuery.data ?? []) as TRow[];

  const [isCreateOpen, setCreateOpen] = useState(false);
  const [isEditOpen, setEditOpen] = useState<null | TRow>(null);
  const [formValues, setFormValues] = useState<Record<string, any>>({});

  const columns = useMemo(() => config.columns, [config]);

  const onOpenCreate = () => { setFormValues({}); setCreateOpen(true); };
  const onOpenEdit = (row: TRow) => { setFormValues(row); setEditOpen(row); };

  const onChange = (k: string, v: any) => setFormValues((s) => ({ ...s, [k]: v }));

  const submitCreate = () => { create(formValues as TCreate); setCreateOpen(false); };
  const submitUpdate = () => { update(String((isEditOpen as any)?.[config.idKey]), formValues as TUpdate); setEditOpen(null); };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">{config.title}</h2>
        <Button size="sm" colorScheme="blue" onClick={onOpenCreate} isLoading={isCreating}>Добавить</Button>
      </div>

      <DataTable
        columns={columns as any}
        rows={rows}
        loading={listQuery.isLoading}
        onEdit={(row) => onOpenEdit(row)}
        onDelete={(row) => remove(String(row[config.idKey]))}
      />

      {isCreateOpen && (
        <div className="p-4 border rounded-md space-y-4">
          <FieldForm fields={config.createFields} values={formValues} onChange={onChange} />
          <div className="flex gap-2">
            <Button size="sm" colorScheme="blue" onClick={submitCreate} isLoading={isCreating}>Сохранить</Button>
            <Button size="sm" onClick={() => setCreateOpen(false)}>Отмена</Button>
          </div>
        </div>
      )}

      {isEditOpen && (
        <div className="p-4 border rounded-md space-y-4">
          <FieldForm fields={config.updateFields} values={formValues} onChange={onChange} />
          <div className="flex gap-2">
            <Button size="sm" colorScheme="blue" onClick={submitUpdate} isLoading={isUpdating}>Обновить</Button>
            <Button size="sm" onClick={() => setEditOpen(null)}>Отмена</Button>
          </div>
        </div>
      )}
    </div>
  );
}

