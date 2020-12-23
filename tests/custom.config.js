module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    screens: {
      'custom_name': '100px',
      'max': {'max': '100px'},
      'minmax': {'min': '100px', 'max':'200px'},
      'multirange': [
        {'min': '100px', 'max':'200px'},
        {'min': '300px'}
      ],
      'raw': {'raw': '(orientation: potrait)'},
      'rawprint': {'raw': 'print'}
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
