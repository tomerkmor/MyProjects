const btnClicked = () => {
    if(input.value === ""){
      alert("Please input a value");
    }
  
    // filter the garbage
    const filteredInput = input.value.replace(/[^a-zA-Z0-9]/g,'').toLowerCase();
  
    // reverse the input
    const reversedInput = filteredInput.split('').reverse().join('');
    
    if(filteredInput === reversedInput){
      result.innerHTML = `<p>${input.value} is a palindrome</p>`
    }else{
      result.innerHTML = `<p>${input.value} is not a palindrome</p>`
    }
  }
  
  
  const input = document.getElementById('text-input')
  const checkBtn = document.getElementById('check-btn').addEventListener('click', btnClicked)
  const result = document.getElementById('result')