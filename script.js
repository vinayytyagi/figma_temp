document.addEventListener('DOMContentLoaded', () => {
    const rows = [
        { name: 'Ann Culhane', description: 'Lorem ipsum dolor sit amet, <br> consectetur adipiscing elit. Nulla...', status: 'Open', rate: '$70.00', balance: '-$270.00', deposit: '$500.00' },
        { name: 'Ahmad Rosser', description: 'Lorem ipsum dolor sit amet, <br> consectetur adipiscing elit. Nulla...', status: 'Paid', rate: '$70.00', balance: '$270.00', deposit: '$500.00' },
        { name: 'Zain Cattzari', description: 'Lorem ipsum dolor sit amet, <br> consectetur adipiscing elit. Nulla...', status: 'Open', rate: '$70.00', balance: '-20.00', deposit: '$500.00' },
        { name: 'Leo Stanton', description: 'Lorem ipsum dolor sit amet, <br> consectetur adipiscing elit. Nulla...', status: 'Inactive', rate: '$70.00', balance: '$600.00', deposit: '$500.00' },
        { name: 'Kaiya Vetrovs', description: 'Lorem ipsum dolor sit amet, <br> consectetur adipiscing elit. Nulla...', status: 'Open', rate: '$70.00', balance: '-$350.00', deposit: '$500.00' },
        { name: 'Ryan Westervelt', description: 'Lorem ipsum dolor sit amet, <br> consectetur adipiscing elit. Nulla...', status: 'Paid', rate: '$70.00', balance: '-$270.00', deposit: '$500.00' },
        { name: 'Corey Stanton', description: 'Lorem ipsum dolor sit amet, <br> consectetur adipiscing elit. Nulla...', status: 'Due', rate: '$70.00', balance: '$30.00', deposit: '$500.00' },
        { name: 'Adison Aminoff', description: 'Lorem ipsum dolor sit amet, <br> consectetur adipiscing elit. Nulla...', status: 'Open', rate: '$70.00', balance: '-$270.00', deposit: '$500.00' },
        { name: 'Alfredo Aminoff', description: 'Lorem ipsum dolor sit amet, <br> consectetur adipiscing elit. Nulla...', status: 'Inactive', rate: '$70.00', balance: '$460.00', deposit: '$500.00' }
    ];
    let currentPage = 1;
    let rowsPerPage = 10;

    const tableBody = document.getElementById('table-body');
    const pageInfo = document.getElementById('page-info');
    const currentPageInfo = document.getElementById('current-page');
    const rowsPerPageSelect = document.getElementById('rows-per-page-select');
    const prevPageBtn = document.getElementById('prev-page-btn');
    const nextPageBtn = document.getElementById('next-page-btn');
    const searchInput = document.getElementById('search');
    const addCustomerBtn = document.getElementById('add-customer-btn');
    const modal = document.getElementById('modal');
    const closeButton = document.querySelector('.close-button');
    const customerForm = document.getElementById('customer-form');
    const selectAllCheckbox = document.getElementById('select-all');
    const actionsPopup = document.getElementById('actions-popup');
    const viewBtn = document.getElementById('view-btn');
    const editBtn = document.getElementById('edit-btn');
    const deleteBtn = document.getElementById('delete-btn');

    function handleSearch() {
        const query = searchInput.value.trim().toLowerCase();
        const filteredRows = rows.filter(row =>
            row.name.toLowerCase().includes(query) ||
            row.description.toLowerCase().includes(query) ||
            row.status.toLowerCase().includes(query) ||
            row.rate.toLowerCase().includes(query) ||
            row.balance.toLowerCase().includes(query) ||
            row.deposit.toLowerCase().includes(query)
        );
        currentPage = 1; // Reset to first page after search
        renderTable(filteredRows);
    }

    searchInput.addEventListener('input', handleSearch);


    function renderTable(filteredRows = null) {
        const rowsToRender = filteredRows || rows;
        tableBody.innerHTML = '';
        const startIndex = (currentPage - 1) * rowsPerPage;
        const endIndex = Math.min(startIndex + rowsPerPage, rowsToRender.length);
        for (let i = startIndex; i < endIndex; i++) {
            const row = rowsToRender[i];
            const tr = document.createElement('tr');
            tr.innerHTML = `
          
            <td><input type="checkbox" class="select-row"></td>
            <td style="font-size: 14px; font-weight: 500;">${i + 1}</td> 
            <td style="font-size: 14px; color:#171C26; font-weight: 500;">${row.name}<br><span style="color: #687182; font-size: 12px; font-weight: 100px;">5684236526</span></td>
            <td class="description">${row.description}</td>
            <td class="status ${row.status.toLowerCase()}">${row.status}</td>
            <td class="rate-bal-dep-col-up">${row.rate}<br><span class="rate-bal-dep-col-down">CAD</span></td>
            <td class="balance-col ${row.balance.startsWith('-') ? 'negative-balance' : 'positive-balance'}">${row.balance}<br><span class="rate-bal-dep-col-down"">CAD</span></td >
            <td class="rate-bal-dep-col-up">${row.deposit}<br><span class="rate-bal-dep-col-down"">CAD</span></td>
            <td class="actions-cell"><span class="actions-dots">⋮</span></td>
            `;
            //   tableBody.appendChild(tr);
            
            // <td class="rate-bal-dep-col-up">${row.balance}<br><span class="rate-bal-dep-col-down"">CAD</span></td>

            tr.style.height = '64px'; // Set row height to 30px

            // Add event listener to toggle checkbox when the row is clicked
            tr.addEventListener('click', (event) => {
                const checkbox = tr.querySelector('.select-row');
                if (event.target !== checkbox) {
                    checkbox.checked = !checkbox.checked;
                    tr.classList.toggle('selected-row'); // Toggle selected row class
                }
            });

            tableBody.appendChild(tr);
        }

        updateFooter(rowsToRender.length);
        addActionListeners();
    }

    function updateFooter() {
        const totalRows = rows.length;
        const totalPages = Math.ceil(totalRows / rowsPerPage);
        const startRow = (currentPage - 1) * rowsPerPage + 1;
        const endRow = Math.min(startRow + rowsPerPage - 1, totalRows);

        pageInfo.textContent = `${startRow}-${endRow} of ${totalRows}`;
        currentPageInfo.textContent = `${currentPage}/${totalPages}`;

        prevPageBtn.disabled = currentPage === 1;
        nextPageBtn.disabled = currentPage === totalPages;
    }

    function addActionListeners() {
        const selectRowCheckboxes = document.querySelectorAll('.select-row');
        const actionsDots = document.querySelectorAll('.actions-dots');

        actionsDots.forEach((dots, index) => {
            dots.addEventListener('click', (event) => {
                const rect = event.target.getBoundingClientRect();
                actionsPopup.style.top = `${rect.bottom + window.scrollY}px`;
                actionsPopup.style.left = `${rect.left + window.scrollX}px`;
                actionsPopup.classList.remove('hidden');
                actionsPopup.dataset.rowIndex = index;
            });
        });

        document.addEventListener('click', (event) => {
            if (!event.target.classList.contains('actions-dots')) {
                actionsPopup.classList.add('hidden');
            }
        });

        viewBtn.addEventListener('click', () => {
            const rowIndex = actionsPopup.dataset.rowIndex;
            alert(`Viewing row ${parseInt(rowIndex) + 1}`);
        });

        editBtn.addEventListener('click', () => {
            const rowIndex = actionsPopup.dataset.rowIndex;
            alert(`Editing row ${parseInt(rowIndex) + 1}`);
        });

        deleteBtn.addEventListener('click', () => {
            const rowIndex = actionsPopup.dataset.rowIndex;
            rows.splice((currentPage - 1) * rowsPerPage + parseInt(rowIndex), 1);
            renderTable();
        });
    }

    rowsPerPageSelect.addEventListener('change', () => {
        rowsPerPage = parseInt(rowsPerPageSelect.value, 10);
        currentPage = 1;
        renderTable();
    });

    prevPageBtn.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            renderTable();
        }
    });

    nextPageBtn.addEventListener('click', () => {
        const totalPages = Math.ceil(rows.length / rowsPerPage);
        if (currentPage < totalPages) {
            currentPage++;
            renderTable();
        }
    });

    searchInput.addEventListener('input', () => {
        const query = searchInput.value.toLowerCase();
        const filteredRows = rows.filter(row =>
            row.name.toLowerCase().includes(query) ||
            row.description.toLowerCase().includes(query) ||
            row.status.toLowerCase().includes(query) ||
            row.rate.toLowerCase().includes(query) ||
            row.balance.toLowerCase().includes(query) ||
            row.deposit.toLowerCase().includes(query)
        );
        tableBody.innerHTML = '';
        filteredRows.forEach(row => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                  <td><input type="checkbox" class="select-row"></td>
                  <td>${row.name}</td>
                  <td>${row.description}</td>
                  <td>${row.status}</td>
                  <td>${row.rate}</td>
                  <td>${row.balance}</td>
                  <td>${row.deposit}</td>
                  <td class="actions-cell"><span class="actions-dots">⋮</span></td>
              `;
            tableBody.appendChild(tr);
        });
        addActionListeners();
    });

    addCustomerBtn.addEventListener('click', () => {
        modal.style.display = 'block';
    });

    closeButton.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', event => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });

    customerForm.addEventListener('submit', event => {
        event.preventDefault();
        const newRow = {
            name: customerForm.name.value,
            description: customerForm.description.value,
            status: customerForm.status.value,
            rate: customerForm.rate.value,
            balance: customerForm.balance.value,
            deposit: customerForm.deposit.value
        };
        rows.push(newRow);
        renderTable();
        modal.style.display = 'none';
    });

    selectAllCheckbox.addEventListener('change', () => {
        const checkboxes = document.querySelectorAll('.select-row');
        checkboxes.forEach(checkbox => {
            checkbox.checked = selectAllCheckbox.checked;
        });
    });

    renderTable();
});
