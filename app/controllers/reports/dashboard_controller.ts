import db from '@adonisjs/lucid/services/db'

export default class DashboardController {
  async index() {
    const [equipmentTotals, upcomingMaintenance, overdueMaintenance, leaseExpirations, warranties] =
      await Promise.all([
        db
          .from('equipment')
          .whereNull('deleted_at')
          .select(
            db.raw('count(*)::int as total'),
            db.raw("count(*) filter (where status = 'active')::int as active"),
            db.raw("count(*) filter (where status = 'in_maintenance')::int as in_maintenance"),
            db.raw("count(*) filter (where status = 'damaged')::int as damaged")
          )
          .first(),
        db
          .from('maintenance_schedules')
          .whereIn('status', ['scheduled', 'pending'])
          .whereBetween('scheduled_for', [db.raw('current_date'), db.raw("current_date + interval '30 days'")])
          .count('* as total')
          .first(),
        db
          .from('maintenance_schedules')
          .whereIn('status', ['scheduled', 'pending', 'overdue'])
          .where('scheduled_for', '<', db.raw('current_date'))
          .count('* as total')
          .first(),
        db
          .from('equipment')
          .whereNull('deleted_at')
          .where('ownership_type', 'leased')
          .whereBetween('lease_until', [db.raw('current_date'), db.raw("current_date + interval '60 days'")])
          .count('* as total')
          .first(),
        db
          .from('equipment')
          .whereNull('deleted_at')
          .whereBetween('warranty_until', [db.raw('current_date'), db.raw("current_date + interval '60 days'")])
          .count('* as total')
          .first(),
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
}
