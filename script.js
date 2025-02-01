const API_URL = "https://script.google.com/macros/s/AKfycbwza5O-ULw9eL-3swupw-F9yZ13WECEUIiOtGjR5-dRuY-4qJln_dOCap5sZT727foJ/exec";

// Function to verify certificate
async function verifyCertificate() {
    let certNumber = document.getElementById("certNumber").value.trim();
    if (!certNumber) {
        alert("Please enter a certificate number.");
        return;
    }

    let response = await fetch(API_URL);
    let certificates = await response.json();

    let certificate = certificates.find(cert => cert.CertificateNumber === certNumber);

    if (certificate) {
        document.getElementById("result").innerHTML = `
            <h3 class="success">Certificate Found</h3>
            <p><strong>Author Name:</strong> ${certificate.AuthorName}</p>
            <p><strong>Affiliation:</strong> ${certificate.Affiliation}</p>
            <p><strong>ORCiD ID:</strong> ${certificate.ORCiD}</p>
            <p><strong>Paper Title:</strong> ${certificate.PaperTitle}</p>
            <p><strong>DOI:</strong> <a href="https://doi.org/${certificate.DOI}" target="_blank">${certificate.DOI}</a></p>
            <p><strong>Journal Volume:</strong> ${certificate.Volume}</p>
            <p><strong>Number:</strong> ${certificate.Issue}</p>
            <p><strong>Year:</strong> ${certificate.Year}</p>
            <p><strong>Edition Name:</strong> ${certificate.Edition}</p>
            <p><strong>Co-Author(s):</strong> ${certificate.CoAuthors}</p>
            <p><strong>Entry By:</strong> ${certificate.EntryBy}</p>
        `;
    } else {
        document.getElementById("result").innerHTML = `<p class="error">Certificate not found.</p>`;
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
