import React, { useMemo, useState } from 'react';
import { useAuthStore } from '../../store/auth.store';
import { canAccessAdmin } from '../../admin/access';
import { entities, type EntityId } from '../../admin/config/entities';
import { CrudPage } from '../../admin/components/CrudPage';
import { Select } from '@chakra-ui/react';

export const AdminCrudPage: React.FC = () => {
  const { user } = useAuthStore();
  const role = user?.permissions ?? 'STUDENT';

  if (!canAccessAdmin(role as any)) {
    return <div className="p-6">Нет доступа к админке</div>;
  }

  const [entity, setEntity] = useState<EntityId>('users');
  const cfg = useMemo(() => entities[entity], [entity]);

  return (
    <div className="p-6 space-y-4">
      <div className="flex items-center gap-2">
        <label className="text-sm">Сущность:</label>
        <Select size="sm" width="220px" value={entity} onChange={(e) => setEntity(e.target.value as EntityId)}>
          {Object.keys(entities).map((k) => (
            <option key={k} value={k}>{entities[k as EntityId].title}</option>
          ))}
        </Select>
      </div>

      {/* @ts-expect-error generic bridging */}
      <CrudPage config={cfg as any} />
    </div>
  );
};

