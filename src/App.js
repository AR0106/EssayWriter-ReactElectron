import { useState } from 'react';
import './App.css';
import TabViewer from './Components/TabViewer';
import { initFirebase } from './firebaseLoader';

// Changed Tab UI to Let User Know The Current Tab
function switchTab(currentElement) {
  const tabArr = document.getElementsByClassName('tabBtn');
  
  // Loops through all Tabs and Sets them to Correct Class
  for (let index = 0; index < tabArr.length; index++) {
    const element = tabArr[index];

    // Set Tab to Default
    element.className = 'tabBtn';
    
    // Set Selected Tab Active
    if (element === currentElement && !element.className.includes(' active')) {
      element.className = element.className + ' active';
    }
  }
}

function App() {
  initFirebase();

  const [curTab, setCurTab] = useState();

  return(
    <div className='App'>
      <div id='tabButtons'>
        <button id='genView' className='tabBtn active' onClick={() => {switchTab(document.activeElement); setCurTab(prevState => 'gen');}}>Generation</button>
        <button id='analView' className='tabBtn' onClick={() => {switchTab(document.activeElement); setCurTab(prevState => 'anal');}}>Analysis (Beta)</button>
      </div>
      <TabViewer id='contentViewer' view={curTab}/>
      <span id='notice'>Build 0.5.52a ©️ Contrabanned All Rights Reserved</span>
    </div>
  );
}

export default App;
