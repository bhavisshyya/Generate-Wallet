import React, { useState, useEffect } from 'react';

function Balance({publicKey}) {
  const [balance, setBalance] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const fetchBalance = async () => {
    const url = "https://solana-mainnet.g.alchemy.com/v2/oELr5OxcAL0XJofi7wbr5t8si6RocDgq";
    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
    };
    const body = JSON.stringify({
      id: 1,
      jsonrpc: "2.0",
      method: "getBalance",
      params: [publicKey],
    });
    try {
        const response = await fetch(url, {
          method: "POST",
          headers: headers,
          body: body,
        });
        const data = await response.json();
        setBalance(data.result.value); // Adjust based on the actual API response structure
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
  useEffect(() => {
    if(publicKey)
    fetchBalance();
  }, [publicKey]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
     
      <p>Balance: {balance}</p>
      {console.log(balance)}
    </div>
  );
}

export default Balance;
