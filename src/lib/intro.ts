/**
 * Homepage intro bookkeeping. The intro plays on every full page load / refresh
 * of the homepage (no storage is used), but not when the visitor returns to
 * the homepage through in-app navigation.
 */
export const introState = {
  /** Set by the scroll manager after the first in-app navigation. */
  navigated: false,
  /** True once the intro has started in this page load. */
  played: false,
}

export const releaseIntroHold = () => {
  if (typeof document !== 'undefined') document.documentElement.classList.remove('intro-pending')
}
