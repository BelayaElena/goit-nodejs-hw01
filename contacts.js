//const yargs = require("yargs");
//const { hideBin } = require("yargs/helpers");
const { program } = require("commander");

const contacts = require("./db");

const invokeAction = async ({ action, contactId, name, email, phone }) => {
  switch (action) {
    case "list":
      const contactsList = await contacts.listContacts();
      console.log(contactsList);
      break;

    case "get":
      const contactById = await contacts.getContactById(contactId);
      console.log(contactById);
      break;

    case "remove":
      const removeContact = await contacts.removeContact(contactId);
      console.log(removeContact);
      break;

    case "add":
      const newContact = await contacts.addContact({ name, email, phone });
      console.log(newContact);
      break;
    default:
      console.warn("\x1B[31m Unknown action type!");
  }
};

program
  .option("-a, --action <type>")
  .option("-i, --contactId <type>")
  .option("-n, --name <type>")
  .option("-e, --email <type>")
  .option("-p, --phone <type>");

program.parse();

const options = program.opts();
invokeAction(options);

// const arr = hideBin(process.argv);
// const { argv } = yargs(arr);

// invokeAction(argv);

//invokeAction({ action: "list" });
//invokeAction({ action: "get", contactId: "2" });
//invokeAction({ action: "remove", contactId: "29d4UEVPG2cvrjFfEL0RW" });
// invokeAction({
//   action: "add",
//   name: "Rose",
//   email: "rose@com.ua",
//   phone: "(591) 772-5319",
// });
