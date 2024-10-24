let swimsuitScores = {
    contestant1: [0, 0, 0],
    contestant2: [0, 0, 0],
    contestant3: [0, 0, 0],
    contestant4: [0, 0, 0],
    contestant5: [0, 0, 0],
    contestant6: [0, 0, 0],
    contestant7: [0, 0, 0],
    contestant8: [0, 0, 0]
};

function calculateSwimsuitTotal(judgeNumber, contestantNumber) {
    // Get the values for the current judge form based on contestant number and judge number
    const bodyProportion = parseFloat(document.querySelector(`#swimsuit-contestant-${contestantNumber} .judge-${judgeNumber} #swimsuit-body-proportion-${contestantNumber}-${judgeNumber}`).value) || 0;
    const poise = parseFloat(document.querySelector(`#swimsuit-contestant-${contestantNumber} .judge-${judgeNumber} #swimsuit-poise-${contestantNumber}-${judgeNumber}`).value) || 0;
    const beauty = parseFloat(document.querySelector(`#swimsuit-contestant-${contestantNumber} .judge-${judgeNumber} #swimsuit-beauty-${contestantNumber}-${judgeNumber}`).value) || 0;
    const impression = parseFloat(document.querySelector(`#swimsuit-contestant-${contestantNumber} .judge-${judgeNumber} #swimsuit-impression-${contestantNumber}-${judgeNumber}`).value) || 0;

    // Validate if the input is within the allowed range
    if (bodyProportion > 30 || poise > 30 || beauty > 30 || impression > 10) {
        alert('One or more scores are exceeding the maximum allowed values.');
        return;
    }

    // Calculate the total score for the current judge
    const total = bodyProportion + poise + beauty + impression;

    // Display the total score for the current judge
    document.querySelector(`#swimsuit-contestant-${contestantNumber} .judge-${judgeNumber} #swimsuit-total-score-${contestantNumber}-${judgeNumber}`).textContent = total;

    // Store the score in the array for the current contestant and judge
    swimsuitScores[`contestant${contestantNumber}`][judgeNumber - 1] = total;

    // Calculate and display the average score for the contestant
    calculateSwimsuitAverage(contestantNumber);
    displaySwimsuitRankings();  // Update rankings whenever a score is calculated
}

function calculateSwimsuitAverage(contestantNumber) {
    const total = swimsuitScores[`contestant${contestantNumber}`].reduce((acc, curr) => acc + curr, 0);
    const average = (total / swimsuitScores[`contestant${contestantNumber}`].length).toFixed(2);
    document.getElementById(`swimsuit-average-score-${contestantNumber}`).textContent = average;
}

function displaySwimsuitRankings() {
    // For male contestants (1-4)
    const maleScores = Object.keys(swimsuitScores).slice(0, 4).map(contestant => {
        const total = swimsuitScores[contestant].reduce((acc, curr) => acc + curr, 0);
        const average = (total / swimsuitScores[contestant].length).toFixed(2);
        return { contestant, average: parseFloat(average) };
    });

    maleScores.sort((a, b) => b.average - a.average);

    const rankingTableBodyMale = document.querySelector('#swimsuit-ranking-table-male tbody');
    rankingTableBodyMale.innerHTML = ''; // Clear existing rows

    maleScores.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `<td>${item.contestant}</td><td>${item.average}</td>`;
        rankingTableBodyMale.appendChild(row);
    });

    // For female contestants (5-8)
    const femaleScores = Object.keys(swimsuitScores).slice(4, 8).map(contestant => {
        const total = swimsuitScores[contestant].reduce((acc, curr) => acc + curr, 0);
        const average = (total / swimsuitScores[contestant].length).toFixed(2);
        return { contestant, average: parseFloat(average) };
    });

    femaleScores.sort((a, b) => b.average - a.average);

    const rankingTableBodyFemale = document.querySelector('#swimsuit-ranking-table-female tbody');
    rankingTableBodyFemale.innerHTML = ''; // Clear existing rows

    femaleScores.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `<td>${item.contestant}</td><td>${item.average}</td>`;
        rankingTableBodyFemale.appendChild(row);
    });
}
