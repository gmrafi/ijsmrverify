const API_URL = "https://script.google.com/macros/s/AKfycby_dp5Uh-pCQI_BDYcjxgZxYG6v6QP5ctMJAnd1IQjAKeL_10feo9HuVi3AzIvypHx0/exec"; // Replace with your Google Apps Script Web App URL

async function verifyCertificate() {
    const certNumber = document.getElementById('certNumber').value;
    const resultDiv = document.getElementById('result');

    try {
        const response = await fetch(`${API_URL}?certNumber=${certNumber}`);
        const data = await response.json();

        if (data.status === 'success') {
            resultDiv.innerHTML = `
                <p class="text-green-500">Certificate is valid.</p>
                <p><strong>Author Name:</strong> ${data.authorName}</p>
                <p><strong>Affiliation/Institution:</strong> ${data.affiliation}</p>
                <p><strong>ORCiD ID:</strong> ${data.orcid}</p>
                <p><strong>Paper/Publication Name:</strong> ${data.publicationName}</p>
                <p><strong>DOI Number:</strong> <a href="${data.doi}" class="text-blue-500">${data.doi}</a></p>
                <p><strong>Journal Volume:</strong> ${data.journalVolume}</p>
                <p><strong>Journal Number:</strong> ${data.journalNumber}</p>
                <p><strong>Year:</strong> ${data.year}</p>
                <p><strong>Edition Name:</strong> ${data.editionName}</p>
                <p><strong>Co-Author(s) Name:</strong> ${data.coAuthors}</p>
                <p><strong>Page Number:</strong> ${data.pageNumber}</p>
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