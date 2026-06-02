import db from '@adonisjs/lucid/services/db'

type DashboardSummaryOptions = {
  visibleToResponsibleId?: string
}

export default class DashboardService {
  async summary(options: DashboardSummaryOptions = {}) {
    const equipmentTotalsQuery = db
      .from('equipment')
      .whereNull('deleted_at')
      .select(
        db.raw('count(*)::int as total'),
        db.raw("count(*) filter (where status = 'active')::int as active"),
        db.raw("count(*) filter (where status = 'in_maintenance')::int as in_maintenance"),
        db.raw("count(*) filter (where status = 'damaged')::int as damaged")
      )
    const upcomingMaintenanceQuery = db
      .from('maintenance_schedules')
      .whereIn('status', ['scheduled', 'pending'])
      .whereBetween('scheduled_for', [
        db.raw('current_date'),
        db.raw("current_date + interval '30 days'"),
      ])
      .count('* as total')
    const overdueMaintenanceQuery = db
      .from('maintenance_schedules')
      .whereIn('status', ['scheduled', 'pending', 'overdue'])
      .where('scheduled_for', '<', db.raw('current_date'))
      .count('* as total')
    const leaseExpirationsQuery = db
      .from('equipment')
      .whereNull('deleted_at')
      .where('ownership_type', 'leased')
      .whereBetween('lease_until', [
        db.raw('current_date'),
        db.raw("current_date + interval '60 days'"),
      ])
      .count('* as total')
    const warrantiesQuery = db
      .from('equipment')
      .whereNull('deleted_at')
      .whereBetween('warranty_until', [
        db.raw('current_date'),
        db.raw("current_date + interval '60 days'"),
      ])
      .count('* as total')

    if (options.visibleToResponsibleId) {
      this.scopeEquipmentQuery(equipmentTotalsQuery, options.visibleToResponsibleId)
      this.scopeEquipmentQuery(leaseExpirationsQuery, options.visibleToResponsibleId)
      this.scopeEquipmentQuery(warrantiesQuery, options.visibleToResponsibleId)
      this.scopeMaintenanceQuery(upcomingMaintenanceQuery, options.visibleToResponsibleId)
      this.scopeMaintenanceQuery(overdueMaintenanceQuery, options.visibleToResponsibleId)
    }

    const [equipmentTotals, upcomingMaintenance, overdueMaintenance, leaseExpirations, warranties] =
      await Promise.all([
        equipmentTotalsQuery.first(),
        upcomingMaintenanceQuery.first(),
        overdueMaintenanceQuery.first(),
        leaseExpirationsQuery.first(),
        warrantiesQuery.first(),
      ])

    return {
      equipment: {
        total: equipmentTotals?.total ?? 0,
        active: equipmentTotals?.active ?? 0,
        inMaintenance: equipmentTotals?.in_maintenance ?? 0,
        damaged: equipmentTotals?.damaged ?? 0,
      },
      maintenance: {
        upcoming: Number(upcomingMaintenance?.total ?? 0),
        overdue: Number(overdueMaintenance?.total ?? 0),
      },
      expirations: {
        leases: Number(leaseExpirations?.total ?? 0),
        warranties: Number(warranties?.total ?? 0),
      },
    }
  }

  private scopeEquipmentQuery(query: ReturnType<typeof db.from>, responsibleId: string) {
    query.where((builder) => {
      builder
        .where('current_responsible_id', responsibleId)
        .orWhere('secondary_responsible_id', responsibleId)
    })
  }

  private scopeMaintenanceQuery(query: ReturnType<typeof db.from>, responsibleId: string) {
    query.whereIn(
      'equipment_id',
      db
        .from('equipment')
        .whereNull('deleted_at')
        .where((builder) => {
          builder
            .where('current_responsible_id', responsibleId)
            .orWhere('secondary_responsible_id', responsibleId)
        })
        .select('id')
    )
  }
}
