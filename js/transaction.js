const token = localStorage.getItem("token");

if (!token) {
  window.location.href = "login.html";
}

fetch("http://localhost:5000/api/account/transactions/recent", {
  headers: {
    Authorization: `Bearer ${token}`,
  },
})
  .then(res => res.json())
  .then(transactions => {
    const table = document.getElementById("transactionTable");

    if (!transactions.length) {
      table.innerHTML =
        "<tr><td colspan='5'>No transactions</td></tr>";
      return;
    }

    table.innerHTML = "";
    transactions.forEach(tx => {
      table.innerHTML += `
        <tr>
          <td>${tx.type}</td>
          <td>₹${tx.amount}</td>
          <td>${tx.senderAccount}</td>
          <td>${tx.receiverAccount}</td>
          <td>${new Date(tx.createdAt).toLocaleString()}</td>
        </tr>
      `;
    });
  })
  .catch(() => {
    window.location.href = "login.html";
  });
