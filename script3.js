let qaScores = {
    contestant1: [0, 0, 0],
    contestant2: [0, 0, 0],
    contestant3: [0, 0, 0],
    contestant4: [0, 0, 0],
    contestant5: [0, 0, 0],
    contestant6: [0, 0, 0],
    contestant7: [0, 0, 0],
    contestant8: [0, 0, 0]
};

function calculateQATotal(judgeNumber, contestantNumber) {
    // Get the form elements for the current judge and contestant
    const judgeContainer = document.querySelector(`#qna-contestant-${contestantNumber} .judge-${judgeNumber}`);
    
    // Get scores for Beauty under Pressure, Substance of the Answer, and Delivery of the Answer
    const beautyPressure = parseFloat(judgeContainer.querySelector(`#qa-beauty-pressure-${judgeNumber}-${contestantNumber}`).value) || 0;
    const substance = parseFloat(judgeContainer.querySelector(`#qa-substance-${judgeNumber}-${contestantNumber}`).value) || 0;
    const delivery = parseFloat(judgeContainer.querySelector(`#qa-delivery-${judgeNumber}-${contestantNumber}`).value) || 0;

    // Validate if the input is within the allowed range
    if (beautyPressure > 20 || substance > 40 || delivery > 40) {
        alert('One or more scores are exceeding the maximum allowed values.');
        return;
    }

    // Calculate the total score for the current judge
    const total = beautyPressure + substance + delivery;

    // Display the total score for the current judge
    document.querySelector(`#qna-contestant-${contestantNumber} .judge-${judgeNumber} #qa-total-score-${judgeNumber}-${contestantNumber}`).textContent = total;

    // Store the score in the array for the current contestant and judge
    qaScores[`contestant${contestantNumber}`][judgeNumber - 1] = total;

    // Calculate and display the average score for the contestant
    calculateQAAverage(contestantNumber);
    
    // Update rankings
    displayQARankings();
}

function calculateQAAverage(contestantNumber) {
    // Calculate the average score for the contestant based on all judge scores
    const total = qaScores[`contestant${contestantNumber}`].reduce((acc, curr) => acc + curr, 0);
    const average = (total / qaScores[`contestant${contestantNumber}`].length).toFixed(2);
    
    // Display the average score for the contestant
    document.getElementById(`qa-average-score-${contestantNumber}`).textContent = average;
}

function displayQARankings() {
    // Calculate rankings for male contestants (contestants 1-4)
    const maleScores = Object.keys(qaScores).slice(0, 4).map(contestant => {
        const total = qaScores[contestant].reduce((acc, curr) => acc + curr, 0);
        const average = (total / qaScores[contestant].length).toFixed(2);
        return { contestant, average: parseFloat(average) };
    });

    maleScores.sort((a, b) => b.average - a.average); // Sort by average score descending

    // Display male contestant rankings
    const rankingTableBodyMale = document.querySelector('#qa-ranking-table-male tbody');
    rankingTableBodyMale.innerHTML = ''; // Clear existing rows

    maleScores.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `<td>${item.contestant}</td><td>${item.average}</td>`;
        rankingTableBodyMale.appendChild(row);
    });

    // Calculate rankings for female contestants (contestants 5-8)
    const femaleScores = Object.keys(qaScores).slice(4, 8).map(contestant => {
        const total = qaScores[contestant].reduce((acc, curr) => acc + curr, 0);
        const average = (total / qaScores[contestant].length).toFixed(2);
        return { contestant, average: parseFloat(average) };
    });

    femaleScores.sort((a, b) => b.average - a.average); // Sort by average score descending

    // Display female contestant rankings
    const rankingTableBodyFemale = document.querySelector('#qa-ranking-table-female tbody');
    rankingTableBodyFemale.innerHTML = ''; // Clear existing rows

    femaleScores.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `<td>${item.contestant}</td><td>${item.average}</td>`;
        rankingTableBodyFemale.appendChild(row);
    });
}
