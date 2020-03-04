export const NOTIFICATION_SEND = 'NOTIFICATION_SEND'
export const NOTIFICATION_DISMISS = 'NOTIFICATION_DISMISS'
export const NOTIFICATION_CLEAR = 'NOTIFICATION_CLEAR'

/**
 * Publish a notification,
 * - if `dismissAfter` was set, the notification will be auto dismissed after the given period.
 * - if id wasn't specified, a time based id will be generated.``
 */

export const notificationSend = (message, options) => ({
  type: NOTIFICATION_SEND,
  payload: {
    id: new Date().getTime(),
    message,
    options,
  },
})


/**
 * Dismiss a notification by the given id.
 */
export function notificationDismiss(id) {
  return { type: NOTIFICATION_DISMISS, payload: id }
}

/**
 * Clear all notifications
 */
export function notificationClear() {
  return { type: NOTIFICATION_CLEAR }
}
