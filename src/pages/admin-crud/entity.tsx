import React, { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { entities, type EntityId } from '../../admin/config/entities';
import { CrudPage } from '../../admin/components/CrudPage';
import { RoleSwitcher } from '../../components/dev/role-switcher';
import { MockSwitcher } from '../../components/dev/mock-switcher';

export const AdminCrudEntityPage: React.FC = () => {
  const params = useParams();
  const id = (params.entity as EntityId) ?? 'users';
  const cfg = useMemo(() => entities[id], [id]);
  if (!cfg) return <div className="p-6">Сущность не найдена</div>;
  // @ts-expect-error generic bridging
  return (
    <div className="p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold">{cfg.title}</h1>
        <div className="flex items-center gap-3">
          <MockSwitcher />
          <RoleSwitcher />
        </div>
      </div>
      <CrudPage config={cfg as any} />
    </div>
  );
};
