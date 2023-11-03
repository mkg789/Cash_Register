function checkCashRegister(price, cash, cid) {
    const currency = {
      0: 0.01,
      1: 0.05,
      2: 0.1,
      3: 0.25,
      4: 1,
      5: 5,
      6: 10,
      7: 20,
      8: 100,
    };
  
    let c = [];
    let total = 0;
  
    for (let i = 0; i < 9; i++) {
      total += cid[i][1];
    }
  
    let balance = cash - price;
  
    if (balance > total) {
      return { status: "INSUFFICIENT_FUNDS", change: [] };
    } else if (balance === total) {
      return { status: "CLOSED", change: cid };
    } else {
      for (let i = 8; i >= 0; i--) {
        let ch = 0;
        while (currency[i] <= balance && cid[i][1] > 0) {
          ch += currency[i];
          cid[i][1] -= currency[i];
          balance -= currency[i];
          balance = balance.toFixed(2); // Limit to two decimal places
        }
        if (ch > 0) {
          c.push([cid[i][0], ch]);
        }
      }
    }
  
    // If balance is not zero, return INSUFFICIENT_FUNDS
    if (balance > 0) {
      return { status: "INSUFFICIENT_FUNDS", change: [] };
    }
  
    // If change is provided, return "OPEN" with the change array
    if (c.length > 0) {
      return { status: "OPEN", change: c };
    }
  
    // If no change is provided, return "INSUFFICIENT_FUNDS"
    return { status: "INSUFFICIENT_FUNDS", change: [] };
  }
  
  console.log(
    checkCashRegister(19.5, 20, [
      ["PENNY", 1.01],
      ["NICKEL", 2.05],
      ["DIME", 3.1],
      ["QUARTER", 4.25],
      ["ONE", 90],
      ["FIVE", 55],
      ["TEN", 20],
      ["TWENTY", 60],
      ["ONE HUNDRED", 100],
    ])
  );