/* eslint-disable prettier/prettier */
import type { AdonisEndpoint } from '@tuyau/core/types'
import type { Registry } from './schema.d.ts'
import type { ApiDefinition } from './tree.d.ts'

const placeholder: any = {}

const routes = {
  'auth.new_account.store': {
    methods: ["POST"],
    pattern: '/api/v1/auth/signup',
    tokens: [{"old":"/api/v1/auth/signup","type":0,"val":"api","end":""},{"old":"/api/v1/auth/signup","type":0,"val":"v1","end":""},{"old":"/api/v1/auth/signup","type":0,"val":"auth","end":""},{"old":"/api/v1/auth/signup","type":0,"val":"signup","end":""}],
    types: placeholder as Registry['auth.new_account.store']['types'],
  },
  'auth.session.login': {
    methods: ["POST"],
    pattern: '/api/v1/auth/login',
    tokens: [{"old":"/api/v1/auth/login","type":0,"val":"api","end":""},{"old":"/api/v1/auth/login","type":0,"val":"v1","end":""},{"old":"/api/v1/auth/login","type":0,"val":"auth","end":""},{"old":"/api/v1/auth/login","type":0,"val":"login","end":""}],
    types: placeholder as Registry['auth.session.login']['types'],
  },
  'auth.session.logout': {
    methods: ["POST"],
    pattern: '/api/v1/auth/logout',
    tokens: [{"old":"/api/v1/auth/logout","type":0,"val":"api","end":""},{"old":"/api/v1/auth/logout","type":0,"val":"v1","end":""},{"old":"/api/v1/auth/logout","type":0,"val":"auth","end":""},{"old":"/api/v1/auth/logout","type":0,"val":"logout","end":""}],
    types: placeholder as Registry['auth.session.logout']['types'],
  },
  'session.me': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/me',
    tokens: [{"old":"/api/v1/me","type":0,"val":"api","end":""},{"old":"/api/v1/me","type":0,"val":"v1","end":""},{"old":"/api/v1/me","type":0,"val":"me","end":""}],
    types: placeholder as Registry['session.me']['types'],
  },
  'profile.show': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/account/profile',
    tokens: [{"old":"/api/v1/account/profile","type":0,"val":"api","end":""},{"old":"/api/v1/account/profile","type":0,"val":"v1","end":""},{"old":"/api/v1/account/profile","type":0,"val":"account","end":""},{"old":"/api/v1/account/profile","type":0,"val":"profile","end":""}],
    types: placeholder as Registry['profile.show']['types'],
  },
  'dashboard.index': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/dashboard',
    tokens: [{"old":"/api/v1/dashboard","type":0,"val":"api","end":""},{"old":"/api/v1/dashboard","type":0,"val":"v1","end":""},{"old":"/api/v1/dashboard","type":0,"val":"dashboard","end":""}],
    types: placeholder as Registry['dashboard.index']['types'],
  },
  'settings.headquarters.index': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/headquarters',
    tokens: [{"old":"/api/v1/headquarters","type":0,"val":"api","end":""},{"old":"/api/v1/headquarters","type":0,"val":"v1","end":""},{"old":"/api/v1/headquarters","type":0,"val":"headquarters","end":""}],
    types: placeholder as Registry['settings.headquarters.index']['types'],
  },
  'settings.headquarters.store': {
    methods: ["POST"],
    pattern: '/api/v1/headquarters',
    tokens: [{"old":"/api/v1/headquarters","type":0,"val":"api","end":""},{"old":"/api/v1/headquarters","type":0,"val":"v1","end":""},{"old":"/api/v1/headquarters","type":0,"val":"headquarters","end":""}],
    types: placeholder as Registry['settings.headquarters.store']['types'],
  },
  'settings.headquarters.show': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/headquarters/:id',
    tokens: [{"old":"/api/v1/headquarters/:id","type":0,"val":"api","end":""},{"old":"/api/v1/headquarters/:id","type":0,"val":"v1","end":""},{"old":"/api/v1/headquarters/:id","type":0,"val":"headquarters","end":""},{"old":"/api/v1/headquarters/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['settings.headquarters.show']['types'],
  },
  'settings.headquarters.update': {
    methods: ["PUT"],
    pattern: '/api/v1/headquarters/:id',
    tokens: [{"old":"/api/v1/headquarters/:id","type":0,"val":"api","end":""},{"old":"/api/v1/headquarters/:id","type":0,"val":"v1","end":""},{"old":"/api/v1/headquarters/:id","type":0,"val":"headquarters","end":""},{"old":"/api/v1/headquarters/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['settings.headquarters.update']['types'],
  },
  'settings.headquarters.patch': {
    methods: ["PATCH"],
    pattern: '/api/v1/headquarters/:id',
    tokens: [{"old":"/api/v1/headquarters/:id","type":0,"val":"api","end":""},{"old":"/api/v1/headquarters/:id","type":0,"val":"v1","end":""},{"old":"/api/v1/headquarters/:id","type":0,"val":"headquarters","end":""},{"old":"/api/v1/headquarters/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['settings.headquarters.patch']['types'],
  },
  'settings.headquarters.destroy': {
    methods: ["DELETE"],
    pattern: '/api/v1/headquarters/:id',
    tokens: [{"old":"/api/v1/headquarters/:id","type":0,"val":"api","end":""},{"old":"/api/v1/headquarters/:id","type":0,"val":"v1","end":""},{"old":"/api/v1/headquarters/:id","type":0,"val":"headquarters","end":""},{"old":"/api/v1/headquarters/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['settings.headquarters.destroy']['types'],
  },
  'settings.locations.index': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/locations',
    tokens: [{"old":"/api/v1/locations","type":0,"val":"api","end":""},{"old":"/api/v1/locations","type":0,"val":"v1","end":""},{"old":"/api/v1/locations","type":0,"val":"locations","end":""}],
    types: placeholder as Registry['settings.locations.index']['types'],
  },
  'settings.locations.store': {
    methods: ["POST"],
    pattern: '/api/v1/locations',
    tokens: [{"old":"/api/v1/locations","type":0,"val":"api","end":""},{"old":"/api/v1/locations","type":0,"val":"v1","end":""},{"old":"/api/v1/locations","type":0,"val":"locations","end":""}],
    types: placeholder as Registry['settings.locations.store']['types'],
  },
  'settings.locations.show': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/locations/:id',
    tokens: [{"old":"/api/v1/locations/:id","type":0,"val":"api","end":""},{"old":"/api/v1/locations/:id","type":0,"val":"v1","end":""},{"old":"/api/v1/locations/:id","type":0,"val":"locations","end":""},{"old":"/api/v1/locations/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['settings.locations.show']['types'],
  },
  'settings.locations.update': {
    methods: ["PUT"],
    pattern: '/api/v1/locations/:id',
    tokens: [{"old":"/api/v1/locations/:id","type":0,"val":"api","end":""},{"old":"/api/v1/locations/:id","type":0,"val":"v1","end":""},{"old":"/api/v1/locations/:id","type":0,"val":"locations","end":""},{"old":"/api/v1/locations/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['settings.locations.update']['types'],
  },
  'settings.locations.patch': {
    methods: ["PATCH"],
    pattern: '/api/v1/locations/:id',
    tokens: [{"old":"/api/v1/locations/:id","type":0,"val":"api","end":""},{"old":"/api/v1/locations/:id","type":0,"val":"v1","end":""},{"old":"/api/v1/locations/:id","type":0,"val":"locations","end":""},{"old":"/api/v1/locations/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['settings.locations.patch']['types'],
  },
  'settings.locations.destroy': {
    methods: ["DELETE"],
    pattern: '/api/v1/locations/:id',
    tokens: [{"old":"/api/v1/locations/:id","type":0,"val":"api","end":""},{"old":"/api/v1/locations/:id","type":0,"val":"v1","end":""},{"old":"/api/v1/locations/:id","type":0,"val":"locations","end":""},{"old":"/api/v1/locations/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['settings.locations.destroy']['types'],
  },
  'inventory.equipment.catalogs': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/equipment/catalogs',
    tokens: [{"old":"/api/v1/equipment/catalogs","type":0,"val":"api","end":""},{"old":"/api/v1/equipment/catalogs","type":0,"val":"v1","end":""},{"old":"/api/v1/equipment/catalogs","type":0,"val":"equipment","end":""},{"old":"/api/v1/equipment/catalogs","type":0,"val":"catalogs","end":""}],
    types: placeholder as Registry['inventory.equipment.catalogs']['types'],
  },
  'inventory.equipment.index': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/equipment',
    tokens: [{"old":"/api/v1/equipment","type":0,"val":"api","end":""},{"old":"/api/v1/equipment","type":0,"val":"v1","end":""},{"old":"/api/v1/equipment","type":0,"val":"equipment","end":""}],
    types: placeholder as Registry['inventory.equipment.index']['types'],
  },
  'inventory.equipment.store': {
    methods: ["POST"],
    pattern: '/api/v1/equipment',
    tokens: [{"old":"/api/v1/equipment","type":0,"val":"api","end":""},{"old":"/api/v1/equipment","type":0,"val":"v1","end":""},{"old":"/api/v1/equipment","type":0,"val":"equipment","end":""}],
    types: placeholder as Registry['inventory.equipment.store']['types'],
  },
  'inventory.equipment.life_sheet': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/equipment/:id/life-sheet',
    tokens: [{"old":"/api/v1/equipment/:id/life-sheet","type":0,"val":"api","end":""},{"old":"/api/v1/equipment/:id/life-sheet","type":0,"val":"v1","end":""},{"old":"/api/v1/equipment/:id/life-sheet","type":0,"val":"equipment","end":""},{"old":"/api/v1/equipment/:id/life-sheet","type":1,"val":"id","end":""},{"old":"/api/v1/equipment/:id/life-sheet","type":0,"val":"life-sheet","end":""}],
    types: placeholder as Registry['inventory.equipment.life_sheet']['types'],
  },
  'inventory.equipment.show': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/equipment/:id',
    tokens: [{"old":"/api/v1/equipment/:id","type":0,"val":"api","end":""},{"old":"/api/v1/equipment/:id","type":0,"val":"v1","end":""},{"old":"/api/v1/equipment/:id","type":0,"val":"equipment","end":""},{"old":"/api/v1/equipment/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['inventory.equipment.show']['types'],
  },
  'inventory.equipment.update': {
    methods: ["PUT"],
    pattern: '/api/v1/equipment/:id',
    tokens: [{"old":"/api/v1/equipment/:id","type":0,"val":"api","end":""},{"old":"/api/v1/equipment/:id","type":0,"val":"v1","end":""},{"old":"/api/v1/equipment/:id","type":0,"val":"equipment","end":""},{"old":"/api/v1/equipment/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['inventory.equipment.update']['types'],
  },
  'inventory.equipment.patch': {
    methods: ["PATCH"],
    pattern: '/api/v1/equipment/:id',
    tokens: [{"old":"/api/v1/equipment/:id","type":0,"val":"api","end":""},{"old":"/api/v1/equipment/:id","type":0,"val":"v1","end":""},{"old":"/api/v1/equipment/:id","type":0,"val":"equipment","end":""},{"old":"/api/v1/equipment/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['inventory.equipment.patch']['types'],
  },
  'inventory.equipment.destroy': {
    methods: ["DELETE"],
    pattern: '/api/v1/equipment/:id',
    tokens: [{"old":"/api/v1/equipment/:id","type":0,"val":"api","end":""},{"old":"/api/v1/equipment/:id","type":0,"val":"v1","end":""},{"old":"/api/v1/equipment/:id","type":0,"val":"equipment","end":""},{"old":"/api/v1/equipment/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['inventory.equipment.destroy']['types'],
  },
  'inventory.equipment.assignments.index': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/equipment/:equipment_id/assignments',
    tokens: [{"old":"/api/v1/equipment/:equipment_id/assignments","type":0,"val":"api","end":""},{"old":"/api/v1/equipment/:equipment_id/assignments","type":0,"val":"v1","end":""},{"old":"/api/v1/equipment/:equipment_id/assignments","type":0,"val":"equipment","end":""},{"old":"/api/v1/equipment/:equipment_id/assignments","type":1,"val":"equipment_id","end":""},{"old":"/api/v1/equipment/:equipment_id/assignments","type":0,"val":"assignments","end":""}],
    types: placeholder as Registry['inventory.equipment.assignments.index']['types'],
  },
  'inventory.equipment.assignments.store': {
    methods: ["POST"],
    pattern: '/api/v1/equipment/:equipment_id/assignments',
    tokens: [{"old":"/api/v1/equipment/:equipment_id/assignments","type":0,"val":"api","end":""},{"old":"/api/v1/equipment/:equipment_id/assignments","type":0,"val":"v1","end":""},{"old":"/api/v1/equipment/:equipment_id/assignments","type":0,"val":"equipment","end":""},{"old":"/api/v1/equipment/:equipment_id/assignments","type":1,"val":"equipment_id","end":""},{"old":"/api/v1/equipment/:equipment_id/assignments","type":0,"val":"assignments","end":""}],
    types: placeholder as Registry['inventory.equipment.assignments.store']['types'],
  },
  'inventory.equipment.assignments.return_current': {
    methods: ["PATCH"],
    pattern: '/api/v1/equipment/:equipment_id/assignments/current/return',
    tokens: [{"old":"/api/v1/equipment/:equipment_id/assignments/current/return","type":0,"val":"api","end":""},{"old":"/api/v1/equipment/:equipment_id/assignments/current/return","type":0,"val":"v1","end":""},{"old":"/api/v1/equipment/:equipment_id/assignments/current/return","type":0,"val":"equipment","end":""},{"old":"/api/v1/equipment/:equipment_id/assignments/current/return","type":1,"val":"equipment_id","end":""},{"old":"/api/v1/equipment/:equipment_id/assignments/current/return","type":0,"val":"assignments","end":""},{"old":"/api/v1/equipment/:equipment_id/assignments/current/return","type":0,"val":"current","end":""},{"old":"/api/v1/equipment/:equipment_id/assignments/current/return","type":0,"val":"return","end":""}],
    types: placeholder as Registry['inventory.equipment.assignments.return_current']['types'],
  },
  'inventory.equipment.attachments.index': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/equipment/:equipment_id/attachments',
    tokens: [{"old":"/api/v1/equipment/:equipment_id/attachments","type":0,"val":"api","end":""},{"old":"/api/v1/equipment/:equipment_id/attachments","type":0,"val":"v1","end":""},{"old":"/api/v1/equipment/:equipment_id/attachments","type":0,"val":"equipment","end":""},{"old":"/api/v1/equipment/:equipment_id/attachments","type":1,"val":"equipment_id","end":""},{"old":"/api/v1/equipment/:equipment_id/attachments","type":0,"val":"attachments","end":""}],
    types: placeholder as Registry['inventory.equipment.attachments.index']['types'],
  },
  'inventory.equipment.attachments.store': {
    methods: ["POST"],
    pattern: '/api/v1/equipment/:equipment_id/attachments',
    tokens: [{"old":"/api/v1/equipment/:equipment_id/attachments","type":0,"val":"api","end":""},{"old":"/api/v1/equipment/:equipment_id/attachments","type":0,"val":"v1","end":""},{"old":"/api/v1/equipment/:equipment_id/attachments","type":0,"val":"equipment","end":""},{"old":"/api/v1/equipment/:equipment_id/attachments","type":1,"val":"equipment_id","end":""},{"old":"/api/v1/equipment/:equipment_id/attachments","type":0,"val":"attachments","end":""}],
    types: placeholder as Registry['inventory.equipment.attachments.store']['types'],
  },
  'inventory.equipment.attachments.show': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/equipment/:equipment_id/attachments/:id',
    tokens: [{"old":"/api/v1/equipment/:equipment_id/attachments/:id","type":0,"val":"api","end":""},{"old":"/api/v1/equipment/:equipment_id/attachments/:id","type":0,"val":"v1","end":""},{"old":"/api/v1/equipment/:equipment_id/attachments/:id","type":0,"val":"equipment","end":""},{"old":"/api/v1/equipment/:equipment_id/attachments/:id","type":1,"val":"equipment_id","end":""},{"old":"/api/v1/equipment/:equipment_id/attachments/:id","type":0,"val":"attachments","end":""},{"old":"/api/v1/equipment/:equipment_id/attachments/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['inventory.equipment.attachments.show']['types'],
  },
  'inventory.equipment.attachments.destroy': {
    methods: ["DELETE"],
    pattern: '/api/v1/equipment/:equipment_id/attachments/:id',
    tokens: [{"old":"/api/v1/equipment/:equipment_id/attachments/:id","type":0,"val":"api","end":""},{"old":"/api/v1/equipment/:equipment_id/attachments/:id","type":0,"val":"v1","end":""},{"old":"/api/v1/equipment/:equipment_id/attachments/:id","type":0,"val":"equipment","end":""},{"old":"/api/v1/equipment/:equipment_id/attachments/:id","type":1,"val":"equipment_id","end":""},{"old":"/api/v1/equipment/:equipment_id/attachments/:id","type":0,"val":"attachments","end":""},{"old":"/api/v1/equipment/:equipment_id/attachments/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['inventory.equipment.attachments.destroy']['types'],
  },
} as const satisfies Record<string, AdonisEndpoint>

export { routes }

export const registry = {
  routes,
  $tree: {} as ApiDefinition,
}

declare module '@tuyau/core/types' {
  export interface UserRegistry {
    routes: typeof routes
    $tree: ApiDefinition
  }
}
