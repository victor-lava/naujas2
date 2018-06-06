document.querySelector("#form-submit").addEventListener("click", addRow);
refreshEventListener();

function refreshEventListener() {
  document.querySelectorAll(".material-icons").forEach(function(button) {
    button.removeEventListener("click", deleteRow);
    button.addEventListener("click", deleteRow);
  })
}

function deleteRow(event) {
  var deleteBtn = event.target.parentNode;
  var td = deleteBtn.parentNode;
  var tr = td.parentNode;
  var table = tr.parentNode;
  table.removeChild(tr);
  // btn.parentNode.parentNode.parentNode.removeChild(btn.parentNode.parentNode);
}

function addRow(event) {
  event.preventDefault();
  var category = document.querySelector('input[name="category"]:checked').value;
  var title = document.getElementById('title');
  var description = document.getElementById('description');
  var amount = document.getElementById('amount');
  if (title.value == "") {
    title.focus();
    return
  }
  if (description.value == "") {
    description.focus();
    return
  }
  if (amount.value == "") {
    amount.focus();
    return
  }
  var titleTd = '<td>' + title.value + '</td>';
  var descriptionTd = '<td>' + description.value + '</td>';
  var amountTd = '<td>' + amount.value + '</td>';
  var newRow = '<tr>' + titleTd + descriptionTd + amountTd + '<td><button class="delete-btn" value="Delete Row"><i class="material-icons">delete_forever</i></button></td>' + '</tr>';
  var tbody = document.querySelector('tbody');
  if (category == "Vegetable") {
    tbody.innerHTML = tbody.innerHTML + newRow;
  } else {
    for (var i = 0; i < tbody.childNodes.length; i++) {
      if (tbody.childNodes[i].id == 'vegetables') {
        var vegetableTr = tbody.childNodes[i];
        vegetableTr.outerHTML = newRow + vegetableTr.outerHTML;
        break;
      }
    }
  }
  refreshEventListener();
  title.value = "";
  description.value = "";
  amount.value = "";
}
