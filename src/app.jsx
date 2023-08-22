import React, { useState, useEffect } from "react";
import generateTextFromGPT from "./generateTextFromGPT";
import "./App.css";

function App() {
  // State variables for form inputs, generated gift ideas, and loading status
  const [relation, setRelation] = useState("");
  const [age, setAge] = useState("");
  const [budget, setBudget] = useState("");
  const [interest, setInterest] = useState("");
  const [occassion, setOccassion] = useState("");
  const [occupation, setOccupation] = useState("");
  const [giftIdeas, setGiftideas] = useState([
    "Good day! Please complete the fields to receive personalized gift ideas.",
  ]);
  const [loading, setLoading] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);

  const apikey = "Bearer " + process.env.REACT_APP_API_KEY;
  // Function to handle the "Generate Text" button click
  const handleGenerateClick = async () => {
    setLoading(true);
    setLoadingProgress(0);

    // Constructing the prompt for API call
    const prompt = `I'm looking for a gift, my relationship with the recipient is ${relation}. The recipient is ${age} years old. The occasion is ${occassion}. The occupation of the recipient is ${occupation}. The recipient's interests and hobbies are ${interest}. I can give something related. My budget is ${budget} rupees. Please suggest some gift ideas.`;

    // Call the API function to generate text
    const text = await generateTextFromGPT(prompt, apikey);
    // Update the generated gift ideas and loading status

    if (text) {
      setGiftideas(text.split(/\d+\./).filter((item) => item.trim() !== ""));
    }
    setLoading(false); // Set loading to false after receiving the API response
    setLoadingProgress(0); // Reset loading progress
  };

  // Update loading progress every second
  useEffect(() => {
    if (loading) {
      const interval = setInterval(() => {
        setLoadingProgress((prevProgress) => prevProgress + 1);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [loading]);

  return (
    <div className="App">
      <div className="left-container">
        <div className="intro-section">
          <span className="tag-line">Unwrap Creativity</span>
          <h1 className="app-heading">GiftGenius AI</h1>
          <p>
            When uncertainty arises about what to purchase, our AI-powered tool
            is at your service to help you choose the perfect gift. To obtain a
            personalized collection of present suggestions, simply fill out the
            form below by providing details about the recipient and your budget.
          </p>
        </div>
        <div className="input-section">
          <input
            className="input-fields"
            value={relation}
            onChange={(e) => setRelation(e.target.value)}
            placeholder="Tell me your relationship"
          ></input>
          <input
            className="input-fields"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            placeholder="Specify the age"
          ></input>
          <input
            className="input-fields"
            value={occassion}
            onChange={(e) => setOccassion(e.target.value)}
            placeholder="For which occassion"
          ></input>
          <input
            className="input-fields"
            value={occupation}
            onChange={(e) => setOccupation(e.target.value)}
            placeholder="Enter their occupation"
          ></input>
          <input
            className="input-fields"
            value={interest}
            onChange={(e) => setInterest(e.target.value)}
            placeholder="Share their interest"
          ></input>
          <input
            className="input-fields"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            placeholder="Enter your budget"
          ></input>
        </div>
        <button onClick={handleGenerateClick}>Generate Text</button>
      </div>
      <div className="right-container">
        <h2 className="text-header">Generated Text:</h2>
        {loading ? (
          <div>
            <p>Unwrapping the Perfect Ideas...please wait</p>
            <div className="loading-line">
              <div
                className="loading-progress"
                style={{ width: `${(loadingProgress / 60) * 100}%` }}
              ></div>
            </div>
          </div>
        ) : (
          <ul>
            {giftIdeas.map((idea, index) => (
              <li className="list-item" key={index}>
                {idea.trim()}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default App;
