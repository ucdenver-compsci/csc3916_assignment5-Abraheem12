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
            'Action', 'Adventure', 'Comedy', 'Drama', 'Western', 'Horror', 'Mystery', 'Thriller', 'Science Fiction', 'Crime'
        ],
    },
    actors: [{
        actorName: String,
        characterName: String,
    }],
    imageUrl: { type: String, default: 'https://i0.wp.com/www.karmanhealthcare.com/wp-content/uploads/2017/12/902.jpg?fit=1284%2C652&ssl=1' },
    description: { type: String, default: 'No description available.' }
});



// return the model
var Movie = mongoose.model('Movie', MovieSchema);
module.exports = Movie;

Movie.countDocuments((err, count) => {
    if (err) {
        console.log('Error counting documents:', err);
    } else if (count === 0) {
        Movie.insertMany([
            {
                title: 'Rocky',
                releaseDate: new Date(1976, 11, 21), // Note: Months are 0-indexed in JavaScript Dates (0 = January, 11 = December)
                genre: 'Drama',
                actors: [{ actorName: 'Sylvester Stallone', characterName: 'Rocky Balboa' }],
                imageUrl: 'https://www.slashfilm.com/img/gallery/rocky-movies-ranked/8-rocky-iv-1630002709.jpg',
                description: 'A small-time boxer gets a supremely rare chance to fight the heavy-weight champion in a bout where he strives for his self-respect.'
            },
            {
                title: 'The Good, The Bad and The Ugly',
                releaseDate: new Date(1966, 11, 23),
                genre: 'Western',
                actors: [{ actorName: 'Clint Eastwood', characterName: 'Blondie' }],
                imageUrl: 'https://static1.srcdn.com/wordpress/wp-content/uploads/2020/02/The-Good-the-Bad-and-the-Ugly.jpg',
                description: 'A bounty hunting scam joins two men in an uneasy alliance against a third in a race to find a fortune in gold buried in a remote cemetery.'
            },
            {
                title: 'Casino',
                releaseDate: new Date(1995, 10, 22),
                genre: 'Crime',
                actors: [{ actorName: 'Robert De Niro', characterName: 'Sam "Ace" Rothstein' }],
                imageUrl: 'https://media.timeout.com/images/103114060/320/210/image.jpg',
                description: 'A tale of greed, deception, money, power, and murder occur between two best friends: a mafia enforcer and a casino executive.'
            },
            {
                title: 'Goodfellas',
                releaseDate: new Date(1990, 8, 19),
                genre: 'Crime',
                actors: [{ actorName: 'Ray Liotta', characterName: 'Henry Hill' }],
                imageUrl: 'https://img.buzzfeed.com/buzzfeed-static/complex/images/ymkntmqgffuhhgq79lkc/goodfellas-publicity-portrait.jpg?output-format=jpg&output-quality=auto',
                description: 'The story of Henry Hill and his life in the mob, covering his relationship with his wife Karen Hill and his mob partners.'
            },
            {
                title: 'Die Hard',
                releaseDate: new Date(1988, 6, 20),
                genre: 'Action',
                actors: [{ actorName: 'Bruce Willis', characterName: 'John McClane' }],
                imageUrl: 'https://media-cldnry.s-nbcnews.com/image/upload/t_fit-1240w,f_auto,q_auto:best/newscms/2018_50/2684041/121214-bruce-willis-die-hard-christmas-mn-1435.jpg',
                description: 'An NYPD officer tries to save his wife and several others taken hostage by German terrorists during a Christmas party at the Nakatomi Plaza in Los Angeles.'
            }
        ], (err) => {
            if (err) {
                console.log('Error inserting movies:', err);
            } else {
                console.log('Successfully inserted movies');
            }
        });
    }
});
