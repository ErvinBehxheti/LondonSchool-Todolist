// ===========================
// 1) ZGJEDHIM ELEMENTET NGA DOM
// ===========================
const inputField = document.querySelector("#inputField");  // fusha ku shkruajmë todo-n
const form       = document.querySelector("#myForm");     // forma për shtim todos
const ul         = document.querySelector("#myList");     // lista ku shfaqen todo-t

// ===========================
// 2) PËRGATITJA E VARIABLAVE
// ===========================
let inputValue;  
const storedValue = JSON.parse(localStorage.getItem("inputValue")) || []; // lexojmë nga storage
const todosArray  = [...storedValue];                                    // array me todo-t

// ===========================
// 3) FUNKSIONET CR(U)D
// ===========================

// 3.1) Lexon todo-t nga localStorage
function getStoredTodos() {
  return JSON.parse(localStorage.getItem("inputValue")) || [];
}

// 3.2) Ruaj array-n e todo-ve në localStorage
function saveTodos(todos) {
  localStorage.setItem("inputValue", JSON.stringify(todos));
}

// 3.3) Krijon dhe kthen një <li> me tekst + butonat Delete/Edit
function createTodoElement(text) {
  const li = document.createElement("li");
  li.className   = "list-item";
  li.textContent = text;

  // DELETE
  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.addEventListener("click", () => deleteTodo(text));
  li.appendChild(deleteButton);

  // EDIT
  const editButton = document.createElement("button");
  editButton.textContent = "Edit";
  editButton.addEventListener("click", () => startEdit(text));
  li.appendChild(editButton);

  return li;
}

// 3.4) Shton një todo të re në array + storage + rifreskon pamjen
function addTodo(text) {
  todosArray.push(text);
  saveTodos(todosArray);
  renderTodos();
}

// 3.5) Fshin një todo nga array + storage + rifreskon pamjen
function deleteTodo(text) {
  const idx = todosArray.indexOf(text);
  if (idx > -1) {
    todosArray.splice(idx, 1);
    saveTodos(todosArray);
    renderTodos();
  }
}

// 3.6) Nis modin e editimit: vendos vlerën në input + fshi e mëparshmen
function startEdit(text) {
  inputField.value = text;
  deleteTodo(text);
}

// 3.7) Rifreskon listën në DOM: e ’pastron’ <ul> dhe shton çdo todo
function renderTodos() {
  ul.innerHTML = "";                // pastron listën
  todosArray.forEach(todoText => {
    const li = createTodoElement(todoText);
    ul.appendChild(li);
  });
}

// ===========================
// 4) NGJARJET (“input” + “submit”)
// ===========================
inputField.addEventListener("input", event => {
  inputValue = event.target.value;  // ruaj çdo tip në inputValue
});

form.addEventListener("submit", event => {
  event.preventDefault();
  if (inputValue && inputValue.trim()) {
    addTodo(inputValue.trim());     // shto todo-n
  }
  inputField.value = "";            // pastron fushën vizualisht
});

// ===========================
// 5) INICIALIZIMI I APLIKACIONIT
// ===========================
function init() {
  const saved = getStoredTodos();
  todosArray.splice(0, todosArray.length, ...saved); // rivendos array-n
  renderTodos();
}
init();
