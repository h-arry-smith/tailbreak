// As per the specification for Tailwind 2.0 config files return correctly formatted
// media strings

// TODO: Build example and test functionality in browser
// TODO: README.md
// TODO: Code style review before publish

const getMediaString = (media) => {
  // Guard, only string provided? Must be min breakpoint from default
  if (typeof media === 'string') {
    return `(min-width: ${media})`;
  }

  // Raw breakpoint
  if (media.raw) {
    return media.raw
  }
  // Min width breakpoint
  if (media.min && !media.max) {
    return `(min-width: ${media.min})`;
  }
  // Max width breakpoint
  if (media.max && !media.min) {
    return `(max-width: ${media.max})`;
  }
  // Max-Min range breakpoint
  if (media.max && media.min) {
    return `(min-width: ${media.min}) and (max-width: ${media.max})`;
  }
  // Handle array of options
  if (Array.isArray(media)) {
    // Recursively calculate each option provided
    const mediaStrings = [];
    for (m of media) {
      mediaStrings.push(getMediaString(m));
    }

    return mediaStrings.join(', ');
  }

  return media;
}

// Add breakpoints as properties to the handler, each with a MediaQueryList object to 
// watch for changes
const generateBreakpoints = (object, config) => {
  object.watch = {}
  for (breakpoint of Object.keys(config.theme.screens)) {
    // Add match watcher for the breakpoint
    const mediaString = getMediaString(config.theme.screens[breakpoint]);
    object.watch[breakpoint] = window.matchMedia(mediaString);

    // Add getter to that object that returns the match
    Object.defineProperty(object, breakpoint, {
      get: function () {return this.watch[breakpoint]}
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
