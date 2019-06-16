declare module 'model' {
  interface Model<T> {
    create: (...doc, options?) => Promise<T, {}>;
    find: (condition, projection?, options?) => Promise<T[], {}>;
    findOne: (condition, projection?, options?) => Promise<T, {}>;
    findOneAndUpdate: (condition, attrs, options?) => Promise<T, {}>;
    findOneAndRemove: (condition, options?) => Promise<T, {}>;
  }
}
