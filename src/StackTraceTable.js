import React, { useState } from 'react';

const StackTraceTable = () => {
    const [showForm, setShowForm] = useState(false);
    const [id, setId] = useState('');
    const [tsBefore, setTsBefore] = useState('');
    const [tsAfter, setTsAfter] = useState('');
    const [limit, setLimit] = useState('');

    const [showData, setShowData] = useState(false);
    const [selectedTrace, setSelectedTrace] = useState('');
    const [data, setData] = useState([]);

    const handleRowClick = (trace) => {
        setSelectedTrace(trace);
    };

    const hadleShowForm = (event) => {
        event.preventDefault();
        setShowForm(true)
        setShowData(false);
    }
  
    const handleSubmit = (event) => {
      event.preventDefault();

      const formData = event.currentTarget;
      const tsBefore = formData.tsBefore;
      const tsAfter = formData.tsAfter;
      const id = formData.id;
      const limit = formData.limit;
      const final_url = URL + '/entities/active'

      const newData = [{id: 1, name: 'aboba', startTs: 10, endTs: 11, byteCnt: 100, stackTrace: 'aaaaa'},
                        {id: 2, name: 'aboba', startTs: 1450, endTs: 1123, byteCnt: 2323, stackTrace: 'aasdfsdfaaa'}]
    
      setData(newData);
      setShowForm(false);
      setShowData(true);

    //   axios.get(final_url)
    //   .then(response => {
    //         const newBeforeData = response.data.map((e) => {

    //         });
    //         const newAfterData = response.data.map((e) => {
                
    //         });
            
    //         setAfterData(newAfterData);
    //         setBeforeData(newBeforeData);
    //         setShowForm(false);
    //         setShowData(true);
    //   });
    }
  
    return (
      <div>
        {!showForm ? (
            <button onClick={hadleShowForm}>`stack trace settings</button>
        ) : (
          <form onSubmit={handleSubmit}>
            <label>
              Id:
              <input type="text" value={id} onChange={(event) => setId(event.target.value)} />
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
                        <tr key={row.id} onClick={() => handleRowClick(row.stackTrace)}>
                            <td>{row.name}</td>
                            <td>{row.startTs}</td>
                            <td>{row.endTs}</td>
                            <td>{row.byteCnt}</td>
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
        )}
      </div>
    );
};

export default StackTraceTable;