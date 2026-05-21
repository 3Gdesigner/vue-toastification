import { InferDefaults } from "../types/vue-helper"

import type { ToastOptions } from "../types/toast"
import type { ToastContainerOptions } from "../types/toastContainer"

import { POSITION, VT_NAMESPACE, TYPE } from "./constants"
import { EventBus } from "./eventBus"

const defaultEventBus = /* istanbul ignore next */ () => new EventBus()
const emptyFunction = /* istanbul ignore next */ () => {}

export const TOAST_DEFAULTS: Required<InferDefaults<Readonly<ToastOptions>>> = {
  id: 0,
  accessibility: () => ({
    toastRole: "alert",
    closeButtonLabel: "close",
  }),
  bodyClassName: () => [],
  closeButton: () => "button",
  closeButtonClassName: () => [],
  closeOnClick: true,
  draggable: true,
  draggablePercent: 0.6,
  eventBus: defaultEventBus,
  hideProgressBar: false,
  icon: () => true,
  pauseOnFocusLoss: true,
  pauseOnHover: true,
  position: POSITION.TOP_RIGHT,
  rtl: false,
  showCloseButtonOnHover: false,
  timeout: 5000,
  toastClassName: () => [],
  onClick: emptyFunction,
  onClose: emptyFunction,
  type: TYPE.DEFAULT,
}

export const TOAST_CONTAINER_DEFAULTS: Required<
  InferDefaults<Readonly<ToastContainerOptions>>
> = {
  position: TOAST_DEFAULTS.position,
  container: () => document.body,
  containerClassName: () => [],
  eventBus: defaultEventBus,
  filterBeforeCreate: (toast => toast) as NonNullable<
    ToastContainerOptions["filterBeforeCreate"]
  >,
  filterToasts: (toasts => toasts) as NonNullable<
    ToastContainerOptions["filterToasts"]
  >,
  maxToasts: 20,
  newestOnTop: true,
  toastDefaults: () => ({}),
  transition: `${VT_NAMESPACE}__bounce`,
  defaultToastProps: /* istanbul ignore next */ () => ({}),
}
