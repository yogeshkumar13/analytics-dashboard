import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import API from "../services/api";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    LineChart,
    Line,
    ResponsiveContainer,
} from "recharts";

function Dashboard() {
    const [data, setData] = useState([]);
    const [lineData, setLineData] = useState([]);

    const [filters, setFilters] = useState({
        startDate: "",
        endDate: "",
        age: "",
        gender: "",
    });

    // fetch bar data
    const fetchAnalytics = async () => {
        const query = new URLSearchParams(filters).toString();
        const res = await API.get(`/api/analytics?${query}`);
        setData(res.data);
        console.log("Bar data:", res.data);
    };

    // fetch line data
    const fetchLineData = async (feature = "date_filter") => {
        const res = await API.get(`/api/analytics/line?feature_name=${feature}`);
        setLineData(res.data);
        console.log("Line data:", res.data);
    };

    const track = async (name) => {
        await API.post("/api/analytics/track", {
            feature_name: name,
        });
    };

    useEffect(() => {
        const savedFilters = Cookies.get("filters");

        if (savedFilters) {
            const parsed = JSON.parse(savedFilters);
            setFilters(parsed);
        } else {
            // default filters (last 30 days, age range, gender optional)
            const today = new Date().toISOString().split("T")[0];
            const past = new Date();
            past.setDate(past.getDate() - 30);
            const pastDate = past.toISOString().split("T")[0];

            setFilters({
                startDate: pastDate,
                endDate: today,
                age: "18-40",
                gender: "",
            });
        }
    }, []);

    useEffect(() => {
        fetchAnalytics();
        fetchLineData();
    }, [filters]);

    const handleChange = (e) => {
        const updated = { ...filters, [e.target.name]: e.target.value };

        setFilters(updated);

        // save in cookies
        Cookies.set("filters", JSON.stringify(updated), { expires: 7 });

        track("filter_change");
    };

    const applyFilters = () => {
        fetchAnalytics();
        fetchLineData();
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <h1 className="text-3xl font-bold mb-6 text-gray-800">
                Analytics Dashboard 📊
            </h1>

            {/* Filters */}
            <div className="bg-white p-6 rounded-2xl shadow-md mb-6 grid grid-cols-1 md:grid-cols-4 gap-4">
                <input
                    type="date"
                    name="startDate"
                    value={filters.startDate}
                    onChange={handleChange}
                    className="border p-2 rounded-lg"
                />

                <input
                    type="date"
                    name="endDate"
                    value={filters.endDate}
                    onChange={handleChange}
                    className="border p-2 rounded-lg"
                />

                <select
                    name="age"
                    value={filters.age}
                    onChange={handleChange}
                    className="border p-2 rounded-lg"
                >
                    <option value="">Select Age</option>
                    <option value="18-40">18-40</option>
                </select>

                <select
                    name="gender"
                    value={filters.gender}
                    onChange={handleChange}
                    className="border p-2 rounded-lg"
                >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                </select>
            </div>

            <button
                onClick={applyFilters}
                className="bg-blue-600 text-white px-6 py-2 rounded-xl shadow hover:bg-blue-700 mb-6"
            >
                Apply Filters
            </button>

            {/* Charts Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* Bar Chart */}
                <div className="bg-white p-6 rounded-2xl shadow-md">
                    <h2 className="text-lg font-semibold mb-4">
                        Feature Usage
                    </h2>

                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart width={500} height={300} data={data}>
                            <XAxis dataKey="feature_name" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="total_clicks" fill="#2563eb" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                {/* Line Chart */}
                <div className="bg-white p-6 rounded-2xl shadow-md">
                    <h2 className="text-lg font-semibold mb-4">
                        Daily Trend
                    </h2>

                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={lineData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" />
                            <YAxis />
                            <Tooltip />
                            <Line
                                type="monotone"
                                dataKey="count"
                                stroke="#2563eb"
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;