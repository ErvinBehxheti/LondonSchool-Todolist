const data = [
    {
        "name": "Ervin Behxheti",
        "age": 20,
        "WPM": 91,
        "Accuracy": 93 
    },
    {
        "name": "Olti Jusufi",
        "age": 14,
        "WPM": 44,
        "Accuracy": 78 
    },
    {
        "name": "Edonart Ademi",
        "age": 16,
        "WPM": 25,
        "Accuracy": 98 
    },
    {
        "name": "Enes Abdurrahmani",
        "age": 13,
        "WPM": 54,
        "Accuracy": 89 
    },
    {
        "name": "Atik Kadriu",
        "age": 13,
        "WPM": 70,
        "Accuracy": 81 
    },
    {
        "name": "Edison Ahmeti",
        "age": 17,
        "WPM": 66,
        "Accuracy": 90 
    },
        {
        "name": "Ervin Behxheti",
        "age": 20,
        "WPM": 91,
        "Accuracy": 93 
    },
    {
        "name": "Erduan Fejza",
        "age": 17,
        "WPM": 29,
        "Accuracy": 87 
    },
    {
        "name": "Dasara Beqiri",
        "age": 13,
        "WPM": 44,
        "Accuracy": 96
    },
    {
        "name": "Tuana Beqiri",
        "age": 13,
        "WPM": 24,
        "Accuracy": 91 
    },
    {
        "name": "Olsa Bislimi",
        "age": 13,
        "WPM": 45,
        "Accuracy": 89
    },
    {
        "name": "Eris Peci",
        "age": 19,
        "WPM": 53,
        "Accuracy": 95 
    },
    {
        "name": "Eren Nuka",
        "age": 13,
        "WPM": 104,
        "Accuracy": 99 
    },
    {
        "name": "Sahit Pllana",
        "age": 13,
        "WPM": 44,
        "Accuracy": 92 
    },
    {
        "name": "Ari Fazliu",
        "age": 13,
        "WPM": 71,
        "Accuracy": 92
    },
    {
        "name": "Ermal Qela",
        "age": 13,
        "WPM": 29,
        "Accuracy": 89 
    },
    {
        "name": "Gentrit Sylejmani",
        "age": 13,
        "WPM": 34,
        "Accuracy": 97 
    }
]

const tbody = document.querySelector("#tbody")

tbody.innerHTML = data.map(
    (obj, i) => {
        return `
        <tr>
            <td>${obj.name}</td>
            <td>${obj.age}</td>
            <td>${obj.WPM}</td>
            <td>${obj.Accuracy}</td>
            <td>
                <button id="deleteBtn" data-index=${i}>Delete</button>
            </td>
        </tr>
        `
    }
).join('')

const deleteBtn = tbody.querySelectorAll("#deleteBtn")

console.log(deleteBtn)

Array.from(deleteBtn).map(
    (btn) => {
        btn.addEventListener("click", (e) => {
            const index = e.currentTarget.dataset.index

            data.splice(index, 1)
        })
    }
)



