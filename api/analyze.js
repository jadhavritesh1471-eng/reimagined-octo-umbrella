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

                  text: `
Analyze the fashion/style shown in this image.

Selected style: ${style}
Gender selection: ${gender}

Focus ONLY on visible clothing, styling, colors,
accessories, hair presentation, and overall fashion coordination.

Do not judge the person's body, attractiveness, health,
or physical appearance.

Return ONLY valid JSON in exactly this format:

{
  "score": 0,
  "match": 0,
  "comment": "",
  "notices": [
    "",
    "",
    ""
  ],
  "metrics": {
    "outfit": 0,
    "hair": 0,
    "colour": 0,
    "accessory": 0,
    "presentation": 0
  },
  "tips": [
    "",
    "",
    ""
  ],
  "personality": "",
  "personalityText": "",
  "final": ""
}

Rules:
- score must be between 0 and 100
- match must be between 0 and 100
- every metric must be between 0 and 100
- give 3 notices
- give 3 useful style tips
- keep comments positive and practical
- do not invent clothing or accessories that cannot be reasonably seen
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
      }
    );

    if (!response.ok) {
      const errorText = await response.text();

      return res.status(response.status).json({
        error: errorText
      });
    }

    const data = await response.json();

    const outputText =
      data.output_text ||
      data.output?.[0]?.content?.[0]?.text ||
      "";

    let result;

    try {
      result = JSON.parse(outputText);
    } catch (parseError) {
      return res.status(500).json({
        error: "AI returned invalid JSON",
        raw: outputText
      });
    }

    return res.status(200).json(result);

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      error: "Something went wrong while analyzing the image."
    });

  }
}
