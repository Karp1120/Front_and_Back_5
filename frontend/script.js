

let token = '';

async function register() {
  const username = document.getElementById('regUsername').value;
  const password = document.getElementById('regPassword').value;

  const res = await fetch('http://localhost:3000/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });

  const data = await res.json();
  document.getElementById('output').innerText = data.message || 'Registered';
}

async function login() {
  const username = document.getElementById('loginUsername').value;
  const password = document.getElementById('loginPassword').value;

  const res = await fetch('http://localhost:3000/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });

  const data = await res.json();
  if (data.token) {
    token = data.token;
    document.getElementById('output').innerText = 'Login successful. Token saved.';
  } else {
    document.getElementById('output').innerText = data.message || 'Login failed.';
  }
}

async function getProtected() {
    const res = await fetch('http://localhost:3000/protected', {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + token,
      },
    });
  
    if (!res.ok) {
      const errorText = await res.text(); 
      document.getElementById('output').innerText = 'Error: ' + errorText;
      return;
    }
  
    const data = await res.json();
    document.getElementById('output').innerText = data.message || JSON.stringify(data);
  }
  