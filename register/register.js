// Keep track of how many participants are currently on the form
let participantCount = 1;

// Run when the DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  const addButton = document.getElementById("add");
  const form = document.querySelector("form");
  const summary = document.getElementById("summary");

  // --- Add Participant button functionality ---
  addButton.addEventListener("click", () => {
    participantCount++;
    const newParticipantHTML = participantTemplate(participantCount);

    // Insert the new participant section before the "Add Participant" button
    addButton.insertAdjacentHTML("beforebegin", newParticipantHTML);
  });

  // --- Submit form functionality ---
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const total = totalFees();
    const adultName = document.getElementById("adult_name").value;

    // Hide the form and show the summary
    form.style.display = "none";
    summary.innerHTML = successTemplate({
      name: adultName,
      count: participantCount,
      total: total,
    });
    summary.style.display = "block";
  });
});

// --- Template for new participant section ---
function participantTemplate(count) {
  return `
  <section class="participant${count}">
    <p>Participant ${count}</p>
    <div class="item">
      <label for="fname${count}"> First Name<span>*</span></label>
      <input id="fname${count}" type="text" name="fname${count}" required />
    </div>
    <div class="item activities">
      <label for="activity${count}">Activity #<span>*</span></label>
      <input id="activity${count}" type="text" name="activity${count}" />
    </div>
    <div class="item">
      <label for="fee${count}">Fee ($)<span>*</span></label>
      <input id="fee${count}" type="number" name="fee${count}" />
    </div>
    <div class="item">
      <label for="date${count}">Desired Date <span>*</span></label>
      <input id="date${count}" type="date" name="date${count}" />
    </div>
    <div class="item">
      <p>Grade</p>
      <select id="grade${count}">
        <option selected value="" disabled selected></option>
        ${Array.from({ length: 12 }, (_, i) => `<option value="${i + 1}">${i + 1}th</option>`).join("")}
      </select>
    </div>
  </section>`;
}

// --- Calculate total fees ---
function totalFees() {
  let feeElements = document.querySelectorAll("[id^=fee]");
  feeElements = [...feeElements];

  const total = feeElements.reduce((sum, input) => {
    const value = parseFloat(input.value) || 0;
    return sum + value;
  }, 0);

  return total;
}

// --- Template for success message ---
function successTemplate(info) {
  return `
    <h2>Registration Complete</h2>
    <p>Thank you <strong>${info.name}</strong> for registering.</p>
    <p>You have registered <strong>${info.count}</strong> participant${info.count > 1 ? "s" : ""}.</p>
    <p>Total fees owed: <strong>$${info.total.toFixed(2)}</strong></p>
  `;
}
