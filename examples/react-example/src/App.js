import React, {useEffect, useState} from 'react';

import './App.css';
import Tailbreak from './tb'

const yes = <p className="text-green-600">yes</p>
const no = <p className="text-red-600">no</p>

const Break = (bp) => (
  <div className="inline-block w-auto px-2 py-2 mt-4 ml-4 bg-white rounded-md shadow-md">
    <div className="px-6 border-b">
      <p className="text-xl font-bold tracking-wide text-center uppercase">sm: </p> 
    </div>
    <p className="text-2xl font-semibold text-center uppercase">{bp ? no : yes}</p>
  </div>
)

function App() {
  const [update, setUpdate] = useState(false);
  const handle = () => setUpdate(!update);

  useEffect(() => {
    window.addEventListener('resize', handle)

    console.log(Tailbreak.sm);
    return () => {window.removeEventListener('resize', handle)}
  })

  return (
    <div className="p-12 text-gray-700 bg-gray-50">
      <h1 className="text-4xl font-bold text-gray-900">React Tailbreak Example</h1>
      <Break bp={Tailbreak.sm}/>
      <Break bp={Tailbreak.md}/>
      <Break bp={Tailbreak.lg}/>
      <Break bp={Tailbreak.xl}/>
      <Break bp={Tailbreak['2xl']}/>
    </div>
  );
}

export default App;
