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
  'alerts.catalogs': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/alerts/catalogs',
    tokens: [{"old":"/api/v1/alerts/catalogs","type":0,"val":"api","end":""},{"old":"/api/v1/alerts/catalogs","type":0,"val":"v1","end":""},{"old":"/api/v1/alerts/catalogs","type":0,"val":"alerts","end":""},{"old":"/api/v1/alerts/catalogs","type":0,"val":"catalogs","end":""}],
    types: placeholder as Registry['alerts.catalogs']['types'],
  },
  'alerts.index': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/alerts',
    tokens: [{"old":"/api/v1/alerts","type":0,"val":"api","end":""},{"old":"/api/v1/alerts","type":0,"val":"v1","end":""},{"old":"/api/v1/alerts","type":0,"val":"alerts","end":""}],
    types: placeholder as Registry['alerts.index']['types'],
  },
  'alerts.run': {
    methods: ["POST"],
    pattern: '/api/v1/alerts/run',
    tokens: [{"old":"/api/v1/alerts/run","type":0,"val":"api","end":""},{"old":"/api/v1/alerts/run","type":0,"val":"v1","end":""},{"old":"/api/v1/alerts/run","type":0,"val":"alerts","end":""},{"old":"/api/v1/alerts/run","type":0,"val":"run","end":""}],
    types: placeholder as Registry['alerts.run']['types'],
  },
  'alerts.acknowledge': {
    methods: ["PATCH"],
    pattern: '/api/v1/alerts/:id/acknowledge',
    tokens: [{"old":"/api/v1/alerts/:id/acknowledge","type":0,"val":"api","end":""},{"old":"/api/v1/alerts/:id/acknowledge","type":0,"val":"v1","end":""},{"old":"/api/v1/alerts/:id/acknowledge","type":0,"val":"alerts","end":""},{"old":"/api/v1/alerts/:id/acknowledge","type":1,"val":"id","end":""},{"old":"/api/v1/alerts/:id/acknowledge","type":0,"val":"acknowledge","end":""}],
    types: placeholder as Registry['alerts.acknowledge']['types'],
  },
  'alerts.assign': {
    methods: ["PATCH"],
    pattern: '/api/v1/alerts/:id/assign',
    tokens: [{"old":"/api/v1/alerts/:id/assign","type":0,"val":"api","end":""},{"old":"/api/v1/alerts/:id/assign","type":0,"val":"v1","end":""},{"old":"/api/v1/alerts/:id/assign","type":0,"val":"alerts","end":""},{"old":"/api/v1/alerts/:id/assign","type":1,"val":"id","end":""},{"old":"/api/v1/alerts/:id/assign","type":0,"val":"assign","end":""}],
    types: placeholder as Registry['alerts.assign']['types'],
  },
  'alerts.self_assign': {
    methods: ["PATCH"],
    pattern: '/api/v1/alerts/:id/self-assign',
    tokens: [{"old":"/api/v1/alerts/:id/self-assign","type":0,"val":"api","end":""},{"old":"/api/v1/alerts/:id/self-assign","type":0,"val":"v1","end":""},{"old":"/api/v1/alerts/:id/self-assign","type":0,"val":"alerts","end":""},{"old":"/api/v1/alerts/:id/self-assign","type":1,"val":"id","end":""},{"old":"/api/v1/alerts/:id/self-assign","type":0,"val":"self-assign","end":""}],
    types: placeholder as Registry['alerts.self_assign']['types'],
  },
  'alerts.note': {
    methods: ["PATCH"],
    pattern: '/api/v1/alerts/:id/note',
    tokens: [{"old":"/api/v1/alerts/:id/note","type":0,"val":"api","end":""},{"old":"/api/v1/alerts/:id/note","type":0,"val":"v1","end":""},{"old":"/api/v1/alerts/:id/note","type":0,"val":"alerts","end":""},{"old":"/api/v1/alerts/:id/note","type":1,"val":"id","end":""},{"old":"/api/v1/alerts/:id/note","type":0,"val":"note","end":""}],
    types: placeholder as Registry['alerts.note']['types'],
  },
  'alerts.resolve': {
    methods: ["PATCH"],
    pattern: '/api/v1/alerts/:id/resolve',
    tokens: [{"old":"/api/v1/alerts/:id/resolve","type":0,"val":"api","end":""},{"old":"/api/v1/alerts/:id/resolve","type":0,"val":"v1","end":""},{"old":"/api/v1/alerts/:id/resolve","type":0,"val":"alerts","end":""},{"old":"/api/v1/alerts/:id/resolve","type":1,"val":"id","end":""},{"old":"/api/v1/alerts/:id/resolve","type":0,"val":"resolve","end":""}],
    types: placeholder as Registry['alerts.resolve']['types'],
  },
  'alerts.dismiss': {
    methods: ["PATCH"],
    pattern: '/api/v1/alerts/:id/dismiss',
    tokens: [{"old":"/api/v1/alerts/:id/dismiss","type":0,"val":"api","end":""},{"old":"/api/v1/alerts/:id/dismiss","type":0,"val":"v1","end":""},{"old":"/api/v1/alerts/:id/dismiss","type":0,"val":"alerts","end":""},{"old":"/api/v1/alerts/:id/dismiss","type":1,"val":"id","end":""},{"old":"/api/v1/alerts/:id/dismiss","type":0,"val":"dismiss","end":""}],
    types: placeholder as Registry['alerts.dismiss']['types'],
  },
  'dashboard.index': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/dashboard',
    tokens: [{"old":"/api/v1/dashboard","type":0,"val":"api","end":""},{"old":"/api/v1/dashboard","type":0,"val":"v1","end":""},{"old":"/api/v1/dashboard","type":0,"val":"dashboard","end":""}],
    types: placeholder as Registry['dashboard.index']['types'],
  },
  'realtime.token': {
    methods: ["POST"],
    pattern: '/api/v1/realtime/token',
    tokens: [{"old":"/api/v1/realtime/token","type":0,"val":"api","end":""},{"old":"/api/v1/realtime/token","type":0,"val":"v1","end":""},{"old":"/api/v1/realtime/token","type":0,"val":"realtime","end":""},{"old":"/api/v1/realtime/token","type":0,"val":"token","end":""}],
    types: placeholder as Registry['realtime.token']['types'],
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
  'users.index': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/users',
    tokens: [{"old":"/api/v1/users","type":0,"val":"api","end":""},{"old":"/api/v1/users","type":0,"val":"v1","end":""},{"old":"/api/v1/users","type":0,"val":"users","end":""}],
    types: placeholder as Registry['users.index']['types'],
  },
  'users.roles': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/users/roles',
    tokens: [{"old":"/api/v1/users/roles","type":0,"val":"api","end":""},{"old":"/api/v1/users/roles","type":0,"val":"v1","end":""},{"old":"/api/v1/users/roles","type":0,"val":"users","end":""},{"old":"/api/v1/users/roles","type":0,"val":"roles","end":""}],
    types: placeholder as Registry['users.roles']['types'],
  },
  'users.store': {
    methods: ["POST"],
    pattern: '/api/v1/users',
    tokens: [{"old":"/api/v1/users","type":0,"val":"api","end":""},{"old":"/api/v1/users","type":0,"val":"v1","end":""},{"old":"/api/v1/users","type":0,"val":"users","end":""}],
    types: placeholder as Registry['users.store']['types'],
  },
  'users.update': {
    methods: ["PATCH"],
    pattern: '/api/v1/users/:id',
    tokens: [{"old":"/api/v1/users/:id","type":0,"val":"api","end":""},{"old":"/api/v1/users/:id","type":0,"val":"v1","end":""},{"old":"/api/v1/users/:id","type":0,"val":"users","end":""},{"old":"/api/v1/users/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['users.update']['types'],
  },
  'users.destroy': {
    methods: ["DELETE"],
    pattern: '/api/v1/users/:id',
    tokens: [{"old":"/api/v1/users/:id","type":0,"val":"api","end":""},{"old":"/api/v1/users/:id","type":0,"val":"v1","end":""},{"old":"/api/v1/users/:id","type":0,"val":"users","end":""},{"old":"/api/v1/users/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['users.destroy']['types'],
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
  'inventory.equipment_loans.index': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/equipment-loans',
    tokens: [{"old":"/api/v1/equipment-loans","type":0,"val":"api","end":""},{"old":"/api/v1/equipment-loans","type":0,"val":"v1","end":""},{"old":"/api/v1/equipment-loans","type":0,"val":"equipment-loans","end":""}],
    types: placeholder as Registry['inventory.equipment_loans.index']['types'],
  },
  'inventory.equipment_loans.store': {
    methods: ["POST"],
    pattern: '/api/v1/equipment-loans',
    tokens: [{"old":"/api/v1/equipment-loans","type":0,"val":"api","end":""},{"old":"/api/v1/equipment-loans","type":0,"val":"v1","end":""},{"old":"/api/v1/equipment-loans","type":0,"val":"equipment-loans","end":""}],
    types: placeholder as Registry['inventory.equipment_loans.store']['types'],
  },
  'inventory.equipment_loans.return': {
    methods: ["PATCH"],
    pattern: '/api/v1/equipment-loans/:id/return',
    tokens: [{"old":"/api/v1/equipment-loans/:id/return","type":0,"val":"api","end":""},{"old":"/api/v1/equipment-loans/:id/return","type":0,"val":"v1","end":""},{"old":"/api/v1/equipment-loans/:id/return","type":0,"val":"equipment-loans","end":""},{"old":"/api/v1/equipment-loans/:id/return","type":1,"val":"id","end":""},{"old":"/api/v1/equipment-loans/:id/return","type":0,"val":"return","end":""}],
    types: placeholder as Registry['inventory.equipment_loans.return']['types'],
  },
  'inventory.maintenance.schedules.catalogs': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/maintenance/schedules/catalogs',
    tokens: [{"old":"/api/v1/maintenance/schedules/catalogs","type":0,"val":"api","end":""},{"old":"/api/v1/maintenance/schedules/catalogs","type":0,"val":"v1","end":""},{"old":"/api/v1/maintenance/schedules/catalogs","type":0,"val":"maintenance","end":""},{"old":"/api/v1/maintenance/schedules/catalogs","type":0,"val":"schedules","end":""},{"old":"/api/v1/maintenance/schedules/catalogs","type":0,"val":"catalogs","end":""}],
    types: placeholder as Registry['inventory.maintenance.schedules.catalogs']['types'],
  },
  'inventory.maintenance.schedules.index': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/maintenance/schedules',
    tokens: [{"old":"/api/v1/maintenance/schedules","type":0,"val":"api","end":""},{"old":"/api/v1/maintenance/schedules","type":0,"val":"v1","end":""},{"old":"/api/v1/maintenance/schedules","type":0,"val":"maintenance","end":""},{"old":"/api/v1/maintenance/schedules","type":0,"val":"schedules","end":""}],
    types: placeholder as Registry['inventory.maintenance.schedules.index']['types'],
  },
  'inventory.maintenance.schedules.store': {
    methods: ["POST"],
    pattern: '/api/v1/maintenance/schedules',
    tokens: [{"old":"/api/v1/maintenance/schedules","type":0,"val":"api","end":""},{"old":"/api/v1/maintenance/schedules","type":0,"val":"v1","end":""},{"old":"/api/v1/maintenance/schedules","type":0,"val":"maintenance","end":""},{"old":"/api/v1/maintenance/schedules","type":0,"val":"schedules","end":""}],
    types: placeholder as Registry['inventory.maintenance.schedules.store']['types'],
  },
  'inventory.maintenance.schedules.show': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/maintenance/schedules/:id',
    tokens: [{"old":"/api/v1/maintenance/schedules/:id","type":0,"val":"api","end":""},{"old":"/api/v1/maintenance/schedules/:id","type":0,"val":"v1","end":""},{"old":"/api/v1/maintenance/schedules/:id","type":0,"val":"maintenance","end":""},{"old":"/api/v1/maintenance/schedules/:id","type":0,"val":"schedules","end":""},{"old":"/api/v1/maintenance/schedules/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['inventory.maintenance.schedules.show']['types'],
  },
  'inventory.maintenance.schedules.update': {
    methods: ["PUT"],
    pattern: '/api/v1/maintenance/schedules/:id',
    tokens: [{"old":"/api/v1/maintenance/schedules/:id","type":0,"val":"api","end":""},{"old":"/api/v1/maintenance/schedules/:id","type":0,"val":"v1","end":""},{"old":"/api/v1/maintenance/schedules/:id","type":0,"val":"maintenance","end":""},{"old":"/api/v1/maintenance/schedules/:id","type":0,"val":"schedules","end":""},{"old":"/api/v1/maintenance/schedules/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['inventory.maintenance.schedules.update']['types'],
  },
  'inventory.maintenance.schedules.patch': {
    methods: ["PATCH"],
    pattern: '/api/v1/maintenance/schedules/:id',
    tokens: [{"old":"/api/v1/maintenance/schedules/:id","type":0,"val":"api","end":""},{"old":"/api/v1/maintenance/schedules/:id","type":0,"val":"v1","end":""},{"old":"/api/v1/maintenance/schedules/:id","type":0,"val":"maintenance","end":""},{"old":"/api/v1/maintenance/schedules/:id","type":0,"val":"schedules","end":""},{"old":"/api/v1/maintenance/schedules/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['inventory.maintenance.schedules.patch']['types'],
  },
  'inventory.maintenance.schedules.cancel': {
    methods: ["PATCH"],
    pattern: '/api/v1/maintenance/schedules/:id/cancel',
    tokens: [{"old":"/api/v1/maintenance/schedules/:id/cancel","type":0,"val":"api","end":""},{"old":"/api/v1/maintenance/schedules/:id/cancel","type":0,"val":"v1","end":""},{"old":"/api/v1/maintenance/schedules/:id/cancel","type":0,"val":"maintenance","end":""},{"old":"/api/v1/maintenance/schedules/:id/cancel","type":0,"val":"schedules","end":""},{"old":"/api/v1/maintenance/schedules/:id/cancel","type":1,"val":"id","end":""},{"old":"/api/v1/maintenance/schedules/:id/cancel","type":0,"val":"cancel","end":""}],
    types: placeholder as Registry['inventory.maintenance.schedules.cancel']['types'],
  },
  'inventory.maintenance.schedules.pending': {
    methods: ["PATCH"],
    pattern: '/api/v1/maintenance/schedules/:id/pending',
    tokens: [{"old":"/api/v1/maintenance/schedules/:id/pending","type":0,"val":"api","end":""},{"old":"/api/v1/maintenance/schedules/:id/pending","type":0,"val":"v1","end":""},{"old":"/api/v1/maintenance/schedules/:id/pending","type":0,"val":"maintenance","end":""},{"old":"/api/v1/maintenance/schedules/:id/pending","type":0,"val":"schedules","end":""},{"old":"/api/v1/maintenance/schedules/:id/pending","type":1,"val":"id","end":""},{"old":"/api/v1/maintenance/schedules/:id/pending","type":0,"val":"pending","end":""}],
    types: placeholder as Registry['inventory.maintenance.schedules.pending']['types'],
  },
  'inventory.maintenance.schedules.start': {
    methods: ["PATCH"],
    pattern: '/api/v1/maintenance/schedules/:id/start',
    tokens: [{"old":"/api/v1/maintenance/schedules/:id/start","type":0,"val":"api","end":""},{"old":"/api/v1/maintenance/schedules/:id/start","type":0,"val":"v1","end":""},{"old":"/api/v1/maintenance/schedules/:id/start","type":0,"val":"maintenance","end":""},{"old":"/api/v1/maintenance/schedules/:id/start","type":0,"val":"schedules","end":""},{"old":"/api/v1/maintenance/schedules/:id/start","type":1,"val":"id","end":""},{"old":"/api/v1/maintenance/schedules/:id/start","type":0,"val":"start","end":""}],
    types: placeholder as Registry['inventory.maintenance.schedules.start']['types'],
  },
  'inventory.maintenance.schedules.finish': {
    methods: ["PATCH"],
    pattern: '/api/v1/maintenance/schedules/:id/finish',
    tokens: [{"old":"/api/v1/maintenance/schedules/:id/finish","type":0,"val":"api","end":""},{"old":"/api/v1/maintenance/schedules/:id/finish","type":0,"val":"v1","end":""},{"old":"/api/v1/maintenance/schedules/:id/finish","type":0,"val":"maintenance","end":""},{"old":"/api/v1/maintenance/schedules/:id/finish","type":0,"val":"schedules","end":""},{"old":"/api/v1/maintenance/schedules/:id/finish","type":1,"val":"id","end":""},{"old":"/api/v1/maintenance/schedules/:id/finish","type":0,"val":"finish","end":""}],
    types: placeholder as Registry['inventory.maintenance.schedules.finish']['types'],
  },
  'inventory.maintenance.schedules.reschedule': {
    methods: ["PATCH"],
    pattern: '/api/v1/maintenance/schedules/:id/reschedule',
    tokens: [{"old":"/api/v1/maintenance/schedules/:id/reschedule","type":0,"val":"api","end":""},{"old":"/api/v1/maintenance/schedules/:id/reschedule","type":0,"val":"v1","end":""},{"old":"/api/v1/maintenance/schedules/:id/reschedule","type":0,"val":"maintenance","end":""},{"old":"/api/v1/maintenance/schedules/:id/reschedule","type":0,"val":"schedules","end":""},{"old":"/api/v1/maintenance/schedules/:id/reschedule","type":1,"val":"id","end":""},{"old":"/api/v1/maintenance/schedules/:id/reschedule","type":0,"val":"reschedule","end":""}],
    types: placeholder as Registry['inventory.maintenance.schedules.reschedule']['types'],
  },
  'inventory.maintenance.records.index': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/maintenance/records',
    tokens: [{"old":"/api/v1/maintenance/records","type":0,"val":"api","end":""},{"old":"/api/v1/maintenance/records","type":0,"val":"v1","end":""},{"old":"/api/v1/maintenance/records","type":0,"val":"maintenance","end":""},{"old":"/api/v1/maintenance/records","type":0,"val":"records","end":""}],
    types: placeholder as Registry['inventory.maintenance.records.index']['types'],
  },
  'inventory.maintenance.records.store': {
    methods: ["POST"],
    pattern: '/api/v1/maintenance/records',
    tokens: [{"old":"/api/v1/maintenance/records","type":0,"val":"api","end":""},{"old":"/api/v1/maintenance/records","type":0,"val":"v1","end":""},{"old":"/api/v1/maintenance/records","type":0,"val":"maintenance","end":""},{"old":"/api/v1/maintenance/records","type":0,"val":"records","end":""}],
    types: placeholder as Registry['inventory.maintenance.records.store']['types'],
  },
  'inventory.maintenance.records.show': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/maintenance/records/:id',
    tokens: [{"old":"/api/v1/maintenance/records/:id","type":0,"val":"api","end":""},{"old":"/api/v1/maintenance/records/:id","type":0,"val":"v1","end":""},{"old":"/api/v1/maintenance/records/:id","type":0,"val":"maintenance","end":""},{"old":"/api/v1/maintenance/records/:id","type":0,"val":"records","end":""},{"old":"/api/v1/maintenance/records/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['inventory.maintenance.records.show']['types'],
  },
  'inventory.maintenance.records.update': {
    methods: ["PUT"],
    pattern: '/api/v1/maintenance/records/:id',
    tokens: [{"old":"/api/v1/maintenance/records/:id","type":0,"val":"api","end":""},{"old":"/api/v1/maintenance/records/:id","type":0,"val":"v1","end":""},{"old":"/api/v1/maintenance/records/:id","type":0,"val":"maintenance","end":""},{"old":"/api/v1/maintenance/records/:id","type":0,"val":"records","end":""},{"old":"/api/v1/maintenance/records/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['inventory.maintenance.records.update']['types'],
  },
  'inventory.maintenance.records.patch': {
    methods: ["PATCH"],
    pattern: '/api/v1/maintenance/records/:id',
    tokens: [{"old":"/api/v1/maintenance/records/:id","type":0,"val":"api","end":""},{"old":"/api/v1/maintenance/records/:id","type":0,"val":"v1","end":""},{"old":"/api/v1/maintenance/records/:id","type":0,"val":"maintenance","end":""},{"old":"/api/v1/maintenance/records/:id","type":0,"val":"records","end":""},{"old":"/api/v1/maintenance/records/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['inventory.maintenance.records.patch']['types'],
  },
  'inventory.maintenance.records.close': {
    methods: ["PATCH"],
    pattern: '/api/v1/maintenance/records/:id/close',
    tokens: [{"old":"/api/v1/maintenance/records/:id/close","type":0,"val":"api","end":""},{"old":"/api/v1/maintenance/records/:id/close","type":0,"val":"v1","end":""},{"old":"/api/v1/maintenance/records/:id/close","type":0,"val":"maintenance","end":""},{"old":"/api/v1/maintenance/records/:id/close","type":0,"val":"records","end":""},{"old":"/api/v1/maintenance/records/:id/close","type":1,"val":"id","end":""},{"old":"/api/v1/maintenance/records/:id/close","type":0,"val":"close","end":""}],
    types: placeholder as Registry['inventory.maintenance.records.close']['types'],
  },
  'inventory.maintenance.records.attachments.index': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/maintenance/records/:record_id/attachments',
    tokens: [{"old":"/api/v1/maintenance/records/:record_id/attachments","type":0,"val":"api","end":""},{"old":"/api/v1/maintenance/records/:record_id/attachments","type":0,"val":"v1","end":""},{"old":"/api/v1/maintenance/records/:record_id/attachments","type":0,"val":"maintenance","end":""},{"old":"/api/v1/maintenance/records/:record_id/attachments","type":0,"val":"records","end":""},{"old":"/api/v1/maintenance/records/:record_id/attachments","type":1,"val":"record_id","end":""},{"old":"/api/v1/maintenance/records/:record_id/attachments","type":0,"val":"attachments","end":""}],
    types: placeholder as Registry['inventory.maintenance.records.attachments.index']['types'],
  },
  'inventory.maintenance.records.attachments.store': {
    methods: ["POST"],
    pattern: '/api/v1/maintenance/records/:record_id/attachments',
    tokens: [{"old":"/api/v1/maintenance/records/:record_id/attachments","type":0,"val":"api","end":""},{"old":"/api/v1/maintenance/records/:record_id/attachments","type":0,"val":"v1","end":""},{"old":"/api/v1/maintenance/records/:record_id/attachments","type":0,"val":"maintenance","end":""},{"old":"/api/v1/maintenance/records/:record_id/attachments","type":0,"val":"records","end":""},{"old":"/api/v1/maintenance/records/:record_id/attachments","type":1,"val":"record_id","end":""},{"old":"/api/v1/maintenance/records/:record_id/attachments","type":0,"val":"attachments","end":""}],
    types: placeholder as Registry['inventory.maintenance.records.attachments.store']['types'],
  },
  'inventory.maintenance.records.attachments.show': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/maintenance/records/:record_id/attachments/:id',
    tokens: [{"old":"/api/v1/maintenance/records/:record_id/attachments/:id","type":0,"val":"api","end":""},{"old":"/api/v1/maintenance/records/:record_id/attachments/:id","type":0,"val":"v1","end":""},{"old":"/api/v1/maintenance/records/:record_id/attachments/:id","type":0,"val":"maintenance","end":""},{"old":"/api/v1/maintenance/records/:record_id/attachments/:id","type":0,"val":"records","end":""},{"old":"/api/v1/maintenance/records/:record_id/attachments/:id","type":1,"val":"record_id","end":""},{"old":"/api/v1/maintenance/records/:record_id/attachments/:id","type":0,"val":"attachments","end":""},{"old":"/api/v1/maintenance/records/:record_id/attachments/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['inventory.maintenance.records.attachments.show']['types'],
  },
  'inventory.maintenance.records.attachments.destroy': {
    methods: ["DELETE"],
    pattern: '/api/v1/maintenance/records/:record_id/attachments/:id',
    tokens: [{"old":"/api/v1/maintenance/records/:record_id/attachments/:id","type":0,"val":"api","end":""},{"old":"/api/v1/maintenance/records/:record_id/attachments/:id","type":0,"val":"v1","end":""},{"old":"/api/v1/maintenance/records/:record_id/attachments/:id","type":0,"val":"maintenance","end":""},{"old":"/api/v1/maintenance/records/:record_id/attachments/:id","type":0,"val":"records","end":""},{"old":"/api/v1/maintenance/records/:record_id/attachments/:id","type":1,"val":"record_id","end":""},{"old":"/api/v1/maintenance/records/:record_id/attachments/:id","type":0,"val":"attachments","end":""},{"old":"/api/v1/maintenance/records/:record_id/attachments/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['inventory.maintenance.records.attachments.destroy']['types'],
  },
  'inventory.failure_reports.index': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/failure-reports',
    tokens: [{"old":"/api/v1/failure-reports","type":0,"val":"api","end":""},{"old":"/api/v1/failure-reports","type":0,"val":"v1","end":""},{"old":"/api/v1/failure-reports","type":0,"val":"failure-reports","end":""}],
    types: placeholder as Registry['inventory.failure_reports.index']['types'],
  },
  'inventory.failure_reports.store': {
    methods: ["POST"],
    pattern: '/api/v1/failure-reports',
    tokens: [{"old":"/api/v1/failure-reports","type":0,"val":"api","end":""},{"old":"/api/v1/failure-reports","type":0,"val":"v1","end":""},{"old":"/api/v1/failure-reports","type":0,"val":"failure-reports","end":""}],
    types: placeholder as Registry['inventory.failure_reports.store']['types'],
  },
  'inventory.failure_reports.show': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/failure-reports/:id',
    tokens: [{"old":"/api/v1/failure-reports/:id","type":0,"val":"api","end":""},{"old":"/api/v1/failure-reports/:id","type":0,"val":"v1","end":""},{"old":"/api/v1/failure-reports/:id","type":0,"val":"failure-reports","end":""},{"old":"/api/v1/failure-reports/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['inventory.failure_reports.show']['types'],
  },
  'inventory.failure_reports.update': {
    methods: ["PUT"],
    pattern: '/api/v1/failure-reports/:id',
    tokens: [{"old":"/api/v1/failure-reports/:id","type":0,"val":"api","end":""},{"old":"/api/v1/failure-reports/:id","type":0,"val":"v1","end":""},{"old":"/api/v1/failure-reports/:id","type":0,"val":"failure-reports","end":""},{"old":"/api/v1/failure-reports/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['inventory.failure_reports.update']['types'],
  },
  'inventory.failure_reports.patch': {
    methods: ["PATCH"],
    pattern: '/api/v1/failure-reports/:id',
    tokens: [{"old":"/api/v1/failure-reports/:id","type":0,"val":"api","end":""},{"old":"/api/v1/failure-reports/:id","type":0,"val":"v1","end":""},{"old":"/api/v1/failure-reports/:id","type":0,"val":"failure-reports","end":""},{"old":"/api/v1/failure-reports/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['inventory.failure_reports.patch']['types'],
  },
  'inventory.failure_reports.close': {
    methods: ["PATCH"],
    pattern: '/api/v1/failure-reports/:id/close',
    tokens: [{"old":"/api/v1/failure-reports/:id/close","type":0,"val":"api","end":""},{"old":"/api/v1/failure-reports/:id/close","type":0,"val":"v1","end":""},{"old":"/api/v1/failure-reports/:id/close","type":0,"val":"failure-reports","end":""},{"old":"/api/v1/failure-reports/:id/close","type":1,"val":"id","end":""},{"old":"/api/v1/failure-reports/:id/close","type":0,"val":"close","end":""}],
    types: placeholder as Registry['inventory.failure_reports.close']['types'],
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
