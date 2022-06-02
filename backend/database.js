const Sequelize = require('sequelize')
const sequelize = new Sequelize('postgres://postgres:root@localhost:5432/movies')

const User = sequelize.define('User', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    }
})

const Director = sequelize.define('Director', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    }
})

const Genre = sequelize.define('Genre', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    }
})

const Movie = sequelize.define('Movie', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    rate: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    year: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    description: {
        type: Sequelize.TEXT,
        allowNull: false
    }
})

Director.hasMany(Movie)
Movie.belongsTo(Director)

const MovieGenre = sequelize.define('MovieGenre', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    MovieId: {
      type: Sequelize.INTEGER,
      references: {
        model: Movie,
        key: 'id'
      }
    },
    GenreId: {
      type: Sequelize.INTEGER,
      references: {
        model: Genre,
        key: 'id'
      }
    }
})

Movie.belongsToMany(Genre, { through: MovieGenre })
Genre.belongsToMany(Movie, { through: MovieGenre })

const UserMovie = sequelize.define('UserMovie', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    MovieId: {
      type: Sequelize.INTEGER,
      references: {
        model: Movie,
        key: 'id'
      }
    },
    UserId: {
      type: Sequelize.INTEGER,
      references: {
        model: User,
        key: 'id'
      }
    }
})

Movie.belongsToMany(User, { through: UserMovie })
User.belongsToMany(Movie, { through: UserMovie })

module.exports = {
    sequelize: sequelize,
    Director: Director,
    User: User,
    Genre: Genre,
    Movie: Movie,
    MovieGenre: MovieGenre,
    UserMovie: UserMovie
}
