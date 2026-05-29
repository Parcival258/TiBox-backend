import '@adonisjs/core/types/http'

type ParamValue = string | number | bigint | boolean

export type ScannedRoutes = {
  ALL: {
    'auth.new_account.store': { paramsTuple?: []; params?: {} }
    'auth.session.login': { paramsTuple?: []; params?: {} }
    'auth.session.logout': { paramsTuple?: []; params?: {} }
    'session.me': { paramsTuple?: []; params?: {} }
    'profile.show': { paramsTuple?: []; params?: {} }
    'dashboard.index': { paramsTuple?: []; params?: {} }
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
  }
  GET: {
    'session.me': { paramsTuple?: []; params?: {} }
    'profile.show': { paramsTuple?: []; params?: {} }
    'dashboard.index': { paramsTuple?: []; params?: {} }
    'settings.headquarters.index': { paramsTuple?: []; params?: {} }
    'settings.headquarters.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'settings.locations.index': { paramsTuple?: []; params?: {} }
    'settings.locations.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'inventory.equipment.catalogs': { paramsTuple?: []; params?: {} }
    'inventory.equipment.index': { paramsTuple?: []; params?: {} }
    'inventory.equipment.life_sheet': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'inventory.equipment.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'inventory.equipment.assignments.index': { paramsTuple: [ParamValue]; params: {'equipment_id': ParamValue} }
    'inventory.equipment.attachments.index': { paramsTuple: [ParamValue]; params: {'equipment_id': ParamValue} }
    'inventory.equipment.attachments.show': { paramsTuple: [ParamValue,ParamValue]; params: {'equipment_id': ParamValue,'id': ParamValue} }
  }
  HEAD: {
    'session.me': { paramsTuple?: []; params?: {} }
    'profile.show': { paramsTuple?: []; params?: {} }
    'dashboard.index': { paramsTuple?: []; params?: {} }
    'settings.headquarters.index': { paramsTuple?: []; params?: {} }
    'settings.headquarters.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'settings.locations.index': { paramsTuple?: []; params?: {} }
    'settings.locations.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'inventory.equipment.catalogs': { paramsTuple?: []; params?: {} }
    'inventory.equipment.index': { paramsTuple?: []; params?: {} }
    'inventory.equipment.life_sheet': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'inventory.equipment.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'inventory.equipment.assignments.index': { paramsTuple: [ParamValue]; params: {'equipment_id': ParamValue} }
    'inventory.equipment.attachments.index': { paramsTuple: [ParamValue]; params: {'equipment_id': ParamValue} }
    'inventory.equipment.attachments.show': { paramsTuple: [ParamValue,ParamValue]; params: {'equipment_id': ParamValue,'id': ParamValue} }
  }
  POST: {
    'auth.new_account.store': { paramsTuple?: []; params?: {} }
    'auth.session.login': { paramsTuple?: []; params?: {} }
    'auth.session.logout': { paramsTuple?: []; params?: {} }
    'settings.headquarters.store': { paramsTuple?: []; params?: {} }
    'settings.locations.store': { paramsTuple?: []; params?: {} }
    'inventory.equipment.store': { paramsTuple?: []; params?: {} }
    'inventory.equipment.assignments.store': { paramsTuple: [ParamValue]; params: {'equipment_id': ParamValue} }
    'inventory.equipment.attachments.store': { paramsTuple: [ParamValue]; params: {'equipment_id': ParamValue} }
  }
  PUT: {
    'settings.headquarters.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'settings.locations.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'inventory.equipment.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
  PATCH: {
    'settings.headquarters.patch': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'settings.locations.patch': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'inventory.equipment.patch': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'inventory.equipment.assignments.return_current': { paramsTuple: [ParamValue]; params: {'equipment_id': ParamValue} }
  }
  DELETE: {
    'settings.headquarters.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'settings.locations.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'inventory.equipment.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'inventory.equipment.attachments.destroy': { paramsTuple: [ParamValue,ParamValue]; params: {'equipment_id': ParamValue,'id': ParamValue} }
  }
}
declare module '@adonisjs/core/types/http' {
  export interface RoutesList extends ScannedRoutes {}
}