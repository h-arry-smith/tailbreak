const MockBrowser = require('mock-browser').mocks.MockBrowser;
const should = require('chai').should()
const resolveConfig = require('tailwindcss/resolveConfig')

const browser = new MockBrowser();
global.window = browser.getWindow();

// matchMedia fix
const trueMatch = ((media) => { return { media, matches: true, addListener: () => {}, removeListener: () => {}, }; });
const falseMatch = ((media) => { return { media, matches: false, addListener: () => {}, removeListener: () => {}, }; });

window.matchMedia = falseMatch;

const config = require('./test.config');
const custom = require('./custom.config');
const testConfig = resolveConfig(config);
const customConfig = resolveConfig(custom);

const Tailbreak = require('../lib/tailbreak')

let tb;

describe('Tailbreak Class', () => {
  beforeEach(() => {
    tb = Tailbreak(testConfig);
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
  it('has object for media watchers', () => {
    tb.should.have.property('watch');
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
    for (let key in tb.watch) {
      mediaStrings.push(tb.watch[key].media)
    }

    mediaStrings.should.deep.equal(defaultMediaStrings);
  })
  it('returns false match from mock matchMedia correctly', () => {
    tb.sm.should.equal(false);
  })
  it('returns true when match mock is changed to true', () => {
    window.matchMedia = trueMatch;
    // Regenerate config with this matcher
    tb = Tailbreak(testConfig);
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
      tb.watch.max.media.should.equal(result);
    })
    it ('handles min-max breakpoints', () => {
      const result = '(min-width: 100px) and (max-width: 200px)';
      tb.watch.minmax.media.should.equal(result);
    })
    it ('handles multiple range breakpoints', () => {
      const result = '(min-width: 100px) and (max-width: 200px), (min-width: 300px)'
      tb.watch.multirange.media.should.equal(result);
    })
    it ('handles raw breakpoint', () => {
      const result = '(orientation: potrait)';
      tb.watch.raw.media.should.equal(result);
    })
    it ('handles raw print correctly', () => {
      const result = 'print';
      tb.watch.rawprint.media.should.equal(result);
    })
  })
})