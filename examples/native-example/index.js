const Tailbreak = require('tailbreak')
const tb = Tailbreak();

const handleResize = () => {
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