document.addEventListener('DOMContentLoaded', () => {
  const STORAGE_KEY = 'sharedGalleryImages';

  const uploadForm = document.getElementById('uploadForm');
  const toggleBtn = document.getElementById('toggleUploadBtn');
  const userList = document.getElementById('userList');

  let uploads = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

  toggleBtn.addEventListener('click', () => {
    uploadForm.style.display = uploadForm.style.display === 'none' ? 'block' : 'none';
  });

  function render() {
    userList.innerHTML = '';

    if (uploads.length === 0) {
      userList.innerHTML = '<p>No uploads yet.</p>';
      return;
    }

    uploads.forEach((user, index) => {
      const card = document.createElement('div');
      card.className = 'user-card';

      const img = document.createElement('img');
      img.src = user.image;
      img.alt = user.name;

      const name = document.createElement('input');
      name.type = 'text';
      name.value = user.name;
      name.className = 'editable-name';
      name.onchange = () => {
        uploads[index].name = name.value;
        save();
        render();
      };

      const deleteBtn = document.createElement('button');
      deleteBtn.textContent = 'Delete';
      deleteBtn.onclick = () => {
        uploads.splice(index, 1);
        save();
        render();
      };

      card.appendChild(img);
      card.appendChild(name);
      card.appendChild(deleteBtn);

      userList.appendChild(card);
    });
  }

  function save() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(uploads));
  }

  uploadForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value.trim();
    const imageFile = document.getElementById('userImage').files[0];

    if (!username || !imageFile) return;

    const reader = new FileReader();
    reader.onload = () => {
      uploads.push({ name: username, image: reader.result });
      save();
      render();
      uploadForm.reset();
      uploadForm.style.display = 'none';
    };

    reader.readAsDataURL(imageFile);
  });

  render();
});
