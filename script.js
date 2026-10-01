
const studentsData = [
    { id: "MID-2026-001", name: "Seamus Finnigan", course: "Herbology", marks: 95 },
    { id: "MID-2026-002", name: "Harry Potter", course: "Defense Against the Dark Arts", marks: 82 },
    { id: "MID-2026-003", name: "Neville Longbottom", course: "Potions", marks: 88 },
    { id: "MID-2026-004", name: "Draco Malfoy", course: "Defense Against the Dark Arts", marks: 74 },
    { id: "MID-2026-005", name: "Hermione Granger", course: "Potions", marks: 99 },
    { id: "MID-2026-006", name: "Ron Weasley", course: "Herbology", marks: 82 }
];


const tableBody = document.getElementById("student-table-body");
const searchInput = document.getElementById("search-input");
const filterCourse = document.getElementById("filter-course");
const sortSelect = document.getElementById("sort-select");
const statTotal = document.getElementById("stat-total");
const statAverage = document.getElementById("stat-average");
const statTopper = document.getElementById("stat-topper");


function sanitizeHTML(str) {
    const temp = document.createElement('div');
    temp.textContent = str;
    return temp.innerHTML;
}


function renderTable(data) {
    tableBody.innerHTML = "";

    if (data.length === 0) {
        tableBody.innerHTML = `<tr><td colspan="4" style="text-align: center; color: #64748b;">No matching student records found.</td></tr>`;
        return;
    }

    const fragment = document.createDocumentFragment();
    data.forEach(student => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td><code>${sanitizeHTML(student.id)}</code></td>
            <td>${sanitizeHTML(student.name)}</td>
            <td>${sanitizeHTML(student.course)}</td>
            <td><strong>${student.marks}</strong></td>
        `;
        fragment.appendChild(row);
    });

    tableBody.appendChild(fragment);
}

function updateStats(data) {
    const totalStudents = data.length;

    if (totalStudents === 0) {
        statTotal.textContent = 0;
        statAverage.textContent = "0";
        statTopper.textContent = "-";
        return;
    }

    
    const totalMarks = data.reduce((sum, student) => sum + student.marks, 0);
    const averageMarks = (totalMarks / totalStudents).toFixed(1);

   
    const topper = data.reduce((top, student) => (student.marks > top.marks ? student : top), data[0]);

  
    statTotal.textContent = totalStudents;
    statAverage.textContent = averageMarks;
    statTopper.textContent = `${topper.name} (${topper.marks})`;
}


function processAndDisplayStudents() {
    const searchTerm = searchInput.value.toLowerCase().trim();
    const selectedCourse = filterCourse.value;
    const sortValue = sortSelect.value;

    
    let processedData = studentsData.filter(student => {
        const matchesName = student.name.toLowerCase().includes(searchTerm);
        const matchesCourse = selectedCourse === "ALL" || student.course === selectedCourse;
        return matchesName && matchesCourse;
    });

    
    if (sortValue === "name-asc") {
        processedData.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortValue === "name-desc") {
        processedData.sort((a, b) => b.name.localeCompare(a.name));
    } else if (sortValue === "marks-high") {
        processedData.sort((a, b) => b.marks - a.marks);
    } else if (sortValue === "marks-low") {
        processedData.sort((a, b) => a.marks - b.marks);
    }

    
    renderTable(processedData);
    updateStats(processedData);
}


searchInput.addEventListener("input", processAndDisplayStudents);
filterCourse.addEventListener("change", processAndDisplayStudents);
sortSelect.addEventListener("change", processAndDisplayStudents);

processAndDisplayStudents();