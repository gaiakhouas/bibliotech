import {Schema, model} from 'mongoose';


//Model Livre

const BookSchema = new Schema({
    userId: {type: Schema.Types.ObjectId, ref: 'User'},
    title: {type: String  },
    auteur: {type: String, required: true},
    description: {type: String, required: true},
    category: {type: Schema.Types.ObjectId, ref: 'Category'},
    genres: [{
        type: Schema.Types.ObjectId, ref: 'Genre'
    }],
    nbrPage: {type: Number, required: false},
    thumbnail: {type: String, required: false},
    link: {type: String, required: false},
    created_at: {type: Date, default: Date.now()},
});

export default model('Book', BookSchema);   
