import cases from 'jest-in-case';

import makeFakeComment from '__test__/fixtures/comment';
import makeComment from '.';


const entityValidationTestCases = [
  {
    name: 'must have an author',
    input: { author: null },
    wantErrMessage: 'Comment must have an author.',
  },
  {
    name: 'must be longer than 2 characters.',
    input: { author: 'a' },
    wantErrMessage: 'Comment author\'s name must be longer than 2 characters.',
  },
  {
    name: 'must have a valid post id',
    input: { postId: null },
    wantErrMessage: 'Comment must contain a postId.',
  },
  {
    name: 'must have valid text',
    input: { text: null },
    wantErrMessage: 'Comment must include at least one character of text.',
  },
  {
    name: 'must have a valid id',
    input: { id: 'invalid' },
    wantErrMessage: 'Comment must have a valid id.',
  },
  {
    name: 'must have a source',
    input: { source: null },
    wantErrMessage: 'Comment must have a source.',
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
    wantErrMessage: 'Comment source must contain a valid IP.',
  },
  {
    name: 'must have a source IP',
    input: { source: { ip: null } },
    wantErrMessage: 'Comment source must contain an IP.',
  },
];

const entityValidationTestFunction = ({ input, wantErrMessage }) => {
  const comment = makeFakeComment(input);
  expect(() => makeComment(comment)).toThrow(wantErrMessage);
};

cases('Comment Entity', entityValidationTestFunction, entityValidationTestCases);

describe('Comment Entity', () => {
  it('can create an id', () => {
    const noId = makeFakeComment({ id: undefined });
    const comment = makeComment(noId);
    expect(comment.getId()).toBeString();
    expect(comment.getId()).toHaveLength(25);
  });
  it('includes an author', () => {
    const withAuthor = makeFakeComment();
    expect(makeComment(withAuthor).getAuthor())
      .toEqual(withAuthor.author);
  });
  it('includes text', () => {
    const withText = makeFakeComment();
    expect(makeComment(withText).getText())
      .toEqual(withText.text);
  });
  it('includes postId', () => {
    const withPostId = makeFakeComment();
    expect(makeComment(withPostId).getPostId())
      .toEqual(withPostId.postId);
  });
  it('is createdOn now in UTC', () => {
    const noCreationDate = makeFakeComment({ createdOn: undefined });
    const d = makeComment(noCreationDate).getCreatedOn();
    expect(new Date(d).toUTCString().substring(26)).toBe('GMT');
  });
  it('is modifiedOn now in UTC', () => {
    const noModifiedDate = makeFakeComment({ modifiedOn: undefined });
    const d = makeComment(noModifiedDate).getModifiedOn();
    expect(d).toBeNumber();
    expect(new Date(d).toUTCString().substring(26)).toBe('GMT');
  });
  it('includes a hash', () => {
    const fakeComment = {
      author: 'Dika Einstein',
      text: 'He loves his coding katas',
      postId: 'cjt65art5350vy000hm1rp3s9',
      source: { ip: '127.0.0.1' },
    };
    const comment = makeComment(fakeComment);
    expect(comment.getHash()).toBeString();
    expect(comment.getHash()).toHaveLength(32);
  });
  it('can have a source browser', () => {
    const withBrowser = makeFakeComment();
    expect(makeComment(withBrowser)
      .getSource()
      .getBrowser()).toEqual(withBrowser.source.browser);
  });
  it('can have a source Referer', () => {
    const withReferer = makeFakeComment();
    expect(makeComment(withReferer)
      .getSource()
      .getReferer()).toEqual(withReferer.source.referer);
  });
  it('can have a source IP', () => {
    const withIP = makeFakeComment();
    expect(makeComment(withIP)
      .getSource()
      .getIp()).toEqual(withIP.source.ip);
  });
});
