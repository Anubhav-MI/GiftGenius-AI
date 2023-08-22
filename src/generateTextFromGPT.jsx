import React from "react";
import axios from "axios";

/*Function to call request api call */
const generateTextFromGPT = async (prompt, apikey) => {
  try {
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        messages: [{ role: "system", content: prompt }],
        model: "gpt-3.5-turbo",
        max_tokens: 500,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: apikey,
        },
      }
    );
    console.log(response.data);
    return response.data.choices[0].message.content;
  } catch (error) {
    console.log(error);
  }
};

export default generateTextFromGPT;
