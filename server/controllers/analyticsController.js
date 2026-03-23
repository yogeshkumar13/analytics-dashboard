const { createClick, getFeatureAnalytics, getLineChartData } = require("../models/clickModel");

// Track user action
const trackClick = async (req, res) => {
    try {
        console.log("API HIT");
        const { feature_name } = req.body;

        // user id from JWT (fallback for testing)
        const user_id = req.user?.id || 1;

        const click = await createClick(user_id, feature_name);

        res.json(click);
    } catch (err) {
        console.log(err);
        res.status(500).send("Tracking error");
    }
};

// Get analytics data (bar chart)
const getAnalytics = async (req, res) => {
    try {
        const { startDate, endDate, age, gender } = req.query;

        const data = await getFeatureAnalytics({
            startDate,
            endDate,
            age,
            gender,
        });

        // Ensure correct keys for frontend
        const formatted = data.map(row => ({
            feature_name: row.feature_name,
            total_clicks: Number(row.total_clicks)
        }));

        res.json(formatted);
    } catch (err) {
        console.log(err);
        res.status(500).send("Analytics error");
    }
};

// Get line chart data
const getLineData = async (req, res) => {
    try {
        const { feature_name } = req.query;

        const data = await getLineChartData(feature_name);

        // Ensure correct keys for frontend
        const formatted = data.map(row => ({
            date: row.date,
            count: Number(row.count)
        }));

        res.json(formatted);
    } catch (err) {
        console.log(err);
        res.status(500).send("Line chart error");
    }
};

module.exports = { trackClick, getAnalytics, getLineData };