// ===========================
// 1) ZGJEDHIM ELEMENTET NGA DOM
// ===========================
const inputField = document.querySelector("#inputField"); // fusha e tekstit
const form = document.querySelector("#myForm"); // forma për shtim todos
const ul = document.querySelector("#myList"); // lista ku shfaqen todo-t

// ===========================
// FUNKSIONET
// ===========================
function editTodo(index, value, li) {
  const editButton = document.createElement("button");
  editButton.textContent = "Edit";
  editButton.addEventListener("click", function () {
    inputField.value = value; // vendos vlerën në input
    li.remove(); // hiq nga DOM
    todosArray.splice(index, 1); // fshi nga array
    localStorage.setItem(
      // rifresko localStorage
      "inputValue",
      JSON.stringify(todosArray)
    );
  });
  li.appendChild(editButton);
}

function deleteTodo(index, li) {
  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.addEventListener("click", function () {
    li.remove(); // hiq nga DOM
    todosArray.splice(index, 1); // fshi nga array
    localStorage.setItem(
      // rifresko localStorage
      "inputValue",
      JSON.stringify(todosArray)
    );
  });
  li.appendChild(deleteButton);
}

function createLi(value) {
  const li = document.createElement("li");
  li.className = "list-item";
  li.textContent = value;
  return li;
}

// ===========================
// 2) PËRGATITJA E VARIABLAVE
// ===========================
let inputValue;
// Lexojmë todo-t e ruajtura në localStorage, ose marrim array bosh
const storedValue = JSON.parse(localStorage.getItem("inputValue")) || [];
// Kopjojmë vlerat për t’i punuar në kod
const todosArray = [...storedValue];

// ===========================
// 3) NGJARJA “input”
// Ruaj çdo ndryshim që bën përdoruesi në inputField
// ===========================
inputField.addEventListener("input", function (event) {
  inputValue = event.target.value;
});

// ===========================
// 4) NGJARJA “submit”
// Kur përdoruesi shtyp “Submit”, krijojmë një todo të re
// ===========================
form.addEventListener("submit", function (event) {
  event.preventDefault(); // parandalojmë rifreskimin e faqes
  inputField.value = ""; // pastron input-in në pamje mbas shtimit të todo-s
  // 4.1) Krijojmë elementin <li> me tekstin e todo-së
  const li = createLi(inputValue);
  const idx = todosArray.indexOf(inputValue);
  // 4.2) Krijojmë butonin DELETE
  deleteTodo(idx, li);
  // 4.3) Krijojme butonin EDIT
  editTodo(idx, inputValue, li);
  // 4.4) Shtojmë <li> në <ul>
  ul.appendChild(li);
  // 4.5) Ruajmë todo-n e re në array & localStorage
  todosArray.push(inputValue);
  localStorage.setItem("inputValue", JSON.stringify(todosArray));
});

// ===========================
// 5) DEBUG: Shfaqim në console array-n e ruajtur
// ===========================
console.log(storedValue);

// ===========================
// 6) INICIALIZIMI I LISTËS
// Kur ngarkohet faqja, shfaqim todo-t ekzistuese
// ===========================
for (let i = 0; i < storedValue.length; i++) {
  // 6.1) Krijojmë <li> për todo-n ekzistuese
  const li = createLi(storedValue[i]);
  // 6.2) Krijojmë butonin DELETE për secilin item
  deleteTodo(i, li);
  // 6.3) Krijojmë butonin EDIT për secilin item
  editTodo(i, storedValue[i], li);
  // 6.4) Shtojmë <li> me buton në <ul>
  ul.appendChild(li);
}
