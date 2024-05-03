var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const databaseUrl = process.env.DB;

mongoose.connect(databaseUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
})
    .then(() => console.log('MongoDB connected successfully.'))
    .catch(err => console.log('Error connecting to MongoDB:', err));

// Movie schema
const MovieSchema = new Schema({
    title: { type: String, required: true, index: true },
    releaseDate: Date,
    genre: {
        type: String,
        enum: [
            'Action', 'Adventure', 'Comedy', 'Drama', 'Horror', 'Mystery', 'Thriller', 'Science Fiction', 'Crime'
        ],
    },
    actors: [{
        actorName: String,
        characterName: String,
    }],
    imageUrl: { type: String, default: 'https://i0.wp.com/www.karmanhealthcare.com/wp-content/uploads/2017/12/902.jpg?fit=1284%2C652&ssl=1' }
});



// return the model
var Movie = mongoose.model('Movie', MovieSchema);
module.exports = Movie;

// Ensure Movie is the model created from MovieSchema
Movie.updateOne({ title: "Rocky" }, {
    imageUrl: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.slashfilm.com%2F577991%2Frocky-movies-ranked%2F&psig=AOvVaw0vhBn4KnT_ijv94I8mwfZ-&ust=1714798831423000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCLD8uszZ8IUDFQAAAAAdAAAAABAS',
    description: 'Rocky Balboa, a small-time boxer, gets a supremely rare chance to fight the heavy-weight champion, Apollo Creed, in a bout in which he strives to go the distance for his self-respect.'
}).then(result => console.log('Updated Rocky')).catch(err => console.log(err));
