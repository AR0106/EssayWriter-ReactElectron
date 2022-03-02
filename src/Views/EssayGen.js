import './Styles/EssayGen.css';
import React from 'react';
import { shareResults } from '../DataBuilder';

export var pOutput;

export var cleanOutput;

export default class GenView extends React.Component {
    render() {
        return (
            <div className="GenView">
            <div className="outputBox" id='outBox'>
                Output
            </div>
            <select name='paraSelect' id='pSel' className='cSelect'>
                <option value='intro'>Intro</option>
                <option value='body'>Body</option>
                <option value='conc'>Conclusion</option>
            </select>
            <button id='genBtn' onClick={async () => {

                document.getElementById("outBox").innerHTML = "Generating..."

                const OpenAI = require('openai-api');
                const openai = new OpenAI("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");

                var type;

                switch (document.getElementById("pSel").value) {
                case 'intro':
                    type = 'an introduction';
                    break;
                case 'body':
                    type = 'a body';
                    break;
                case 'conc':
                    type = 'a conclusion';
                    break;

                default:
                    type = 'introduction'
                    break;
                }

                pOutput = await openai.complete({
                engine: 'davinci-instruct-beta-v3',
                prompt: "Generate a " + type + " paragraph about " + document.getElementById("topicInput").value + " that includes " + document.getElementById("structInput").value,
                maxTokens: 1900,
                temperature: document.getElementById("compSlider").value / 100,
                topP: 1.0,
                presencePenalty: 0,
                frequencyPenalty: document.getElementById("repSlider").value / 100,
                bestOf: 1,
                n: 1,
                stream: false,
                stop: null
            });

            const parsed = JSON.parse(JSON.stringify(pOutput.data));

            cleanOutput = parsed.choices[0].text;

            document.getElementById("outBox").innerHTML = cleanOutput;

            shareResults(document.getElementById("outBox").innerHTML);

            }}>Generate</button>
            <div className='repContainer'>
                Not Repetitive
                <input type='range' min='1' max='100' defaultValue='70' id='repSlider' className='paramSlider'/>
                Repetitive
            </div>
            <div className='compContainer'>
                Not Complex 
                <input type='range' min='1' max='100' defaultValue='70' id='compSlider' className='paramSlider'/>
                Complex
            </div>
            <div className='topicContainer'>
                Topic Sentence
                <textarea type='text' id='topicInput'/>
            </div>
            <div className='structContainer'>
                Sentence Structures
                <textarea type='text' id='structInput'/>
            </div>
            </div>
        );
    }
}
