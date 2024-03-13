const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId

/*
 * Retrieves all contacts from the database.
 */
const getAllContact = async (req, res, next) => {
  const result = await mongodb.getDatabase().db().collection('contacts').find();
  result.toArray().then((users) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(users);
  });
}

/*
 * Retrieves a single contact from the database.
 */
const getSingleContact = async (req, res, next) => {
  const userId = new ObjectId(req.params.id); 
  const result = await mongodb.getDatabase().db().collection('contacts').find({ _id: userId });
  result.toArray().then((users) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(users[0]);
  });
}

/*
 * Inserts a contact from the database.
 */
const createContact = async (req, res) => {
    //#swagger.tags=['Contacts]
    const contacts = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthday: req.body.birthday
    };

    const response = await mongodb.getDatabase().db().collection('contacts').insertOne(contacts);
    if (response.acknowledged > 0){
        res.status(204).send();
    }else {
        res.status(500).json(response.error || 'Some error ocurred while inserting the uContactsser.');
    }
};

/*
 * Updates a contact from the database.
 */
const updateContact = async (req, res) => {
    //#swagger.tags=['Contacts]
    const userId = new ObjectId(req.params.id);
    const contacts = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      favoriteColor: req.body.favoriteColor,
      birthday: req.body.birthday
    };

    const response = await mongodb.getDatabase().db().collection('contacts').replaceOne({_id: userId}, contacts);
    if (response.modifiedCount > 0){
        res.status(204).send();
    }else {
        res.status(500).json(response.error || 'Some error ocurred while updating the Contacts.');
    }
}

/*
 * Deletes a contact from the database.
 */
const deleteContact = async (req, res) => {
    //#swagger.tags=['Contacts]
    const userId = new ObjectId(req.params.id);
    const response = await mongodb.getDatabase().db().collection('contacts').deleteOne({_id: userId});
    if (response.deletedCount > 0){
        res.status(204).send();
    }else {
        res.status(500).json(response.error || 'Some error ocurred while deleting the Contacts.');
    }
}

module.exports = {
    getAllContact,
    getSingleContact,
    createContact,
    updateContact,
    deleteContact
};