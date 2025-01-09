// Select elements from the DOM
const submitButton = document.querySelector('#submit');
const formContainer = document.querySelector('#form-container');
const form = document.querySelector('#form');
const table = document.querySelector('#table');
const tbody = document.querySelector('#tbody');
const report = document.querySelector('#report');
const reportContainer = document.querySelector('#report-container');
const form1 = document.querySelector('#form1');
const name1 = document.querySelector('#name');
const age = document.querySelector('#age');
const weight = document.querySelector('#weight');
const Situation = document.querySelector('#Situation');
const goal_body = document.querySelector('#goal');
const grams = document.querySelector('#grams');

// Variables for calculations
let fat, lean_mass, goal, formula, reduce_fat, Duration;

// Show the form when the submit button is clicked
submitButton.addEventListener('click', () => {


    if (name1.value.trim() === '' || age.value.trim() === '') {
        alert("**PLEASE ENTER YOUR BASIC DETAILS!***");
        return;
    }
    name1.value=''
    age.value=''
    formContainer.style.display = 'block';
});

// Handle form submission
form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!validateInputs()) return;
    formContainer.style.display = 'none';
    calculation();
});

// Validate user inputs
function validateInputs() {
    if (!weight.value || isNaN(weight.value) || weight.value <= 0) {
        alert("Please enter a valid weight!");
        return false;
    }
    if (!Situation.value || isNaN(Situation.value) || Situation.value < 0 || Situation.value > 100) {
        alert("Please enter a valid percentage for the current situation (0-100)!");
        return false;
    }
    if (!goal_body.value || isNaN(goal_body.value) || goal_body.value < 0 || goal_body.value > 100) {
        alert("Please enter a valid percentage for the goal body (0-100)!");
        return false;
    }
    if (!grams.value || isNaN(grams.value) || grams.value <= 0) {
        alert("Please enter a valid number for grams per week!");
        return false;
    }
    return true;
}

// Perform calculations
function calculation() {
    fat = (Situation.value / 100) * weight.value; // Current Body Fat
    lean_mass = weight.value - fat; // Lean fat-free body weight
    goal = goal_body.value / 100; // Goal body percentage
    formula = Math.floor(lean_mass / (1 - goal)); // Body weight with six pack
    reduce_fat = weight.value - formula; // Amount of fat to lose
    let gramsPerWeek = grams.value / 1000; // Grams converted to kilograms
    Duration = Math.floor(reduce_fat / gramsPerWeek) + " weeks"; // Duration of time
}

// Display the report
function showReport() {
    form1.innerHTML = ''; // Clear previous report details

    // Create a container for the report labels
    let labelContainer = document.createElement('div');
    labelContainer.style.textAlign = 'left'; // Align the labels to the left for better readability

    // Add the labels with different styles
    labelContainer.innerHTML = `
        <label style="font-weight: bold; color: #333;">The Current Fat is:</label>
        <label style="color: #ff4500; font-size: 16px;">${weight.value} kg</label><br>

        <label style="font-weight: bold; color: #333;">Your Current Situation is:</label>
        <label style="color: #ff6347; font-size: 16px;">${Situation.value} %</label><br>

        <label style="font-weight: bold; color: #333;">The Lean Fat-Free Body Weight:</label>
        <label style="color: #4caf50; font-size: 16px;">${lean_mass} kg</label><br>

        <label style="font-weight: bold; color: #333;">Your Target Body Value:</label>
        <label style="color: #32cd32; font-size: 16px;">${goal_body.value} %</label><br>

        <label style="font-weight: bold; color: #333;">Body Weight With SIX_PACK:</label>
        <label style="color: #1e90ff; font-size: 16px;">${formula} kg</label><br>

        <label style="font-weight: bold; color: #333;">Amount Of Fat To LOSE:</label>
        <label style="color: #ff6347; font-size: 16px;">${reduce_fat} kg</label><br>

        <label style="font-weight: bold; color: #333;">Your Grams Per Week Reduce:</label>
        <label style="color: #ffa500; font-size: 16px;">${grams.value} g</label><br>

        <label style="font-weight: bold; color: #333;">YOUR TOTAL DURATION TIME FOR DREAM:</label>
        <label style="color: #8a2be2; font-size: 16px;">${Duration}</label><br>
    `;

    // Append the container to form1
    form1.appendChild(labelContainer);
}


// Handle the report button click
report.addEventListener('click', () => {
    // Check if the calculation values exist
    if (!fat || !lean_mass || !formula || !reduce_fat || !Duration) {
        alert("Please ensure all details are entered and the calculations are completed before generating the report!");
        return;
    }

    // Set the report title and display the report container
    document.querySelector("#report-container h2").innerHTML = `<u>The Report of ${name1.value}</u>`;
    reportContainer.style.display = 'block';
    showReport();
});

// Close the form or report containers
document.querySelectorAll('.close-btn').forEach(button => {
    button.addEventListener('click', () => {
        formContainer.style.display = 'none';
        reportContainer.style.display = 'none';
    });
});
