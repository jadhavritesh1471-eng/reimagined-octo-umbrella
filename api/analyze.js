export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Method not allowed"
    });
  }

  try {
    const { image, style, gender } = req.body;

    if (!image) {
      return res.status(400).json({
        error: "Image is required"
      });
    }

    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
      },

      body: JSON.stringify({
        model: "gpt-4.1-mini",

        input: [
          {
            role: "user",
            content: [
              {
                type: "input_text",
                text: `
Analyze this fashion/style photo.

Selected style: ${style}
Gender selection: ${gender}

Analyze only visible fashion and styling details:
- outfit
- colours
- hair presentation
- accessories
- overall presentation
- compatibility with the selected style

Do not judge body shape, attractiveness, health, or physical traits.

Return ONLY valid JSON:

{
  "score": 0,
  "match": 0,
  "comment": "",
  "notices": ["", "", ""],
  "metrics": {
    "outfit": 0,
    "hair": 0,
    "colour": 0,
    "accessory": 0,
    "presentation": 0
  },
  "tips": ["", "", ""],
  "personality": "",
  "personalityText": "",
  "final": ""
}

Rules:
- score: 0-100
- match: 0-100
- every metric: 0-100
- exactly 3 notices
- exactly 3 tips
- Do not invent details that are not visible.
`
              },
              {
                type: "input_image",
                image_url: image
              }
            ]
          }
        ]
      })
    });

    if (!response.ok) {
      const error = await response.text();

      return res.status(response.status).json({
        error: error
      });
    }

    const data = await response.json();

    const outputText = data.output_text || "";

    let result;

    try {
      result = JSON.parse(outputText);
    } catch {
      return res.status(500).json({
        error: "AI response was not valid JSON",
        raw: outputText
      });
    }

    return res.status(200).json(result);

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      error: "AI analysis failed"
    });
  }
}
