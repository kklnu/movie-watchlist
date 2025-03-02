document.getElementById('movieForm').addEventListener('submit', async function (e) {
    e.preventDefault();
    const title = document.getElementById('title').value.trim();
    const description = document.getElementById('description').value.trim();
    const watched = document.getElementById('watched').checked;
    const rating = parseInt(document.getElementById('rating').value);

    if (title === '' || description === '' || isNaN(rating) || rating < 1 || rating > 10) {
        document.getElementById('error-message').style.display = 'block';
        return;
    }

    document.getElementById('error-message').style.display = 'none';
    await fetch('/movies', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, description, watched, rating })
    });

    window.location.href = '/';
});


async function deleteMovie(id) {
    await fetch(`/movies/${id}`, { method: 'DELETE' });
    window.location.reload();
}
