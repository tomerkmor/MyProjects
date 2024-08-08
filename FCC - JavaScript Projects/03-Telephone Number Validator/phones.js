

const checkClicked = () => {

    if(!input.value){
      alert("Please provide a phone number")
      return
    }
  
    // such a pain.. regular expressions
    const option1 = /^1?[\s\-]?\(\d{3}\)[\s\-]?\d{3}[\s\-]?\d{4}$/
    const option2 = /^1?[\s\-]?\d{3}[\s\-]?\d{3}[\s\-]?\d{4}$/;
    const option3 = /^1?[\s-]?\d{3}\(\d{3}\){d4}$/
    const option4 = /^1?d{10}$/
  
    let resultMessage = '';
  
    if(option1.test(input.value) || option2.test(input.value) || option3.test(input.value) || option4.test(input.value)){
      resultMessage = `Valid US number: ${input.value}`;
    }else{
      resultMessage = `Invalid US number: ${input.value}`;
    }
      output.innerHTML = resultMessage;
  }
  
  const clearClicked = () => {
    input.value = ""
    output.innerHTML = ""
  }
  
  
  const input = document.getElementById('user-input')
  const checkBtn = document.getElementById('check-btn').addEventListener('click', checkClicked)
  const clearBtn = document.getElementById('clear-btn').addEventListener('click', clearClicked)
  const output = document.getElementById('results-div')