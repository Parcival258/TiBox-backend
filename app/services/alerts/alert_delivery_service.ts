import Alert from '#models/alert'

export default class AlertDeliveryService {
  async prepare(alert: Alert) {
    return {
      alertId: alert.id,
      channels: alert.channels,
      emailReady: alert.channels.includes('email'),
      internalReady: alert.channels.includes('internal'),
    }
  }
}
