$(document).ready(function() {
    var url = "http://192.168.1.66:8080/web/list-books";
    access(url);
});

function onClickRow(x) {

    var id = x.cells[0].innerHTML;
    alert(id);
    // $('#myModal').modal('toggle');
    // $('#myModal').modal('show');
    // $('#myModal').modal('hide');


    var borurl = "http://192.168.1.66:8080/web/borrow-book";
    var data = { bookID: id, quantity: 1 };

    $post(borurl, data, JSON);



}

function access(url) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4) {
            if (this.status == 200) {
                var obj = JSON.parse(this.responseText);
                for (var i = 0; i < obj.listBooks.length; i++) {
                    var r = document.createElement("tr");
                    r.setAttribute("class", "clickable-row");
                    r.setAttribute("onClick", "onClickRow(this)");
                    var c0 = document.createElement("td");
                    var c1 = document.createElement("td");
                    var c2 = document.createElement("td");
                    var c3 = document.createElement("td");
                    c0.innerHTML = obj.listBooks[i].bookID;
                    c1.innerHTML = obj.listBooks[i].bookName;
                    c2.innerHTML = obj.listBooks[i].bookAuthor;
                    c3.innerHTML = obj.listBooks[i].bookQuantity;
                    r.appendChild(c0);
                    r.appendChild(c1);
                    r.appendChild(c2);
                    r.appendChild(c3);
                    document.querySelector("#tbl1 tbody").appendChild(r);
                }
                // document.getElementById("books").innerHTML = obj.listBooks[1].bookName;
            }
        }
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send(null);
}