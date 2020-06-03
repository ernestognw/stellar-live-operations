import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [loading, setLoading] = useState(true);
  const [fetchingNew, setFetchingNew] = useState(false);
  const [operations, setOperations] = useState([]);

  useEffect(() => {
    const getData = async () => {
      setFetchingNew(true);
      const data = await fetch(
        `https://horizon.stellar.org/operations?include_failed=false&order=desc&limit=5`
      );
      const dataJSON = await data.json();
      console.log(dataJSON);

      setOperations(prevOps => [...dataJSON._embedded.records, ...prevOps]);
      setLoading(false);
      setFetchingNew(false);
    };

    getData();

    setInterval(getData, 5000);

    return () => clearInterval(getData);
  }, []);

  return (
    <div class="container">
      {loading ? (
        <p>loading...</p>
      ) : (
        <>
          <h2>Operations live stream {fetchingNew && "Loading..."}</h2>
          <ul className="list">
            {operations.map(operation => (
              <li className="list-item" key={operation.id}>
                <p>Tipo: {operation.type}</p>
                <p>De: {operation.from}</p>
                <p>Para: {operation.to}</p>
                <p>Cantidad: {operation.amount}</p>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

export default App;
