/*
Created by Andrew DeChristopher <drew@kiir.us> on 2/19/2017.
 */

// Core libraries
// const ipc = require('node-ipc');
const ArrayList = require('arraylist');
const HashMap = require('hashmap');

// Pull all data storage into this class and sync it with bill

// Export object
let d = {};

// Has already connected
d.connectYet = false;

// Number of backend connection retries
d.connectRet = 0;

// Local announcement variable
d.announcement = '';

// Declare queue variables
d.currQ = 0;
d.currS = 0;

// Declare HashMaps for all users
// and queued users
d.pList = new HashMap();
d.qList = new HashMap();

// Declare HashMaps for active users and
// HBC offending users
d.hbCheck = new HashMap();
d.hbChance = new HashMap();

// Set up the server lists
d.servers = new ArrayList();
d.onlServers = new ArrayList();

// Allowed talonPanel IPs
d.firewallIPs = new ArrayList();

// Total number of servers
d.totS = 0;

// Total number of firewall IPs
d.totIP = 0;

// Export module
module.exports = d;
