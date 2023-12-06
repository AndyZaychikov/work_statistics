////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*             Асинхронная функция для получения JSON и представления информации в табличном виде.                */
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

async function showData(){
	
	let url = "https://jsonplaceholder.typicode.com/users";
	let response = await fetch(url);
  	let json = await response.json();
	
	//Теперь создадим таблицу
	let tr = "";
	for (let i=0; i<json.length; i++){
		tr += "<tr>";
		tr += `<td>${json[i].id}</td>`;
		tr += `<td>${json[i].name}</td>`;
		tr += `<td>${json[i].username}</td>`;
		tr += `<td>${json[i].email}</td>`;
		tr += `<td>${json[i].phone}</td>`;
		tr += `<td>${json[i].website}</td>`;
		tr += "</tr>";
	}
	
	table_info.innerHTML += tr;
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*А теперь напишем функцию для подсвечивания каждой строки и вывода дополнительной информации по каждому человеку */
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
let selectedTr;

function highlight(tr) {
  if (selectedTr) { // убрать существующую подсветку, если есть
    selectedTr.classList.remove('highlight');
  }
  selectedTr = tr;
  selectedTr.classList.add('highlight'); // подсветить новый tr
}

async function moreInfo (id) {
	let url = "https://jsonplaceholder.typicode.com/users/" + id;
	let response = await fetch(url);
  	let json = await response.json();
	
	//Теперь создадим строки
	let tr = "<tr><th>Parametri:</th><th>One location</th><th>Two location</th></tr>";
	
	for (var key in json.address) {
    	tr += `<td>${json.address[key]}</td>`;
	}
	
	table_more_info.innerHTML = tr;
}

table_info.onclick = function(event) {
	

  let tr = event.target.closest('tr'); // (1)

  if (!tr) return; // (2)

  if (!table_info.contains(tr)) return; // (3)

  highlight(tr); // (4)
	
  let id = tr.firstChild.innerHTML;
	
  moreInfo (id);
	
};



////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*													ВЫЗОВ ФУНКЦИЙ						   						  */
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

showData();

