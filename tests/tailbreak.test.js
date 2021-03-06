const MockBrowser = require('mock-browser').mocks.MockBrowser;
const should = require('chai').should()
const resolveConfig = require('tailwindcss/resolveConfig')

const browser = new MockBrowser();
global.window = browser.getWindow();

// matchMedia fix
const trueMatch = ((media) => { return { media, matches: true, addListener: () => {}, removeListener: () => {}, }; });
const falseMatch = ((media) => { return { media, matches: false, addListener: () => {}, removeListener: () => {}, }; });

window.matchMedia = falseMatch;

const custom = require('./custom.config');
const customConfig = resolveConfig(custom);

const Tailbreak = require('../lib/tailbreak')

let tb;

describe('Tailbreak Class', () => {
  beforeEach(() => {
    tb = Tailbreak();
  })
  it('has property for sm breakpoint', () => {
    tb.should.have.property('sm');
  })
  it('breakpoint returns boolean value', () => {
    tb.sm.should.be.a('boolean');
  })
  it('creates all breakpoints with default config', () => {
    const defaultBreakpoints = ['sm', 'md', 'lg', 'xl', '2xl'];
    Object.getOwnPropertyNames(tb).should.include.members(defaultBreakpoints);
  })
  it('has private members for MediaQueryList objects', () => {
    const private = ['_sm', '_md', '_lg', '_xl', '_2xl'];
    Object.getOwnPropertyNames(tb).should.include.members(private);
  })
  it('generates correct media query for all default breakpoints', () => {
    const defaultMediaStrings = [
      '(min-width: 640px)',
      '(min-width: 768px)',
      '(min-width: 1024px)',
      '(min-width: 1280px)',
      '(min-width: 1536px)',
    ]

    const mediaStrings = [];
    for (let key of Object.getOwnPropertyNames(tb)) {
      // only add the private members
      if (key.charAt(0) === '_') {
        mediaStrings.push(tb[key].media)
      }
    }

    mediaStrings.should.deep.equal(defaultMediaStrings);
  })
  it('generates correct media query defaults when no config is passed', () => {
    const defaultTb = Tailbreak();
    const defaultMediaStrings = [
      '(min-width: 640px)',
      '(min-width: 768px)',
      '(min-width: 1024px)',
      '(min-width: 1280px)',
      '(min-width: 1536px)',
    ]

    const mediaStrings = [];
    for (let key of Object.getOwnPropertyNames(defaultTb)) {
      // only add the private members
      if (key.charAt(0) === '_') {
        mediaStrings.push(defaultTb[key].media)
      }
    }

    mediaStrings.should.deep.equal(defaultMediaStrings);
  })
  it('returns false match from mock matchMedia correctly', () => {
    tb.sm.should.equal(false);
  })
  it('returns true when match mock is changed to true', () => {
    window.matchMedia = trueMatch;
    // Regenerate config with this matcher
    tb = Tailbreak();
    tb.sm.should.equal(true);
    // Tear down
    window.matchMedia = falseMatch;
  })
  describe('custom config options', () => {
    beforeEach(() => {
      tb = Tailbreak(customConfig);
    })
    it ('contains all breakpoints from custom config', () => {
      const breakpoints = ['custom_name', 'max', , 'minmax', 'multirange', 'raw', 'rawprint'];
      Object.getOwnPropertyNames(tb).should.include.members(breakpoints);
    })
    it ('handles custom named breakpoints', () => {
      tb.should.have.property('custom_name');
    })
    it ('handles max breakpoints', () => {
      const result = '(max-width: 100px)';
      tb._max.media.should.equal(result);
    })
    it ('handles min-max breakpoints', () => {
      const result = '(min-width: 100px) and (max-width: 200px)';
      tb._minmax.media.should.equal(result);
    })
    it ('handles multiple range breakpoints', () => {
      const result = '(min-width: 100px) and (max-width: 200px), (min-width: 300px)'
      tb._multirange.media.should.equal(result);
    })
    it ('handles raw breakpoint', () => {
      const result = '(orientation: potrait)';
      tb._raw.media.should.equal(result);
    })
    it ('handles raw print correctly', () => {
      const result = 'print';
      tb._rawprint.media.should.equal(result);
    })
  })
})