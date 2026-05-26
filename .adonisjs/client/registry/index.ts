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
    methods: ["PUT","PATCH"],
    pattern: '/api/v1/headquarters/:id',
    tokens: [{"old":"/api/v1/headquarters/:id","type":0,"val":"api","end":""},{"old":"/api/v1/headquarters/:id","type":0,"val":"v1","end":""},{"old":"/api/v1/headquarters/:id","type":0,"val":"headquarters","end":""},{"old":"/api/v1/headquarters/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['settings.headquarters.update']['types'],
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
    methods: ["PUT","PATCH"],
    pattern: '/api/v1/locations/:id',
    tokens: [{"old":"/api/v1/locations/:id","type":0,"val":"api","end":""},{"old":"/api/v1/locations/:id","type":0,"val":"v1","end":""},{"old":"/api/v1/locations/:id","type":0,"val":"locations","end":""},{"old":"/api/v1/locations/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['settings.locations.update']['types'],
  },
  'settings.locations.destroy': {
    methods: ["DELETE"],
    pattern: '/api/v1/locations/:id',
    tokens: [{"old":"/api/v1/locations/:id","type":0,"val":"api","end":""},{"old":"/api/v1/locations/:id","type":0,"val":"v1","end":""},{"old":"/api/v1/locations/:id","type":0,"val":"locations","end":""},{"old":"/api/v1/locations/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['settings.locations.destroy']['types'],
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
  'inventory.equipment.show': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/equipment/:id',
    tokens: [{"old":"/api/v1/equipment/:id","type":0,"val":"api","end":""},{"old":"/api/v1/equipment/:id","type":0,"val":"v1","end":""},{"old":"/api/v1/equipment/:id","type":0,"val":"equipment","end":""},{"old":"/api/v1/equipment/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['inventory.equipment.show']['types'],
  },
  'inventory.equipment.update': {
    methods: ["PUT","PATCH"],
    pattern: '/api/v1/equipment/:id',
    tokens: [{"old":"/api/v1/equipment/:id","type":0,"val":"api","end":""},{"old":"/api/v1/equipment/:id","type":0,"val":"v1","end":""},{"old":"/api/v1/equipment/:id","type":0,"val":"equipment","end":""},{"old":"/api/v1/equipment/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['inventory.equipment.update']['types'],
  },
  'inventory.equipment.destroy': {
    methods: ["DELETE"],
    pattern: '/api/v1/equipment/:id',
    tokens: [{"old":"/api/v1/equipment/:id","type":0,"val":"api","end":""},{"old":"/api/v1/equipment/:id","type":0,"val":"v1","end":""},{"old":"/api/v1/equipment/:id","type":0,"val":"equipment","end":""},{"old":"/api/v1/equipment/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['inventory.equipment.destroy']['types'],
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
