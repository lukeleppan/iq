const pool = require("../config/database");

module.exports = {
  async query(text, params) {
    const start = Date.now();
    const res = await pool.query(text, params).catch((err) => {
      return { error: err };
    });
    const duration = Date.now() - start;
    console.log("{Query Execution}:", {
      type: res.command,
      duration,
      rows: res.rowCount,
    });
    return res;
  },

  async getClient() {
    const client = await pool.connect();
    const query = client.query;
    const release = client.release;

    const timeout = setTimeout(() => {
      console.error("{Timeout}");
      console.error(`{Last Query}: ${client.lastQuery}`);
    }, 5000);

    client.query = (...args) => {
      client.lastQuery = args;
      return query.apply(client, args);
    };

    client.release = () => {
      clearTimeout(timeout);
      client.query = query;
      client.release = release;
      return release.apply(client);
    };

    return client;
  },
};
