const pool = require("../config/db");

const createClick = async (user_id, feature_name) => {
    console.log("Model called", user_id, feature_name);
    const result = await pool.query(
        "INSERT INTO feature_clicks (user_id, feature_name) VALUES ($1,$2) RETURNING *",
        [user_id, feature_name]
    );
    console.log("Inserted Data:", result.rows[0]);
    return result.rows[0];
};

const getFeatureAnalytics = async (filters) => {
    const { startDate, endDate, age, gender } = filters;

    let query = `
    SELECT fc.feature_name, COUNT(*) as total_clicks
    FROM feature_clicks fc
    JOIN users u ON fc.user_id = u.id
    WHERE 1=1
  `;

    let values = [];

    if (startDate && endDate) {
        values.push(startDate, endDate);
        query += ` AND fc.timestamp BETWEEN $${values.length - 1} AND $${values.length}`;
    }

    if (age) {
        if (age === "18-40") {
            query += ` AND u.age BETWEEN 18 AND 40`;
        }
    }

    if (gender) {
        values.push(gender);
        query += ` AND u.gender = $${values.length}`;
    }

    query += ` GROUP BY fc.feature_name ORDER BY total_clicks DESC`;

    const result = await pool.query(query, values);
    return result.rows;
};

const getLineChartData = async (feature_name) => {
    const result = await pool.query(`
    SELECT DATE(timestamp) as date, COUNT(*) as count
    FROM feature_clicks
    WHERE feature_name = $1
    GROUP BY date
    ORDER BY date ASC
  `, [feature_name]);

    return result.rows;
};
module.exports = { createClick, getFeatureAnalytics, getLineChartData };