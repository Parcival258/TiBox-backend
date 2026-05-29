/* eslint-disable prettier/prettier */
/// <reference path="../manifest.d.ts" />

import type { ExtractBody, ExtractErrorResponse, ExtractQuery, ExtractQueryForGet, ExtractResponse } from '@tuyau/core/types'
import type { InferInput, SimpleError } from '@vinejs/vine/types'

export type ParamValue = string | number | bigint | boolean

export interface Registry {
  'auth.new_account.store': {
    methods: ["POST"]
    pattern: '/api/v1/auth/signup'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/user').signupValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#validators/user').signupValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/auth/new_account_controller').default['store']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/auth/new_account_controller').default['store']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'auth.session.login': {
    methods: ["POST"]
    pattern: '/api/v1/auth/login'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/user').loginValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#validators/user').loginValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/auth/session_controller').default['login']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/auth/session_controller').default['login']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'auth.session.logout': {
    methods: ["POST"]
    pattern: '/api/v1/auth/logout'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/auth/session_controller').default['logout']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/auth/session_controller').default['logout']>>>
    }
  }
  'session.me': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/me'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/auth/session_controller').default['me']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/auth/session_controller').default['me']>>>
    }
  }
  'profile.show': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/account/profile'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/auth/profile_controller').default['show']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/auth/profile_controller').default['show']>>>
    }
  }
  'dashboard.index': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/dashboard'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/reports/dashboard_controller').default['index']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/reports/dashboard_controller').default['index']>>>
    }
  }
  'settings.headquarters.index': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/headquarters'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/settings/headquarters_controller').default['index']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/settings/headquarters_controller').default['index']>>>
    }
  }
  'settings.headquarters.store': {
    methods: ["POST"]
    pattern: '/api/v1/headquarters'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/headquarter').headquarterValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#validators/headquarter').headquarterValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/settings/headquarters_controller').default['store']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/settings/headquarters_controller').default['store']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'settings.headquarters.show': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/headquarters/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/settings/headquarters_controller').default['show']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/settings/headquarters_controller').default['show']>>>
    }
  }
  'settings.headquarters.update': {
    methods: ["PUT"]
    pattern: '/api/v1/headquarters/:id'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/headquarter').headquarterValidator)>>
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: ExtractQuery<InferInput<(typeof import('#validators/headquarter').headquarterValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/settings/headquarters_controller').default['update']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/settings/headquarters_controller').default['update']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'settings.headquarters.patch': {
    methods: ["PATCH"]
    pattern: '/api/v1/headquarters/:id'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/headquarter').headquarterValidator)>>
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: ExtractQuery<InferInput<(typeof import('#validators/headquarter').headquarterValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/settings/headquarters_controller').default['update']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/settings/headquarters_controller').default['update']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'settings.headquarters.destroy': {
    methods: ["DELETE"]
    pattern: '/api/v1/headquarters/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/settings/headquarters_controller').default['destroy']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/settings/headquarters_controller').default['destroy']>>>
    }
  }
  'settings.locations.index': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/locations'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/settings/locations_controller').default['index']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/settings/locations_controller').default['index']>>>
    }
  }
  'settings.locations.store': {
    methods: ["POST"]
    pattern: '/api/v1/locations'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/location').locationValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#validators/location').locationValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/settings/locations_controller').default['store']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/settings/locations_controller').default['store']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'settings.locations.show': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/locations/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/settings/locations_controller').default['show']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/settings/locations_controller').default['show']>>>
    }
  }
  'settings.locations.update': {
    methods: ["PUT"]
    pattern: '/api/v1/locations/:id'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/location').locationValidator)>>
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: ExtractQuery<InferInput<(typeof import('#validators/location').locationValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/settings/locations_controller').default['update']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/settings/locations_controller').default['update']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'settings.locations.patch': {
    methods: ["PATCH"]
    pattern: '/api/v1/locations/:id'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/location').locationValidator)>>
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: ExtractQuery<InferInput<(typeof import('#validators/location').locationValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/settings/locations_controller').default['update']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/settings/locations_controller').default['update']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'settings.locations.destroy': {
    methods: ["DELETE"]
    pattern: '/api/v1/locations/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/settings/locations_controller').default['destroy']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/settings/locations_controller').default['destroy']>>>
    }
  }
  'inventory.equipment.catalogs': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/equipment/catalogs'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/inventory/equipment_catalogs_controller').default['index']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/inventory/equipment_catalogs_controller').default['index']>>>
    }
  }
  'inventory.equipment.index': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/equipment'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: ExtractQueryForGet<InferInput<(typeof import('#validators/equipment').listEquipmentValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/inventory/equipment_controller').default['index']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/inventory/equipment_controller').default['index']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'inventory.equipment.store': {
    methods: ["POST"]
    pattern: '/api/v1/equipment'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/equipment').createEquipmentValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#validators/equipment').createEquipmentValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/inventory/equipment_controller').default['store']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/inventory/equipment_controller').default['store']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'inventory.equipment.life_sheet': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/equipment/:id/life-sheet'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/inventory/equipment_controller').default['lifeSheet']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/inventory/equipment_controller').default['lifeSheet']>>>
    }
  }
  'inventory.equipment.show': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/equipment/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/inventory/equipment_controller').default['show']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/inventory/equipment_controller').default['show']>>>
    }
  }
  'inventory.equipment.update': {
    methods: ["PUT"]
    pattern: '/api/v1/equipment/:id'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/equipment').updateEquipmentValidator)>>
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: ExtractQuery<InferInput<(typeof import('#validators/equipment').updateEquipmentValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/inventory/equipment_controller').default['update']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/inventory/equipment_controller').default['update']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'inventory.equipment.patch': {
    methods: ["PATCH"]
    pattern: '/api/v1/equipment/:id'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/equipment').updateEquipmentValidator)>>
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: ExtractQuery<InferInput<(typeof import('#validators/equipment').updateEquipmentValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/inventory/equipment_controller').default['update']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/inventory/equipment_controller').default['update']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'inventory.equipment.destroy': {
    methods: ["DELETE"]
    pattern: '/api/v1/equipment/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/inventory/equipment_controller').default['destroy']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/inventory/equipment_controller').default['destroy']>>>
    }
  }
  'inventory.equipment.assignments.index': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/equipment/:equipment_id/assignments'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { equipment_id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/inventory/equipment_assignments_controller').default['index']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/inventory/equipment_assignments_controller').default['index']>>>
    }
  }
  'inventory.equipment.assignments.store': {
    methods: ["POST"]
    pattern: '/api/v1/equipment/:equipment_id/assignments'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/equipment_assignment').assignEquipmentValidator)>>
      paramsTuple: [ParamValue]
      params: { equipment_id: ParamValue }
      query: ExtractQuery<InferInput<(typeof import('#validators/equipment_assignment').assignEquipmentValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/inventory/equipment_assignments_controller').default['store']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/inventory/equipment_assignments_controller').default['store']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'inventory.equipment.assignments.return_current': {
    methods: ["PATCH"]
    pattern: '/api/v1/equipment/:equipment_id/assignments/current/return'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/equipment_assignment').returnEquipmentValidator)>>
      paramsTuple: [ParamValue]
      params: { equipment_id: ParamValue }
      query: ExtractQuery<InferInput<(typeof import('#validators/equipment_assignment').returnEquipmentValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/inventory/equipment_assignments_controller').default['returnCurrent']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/inventory/equipment_assignments_controller').default['returnCurrent']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'inventory.equipment.attachments.index': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/equipment/:equipment_id/attachments'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { equipment_id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/inventory/equipment_attachments_controller').default['index']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/inventory/equipment_attachments_controller').default['index']>>>
    }
  }
  'inventory.equipment.attachments.store': {
    methods: ["POST"]
    pattern: '/api/v1/equipment/:equipment_id/attachments'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/attachment').uploadEquipmentAttachmentValidator)>>
      paramsTuple: [ParamValue]
      params: { equipment_id: ParamValue }
      query: ExtractQuery<InferInput<(typeof import('#validators/attachment').uploadEquipmentAttachmentValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/inventory/equipment_attachments_controller').default['store']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/inventory/equipment_attachments_controller').default['store']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'inventory.equipment.attachments.show': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/equipment/:equipment_id/attachments/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue, ParamValue]
      params: { equipment_id: ParamValue; id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/inventory/equipment_attachments_controller').default['show']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/inventory/equipment_attachments_controller').default['show']>>>
    }
  }
  'inventory.equipment.attachments.destroy': {
    methods: ["DELETE"]
    pattern: '/api/v1/equipment/:equipment_id/attachments/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue, ParamValue]
      params: { equipment_id: ParamValue; id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/inventory/equipment_attachments_controller').default['destroy']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/inventory/equipment_attachments_controller').default['destroy']>>>
    }
  }
}
