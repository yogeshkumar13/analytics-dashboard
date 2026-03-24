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

const getFeatureAnalytics = async ({ startDate, endDate, age, gender }) => {
    let query = `
        SELECT fc.feature_name, COUNT(*) AS total_clicks
        FROM feature_clicks fc
        JOIN users u ON fc.user_id = u.id
        WHERE 1=1
    `;

    const values = [];
    let idx = 1;

    if (startDate && endDate) {
        query += ` AND fc.timestamp BETWEEN $${idx} AND $${idx + 1}`;
        values.push(startDate, endDate);
        idx += 2;
    }

    if (age && age === "18-40") {
        query += ` AND u.age BETWEEN 18 AND 40`;
    }

    if (gender) {
        query += ` AND u.gender = $${idx}`;
        values.push(gender);
        idx++;
    }

    query += ` GROUP BY fc.feature_name ORDER BY total_clicks DESC`;

    const result = await pool.query(query, values);
    return result.rows;
};

const getLineChartData = async (feature_name) => {
    const query = `
        SELECT DATE(fc.timestamp) AS date, COUNT(*) AS count
        FROM feature_clicks fc
        WHERE fc.feature_name = $1
        GROUP BY DATE(fc.timestamp)
        ORDER BY DATE(fc.timestamp) ASC
    `;
    const result = await pool.query(query, [feature_name]);
    return result.rows;
};

module.exports = { createClick, getFeatureAnalytics, getLineChartData };