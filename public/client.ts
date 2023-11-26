document.addEventListener('DOMContentLoaded', async () => {
  const loadingIndicator = document.getElementById('loadingIndicator');
  const responseContainer = document.getElementById('responseContainer');

  if (loadingIndicator && responseContainer) {
    try {
      const response = await fetch('http://localhost:3000/api/v1');
      const data = await response.json();

      loadingIndicator.style.display = 'none';
      responseContainer.innerHTML = JSON.stringify(data, null, 2);
      responseContainer.style.display = 'block';
    } catch (error) {
      loadingIndicator.innerHTML = 'Error loading data';
      console.error('Error:', error);
    }
  }
});
