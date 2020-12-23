import React, {useEffect, useState} from 'react';

import './App.css';
import Tailbreak from './tb'

const yes = <p className="text-green-600">yes</p>
const no = <p className="text-red-600">no</p>

const Break = ({bp, name}) => {
  return (
  <div className="inline-block w-auto px-2 py-2 mt-4 ml-4 bg-white rounded-md shadow-md">
    <div className="px-6 border-b">
      <p className="text-lg font-bold tracking-wide text-center uppercase">{name}</p> 
    </div>
    <p className="text-2xl font-semibold text-center uppercase">{bp ? yes : no}</p>
  </div>
  )
}

function App() {
  const [update, setUpdate] = useState({
    'sm': Tailbreak.sm,
    'md': Tailbreak.md,
    'lg': Tailbreak.lg,
    'xl': Tailbreak.xl,
    '2xl': Tailbreak['2xl'],
  });
  const handle = () => setUpdate({
    'sm': Tailbreak.sm,
    'md': Tailbreak.md,
    'lg': Tailbreak.lg,
    'xl': Tailbreak.xl,
    '2xl': Tailbreak['2xl'],
  });

  useEffect(() => {
    window.addEventListener('resize', handle)
    return () => {window.removeEventListener('resize', handle)}
  }, [])

  return (
    <div className="p-12 text-gray-700 bg-gray-50">
      <h1 className="ml-8 text-4xl font-bold text-gray-900">React Tailbreak Example</h1>
      <Break bp={update.sm} name="sm"/>
      <Break bp={update.md} name="md"/>
      <Break bp={update.lg} name="lg"/>
      <Break bp={update.xl} name="xl"/>
      <Break bp={update['2xl']} name="2xl"/>
    </div>
  );
}

export default App;
