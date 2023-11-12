export const handler = async (event, context) => {

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'L2 Construct: API Call Successful',
    }),
  };
};
