const API_URL = "https://script.google.com/macros/s/AKfycbwza5O-ULw9eL-3swupw-F9yZ13WECEUIiOtGjR5-dRuY-4qJln_dOCap5sZT727foJ/exec";

// Function to verify certificate
async function verifyCertificate() {
    const certNumber = document.getElementById('certNumber').value;
    const resultDiv = document.getElementById('result');

    // Replace with your Google Sheets API URL
    const apiUrl = `https://sheets.googleapis.com/v4/spreadsheets/YOUR_SHEET_ID/values/Sheet1?key=YOUR_API_KEY`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        const certificate = data.values.find(row => row[0] === certNumber);

        if (certificate) {
            resultDiv.innerHTML = `<p class="text-green-500">Certificate is valid. DOI: <a href="${certificate[1]}" class="text-blue-500">${certificate[1]}</a></p>`;
        } else {
            resultDiv.innerHTML = `<p class="text-red-500">Certificate not found.</p>`;
        }
    } catch (error) {
        resultDiv.innerHTML = `<p class="text-red-500">Error verifying certificate.</p>`;
    }
}

// Function to add a certificate
async function addCertificate() {
    let data = {
        CertificateNumber: document.getElementById("certNumber").value.trim(),
        AuthorName: document.getElementById("authorName").value.trim(),
        Affiliation: document.getElementById("affiliation").value.trim(),
        ORCiD: document.getElementById("orcid").value.trim(),
        PaperTitle: document.getElementById("paperTitle").value.trim(),
        DOI: document.getElementById("doi").value.trim(),
        Volume: document.getElementById("volume").value.trim(),
        Issue: document.getElementById("issue").value.trim(),
        Year: document.getElementById("year").value.trim(),
        Edition: document.getElementById("edition").value.trim(),
        CoAuthors: document.getElementById("coAuthors").value.trim(),
        EntryBy: document.getElementById("entryBy").value.trim(),
    };

    let response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });

    let result = await response.text();
    document.getElementById("status").textContent = result === "Success" ? "Added successfully!" : "Error!";
}
