function filterCards() {
  const input = document.getElementById("searchInput").value.toLowerCase();
  const cards = document.querySelectorAll(".card");

  cards.forEach(card => {
    const title = card.dataset.title.toLowerCase();
    card.style.display = title.includes(input) ? "block" : "none";
  });
}



