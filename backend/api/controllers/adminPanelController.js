const Query = require('../models/adminPanelModel').Query;
const Contact = require('../models/adminPanelModel').ContactUs;

exports.userQuery = async (req, res) => {
  try {
    const userId = req.userData.id;
    const userEmail = req.userData.email;
    const qTitle = req.body.qTitle;
    const query = req.body.query;

    const addQuery = new Query({ userId, userEmail, qTitle, query });
    await addQuery.save();
    return res.status(201).json({ msg: 'query sent' });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

exports.contactUs = async (req, res) => {
  try {
    const email = req.body.email;
    const name = req.body.name;
    const contactNo = req.body.contactNo;
    const msg = req.body.msg;

    const contact = new Contact({ email, name, contactNo, msg });
    await contact.save();
    return res.status(201).json({ msg: 'msg sent' });
  } catch (error) {
    return res.status(500).json({ error });
  }
};
