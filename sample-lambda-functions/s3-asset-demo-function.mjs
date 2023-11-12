export const handler = async (event, context) => {

  const imageUrl = process.env.IMAGE_URL;

  return {
    statusCode: 200,
    body: "<html><body>I am a simple lambda function <img src='" + imageUrl + "'></body></html>",
    headers: {
      'Content-Type': 'text/html'
    }
  };
};
