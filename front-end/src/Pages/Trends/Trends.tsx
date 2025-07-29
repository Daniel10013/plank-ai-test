import './Trends.css';
import { useState } from "react";
import { toast } from 'react-toastify';
import Loader from "../../Components/Loader";
import BackToHome from "../../Components/BackToHome";
import type { TrendDataItem, TrendsReponse } from "../../Types/Trends";
import { Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend,
} from "chart.js";
import { getTrendingActions } from '../../Services/activities';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

function Trends() {
    const [startTime, setStartTime] = useState<string>("");
    const [endTime, setEndTime] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [data, setData] = useState<TrendDataItem[]>([]);
    const [noResults, setNoResults] = useState<boolean>(false);

    const submitForm = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!startTime || !endTime) {
            toast.error("Both date fields are required!");
            return;
        }

        try {
            setLoading(true);
            setNoResults(false);

            const response: TrendsReponse = await getTrendingActions(startTime, endTime);
            if (!response.status) {
                toast.error("Error fetching trends");
                return;
            }

            if (response.trending_actions && response.trending_actions.length === 0) {
                setNoResults(true);
                return;
            }

            setData(response.trending_actions || []);
        } catch (error) {
            console.error(error);
            toast.error("Failed to fetch trends.");
        } finally {
            setLoading(false);
        }
    };

    const chartData = {
        labels: data.map((item) => `User ${item.user_id} - ${item.action}`),
        datasets: [
            {
                label: "Trending Actions",
                data: data.map((item) => item.count),
                backgroundColor: "rgba(97, 10, 179, 0.58)",
                borderColor: "rgb(97, 10, 179)",
                borderWidth: 1,
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            y: {
                beginAtZero: true,
                max: 10,
                ticks: {
                    stepSize: 0,
                    precision: 0,
                },
                
            },
        },
    };

    return (
        <section>
            <BackToHome />
            <h1>User-Action Trends</h1>
            <form onSubmit={submitForm} className="summary-form">
                <input
                    type="datetime-local"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                />
                <input
                    type="datetime-local"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                />
                <button type="submit" disabled={loading}>
                    {loading ? "Loading..." : "Submit"}
                </button>
            </form>

            {loading && <Loader height={55} width={80} marginTop={170} />}

            {!loading && noResults && (
                <p style={{ textAlign: "center", marginTop: "5rem", color: "#666", fontSize: '28px' }}>
                    No trends found for the selected time range.
                </p>
            )}

            {!loading && !noResults && data.length > 0 && (
                <div style={{ width: '600px', height: '600px', margin: '2rem auto', marginTop: '5rem' }}>
                    <Bar data={chartData} options={chartOptions} />
                </div>
            )}
        </section>
    );
}

export default Trends;
