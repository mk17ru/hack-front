import React, { useState } from 'react';

const data = [
    { id: 1, method_name: 'method1', request_start_ts: '2022-03-30 12:00:00', request_end_ts: '2022-03-30 12:01:00', byte_cnt: 1024, stack_trace: 'stack trace 1' },
    { id: 2, method_name: 'method2', request_start_ts: '2022-03-30 12:01:00', request_end_ts: '2022-03-30 12:02:00', byte_cnt: 2048, stack_trace: 'stack trace 2' },
    { id: 3, method_name: 'method3', request_start_ts: '2022-03-30 12:02:00', request_end_ts: '2022-03-30 12:03:00', byte_cnt: 4096, stack_trace: 'stack trace 3' },
];

const Table = () => {
    const [selectedTrace, setSelectedTrace] = useState('');

    const handleRowClick = (trace) => {
        setSelectedTrace(trace);
    };

    return (
        <div>
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
                    <tr key={row.id} onClick={() => handleRowClick(row.stack_trace)}>
                        <td>{row.method_name}</td>
                        <td>{row.request_start_ts}</td>
                        <td>{row.request_end_ts}</td>
                        <td>{row.byte_cnt}</td>
                    </tr>
                ))}
                </tbody>
            </table>
            {selectedTrace && (
                <div>
                    <h2>Stack Trace</h2>
                    <p>{selectedTrace}</p>
                </div>
            )}
        </div>
    );
};

export default Table;
