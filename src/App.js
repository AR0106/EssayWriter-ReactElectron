import { useState } from 'react';
import './App.css';
import TabViewer from './Components/TabViewer';
import TabButton from './Components/TabButton';
import { initFirebase } from './firebaseLoader';

const pJson = require('../package.json');

/*
  0 - Writer
  1 - Analysis
  2 - Review
  3 - Settings
  4 - Account
*/

let btnImages = {
  writer_inactive: require('./Assets/writer_inactive.png'),
  writer_active: require('./Assets/writer_active.png'),
  analysis_inactive: require('./Assets/analysis_inactive.png'),
  analysis_active: require('./Assets/analysis_active.png'),
  review_inactive: require('./Assets/review_inactive.png'),
  review_active: require('./Assets/review_active.png'),
  //settings_inactive: require('./Assets/settings_inactive.png'),
  //settings_active: require('./Assets/settings_active.png'),
  account_inactive: require('./Assets/account_inactive.png'),
  account_active: require('./Assets/account_active.png')
};

let btnImagesIndex = {
  0: 'writer_inactive',
  1: 'writer_active',
  2: 'analysis_inactive',
  3: 'analysis_active',
  4: 'review_inactive',
  5: 'review_active',
  6: 'account_inactive',
  7: 'account_active'
}

let activeElements = [
  false,
  false,
  true,
  false
];

// Changed Tab UI to Let User Know The Current Tab
function switchTab(currentElement, aImg, iImg) {
  const tabArr = document.getElementsByClassName('tabBtn');
  
  var indexMod = 0;

  // Loops through all Tabs and Sets them to Correct Class
  for (let index = 0; index < tabArr.length; index++) {
    const element = tabArr[index];
    
    if (index !== 0) {
      indexMod += 2;
    }

    // Set Tab to Default
    element.active = false;
    element.classList.remove('active');
    element.children[0].src = btnImages[btnImagesIndex[indexMod]];
    for (let activeListIndex = 0; activeListIndex < activeElements.length; activeListIndex++) {
      activeElements[activeListIndex] = false;
    }
    activeElements[index] = false;

    // Set Selected Tab Active
    if (element === currentElement) {
      element.classList.add('active');
      element.children[0].src = btnImages[btnImagesIndex[indexMod + 1]];;
      activeElements[index] = true;
    }
  }
}

initFirebase();

function App() {
  const [curTab, setCurTab] = useState();

  return(
    <div className='App'>
      <div id='tabButtons'>
        <TabButton className='tabBtn' id='genView' activeImg={btnImages["writer_active"]} inactiveImg={btnImages["writer_inactive"]} imgAlt='Writer' active={activeElements[0]} onClick={() => {switchTab(document.activeElement); setCurTab(prevState => 'gen'); }}/>
        <TabButton className='tabBtn' id='analView' activeImg={btnImages["analysis_active"]} inactiveImg={btnImages["analysis_inactive"]} imgAlt='Analysis' active={activeElements[1]} onClick={() => {switchTab(document.activeElement); setCurTab(prevState => 'anal'); }}/>
        <TabButton className='tabBtn' id='revView' activeImg={btnImages["review_active"]} inactiveImg={btnImages["review_inactive"]} imgAlt='Review' active={activeElements[2]} onClick={() => {switchTab(document.activeElement); setCurTab(prevState => 'rev'); }}/>
        <TabButton className='tabBtn' id='accView' activeImg={btnImages["account_active"]} inactiveImg={btnImages["account_inactive"]} imgAlt='Account' active={activeElements[3]} onClick={() => {switchTab(document.activeElement); setCurTab(prevState => 'acc'); }}/>
      </div>
      <div id='viewContainer'>
        <TabViewer id='contentViewer' view={curTab}/>
      </div>
      <span id='notice'>Build { pJson.version } { pJson.versionType } ©️ Contrabanned All Rights Reserved <i>All Responses are AI Generated</i></span>
    </div>
  );
}

export default App;
