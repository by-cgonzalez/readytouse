import React from 'react';
import { generate, presetPalettes } from '@ant-design/colors';
// import '../assets/styles/App.less';
const App = () => {
    const test = `Happy Hacking!`
    console.log(presetPalettes)
    return (
      presetPalettes.blue.map(color => <p style={{color: color}}>{test}</p>)
    )
};

export default App;