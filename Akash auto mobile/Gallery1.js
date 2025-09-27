document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('uploadForm_Unique');
  const toggleBtn = document.getElementById('uploadToggleBtn_Unique');
  const userList = document.getElementById('userList_Unique');
  const STORAGE_KEY = 'UserGallery_Uploads'; // Unique key to prevent conflicts

  let uploads = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

  function renderUploads() {
    userList.innerHTML = '';

    if (uploads.length === 0) {
      userList.innerHTML = '<p>No uploads yet.</p>';
      return;
    }

    uploads.forEach((entry, index) => {
      const card = document.createElement('div');
      card.className = 'user-upload-card';

      const img = document.createElement('img');
      img.src = entry.image;
      img.alt = entry.name;

      const name = document.createElement('p');
      name.textContent = entry.name;

      const delBtn = document.createElement('button');
      delBtn.textContent = 'Delete';
      delBtn.onclick = () => {
        uploads.splice(index, 1);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(uploads));
        renderUploads();
      };

      card.appendChild(img);
      card.appendChild(name);
      card.appendChild(delBtn);

      userList.appendChild(card);
    });
  }

  // Toggle form
  toggleBtn.addEventListener('click', () => {
    form.style.display = form.style.display === 'none' ? 'block' : 'none';
  });

  // Handle form submit
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const username = document.getElementById('username_Unique').value.trim();
    const imageFile = document.getElementById('userImage_Unique').files[0];

    if (!username || !imageFile) return;

    const reader = new FileReader();
    reader.onload = () => {
      const newEntry = {
        name: username,
        image: reader.result
      };

      uploads.push(newEntry);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(uploads));
      renderUploads();

      form.reset();
      form.style.display = 'none';
    };

    reader.readAsDataURL(imageFile);
  });

  renderUploads();
});
