const BASE_URL = 'https://phonebook-15e3b.firebaseio.com/phonebook';
const PHONE = $("#phone");
const PERSON = $("#person");

$('#btn-load').on('click', loadContacts);
$('#btn-create').on('click', createContact);

function loadContacts (){
    $("#phonebook").empty();

    $.ajax({
        method: 'GET',
        url: BASE_URL + '.json'
    })
        .then(displayContacts)
        .catch(displayError);
}

function displayContacts(contacts){
    for (let id in contacts) {
       let person = contacts[id]['name'];
       let phone = contacts[id]['phone'];
       let li = $("<li>");

       li.text(person + ": " + phone + " ");
       $("#phonebook").append(li);

       li.append($("<button>delete</button>").attr('id', 'delete')
            .on('click', deleteContact.bind(this, id)));
    }
}

function deleteContact(id) {

    $.ajax({
        method: 'DELETE',
        url: BASE_URL + '/' + id + '.json'
    })
        .then(loadContacts)
        .catch(displayError);

}

function createContact(){

    if(PERSON.val().trim() !== '' && PHONE.val().trim() !== '') {
        $.ajax({
            method: "POST",
            url: BASE_URL + '.json',
            data: JSON.stringify({name:PERSON.val(), phone:PHONE.val()})
        })
            .then(loadContacts)
            .catch(displayError);
        
        PERSON.val('');
        PHONE.val('');
    }
}

function displayError(err){
    $('#phonebook').append($("<li>Error</li>"));
}
