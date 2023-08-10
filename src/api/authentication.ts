//Send Authorization in header containing the word Basic followed by a space and a base64 encoded string of username:password.

const userName = "rolabewerbung";
const password = "Bewerbungen-rola";

const headers = new Headers();

headers.append('Authorization', 'Basic ' + btoa(userName + ':' + password));
headers.append('Content-Type', 'application/json');

export default headers;
