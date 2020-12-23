import resolveConfig from 'tailwindcss/resolveConfig';
import config from './tailwind.config';
import Tailbreak from 'tailbreak';

const tb = Tailbreak(resolveConfig(config));

export default tb;