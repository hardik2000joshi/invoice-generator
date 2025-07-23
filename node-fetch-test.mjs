import fetch from 'node-fetch';

async function test() {
  const res = await fetch('https://staging.paysecure.net/api/v1/purchases/', {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer TEST',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({})
  });
  const data = await res.text();
  console.log(data);
}

test().catch(console.error);