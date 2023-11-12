export const handler = async (event, context) => {

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Microservice A: Updated API Call Successful',
    }),
  };
};
