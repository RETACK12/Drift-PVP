const { loadUpdates, bindStore } = require("./_lib/store");

exports.handler = async (event) => {
  bindStore(event);
  try {
    const updates = await loadUpdates();
    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      },
      body: JSON.stringify({
        updates: updates.map((item) => ({
          id: item.id,
          message: item.message,
          createdAt: item.createdAt
        }))
      })
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
      body: JSON.stringify({ updates: [] })
    };
  }
};
