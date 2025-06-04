// Username validation logic
document.addEventListener('DOMContentLoaded', function () {
  const usernameInput = document.getElementById('username');
  const validationDiv = document.getElementById('username-validation');
  if (usernameInput && validationDiv) {
    usernameInput.addEventListener('input', function () {
      const value = usernameInput.value;
      // Regex: min 8 chars, 1 uppercase, 1 number, 1 special char
      const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/;
      if (!regex.test(value)) {
        validationDiv.style.display = 'block';
        validationDiv.textContent = 'Username must be at least 8 characters, include 1 uppercase letter, 1 number, and 1 special character.';
        usernameInput.classList.add('is-invalid');
        usernameInput.classList.remove('is-valid');
      } else {
        validationDiv.style.display = 'none';
        validationDiv.textContent = '';
        usernameInput.classList.remove('is-invalid');
        usernameInput.classList.add('is-valid');
      }
    });
  }
});
// Chart.js dynamic bar chart population from Data tab inputs
let chartInstance = null;

function getMonthlyData(type) {
  const months = [
    'january', 'february', 'march', 'april', 'may', 'june',
    'july', 'august', 'september', 'october', 'november', 'december'
  ];
  return months.map(month => {
    const input = document.getElementById(`${month}-${type}`);
    return input ? Number(input.value) || 0 : 0;
  });
}

function renderChart() {
  const chartTab = document.getElementById('chart');
  if (!chartTab) return;

  // Create canvas if not present
  let canvas = document.getElementById('barChart');
  if (!canvas) {
    canvas = document.createElement('canvas');
    canvas.id = 'barChart';
    chartTab.innerHTML = '';
    chartTab.appendChild(canvas);
  }

  const ctx = canvas.getContext('2d');
  const incomeData = getMonthlyData('income');
  const expensesData = getMonthlyData('expenses');

  if (chartInstance) {
    chartInstance.data.datasets[0].data = incomeData;
    chartInstance.data.datasets[1].data = expensesData;
    chartInstance.update();
  } else {
    chartInstance = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: [
          'January', 'February', 'March', 'April', 'May', 'June',
          'July', 'August', 'September', 'October', 'November', 'December'
        ],
        datasets: [
          {
            label: 'Income',
            data: incomeData,
            backgroundColor: 'rgba(54, 162, 235, 0.7)'
          },
          {
            label: 'Expenses',
            data: expensesData,
            backgroundColor: 'rgba(255, 99, 132, 0.7)'
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { position: 'top' },
          title: { display: true, text: 'Monthly Income vs Expenses' }
        }
      }
    });
  }
}

// Listen for tab switch to Chart
document.addEventListener('DOMContentLoaded', function () {
  const chartTabBtn = document.getElementById('chart-tab');
  if (chartTabBtn) {
    chartTabBtn.addEventListener('shown.bs.tab', renderChart);
  }

  // Listen for input changes and update chart if visible
  document.querySelectorAll('input[id$="income"], input[id$="expenses"]').forEach(input => {
    input.addEventListener('input', function () {
      const chartTabPane = document.getElementById('chart');
      if (chartTabPane && chartTabPane.classList.contains('active')) {
        renderChart();
      }
    });
  });

  // Download chart image on button click
  const downloadBtn = document.querySelector('#chart .btn.btn-primary');
  if (downloadBtn) {
    downloadBtn.addEventListener('click', function (e) {
      e.preventDefault();
      const canvas = document.getElementById('barChart');
      if (canvas) {
        const link = document.createElement('a');
        link.href = canvas.toDataURL('image/png');
        link.download = 'bucks2bar-chart.png';
        link.click();
      }
    });
  }
});