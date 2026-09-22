export function request(ctx) {
  const { ingredients = [] } = ctx.args;

  const prompt = `Create a detailed recipe using these ingredients: ${ingredients.join(
    ", "
  )}. Include a recipe name, ingredient quantities, and step-by-step instructions.`;

  return {
    resourcePath: "/model/amazon.nova-lite-v1:0/invoke",
    method: "POST",
    params: {
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messages: [
          {
            role: "user",
            content: [
              {
                text: prompt,
              },
            ],
          },
        ],
        inferenceConfig: {
          maxTokens: 1000,
          temperature: 0.7,
        },
      }),
    },
  };
}

export function response(ctx) {
  const parsedBody = JSON.parse(ctx.result.body);
  const output = parsedBody.output || {
    message: {
      content: [
        {
          text: parsedBody.message,
        },
      ],
    },
  };

  return {
    body: output.message.content[0].text,
  };
}