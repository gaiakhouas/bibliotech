import {Schema, model} from 'mongoose';

//Model Genre

const GenreSchema = new Schema({
    libelle: {type: String, required: true},
});

export default model('Genre', GenreSchema);
