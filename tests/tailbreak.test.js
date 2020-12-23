const MockBrowser = require('mock-browser').mocks.MockBrowser;
const should = require('chai').should()
const resolveConfig = require('tailwindcss/resolveConfig')

const browser = new MockBrowser();
global.window = browser.getWindow();

// matchMedia fix
const trueMatch = ((media) => { return { media, matches: true, addListener: () => {}, removeListener: () => {}, }; });
const falseMatch = ((media) => { return { media, matches: false, addListener: () => {}, removeListener: () => {}, }; });

window.matchMedia = falseMatch;

const config = require('./test.config')
const testConfig = resolveConfig(config);

const Tailbreak = require('../tailbreak')

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
})