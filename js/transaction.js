const token = localStorage.getItem("token");

if (!token) {
  window.location.href = "login.html";
}

async function loadTransactions() {
  try {
    const accRes = await fetch("http://127.0.0.1:5000/api/account/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (accRes.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "login.html";
      return;
    }

    const account = await accRes.json();
    const currentAccountNumber = account.accountNumber;

    const txRes = await fetch(
      "http://127.0.0.1:5000/api/account/transactions/recent",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const transactions = await txRes.json();
    const table = document.getElementById("transactionTable");

    if (!transactions.length) {
      table.innerHTML =
        "<tr><td colspan='5'>No transactions</td></tr>";
      return;
    }

    table.innerHTML = "";
    transactions.forEach(tx => {
      const type =
        tx.senderAccount === currentAccountNumber ? "DEBIT" : "CREDIT";
      table.innerHTML += `
        <tr>
          <td>${type}</td>
          <td>â‚¹${tx.amount}</td>
          <td>${tx.senderAccount}</td>
          <td>${tx.receiverAccount}</td>
          <td>${new Date(tx.createdAt).toLocaleString()}</td>
        </tr>
      `;
    });
  } catch (err) {
    window.location.href = "login.html";
  }
}

loadTransactions();
