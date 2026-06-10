import '@adonisjs/core/types/http'

type ParamValue = string | number | bigint | boolean

export type ScannedRoutes = {
  ALL: {
    'auth.new_account.store': { paramsTuple?: []; params?: {} }
    'auth.session.login': { paramsTuple?: []; params?: {} }
    'auth.session.logout': { paramsTuple?: []; params?: {} }
    'session.me': { paramsTuple?: []; params?: {} }
    'profile.show': { paramsTuple?: []; params?: {} }
    'alerts.catalogs': { paramsTuple?: []; params?: {} }
    'alerts.index': { paramsTuple?: []; params?: {} }
    'alerts.run': { paramsTuple?: []; params?: {} }
    'alerts.acknowledge': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'alerts.assign': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'alerts.self_assign': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'alerts.note': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'alerts.resolve': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'alerts.dismiss': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'dashboard.index': { paramsTuple?: []; params?: {} }
    'realtime.token': { paramsTuple?: []; params?: {} }
    'settings.headquarters.index': { paramsTuple?: []; params?: {} }
    'settings.headquarters.store': { paramsTuple?: []; params?: {} }
    'settings.headquarters.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'settings.headquarters.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'settings.headquarters.patch': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'settings.headquarters.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'settings.locations.index': { paramsTuple?: []; params?: {} }
    'settings.locations.store': { paramsTuple?: []; params?: {} }
    'settings.locations.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'settings.locations.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'settings.locations.patch': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'settings.locations.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'users.index': { paramsTuple?: []; params?: {} }
    'users.roles': { paramsTuple?: []; params?: {} }
    'users.store': { paramsTuple?: []; params?: {} }
    'users.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'users.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'inventory.equipment.catalogs': { paramsTuple?: []; params?: {} }
    'inventory.equipment.index': { paramsTuple?: []; params?: {} }
    'inventory.equipment.store': { paramsTuple?: []; params?: {} }
    'inventory.equipment.life_sheet': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'inventory.equipment.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'inventory.equipment.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'inventory.equipment.patch': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'inventory.equipment.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'inventory.equipment.assignments.index': { paramsTuple: [ParamValue]; params: {'equipment_id': ParamValue} }
    'inventory.equipment.assignments.store': { paramsTuple: [ParamValue]; params: {'equipment_id': ParamValue} }
    'inventory.equipment.assignments.return_current': { paramsTuple: [ParamValue]; params: {'equipment_id': ParamValue} }
    'inventory.equipment.attachments.index': { paramsTuple: [ParamValue]; params: {'equipment_id': ParamValue} }
    'inventory.equipment.attachments.store': { paramsTuple: [ParamValue]; params: {'equipment_id': ParamValue} }
    'inventory.equipment.attachments.show': { paramsTuple: [ParamValue,ParamValue]; params: {'equipment_id': ParamValue,'id': ParamValue} }
    'inventory.equipment.attachments.destroy': { paramsTuple: [ParamValue,ParamValue]; params: {'equipment_id': ParamValue,'id': ParamValue} }
    'inventory.equipment_loans.index': { paramsTuple?: []; params?: {} }
    'inventory.equipment_loans.store': { paramsTuple?: []; params?: {} }
    'inventory.equipment_loans.return': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'inventory.maintenance.schedules.catalogs': { paramsTuple?: []; params?: {} }
    'inventory.maintenance.schedules.index': { paramsTuple?: []; params?: {} }
    'inventory.maintenance.schedules.store': { paramsTuple?: []; params?: {} }
    'inventory.maintenance.schedules.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'inventory.maintenance.schedules.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'inventory.maintenance.schedules.patch': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'inventory.maintenance.schedules.cancel': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'inventory.maintenance.schedules.pending': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'inventory.maintenance.schedules.start': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'inventory.maintenance.schedules.finish': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'inventory.maintenance.schedules.reschedule': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'inventory.maintenance.records.index': { paramsTuple?: []; params?: {} }
    'inventory.maintenance.records.store': { paramsTuple?: []; params?: {} }
    'inventory.maintenance.records.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'inventory.maintenance.records.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'inventory.maintenance.records.patch': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'inventory.maintenance.records.close': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'inventory.maintenance.records.attachments.index': { paramsTuple: [ParamValue]; params: {'record_id': ParamValue} }
    'inventory.maintenance.records.attachments.store': { paramsTuple: [ParamValue]; params: {'record_id': ParamValue} }
    'inventory.maintenance.records.attachments.show': { paramsTuple: [ParamValue,ParamValue]; params: {'record_id': ParamValue,'id': ParamValue} }
    'inventory.maintenance.records.attachments.destroy': { paramsTuple: [ParamValue,ParamValue]; params: {'record_id': ParamValue,'id': ParamValue} }
    'inventory.failure_reports.index': { paramsTuple?: []; params?: {} }
    'inventory.failure_reports.store': { paramsTuple?: []; params?: {} }
    'inventory.failure_reports.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'inventory.failure_reports.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'inventory.failure_reports.patch': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'inventory.failure_reports.close': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
  GET: {
    'session.me': { paramsTuple?: []; params?: {} }
    'profile.show': { paramsTuple?: []; params?: {} }
    'alerts.catalogs': { paramsTuple?: []; params?: {} }
    'alerts.index': { paramsTuple?: []; params?: {} }
    'dashboard.index': { paramsTuple?: []; params?: {} }
    'settings.headquarters.index': { paramsTuple?: []; params?: {} }
    'settings.headquarters.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'settings.locations.index': { paramsTuple?: []; params?: {} }
    'settings.locations.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'users.index': { paramsTuple?: []; params?: {} }
    'users.roles': { paramsTuple?: []; params?: {} }
    'inventory.equipment.catalogs': { paramsTuple?: []; params?: {} }
    'inventory.equipment.index': { paramsTuple?: []; params?: {} }
    'inventory.equipment.life_sheet': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'inventory.equipment.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'inventory.equipment.assignments.index': { paramsTuple: [ParamValue]; params: {'equipment_id': ParamValue} }
    'inventory.equipment.attachments.index': { paramsTuple: [ParamValue]; params: {'equipment_id': ParamValue} }
    'inventory.equipment.attachments.show': { paramsTuple: [ParamValue,ParamValue]; params: {'equipment_id': ParamValue,'id': ParamValue} }
    'inventory.equipment_loans.index': { paramsTuple?: []; params?: {} }
    'inventory.maintenance.schedules.catalogs': { paramsTuple?: []; params?: {} }
    'inventory.maintenance.schedules.index': { paramsTuple?: []; params?: {} }
    'inventory.maintenance.schedules.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'inventory.maintenance.records.index': { paramsTuple?: []; params?: {} }
    'inventory.maintenance.records.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'inventory.maintenance.records.attachments.index': { paramsTuple: [ParamValue]; params: {'record_id': ParamValue} }
    'inventory.maintenance.records.attachments.show': { paramsTuple: [ParamValue,ParamValue]; params: {'record_id': ParamValue,'id': ParamValue} }
    'inventory.failure_reports.index': { paramsTuple?: []; params?: {} }
    'inventory.failure_reports.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
  HEAD: {
    'session.me': { paramsTuple?: []; params?: {} }
    'profile.show': { paramsTuple?: []; params?: {} }
    'alerts.catalogs': { paramsTuple?: []; params?: {} }
    'alerts.index': { paramsTuple?: []; params?: {} }
    'dashboard.index': { paramsTuple?: []; params?: {} }
    'settings.headquarters.index': { paramsTuple?: []; params?: {} }
    'settings.headquarters.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'settings.locations.index': { paramsTuple?: []; params?: {} }
    'settings.locations.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'users.index': { paramsTuple?: []; params?: {} }
    'users.roles': { paramsTuple?: []; params?: {} }
    'inventory.equipment.catalogs': { paramsTuple?: []; params?: {} }
    'inventory.equipment.index': { paramsTuple?: []; params?: {} }
    'inventory.equipment.life_sheet': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'inventory.equipment.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'inventory.equipment.assignments.index': { paramsTuple: [ParamValue]; params: {'equipment_id': ParamValue} }
    'inventory.equipment.attachments.index': { paramsTuple: [ParamValue]; params: {'equipment_id': ParamValue} }
    'inventory.equipment.attachments.show': { paramsTuple: [ParamValue,ParamValue]; params: {'equipment_id': ParamValue,'id': ParamValue} }
    'inventory.equipment_loans.index': { paramsTuple?: []; params?: {} }
    'inventory.maintenance.schedules.catalogs': { paramsTuple?: []; params?: {} }
    'inventory.maintenance.schedules.index': { paramsTuple?: []; params?: {} }
    'inventory.maintenance.schedules.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'inventory.maintenance.records.index': { paramsTuple?: []; params?: {} }
    'inventory.maintenance.records.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'inventory.maintenance.records.attachments.index': { paramsTuple: [ParamValue]; params: {'record_id': ParamValue} }
    'inventory.maintenance.records.attachments.show': { paramsTuple: [ParamValue,ParamValue]; params: {'record_id': ParamValue,'id': ParamValue} }
    'inventory.failure_reports.index': { paramsTuple?: []; params?: {} }
    'inventory.failure_reports.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
  POST: {
    'auth.new_account.store': { paramsTuple?: []; params?: {} }
    'auth.session.login': { paramsTuple?: []; params?: {} }
    'auth.session.logout': { paramsTuple?: []; params?: {} }
    'alerts.run': { paramsTuple?: []; params?: {} }
    'realtime.token': { paramsTuple?: []; params?: {} }
    'settings.headquarters.store': { paramsTuple?: []; params?: {} }
    'settings.locations.store': { paramsTuple?: []; params?: {} }
    'users.store': { paramsTuple?: []; params?: {} }
    'inventory.equipment.store': { paramsTuple?: []; params?: {} }
    'inventory.equipment.assignments.store': { paramsTuple: [ParamValue]; params: {'equipment_id': ParamValue} }
    'inventory.equipment.attachments.store': { paramsTuple: [ParamValue]; params: {'equipment_id': ParamValue} }
    'inventory.equipment_loans.store': { paramsTuple?: []; params?: {} }
    'inventory.maintenance.schedules.store': { paramsTuple?: []; params?: {} }
    'inventory.maintenance.records.store': { paramsTuple?: []; params?: {} }
    'inventory.maintenance.records.attachments.store': { paramsTuple: [ParamValue]; params: {'record_id': ParamValue} }
    'inventory.failure_reports.store': { paramsTuple?: []; params?: {} }
  }
  PATCH: {
    'alerts.acknowledge': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'alerts.assign': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'alerts.self_assign': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'alerts.note': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'alerts.resolve': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'alerts.dismiss': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'settings.headquarters.patch': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'settings.locations.patch': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'users.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'inventory.equipment.patch': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'inventory.equipment.assignments.return_current': { paramsTuple: [ParamValue]; params: {'equipment_id': ParamValue} }
    'inventory.equipment_loans.return': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'inventory.maintenance.schedules.patch': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'inventory.maintenance.schedules.cancel': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'inventory.maintenance.schedules.pending': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'inventory.maintenance.schedules.start': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'inventory.maintenance.schedules.finish': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'inventory.maintenance.schedules.reschedule': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'inventory.maintenance.records.patch': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'inventory.maintenance.records.close': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'inventory.failure_reports.patch': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'inventory.failure_reports.close': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
  PUT: {
    'settings.headquarters.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'settings.locations.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'inventory.equipment.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'inventory.maintenance.schedules.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'inventory.maintenance.records.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'inventory.failure_reports.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
  DELETE: {
    'settings.headquarters.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'settings.locations.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'users.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'inventory.equipment.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'inventory.equipment.attachments.destroy': { paramsTuple: [ParamValue,ParamValue]; params: {'equipment_id': ParamValue,'id': ParamValue} }
    'inventory.maintenance.records.attachments.destroy': { paramsTuple: [ParamValue,ParamValue]; params: {'record_id': ParamValue,'id': ParamValue} }
  }
}
declare module '@adonisjs/core/types/http' {
  export interface RoutesList extends ScannedRoutes {}
}