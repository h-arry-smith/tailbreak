const generateBreakpoints = (object, config) => {
  object.watch = {}
  for (breakpoint of Object.keys(config.theme.screens)) {
    // Add match watcher for the breakpoint
    const bpValue = config.theme.screens[breakpoint]
    object.watch[breakpoint] = window.matchMedia(`(min-width: ${bpValue})`)

    // Add getter to that object that returns the match
    Object.defineProperty(object, breakpoint, {
      get: () => {return object.watch[breakpoint].matches}
    })
  }
}

class BreakpointHandler{
  constructor(config) {
    generateBreakpoints(this, config);
  }
}

const Tailbreak = (config) => {
  return new BreakpointHandler(config);
}

module.exports = Tailbreak;

// TODO: Get keys of config and add getters to self