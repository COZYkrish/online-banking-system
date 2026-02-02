const token = localStorage.getItem("token");

if (!token) {
  window.location.href = "login.html";
}

async function loadDashboard() {
  const accRes = await fetch("http://localhost:5000/api/account/me", {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  const account = await accRes.json();

  document.getElementById("accNumber").innerText = account.accountNumber;
  document.getElementById("balance").innerText = account.balance;

  const txRes = await fetch(
    "http://localhost:5000/api/account/transactions/recent",
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );
  const transactions = await txRes.json();

  const list = document.getElementById("transactions");
  list.innerHTML = "";

  transactions.forEach(tx => {
    const li = document.createElement("li");
    li.innerText = `${tx.type} ₹${tx.amount}`;
    list.appendChild(li);
  });
}

function logout() {
  localStorage.removeItem("token");
  window.location.href = "login.html";
}

loadDashboard();
