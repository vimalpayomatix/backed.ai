module.exports = async function handler(req, res) {
  const hasUrl = Boolean(process.env.API_URL);
  const hasKey = Boolean(process.env.API_KEY);
  return res.status(200).json({ hasAPI_URL: hasUrl, hasAPI_KEY: hasKey });
};


