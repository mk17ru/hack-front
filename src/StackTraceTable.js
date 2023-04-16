import React, { useState } from 'react';
import axios from "axios";

const URL = 'http://localhost:8080/';

const StackTraceTable = () => {
    const [showForm, setShowForm] = useState(false);
    const [id, setId] = useState('');
    const [type, setType] = useState('BYTE_CNT');
    const [tsBefore, setTsBefore] = useState('');
    const [tsAfter, setTsAfter] = useState('');
    const [limit, setLimit] = useState('');

    const [showData, setShowData] = useState(false);
    const [selectedTraceId, setSelectedTraceId] = useState(-1);
    const [data, setData] = useState([]);

    const handleRowClick = (id) => {
        if (selectedTraceId == id) {
            setSelectedTraceId(-1);
        } else {
            setSelectedTraceId(id);
        }
    };

    const hadleShowForm = (event) => {
        event.preventDefault();
        setShowForm(true)
        setShowData(false);
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        const final_url = URL + 'stac/' + id + '?tsBefore=' + tsBefore + '&tsAfter=' + tsAfter + '&type=' + type + '&limit=' + limit;

        axios.get(final_url)
            .then(response => {
                const newData = response.data.map(d => { return {id: d.eventId, methodId: d.methodId, name: d.name, startTs: d.startTimestamp, endTs: d.finishTimestamp, byteCnt: d.bytesCount, stackTrace: d.stacktrace} })

                setData(newData);
                setShowForm(false);
                setShowData(true);
            });
    }

    return (
        <div>
            {!showForm ? (
                <button onClick={hadleShowForm}>Stack trace settings</button>
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
                <div className='tracer'>
                    <table>
                        <thead>
                        <tr>
                            <th>Method Name</th>
                            <th>Request Start Time</th>
                            <th>Request End Time</th>
                            <th>Byte Count</th>
                        </tr>
                        </thead>
                        <tbody>
                        {data.map((row) => (
                            <>
                                <tr key={row.id} onClick={() => handleRowClick(row.id)}>
                                    <td>{row.name}</td>
                                    <td>{row.startTs}</td>
                                    <td>{row.endTs}</td>
                                    <td>{row.byteCnt}</td>
                                </tr>
                                {selectedTraceId === row.id && (
                                    <tr>
                                        <td colSpan="4">
                                            <div style={{textAlign:'left', marginLeft: '40px'}}>
                                                {row.stackTrace}
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </>
                        ))}
                        </tbody>
                    </table>

                </div>
            )}
        </div>
    );
};

export default StackTraceTable;