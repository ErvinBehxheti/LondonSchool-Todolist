// ===========================
// 1) ZGJEDHIM ELEMENTET NGA DOM
// ===========================
const inputField = document.querySelector("#inputField");  // fusha ku shkruajmë todo-n
const form       = document.querySelector("#myForm");     // forma që përmban input + buton
const ul         = document.querySelector("#myList");     // lista ku shfaqen todo-t

// ===========================
// 2) PËRGATITJA E VARIABLAVE
// ===========================
let inputValue;  
// Lexojmë listën e todo-ve nga localStorage, ose marrim array bosh
const storedValue = JSON.parse(localStorage.getItem("inputValue")) || [];
// Kopjojmë vlerat për t’i modifikuar
const todosArray  = [...storedValue];

// ===========================
// 3) NGJARJA “input”
// Ruaj çdo ndryshim që bën përdoruesi në inputField
// ===========================
inputField.addEventListener("input", function(event) {
  inputValue = event.target.value;
});

// ===========================
// 4) NGJARJA “submit”
// Kur përdoruesi shtyp “Submit”, krijojmë dhe shfaqim një todo të re
// ===========================
form.addEventListener("submit", function(event) {
  event.preventDefault();         // parandalojmë rifreskimin e faqe-së
  inputField.value = "";          // pastron input-in në pamje

  // 4.1) Krijojmë elementin <li> me tekstin e todo-së
  const li = document.createElement("li");
  li.className   = "list-item";
  li.textContent = inputValue;

  // 4.2) Krijojmë butonin DELETE
  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.addEventListener("click", function() {
    // 1) Hiq elementin nga lista
    li.remove();
    // 2) Gjej indeksin në array dhe fshi
    const idx = todosArray.indexOf(inputValue);
    if (idx > -1) {
      todosArray.splice(idx, 1);
      // 3) Rifresko localStorage
      localStorage.setItem("inputValue", JSON.stringify(todosArray));
    }
  });
  li.appendChild(deleteButton);

  // 4.3) Krijojmë butonin EDIT
  const editButton = document.createElement("button");
  editButton.textContent = "Edit";
  editButton.addEventListener("click", function() {
    // Vendosim tekstin e vjetër në input për editim
    inputField.value = inputValue;
    // Hiqmë elementin nga DOM dhe nga array
    li.remove();
    const idx = todosArray.indexOf(inputValue);
    if (idx > -1) {
      todosArray.splice(idx, 1);
      localStorage.setItem("inputValue", JSON.stringify(todosArray));
    }
  });
  li.appendChild(editButton);

  // 4.4) Shtojmë <li> me butonat në <ul>
  ul.appendChild(li);

  // 4.5) Ruajmë todo-n e re në array dhe në localStorage
  todosArray.push(inputValue);
  localStorage.setItem("inputValue", JSON.stringify(todosArray));
});

// ===========================
// 5) DEBUG: Shfaqim në console array-n e ruajtur
// ===========================
console.log(storedValue);

// ===========================
// 6) INICIALIZIMI I LISTËS
// Në ngarkim faqe, shfaqim todo-t ekzistuese me butonat Delete + Edit
// ===========================
for (let i = 0; i < storedValue.length; i++) {
  // 6.1) Krijojmë elementin <li>
  const li = document.createElement("li");
  li.className   = "list-item";
  li.textContent = storedValue[i];

  // 6.2) Butoni DELETE
  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.addEventListener("click", function() {
    li.remove();               // hiq nga DOM
    todosArray.splice(i, 1);   // fshi nga array
    localStorage.setItem(      // rifresko localStorage
      "inputValue", 
      JSON.stringify(todosArray)
    );
  });
  li.appendChild(deleteButton);

  // 6.3) Butoni EDIT
  const editButton = document.createElement("button");
  editButton.textContent = "Edit";
  editButton.addEventListener("click", function() {
    // Vendosim vlerën në input dhe fshijmë item-in
    inputField.value = storedValue[i];
    li.remove();
    todosArray.splice(i, 1);
    localStorage.setItem(
      "inputValue",
      JSON.stringify(todosArray)
    );
  });
  li.appendChild(editButton);

  // 6.4) Shtojmë <li> në listë
  ul.appendChild(li);
}
