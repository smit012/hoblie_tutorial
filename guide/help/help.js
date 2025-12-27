const helpOverlay = document.getElementById("helpOverlay");
const helpContent = document.querySelector(".help-content");
const helpTitle = document.querySelector(".help-header h2");

let helpStack = [];

/* OPEN HELP */
function openHelp() {
  const kitHelp = helpConfig[kitKey] || [];
  helpStack = [];
  renderList(kitHelp, "Help");
  helpOverlay.style.display = "block";
}

/* CLOSE HELP */
function closeHelp() {
  helpOverlay.style.display = "none";
}

/* BACK */
function goBack() {
  helpStack.pop();
  const prev = helpStack[helpStack.length - 1];

  if (!prev) {
    closeHelp();
    return;
  }

  renderList(prev.items, prev.title, false);
}

/* RENDER LIST */
function renderList(items, title, push = true) {
  if (push) helpStack.push({ items, title });

  helpTitle.innerText = title;
  helpContent.innerHTML = "";

  items.forEach(item => {
    const row = document.createElement("div");
    row.className = "help-item";

    const text = document.createElement("span");
    text.innerText = item.title;
    row.appendChild(text);

    if (item.children) {
      const arrow = document.createElement("span");
      arrow.className = "help-arrow";
      arrow.innerText = "▶";
      row.appendChild(arrow);
    }

    row.onclick = () => {
      if (item.children) {
        renderList(item.children, item.title);
        return;
      }

      if (item.content) {
        toggleInlineAnswer(row, item.content);
      }
    };

    helpContent.appendChild(row);
  });
}

/* INLINE ANSWER */
function toggleInlineAnswer(row, content) {
  // If already open → close
  if (row.classList.contains("open")) {
    row.classList.remove("open");
    row.nextSibling?.classList?.contains("help-inline-answer") &&
      row.nextSibling.remove();
    return;
  }

  // Close other open answers
  document.querySelectorAll(".help-item.open").forEach(item => {
    item.classList.remove("open");
    item.nextSibling?.classList?.contains("help-inline-answer") &&
      item.nextSibling.remove();
  });

  row.classList.add("open");

  // Create answer box
  const box = document.createElement("div");
  box.className = "help-inline-answer";

  // Close button
  const close = document.createElement("span");
  close.className = "help-answer-close";
  close.onclick = () => {
    row.classList.remove("open");
    box.remove();
  };
  box.appendChild(close);

  // Text
  if (content.text) {
    const p = document.createElement("p");
    p.innerText = content.text;
    box.appendChild(p);
  }

  // Video
  if (content.video) {
    const iframe = document.createElement("iframe");
    iframe.src = content.video;
    iframe.allow = "autoplay; fullscreen";
    iframe.allowFullscreen = true;
    box.appendChild(iframe);
  }

  // 👇 THIS IS THE KEY FIX
  row.after(box);
}

/* EVENTS */
document.querySelector(".help-close").onclick = closeHelp;
document.querySelector(".help-back").onclick = goBack;

window.openHelp = openHelp;
