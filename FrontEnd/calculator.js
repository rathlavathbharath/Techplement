// Array to store calculation history
let history = [];

// Function to update calculation history
function updateHistory(calculation) {
    history.push(calculation);
    displayHistory();
    // Store calculation history in the database
    fetch('/history', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ calculation: calculation })
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('Error storing calculation history:', error));
}

// Function to display calculation history
function displayHistory() {
    const historyList = document.getElementById("history");
    historyList.innerHTML = "";
    
    history.forEach(calculation => {
        const listItem = document.createElement("li");
        listItem.textContent = calculation;
        historyList.appendChild(listItem);
    });
}

// Function to append to display and update history
function appendToDisplay(input) {
    display.value += input;
}

// Function to clear display
function clearDisplay() {
    display.value = "";
}

// Function to calculate and update history
function calculate() {
    const expression = display.value;

    try {
        const result = eval(expression);
        display.value = result;

        // Update calculation history
        updateHistory(`${expression} = ${result}`);
    } catch (error) {
        display.value = "Error";
    }
}
