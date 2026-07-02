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
  'alerts.catalogs': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/alerts/catalogs'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/alerts/alerts_controller').default['catalogs']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/alerts/alerts_controller').default['catalogs']>>>
    }
  }
  'alerts.index': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/alerts'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: ExtractQueryForGet<InferInput<(typeof import('#validators/alert').listAlertValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/alerts/alerts_controller').default['index']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/alerts/alerts_controller').default['index']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'alerts.run': {
    methods: ["POST"]
    pattern: '/api/v1/alerts/run'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/alert').runAlertChecksValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#validators/alert').runAlertChecksValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/alerts/alerts_controller').default['runChecks']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/alerts/alerts_controller').default['runChecks']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'alerts.acknowledge': {
    methods: ["PATCH"]
    pattern: '/api/v1/alerts/:id/acknowledge'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/alerts/alerts_controller').default['acknowledge']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/alerts/alerts_controller').default['acknowledge']>>>
    }
  }
  'alerts.assign': {
    methods: ["PATCH"]
    pattern: '/api/v1/alerts/:id/assign'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/alert').assignAlertValidator)>>
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: ExtractQuery<InferInput<(typeof import('#validators/alert').assignAlertValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/alerts/alerts_controller').default['assign']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/alerts/alerts_controller').default['assign']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'alerts.self_assign': {
    methods: ["PATCH"]
    pattern: '/api/v1/alerts/:id/self-assign'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/alerts/alerts_controller').default['selfAssign']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/alerts/alerts_controller').default['selfAssign']>>>
    }
  }
  'alerts.note': {
    methods: ["PATCH"]
    pattern: '/api/v1/alerts/:id/note'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/alert').alertNoteValidator)>>
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: ExtractQuery<InferInput<(typeof import('#validators/alert').alertNoteValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/alerts/alerts_controller').default['addNote']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/alerts/alerts_controller').default['addNote']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'alerts.resolve': {
    methods: ["PATCH"]
    pattern: '/api/v1/alerts/:id/resolve'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/alerts/alerts_controller').default['resolve']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/alerts/alerts_controller').default['resolve']>>>
    }
  }
  'alerts.dismiss': {
    methods: ["PATCH"]
    pattern: '/api/v1/alerts/:id/dismiss'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/alerts/alerts_controller').default['dismiss']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/alerts/alerts_controller').default['dismiss']>>>
    }
  }
  'chat.chat.users': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/chat/users'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/chat/chat_controller').default['users']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/chat/chat_controller').default['users']>>>
    }
  }
  'chat.chat.conversations': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/chat/conversations'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/chat/chat_controller').default['conversations']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/chat/chat_controller').default['conversations']>>>
    }
  }
  'chat.chat.create_direct': {
    methods: ["POST"]
    pattern: '/api/v1/chat/conversations/direct'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/chat').createDirectConversationValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#validators/chat').createDirectConversationValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/chat/chat_controller').default['createDirect']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/chat/chat_controller').default['createDirect']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'chat.chat.create_group': {
    methods: ["POST"]
    pattern: '/api/v1/chat/conversations/group'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/chat').createGroupConversationValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#validators/chat').createGroupConversationValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/chat/chat_controller').default['createGroup']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/chat/chat_controller').default['createGroup']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'chat.chat.messages': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/chat/conversations/:id/messages'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: ExtractQueryForGet<InferInput<(typeof import('#validators/chat').listChatMessagesValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/chat/chat_controller').default['messages']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/chat/chat_controller').default['messages']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'chat.chat.create_message': {
    methods: ["POST"]
    pattern: '/api/v1/chat/conversations/:id/messages'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/chat').createChatMessageValidator)>>
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: ExtractQuery<InferInput<(typeof import('#validators/chat').createChatMessageValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/chat/chat_controller').default['createMessage']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/chat/chat_controller').default['createMessage']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'chat.chat.mark_read': {
    methods: ["POST"]
    pattern: '/api/v1/chat/conversations/:id/read'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/chat').markChatReadValidator)>>
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: ExtractQuery<InferInput<(typeof import('#validators/chat').markChatReadValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/chat/chat_controller').default['markRead']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/chat/chat_controller').default['markRead']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'chat.chat.clear_messages': {
    methods: ["DELETE"]
    pattern: '/api/v1/chat/conversations/:id/messages'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/chat/chat_controller').default['clearMessages']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/chat/chat_controller').default['clearMessages']>>>
    }
  }
  'chat.chat.delete_conversation': {
    methods: ["DELETE"]
    pattern: '/api/v1/chat/conversations/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/chat/chat_controller').default['deleteConversation']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/chat/chat_controller').default['deleteConversation']>>>
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
  'realtime.token': {
    methods: ["POST"]
    pattern: '/api/v1/realtime/token'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/realtime/realtime_tokens_controller').default['store']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/realtime/realtime_tokens_controller').default['store']>>>
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
  'system_logs.errors': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/system-logs/errors'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/system/system_logs_controller').default['errors']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/system/system_logs_controller').default['errors']>>>
    }
  }
  'system_logs.clear_errors': {
    methods: ["DELETE"]
    pattern: '/api/v1/system-logs/errors'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/system/system_logs_controller').default['clearErrors']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/system/system_logs_controller').default['clearErrors']>>>
    }
  }
  'system_logs.settings': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/system-logs/settings'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/system/system_logs_controller').default['settings']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/system/system_logs_controller').default['settings']>>>
    }
  }
  'system_logs.update_settings': {
    methods: ["PATCH"]
    pattern: '/api/v1/system-logs/settings'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/system/system_logs_controller').default['updateSettings']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/system/system_logs_controller').default['updateSettings']>>>
    }
  }
  'users.index': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/users'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/users/users_controller').default['index']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/users/users_controller').default['index']>>>
    }
  }
  'users.roles': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/users/roles'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/users/users_controller').default['roles']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/users/users_controller').default['roles']>>>
    }
  }
  'users.store': {
    methods: ["POST"]
    pattern: '/api/v1/users'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/user').userCreateValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#validators/user').userCreateValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/users/users_controller').default['store']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/users/users_controller').default['store']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'users.update': {
    methods: ["PATCH"]
    pattern: '/api/v1/users/:id'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/user').userUpdateValidator)>>
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: ExtractQuery<InferInput<(typeof import('#validators/user').userUpdateValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/users/users_controller').default['update']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/users/users_controller').default['update']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'users.reactivate': {
    methods: ["PATCH"]
    pattern: '/api/v1/users/:id/reactivate'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/users/users_controller').default['reactivate']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/users/users_controller').default['reactivate']>>>
    }
  }
  'users.destroy': {
    methods: ["DELETE"]
    pattern: '/api/v1/users/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/users/users_controller').default['destroy']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/users/users_controller').default['destroy']>>>
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
  'inventory.equipment_types.index': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/equipment-types'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/inventory/equipment_types_controller').default['index']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/inventory/equipment_types_controller').default['index']>>>
    }
  }
  'inventory.equipment_types.store': {
    methods: ["POST"]
    pattern: '/api/v1/equipment-types'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/equipment_type').equipmentTypeValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#validators/equipment_type').equipmentTypeValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/inventory/equipment_types_controller').default['store']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/inventory/equipment_types_controller').default['store']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'inventory.equipment_types.update': {
    methods: ["PATCH"]
    pattern: '/api/v1/equipment-types/:id'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/equipment_type').equipmentTypeValidator)>>
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: ExtractQuery<InferInput<(typeof import('#validators/equipment_type').equipmentTypeValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/inventory/equipment_types_controller').default['update']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/inventory/equipment_types_controller').default['update']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'inventory.equipment_types.destroy': {
    methods: ["DELETE"]
    pattern: '/api/v1/equipment-types/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/inventory/equipment_types_controller').default['destroy']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/inventory/equipment_types_controller').default['destroy']>>>
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
  'inventory.equipment.restore': {
    methods: ["PATCH"]
    pattern: '/api/v1/equipment/:id/restore'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/inventory/equipment_controller').default['restore']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/inventory/equipment_controller').default['restore']>>>
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
  'inventory.equipment_groups.index': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/equipment-groups'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/inventory/equipment_groups_controller').default['index']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/inventory/equipment_groups_controller').default['index']>>>
    }
  }
  'inventory.equipment_groups.store': {
    methods: ["POST"]
    pattern: '/api/v1/equipment-groups'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/equipment_group').createEquipmentGroupValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#validators/equipment_group').createEquipmentGroupValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/inventory/equipment_groups_controller').default['store']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/inventory/equipment_groups_controller').default['store']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'inventory.equipment_groups.show': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/equipment-groups/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/inventory/equipment_groups_controller').default['show']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/inventory/equipment_groups_controller').default['show']>>>
    }
  }
  'inventory.equipment_groups.update': {
    methods: ["PATCH"]
    pattern: '/api/v1/equipment-groups/:id'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/equipment_group').updateEquipmentGroupValidator)>>
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: ExtractQuery<InferInput<(typeof import('#validators/equipment_group').updateEquipmentGroupValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/inventory/equipment_groups_controller').default['update']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/inventory/equipment_groups_controller').default['update']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'inventory.equipment_groups.destroy': {
    methods: ["DELETE"]
    pattern: '/api/v1/equipment-groups/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/inventory/equipment_groups_controller').default['destroy']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/inventory/equipment_groups_controller').default['destroy']>>>
    }
  }
  'inventory.equipment_groups.equipment.attach': {
    methods: ["POST"]
    pattern: '/api/v1/equipment-groups/:id/equipment'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/equipment_group').equipmentGroupEquipmentValidator)>>
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: ExtractQuery<InferInput<(typeof import('#validators/equipment_group').equipmentGroupEquipmentValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/inventory/equipment_groups_controller').default['attachEquipment']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/inventory/equipment_groups_controller').default['attachEquipment']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'inventory.equipment_groups.equipment.detach': {
    methods: ["DELETE"]
    pattern: '/api/v1/equipment-groups/:id/equipment/:equipment_id'
    types: {
      body: {}
      paramsTuple: [ParamValue, ParamValue]
      params: { id: ParamValue; equipment_id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/inventory/equipment_groups_controller').default['detachEquipment']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/inventory/equipment_groups_controller').default['detachEquipment']>>>
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
  'inventory.equipment_loans.index': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/equipment-loans'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: ExtractQueryForGet<InferInput<(typeof import('#validators/equipment_loan').listEquipmentLoansValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/inventory/equipment_loans_controller').default['index']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/inventory/equipment_loans_controller').default['index']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'inventory.equipment_loans.requestable_equipment': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/equipment-loans/requestable-equipment'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/inventory/equipment_loans_controller').default['requestableEquipment']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/inventory/equipment_loans_controller').default['requestableEquipment']>>>
    }
  }
  'inventory.equipment_loans.requests.store': {
    methods: ["POST"]
    pattern: '/api/v1/equipment-loans/requests'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/equipment_loan').requestEquipmentLoanValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#validators/equipment_loan').requestEquipmentLoanValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/inventory/equipment_loans_controller').default['requestLoan']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/inventory/equipment_loans_controller').default['requestLoan']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'inventory.equipment_loans.store': {
    methods: ["POST"]
    pattern: '/api/v1/equipment-loans'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/equipment_loan').createEquipmentLoanValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#validators/equipment_loan').createEquipmentLoanValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/inventory/equipment_loans_controller').default['store']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/inventory/equipment_loans_controller').default['store']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'inventory.equipment_loans.approve': {
    methods: ["PATCH"]
    pattern: '/api/v1/equipment-loans/:id/approve'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/equipment_loan').approveEquipmentLoanValidator)>>
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: ExtractQuery<InferInput<(typeof import('#validators/equipment_loan').approveEquipmentLoanValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/inventory/equipment_loans_controller').default['approve']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/inventory/equipment_loans_controller').default['approve']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'inventory.equipment_loans.reject': {
    methods: ["PATCH"]
    pattern: '/api/v1/equipment-loans/:id/reject'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/equipment_loan').rejectEquipmentLoanValidator)>>
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: ExtractQuery<InferInput<(typeof import('#validators/equipment_loan').rejectEquipmentLoanValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/inventory/equipment_loans_controller').default['reject']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/inventory/equipment_loans_controller').default['reject']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'inventory.equipment_loans.return': {
    methods: ["PATCH"]
    pattern: '/api/v1/equipment-loans/:id/return'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/equipment_loan').returnEquipmentLoanValidator)>>
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: ExtractQuery<InferInput<(typeof import('#validators/equipment_loan').returnEquipmentLoanValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/inventory/equipment_loans_controller').default['returnLoan']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/inventory/equipment_loans_controller').default['returnLoan']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'inventory.maintenance.schedules.catalogs': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/maintenance/schedules/catalogs'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/inventory/maintenance_schedules_controller').default['catalogs']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/inventory/maintenance_schedules_controller').default['catalogs']>>>
    }
  }
  'inventory.maintenance.schedules.index': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/maintenance/schedules'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: ExtractQueryForGet<InferInput<(typeof import('#validators/maintenance').listMaintenanceScheduleValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/inventory/maintenance_schedules_controller').default['index']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/inventory/maintenance_schedules_controller').default['index']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'inventory.maintenance.schedules.store': {
    methods: ["POST"]
    pattern: '/api/v1/maintenance/schedules'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/maintenance').createMaintenanceScheduleValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#validators/maintenance').createMaintenanceScheduleValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/inventory/maintenance_schedules_controller').default['store']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/inventory/maintenance_schedules_controller').default['store']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'inventory.maintenance.schedules.show': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/maintenance/schedules/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/inventory/maintenance_schedules_controller').default['show']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/inventory/maintenance_schedules_controller').default['show']>>>
    }
  }
  'inventory.maintenance.schedules.update': {
    methods: ["PUT"]
    pattern: '/api/v1/maintenance/schedules/:id'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/maintenance').updateMaintenanceScheduleValidator)>>
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: ExtractQuery<InferInput<(typeof import('#validators/maintenance').updateMaintenanceScheduleValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/inventory/maintenance_schedules_controller').default['update']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/inventory/maintenance_schedules_controller').default['update']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'inventory.maintenance.schedules.patch': {
    methods: ["PATCH"]
    pattern: '/api/v1/maintenance/schedules/:id'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/maintenance').updateMaintenanceScheduleValidator)>>
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: ExtractQuery<InferInput<(typeof import('#validators/maintenance').updateMaintenanceScheduleValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/inventory/maintenance_schedules_controller').default['update']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/inventory/maintenance_schedules_controller').default['update']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'inventory.maintenance.schedules.cancel': {
    methods: ["PATCH"]
    pattern: '/api/v1/maintenance/schedules/:id/cancel'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/inventory/maintenance_schedules_controller').default['cancel']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/inventory/maintenance_schedules_controller').default['cancel']>>>
    }
  }
  'inventory.maintenance.schedules.pending': {
    methods: ["PATCH"]
    pattern: '/api/v1/maintenance/schedules/:id/pending'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/inventory/maintenance_schedules_controller').default['markPending']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/inventory/maintenance_schedules_controller').default['markPending']>>>
    }
  }
  'inventory.maintenance.schedules.start': {
    methods: ["PATCH"]
    pattern: '/api/v1/maintenance/schedules/:id/start'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/inventory/maintenance_schedules_controller').default['start']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/inventory/maintenance_schedules_controller').default['start']>>>
    }
  }
  'inventory.maintenance.schedules.finish': {
    methods: ["PATCH"]
    pattern: '/api/v1/maintenance/schedules/:id/finish'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/inventory/maintenance_schedules_controller').default['finish']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/inventory/maintenance_schedules_controller').default['finish']>>>
    }
  }
  'inventory.maintenance.schedules.reschedule': {
    methods: ["PATCH"]
    pattern: '/api/v1/maintenance/schedules/:id/reschedule'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/maintenance').rescheduleMaintenanceScheduleValidator)>>
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: ExtractQuery<InferInput<(typeof import('#validators/maintenance').rescheduleMaintenanceScheduleValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/inventory/maintenance_schedules_controller').default['reschedule']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/inventory/maintenance_schedules_controller').default['reschedule']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'inventory.maintenance.records.index': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/maintenance/records'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: ExtractQueryForGet<InferInput<(typeof import('#validators/maintenance').listMaintenanceRecordValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/inventory/maintenance_records_controller').default['index']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/inventory/maintenance_records_controller').default['index']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'inventory.maintenance.records.store': {
    methods: ["POST"]
    pattern: '/api/v1/maintenance/records'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/maintenance').createMaintenanceRecordValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#validators/maintenance').createMaintenanceRecordValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/inventory/maintenance_records_controller').default['store']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/inventory/maintenance_records_controller').default['store']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'inventory.maintenance.records.show': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/maintenance/records/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/inventory/maintenance_records_controller').default['show']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/inventory/maintenance_records_controller').default['show']>>>
    }
  }
  'inventory.maintenance.records.update': {
    methods: ["PUT"]
    pattern: '/api/v1/maintenance/records/:id'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/maintenance').updateMaintenanceRecordValidator)>>
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: ExtractQuery<InferInput<(typeof import('#validators/maintenance').updateMaintenanceRecordValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/inventory/maintenance_records_controller').default['update']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/inventory/maintenance_records_controller').default['update']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'inventory.maintenance.records.patch': {
    methods: ["PATCH"]
    pattern: '/api/v1/maintenance/records/:id'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/maintenance').updateMaintenanceRecordValidator)>>
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: ExtractQuery<InferInput<(typeof import('#validators/maintenance').updateMaintenanceRecordValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/inventory/maintenance_records_controller').default['update']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/inventory/maintenance_records_controller').default['update']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'inventory.maintenance.records.close': {
    methods: ["PATCH"]
    pattern: '/api/v1/maintenance/records/:id/close'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/maintenance').closeMaintenanceRecordValidator)>>
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: ExtractQuery<InferInput<(typeof import('#validators/maintenance').closeMaintenanceRecordValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/inventory/maintenance_records_controller').default['close']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/inventory/maintenance_records_controller').default['close']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'inventory.maintenance.records.reception': {
    methods: ["PATCH"]
    pattern: '/api/v1/maintenance/records/:id/reception'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/maintenance').updateMaintenanceReceptionValidator)>>
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: ExtractQuery<InferInput<(typeof import('#validators/maintenance').updateMaintenanceReceptionValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/inventory/maintenance_records_controller').default['updateReception']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/inventory/maintenance_records_controller').default['updateReception']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'inventory.maintenance.records.execution': {
    methods: ["PATCH"]
    pattern: '/api/v1/maintenance/records/:id/execution'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/maintenance').updateMaintenanceExecutionValidator)>>
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: ExtractQuery<InferInput<(typeof import('#validators/maintenance').updateMaintenanceExecutionValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/inventory/maintenance_records_controller').default['updateExecution']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/inventory/maintenance_records_controller').default['updateExecution']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'inventory.maintenance.records.closure': {
    methods: ["PATCH"]
    pattern: '/api/v1/maintenance/records/:id/closure'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/maintenance').updateMaintenanceClosureValidator)>>
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: ExtractQuery<InferInput<(typeof import('#validators/maintenance').updateMaintenanceClosureValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/inventory/maintenance_records_controller').default['updateClosure']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/inventory/maintenance_records_controller').default['updateClosure']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'inventory.maintenance.records.history': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/maintenance/records/:id/history'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/inventory/maintenance_records_controller').default['history']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/inventory/maintenance_records_controller').default['history']>>>
    }
  }
  'inventory.maintenance.records.attachments.index': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/maintenance/records/:record_id/attachments'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { record_id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/inventory/maintenance_record_attachments_controller').default['index']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/inventory/maintenance_record_attachments_controller').default['index']>>>
    }
  }
  'inventory.maintenance.records.attachments.store': {
    methods: ["POST"]
    pattern: '/api/v1/maintenance/records/:record_id/attachments'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/attachment').uploadMaintenanceRecordAttachmentValidator)>>
      paramsTuple: [ParamValue]
      params: { record_id: ParamValue }
      query: ExtractQuery<InferInput<(typeof import('#validators/attachment').uploadMaintenanceRecordAttachmentValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/inventory/maintenance_record_attachments_controller').default['store']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/inventory/maintenance_record_attachments_controller').default['store']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'inventory.maintenance.records.attachments.show': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/maintenance/records/:record_id/attachments/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue, ParamValue]
      params: { record_id: ParamValue; id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/inventory/maintenance_record_attachments_controller').default['show']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/inventory/maintenance_record_attachments_controller').default['show']>>>
    }
  }
  'inventory.maintenance.records.attachments.destroy': {
    methods: ["DELETE"]
    pattern: '/api/v1/maintenance/records/:record_id/attachments/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue, ParamValue]
      params: { record_id: ParamValue; id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/inventory/maintenance_record_attachments_controller').default['destroy']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/inventory/maintenance_record_attachments_controller').default['destroy']>>>
    }
  }
  'inventory.failure_reports.index': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/failure-reports'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: ExtractQueryForGet<InferInput<(typeof import('#validators/failure_report').listFailureReportValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/inventory/failure_reports_controller').default['index']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/inventory/failure_reports_controller').default['index']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'inventory.failure_reports.store': {
    methods: ["POST"]
    pattern: '/api/v1/failure-reports'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/failure_report').createFailureReportValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#validators/failure_report').createFailureReportValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/inventory/failure_reports_controller').default['store']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/inventory/failure_reports_controller').default['store']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'inventory.failure_reports.show': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/failure-reports/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/inventory/failure_reports_controller').default['show']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/inventory/failure_reports_controller').default['show']>>>
    }
  }
  'inventory.failure_reports.update': {
    methods: ["PUT"]
    pattern: '/api/v1/failure-reports/:id'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/failure_report').updateFailureReportValidator)>>
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: ExtractQuery<InferInput<(typeof import('#validators/failure_report').updateFailureReportValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/inventory/failure_reports_controller').default['update']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/inventory/failure_reports_controller').default['update']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'inventory.failure_reports.patch': {
    methods: ["PATCH"]
    pattern: '/api/v1/failure-reports/:id'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/failure_report').updateFailureReportValidator)>>
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: ExtractQuery<InferInput<(typeof import('#validators/failure_report').updateFailureReportValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/inventory/failure_reports_controller').default['update']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/inventory/failure_reports_controller').default['update']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'inventory.failure_reports.close': {
    methods: ["PATCH"]
    pattern: '/api/v1/failure-reports/:id/close'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/failure_report').closeFailureReportValidator)>>
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: ExtractQuery<InferInput<(typeof import('#validators/failure_report').closeFailureReportValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/inventory/failure_reports_controller').default['close']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/inventory/failure_reports_controller').default['close']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
}
