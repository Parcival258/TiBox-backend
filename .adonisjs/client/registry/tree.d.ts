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
      destroy: typeof routes['settings.headquarters.destroy']
    }
    locations: {
      index: typeof routes['settings.locations.index']
      store: typeof routes['settings.locations.store']
      show: typeof routes['settings.locations.show']
      update: typeof routes['settings.locations.update']
      destroy: typeof routes['settings.locations.destroy']
    }
  }
  inventory: {
    equipment: {
      index: typeof routes['inventory.equipment.index']
      store: typeof routes['inventory.equipment.store']
      show: typeof routes['inventory.equipment.show']
      update: typeof routes['inventory.equipment.update']
      destroy: typeof routes['inventory.equipment.destroy']
    }
  }
}
