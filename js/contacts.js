/**global variables */

let selectedContact = new Contact("", "", "");
let contacts = new ContactList();
let contactDetails = new ContactDetails();

async function loadContactContainer() {
    updateContacts();
    await changeContentHTML("../templates/contacts.html");
    insertContactHTML();
}

function insertContactHTML() {
    let contactListContainer = document.querySelector("[contact-list]");
    let contactDetailsContainer = document.querySelector("[contact-details]");

    contactListContainer.appendChild(contacts);
    contactDetailsContainer.appendChild(contactDetails);
}

async function updateContacts() {
    await contacts.loadFromRemoteStorage();
    contacts.sortContacts();
    contacts.loadContactsToHTML();
}

function addContact(event) {
    event.preventDefault();
    let name = event.target[0].value;
    let phone = event.target[1].value;
    let email = event.target[2].value;

    contacts.addContact(name, email, phone);
    updateContacts();
}

async function openEditContact() {
    await switchModal("../templates/modals/edit_Contact.html", "contact");
    loadIntoModal();
}

function loadIntoModal() {
    let contactData = [
        (contactName = selectedContact.name),
        (contactPhone = selectedContact.phone),
        (contactEmail = selectedContact.email),
    ];
    for (
        let contactDataNum = 0;
        contactDataNum < contactData.length;
        contactDataNum++
    ) {
        const contactValue = contactData[contactDataNum];
        const form = document.querySelector("form");
        form.children[contactDataNum].value = contactValue;
    }
}

async function saveContact(e) {
    e.preventDefault();
    const form = document.querySelector("form");
    selectedContact.name = form.children[0].value;
    selectedContact.phone = form.children[1].value;
    selectedContact.email = form.children[2].value;
    contacts.save();
    await updateContacts();
    selectedContact.reload();
    contactDetails.updateContact();
}

async function deleteContact() {
    contacts.delete();
    await updateContacts();
    await switchModal();
}
