'use strict';

console.warn("Thank you for using the offical NSS Boilerplate! Enjoy developing <%= title %>");

<% if (browserify && jquery && !bootstrap) { %>
const $ = require('jquery'); 
console.log("$", $('<button/>'));<% } %> <% if (browserify) { %>

const math = require('./math');
console.log("math", math);
console.log("add", math.add);
console.log("sum", math.add(5, 10));
<% } %>
