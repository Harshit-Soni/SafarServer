import { Client } from "pg";

//or native libpq bindings
//var pg = require('pg').native

const conString = "*"; //Can be found in the Details page
export const client = new Client(conString);
client.connect();
