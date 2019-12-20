const axios = require('axios');
const stringify = require('json-stringify-safe');

exports.getIcos = async (req, res) => {
  try {
    let icos = await axios.get('https://api.trackico.io/v1/icos/all/?page=1');
    icos = await stringify(icos, null, 2);
    const icoData = JSON.parse(icos).data;
    return res.status(200).json({ icoData });
  } catch (error) {
    console.log(error.stack);
    return res.status(500).json({ error });
  }
};
