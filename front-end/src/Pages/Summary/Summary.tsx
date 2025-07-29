import { useState } from "react";
import { toast } from 'react-toastify';
import Loader from "../../Components/Loader";
import BackToHome from "../../Components/BackToHome";
import { getUserSummary } from "../../Services/activities";
import type { SummaryData, SummaryResponse } from "../../Types/Sumary";

function Summary() {

    const [loading, setLoading] = useState(false);

    const [userId, setUserId] = useState<string>('');
    const [startTime, setStartTime] = useState<string>('');
    const [endTime, setEndTime] = useState<string>('');
    const [data, setData] = useState<SummaryData | null>(null);

    const submitForm = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!userId || isNaN(Number(userId))) {
            toast.error('Invalid user id!');
            return;
        }

        try{
            setLoading(true);
            const response: SummaryResponse = await getUserSummary(Number(userId), startTime, endTime);
            if(response.status == false){
                toast.error('Error while getting summary!');
                console.error(response.message);
                return;
            }

            setData(response.summary || null);
        }
        finally {
            setLoading(false);
        }
    }

    return (
        <section>
            <BackToHome />
            <h1>Check user summary</h1>
            <form onSubmit={submitForm} className="summary-form">
                <input
                    type="number"
                    placeholder="User ID"
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                />
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
                    {loading ? 'Loading...' : 'Submit'}
                </button>
            </form>

            {loading && <Loader height={55} width={80} marginTop={170}/>}
            {data && (
                <div className="summary-result">
                    <p><b>Total actions:</b> {data.total_actions}</p>
                    <p><b>Most frequent action:</b> {data.most_frequent_action}</p>
                    <p><b>Average duration:</b> {data.average_metadata_duration.toFixed(2)}s</p>
                    <p><b>Most frequent page:</b> {data.most_frequent_metadata_page}</p>
                </div>
            )}
        </section>
    );
}

export default Summary;