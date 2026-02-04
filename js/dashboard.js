const token = localStorage.getItem("token");

if (!token) {
  window.location.href = "login.html";
}

async function loadDashboard() {
  try {
    const accRes = await fetch("http://127.0.0.1:5000/api/account/me", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    if (accRes.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "login.html";
      return;
    }

    const account = await accRes.json();
    const currentAccountNumber = account.accountNumber;

    document.getElementById("accNumber").innerText = account.accountNumber;
    document.getElementById("balance").innerText = "₹ " + account.balance;

    const txRes = await fetch(
      "http://127.0.0.1:5000/api/account/transactions/recent",
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    if (txRes.ok) {
      const transactions = await txRes.json();
      const list = document.getElementById("transactions");

      if (list) {
        list.innerHTML = "";

        transactions.forEach(tx => {
          const type =
            tx.senderAccount === currentAccountNumber ? "DEBIT" : "CREDIT";
          const li = document.createElement("li");
          li.innerText = `${type} Rs ${tx.amount}`;
          list.appendChild(li);
        });
      }
    }

  } catch (err) {
    alert("Failed to load dashboard");
  }
}
function logout() {
  localStorage.removeItem("token");
  window.location.href = "login.html";
}

loadDashboard();
