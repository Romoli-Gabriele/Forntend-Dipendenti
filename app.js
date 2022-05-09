var index = "http://localhost";
var self, next, last, prev, page, json, totalPages, idModifica;

$(document).ready(function () 
{

  $("body").ready(function () 
  {
    prendiDati(index + "?page=0");
  });

  $("body").on('click', '.link', function (e) 
  {
    prendiDati(json['_links'][$(this).attr('id')]['href']);
  });

  $("body").on('click', '.elimina', function (e) 
  {
    var idElimina = $(this).parent("td").data("id");

    var elimina = { "id": idElimina };

    deleteDati(elimina);
  });

  $("body").on('click', '.apri', function (e) 
  {
    $("#modalModifica").modal('show');
    idModifica = $(this).parent("td").data("id");
  });

  $('.modifica').click(function (e) 
  {
    var nome = $("#nameM").val();
    var cognome = $("#lastnameM").val();
    var sesso = $("#genereM:checked").val();
    var dataNascita = $("#birth_dateM").val();
    var dataAssunzione = $("#hire_dateM").val();

    var dipendente =      //Oggetto JS
    {
      "id": idModifica,
      "birth_date": dataNascita,
      "firstName": nome,
      "lastName": cognome,
      "gender": sesso,
      "hire_date": dataAssunzione,
    };

    putDati(dipendente)

    $("#modalModifica").modal('hide');

  });

  $(".aggiungi").click(function (e) 
  {
    var nome = $("#name").val();
    var cognome = $("#lastname").val();
    var sesso = $("#genere:checked").val();
    var dataNascita = $("#birth_date").val();
    var dataAssunzione = $("#hire_date").val();

    var dipendente =              //Oggetto JS
    {
      "birth_date": dataNascita,
      "firstName": nome,
      "lastName": cognome,
      "gender": sesso,
      "hire_date": dataAssunzione,
    };

    $("#exampleModal").modal('hide');

    $("#name").val("");
    $("#lastname").val("");
    $("#genere:checked").val("");
    $("#birth_date").val("");
    $("#hire_date").val("");

    postDati(dipendente);
  });


  function prendiDati(link)   //prende i dati e stampa i dipendeti
  {
    $.get(link, function (data) {
      first = data['_links']['first']['href'];
      self = data['_links']['self']['href'];      //Link self
      last = data['_links']['last']['href'];      //Link last
      page = data['_links']['page']['number'];              //pagina
      totalPages = data['_links']['page']['totalPages'];    //pagine totali  
      json = data;                                //savo data in una variabile
      console.log(data);

      if (page != totalPages - 1)           //controllo se c'è un link next
      {
        next = data['_links']['next']['href'];
      }

      if (page != 0)                       //controllo se c'è un link prev
      {
        prev = data['_links']['prev']['href'];
      }

      page++;

      $("p").html(page);            //stampo il numero della pagina

      disegnaRighe(data['_embedded']['_employees']);   //stampo la tabella
    });
  };

  function postDati(dipendente)               //Metodo per aggiungere i dipendenti
  {
    $.ajax({
      type: "POST",
      url: index,
      data: JSON.stringify(dipendente),
      contentType: "application/json",
      dataType: "json",
      success: function (data) { console.log(prendiDati(data['_links']['last']['href'])); },
      error: function (json) { console.log("errore"); }
    });
  };

  function putDati(dipendente)          //Metodo per aggiornare i dati
  {
    $.ajax({
      type: "PUT",
      url: index,
      data: JSON.stringify(dipendente),
      contentType: "application/json",
      dataType: "json",
      success: function (data) { prendiDati(index + "?page=" + (page - 1)) },
      error: function (data) { console.log("errore"); }
    });
  }

  function deleteDati(elimina) //Metodo per eliminare i dipendenti
  {
    $.ajax({
      type: "DELETE",
      url: index,
      data: JSON.stringify(elimina),
      success: function (data) { prendiDati(index + "?page=" + (page - 1)) },
      error: function (data) { console.log("errore"); }
    });
  }

  function disegnaRighe(data)     //Metodo per stampare i dati
  {
    var riga = "";

    console.log(data);
    console.log(data.length);

    for (var i = 0; i < data.length; i++) 
    {
      riga += "<tr> <th scope='row'>" + data[i][0].id + "</th> " + " <td>" + data[i][0].firstName + "</td> " +
        " <td>" + data[i][0].lastName + "</td> " + " <td>" + data[i][0].birth_date + "</td> " + " <td>" + data[i][0].gender + "</td> " + " <td>" + data[i][0].hire_date + "</td> " +
        " <td data-id = " + data[i][0].id + ">" + " <button type='button' class='btn btn-danger btn-sm px-3 elimina '> Elimina </button> <button type='button' class='btn btn-warning btn-sm px-3 apri'> Modifica </button></td> </tr>";
    }

    $("tbody").html(riga);
  };
});