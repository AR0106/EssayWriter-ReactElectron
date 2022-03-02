import React from "react";
import './Styles/ReviewView.css';
import { cleanOutput } from "./EssayGen";

// Extract Keywords from Text
function extractKeywords(text) {   
    if (text !== null && text !== "") { 
        const extractor = require('keyword-extractor');

        const keywords = extractor.extract(text, {
            language: 'english',
            remove_digits: false,
            return_changed_case: true,
            remove_duplicates: true });

        if (keywords == null) {
            return "No keywords found";
        } else {
            return keywords.join(', ');
        }
    }
}

async function summarizeText(text) {
    if (text !== null && text !== "" && text !== undefined) {
        document.getElementById("summaryOutput").innerHTML = "Generating..."
        const OpenAI = require('openai-api');
        const openai = new OpenAI("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");

        const output = await openai.complete({
            engine: 'curie',
            prompt: '\n tl;dr: ' + text,
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
        document.getElementById('summaryOutput').innerHTML = parsed.choices[0].text;
    }
}

function createMarkup(text) {
    return {__html: text};
}

export default class RevView extends React.Component {
    componentDidMount() {
        summarizeText(cleanOutput);
    }

    render() {
        return (
            <div className="RevView">
                <div id="reviewContainer">
                    Review:
                    <div className="box" id="reviewOutput" dangerouslySetInnerHTML={createMarkup(cleanOutput)}>
                    </div>
                </div>
                <div id='keywordContainer'>
                    Keywords:
                    <div className='box' id='keywordOutput' dangerouslySetInnerHTML={createMarkup(extractKeywords(cleanOutput))}>
                        
                    </div>
                </div>
                <div id='summaryContainer'>
                    Summary:
                    <div className='box' id='summaryOutput'>
                        
                    </div>
                </div>
            </div>
        );
    }
}