export const composeEnterHooksSeries = (...hooks) => {
  return (nextState, originalReplace, executeTransition) => {
    let cancelSeries = false
    const replace = location => {
      cancelSeries = true
      originalReplace(location)
    }
    (function executeHooksSynchronously (remainingHooks) {
      if (cancelSeries || !remainingHooks.length) {
        return executeTransition()
      }
      const nextHook = remainingHooks[0]
      if (nextHook.length >= 3) {
        nextHook.call(this, nextState, replace, () => {
          executeHooksSynchronously(remainingHooks.slice(1))
        })
      } else {
        nextHook.call(this, nextState, replace)
        executeHooksSynchronously(remainingHooks.slice(1))
      }
    }(hooks))
  }
}
