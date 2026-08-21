const { loadEvents } = require("./_lib/store");

exports.handler = async () => {
  try {
    const events = await loadEvents();
    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      },
      body: JSON.stringify({
        events: events.map((item) => ({
          id: item.id,
          type: item.type,
          startAt: item.startAt
        }))
      })
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
      body: JSON.stringify({ events: [] })
    };
  }
};
