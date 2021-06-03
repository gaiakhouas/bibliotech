import {Schema, model} from 'mongoose';

//Model Category

const CategorySchema = new Schema({
    libelle: {type: String, required: true}
});

export default model('Category', CategorySchema);
