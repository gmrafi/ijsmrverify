const API_URL = "https://script.google.com/macros/s/AKfycbwptls7YB-AchiSIhjFgyony60xT3T8SKKG4JeYKDstzVxJuDr5yu_WUkOPSFDsqKk/exec";

// Function to verify certificate
async function verifyCertificate() {
    const certNumber = document.getElementById('certNumber').value;
    const resultDiv = document.getElementById('result');

    try {
        console.log(`Fetching data from: ${API_URL}?certNumber=${certNumber}`);
        const response = await fetch(`${API_URL}?certNumber=${certNumber}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log('Response data:', data);

        if (data.status === 'success') {
            resultDiv.innerHTML = `
                <p class="text-green-500">Certificate is valid.</p>
                <p><strong>Author Name:</strong> ${data.authorName}</p>
                <p><strong>Affiliation/Institution:</strong> ${data.affiliation}</p>
                <p><strong>ORCiD ID:</strong> ${data.orcid}</p>
                <p><strong>Publication Name:</strong> ${data.publicationName}</p>
                <p><strong>DOI Number:</strong> <a href="${data.doi}" class="text-blue-500">${data.doi}</a></p>
                <p><strong>Journal Volume:</strong> ${data.journalVolume}</p>
                <p><strong>Journal Number:</strong> ${data.journalNumber}</p>
                <p><strong>Year:</strong> ${data.year}</p>
                <p><strong>Edition Name:</strong> ${data.editionName}</p>
                <p><strong>Co-Author(s) Name:</strong> ${data.coAuthors}</p>
                <p><strong>Entry By:</strong> ${data.entryBy}</p>
            `;
        } else {
            resultDiv.innerHTML = `<p class="text-red-500">Certificate not found.</p>`;
        }
    } catch (error) {
        console.error('Error:', error);
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
