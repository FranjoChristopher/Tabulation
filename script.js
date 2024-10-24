let scores = {
    contestant1: [0, 0, 0],
    contestant2: [0, 0, 0],
    contestant3: [0, 0, 0],
    contestant4: [0, 0, 0],
    contestant5: [0, 0, 0],
    contestant6: [0, 0, 0],
    contestant7: [0, 0, 0],
    contestant8: [0, 0, 0]
};

function calculateTotal(judgeNumber, contestantNumber) {
    const poise = parseFloat(document.querySelector(`#casual-contestant-${contestantNumber} .container:nth-child(${judgeNumber}) #poise-${(judgeNumber + (contestantNumber - 1) * 3)}`).value) || 0;
    const attire = parseFloat(document.querySelector(`#casual-contestant-${contestantNumber} .container:nth-child(${judgeNumber}) #attire-${(judgeNumber + (contestantNumber - 1) * 3)}`).value) || 0;
    const beauty = parseFloat(document.querySelector(`#casual-contestant-${contestantNumber} .container:nth-child(${judgeNumber}) #beauty-${(judgeNumber + (contestantNumber - 1) * 3)}`).value) || 0;
    const performance = parseFloat(document.querySelector(`#casual-contestant-${contestantNumber} .container:nth-child(${judgeNumber}) #performance-${(judgeNumber + (contestantNumber - 1) * 3)}`).value) || 0;

    if (poise > 40 || attire > 25 || beauty > 25 || performance > 10) {
        alert('One or more scores are exceeding the maximum allowed values.');
        return;
    }

    const total = poise + attire + beauty + performance;
    document.querySelector(`#casual-contestant-${contestantNumber} .container:nth-child(${judgeNumber}) #total-score-${(judgeNumber + (contestantNumber - 1) * 3)}`).textContent = total;
    scores[`contestant${contestantNumber}`][judgeNumber - 1] = total;

    calculateAverage(contestantNumber);
    displayRankings();  // Update rankings whenever a score is calculated
}

function calculateAverage(contestantNumber) {
    const total = scores[`contestant${contestantNumber}`].reduce((acc, curr) => acc + curr, 0);
    const average = (total / scores[`contestant${contestantNumber}`].length).toFixed(2);
    document.getElementById(`average-score-${contestantNumber}`).textContent = average;
}

function displayRankings() {
    // For male contestants (1-4)
    const maleScores = Object.keys(scores).slice(0, 4).map(contestant => {
        const total = scores[contestant].reduce((acc, curr) => acc + curr, 0);
        const average = (total / scores[contestant].length).toFixed(2);
        return { contestant, average: parseFloat(average) };
    });

    maleScores.sort((a, b) => b.average - a.average);

    const rankingTableBodyMale = document.querySelector('#ranking-table-male tbody');
    rankingTableBodyMale.innerHTML = ''; // Clear existing rows

    maleScores.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `<td>${item.contestant}</td><td>${item.average}</td>`;
        rankingTableBodyMale.appendChild(row);
    });

    // For female contestants (5-8)
    const femaleScores = Object.keys(scores).slice(4, 8).map(contestant => {
        const total = scores[contestant].reduce((acc, curr) => acc + curr, 0);
        const average = (total / scores[contestant].length).toFixed(2);
        return { contestant, average: parseFloat(average) };
    });

    femaleScores.sort((a, b) => b.average - a.average);

    const rankingTableBodyFemale = document.querySelector('#ranking-table-female tbody');
    rankingTableBodyFemale.innerHTML = ''; // Clear existing rows

    femaleScores.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `<td>${item.contestant}</td><td>${item.average}</td>`;
        rankingTableBodyFemale.appendChild(row);
    });
}
