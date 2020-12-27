(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
const Tailbreak = require('tailbreak')
const tb = Tailbreak();

const handleResize = () => {
  console.log(tb.sm);
  const smText = tb.sm ? 'yes' : 'no';
  const mdText = tb.md ? 'yes' : 'no';
  const lgText = tb.lg ? 'yes' : 'no';
  const xlText = tb.xl ? 'yes' : 'no';
  const twoxlText = tb['2xl'] ? 'yes' : 'no';

  document.getElementById('sm').innerText = smText;
  document.getElementById('md').innerText = mdText;
  document.getElementById('lg').innerText = lgText;
  document.getElementById('xl').innerText = xlText;
  document.getElementById('twoxl').innerText = twoxlText;
}

window.onresize = handleResize;
},{"tailbreak":2}],2:[function(require,module,exports){
const DEFAULT = {
  theme: {
    screens: {
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px'
    }
  }
}

// As per the specification for Tailwind 2.0 config files return correctly formatted
// media strings
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
  for (breakpoint of Object.keys(config.theme.screens)) {
    // Add match watcher for the breakpoint
    const mediaString = getMediaString(config.theme.screens[breakpoint]);
    object['_'+breakpoint] = window.matchMedia(mediaString);

    // Factory generates new method so each is individual 
    let getterFactory = (breakpoint) => {
      return {
        get: function() {return this['_'+breakpoint].matches}
      }
    }

    // Add getter to that object that returns the match
    Object.defineProperty(object, breakpoint, getterFactory(breakpoint))
  }
}

class Tailbreak{
  constructor(config) {
    if (config) {
      generateBreakpoints(this, config);
    }

    generateBreakpoints(this, DEFAULT);
  }
}

module.exports = (config) => new Tailbreak(config);

},{}]},{},[1]);
