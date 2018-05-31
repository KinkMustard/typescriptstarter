import { gql } from "apollo-boost";

const getAuthors = gql`
  query getAuthors {
    authors {
      name
      id
    }
  }
`;

const getBooks = gql`
  query getBooks {
    books {
      name
      id
    }
  }
`;

const addBook = gql`
  mutation addBook($name: String!, $genre: String!, $authorId: ID!) {
    addBook(name: $name, genre: $genre, authorId: $authorId) {
      name
      id
    }
  }
`;

const getBook = gql`
  query getBook($id: ID) {
    book(id: $id) {
      id
      name
      genre
      author {
        id
        name
        age
        books {
          name
          id
        }
      }
    }
  }
`;

export { getAuthors, getBooks, addBook, getBook };
