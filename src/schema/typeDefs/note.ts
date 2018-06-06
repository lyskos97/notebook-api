export default `
  type Note {
    title: String!
    text: String!
  }

  type Query {
    notes: [Note!]
    noteById(id: Int!): Note!
  }

  input NoteData {
    text: String!
    title: String!
    author: String!
  }

  type Mutation {
    createNote(payload: NoteData!): Note!
  }
`;
