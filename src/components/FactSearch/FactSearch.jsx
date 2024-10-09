import React, {useState} from 'react';
import {useForm} from "react-hook-form";

const FactSearch = () => {
    const { register, handleSubmit } = useForm()
    const [data,setData]=useState(false);
    const onSubmitHandle=(data)=>{
        console.log('data:',data);
        setData(true)
    }
    return (
        <div className="main-content">
            <div className="search-container">
                <h2>Hi Shafi!</h2>
                <form onSubmit={handleSubmit(onSubmitHandle)}>
                    <div className="search-bar">
                        <input type="text" placeholder="Enter your query..."/>
                        <button type={"submit"}>Check Facts</button>
                    </div>
                </form>
            </div>
            {data ? <div className="fact-check-result fade-in" id="fact-check-result">
                <h3>Fact Check Result:</h3>
                <div className="result-item">
                <h4>Claim: Brazilian tourist gang-raped in India</h4>
                    <p className="rating true">Rating: True</p>
                    <p className="severity high">Severity: High</p>
                    <p>Sentence: Outrage over Brazilian tourists gang rape in India</p>
                    <p>Explanation: The statement accurately reflects recent events reported in the
                        news, particularly a gang rape incident involving a Brazilian tourist in India that has
                        sparked
                        significant public outrage. Articles from credible news sources confirm the allegation
                        made by a
                        Brazilian woman who claimed she was gang-raped while camping in eastern India, with her
                        partner also attacked. The police response included the arrest of three male suspects,
                        with
                        investigations into additional suspects ongoing. This incident has not only drawn media
                        attention due to its severity but has also highlighted ongoing concerns regarding safety
                        for
                        tourists and the prevalence of sexual violence in India. Given its factual basis and
                        serious
                        implications, the claim is rated as True.</p>
                    <div className="key-facts">
                        <h4>Key Facts:</h4>
                        <ul>
                            <li>Incident reported in the news.</li>
                            <li>Police arrested three suspects.</li>
                            <li>Ongoing investigations for additional suspects.</li>
                        </ul>
                    </div>
                    <div className="reference-section">
                        <h4>References:</h4>
                        <ul>
                            <li><a href="https://www.example.com/article1" target="_blank">Example News Article
                                1</a></li>
                            <li><a href="https://www.example.com/article2" target="_blank">Example News Article
                                2</a></li>
                        </ul>
                    </div>
                </div>
            </div>:""}
        </div>
    );
};

export default FactSearch;