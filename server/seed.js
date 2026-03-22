const pool = require("./config/db");

const seedData = async () => {
  try {
    // dummy users
    await pool.query(`
      INSERT INTO users (username, password, age, gender)
      VALUES 
      ('user1', '123456', 25, 'Male'),
      ('user2', '123456', 30, 'Female')
      ON CONFLICT DO NOTHING
    `);

    // dummy clicks
    for (let i = 0; i < 100; i++) {
      const user_id = Math.random() > 0.5 ? 1 : 2;

      const features = ["date_filter", "gender_filter", "age_filter"];
      const feature =
        features[Math.floor(Math.random() * features.length)];

      await pool.query(
        "INSERT INTO feature_clicks (user_id, feature_name) VALUES ($1,$2)",
        [user_id, feature]
      );
    }

    console.log("Dummy data inserted 🚀");
    process.exit();
  } catch (err) {
    console.log(err);
  }
};

seedData();