'use strict';
const Sequelize = require('sequelize');
const db = require('../db');
const Student = require('./student');

const Test = db.define('test', {
  subject: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  grade: {
    type: Sequelize.INTEGER,
    allowNull: false,
  }
});

//This adds methods to 'createdTest', such as '.setStudent'. It also creates a foreign key attribute on the Page table pointing ot the User table
Test.belongsTo(Student, {as: 'student'})

module.exports = Test;
