const Chart = require('../models/charModels').chart;

exports.addChart = async (req, res) => {
  try {
    const userId = req.userData.id;
    const userEmail = req.userData.email;
    const fname = req.userData.fname;
    const lname = req.userData.lname;
    const chartTitle = req.body.chartTitle;
    const chartImg = req.body.chartImg;
    const chartDesc = req.body.chartDesc;

    const addChart = new Chart({
      userId,
      userEmail,
      fname,
      lname,
      chartTitle,
      chartImg,
      chartDesc
    });
    await addChart.save();
    return res.status(201).json({ msg: 'Chart posted!' });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

exports.comment = async (req, res) => {
  try {
    const chartId = req.params.chartId;
    const userId = req.userData.id;
    const userEmail = req.userData.email;
    const fname = req.userData.fname;
    const lname = req.userData.lname;
    const comment = req.body.comment;

    await Chart.updateOne(
      { _id: chartId },
      {
        $push: {
          chartComments: {
            userId,
            userEmail,
            fname,
            lname,
            comment
          }
        }
      }
    );
    return res.status(200).json({ msg: 'commented' });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

exports.showPosts = async (req, res) => {
  try {
    const posts = await Chart.find({});

    return res.status(200).json({ posts });
  } catch (error) {
    console.log(error.stack);
    return res.status(500).json({ error });
  }
};

exports.userPosts = async (req, res) => {
  try {
    const userId = req.userData.id;
    const userPosts = await Chart.find({ userId });

    return res.status(200).json({ userPosts });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

exports.singlePost = async (req, res) => {
  try {
    const _id = req.params.chartId;
    const singlePost = await Chart.findById(_id);
    return res.status(200).json({ singlePost });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

exports.commentReply = async (req, res) => {
  try {
    const commentId = req.params.commentId;
    const userId = req.userData.id;
    const userEmail = req.userData.email;
    const reply = req.body.reply;

    await Chart.updateOne(
      { 'chartComments._id': commentId },
      {
        $push: {
          chartComments: {
            replies: {
              userId,
              userEmail,
              reply
            }
          }
        }
      }
    );
    // const find = await Chart.findOne({ 'chartComments._id': commentId });
    // console.log(find);
    return res.status(201).json({ msg: 'Replied' });
  } catch (error) {
    console.log(error.stack);
    return res.status(500).json({ error });
  }
};
