import React from "react";
import '../Styles/Global.css';
import './Styles/AnalysisGen.css'
import Tesseract from 'tesseract.js';

async function openFile() {
    console.log("Opening file...");
    // Open Image File
    const fileSelector = document.getElementById('ocrInput');
    const file = fileSelector.files[0];
    console.log(file);
    let _text = "";

    // Read Text from Image File
    document.getElementById('ocrOutput').innerHTML = "Generating...";
    await Tesseract.recognize(
        file.path,
        'eng',
        { logger: m => console.log(m) }
    ).then(({ data: { text } }) => {
        _text = text;
        console.log(_text);
        document.getElementById('ocrOutput').innerHTML = _text;
        extractKeywords(_text);
        summarizeText(_text);
    });
}

// Extract Keywords from Text
function extractKeywords(text) {    
    const extractor = require('keyword-extractor');

    document.getElementById('keywordOutput').innerHTML = "Generating...";

    const keywords = extractor.extract(text, {
        language: 'english',
        remove_digits: false,
        return_changed_case: true,
        remove_duplicates: true });

    console.log(keywords);

    if (keywords == null) {
        document.getElementById('keywordOutput').innerHTML = "No keywords found";
    } else {
        document.getElementById('keywordOutput').innerHTML = keywords.join(', ');
    }
}

async function summarizeText(text) {
    document.getElementById("summaryOutput").innerHTML = "Generating..."

    const OpenAI = require('openai-api');
    const openai = new OpenAI("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");

    const gptResponse = await openai.engines();

    console.log(gptResponse.data);

    const output = await openai.complete({
        engine: 'curie',
        prompt: text + '\n tl;dr:',
        maxTokens: 40,
        temperature: 70 / 100,
        topP: 1.0,
        presencePenalty: 0,
        frequencyPenalty: 70 / 100,
        bestOf: 1,
        n: 1,
        stream: false,
        stop: null
    });

    const parsed = JSON.parse(JSON.stringify(output.data));

    console.log(parsed);
    document.getElementById("summaryOutput").innerHTML = parsed.choices[0].text;
}

export default class AnalView extends React.Component {
    render() {
        return(
            <div className="AnalView">
                <div id="ocrContainer">
                    Image Input:
                    <input type="file" id="ocrInput" accept=".jpg, .jpeg, .png" onChange={openFile}/>
                    <div className="box" id="ocrOutput">
                        
                    </div>
                </div>
                <div id='keywordContainer'>
                    Keywords:
                    <div className='box' id='keywordOutput'>
                        Test
                    </div>
                </div>
                <div id='summaryContainer'>
                    Summary:
                    <div className='box' id='summaryOutput'>
                        Test
                    </div>
                </div>
            </div>
        );
    }
}