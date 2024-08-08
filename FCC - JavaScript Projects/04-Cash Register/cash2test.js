// Global variables
let price = 19.5;
let cid = [["PENNY", 0.5], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]

const calcMoney = (arr) => {
    let result = 0
    for(let i=0; i < arr.length; i++){
        result += arr[i][1]
    }
    return result
}

const tryToReturn = (change) => {
    console.log("trying to get a change...")
    let tempArr = structuredClone(cid)
    const finalResult = getChange(tempArr, change)
    if(calcMoney(finalResult) != change){
        console.log("we are trying to give " + calcMoney(finalResult) +" but we have to give " + change)
        return false;
    }else{
        return true;
    }

}

const getChange = (tempArr, change) => {
    const currency = [
        ["PENNY", 0.01], 
        ["NICKEL", 0.05], 
        ["DIME", 0.1], 
        ["QUARTER", 0.25], 
        ["ONE", 1], 
        ["FIVE", 5], 
        ["TEN", 10], 
        ["TWENTY", 20], 
        ["ONE HUNDRED", 100]
    ];

    let finalChange = [
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

    console.log("---------------------\n\nreturning a change...")
    let num = change

    // build the array change
    for(let i = tempArr.length - 1; i>=0; i--){

        console.log("\nfinalChange[i][0] = " + finalChange[i][0])
        console.log("finalChange[i][1] = " + finalChange[i][1])
        console.log("change left:" + num)
        console.log("currency[i][1] = " + currency[i][1])
        console.log("tempArr[i][1] = " + tempArr[i][1])
        if(num >= currency[i][1] && tempArr[i][1] > 0){
            finalChange[i][1] += currency[i][1]
            tempArr[i][1] -= currency[i][1]
            num = Math.round((num - currency[i][1])*100)/100
            i++
        }
    }

    // filter out the irrelevant (0's values)
    for(let i = cid.length - 1; i>=0; i--){
        if(finalChange[i][1] === 0){
            finalChange.splice(i,1)
        }
    }
    console.log(finalChange)
    return finalChange //it is an array of arrays of change
}


const btnClicked = () => {
    const cashPaid = input.value
    const change = cashPaid - price
    console.log("the CHANGE to the client is = " + change)

    if(cashPaid < price){
        alert("Customer does not have enough money to purchase the item")
    }
    
    // main logic
    console.log("CALCMONEY = " + calcMoney(cid) + "||| change = " + change)
    if(calcMoney(cid) < change){
        console.log("not enought money to change")
        output.innerHTML = `<p>Status: INSUFFICIENT_FUNDS</p>`
    }else if (calcMoney(cid) == change){

        const finalChange = getChange(cid, change).slice().reverse()
                const formattedChange = finalChange.map(([name, value]) => 
                `${name}: $${value}`
                ).join(' ');
        output.innerHTML = `<p>Status: CLOSED + ${formattedChange}</p>`

    }else{ // (cid > change) // we potentially have enought money
        if(cashPaid == price){
            output.innerHTML=`<p>No change due - customer paid with exact cash</p>`
        }else if(cashPaid > price){
            if(!tryToReturn(change)){//can't return the exact change back from cid
                const finalChange = getChange(cid, change).slice().reverse()
                console.log("trying to find lack of change!@!! - FAILS")
                console.log(finalChange)
                output.innerHTML = `<p>Status: INSUFFICIENT_FUNDS</p>`
            }else{ // returning a change
                const finalChange = getChange(cid, change).slice().reverse()
                const formattedChange = finalChange.map(([name, value]) => 
                `${name}: $${value}`
                ).join(' ');
                output.innerHTML=`<p>Status: OPEN ${formattedChange}</p>`
            }
        }


    }
}

const input = document.getElementById('cash')
const btn = document.getElementById('purchase-btn').addEventListener('click', btnClicked)
const output = document.getElementById('change-due')