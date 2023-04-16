import React, { useState } from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
  import { Line } from 'react-chartjs-2';
  import axios from "axios";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const URL = 'http://localhost:8080/';

const Graphic = () => {
    const [showForm, setShowForm] = useState(false);
    const [id, setId] = useState('');
    const [type, setType] = useState('BYTE_CNT');
    const [tsBefore, setTsBefore] = useState('');
    const [tsAfter, setTsAfter] = useState('');
    const [limit, setLimit] = useState('');

    const [showData, setShowData] = useState(false);
    const [data, setData] = useState({});

    const hadleShowForm = (event) => {
        event.preventDefault();
        setShowForm(true)
        setShowData(false);
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        const final_url = URL + 'graph/' + id + '?tsBefore=' + tsBefore + '&tsAfter=' + tsAfter + '&type=' + type;


        axios.get(final_url)
            .then(response => {
                const newPoints = response.data.map(d => { return {ts: d.ts, value: d.value}})
                const labels = newPoints.map(p => p.ts);

                const newData = {
                    labels,
                    datasets: [
                        {
                            data: newPoints.map(p => p.value),
                            borderColor: 'rgb(255, 99, 132)',
                            backgroundColor: 'rgba(255, 99, 132, 0.5)',
                        }
                    ],
                };

                setShowForm(false);
                setShowData(true);
                setData(newData);
            });
    }

    return (
        <div>
            {!showForm ? (
                <button onClick={hadleShowForm}>Graph settings</button>
            ) : (
                <form onSubmit={handleSubmit}>
                    <label>
                        Id:
                        <input type="text" value={id} onChange={(event) => setId(event.target.value)} />
                    </label>
                    <br />
                    <label>
                        Type:
                        <select value={type} onChange={(event) => setType(event.target.value)}>
                            <option value="BYTE_CNT">BYTE_CNT</option>
                            <option value="EXEC_TIME">EXEC_TIME</option>
                        </select>
                    </label>
                    <br />
                    <label>
                        tsBefore:
                        <input type="text" value={tsBefore} onChange={(event) => setTsBefore(event.target.value)} />
                    </label>
                    <br />
                    <label>
                        tsAfter:
                        <input type="text" value={tsAfter} onChange={(event) => setTsAfter(event.target.value)} />
                    </label>
                    <br />
                    <label>
                        Limit:
                        <input type="text" value={limit} onChange={(event) => setLimit(event.target.value)} />
                    </label>
                    <br />
                    <button type="submit">Submit</button>
                </form>
            )}
            {showData && (
                <Line data={data} />
            )}
        </div>
    );
};

export default Graphic;