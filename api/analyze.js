export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Method not allowed"
    });
  }

  try {
    const { image, style, gender } = req.body || {};

    if (!image) {
      return res.status(400).json({
        error: "Image is required."
      });
    }

    if (!process.env.OPENAI_API_KEY) {
      return res.status(500).json({
        error: "OPENAI_API_KEY is not configured."
      });
    }

    const prompt = `
You are StyleAI, an AI fashion and outfit analysis assistant.

Analyze the uploaded person's visible clothing and styling only.

Selected style: ${style || "Not specified"}
Category: ${gender || "Not specified"}

Return ONLY valid JSON.

Use this exact structure:

{
  "score": 0,
  "style": "",
  "outfit": "",
  "colours": "",
  "hair": "",
  "accessories": "",
  "presentation": "",
  "tags": [],
  "tips": []
}

Rules:
- score must be an integer from 0 to 100.
- Focus on clothing, colour coordination, hairstyle, accessories and overall styling.
- Do not judge attractiveness, body shape, weight, skin tone, facial beauty or physical appearance.
- Keep the analysis practical and respectful.
- "outfit" should briefly describe the visible outfit.
- "colours" should describe the visible colour combination.
- "hair" should describe the hairstyle only if it is visible.
- "accessories" should mention visible accessories.
- "presentation" should describe the styling/presentation of the outfit.
- "tags" should contain 3 to 8 short style keywords.
- "tips" should contain 3 to 5 practical styling suggestions.
- If something is not visible, say "Not clearly visible".
- Do not include Markdown.
- Do not include explanations outside the JSON.
`;

    const response = await fetch(
      "https://api.openai.com/v1/responses",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
        },

        body: JSON.stringify({
          model: "gpt-5.6-luna",

          input: [
            {
              role: "user",

              content: [
                {
                  type: "input_text",
                  text: prompt
                },
                {
                  type: "input_image",
                  image_url: image
                }
              ]
            }
          ]
        })
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error("OpenAI API error:", data);

      return res.status(response.status).json({
        error:
          data?.error?.message ||
          "OpenAI API request failed."
      });
    }

    const outputText =
      data.output_text ||
      extractOutputText(data);

    if (!outputText) {
      return res.status(500).json({
        error: "AI returned an empty response."
      });
    }

    const result = parseJSON(outputText);

    if (!result) {
      console.error("Invalid AI JSON:", outputText);

      return res.status(500).json({
        error: "AI returned an invalid analysis."
      });
    }

    return res.status(200).json(result);

  } catch (error) {

    console.error("Server error:", error);

    return res.status(500).json({
      error: "Something went wrong while analyzing the image."
    });
  }
}


/* Extract text if output_text isn't available */
function extractOutputText(data) {

  try {

    let text = "";

    for (const item of data.output || []) {

      for (const content of item.content || []) {

        if (
          content.type === "output_text" &&
          typeof content.text === "string"
        ) {
          text += content.text;
        }

      }

    }

    return text.trim();

  } catch (error) {

    return "";
  }
}


/* Safely parse JSON */
function parseJSON(text) {

  try {

    return JSON.parse(text);

  } catch (error) {

    /* Try removing Markdown code fences */
    const cleaned =
      text
        .replace(/```json/gi, "")
        .replace(/```/g, "")
        .trim();

    try {

      return JSON.parse(cleaned);

    } catch (secondError) {

      /* Try finding the JSON object */
      const start = cleaned.indexOf("{");
      const end = cleaned.lastIndexOf("}");

      if (start !== -1 && end !== -1) {

        try {

          return JSON.parse(
            cleaned.substring(start, end + 1)
          );

        } catch (thirdError) {

          return null;
        }

      }

      return null;
    }
  }
}
