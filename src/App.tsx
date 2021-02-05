import React from 'react';
import { Collapse, CollapsePanel } from './components';

function App() {
  return (
    <>
      <Collapse>
        <CollapsePanel header="标题一" id="1">111</CollapsePanel>
        <CollapsePanel header="标题二" id="2">222</CollapsePanel>
        <CollapsePanel header="标题三" id="3">333</CollapsePanel>
      </Collapse>
    </>
  );
}

export default App;
