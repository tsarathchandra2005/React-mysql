import React, { useState } from 'react';
import './TableForm.css';

const TableForm = () => {
  const [tableName, setTableName] = useState('');
  const [columns, setColumns] = useState([{ name: '', type: 'INT' }]);
  const [sqlOutput, setSqlOutput] = useState('');

  const handleTableNameChange = (event) => {
    setTableName(event.target.value);
  };

  const handleColumnChange = (index, field, value) => {
    const newColumns = [...columns];
    newColumns[index][field] = value;
    setColumns(newColumns);
  };

  const addColumn = () => {
    const emptyColumn = columns.some(column => column.name === '');
    if (emptyColumn) {
      alert('Please fill in all column names before adding a new column.');
      return;
    }
    setColumns([...columns, { name: '', type: 'INT' }]);
  };

  const deleteColumn = (index) => {
    const newColumns = columns.filter((_, colIndex) => colIndex !== index);
    setColumns(newColumns);
  };

  const generateSQL = (event) => {
    event.preventDefault();
    if (!tableName || columns.some(column => !column.name)) {
      alert("Please fill in all fields.");
      return;
    }
    const columnsSql = columns.map(column => `${column.name} ${column.type}`).join(',\n    ');
    const sql = `CREATE TABLE ${tableName} (\n    ${columnsSql}\n);`;
    setSqlOutput(sql);
  };

  return (
    <div className="container">
      <h2>Creating table for MySQL</h2>
      <form onSubmit={generateSQL}>
        <div className="form-group">
          <label htmlFor="tableName">Table Name:</label>
          <input
            type="text"
            id="tableName"
            value={tableName}
            onChange={handleTableNameChange}
            required
          />
        </div>
        <div id="columns">
          {columns.map((column, index) => (
            <div key={index} className="form-group columns">
              <input
                type="text"
                placeholder="Column Name"
                value={column.name}
                onChange={(e) => handleColumnChange(index, 'name', e.target.value)}
                required
              />
              <select
                value={column.type}
                onChange={(e) => handleColumnChange(index, 'type', e.target.value)}
              >
                <option value="INT">INT</option>
                <option value="VARCHAR(255)">VARCHAR(255)</option>
                <option value="TEXT">TEXT</option>
                <option value="DATE">DATE</option>
                <option value="BOOLEAN">BOOLEAN</option>
              </select>
              <span className="delete" onClick={() => deleteColumn(index)}>-</span>
            </div>
          ))}
        </div>
        <div className="plus" onClick={addColumn}>+ Add Column</div>
        <div className="form-group">
          <button type="submit">Create Table</button>
        </div>
      </form>
      {sqlOutput && <div className="sql-output">{sqlOutput}</div>}
    </div>
  );
};

export default TableForm;
