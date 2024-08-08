const btnClicked = () => {

  const inputVal = input.value
  let num = parseInt(inputVal,10)

  if(isNaN(num)){
    output.innerHTML = `<p>Please enter a valid number</p>`
  }else if(num < 1){
    output.innerHTML = `<p>Please enter a number greater than or equal to 1</p>`
  }else if(num >= 4000){
    output.innerHTML = `<p>Please enter a number less than or equal to 3999</p>`
  }else{
    const romanValues = [
        { value: 1000, numeral: 'M' },
        { value: 900, numeral: 'CM' },
        { value: 500, numeral: 'D' },
        { value: 400, numeral: 'CD' },
        { value: 100, numeral: 'C' },
        { value: 90, numeral: 'XC' },
        { value: 50, numeral: 'L' },
        { value: 40, numeral: 'XL' },
        { value: 10, numeral: 'X' },
        { value: 9, numeral: 'IX' },
        { value: 5, numeral: 'V' },
        { value: 4, numeral: 'IV' },
        { value: 1, numeral: 'I' }
    ];

    let str = ""

     for (const { value, numeral } of romanValues) {
        while (num >= value) {
            str += numeral;
            num -= value;
        }
    }
    output.innerHTML = `<p>${str}</p>`
  } 
}

const input = document.getElementById('number')
const convertBtn = document.getElementById('convert-btn').addEventListener('click', btnClicked)
const output = document.getElementById('output')