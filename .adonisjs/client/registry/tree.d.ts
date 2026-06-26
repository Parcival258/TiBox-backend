/* eslint-disable prettier/prettier */
import type { routes } from './index.ts'

export interface ApiDefinition {
  auth: {
    newAccount: {
      store: typeof routes['auth.new_account.store']
    }
    session: {
      login: typeof routes['auth.session.login']
      logout: typeof routes['auth.session.logout']
    }
  }
  session: {
    me: typeof routes['session.me']
  }
  profile: {
    show: typeof routes['profile.show']
  }
  alerts: {
    catalogs: typeof routes['alerts.catalogs']
    index: typeof routes['alerts.index']
    run: typeof routes['alerts.run']
    acknowledge: typeof routes['alerts.acknowledge']
    assign: typeof routes['alerts.assign']
    selfAssign: typeof routes['alerts.self_assign']
    note: typeof routes['alerts.note']
    resolve: typeof routes['alerts.resolve']
    dismiss: typeof routes['alerts.dismiss']
  }
  chat: {
    chat: {
      users: typeof routes['chat.chat.users']
      conversations: typeof routes['chat.chat.conversations']
      createDirect: typeof routes['chat.chat.create_direct']
      createGroup: typeof routes['chat.chat.create_group']
      messages: typeof routes['chat.chat.messages']
      createMessage: typeof routes['chat.chat.create_message']
      markRead: typeof routes['chat.chat.mark_read']
      clearMessages: typeof routes['chat.chat.clear_messages']
      deleteConversation: typeof routes['chat.chat.delete_conversation']
    }
  }
  dashboard: {
    index: typeof routes['dashboard.index']
  }
  realtime: {
    token: typeof routes['realtime.token']
  }
  settings: {
    headquarters: {
      index: typeof routes['settings.headquarters.index']
      store: typeof routes['settings.headquarters.store']
      show: typeof routes['settings.headquarters.show']
      update: typeof routes['settings.headquarters.update']
      patch: typeof routes['settings.headquarters.patch']
      destroy: typeof routes['settings.headquarters.destroy']
    }
    locations: {
      index: typeof routes['settings.locations.index']
      store: typeof routes['settings.locations.store']
      show: typeof routes['settings.locations.show']
      update: typeof routes['settings.locations.update']
      patch: typeof routes['settings.locations.patch']
      destroy: typeof routes['settings.locations.destroy']
    }
  }
  systemLogs: {
    errors: typeof routes['system_logs.errors']
    clearErrors: typeof routes['system_logs.clear_errors']
    settings: typeof routes['system_logs.settings']
    updateSettings: typeof routes['system_logs.update_settings']
  }
  users: {
    index: typeof routes['users.index']
    roles: typeof routes['users.roles']
    store: typeof routes['users.store']
    update: typeof routes['users.update']
    reactivate: typeof routes['users.reactivate']
    destroy: typeof routes['users.destroy']
  }
  inventory: {
    equipment: {
      catalogs: typeof routes['inventory.equipment.catalogs']
      index: typeof routes['inventory.equipment.index']
      store: typeof routes['inventory.equipment.store']
      lifeSheet: typeof routes['inventory.equipment.life_sheet']
      restore: typeof routes['inventory.equipment.restore']
      show: typeof routes['inventory.equipment.show']
      update: typeof routes['inventory.equipment.update']
      patch: typeof routes['inventory.equipment.patch']
      destroy: typeof routes['inventory.equipment.destroy']
      assignments: {
        index: typeof routes['inventory.equipment.assignments.index']
        store: typeof routes['inventory.equipment.assignments.store']
        returnCurrent: typeof routes['inventory.equipment.assignments.return_current']
      }
      attachments: {
        index: typeof routes['inventory.equipment.attachments.index']
        store: typeof routes['inventory.equipment.attachments.store']
        show: typeof routes['inventory.equipment.attachments.show']
        destroy: typeof routes['inventory.equipment.attachments.destroy']
      }
    }
    equipmentTypes: {
      index: typeof routes['inventory.equipment_types.index']
      store: typeof routes['inventory.equipment_types.store']
      update: typeof routes['inventory.equipment_types.update']
      destroy: typeof routes['inventory.equipment_types.destroy']
    }
    equipmentGroups: {
      index: typeof routes['inventory.equipment_groups.index']
      store: typeof routes['inventory.equipment_groups.store']
      show: typeof routes['inventory.equipment_groups.show']
      update: typeof routes['inventory.equipment_groups.update']
      destroy: typeof routes['inventory.equipment_groups.destroy']
      equipment: {
        attach: typeof routes['inventory.equipment_groups.equipment.attach']
        detach: typeof routes['inventory.equipment_groups.equipment.detach']
      }
    }
    equipmentLoans: {
      index: typeof routes['inventory.equipment_loans.index']
      requestableEquipment: typeof routes['inventory.equipment_loans.requestable_equipment']
      requests: {
        store: typeof routes['inventory.equipment_loans.requests.store']
      }
      store: typeof routes['inventory.equipment_loans.store']
      approve: typeof routes['inventory.equipment_loans.approve']
      reject: typeof routes['inventory.equipment_loans.reject']
      return: typeof routes['inventory.equipment_loans.return']
    }
    maintenance: {
      schedules: {
        catalogs: typeof routes['inventory.maintenance.schedules.catalogs']
        index: typeof routes['inventory.maintenance.schedules.index']
        store: typeof routes['inventory.maintenance.schedules.store']
        show: typeof routes['inventory.maintenance.schedules.show']
        update: typeof routes['inventory.maintenance.schedules.update']
        patch: typeof routes['inventory.maintenance.schedules.patch']
        cancel: typeof routes['inventory.maintenance.schedules.cancel']
        pending: typeof routes['inventory.maintenance.schedules.pending']
        start: typeof routes['inventory.maintenance.schedules.start']
        finish: typeof routes['inventory.maintenance.schedules.finish']
        reschedule: typeof routes['inventory.maintenance.schedules.reschedule']
      }
      records: {
        index: typeof routes['inventory.maintenance.records.index']
        store: typeof routes['inventory.maintenance.records.store']
        show: typeof routes['inventory.maintenance.records.show']
        update: typeof routes['inventory.maintenance.records.update']
        patch: typeof routes['inventory.maintenance.records.patch']
        close: typeof routes['inventory.maintenance.records.close']
        reception: typeof routes['inventory.maintenance.records.reception']
        execution: typeof routes['inventory.maintenance.records.execution']
        closure: typeof routes['inventory.maintenance.records.closure']
        history: typeof routes['inventory.maintenance.records.history']
        attachments: {
          index: typeof routes['inventory.maintenance.records.attachments.index']
          store: typeof routes['inventory.maintenance.records.attachments.store']
          show: typeof routes['inventory.maintenance.records.attachments.show']
          destroy: typeof routes['inventory.maintenance.records.attachments.destroy']
        }
      }
    }
    failureReports: {
      index: typeof routes['inventory.failure_reports.index']
      store: typeof routes['inventory.failure_reports.store']
      show: typeof routes['inventory.failure_reports.show']
      update: typeof routes['inventory.failure_reports.update']
      patch: typeof routes['inventory.failure_reports.patch']
      close: typeof routes['inventory.failure_reports.close']
    }
  }
}
