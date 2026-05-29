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
  dashboard: {
    index: typeof routes['dashboard.index']
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
  inventory: {
    equipment: {
      catalogs: typeof routes['inventory.equipment.catalogs']
      index: typeof routes['inventory.equipment.index']
      store: typeof routes['inventory.equipment.store']
      lifeSheet: typeof routes['inventory.equipment.life_sheet']
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
  }
}
