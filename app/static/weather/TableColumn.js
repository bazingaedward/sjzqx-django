// 2006-08-21 - Created
// 2006-11-05 - Modified - head and body
// 2017-12-30
function addColumn(tblId, data)
{
	// var tblHeadObj = document.getElementById(tblId).tHead;
	// for (var h=0; h<tblHeadObj.rows.length; h++) {
	// 	var newTH = document.createElement('th');
	// 	tblHeadObj.rows[h].appendChild(newTH);
	// 	newTH.innerHTML = '[th] row:' + h + ', cell: ' + (tblHeadObj.rows[h].cells.length - 1)
	// }

	var tblBodyObj = document.getElementById(tblId).tBodies[0];
	for (var i=0; i<tblBodyObj.rows.length; i++) {
		var newCell = tblBodyObj.rows[i].insertCell(-1);
    if(data[i]) {
      newCell.innerHTML = data[i];
    }else {
      newCell.innerHTML = '无'
    }

	}
}
function deleteColumn(tblId)
{
	var allRows = document.getElementById(tblId).rows;
	for (var i=0; i<allRows.length; i++) {
		if (allRows[i].cells.length > 1) {
			allRows[i].deleteCell(-1);
		}
	}
}
