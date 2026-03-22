const { createClick, getFeatureAnalytics, getLineChartData } = require("../models/clickModel");

// Track user action
const trackClick = async (req, res) => {
    try {
        console.log("API HIT");
        const { feature_name } = req.body;

        // user id JWT se aayega (abhi manually test karenge)
        const user_id = req.user?.id || 1;

        const click = await createClick(user_id, feature_name);

        res.json(click);
    } catch (err) {
        console.log(err);
        res.status(500).send("Tracking error");
    }
};

// Get analytics data
const getAnalytics = async (req, res) => {
    try {
        const { startDate, endDate, age, gender } = req.query;

        const data = await getFeatureAnalytics({
            startDate,
            endDate,
            age,
            gender,
        });

        res.json(data);
    } catch (err) {
        console.log(err);
        res.status(500).send("Analytics error");
    }
};

const getLineData = async (req, res) => {
    try {
        const { feature_name } = req.query;

        const data = await getLineChartData(feature_name);

        res.json(data);
    } catch (err) {
        console.log(err);
        res.status(500).send("Line chart error");
    }
};

module.exports = { trackClick, getAnalytics, getLineData };