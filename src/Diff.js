import React, { useState } from 'react';
import axios from 'axios';

const URL = 'localhost:8080/';

const Diff = () => {
    const [showForm, setShowForm] = useState(false);
    const [type, setType] = useState('BYTE_CNT');
    const [tsBefore, setTsBefore] = useState('');
    const [tsAfter, setTsAfter] = useState('');
    const [limit, setLimit] = useState('');

    const [showData, setShowData] = useState(false);
    const [afterData, setAfterData] = useState([]);
    const [beforeData, setBeforeData] = useState([]);

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
      const type = formData.type;
      const limit = formData.limit;
      const final_url = URL + '/entities/active';

      const newBeforeData = [{id: 1, name: 'aboba', valueBefore: 10}, {id: 2, name: 'aboba', valueBefore: 20}]
      const newAfterData = [{id: 2, name: 'aboba', valueAfter: 20, diff: 30}, {id: 1, name: 'aboba', valueAfter: 10, diff: 20}, {id: 2, name: 'aboba', valueAfter: 20, diff: -2}]
      
      setAfterData(newAfterData);
      setBeforeData(newBeforeData);
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
            <button onClick={hadleShowForm}>Diff settings</button>
        ) : (
          <form onSubmit={handleSubmit}>
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
            <>
            <p className='data_p'>Data for {type}</p>
            <div className='flex_tables_wrapper'>
                <div className='before_table'>
                    <p>At time {tsBefore}</p>
                    <table>
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Name</th>
                                <th>Value</th>
                            </tr>
                        </thead>
                        <tbody>
                            {beforeData.map((entity) => (
                                <tr key={entity.id}>
                                    <td>{entity.id}</td>
                                    <td>{entity.name}</td>
                                    <td>{entity.valueBefore}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className='after_table'>
                    <p>At time {tsAfter}</p>
                    <table>
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Name</th>
                                <th>Value</th>
                                <th>Diff, %</th>
                            </tr>
                        </thead>
                        <tbody>
                            {afterData.map((entity) => (
                                <tr key={entity.id}>
                                    <td>{entity.id}</td>
                                    <td>{entity.name}</td>
                                    <td>{entity.valueAfter}</td>
                                    <td style={{backgroundColor: entity.diff < 5 ? '#7fff7f' : (entity.diff <= 20 ? 'yellow' : '#ff7f7f') }}>{entity.diff}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
        )}
      </div>
    );
};

export default Diff;