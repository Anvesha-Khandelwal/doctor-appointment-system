// Temporary dummy data until backend is ready
// ----------------------
// Dummy doctors data
// ----------------------
const dummyDoctors = {
    "Cardiologist": [
        { id: 1, name: "Dr. Rakesh Sharma", experience: "12 years", hospital: "Apollo Hospital" },
        { id: 2, name: "Dr. Meera Nair", experience: "8 years", hospital: "Fortis Hospital" }
    ],
    "Dermatologist": [
        { id: 3, name: "Dr. Ananya Patel", experience: "5 years", hospital: "SkinCare Clinic" },
        { id: 4, name: "Dr. Karan Singh", experience: "10 years", hospital: "Glow Hospital" }
    ],
    "Orthopedic": [
        { id: 5, name: "Dr. Ritu Malhotra", experience: "7 years", hospital: "OrthoCare Centre" },
        { id: 6, name: "Dr. Arvind Gupta", experience: "15 years", hospital: "AIIMS Delhi" }
    ]
};

// ----------------------
// 1️⃣ For index.html
// ----------------------
function searchDoctors() {
    const specialization = document.getElementById('specialization').value;
    if (!specialization) {
        alert('Please select a specialization');
        return;
    }

    // Go to doctors page with specialization
    window.location.href = `doctors.html?specialization=${encodeURIComponent(specialization)}`;
}

// ----------------------
// 2️⃣ For doctors.html
// ----------------------
function loadDoctors() {
    const params = new URLSearchParams(window.location.search);
    const specialization = params.get("specialization");
    if (!specialization) return;

    const doctorListDiv = document.getElementById("doctor-list");
    const doctors = dummyDoctors[specialization] || [];

    if (doctors.length === 0) {
        doctorListDiv.innerHTML = `<p>No doctors found for ${specialization}</p>`;
        return;
    }

    doctorListDiv.innerHTML = `<h3>${specialization} Specialists:</h3>`;
    doctors.forEach(doc => {
        doctorListDiv.innerHTML += `
            <div class="doctor-card">
                <h4>${doc.name}</h4>
                <p>${doc.experience}</p>
                <p>${doc.hospital}</p>
                <button onclick="bookDoctor(${doc.id}, '${doc.name}')">Book Appointment</button>
            </div>
        `;
    });
}

// This runs when you click “Book Appointment”
function bookDoctor(id, name) {
    // Go to appointment page with doctor details
    window.location.href = `appointment.html?doctorId=${id}&doctorName=${encodeURIComponent(name)}`;
}

// ----------------------
// 3️⃣ For appointment.html (slot display)
// ----------------------
function generateSlots() {
    const params = new URLSearchParams(window.location.search);
    const doctorName = params.get("doctorName") || "Selected Doctor";

    document.querySelector("h2").innerText = `Available Slots for ${doctorName}`;
    const slotsDiv = document.getElementById("slots");
    slotsDiv.innerHTML = "";

    let start = 10; // 10 AM
    const bookedSlots = ["11:00 AM - 11:30 AM", "2:00 PM - 2:30 PM", "4:30 PM - 5:00 PM"]; // dummy booked

    while (start < 18) { // till 6 PM
        let end = start + 0.5;
        let slot = `${formatTime(start)} - ${formatTime(end)}`;
        const isBooked = bookedSlots.includes(slot);

        slotsDiv.innerHTML += `
            <div class="slot ${isBooked ? 'booked' : 'available'}">
                <p>${slot}</p>
                ${isBooked
                    ? '<button disabled>Booked</button>'
                    : `<button onclick="confirmSlot('${slot}')">Book</button>`}
            </div>
        `;
        start += 0.5;
    }
}

function formatTime(time) {
    const hour = Math.floor(time);
    const minute = (time % 1) ? "30" : "00";
    const suffix = hour >= 12 ? "PM" : "AM";
    const adjusted = hour > 12 ? hour - 12 : hour;
    return `${adjusted}:${minute} ${suffix}`;
}

function confirmSlot(slot) {
    alert(`Slot ${slot} booked successfully (dummy only for now).`);
}

// ----------------------
// 4️⃣ For cancel.html
// ----------------------
function cancelAppointment(event) {
    event.preventDefault();
    const id = document.getElementById('appointmentId').value;
    document.getElementById('cancelMsg').innerText =
        `Appointment ${id} cancelled successfully (mock for now).`;
}

// ----------------------
// Auto-load for pages
// ----------------------
if (window.location.pathname.endsWith("doctors.html")) {
    window.onload = loadDoctors;
} else if (window.location.pathname.endsWith("appointment.html")) {
    window.onload = generateSlots;
}
