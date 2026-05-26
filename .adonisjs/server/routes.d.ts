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
    'settings.headquarters.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'settings.locations.index': { paramsTuple?: []; params?: {} }
    'settings.locations.store': { paramsTuple?: []; params?: {} }
    'settings.locations.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'settings.locations.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'settings.locations.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'inventory.equipment.index': { paramsTuple?: []; params?: {} }
    'inventory.equipment.store': { paramsTuple?: []; params?: {} }
    'inventory.equipment.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'inventory.equipment.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'inventory.equipment.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
  GET: {
    'session.me': { paramsTuple?: []; params?: {} }
    'profile.show': { paramsTuple?: []; params?: {} }
    'dashboard.index': { paramsTuple?: []; params?: {} }
    'settings.headquarters.index': { paramsTuple?: []; params?: {} }
    'settings.headquarters.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'settings.locations.index': { paramsTuple?: []; params?: {} }
    'settings.locations.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'inventory.equipment.index': { paramsTuple?: []; params?: {} }
    'inventory.equipment.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
  HEAD: {
    'session.me': { paramsTuple?: []; params?: {} }
    'profile.show': { paramsTuple?: []; params?: {} }
    'dashboard.index': { paramsTuple?: []; params?: {} }
    'settings.headquarters.index': { paramsTuple?: []; params?: {} }
    'settings.headquarters.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'settings.locations.index': { paramsTuple?: []; params?: {} }
    'settings.locations.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'inventory.equipment.index': { paramsTuple?: []; params?: {} }
    'inventory.equipment.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
  POST: {
    'auth.new_account.store': { paramsTuple?: []; params?: {} }
    'auth.session.login': { paramsTuple?: []; params?: {} }
    'auth.session.logout': { paramsTuple?: []; params?: {} }
    'settings.headquarters.store': { paramsTuple?: []; params?: {} }
    'settings.locations.store': { paramsTuple?: []; params?: {} }
    'inventory.equipment.store': { paramsTuple?: []; params?: {} }
  }
  PUT: {
    'settings.headquarters.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'settings.locations.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'inventory.equipment.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
  PATCH: {
    'settings.headquarters.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'settings.locations.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'inventory.equipment.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
  DELETE: {
    'settings.headquarters.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'settings.locations.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'inventory.equipment.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
}
declare module '@adonisjs/core/types/http' {
  export interface RoutesList extends ScannedRoutes {}
}