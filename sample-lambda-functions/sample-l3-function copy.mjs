export const handler = async (event, context) => {

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'L3 Construct: API Call Successful',
    }),
  };
};
