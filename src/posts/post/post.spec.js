import cases from 'jest-in-case';

import makeFakePost from '__test__/fixtures/post';
import makePost from '.';


const postValidationTestCases = [
  {
    name: 'must have an author',
    input: { author: null },
    wantErrMessage: 'Post must have an author.',
  },
  {
    name: 'must be longer than 2 characters.',
    input: { author: 'a' },
    wantErrMessage: 'Post author\'s name must be longer than 2 characters.',
  },
  {
    name: 'must have valid text',
    input: { text: null },
    wantErrMessage: 'Post must include at least one character of text.',
  },
  {
    name: 'must have a valid id',
    input: { id: 'invalid' },
    wantErrMessage: 'Post must have a valid id.',
  },
  {
    name: 'must have a source',
    input: { source: null },
    wantErrMessage: 'Post must have a source.',
  },
  {
    name: 'must have a valid source IP',
    input: {
      source: {
        ip: 'abcd',
        browser: '',
        Referer: '',
      },
    },
    wantErrMessage: 'Post source must contain a valid IP.',
  },
  {
    name: 'must have a source IP',
    input: { source: { ip: null } },
    wantErrMessage: 'Post source must contain an IP.',
  },
];

const postValidationTestFunction = ({ input, wantErrMessage }) => {
  const post = makeFakePost(input);
  expect(() => makePost(post)).toThrow(wantErrMessage);
};

cases('Post Entity', postValidationTestFunction, postValidationTestCases);

describe('Post Entity', () => {
  it('can create an id', () => {
    const noId = makeFakePost({ id: undefined });
    const comment = makePost(noId);
    expect(comment.getId()).toBeString();
    expect(comment.getId()).toHaveLength(25);
  });
  it('includes an author', () => {
    const withAuthor = makeFakePost();
    expect(makePost(withAuthor).getAuthor())
      .toEqual(withAuthor.author);
  });
  it('includes text', () => {
    const withText = makeFakePost();
    expect(makePost(withText).getText())
      .toEqual(withText.text);
  });
  it('includes title', () => {
    const withTitle = makeFakePost();
    expect(makePost(withTitle).getTitle())
      .toEqual(withTitle.title);
  });
  it('is createdOn now in UTC', () => {
    const noCreationDate = makeFakePost({ createdOn: undefined });
    const d = makePost(noCreationDate).getCreatedOn();
    expect(new Date(d).toUTCString().substring(26)).toBe('GMT');
  });
  it('is modifiedOn now in UTC', () => {
    const noModifiedDate = makeFakePost({ modifiedOn: undefined });
    const d = makePost(noModifiedDate).getModifiedOn();
    expect(d).toBeNumber();
    expect(new Date(d).toUTCString().substring(26)).toBe('GMT');
  });
  it('includes a hash', () => {
    const fakePost = {
      author: 'Dika Einstein',
      text: 'He loves his coding katas',
      title: 'clean code kata',
      source: { ip: '127.0.0.1' },
    };
    const post = makePost(fakePost);
    expect(post.getHash()).toBeString();
    expect(post.getHash()).toHaveLength(32);
  });
  it('can have a source browser', () => {
    const withBrowser = makeFakePost();
    expect(makePost(withBrowser)
      .getSource()
      .getBrowser()).toEqual(withBrowser.source.browser);
  });
  it('can have a source Referer', () => {
    const withReferer = makeFakePost();
    expect(makePost(withReferer)
      .getSource()
      .getReferer()).toEqual(withReferer.source.referer);
  });
  it('can have a source IP', () => {
    const withIP = makeFakePost();
    expect(makePost(withIP)
      .getSource()
      .getIp()).toEqual(withIP.source.ip);
  });
});
