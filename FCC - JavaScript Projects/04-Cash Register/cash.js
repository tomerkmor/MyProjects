// Global variables
let price = 0;
let cid = [
    ["PENNY", 0],
    ["NICKEL", 0],
    ["DIME", 0],
    ["QUARTER", 0],
    ["ONE", 0],
    ["FIVE", 0],
    ["TEN", 0],
    ["TWENTY", 0],
    ["ONE HUNDRED", 0]
];

// Function to initialize the cash-in-drawer (cid)
function initializeCid(newCid) {
    cid = newCid;
}

// Function to set the price of the item
function setPrice(newPrice) {
    price = newPrice;
}

document.getElementById('purchase-btn').addEventListener('click', function() {
    // Retrieve values from input
    const cash = parseFloat(document.getElementById('cash').value);

    // Calculate change due
    const changeDue = cash - price;

    if (cash < price) {
        alert("Customer does not have enough money to purchase the item");
        document.getElementById('change-due').innerText = "";
    } else if (cash === price) {
        document.getElementById('change-due').innerText = "No change due - customer paid with exact cash";
    } else {
        const result = calculateChange(changeDue, cid);
        document.getElementById('change-due').innerText = result;
    }
});

function calculateChange(changeDue, cid) {
    // Currency units in descending order of value
    const currencyUnits = [
        ["ONE HUNDRED", 100],
        ["TWENTY", 20],
        ["TEN", 10],
        ["FIVE", 5],
        ["ONE", 1],
        ["QUARTER", 0.25],
        ["DIME", 0.1],
        ["NICKEL", 0.05],
        ["PENNY", 0.01]
    ];

    // Create a dictionary of currency units and their available amounts from cid
    const cidDict = Object.fromEntries(cid);

    // Calculate the total amount of cash in the drawer
    const totalCid = cid.reduce((sum, [_, amount]) => sum + amount, 0);

    let changeArray = [];
    let remainingChangeDue = changeDue;

    for (const [unit, value] of currencyUnits) {
        let unitTotal = cidDict[unit] || 0;

        if (remainingChangeDue <= 0) break;

        let changeAmount = 0;
        while (remainingChangeDue >= value && unitTotal > 0) {
            changeAmount += value;
            unitTotal -= value;
            remainingChangeDue -= value;
            remainingChangeDue = Math.round(remainingChangeDue * 100) / 100; // Round to avoid floating point issues
        }
        
        if (changeAmount > 0) {
            changeArray.push([unit, changeAmount]);
        }
    }

    // Determine the status of the transaction
    if (remainingChangeDue > 0) {
        return "Status: INSUFFICIENT_FUNDS";
    }

    // Check if total cash in drawer matches the change due
    if (Math.round(totalCid * 100) / 100 === Math.round(changeDue * 100) / 100) {
        const changeString = changeArray
            .map(([unit, amount]) => `${unit}: $${amount.toFixed(2)}`)
            .join(" ");
        return `Status: CLOSED ${changeString}`;
    }

    if (changeArray.length > 0) {
        const changeString = changeArray
            .map(([unit, amount]) => `${unit}: $${amount.toFixed(2)}`)
            .join(" ");
        return `Status: OPEN ${changeString}`;
    }

    return "Status: CLOSED";
}