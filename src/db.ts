import { Client } from "pg";
//or native libpq bindings
//var pg = require('pg').native

const conString =
  "postgres://svwwlfcs:JDMqqOht97BpfnaAUvXYbpbQAx5c2-bd@tiny.db.elephantsql.com/svwwlfcs"; //Can be found in the Details page
export const client = new Client(conString);
client.connect();
